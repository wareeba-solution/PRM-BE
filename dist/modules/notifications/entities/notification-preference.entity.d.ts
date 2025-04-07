import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationCategory } from '../enums/notification-category.enum';
import { NotificationFrequency } from '../enums/notification-frequency.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
export { NotificationChannel, NotificationCategory, NotificationFrequency };
export declare class NotificationPreference {
    id: string;
    organizationId: string;
    userId: string;
    category: NotificationCategory;
    channels: NotificationChannel[];
    enabledChannels: NotificationChannel[];
    frequency: NotificationFrequency;
    enabled: boolean;
    startTime?: string;
    endTime?: string;
    workDays?: string[];
    customSchedule?: {
        days: string[];
        times: string[];
        timezone: string;
    };
    channelSpecificSettings?: {
        email?: {
            addresses?: string[];
            format?: 'HTML' | 'TEXT';
            includeAttachments?: boolean;
        };
        sms?: {
            phoneNumbers?: string[];
            includeMedia?: boolean;
        };
        push?: {
            deviceTokens?: string[];
            sound?: boolean;
            badge?: boolean;
        };
        inApp?: {
            showBadge?: boolean;
            playSound?: boolean;
            markAsRead?: boolean;
        };
        whatsapp?: {
            numbers?: string[];
            allowMedia?: boolean;
        };
        slack?: {
            channels?: string[];
            mentionUser?: boolean;
        };
    };
    filters?: {
        priority?: string[];
        status?: string[];
        types?: string[];
        senders?: string[];
        keywords?: string[];
        excludeKeywords?: string[];
    };
    importanceThreshold: number;
    muteAll: boolean;
    muteUntil?: Date;
    digestSettings?: {
        groupBy?: string[];
        sortBy?: string;
        maxItems?: number;
        format?: string;
    };
    allowReminders: boolean;
    reminderInterval?: number;
    maxReminders: number;
    settings?: {
        quietHours?: {
            start: string;
            end: string;
            timezone: string;
        };
        digest?: {
            time: string;
            timezone: string;
        };
        [key: string]: any;
    };
    metadata?: {
        lastUpdated?: Date;
        [key: string]: any;
    };
    createdById: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: Promise<Organization>;
    user: Promise<User>;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
}
