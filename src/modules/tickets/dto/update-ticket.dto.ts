// src/modules/tickets/dto/update-ticket.dto.ts

import { IsString, IsEnum, IsOptional, IsUUID, IsDate, IsNumber, Min, Max, IsObject, IsArray, IsBoolean } from 'class-validator';
import { TicketStatus, TicketType } from '../enums/ticket.enums';

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TicketType)
    @IsOptional()
    type?: TicketType;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;

    @IsUUID()
    @IsOptional()
    assignedToId?: string;

    @IsUUID()
    @IsOptional()
    patientId?: string;

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
}