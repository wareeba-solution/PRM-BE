import { Ticket } from './ticket.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { TicketAttachment } from './ticket-attachment.entity';
export declare class TicketComment {
    id: string;
    content: string;
    ticketId: string;
    ticket: Ticket;
    createdById: string;
    createdBy: User;
    isInternal: boolean;
    attachments: Promise<TicketAttachment[]>;
    parentId: string;
    parent?: Promise<TicketComment>;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    editedAt: Date;
    editedBy: string;
}
