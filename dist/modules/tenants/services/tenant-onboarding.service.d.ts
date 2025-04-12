import { Repository, Connection } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { UserSettings } from '../../users/entities/user-settings.entity';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { Role } from '../../users/enums/role.enum';
import { TenantRegistrationDto } from '../dto/tenant-registration.dto';
import { OrganizationSetupDto } from '../dto/organization-setup.dto';
export declare class TenantOnboardingService {
    private readonly tenantRepository;
    private readonly organizationRepository;
    private readonly userRepository;
    private readonly userSettingsRepository;
    private readonly userVerificationRepository;
    private readonly connection;
    constructor(tenantRepository: Repository<Tenant>, organizationRepository: Repository<Organization>, userRepository: Repository<User>, userSettingsRepository: Repository<UserSettings>, userVerificationRepository: Repository<UserVerification>, connection: Connection);
    /**
     * Register a new tenant with initial organization and admin user
     * @param registrationDto The tenant registration data
     * @returns The created tenant, organization, and admin user
     */
    registerTenant(registrationDto: TenantRegistrationDto): Promise<{
        tenant: Tenant;
        organization: Organization;
        adminUser: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: Role;
        };
    }>;
    /**
     * Add a new organization to an existing tenant
     * @param setupDto The organization setup data
     * @returns The created organization
     */
    addOrganization(setupDto: OrganizationSetupDto): Promise<Organization>;
    /**
     * Get a tenant by its subdomain
     * @param subdomain The tenant's subdomain
     * @returns The tenant if found
     */
    getTenantBySubdomain(subdomain: string): Promise<Tenant>;
    /**
     * Generate a URL-friendly slug from a name
     * @param name The name to convert to a slug
     * @returns The generated slug
     */
    private generateSlug;
}
