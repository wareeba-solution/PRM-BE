import { IsString, IsUUID, IsOptional, IsEnum, IsObject, ValidateNested, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
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
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @IsUUID()
  @IsOptional()
  previousDepartmentId?: string;

  @IsUUID()
  @IsOptional()
  ticketId?: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;


  @IsObject()
  @IsOptional()
  additionalData?: Record<string, any>;
}

/**
 * DTO for sending a notification
 */
export class SendNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;


  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;


  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';


  @IsUUID()
  @IsOptional()
  organizationId?: string;


  @ValidateNested()
  @Type(() => NotificationDataDto)
  @IsOptional()
  data?: Record<string, any>;


  @IsBoolean()
  @IsOptional()
  sendImmediately?: boolean;


  @IsBoolean()
  @IsOptional()
  persist?: boolean;


  @IsOptional()
  scheduledFor?: Date;
}

/**
 * DTO for bulk sending notifications to multiple users
 */
export class BulkSendNotificationDto {

  @IsUUID('4', { each: true })
  @IsNotEmpty()
  userIds: string[];


  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;


  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';


  @IsUUID()
  @IsOptional()
  organizationId?: string;


  @ValidateNested()
  @Type(() => NotificationDataDto)
  @IsOptional()
  data?: Record<string, any>;


  @IsBoolean()
  @IsOptional()
  sendImmediately?: boolean;


  @IsBoolean()
  @IsOptional()
  persist?: boolean;


  @IsOptional()
  scheduledFor?: Date;
}