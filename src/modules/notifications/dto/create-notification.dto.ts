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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationPriority } from '../enums/notification-priority.enum';
import { NotificationType } from '../enums/notification-type.enum';

export { NotificationChannel, NotificationPriority, NotificationType };

export class NotificationAction {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    data?: Record<string, any>;
}

export class NotificationRecipient {
    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsString()
    role: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    organizationId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}

export class CreateNotificationDto {
    @ApiProperty({ enum: NotificationType })
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @ApiPropertyOptional({ enum: NotificationPriority })
    @IsOptional()
    @IsEnum(NotificationPriority)
    priority?: NotificationPriority = NotificationPriority.NORMAL;

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NotificationRecipient)
    recipients: NotificationRecipient[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NotificationAction)
    actions?: NotificationAction[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsISO8601()
    scheduledFor?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsISO8601()
    expiresAt?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    requireConfirmation?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    data?: Record<string, any>;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    category?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    groupId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    referenceId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(50)
    referenceType?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    silent?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    organizationId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    senderId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}