// src/modules/tickets/dto/create-ticket.dto.ts

import {
    IsString,
    IsEnum,
    IsUUID,
    IsOptional,
    IsArray,
    ValidateNested,
    IsBoolean,
    MaxLength,
    MinLength,
    IsObject,
    IsDate,
    IsNumber,
    Min,
    Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TicketType } from '../enums/ticket.enums';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { TicketAttachment } from '../entities/ticket-attachment.entity';

export class CreateTicketDto {
    @IsString()
    @IsOptional() // Make optional to support frontend flow
    organizationId?: string;

    @IsString()
    @IsOptional() // Make optional to support frontend flow
    createdBy?: string;

    @IsString()
    @IsOptional() // For backward compatibility
    title?: string;

    // Frontend field - maps to title
    @IsString()
    @IsOptional()
    subject?: string;

    @IsString()
    @IsOptional() // Make optional
    description?: string;

    @IsEnum(TicketType)
    @IsOptional() // Make optional with default in controller
    type?: TicketType;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: string;

    @IsEnum(TicketSource)
    @IsOptional()
    source?: TicketSource;

    @IsEnum(TicketCategory)
    @IsOptional()
    category?: TicketCategory;

    @IsUUID()
    @IsOptional()
    assignedToId?: string;

    // Frontend field - can map to multiple fields
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagTeamMembers?: string[];

    @IsUUID()
    @IsOptional()
    patientId?: string;

    // Frontend field - maps to patientId
    @IsString()
    @IsOptional()
    patient?: string;

    @IsUUID()
    @IsOptional()
    relatedAppointmentId?: string;

    @IsUUID()
    @IsOptional()
    relatedLabResultId?: string;

    @IsUUID()
    @IsOptional()
    relatedPrescriptionId?: string;

    @IsDate()
    @IsOptional()
    dueDate?: Date;

    @IsString()
    @IsOptional()
    patientCondition?: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsOptional()
    timeSensitivity?: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsOptional()
    impactLevel?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @IsArray()
    @IsOptional()
    attachments?: TicketAttachment[];

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;

    @IsString()
    @IsOptional()
    internalNotes?: string;
}