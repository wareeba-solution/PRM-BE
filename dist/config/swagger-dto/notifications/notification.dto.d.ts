import { BaseDto } from '../base.dto';
/**
 * Notification DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class NotificationDto extends BaseDto {
    organizationId: string;
    userId: string;
    title: string;
    content: string;
    type: string;
    isRead: boolean;
    readAt?: Date;
    referenceId?: string;
    referenceType?: string;
    actionUrl?: string;
    priority: string;
    icon?: string;
    metadata?: Record<string, any>;
    channels?: string[];
    isDelivered: boolean;
    expiresAt?: Date;
}
