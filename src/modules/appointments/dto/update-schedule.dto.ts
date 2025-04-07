import { IsInt, IsString, IsBoolean, IsOptional, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';

// For settings, we can reuse the structure from CreateScheduleDto
class ScheduleSettingsDto {
  @IsInt()
  @Min(5)
  @IsOptional()
  minAppointmentDuration?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  appointmentBuffer?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxAppointmentsPerDay?: number;

  @IsInt()
  @Min(5)
  @IsOptional()
  preferredDuration?: number;

  @IsBoolean()
  @IsOptional()
  allowOnlineBooking?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  advanceBookingDays?: number;
}

// Make all fields optional for updates
export class UpdateScheduleDto {
  @IsInt()
  @Min(0)
  @Max(6)
  @IsOptional()
  dayOfWeek?: number;

  @IsString()
  @IsOptional()
  workStart?: string;

  @IsString()
  @IsOptional()
  workEnd?: string;

  @IsString()
  @IsOptional()
  breakStart?: string;

  @IsString()
  @IsOptional()
  breakEnd?: string;

  @IsInt()
  @Min(5)
  @IsOptional()
  defaultAppointmentDuration?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ValidateNested()
  @Type(() => ScheduleSettingsDto)
  @IsOptional()
  settings?: ScheduleSettingsDto;
}