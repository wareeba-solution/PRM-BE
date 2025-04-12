import { PlanType } from '../entities/tenant.entity';
export declare class OrganizationAddressDto {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}
export declare class TenantRegistrationDto {
    tenantName: string;
    subdomain: string;
    planType?: PlanType;
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    adminPassword: string;
    adminPhone?: string;
    organizationName: string;
    organizationAddress?: OrganizationAddressDto;
    organizationPhone?: string;
    organizationEmail?: string;
}
