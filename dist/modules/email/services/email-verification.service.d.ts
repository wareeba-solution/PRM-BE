import { Repository } from 'typeorm';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { User } from '../../users/entities/user.entity';
import { EmailService } from './email.service';
import { EmailTemplateService } from './email-template.service';
import { ConfigService } from '@nestjs/config';
export declare class EmailVerificationService {
    private userVerificationRepository;
    private userRepository;
    private emailService;
    private emailTemplateService;
    private configService;
    private readonly logger;
    constructor(userVerificationRepository: Repository<UserVerification>, userRepository: Repository<User>, emailService: EmailService, emailTemplateService: EmailTemplateService, configService: ConfigService);
    /**
     * Generate a verification token for a user
     */
    generateVerificationToken(userId: string): Promise<string>;
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
     * Check if a token is valid (for front-end validation without consuming the token)
     */
    isTokenValid(token: string): Promise<boolean>;
    /**
     * Send a welcome email after verification
     */
    sendWelcomeEmail(userId: string): Promise<void>;
}
