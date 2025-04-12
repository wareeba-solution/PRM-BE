import { Organization } from '../../organizations/entities/organization.entity';
export declare enum TenantStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
}
export declare enum PlanType {
    BASIC = "basic",
    PREMIUM = "premium",
    ENTERPRISE = "enterprise"
}
export declare class Tenant {
    id: string;
    name: string;
    subdomain: string;
    planType: PlanType;
    status: TenantStatus;
    settings: {
        branding?: {
            primaryColor?: string;
            secondaryColor?: string;
            logoUrl?: string;
            faviconUrl?: string;
        };
        security?: {
            passwordPolicy?: {
                minLength?: number;
                requireUppercase?: boolean;
                requireLowercase?: boolean;
                requireNumbers?: boolean;
                requireSpecialChars?: boolean;
                expiryDays?: number;
            };
            mfaRequired?: boolean;
            sessionTimeout?: number;
        };
        features?: {
            enabledModules?: string[];
            customFeatures?: Record<string, boolean>;
        };
    };
    contactInfo: {
        adminEmail?: string;
        adminPhone?: string;
        billingEmail?: string;
        billingPhone?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            postalCode?: string;
        };
    };
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    isSubscriptionActive: boolean;
    maxOrganizations: number;
    maxUsersPerOrganization: number;
    maxStoragePerOrganization: number;
    organizations: Promise<Organization[]>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    get isActive(): boolean;
    get isPremium(): boolean;
    get isEnterprise(): boolean;
}
