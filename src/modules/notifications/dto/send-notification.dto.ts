import { IsString, IsUUID, IsOptional, IsEnum, IsObject, ValidateNested, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '../enums/notification-type.enum';

/**
 * Enum for notification priorities
 */
export enum NotificationPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}


/**
 * DTO for notification data
 */
class NotificationDataDto {
  @ApiPropertyOptional({ description: 'Department ID' })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ description: 'Previous department ID' })
  @IsUUID()
  @IsOptional()
  previousDepartmentId?: string;

  @ApiPropertyOptional({ description: 'Ticket ID' })
  @IsUUID()
  @IsOptional()
  ticketId?: string;

  @ApiPropertyOptional({ description: 'Organization ID' })
  @IsUUID()
  @IsOptional()
  organizationId?: string;

  @ApiPropertyOptional({
    description: 'Any additional custom data',
    type: 'object',
    additionalProperties: true
  })
  @IsObject()
  @IsOptional()
  additionalData?: Record<string, any>;
}

/**
 * DTO for sending a notification
 */
export class SendNotificationDto {
  @ApiProperty({ description: 'User ID to receive the notification' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Notification type',
    enum: NotificationType,
    example: NotificationType.SYSTEM_ANNOUNCEMENT
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Notification title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Notification message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Notification priority',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM
  })
  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';

  @ApiPropertyOptional({
    description: 'Organization ID that this notification is related to'
  })
  @IsUUID()
  @IsOptional()
  organizationId?: string;

  @ApiPropertyOptional({
    description: 'Additional structured data for the notification',
    type: 'object',
    additionalProperties: true
  })
  @ValidateNested()
  @Type(() => NotificationDataDto)
  @IsOptional()
  data?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Whether to send the notification immediately',
    default: true
  })
  @IsBoolean()
  @IsOptional()
  sendImmediately?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the notification should be persisted in the database',
    default: true
  })
  @IsBoolean()
  @IsOptional()
  persist?: boolean;

  @ApiPropertyOptional({
    description: 'Scheduled time to deliver the notification (if not sending immediately)'
  })
  @IsOptional()
  scheduledFor?: Date;
}

/**
 * DTO for bulk sending notifications to multiple users
 */
export class BulkSendNotificationDto {
  @ApiProperty({
    description: 'List of user IDs to receive the notification',
    isArray: true,
    type: String
  })
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  userIds: string[];

  @ApiProperty({
    description: 'Notification type',
    enum: NotificationType,
    example: NotificationType.SYSTEM_ANNOUNCEMENT
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Notification title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Notification message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Notification priority',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM
  })
  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';

  @ApiPropertyOptional({
    description: 'Organization ID that this notification is related to'
  })
  @IsUUID()
  @IsOptional()
  organizationId?: string;

  @ApiPropertyOptional({
    description: 'Additional structured data for the notification',
    type: 'object',
    additionalProperties: true
  })
  @ValidateNested()
  @Type(() => NotificationDataDto)
  @IsOptional()
  data?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Whether to send the notification immediately',
    default: true
  })
  @IsBoolean()
  @IsOptional()
  sendImmediately?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the notification should be persisted in the database',
    default: true
  })
  @IsBoolean()
  @IsOptional()
  persist?: boolean;

  @ApiPropertyOptional({
    description: 'Scheduled time to deliver the notification (if not sending immediately)'
  })
  @IsOptional()
  scheduledFor?: Date;
}