// src/modules/notifications/dto/update-notification.dto.ts

import { CreateNotificationDto } from './create-notification.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export enum NotificationStatus {
    SCHEDULED = 'SCHEDULED',
    PENDING = 'PENDING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    READ = 'READ',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED',
    PROCESSING = "PROCESSING",
    RETRY_PENDING = "RETRY_PENDING",
}

export class UpdateNotificationDto extends PartialType(
    OmitType(CreateNotificationDto, ['type', 'recipients'] as const)
) {
    @IsOptional()
    @IsEnum(NotificationStatus)
    status?: NotificationStatus;
    isDeleted?: boolean;

    @IsOptional()
    @IsBoolean()
    read?: boolean;
}