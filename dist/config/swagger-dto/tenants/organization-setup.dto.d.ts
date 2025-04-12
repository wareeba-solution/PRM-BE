export declare class OrganizationSetupDto {
    tenantId: string;
    name: string;
    description?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postalCode?: string;
    };
    phone?: string;
    email?: string;
}
