import { IsOptional, IsEnum, IsUUID, IsString, IsArray, IsDate, IsBoolean, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum TicketSortField {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    PRIORITY = 'priority',
    STATUS = 'status',
    DUE_DATE = 'dueDate',
    LAST_ACTIVITY = 'lastActivity'
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class TicketQueryDto {
    @IsOptional()
    @IsString()
    searchTerm?: string;

    @IsOptional()
    @IsString()
    priority?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsUUID()
    assigneeId?: string;

    @IsOptional()
    @IsUUID()
    contactId?: string;

    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    startDate?: string;

    @IsOptional()
    endDate?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    status?: string[];


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    priorities?: string[]; // Fixed missing property name


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    category?: string[];


    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    assigneeIds?: string[];


    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    creatorIds?: string[];


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAfter?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdBefore?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    updatedAfter?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    updatedBefore?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDateStart?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDateEnd?: Date;


    @IsOptional()
    @IsBoolean()
    includeArchived?: boolean;


    @IsOptional()
    @IsBoolean()
    hasUnreadUpdates?: boolean;


    @IsOptional()
    @IsBoolean()
    hasAttachments?: boolean;


    @IsOptional()
    @IsEnum(TicketSortField)
    sortField?: TicketSortField;


    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder;


    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit2?: number = 20; // Fixed missing property name


    @IsOptional()
    @IsInt()
    @Min(0)
    offset?: number = 0;


    @IsOptional()
    @ValidateNested()
    @Type(() => Object)
    customFields?: Record<string, any>;


    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    relatedTicketIds?: string[];


    @IsOptional()
    @IsBoolean()
    requiresAttention?: boolean;


    @IsOptional()
    @IsBoolean()
    hasSlaBreach?: boolean;


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    slaStatus?: string[];


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    fields?: string[];
}