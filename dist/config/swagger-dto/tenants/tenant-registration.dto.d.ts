import { PlanType } from '../../../modules/tenants/entities/tenant.entity';
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
    organizationAddress?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postalCode?: string;
    };
    organizationPhone?: string;
    organizationEmail?: string;
}
