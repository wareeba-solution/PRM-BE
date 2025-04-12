import { TenantOnboardingService } from '../services/tenant-onboarding.service';
import { Role } from '../../users/enums/role.enum';
import { Request } from 'express';
import { TenantRegistrationDto } from '../dto/tenant-registration.dto';
import { OrganizationSetupDto } from '../dto/organization-setup.dto';
interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
        role: Role;
        tenantId: string;
        organizationId: string;
        permissions?: string[];
    };
}
export declare class TenantOnboardingController {
    private readonly tenantOnboardingService;
    constructor(tenantOnboardingService: TenantOnboardingService);
    registerTenant(registrationDto: TenantRegistrationDto): Promise<{
        message: string;
        data: {
            tenant: {
                id: string;
                name: string;
                subdomain: string;
                status: import("../entities/tenant.entity").TenantStatus;
            };
            organization: {
                id: string;
                name: string;
            };
            adminUser: {
                id: string;
                email: string;
            };
        };
    }>;
    addOrganization(setupDto: OrganizationSetupDto, req: RequestWithUser): Promise<{
        message: string;
        success: boolean;
        data?: undefined;
    } | {
        message: string;
        data: {
            id: string;
            name: string;
            tenantId: string;
        };
        success?: undefined;
    }>;
    checkTenantStatus(subdomain: string): Promise<{
        exists: boolean;
        status: import("../entities/tenant.entity").TenantStatus;
        name: string;
    } | {
        exists: boolean;
        status?: undefined;
        name?: undefined;
    }>;
}
export {};
