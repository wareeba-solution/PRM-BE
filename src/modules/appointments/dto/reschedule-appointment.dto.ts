// src/modules/appointments/dto/reschedule-appointment.dto.ts

import { IsDateString, IsNotEmpty, IsOptional, IsUUID, IsString, ValidateIf, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class RescheduleAppointmentDto {
  @IsNotEmpty({ message: 'Start time is required' })
  @IsDateString({}, { message: 'Start time must be a valid ISO date string' })
  startTime: string;

  @IsNotEmpty({ message: 'End time is required' })
  @IsDateString({}, { message: 'End time must be a valid ISO date string' })
  endTime: string;

  @IsOptional()
  @IsUUID('4', { message: 'Provider ID must be a valid UUID' })
  providerId?: string;

  @IsOptional()
  @IsString({ message: 'Reschedule reason must be a string' })
  reason?: string;

  @IsOptional()
  @IsBoolean({ message: 'Notify patient must be a boolean value' })
  @Type(() => Boolean)
  notifyPatient?: boolean = true;

  @IsOptional()
  @ValidateIf(o => o.notifyPatient === true)
  @IsString({ message: 'Notification message must be a string' })
  notificationMessage?: string;

  @IsOptional()
  @IsBoolean({ message: 'Require confirmation must be a boolean value' })
  @Type(() => Boolean)
  requireConfirmation?: boolean = false;

  // These fields will be set by the controller
  organizationId?: string;
  updatedBy?: string;
}