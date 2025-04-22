"use strict";
// src/modules/users/services/users.service.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const user_activity_entity_1 = require("../entities/user-activity.entity");
const role_enum_1 = require("../enums/role.enum");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const user_settings_entity_1 = require("../entities/user-settings.entity");
const user_verification_entity_1 = require("../entities/user-verification.entity");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, activityRepository, userSettingsRepository, userVerificationRepository, dataSource, eventEmitter, notificationsService, configService) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.userSettingsRepository = userSettingsRepository;
        this.userVerificationRepository = userVerificationRepository;
        this.dataSource = dataSource;
        this.eventEmitter = eventEmitter;
        this.notificationsService = notificationsService;
        this.configService = configService;
        this.logger = new common_1.Logger(UsersService_1.name);
        // Define permissions map as a class property with all possible roles
        this.permissionsByRole = {
            [role_enum_1.Role.SUPER_ADMIN]: [
                'all.read', 'all.create', 'all.update', 'all.delete',
                'users.manage', 'organizations.manage', 'settings.manage',
                'reports.access', 'permissions.manage', 'billing.manage'
            ],
            [role_enum_1.Role.ADMIN]: [
                'users.read', 'users.create', 'users.update', 'users.delete',
                'contacts.read', 'contacts.create', 'contacts.update', 'contacts.delete',
                'appointments.read', 'appointments.create', 'appointments.update', 'appointments.delete',
                'reports.access', 'settings.manage', 'notifications.manage'
            ],
            [role_enum_1.Role.MANAGER]: [
                'users.read', 'contacts.read', 'contacts.create', 'contacts.update',
                'appointments.read', 'appointments.create', 'appointments.update',
                'reports.access', 'tasks.manage'
            ],
            [role_enum_1.Role.DOCTOR]: [
                'contacts.read', 'contacts.create', 'contacts.update',
                'appointments.read', 'appointments.create', 'appointments.update',
                'medical.read', 'medical.write'
            ],
            [role_enum_1.Role.NURSE]: [
                'contacts.read', 'contacts.update',
                'appointments.read', 'appointments.update',
                'medical.read', 'medical.write', 'vitals.manage'
            ],
            [role_enum_1.Role.STAFF]: [
                'contacts.read', 'appointments.read', 'appointments.create',
                'tasks.read', 'tasks.create'
            ]
        };
    }
    async findByRole(role, organizationId) {
        return this.userRepository.find({
            where: {
                role: role,
                organizationId,
            },
        });
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Check for existing user by email
            const existingUser = await this.userRepository.findOne({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email already registered');
            }
            // Check for existing phone number in user settings
            if (data.phoneNumber) {
                const existingPhone = await this.userSettingsRepository
                    .createQueryBuilder('settings')
                    .where('settings.phone = :phone', { phone: data.phoneNumber })
                    .getOne();
                if (existingPhone) {
                    throw new common_1.ConflictException('Phone number already registered');
                }
            }
            const hashedPassword = await (0, bcrypt_1.hash)(data.password, 12);
            const { createdBy, phoneNumber, requireEmailVerification = true } = data, userData = __rest(data, ["createdBy", "phoneNumber", "requireEmailVerification"]);
            // Set isEmailVerified to false when verification is required
            const user = this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, isEmailVerified: !requireEmailVerification, createdById: createdBy }));
            await queryRunner.manager.save(user);
            // Create user settings with phone number
            if (phoneNumber) {
                const settings = new user_settings_entity_1.UserSettings();
                settings.userId = user.id;
                settings.phone = phoneNumber;
                settings.notificationPreferences = {
                    email: true,
                    sms: true,
                    inApp: true,
                    push: false
                };
                await queryRunner.manager.save(settings);
            }
            // Create verification record if verification is required
            if (requireEmailVerification) {
                const token = (0, uuid_1.v4)();
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour expiry
                const verification = this.userVerificationRepository.create({
                    userId: user.id,
                    isEmailVerified: false,
                    emailVerificationToken: token,
                    emailVerificationExpires: expiresAt,
                    lastEmailVerificationSent: new Date(),
                });
                await queryRunner.manager.save(verification);
                // Store token temporarily for email sending after commit
                user['verificationToken'] = token;
            }
            // Record activity
            const activity = this.activityRepository.create({
                userId: user.id,
                organizationId: data.organizationId,
                action: 'USER_CREATED',
                performedById: data.createdBy,
            });
            await queryRunner.manager.save(activity);
            await queryRunner.commitTransaction();
            // Send welcome notification
            await this.notificationsService.create({
                type: 'WELCOME',
                title: 'Welcome to the System',
                content: `Welcome ${user.firstName}! Your account has been created successfully.`,
                recipients: [{ userId: user.id }],
                organizationId: data.organizationId,
                senderId: data.createdBy,
            });
            this.eventEmitter.emit('user.created', user);
            // Log verification token in development environment
            if (requireEmailVerification && user['verificationToken'] && process.env.NODE_ENV !== 'production') {
                this.logger.debug(`Verification token for ${user.email}: ${user['verificationToken']}`);
            }
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findById(id, relations = []) {
        return this.userRepository.findOne({
            where: { id },
            relations
        });
    }
    async findAll(query) {
        const { organizationId, role, isActive, search, department, page = 1, limit = 10, } = query;
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.organizationId = :organizationId', { organizationId });
        if (role) {
            queryBuilder.andWhere('user.role = :role', { role });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('user.isActive = :isActive', { isActive });
        }
        if (department) {
            queryBuilder.andWhere('user.department = :department', { department });
        }
        if (search) {
            queryBuilder.andWhere('(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const user = await this.userRepository.findOne({
            where: { id, organizationId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, data) {
        const user = await this.findOne(id, data.organizationId);
        Object.assign(user, data);
        await this.userRepository.save(user);
        // Record activity
        await this.activityRepository.save({
            userId: user.id,
            organizationId: data.organizationId,
            action: 'USER_UPDATED',
            performedById: data.updatedBy,
        });
        return user;
    }
    async updateProfile(id, data) {
        const user = await this.findOne(id, data.organizationId);
        Object.assign(user, data);
        return this.userRepository.save(user);
    }
    async updatePassword(id, data) {
        const user = await this.findOne(id, data.organizationId);
        const isValidPassword = await (0, bcrypt_1.compare)(data.currentPassword, user.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        user.password = await (0, bcrypt_1.hash)(data.newPassword, 12);
        user.requirePasswordChange = false;
        await this.userRepository.save(user);
        // Record activity
        await this.activityRepository.save({
            userId: user.id,
            organizationId: data.organizationId,
            action: 'PASSWORD_CHANGED',
            performedById: user.id,
        });
    }
    async remove(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        await this.userRepository.softRemove(user);
    }
    async activate(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        user.isActive = true;
        user.isLocked = false;
        return this.userRepository.save(user);
    }
    async deactivate(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        user.isActive = false;
        return this.userRepository.save(user);
    }
    async getAdminCount(organizationId) {
        return this.userRepository.count({
            where: {
                organizationId,
                role: role_enum_1.Role.ADMIN,
                isActive: true,
            },
        });
    }
    async getActivity(id, query) {
        return this.activityRepository.find({
            where: {
                userId: id,
                organizationId: query.organizationId,
            },
            order: { createdAt: 'DESC' },
        });
    }
    async getPermissions(userId, organizationId) {
        const user = await this.findOne(userId, organizationId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        // Return the permissions for the user's role or an empty array if the role isn't defined
        return this.permissionsByRole[user.role] || [];
    }
    async findByEmail(email, organizationId) {
        return this.userRepository.findOne({
            where: {
                email: email.toLowerCase(),
                organizationId
            }
        });
    }
    async validatePassword(user, password) {
        return (0, bcrypt_1.compare)(password, user.password);
    }
    async sendPasswordResetEmail(user) {
        const token = (0, uuid_1.v4)();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry
        user.passwordResetToken = token;
        user.passwordResetExpiresAt = expiresAt;
        await this.userRepository.save(user);
        // TODO: Implement email sending logic
        this.logger.debug(`Password reset link for ${user.email}: ${this.configService.get('APP_URL')}/reset-password?token=${token}`);
        // In a real implementation, you would send an email with the reset link
        // Example:
        /*
        await this.emailService.sendMail(
            user.email,
            'Reset Your Password',
            `<p>Click here to reset your password: ${this.configService.get('APP_URL')}/reset-password?token=${token}</p>`
        );
        */
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: token }
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid or expired reset token');
        }
        if (user.passwordResetExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Reset token has expired');
        }
        user.password = await (0, bcrypt_1.hash)(newPassword, 12);
        user.passwordResetToken = null;
        user.passwordResetExpiresAt = null;
        await this.userRepository.save(user);
    }
    async findUsersByRole(organizationId, role) {
        return this.userRepository.find({
            where: {
                organizationId,
                role: role,
                isActive: true
            }
        });
    }
    /**
     * Generate a verification token for a user
     */
    async generateEmailVerificationToken(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        // Check if user already has a verification record
        let verification = await this.userVerificationRepository.findOne({
            where: { userId }
        });
        // Generate a random token
        const token = (0, uuid_1.v4)();
        // Set expiration (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
        if (!verification) {
            // Create a new verification entry
            verification = this.userVerificationRepository.create({
                userId,
                isEmailVerified: false,
                emailVerificationToken: token,
                emailVerificationExpires: expiresAt,
                lastEmailVerificationSent: new Date()
            });
        }
        else {
            // Update existing verification entry
            verification.emailVerificationToken = token;
            verification.emailVerificationExpires = expiresAt;
            verification.lastEmailVerificationSent = new Date();
        }
        await this.userVerificationRepository.save(verification);
        return token;
    }
    /**
     * Send a verification email to a user
     */
    async sendVerificationEmail(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        // Generate a token
        const token = await this.generateEmailVerificationToken(userId);
        const verificationUrl = `${this.configService.get('APP_URL')}/verify-email?token=${token}`;
        // TODO: Implement email sending logic
        this.logger.debug(`Verification link for ${user.email}: ${verificationUrl}`);
        // In a real implementation, you would send an email with the verification link
        // Example:
        /*
        await this.emailService.sendMail(
            user.email,
            'Verify Your Email Address',
            `<p>Click here to verify your email address: ${verificationUrl}</p>`
        );
        */
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
        return {
            userId: user.id,
            email: user.email,
        };
    }
    /**
     * Check if a user's email is verified
     */
    async isEmailVerified(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        return (user === null || user === void 0 ? void 0 : user.isEmailVerified) || false;
    }
    /**
     * Send a welcome email after email verification
     */
    async sendWelcomeEmail(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        // TODO: Implement email sending logic
        this.logger.debug(`Welcome email sent to ${user.email}`);
        // In a real implementation, you would send a welcome email
        // Example:
        /*
        await this.emailService.sendMail(
            user.email,
            `Welcome to ${user.organization?.name || 'Our Platform'}`,
            `<p>Hello ${user.firstName},</p><p>Your account has been fully verified. You can now access all features of our platform.</p>`
        );
        */
    }
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_settings_entity_1.UserSettings)),
    __param(3, (0, typeorm_1.InjectRepository)(user_verification_entity_1.UserVerification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        event_emitter_1.EventEmitter2,
        notifications_service_1.NotificationsService,
        config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map