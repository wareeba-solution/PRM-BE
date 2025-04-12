import { PriorityLevel } from '../entities/ticket-priority.entity';
export declare class UpdateTicketPriorityDto {
    name?: string;
    level?: PriorityLevel;
    description?: string;
    responseTimeHours?: number;
    resolutionTimeHours?: number;
    isActive?: boolean;
}
