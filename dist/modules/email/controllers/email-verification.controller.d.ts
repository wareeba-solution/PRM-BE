import { EmailVerificationService } from '../services/email-verification.service';
export declare class EmailVerificationController {
    private emailVerificationService;
    constructor(emailVerificationService: EmailVerificationService);
    verifyEmail(token: string): Promise<{
        url: string;
    }>;
}
