import { BaseDto } from '../base.dto';
/**
 * Ticket DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class TicketDto extends BaseDto {
    organizationId: string;
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    source: string;
    contactId?: string;
    departmentId?: string;
    assigneeId?: string;
    category?: string;
    subCategory?: string;
    tags: string[];
    referenceNumber?: string;
    relatedTicketId?: string;
    metadata?: Record<string, any>;
    isPrivate: boolean;
    internalNotes?: string;
    resolution?: string;
    resolvedAt?: Date;
    resolvedById?: string;
    closedAt?: Date;
    closedById?: string;
    escalatedAt?: Date;
    escalatedById?: string;
    escalationReason?: string;
    escalationLevel: number;
    reopenedAt?: Date;
    reopenedById?: string;
    reopenReason?: string;
    firstResponseAt?: Date;
    lastActivityAt?: Date;
    isEscalated: boolean;
    isResolved: boolean;
    isClosed: boolean;
    isReopened: boolean;
    hasFirstResponse: boolean;
    responseTime: number | null;
    resolutionTime: number | null;
}
