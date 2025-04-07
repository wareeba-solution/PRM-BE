import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketAttachment } from './ticket-attachment.entity';
export declare class TicketComment {
    id: string;
    organizationId: string;
    content: string;
    isInternal: boolean;
    ticketId: string;
    ticket: Promise<Ticket>;
    authorId: string;
    author: Promise<User>;
    attachments: Promise<TicketAttachment[]>;
    parentId: string;
    parent?: Promise<TicketComment>;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    editedAt: Date;
    editedBy: string;
}
