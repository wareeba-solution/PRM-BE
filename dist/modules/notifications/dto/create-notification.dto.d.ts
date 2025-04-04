import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationPriority } from '../enums/notification-priority.enum';
import { NotificationType } from '../enums/notification-type.enum';
export { NotificationChannel, NotificationPriority, NotificationType };
export declare class NotificationAction {
    label: string;
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: Record<string, any>;
}
export declare class NotificationRecipient {
    userId: string;
    role: string;
    organizationId?: string;
    channels?: NotificationChannel[];
    metadata?: Record<string, any>;
}
export declare class CreateNotificationDto {
    type: NotificationType;
    title: string;
    content: string;
    priority?: NotificationPriority;
    recipients: NotificationRecipient[];
    actions?: NotificationAction[];
    scheduledFor?: string;
    expiresAt?: string;
    requireConfirmation?: boolean;
    data?: Record<string, any>;
    channels?: NotificationChannel[];
    category?: string;
    groupId?: string;
    referenceId?: string;
    referenceType?: string;
    silent?: boolean;
    organizationId: string;
    senderId?: string;
    metadata?: Record<string, any>;
}
