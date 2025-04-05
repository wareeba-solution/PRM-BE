import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { UsersService } from '../../users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { UserSettings } from '../../users/entities/user-settings.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly refreshTokenRepository;
    private readonly organizationRepository;
    private readonly jwtService;
    private readonly usersService;
    private readonly configService;
    private readonly userSettingsRepository;
    constructor(userRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>, organizationRepository: Repository<Organization>, jwtService: JwtService, usersService: UsersService, configService: ConfigService, userSettingsRepository: Repository<UserSettings>);
    /**
     * Checks if a token has been blacklisted
     * @param token The JWT token to check
     * @returns boolean True if the token is blacklisted, false otherwise
     */
    isTokenBlacklisted(token: string): boolean;
    /**
     * Determines if email verification is required
     * @returns boolean True if email verification is required, false otherwise
     */
    get requireEmailVerification(): boolean;
    checkOrganizationAccess(userId: string, organizationId: string): Promise<boolean>;
    getUserPermissions(userId: string): Promise<string[]>;
    checkResourceOwnership(userId: string, resourceId: string, resourceType: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        organizationId: string;
        firstName: string;
        lastName: string;
        email: string;
        role: Role;
        permissions: string[];
        isActive: boolean;
        isLocked: boolean;
        isEmailVerified: boolean;
        requirePasswordChange: boolean;
        lastLoginAt?: Date;
        lastActiveAt?: Date;
        createdById: string;
        updatedById?: string;
        refreshToken?: string;
        refreshTokenExpiresAt?: Date;
        passwordResetToken?: string;
        passwordResetExpiresAt?: Date;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
        organization: Promise<Organization>;
        createdBy: Promise<User>;
        updatedBy?: Promise<User>;
        profile: Promise<import("../../users/entities/user-profile.entity").UserProfile>;
        verification: Promise<import("../../users/entities/user-verification.entity").UserVerification>;
        settings: Promise<UserSettings>;
        assignedTickets: Promise<import("../../tickets/entities/ticket.entity").Ticket[]>;
        createdTickets: Promise<import("../../tickets/entities/ticket.entity").Ticket[]>;
        messages: Promise<import("../../messages/entities/message.entity").Message[]>;
        appointments: Promise<import("../../appointments/entities/appointment.entity").Appointment[]>;
        notifications: Promise<import("../../notifications/entities/notification.entity").Notification[]>;
        activities: Promise<import("../../users/entities/user-activity.entity").UserActivity[]>;
    }>;
    login(loginDto: LoginDto, metadata: {
        userAgent: string;
        ip: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: Role;
            organizationId: string;
        };
    }>;
    register(registerDto: RegisterDto, metadata: {
        userAgent: string;
        ip: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: Role;
            organizationId: string;
        };
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
    }>;
    private generateRefreshToken;
    logout(userId: string): Promise<{
        message: string;
    }>;
    validateOrganizationAccess(userId: string, organizationId: string): Promise<boolean>;
    private generateSlug;
    private extractPlatform;
    private extractBrowser;
    sendPasswordResetEmail(email: string): Promise<void>;
    changePassword(token: string, newPassword: string): Promise<void>;
    confirmEmail(token: string): Promise<void>;
    sendVerificationEmail(userId: string): Promise<void>;
}
