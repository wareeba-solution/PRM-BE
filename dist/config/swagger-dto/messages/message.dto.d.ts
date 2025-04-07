import { BaseDto } from '../base.dto';
/**
 * Message DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class MessageDto extends BaseDto {
    organizationId: string;
    senderId: string;
    recipientId?: string;
    recipientType?: string;
    subject?: string;
    content: string;
    type: string;
    status: string;
    isRead: boolean;
    readAt?: Date;
    sentAt?: Date;
    deliveredAt?: Date;
    priority: string;
    conversationId?: string;
    replyToId?: string;
    hasAttachments: boolean;
    externalId?: string;
    metadata?: Record<string, any>;
    tags?: string[];
    scheduledFor?: Date;
}
