import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { PriorityLevel } from '../entities/ticket-priority.entity';

export class UpdateTicketPriorityDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(PriorityLevel)
    @IsOptional()
    level?: PriorityLevel;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    responseTimeHours?: number;

    @IsNumber()
    @IsOptional()
    resolutionTimeHours?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 