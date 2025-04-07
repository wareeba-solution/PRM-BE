import { IsNotEmpty, IsUUID, IsInt, IsString, IsBoolean, IsOptional, Min, Max, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateScheduleDto {
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @IsInt()
  @Min(0)
  @Max(6)
  @IsNotEmpty()
  dayOfWeek: number;

  @IsString()
  @IsNotEmpty()
  workStart: string;

  @IsString()
  @IsNotEmpty()
  workEnd: string;

  @IsString()
  @IsOptional()
  breakStart?: string;

  @IsString()
  @IsOptional()
  breakEnd?: string;

  @IsInt()
  @Min(5)
  @IsNotEmpty()
  defaultAppointmentDuration: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ValidateNested()
  @Type(() => ScheduleSettingsDto)
  @IsOptional()
  settings?: ScheduleSettingsDto;
}