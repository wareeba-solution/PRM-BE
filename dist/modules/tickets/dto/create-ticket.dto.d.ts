import { TicketType } from '../enums/ticket-type.enum';
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
    assigneeId?: string;
    tags?: string[];
    attachments?: TicketAttachment[];
    dueDate?: Date;
    metadata?: Record<string, any>;
    internalNotes?: string;
}
