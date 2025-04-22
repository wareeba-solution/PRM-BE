"use strict";
// src/modules/email/services/email-verification.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailVerificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_verification_entity_1 = require("../../users/entities/user-verification.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const email_service_1 = require("./email.service");
const email_template_service_1 = require("./email-template.service");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let EmailVerificationService = EmailVerificationService_1 = class EmailVerificationService {
    constructor(userVerificationRepository, userRepository, emailService, emailTemplateService, configService) {
        this.userVerificationRepository = userVerificationRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.emailTemplateService = emailTemplateService;
        this.configService = configService;
        this.logger = new common_1.Logger(EmailVerificationService_1.name);
    }
    /**
     * Generate a verification token for a user
     */
    async generateVerificationToken(userId) {
        const verification = await this.userVerificationRepository.findOne({
            where: { userId }
        });
        // Generate a random token
        const token = (0, uuid_1.v4)();
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
        }
        else {
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
    async sendVerificationEmail(userId) {
        // Get user details
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        // Generate a token
        const token = await this.generateVerificationToken(userId);
        // Create verification URL
        const appUrl = this.configService.get('APP_URL');
        const verificationUrl = `${appUrl}/verify-email?token=${token}`;
        try {
            // Check for organization-specific template
            const template = await this.emailTemplateService.findByName('email-verification', user.organizationId);
            if (template) {
                // Render the custom template
                const { subject, content } = await this.emailTemplateService.renderTemplateById(template.id, user.organizationId, {
                    name: user.firstName,
                    verificationUrl,
                    token,
                    expiresIn: '24 hours'
                });
                // Send using the email service
                await this.emailService.sendMail(user.email, subject, content);
                this.logger.log(`Verification email sent to ${user.email} using custom template`);
                return;
            }
        }
        catch (error) {
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
    async verifyEmail(token) {
        // Find the verification record
        const verification = await this.userVerificationRepository.findOne({
            where: { emailVerificationToken: token },
            relations: ['user']
        });
        if (!verification) {
            throw new common_1.NotFoundException('Verification token not found');
        }
        // Check if expired
        if (verification.emailVerificationExpires && verification.emailVerificationExpires < new Date()) {
            throw new common_1.BadRequestException('Verification token has expired');
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
            throw new common_1.NotFoundException('User not found');
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
    async isTokenValid(token) {
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
    async sendWelcomeEmail(userId) {
        var _a, _b;
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            // Look for a custom welcome template
            const template = await this.emailTemplateService.findByName('welcome-email', user.organizationId);
            if (template) {
                const { subject, content } = await this.emailTemplateService.renderTemplateById(template.id, user.organizationId, {
                    name: user.firstName,
                    organizationName: ((_a = user.organization) === null || _a === void 0 ? void 0 : _a.name) || 'Our Platform',
                    loginUrl: this.configService.get('APP_URL') + '/login'
                });
                await this.emailService.sendMail(user.email, subject, content);
                return;
            }
        }
        catch (error) {
            this.logger.warn(`Custom welcome template not found, using default`);
        }
        // Send a basic welcome email
        const subject = 'Welcome to ' + (((_b = user.organization) === null || _b === void 0 ? void 0 : _b.name) || 'Our Platform');
        const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome, ${user.firstName}!</h2>
        <p>Thank you for verifying your email. Your account is now fully activated.</p>
        <p>You can now log in and start using all the features of our platform.</p>
        <p><a href="${this.configService.get('APP_URL')}/login">Click here to log in</a></p>
      </div>
    `;
        await this.emailService.sendMail(user.email, subject, content);
    }
};
EmailVerificationService = EmailVerificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_verification_entity_1.UserVerification)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        email_template_service_1.EmailTemplateService,
        config_1.ConfigService])
], EmailVerificationService);
exports.EmailVerificationService = EmailVerificationService;
//# sourceMappingURL=email-verification.service.js.map