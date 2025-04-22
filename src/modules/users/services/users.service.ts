// src/modules/users/services/users.service.ts

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { hash, compare } from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserActivity } from '../entities/user-activity.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserQueryDto } from '../dto/user-query.dto';
import { Role } from '../enums/role.enum';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { paginate } from 'nestjs-typeorm-paginate';
import { UserSettings } from '../entities/user-settings.entity';
import { UserVerification } from '../entities/user-verification.entity';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    // Define permissions map as a class property with all possible roles
    private readonly permissionsByRole: Record<string, string[]> = {
        [Role.SUPER_ADMIN]: [
            'all.read', 'all.create', 'all.update', 'all.delete',
            'users.manage', 'organizations.manage', 'settings.manage',
            'reports.access', 'permissions.manage', 'billing.manage'
        ],
        [Role.ADMIN]: [
            'users.read', 'users.create', 'users.update', 'users.delete',
            'contacts.read', 'contacts.create', 'contacts.update', 'contacts.delete',
            'appointments.read', 'appointments.create', 'appointments.update', 'appointments.delete',
            'reports.access', 'settings.manage', 'notifications.manage'
        ],
        [Role.MANAGER]: [
            'users.read', 'contacts.read', 'contacts.create', 'contacts.update',
            'appointments.read', 'appointments.create', 'appointments.update',
            'reports.access', 'tasks.manage'
        ],
        [Role.DOCTOR]: [
            'contacts.read', 'contacts.create', 'contacts.update',
            'appointments.read', 'appointments.create', 'appointments.update',
            'medical.read', 'medical.write'
        ],
        [Role.NURSE]: [
            'contacts.read', 'contacts.update',
            'appointments.read', 'appointments.update',
            'medical.read', 'medical.write', 'vitals.manage'
        ],
        [Role.STAFF]: [
            'contacts.read', 'appointments.read', 'appointments.create',
            'tasks.read', 'tasks.create'
        ]
    };

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserActivity)
        private readonly activityRepository: Repository<UserActivity>,
        @InjectRepository(UserSettings)
        private readonly userSettingsRepository: Repository<UserSettings>,
        @InjectRepository(UserVerification)
        private readonly userVerificationRepository: Repository<UserVerification>,
        private readonly dataSource: DataSource,
        private readonly eventEmitter: EventEmitter2,
        private readonly notificationsService: NotificationsService,
        private readonly configService: ConfigService,
    ) { }

    async findByRole(role: string, organizationId: string): Promise<User[]> {
        return this.userRepository.find({
            where: {
                role: role as Role,
                organizationId,
            },
        });
    }

    async create(data: CreateUserDto & { organizationId: string; createdBy: string; requireEmailVerification?: boolean }): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Check for existing user by email
            const existingUser = await this.userRepository.findOne({
                where: { email: data.email },
            });

            if (existingUser) {
                throw new ConflictException('Email already registered');
            }

            // Check for existing phone number in user settings
            if (data.phoneNumber) {
                const existingPhone = await this.userSettingsRepository
                    .createQueryBuilder('settings')
                    .where('settings.phone = :phone', { phone: data.phoneNumber })
                    .getOne();

                if (existingPhone) {
                    throw new ConflictException('Phone number already registered');
                }
            }

            const hashedPassword = await hash(data.password, 12);
            const { createdBy, phoneNumber, requireEmailVerification = true, ...userData } = data;

            // Set isEmailVerified to false when verification is required
            const user = this.userRepository.create({
                ...userData,
                password: hashedPassword,
                isEmailVerified: !requireEmailVerification, // Only set to true if verification not required
                createdById: createdBy,
            });

            await queryRunner.manager.save(user);

            // Create user settings with phone number
            if (phoneNumber) {
                const settings = new UserSettings();
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
                const token = uuidv4();
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

            const { password, ...result } = user;
            return result as User;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findById(id: string, relations: string[] = []): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id },
            relations
        });
    }

    async findAll(query: UserQueryDto & { organizationId: string }) {
        const {
            organizationId,
            role,
            isActive,
            search,
            department,
            page = 1,
            limit = 10,
        } = query;

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
            queryBuilder.andWhere(
                '(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))',
                { search: `%${search}%` }
            );
        }

        return paginate(queryBuilder, { page, limit });
    }

    async findOne(id: string, organizationId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id, organizationId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async update(
        id: string,
        data: UpdateUserDto & { organizationId: string; updatedBy: string }
    ): Promise<User> {
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

    async updateProfile(
        id: string,
        data: UpdateProfileDto & { organizationId: string }
    ): Promise<User> {
        const user = await this.findOne(id, data.organizationId);

        Object.assign(user, data);
        return this.userRepository.save(user);
    }

    async updatePassword(
        id: string,
        data: UpdatePasswordDto & { organizationId: string }
    ): Promise<void> {
        const user = await this.findOne(id, data.organizationId);

        const isValidPassword = await compare(data.currentPassword, user.password);
        if (!isValidPassword) {
            throw new BadRequestException('Current password is incorrect');
        }

        user.password = await hash(data.newPassword, 12);
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

    async remove(id: string, organizationId: string): Promise<void> {
        const user = await this.findOne(id, organizationId);
        await this.userRepository.softRemove(user);
    }

    async activate(id: string, organizationId: string): Promise<User> {
        const user = await this.findOne(id, organizationId);
        user.isActive = true;
        user.isLocked = false;
        return this.userRepository.save(user);
    }

    async deactivate(id: string, organizationId: string): Promise<User> {
        const user = await this.findOne(id, organizationId);
        user.isActive = false;
        return this.userRepository.save(user);
    }

    async getAdminCount(organizationId: string): Promise<number> {
        return this.userRepository.count({
            where: {
                organizationId,
                role: Role.ADMIN,
                isActive: true,
            },
        });
    }

    async getActivity(id: string, query: { organizationId: string }) {
        return this.activityRepository.find({
            where: {
                userId: id,
                organizationId: query.organizationId,
            },
            order: { createdAt: 'DESC' },
        });
    }

    async getPermissions(userId: string, organizationId: string): Promise<string[]> {
        const user = await this.findOne(userId, organizationId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Return the permissions for the user's role or an empty array if the role isn't defined
        return this.permissionsByRole[user.role] || [];
    }

    async findByEmail(email: string, organizationId: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                email: email.toLowerCase(),
                organizationId
            }
        });
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return compare(password, user.password);
    }

    async sendPasswordResetEmail(user: User): Promise<void> {
        const token = uuidv4();
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

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: token }
        });

        if (!user) {
            throw new NotFoundException('Invalid or expired reset token');
        }

        if (user.passwordResetExpiresAt < new Date()) {
            throw new BadRequestException('Reset token has expired');
        }

        user.password = await hash(newPassword, 12);
        user.passwordResetToken = null;
        user.passwordResetExpiresAt = null;
        await this.userRepository.save(user);
    }

    async findUsersByRole(organizationId: string, role: string): Promise<User[]> {
        return this.userRepository.find({
            where: {
                organizationId,
                role: role as Role,
                isActive: true
            }
        });
    }

    /**
     * Generate a verification token for a user
     */
    async generateEmailVerificationToken(userId: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check if user already has a verification record
        let verification = await this.userVerificationRepository.findOne({
            where: { userId }
        });

        // Generate a random token
        const token = uuidv4();

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
        } else {
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
    async sendVerificationEmail(userId: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });

        if (!user) {
            throw new NotFoundException('User not found');
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

        return {
            userId: user.id,
            email: user.email,
        };
    }

    /**
     * Check if a user's email is verified
     */
    async isEmailVerified(userId: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        return user?.isEmailVerified || false;
    }

    /**
     * Send a welcome email after email verification
     */
    async sendWelcomeEmail(userId: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization']
        });

        if (!user) {
            throw new NotFoundException('User not found');
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
}