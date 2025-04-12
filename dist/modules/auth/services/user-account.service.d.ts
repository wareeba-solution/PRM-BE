import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { UsersService } from '../../users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { UserSettings } from '../../users/entities/user-settings.entity';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { OrganizationsService } from '../../organizations/services/organizations.service';
import { EmailService } from '../../../shared/services/email.service';
import { AuthService } from './auth.service';
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export declare class UserAccountService {
    private readonly userRepository;
    private readonly organizationRepository;
    private readonly userVerificationRepository;
    private readonly userSettingsRepository;
    private readonly authService;
    private readonly usersService;
    private readonly configService;
    private readonly organizationsService;
    private readonly emailService;
    constructor(userRepository: Repository<User>, organizationRepository: Repository<Organization>, userVerificationRepository: Repository<UserVerification>, userSettingsRepository: Repository<UserSettings>, authService: AuthService, usersService: UsersService, configService: ConfigService, organizationsService: OrganizationsService, emailService: EmailService);
    /**
     * Registers a new user and organization
     * @param registerDto Registration data
     * @returns Created user
     */
    register(registerDto: RegisterDto): Promise<{
        user: User;
    }>;
    /**
     * Sends a password reset email to the user
     * @param email The email address to send the reset link to
     */
    sendPasswordResetEmail(email: string): Promise<void>;
    /**
     * Resets a user's password using a reset token
     * @param token The password reset token
     * @param newPassword The new password
     */
    resetPassword(token: string, newPassword: string): Promise<void>;
    /**
     * Confirms a user's email using the verification token
     * @param token The email verification token
     */
    confirmEmail(token: string): Promise<void>;
    /**
     * Sends a verification email to the user
     * @param userId The ID of the user to send the verification email to
     */
    sendVerificationEmail(userId: string): Promise<void>;
    /**
     * Checks if email verification is required for a specific action
     * @param action The action to check
     * @returns boolean True if verification is required, false otherwise
     */
    isEmailVerificationRequired(action: string): Promise<boolean>;
}
