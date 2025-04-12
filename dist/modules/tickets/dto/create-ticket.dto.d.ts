import { TicketType } from '../enums/ticket.enums';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
export declare class CreateTicketDto {
    organizationId: string;
    createdBy: string;
    title: string;
    description: string;
    type: TicketType;
    priority?: TicketPriority;
    source?: TicketSource;
    category?: TicketCategory;
    assignedToId?: string;
    patientId?: string;
    relatedAppointmentId?: string;
    relatedLabResultId?: string;
    relatedPrescriptionId?: string;
    dueDate?: Date;
    patientCondition?: string;
    timeSensitivity?: number;
    impactLevel?: number;
    tags?: string[];
    attachments?: TicketAttachment[];
    metadata?: Record<string, any>;
    internalNotes?: string;
}
