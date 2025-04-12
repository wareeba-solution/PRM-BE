// src/modules/auth/services/user-account.service.ts

import { Injectable, BadRequestException, NotFoundException, ConflictException, UnauthorizedException, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { compare, hash } from 'bcrypt';
import { Organization, OrganizationStatus } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { UsersService } from '../../users/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { UserSettings } from '../../users/entities/user-settings.entity';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { SubscriptionPlan as CreateOrgSubscriptionPlan } from '../../organizations/dto/create-organization.dto';
import { OrganizationsService } from '../../organizations/services/organizations.service';
import { EmailService } from '../../../shared/services/email.service';
import { OrganizationType } from '../../organizations/dto/create-organization.dto';
import { SubscriptionPlan as RegisterSubscriptionPlan } from '../../organizations/enums/subscription-plan.enum';
import { AuthService } from './auth.service';

// Define the TokenPair interface to match AuthService
// Define the TokenPair interface locally to avoid circular dependency
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(UserVerification)
    private readonly userVerificationRepository: Repository<UserVerification>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly organizationsService: OrganizationsService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Registers a new user and organization
   * @param registerDto Registration data
   * @returns Created user
   */
  async register(registerDto: RegisterDto): Promise<{ user: User }> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.user.email }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Map subscription plan from RegisterDto to CreateOrganizationDto
    let subscriptionPlan = CreateOrgSubscriptionPlan.FREE;
    if (registerDto.organization.subscriptionPlan) {
      switch (registerDto.organization.subscriptionPlan) {
        case RegisterSubscriptionPlan.BASIC:
          subscriptionPlan = CreateOrgSubscriptionPlan.STARTER;
          break;
        case RegisterSubscriptionPlan.STANDARD:
          subscriptionPlan = CreateOrgSubscriptionPlan.PROFESSIONAL;
          break;
        case RegisterSubscriptionPlan.PREMIUM:
        case RegisterSubscriptionPlan.ENTERPRISE:
          subscriptionPlan = CreateOrgSubscriptionPlan.ENTERPRISE;
          break;
        case RegisterSubscriptionPlan.FREE:
        default:
          subscriptionPlan = CreateOrgSubscriptionPlan.FREE;
      }
    }

    // Create organization first
    const organization = await this.organizationsService.create({
      name: registerDto.organization.name,
      type: OrganizationType.OTHER,
      email: registerDto.user.email,
      phone: registerDto.organization.phone,
      domain: registerDto.organization.website?.replace(/^https?:\/\//, ''),
      address: registerDto.organization.address,
      primaryContact: {
        name: `${registerDto.user.firstName} ${registerDto.user.lastName}`,
        position: 'Admin',
        email: registerDto.user.email,
        phone: registerDto.user.phone || registerDto.organization.phone
      },
      subscriptionPlan,
      createdById: 'system'
    });

    // Create user with organization
    const user = await this.usersService.create({
      firstName: registerDto.user.firstName,
      lastName: registerDto.user.lastName,
      email: registerDto.user.email,
      password: registerDto.user.password,
      phoneNumber: registerDto.user.phone,
      role: Role.ADMIN,
      organizationId: organization.id,
      createdBy: 'system'
    });

    // Create user verification record
    const verificationToken = uuidv4();
    const verificationExpiry = new Date();
    verificationExpiry.setHours(verificationExpiry.getHours() + 24);

    await this.userVerificationRepository.save({
      userId: user.id,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpiry: verificationExpiry
    });

    // Send verification email
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Verify your email',
      template: 'email-verification',
      context: {
        name: user.firstName,
        verificationLink: `${process.env.APP_URL}/verify-email?token=${verificationToken}`,
        expiresIn: '24 hours'
      }
    });

    return { user };
  }

  /**
   * Sends a password reset email to the user
   * @param email The email address to send the reset link to
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return;
    }

    // Generate reset token
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    // Update user with reset token
    user.passwordResetToken = token;
    user.passwordResetExpiresAt = expiresAt;
    await this.userRepository.save(user);

    // Get organization info for email template
    const organization = await this.organizationRepository.findOne({
      where: { id: user.organizationId },
    });
    const organizationName = organization ? organization.name : 'Our Platform';

    // Send reset email
    // This would typically use a mail service
    console.log(`Password reset link for ${user.email}: https://${organization?.domain || 'your-app.com'}/reset-password?token=${token}`);

    // In a real implementation, you would send an email with the reset link
    // Example:
    /*
    await this.mailService.sendMail({
      to: user.email,
      subject: `Reset your password for ${organizationName}`,
      template: 'password-reset',
      context: {
        name: user.firstName,
        organizationName,
        resetLink: `https://${organization?.domain || 'your-app.com'}/reset-password?token=${token}`,
        expiresIn: '24 hours',
      },
    });
    */
  }

  /**
   * Resets a user's password using a reset token
   * @param token The password reset token
   * @param newPassword The new password
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    if (user.passwordResetExpiresAt < new Date()) {
      throw new UnauthorizedException('Reset token has expired');
    }

    // Update password
    user.password = await hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;
    await this.userRepository.save(user);
  }

  /**
   * Confirms a user's email using the verification token
   * @param token The email verification token
   */
  async confirmEmail(token: string): Promise<void> {
    // Find user verification record by token
    const verification = await this.userVerificationRepository.findOne({
      where: { emailVerificationToken: token },
      relations: ['user'],
    });

    if (!verification) {
      throw new UnauthorizedException('Invalid or expired verification token');
    }
    
    // Check if token is expired
    if (verification.emailVerificationExpires && verification.emailVerificationExpires < new Date()) {
      throw new UnauthorizedException('Verification token has expired');
    }

    // Update user's email verification status
    const user = await this.userRepository.findOne({ where: { id: verification.userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    user.isEmailVerified = true;
    await this.userRepository.save(user);

    // Update verification record
    verification.isEmailVerified = true;
    verification.emailVerifiedAt = new Date();
    verification.emailVerificationToken = null;
    verification.emailVerificationExpires = null;
    await this.userVerificationRepository.save(verification);
  }

  /**
   * Sends a verification email to the user
   * @param userId The ID of the user to send the verification email to
   */
  async sendVerificationEmail(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['verification'],
    });
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return; // Already verified, no need to send email
    }

    // Generate a verification token
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    // Create or update verification record
    let verification: UserVerification;
    
    if (!user.verification) {
      // Create new verification record
      verification = new UserVerification();
      verification.userId = user.id;
      verification.isEmailVerified = false;
      verification.isPhoneVerified = false;
      verification.emailVerificationToken = token;
      verification.emailVerificationExpires = expiresAt;
      verification.createdAt = new Date();
      verification.updatedAt = new Date();
    } else {
      // Get existing verification record
      verification = await this.userVerificationRepository.findOne({
        where: { userId: user.id }
      });
      
      if (!verification) {
        // Create new if somehow not found
        verification = new UserVerification();
        verification.userId = user.id;
        verification.isEmailVerified = false;
        verification.isPhoneVerified = false;
      }
      
      // Update verification record
      verification.emailVerificationToken = token;
      verification.emailVerificationExpires = expiresAt;
      verification.updatedAt = new Date();
    }
    
    // Save verification record
    await this.userVerificationRepository.save(verification);

    // Get organization info for email template
    const organization = await this.organizationRepository.findOne({ where: { id: user.organizationId } });
    const organizationName = organization ? organization.name : 'Our Platform';

    // Send verification email
    // This would typically use a mail service
    console.log(`Verification link for ${user.email}: https://your-app.com/verify-email?token=${token}`);

    // In a real implementation, you would send an email with the verification link
    // Example:
    /*
    await this.mailService.sendMail({
      to: user.email,
      subject: `Verify your email for ${organizationName}`,
      template: 'email-verification',
      context: {
        name: user.firstName,
        organizationName,
        verificationLink: `https://${organization?.domain || 'your-app.com'}/verify-email?token=${token}`,
        expiresIn: '24 hours',
      },
    });
    */
  }

  /**
   * Checks if email verification is required for a specific action
   * @param action The action to check
   * @returns boolean True if verification is required, false otherwise
   */
  async isEmailVerificationRequired(action: string): Promise<boolean> {
    // This could be a configurable setting per organization or globally
    const requireVerification = action === 'payment' || action === 'sensitive_data';
    return requireVerification;
  }
}
