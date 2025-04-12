import { IsString, IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { PriorityLevel } from '../entities/ticket-priority.entity';

export class CreateTicketPriorityDto {
    @IsString()
    name: string;

    @IsEnum(PriorityLevel)
    level: PriorityLevel;

    @IsNumber()
    @Min(0)
    @Max(100)
    weight: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    responseTimeThreshold?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    resolutionTimeThreshold?: number;
} 