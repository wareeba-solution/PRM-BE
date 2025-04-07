// src/modules/appointments/dto/create-appointment.dto.ts

import {
    IsNotEmpty,
    IsUUID,
    IsDateString,
    IsString,
    IsOptional,
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

class ReminderPreferencesDto {
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
    reminderTimes?: number[];
}

class AppointmentFormDataDto {
    @IsOptional()
    @IsObject()
    fields?: Record<string, any>;

    @IsOptional()
    @IsString()
    templateId?: string;
}

class AppointmentMetadataDto {
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

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsUUID()
    patientId: string;
    isRecurring?: boolean;
    recurrencePattern?: any; // Add the recurrencePattern property

    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsDateString()
    startTime: string;

    @IsNotEmpty()
    @IsDateString()
    endTime: string;

    @IsNotEmpty()
    @IsEnum(AppointmentType)
    type: AppointmentType;

    @IsOptional()
    @IsEnum(AppointmentPriority)
    priority?: AppointmentPriority;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    location?: string;

    @ValidateIf(o => o.type === AppointmentType.VIRTUAL)
    @IsString()
    @MaxLength(500)
    meetingLink?: string;

    @IsOptional()
    @IsBoolean()
    sendReminders?: boolean;

    @IsOptional()
    @Type(() => ReminderPreferencesDto)
    reminderPreferences?: ReminderPreferencesDto;

    @IsOptional()
    @Type(() => AppointmentFormDataDto)
    formData?: AppointmentFormDataDto;

    @IsOptional()
    @Type(() => AppointmentMetadataDto)
    metadata?: AppointmentMetadataDto;
}