// src/modules/notifications/dto/create-notification.dto.ts

import {
    IsString,
    IsEnum,
    IsUUID,
    IsOptional,
    IsArray,
    ValidateNested,
    IsBoolean,
    IsNotEmpty,
    MaxLength,
    IsISO8601,
    IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationPriority } from '../enums/notification-priority.enum';
import { NotificationType } from '../enums/notification-type.enum';

export { NotificationChannel, NotificationPriority, NotificationType };

export class NotificationAction {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsOptional()
    @IsString()
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';

    @IsOptional()
    @IsObject()
    data?: Record<string, any>;
}

export class NotificationRecipient {
    @IsUUID()
    userId: string;

    @IsString()
    role: string;

    @IsOptional()
    @IsUUID()
    organizationId?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}

export class CreateNotificationDto {
    @IsEnum(NotificationType)
    type: NotificationType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsOptional()
    @IsEnum(NotificationPriority)
    priority?: NotificationPriority = NotificationPriority.NORMAL;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NotificationRecipient)
    recipients: NotificationRecipient[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NotificationAction)
    actions?: NotificationAction[];

    @IsOptional()
    @IsISO8601()
    scheduledFor?: string;

    @IsOptional()
    @IsISO8601()
    expiresAt?: string;

    @IsOptional()
    @IsBoolean()
    requireConfirmation?: boolean;

    @IsOptional()
    @IsObject()
    data?: Record<string, any>;

    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @IsOptional()
    @IsString()
    @MaxLength(100)
    category?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    groupId?: string;

    @IsOptional()
    @IsUUID()
    referenceId?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    referenceType?: string;

    @IsOptional()
    @IsBoolean()
    silent?: boolean;

    @IsOptional()
    @IsUUID()
    organizationId: string;

    @IsOptional()
    @IsUUID()
    senderId?: string;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}