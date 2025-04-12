import { PlanType } from '../entities/tenant.entity';
declare class TenantBrandingDto {
    primaryColor?: string;
    secondaryColor?: string;
    logoUrl?: string;
    faviconUrl?: string;
}
declare class TenantSecurityDto {
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
}
declare class TenantFeaturesDto {
    enabledModules?: string[];
    customFeatures?: Record<string, boolean>;
}
declare class TenantSettingsDto {
    branding?: TenantBrandingDto;
    security?: TenantSecurityDto;
    features?: TenantFeaturesDto;
}
declare class TenantAddressDto {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}
declare class TenantContactInfoDto {
    adminEmail?: string;
    adminPhone?: string;
    billingEmail?: string;
    billingPhone?: string;
    address?: TenantAddressDto;
}
export declare class CreateTenantDto {
    name: string;
    organizationName: string;
    subdomain?: string;
    isActive?: boolean;
    planType?: PlanType;
    settings?: TenantSettingsDto;
    contactInfo?: TenantContactInfoDto;
    subscriptionStartDate?: string;
    subscriptionEndDate?: string;
    maxOrganizations?: number;
    maxUsersPerOrganization?: number;
    maxStoragePerOrganization?: number;
    constructor(partial: Partial<CreateTenantDto>);
}
export {};
