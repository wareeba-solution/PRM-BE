import { SmsTemplate } from '../entities/sms-template.entity';
/**
 * Status of SMS delivery
 */
export declare enum SmsStatus {
    PENDING = "pending",
    SENT = "sent",
    DELIVERED = "delivered",
    FAILED = "failed",
    UNDELIVERED = "undelivered",
    REJECTED = "rejected"
}
/**
 * Entity to log all SMS communications
 */
export declare class SmsLog {
    id: string;
    to: string;
    from: string;
    message: string;
    status: SmsStatus;
    statusMessage: string;
    externalId: string;
    organizationId: string;
    appointmentId: string;
    contactId: string;
    templateId: string;
    template: SmsTemplate;
    provider: string;
    variables: Record<string, any>;
    providerResponse: Record<string, any>;
    segments: number;
    cost: number;
    currency: string;
    ipAddress: string;
    createdAt: Date;
    updatedAt: Date;
    deliveredAt: Date;
    createdById: string;
    /**
     * Optional metadata for additional properties
     */
    metadata: Record<string, any>;
}
