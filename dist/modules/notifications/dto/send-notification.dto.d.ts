export declare enum NotificationPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}
export declare class SendNotificationDto {
    userId: string;
    type: string;
    title: string;
    message: string;
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    organizationId?: string;
    data?: Record<string, any>;
    sendImmediately?: boolean;
    persist?: boolean;
    scheduledFor?: Date;
}
export declare class BulkSendNotificationDto {
    userIds: string[];
    type: string;
    title: string;
    message: string;
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    organizationId?: string;
    data?: Record<string, any>;
    sendImmediately?: boolean;
    persist?: boolean;
    scheduledFor?: Date;
}
