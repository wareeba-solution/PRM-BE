// src/modules/users/services/users.service.ts

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
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
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
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
        private readonly dataSource: DataSource,
        private readonly eventEmitter: EventEmitter2,
        private readonly notificationsService: NotificationsService,
    ) { }

    async findByRole(role: string, organizationId: string): Promise<User[]> {
        return this.userRepository.find({
          where: {
            role: role as Role,
            organizationId,
          },
        });
      }

    async create(data: CreateUserDto & { organizationId: string; createdBy: string }): Promise<User> {
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
            const { createdBy, phoneNumber, ...userData } = data;
            const user = this.userRepository.create({
                ...userData,
                password: hashedPassword,
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
        console.log(`Password reset link for ${user.email}: https://your-app.com/reset-password?token=${token}`);
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
}