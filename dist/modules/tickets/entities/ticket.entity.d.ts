import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { TicketActivity } from './ticket-activity.entity';
import { TicketAttachment } from './ticket-attachment.entity';
import { TicketType } from '../enums/ticket-type.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { Department } from '../../departments/entities/department.entity';
import { TicketComment } from './ticket-comment.entity';
import { Contact } from '../../contacts/entities/contact.entity';
export declare class Ticket {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    type: TicketType;
    priority: TicketPriority;
    status: TicketStatus;
    source: TicketSource;
    contactId?: string;
    departmentId?: string;
    createdById: string;
    assigneeId?: string;
    category?: TicketCategory;
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
    reopenedAt?: Date;
    reopenedById?: string;
    reopenReason?: string;
    firstResponseAt?: Date;
    lastActivityAt?: Date;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    escalationLevel: number;
    organization: Promise<Organization>;
    contact?: Promise<Contact>;
    department?: Promise<Department>;
    assignee?: Promise<User>;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
    resolvedBy?: Promise<User>;
    closedBy?: Promise<User>;
    escalatedBy?: Promise<User>;
    reopenedBy?: Promise<User>;
    relatedTicket?: Promise<Ticket>;
    comments: Promise<TicketComment[]>;
    attachments: Promise<TicketAttachment[]>;
    activities: Promise<TicketActivity[]>;
    get isEscalated(): boolean;
    get isResolved(): boolean;
    get isClosed(): boolean;
    get isReopened(): boolean;
    get hasFirstResponse(): boolean;
    get responseTime(): number | null;
    get resolutionTime(): number | null;
}
