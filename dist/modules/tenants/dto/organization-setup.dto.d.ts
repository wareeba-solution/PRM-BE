import { OrganizationAddressDto } from './tenant-registration.dto';
export declare class OrganizationSetupDto {
    tenantId: string;
    name: string;
    description?: string;
    address?: OrganizationAddressDto;
    phone?: string;
    email?: string;
}
