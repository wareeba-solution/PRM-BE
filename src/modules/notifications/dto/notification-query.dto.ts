import {
    IsOptional,
    IsEnum,
    IsString,
    IsArray,
    IsBoolean,
    IsDateString,
    IsUUID,
    IsInt,
    Min,
    Max,
    ValidateNested,
    ArrayMinSize,
    ArrayMaxSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel, NotificationCategory } from '../entities/notification-preference.entity';

export class DateRangeDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}

export class NotificationQueryDto {
    @IsOptional()
    @IsUUID()
    skip?: number;
    take?: number;
    includeRead?: boolean;

    @IsOptional()
    @IsArray()
    @IsEnum(NotificationCategory, { each: true })
    categories?: NotificationCategory[];
    userId?: string;
    organizationId?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @IsOptional()
    @IsBoolean()
    isRead?: boolean;

    @IsOptional()
    @IsBoolean()
    isArchived?: boolean;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMaxSize(50)
    userIds?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMaxSize(50)
    status?: string; // Add this line
    recipientIds?: string[];
    type?: string;
    read?: boolean;
    priority?: string;
    startDate?: Date;
    endDate?: Date;


    

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMaxSize(50)
    senderIds?: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    dateRange?: DateRangeDto;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(10)
    priorities?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(10)
    statuses?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(20)
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    isActionable?: boolean;

    @IsOptional()
    @IsBoolean()
    isActionTaken?: boolean;

    @IsOptional()
    @IsBoolean()
    includeDeleted?: boolean;

    @IsOptional()
    @IsString()
    groupBy?: string;

    // Pagination parameters
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    // Sorting parameters
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC' = 'DESC';

    // Additional filters
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    templateIds?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    deliveryStatuses?: string[];

    @IsOptional()
    @IsBoolean()
    hasAttachments?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    sources?: string[];

    @IsOptional()
    @IsBoolean()
    includeMetadata?: boolean;

    @IsOptional()
    @IsBoolean()
    includeReadReceipts?: boolean;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    importanceLevel?: number;
}