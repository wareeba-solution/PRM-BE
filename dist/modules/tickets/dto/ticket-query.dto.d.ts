import { TicketStatus, TicketType } from '../enums/ticket.enums';
export declare enum TicketSortField {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    DUE_DATE = "dueDate",
    PRIORITY = "priority",
    STATUS = "status"
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class TicketQueryDto {
    organizationId: string;
    status?: TicketStatus[];
    type?: TicketType;
    assigneeId?: string;
    contactId?: string;
    departmentId?: string;
    search?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    priorities?: string[];
    category?: string[];
    assigneeIds?: string[];
    creatorIds?: string[];
    tags?: string[];
    createdAfter?: Date;
    createdBefore?: Date;
    updatedAfter?: Date;
    updatedBefore?: Date;
    dueDateStart?: Date;
    dueDateEnd?: Date;
    includeArchived?: boolean;
    hasUnreadUpdates?: boolean;
    hasAttachments?: boolean;
    sortField?: TicketSortField;
    sortOrder?: SortOrder;
    limit2?: number;
    offset?: number;
    customFields?: Record<string, any>;
    relatedTicketIds?: string[];
    requiresAttention?: boolean;
    hasSlaBreach?: boolean;
    slaStatus?: string[];
    fields?: string[];
}
