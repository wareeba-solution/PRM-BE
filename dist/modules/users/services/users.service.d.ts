import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../entities/user.entity';
import { UserActivity } from '../entities/user-activity.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserQueryDto } from '../dto/user-query.dto';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UserSettings } from '../entities/user-settings.entity';
import { UserVerification } from '../entities/user-verification.entity';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly userRepository;
    private readonly activityRepository;
    private readonly userSettingsRepository;
    private readonly userVerificationRepository;
    private readonly dataSource;
    private readonly eventEmitter;
    private readonly notificationsService;
    private readonly configService;
    private readonly logger;
    private readonly permissionsByRole;
    constructor(userRepository: Repository<User>, activityRepository: Repository<UserActivity>, userSettingsRepository: Repository<UserSettings>, userVerificationRepository: Repository<UserVerification>, dataSource: DataSource, eventEmitter: EventEmitter2, notificationsService: NotificationsService, configService: ConfigService);
    findByRole(role: string, organizationId: string): Promise<User[]>;
    create(data: CreateUserDto & {
        organizationId: string;
        createdBy: string;
        requireEmailVerification?: boolean;
    }): Promise<User>;
    findById(id: string, relations?: string[]): Promise<User | null>;
    findAll(query: UserQueryDto & {
        organizationId: string;
    }): Promise<import("nestjs-typeorm-paginate").Pagination<User, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: string, organizationId: string): Promise<User>;
    update(id: string, data: UpdateUserDto & {
        organizationId: string;
        updatedBy: string;
    }): Promise<User>;
    updateProfile(id: string, data: UpdateProfileDto & {
        organizationId: string;
    }): Promise<User>;
    updatePassword(id: string, data: UpdatePasswordDto & {
        organizationId: string;
    }): Promise<void>;
    remove(id: string, organizationId: string): Promise<void>;
    activate(id: string, organizationId: string): Promise<User>;
    deactivate(id: string, organizationId: string): Promise<User>;
    getAdminCount(organizationId: string): Promise<number>;
    getActivity(id: string, query: {
        organizationId: string;
    }): Promise<UserActivity[]>;
    getPermissions(userId: string, organizationId: string): Promise<string[]>;
    findByEmail(email: string, organizationId: string): Promise<User | null>;
    validatePassword(user: User, password: string): Promise<boolean>;
    sendPasswordResetEmail(user: User): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    findUsersByRole(organizationId: string, role: string): Promise<User[]>;
    /**
     * Generate a verification token for a user
     */
    generateEmailVerificationToken(userId: string): Promise<string>;
    /**
     * Send a verification email to a user
     */
    sendVerificationEmail(userId: string): Promise<void>;
    /**
     * Verify a user's email with a token
     */
    verifyEmail(token: string): Promise<{
        userId: string;
        email: string;
    }>;
    /**
     * Check if a user's email is verified
     */
    isEmailVerified(userId: string): Promise<boolean>;
    /**
     * Send a welcome email after email verification
     */
    sendWelcomeEmail(userId: string): Promise<void>;
}
