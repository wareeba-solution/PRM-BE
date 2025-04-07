import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketComment } from './ticket-comment.entity';
export declare class TicketAttachment {
    id: string;
    organizationId: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storageKey: string;
    description: string;
    ticketId: string;
    ticket: Ticket;
    commentId: string;
    comment: TicketComment;
    uploadedById: string;
    uploadedBy: User;
    metadata: Record<string, any>;
    createdAt: Date;
    isPrivate: boolean;
    isActive: boolean;
}
