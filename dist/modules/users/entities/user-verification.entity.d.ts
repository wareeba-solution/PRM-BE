import { User } from './user.entity';
export declare class UserVerification {
    id: string;
    userId: string;
    user: User;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    emailVerifiedAt?: Date;
    phoneVerifiedAt?: Date;
    lastEmailVerificationSent?: Date;
    lastPhoneVerificationSent?: Date;
    emailVerificationToken?: string;
    phoneVerificationToken?: string;
    emailVerificationExpires?: Date;
    phoneVerificationExpires?: Date;
    deviceTokens?: string[];
    createdAt: Date;
    updatedAt: Date;
}
