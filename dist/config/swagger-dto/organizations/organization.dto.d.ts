import { BaseDto } from '../base.dto';
import { OrganizationStatus } from '../../../modules/organizations/enums/organization-status.enum';
import { SubscriptionTier } from '../../../modules/organizations/enums/subscription-tier.enum';
/**
 * Organization DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class OrganizationDto extends BaseDto {
    name: string;
    description: string;
    slug: string;
    logo: string;
    domain: string;
    isDomainVerified: boolean;
    status: OrganizationStatus;
    subscriptionTier: SubscriptionTier;
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    isSubscriptionActive: boolean;
    settings?: {
        ticketPriorities?: string[];
        ticketCategories?: string[];
        customFields?: any[];
        notificationSettings?: any;
        brandingSettings?: any;
    };
    maxUsers: number;
    maxStorage: number;
    metadata?: {
        industry?: string;
        size?: string;
        location?: string;
        timezone?: string;
        customAttributes?: Record<string, any>;
    };
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            postalCode?: string;
        };
    };
    allowedDomains?: string[];
    isEmailVerificationRequired: boolean;
    isTwoFactorAuthRequired: boolean;
    auditConfig?: {
        enableAuditLog?: boolean;
        retentionPeriod?: number;
        logLevel?: string;
    };
    isActive: boolean;
    isPremium: boolean;
    isEnterprise: boolean;
}
