import { IsNotEmpty, IsUUID, IsString, IsBoolean, IsOptional, IsEnum, IsDate, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export enum ScheduleExceptionType {
  VACATION = 'VACATION',
  SICK_LEAVE = 'SICK_LEAVE',
  CONFERENCE = 'CONFERENCE',
  PERSONAL = 'PERSONAL',
  OTHER = 'OTHER',
}

export class CreateExceptionDto {
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsBoolean()
  @IsNotEmpty()
  isFullDay: boolean;

  @IsEnum(ScheduleExceptionType)
  @IsNotEmpty()
  type: ScheduleExceptionType;

  @IsString()
  @IsOptional()
  reason?: string;
}