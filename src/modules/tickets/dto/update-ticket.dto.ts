// src/modules/tickets/dto/update-ticket.dto.ts

import { CreateTicketDto } from './create-ticket.dto';
import { TicketStatus } from '../enums/ticket-status.enum';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateTicketDto extends PartialType(
    OmitType(CreateTicketDto, ['type', 'source'] as const)
) {
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    statusNote?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    resolution?: string;
}