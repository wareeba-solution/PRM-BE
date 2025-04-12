import { PlanType, TenantStatus } from '../../../modules/tenants/entities/tenant.entity';
export declare class TenantDto {
    id: string;
    name: string;
    subdomain: string;
    planType: PlanType;
    status: TenantStatus;
    settings?: {
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
    contactInfo?: {
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
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    isSubscriptionActive: boolean;
    maxOrganizations: number;
    maxUsersPerOrganization: number;
    maxStoragePerOrganization: number;
    createdAt: Date;
    updatedAt: Date;
}
