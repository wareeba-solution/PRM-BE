import { PriorityLevel } from '../entities/ticket-priority.entity';
export declare class CreateTicketPriorityDto {
    name: string;
    level: PriorityLevel;
    weight: number;
    description?: string;
    color?: string;
    responseTimeThreshold?: number;
    resolutionTimeThreshold?: number;
}
