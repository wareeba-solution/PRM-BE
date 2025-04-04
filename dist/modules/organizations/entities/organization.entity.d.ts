import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { OrganizationStatus } from '../enums/organization-status.enum';
import { SubscriptionTier } from '../enums/subscription-tier.enum';
export { OrganizationStatus, SubscriptionTier };
export declare class Organization {
    [x: string]: any;
    id: string;
    name: string;
    description: string;
    slug: string;
    logo: string;
    domain: string;
    isDomainVerified: boolean;
    status: OrganizationStatus;
    subscriptionTier: SubscriptionTier;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    isSubscriptionActive: boolean;
    settings: {
        ticketPriorities?: string[];
        ticketCategories?: string[];
        customFields?: any[];
        notificationSettings?: any;
        brandingSettings?: any;
    };
    maxUsers: number;
    maxStorage: number;
    createdById: string;
    updatedById: string;
    createdBy: Promise<User>;
    updatedBy: Promise<User>;
    users: Promise<User[]>;
    tickets: Promise<Ticket[]>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    metadata: {
        industry?: string;
        size?: string;
        location?: string;
        timezone?: string;
        customAttributes?: Record<string, any>;
    };
    contactInfo: {
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
    allowedDomains: string[];
    isEmailVerificationRequired: boolean;
    isTwoFactorAuthRequired: boolean;
    auditConfig: {
        enableAuditLog?: boolean;
        retentionPeriod?: number;
        logLevel?: string;
    };
    get isActive(): boolean;
    get isPremium(): boolean;
    get isEnterprise(): boolean;
}
