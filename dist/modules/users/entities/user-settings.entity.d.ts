import { User } from './user.entity';
export declare class UserSettings {
    id: string;
    userId: string;
    user: User;
    theme?: string;
    language?: string;
    timezone?: string;
    phone?: string;
    notificationPreferences?: {
        email?: boolean;
        sms?: boolean;
        inApp?: boolean;
        push?: boolean;
    };
    metadata?: {
        platform?: string;
        browser?: string;
        lastLoginIp?: string;
        lastUsed?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}
