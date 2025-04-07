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
} from 'class-validator';
import { Type } from 'class-transformer';
import { TicketType } from '../enums/ticket-type.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { TicketAttachment } from '../entities/ticket-attachment.entity';

export class CreateTicketDto {
    @IsString()
    organizationId: string;

    @IsString()
    createdBy: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(TicketType)
    type: TicketType;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: TicketPriority;

    @IsEnum(TicketSource)
    @IsOptional()
    source?: TicketSource;

    @IsEnum(TicketCategory)
    @IsOptional()
    category?: TicketCategory;

    @IsString()
    @IsOptional()
    assigneeId?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @IsArray()
    @IsOptional()
    attachments?: TicketAttachment[];

    @IsDate()
    @IsOptional()
    dueDate?: Date;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;

    @IsString()
    @IsOptional()
    internalNotes?: string;
}