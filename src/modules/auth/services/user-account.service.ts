// src/modules/auth/services/user-account.service.ts

import { Injectable, BadRequestException, NotFoundException, ConflictException, UnauthorizedException, InternalServerErrorException, Inject, forwardRef, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CreateBranchDto } from '../dto/create-branch.dto';
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
import { EmailVerificationService } from '../../email/services/email-verification.service';

// Define the TokenPair interface to match AuthService
// Define the TokenPair interface locally to avoid circular dependency
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class UserAccountService {
  private readonly logger = new Logger(UserAccountService.name);
  private readonly SYSTEM_UUID = '00000000-0000-0000-0000-000000000000'; // Define a valid system UUID

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
      private readonly emailVerificationService: EmailVerificationService,
  ) {}

  // /**
  //  * Registers a new user and organization
  //  * @param registerDto Registration data
  //  * @returns Created user
  //  */
  // async register(registerDto: RegisterDto): Promise<{ user: User }> {
  //   // [... existing code ...]
  // }

  // src/modules/auth/services/user-account.service.ts

  /**
   * Creates a new branch organization within an existing tenant
   * @param createBranchDto Branch creation data
   * @param userId Optional UUID of the user creating the branch
   * @returns Created user and verification token for testing
   */
  async createBranch(createBranchDto: CreateBranchDto, userId?: string): Promise<{ user: User, verificationToken?: string }> {
    this.logger.log(`Creating branch with name: ${createBranchDto.organization.name}`);

    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createBranchDto.user.email }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Map subscription plan from CreateBranchDto to CreateOrganizationDto
    let subscriptionPlan = CreateOrgSubscriptionPlan.FREE;
    if (createBranchDto.organization.subscriptionPlan) {
      switch (createBranchDto.organization.subscriptionPlan) {
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

    // Use provided userId or null
    // Don't use a fake UUID as it violates foreign key constraints
    const creatorId = userId || null;
    this.logger.debug(`Using creator ID: ${creatorId || 'null'} for branch creation`);

    try {
      // Create organization first
      const organization = await this.organizationsService.create({
        name: createBranchDto.organization.name,
        type: OrganizationType.BRANCH,
        email: createBranchDto.user.email,
        phone: createBranchDto.organization.phone,
        domain: createBranchDto.organization.website?.replace(/^https?:\/\//, ''),
        address: createBranchDto.organization.address,
        primaryContact: {
          name: `${createBranchDto.user.firstName} ${createBranchDto.user.lastName}`,
          position: 'Branch Admin',
          email: createBranchDto.user.email,
          phone: createBranchDto.user.phone || createBranchDto.organization.phone
        },
        subscriptionPlan,
        createdById: creatorId // Use the real user ID or null
      });

      this.logger.log(`Organization created with ID: ${organization.id}`);

      // Create user with organization
      const user = await this.usersService.create({
        firstName: createBranchDto.user.firstName,
        lastName: createBranchDto.user.lastName,
        email: createBranchDto.user.email,
        password: createBranchDto.user.password,
        phoneNumber: createBranchDto.user.phone,
        role: Role.ADMIN,
        organizationId: organization.id,
        createdBy: creatorId // Use the real user ID or null
      });

      this.logger.log(`User created with ID: ${user.id}`);

      // Use the email verification service to generate a token and send email
      const token = await this.emailVerificationService.generateVerificationToken(user.id);
      await this.emailVerificationService.sendVerificationEmail(user.id);

      // Log verification token in development environment
      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug(`VERIFICATION TOKEN for ${user.email}: ${token}`);
      }

      return {
        user,
        verificationToken: process.env.NODE_ENV !== 'production' ? token : undefined
      };
    } catch (error) {
      this.logger.error(`Error creating branch: ${error.message}`, error.stack);
      throw new BadRequestException(`Failed to create branch: ${error.message}`);
    }
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
    this.logger.debug(`Password reset link for ${user.email}: https://${organization?.domain || 'your-app.com'}/reset-password?token=${token}`);

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
    // Use the email verification service to verify the email
    const result = await this.emailVerificationService.verifyEmail(token);

    // Optionally send a welcome email after verification
    await this.emailVerificationService.sendWelcomeEmail(result.userId);

    this.logger.log(`Email verified successfully for user ${result.userId} (${result.email})`);
  }

  /**
   * Sends a verification email to the user
   * @param userId The ID of the user to send the verification email to
   */
  async sendVerificationEmail(userId: string): Promise<void> {
    // Use the email verification service to send the verification email
    await this.emailVerificationService.sendVerificationEmail(userId);
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