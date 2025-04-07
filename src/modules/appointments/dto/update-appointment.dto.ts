// src/modules/appointments/dto/update-appointment.dto.ts

import {
    IsOptional,
    IsUUID,
    IsDateString,
    IsString,
    IsEnum,
    IsBoolean,
    ValidateIf,
    MinLength,
    MaxLength,
    IsArray,
    IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export class UpdateReminderPreferencesDto {
    @IsOptional()
    @IsBoolean()
    email?: boolean;

    @IsOptional()
    @IsBoolean()
    sms?: boolean;

    @IsOptional()
    @IsBoolean()
    push?: boolean;

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    reminderTimes?: number[];
}

export class UpdateAppointmentFormDataDto {
    @IsOptional()
    @IsObject()
    fields?: Record<string, any>;

    @IsOptional()
    @IsString()
    templateId?: string;
}

export class UpdateAppointmentMetadataDto {
    @IsOptional()
    @IsObject()
    customFields?: Record<string, any>;

    @IsOptional()
    @IsObject()
    externalRefs?: Record<string, string>;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}

export class UpdateAppointmentDto {
    @IsOptional()
    @IsUUID()
    doctorId?: string;

    @IsOptional()
    @IsDateString()
    startTime?: string;

    @IsOptional()
    @IsDateString()
    endTime?: string;

    @IsOptional()
    @IsEnum(AppointmentType)
    type?: AppointmentType;

    @IsOptional()
    @IsEnum(AppointmentPriority)
    priority?: AppointmentPriority;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    location?: string;

    @IsOptional()
    @ValidateIf(o => o.type === AppointmentType.VIRTUAL)
    @IsString()
    @MaxLength(500)
    meetingLink?: string;

    @IsOptional()
    @IsBoolean()
    sendReminders?: boolean;

    @IsOptional()
    @Type(() => UpdateReminderPreferencesDto)
    reminderPreferences?: UpdateReminderPreferencesDto;

    @IsOptional()
    @Type(() => UpdateAppointmentFormDataDto)
    formData?: UpdateAppointmentFormDataDto;

    @IsOptional()
    @Type(() => UpdateAppointmentMetadataDto)
    metadata?: UpdateAppointmentMetadataDto;

    @IsOptional()
    @ValidateIf(o => o.status === AppointmentStatus.CANCELLED)
    @IsString()
    @MinLength(3)
    @MaxLength(500)
    cancellationReason?: string;

    @IsOptional()
    @ValidateIf(o => o.status === AppointmentStatus.RESCHEDULED)
    @IsString()
    @MinLength(3)
    @MaxLength(500)
    reschedulingReason?: string;
}