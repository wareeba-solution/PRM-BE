import { TicketType } from '../enums/ticket.enums';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
export declare class CreateTicketDto {
    organizationId?: string;
    createdBy?: string;
    title?: string;
    subject?: string;
    description?: string;
    type?: TicketType;
    priority?: string;
    source?: TicketSource;
    category?: TicketCategory;
    assignedToId?: string;
    tagTeamMembers?: string[];
    patientId?: string;
    patient?: string;
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
