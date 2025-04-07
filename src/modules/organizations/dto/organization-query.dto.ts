import {
    IsOptional,
    IsString,
    IsEnum,
    IsBoolean,
    IsInt,
    IsDate,
    IsUUID,
    IsArray,
    Min,
    Max,
    ValidateNested,
    IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrganizationStatus, SubscriptionTier } from '../entities/organization.entity';

export class DateRangeDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}

export class OrganizationQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(OrganizationStatus)
    status?: OrganizationStatus;

    @IsOptional()
    @IsEnum(SubscriptionTier)
    subscriptionTier?: SubscriptionTier;

    @IsOptional()
    @IsBoolean()
    isDomainVerified?: boolean;

    @IsOptional()
    @IsBoolean()
    isSubscriptionActive?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    minUsers?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    maxUsers?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    storageUsagePercentage?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    createdAt?: DateRangeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    subscriptionDate?: DateRangeDto;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    industries?: string[];

    @IsOptional()
    @IsBoolean()
    includeDeleted?: boolean;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    timezone?: string;

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

    // Relations and includes
    @IsOptional()
    @IsBoolean()
    includeUsers?: boolean;

    @IsOptional()
    @IsBoolean()
    includeSubscription?: boolean;

    @IsOptional()
    @IsBoolean()
    includeStatistics?: boolean;

    @IsOptional()
    @IsBoolean()
    includeAuditLogs?: boolean;
}