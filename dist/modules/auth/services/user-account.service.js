"use strict";
// src/modules/auth/services/user-account.service.ts
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
var UserAccountService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const bcrypt_1 = require("bcrypt");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const users_service_1 = require("../../users/services/users.service");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const user_settings_entity_1 = require("../../users/entities/user-settings.entity");
const user_verification_entity_1 = require("../../users/entities/user-verification.entity");
const create_organization_dto_1 = require("../../organizations/dto/create-organization.dto");
const organizations_service_1 = require("../../organizations/services/organizations.service");
const email_service_1 = require("../../../shared/services/email.service");
const create_organization_dto_2 = require("../../organizations/dto/create-organization.dto");
const subscription_plan_enum_1 = require("../../organizations/enums/subscription-plan.enum");
const auth_service_1 = require("./auth.service");
const email_verification_service_1 = require("../../email/services/email-verification.service");
let UserAccountService = UserAccountService_1 = class UserAccountService {
    constructor(userRepository, organizationRepository, userVerificationRepository, userSettingsRepository, authService, usersService, configService, organizationsService, emailService, emailVerificationService) {
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.userVerificationRepository = userVerificationRepository;
        this.userSettingsRepository = userSettingsRepository;
        this.authService = authService;
        this.usersService = usersService;
        this.configService = configService;
        this.organizationsService = organizationsService;
        this.emailService = emailService;
        this.emailVerificationService = emailVerificationService;
        this.logger = new common_1.Logger(UserAccountService_1.name);
        this.SYSTEM_UUID = '00000000-0000-0000-0000-000000000000'; // Define a valid system UUID
    }
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
    async createBranch(createBranchDto, userId) {
        var _a;
        this.logger.log(`Creating branch with name: ${createBranchDto.organization.name}`);
        // Check if user with email already exists
        const existingUser = await this.userRepository.findOne({
            where: { email: createBranchDto.user.email }
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        // Map subscription plan from CreateBranchDto to CreateOrganizationDto
        let subscriptionPlan = create_organization_dto_1.SubscriptionPlan.FREE;
        if (createBranchDto.organization.subscriptionPlan) {
            switch (createBranchDto.organization.subscriptionPlan) {
                case subscription_plan_enum_1.SubscriptionPlan.BASIC:
                    subscriptionPlan = create_organization_dto_1.SubscriptionPlan.STARTER;
                    break;
                case subscription_plan_enum_1.SubscriptionPlan.STANDARD:
                    subscriptionPlan = create_organization_dto_1.SubscriptionPlan.PROFESSIONAL;
                    break;
                case subscription_plan_enum_1.SubscriptionPlan.PREMIUM:
                case subscription_plan_enum_1.SubscriptionPlan.ENTERPRISE:
                    subscriptionPlan = create_organization_dto_1.SubscriptionPlan.ENTERPRISE;
                    break;
                case subscription_plan_enum_1.SubscriptionPlan.FREE:
                default:
                    subscriptionPlan = create_organization_dto_1.SubscriptionPlan.FREE;
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
                type: create_organization_dto_2.OrganizationType.BRANCH,
                email: createBranchDto.user.email,
                phone: createBranchDto.organization.phone,
                domain: (_a = createBranchDto.organization.website) === null || _a === void 0 ? void 0 : _a.replace(/^https?:\/\//, ''),
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
                role: role_enum_1.Role.ADMIN,
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
        }
        catch (error) {
            this.logger.error(`Error creating branch: ${error.message}`, error.stack);
            throw new common_1.BadRequestException(`Failed to create branch: ${error.message}`);
        }
    }
    /**
     * Sends a password reset email to the user
     * @param email The email address to send the reset link to
     */
    async sendPasswordResetEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // Don't reveal that the user doesn't exist
            return;
        }
        // Generate reset token
        const token = (0, uuid_1.v4)();
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
        this.logger.debug(`Password reset link for ${user.email}: https://${(organization === null || organization === void 0 ? void 0 : organization.domain) || 'your-app.com'}/reset-password?token=${token}`);
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
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: token },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
        if (user.passwordResetExpiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Reset token has expired');
        }
        // Update password
        user.password = await (0, bcrypt_1.hash)(newPassword, 10);
        user.passwordResetToken = null;
        user.passwordResetExpiresAt = null;
        await this.userRepository.save(user);
    }
    /**
     * Confirms a user's email using the verification token
     * @param token The email verification token
     */
    async confirmEmail(token) {
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
    async sendVerificationEmail(userId) {
        // Use the email verification service to send the verification email
        await this.emailVerificationService.sendVerificationEmail(userId);
    }
    /**
     * Checks if email verification is required for a specific action
     * @param action The action to check
     * @returns boolean True if verification is required, false otherwise
     */
    async isEmailVerificationRequired(action) {
        // This could be a configurable setting per organization or globally
        const requireVerification = action === 'payment' || action === 'sensitive_data';
        return requireVerification;
    }
};
UserAccountService = UserAccountService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(2, (0, typeorm_1.InjectRepository)(user_verification_entity_1.UserVerification)),
    __param(3, (0, typeorm_1.InjectRepository)(user_settings_entity_1.UserSettings)),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService,
        users_service_1.UsersService,
        config_1.ConfigService,
        organizations_service_1.OrganizationsService,
        email_service_1.EmailService,
        email_verification_service_1.EmailVerificationService])
], UserAccountService);
exports.UserAccountService = UserAccountService;
//# sourceMappingURL=user-account.service.js.map