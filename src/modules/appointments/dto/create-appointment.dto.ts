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
import { AppointmentStatus } from '../enums/appointment-status.enum';


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

    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsNotEmpty()
    @IsDateString()
    startTime: string;

    @IsNotEmpty()
    @IsDateString()
    endTime: string;

    @IsOptional()
    @IsEnum(AppointmentType)
    type?: AppointmentType;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsBoolean()
    isRecurring?: boolean;

    @IsOptional()
    recurrenceRule?: any;
}