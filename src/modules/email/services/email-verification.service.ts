// src/modules/email/services/email-verification.service.ts

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { User } from '../../users/entities/user.entity';
import { EmailService } from './email.service';
import { EmailTemplateService } from './email-template.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailVerificationService {
    private readonly logger = new Logger(EmailVerificationService.name);

    constructor(
        @InjectRepository(UserVerification)
        private userVerificationRepository: Repository<UserVerification>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private emailService: EmailService,
        private emailTemplateService: EmailTemplateService,
        private configService: ConfigService,
    ) {}

    /**
     * Generate a verification token for a user
     */
    async generateVerificationToken(userId: string): Promise<string> {
        const verification = await this.userVerificationRepository.findOne({
            where: { userId }
        });

        // Generate a random token
        const token = uuidv4();

        // Set expiration (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        if (!verification) {
            // Create a new verification entry
            const newVerification = this.userVerificationRepository.create({
                userId,
                isEmailVerified: false,
                emailVerificationToken: token,
                emailVerificationExpires: expiresAt,
                lastEmailVerificationSent: new Date()
            });

            await this.userVerificationRepository.save(newVerification);
        } else {
            // Update existing verification entry
            verification.emailVerificationToken = token;
            verification.emailVerificationExpires = expiresAt;
            verification.lastEmailVerificationSent = new Date();

            await this.userVerificationRepository.save(verification);
        }

        return token;
    }

    /**
     * Send a verification email to a user
     */
    async sendVerificationEmail(userId: string): Promise<void> {
        // Get user details
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate a token
        const token = await this.generateVerificationToken(userId);

        // Create verification URL
        const appUrl = this.configService.get<string>('APP_URL');
        const verificationUrl = `${appUrl}/verify-email?token=${token}`;

        try {
            // Check for organization-specific template
            const template = await this.emailTemplateService.findByName(
                'email-verification',
                user.organizationId
            );

            if (template) {
                // Render the custom template
                const { subject, content } = await this.emailTemplateService.renderTemplateById(
                    template.id,
                    user.organizationId,
                    {
                        name: user.firstName,
                        verificationUrl,
                        token,
                        expiresIn: '24 hours'
                    }
                );

                // Send using the email service
                await this.emailService.sendMail(user.email, subject, content);
                this.logger.log(`Verification email sent to ${user.email} using custom template`);
                return;
            }
        } catch (error) {
            this.logger.warn(`Custom template not found for org ${user.organizationId}, using default`);
        }

        // Send a basic email if no custom template
        const subject = 'Verify Your Email Address';
        const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Verify Your Email Address</h2>
        <p>Hello ${user.firstName},</p>
        <p>Thank you for registering! Please click the button below to verify your email address:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p>${verificationUrl}</p>
        
        <p>This link will expire in 24 hours.</p>
        
        <p>If you didn't request this verification, please ignore this email.</p>
      </div>
    `;

        await this.emailService.sendMail(user.email, subject, content);
        this.logger.log(`Verification email sent to ${user.email} using default template`);
    }

    /**
     * Verify a user's email with a token
     */
    async verifyEmail(token: string): Promise<{ userId: string; email: string }> {
        // Find the verification record
        const verification = await this.userVerificationRepository.findOne({
            where: { emailVerificationToken: token },
            relations: ['user']
        });

        if (!verification) {
            throw new NotFoundException('Verification token not found');
        }

        // Check if expired
        if (verification.emailVerificationExpires && verification.emailVerificationExpires < new Date()) {
            throw new BadRequestException('Verification token has expired');
        }

        // Mark verification record as verified
        verification.isEmailVerified = true;
        verification.emailVerifiedAt = new Date();
        verification.emailVerificationToken = null;
        verification.emailVerificationExpires = null;
        await this.userVerificationRepository.save(verification);

        // Update user record
        const user = await this.userRepository.findOne({
            where: { id: verification.userId }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.isEmailVerified = true;
        await this.userRepository.save(user);

        this.logger.log(`Email verified for user ${user.id} (${user.email})`);

        return {
            userId: user.id,
            email: user.email,
        };
    }

    /**
     * Check if a token is valid (for front-end validation without consuming the token)
     */
    async isTokenValid(token: string): Promise<boolean> {
        const verification = await this.userVerificationRepository.findOne({
            where: { emailVerificationToken: token }
        });

        if (!verification) {
            return false;
        }

        return !verification.emailVerificationExpires || verification.emailVerificationExpires > new Date();
    }

    /**
     * Send a welcome email after verification
     */
    async sendWelcomeEmail(userId: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        try {
            // Look for a custom welcome template
            const template = await this.emailTemplateService.findByName(
                'welcome-email',
                user.organizationId
            );

            if (template) {
                const { subject, content } = await this.emailTemplateService.renderTemplateById(
                    template.id,
                    user.organizationId,
                    {
                        name: user.firstName,
                        organizationName: user.organization?.name || 'Our Platform',
                        loginUrl: this.configService.get<string>('APP_URL') + '/login'
                    }
                );

                await this.emailService.sendMail(user.email, subject, content);
                return;
            }
        } catch (error) {
            this.logger.warn(`Custom welcome template not found, using default`);
        }

        // Send a basic welcome email
        const subject = 'Welcome to ' + (user.organization?.name || 'Our Platform');
        const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome, ${user.firstName}!</h2>
        <p>Thank you for verifying your email. Your account is now fully activated.</p>
        <p>You can now log in and start using all the features of our platform.</p>
        <p><a href="${this.configService.get<string>('APP_URL')}/login">Click here to log in</a></p>
      </div>
    `;

        await this.emailService.sendMail(user.email, subject, content);
    }
}