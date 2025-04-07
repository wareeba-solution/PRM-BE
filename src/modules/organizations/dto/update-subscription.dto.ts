import {
    IsEnum,
    IsDate,
    IsInt,
    IsOptional,
    IsBoolean,
    IsString,
    IsObject,
    Min,
    Max,
    ValidateNested,
    IsDateString,
    IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';
import { SubscriptionTier } from '../entities/organization.entity';

export class BillingDetailsDto {
    @IsOptional()
    @IsString()
    billingEmail?: string;

    @IsOptional()
    @IsString()
    billingAddress?: string;

    @IsOptional()
    @IsString()
    taxId?: string;

    @IsOptional()
    @IsString()
    paymentMethod?: string;
}

export class FeatureLimitsDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    maxProjects?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxTeams?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxIntegrations?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxCustomFields?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxApiCalls?: number;
}

export class UpdateSubscriptionDto {
    @IsEnum(SubscriptionTier)
    tier: SubscriptionTier;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsInt()
    @Min(1)
    @Max(10000)
    maxUsers: number;

    @IsInt()
    @Min(1)
    maxStorage: number;

    @IsOptional()
    @IsBoolean()
    autoRenew?: boolean;

    @IsOptional()
    @IsBoolean()
    isTrial?: boolean;

    @IsOptional()
    @IsDateString()
    trialEndDate?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => BillingDetailsDto)
    billingDetails?: BillingDetailsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FeatureLimitsDto)
    featureLimits?: FeatureLimitsDto;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(12)
    billingCycle?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    pricePerUser?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    basePrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    discountPercentage?: number;

    @IsOptional()
    @IsObject()
    features?: {
        customDomain?: boolean;
        ssoEnabled?: boolean;
        apiAccess?: boolean;
        advancedReporting?: boolean;
        customBranding?: boolean;
        prioritySupport?: boolean;
        dataExport?: boolean;
        auditLogs?: boolean;
    };

    @IsOptional()
    @IsObject()
    customization?: {
        theme?: string;
        modules?: string[];
        restrictions?: string[];
        customFields?: any[];
    };

    @IsOptional()
    @IsEnum(['BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE'])
    supportLevel?: 'BASIC' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}