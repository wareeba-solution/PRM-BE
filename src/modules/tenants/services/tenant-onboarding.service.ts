// src/modules/tenants/services/tenant-onboarding.service.ts

import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Tenant, TenantStatus, PlanType } from '../entities/tenant.entity';
import { User } from '../../users/entities/user.entity';
import { Organization, OrganizationStatus } from '../../organizations/entities/organization.entity';
import { UserSettings } from '../../users/entities/user-settings.entity';
import { UserVerification } from '../../users/entities/user-verification.entity';
import { Role } from '../../users/enums/role.enum';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { TenantRegistrationDto } from '../dto/tenant-registration.dto';

import { OrganizationSetupDto } from '../dto/organization-setup.dto';

interface DepartmentSetupDto {
  tenantId: string;
  organizationId: string;
  name: string;
  description?: string;
  managerId?: string;
}

@Injectable()
export class TenantOnboardingService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(UserVerification)
    private readonly userVerificationRepository: Repository<UserVerification>,
    private readonly connection: Connection,
  ) {}

  /**
   * Register a new tenant with initial organization and admin user
   * @param registrationDto The tenant registration data
   * @returns The created tenant, organization, and admin user
   */
  async registerTenant(registrationDto: TenantRegistrationDto) {
    // Start a transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create the tenant
      const tenant = this.tenantRepository.create({
        name: registrationDto.tenantName,
        subdomain: registrationDto.subdomain.toLowerCase(),
        planType: registrationDto.planType || PlanType.BASIC,
        status: TenantStatus.PENDING,
        contactInfo: {
          adminEmail: registrationDto.adminEmail,
          adminPhone: registrationDto.adminPhone,
        },
      });

      const savedTenant = await queryRunner.manager.save(tenant);

      // 2. Create the organization
      const organizationSlug = this.generateSlug(registrationDto.organizationName);
      
      // Create organization with proper contact info structure
      const organization = this.organizationRepository.create({
        tenantId: savedTenant.id,
        name: registrationDto.organizationName,
        slug: organizationSlug,
        status: OrganizationStatus.ACTIVE,
      });
      
      // Set contact info separately to ensure proper JSON structure
      if (registrationDto.organizationEmail || registrationDto.organizationPhone || registrationDto.organizationAddress) {
        organization.contactInfo = {
          email: registrationDto.organizationEmail || undefined,
          phone: registrationDto.organizationPhone || undefined,
          address: registrationDto.organizationAddress || undefined
        };
      }

      // For the first admin user, we need to handle the circular dependency with createdById
      // Temporarily disable foreign key constraints
      await queryRunner.query('SET CONSTRAINTS ALL DEFERRED');

      const savedOrganization = await queryRunner.manager.save(organization);

      // 3. Create the admin user
      const hashedPassword = await hash(registrationDto.adminPassword, 10);
      
      // First, create a temporary user ID that we'll use for the circular reference
      const tempUserId = await queryRunner.query(`SELECT gen_random_uuid() as id`);
      const userId = tempUserId[0].id;
      
      // Create the admin user with a self-reference for createdById using the pre-generated ID
      await queryRunner.query(
        `INSERT INTO users (
          "id", "tenantId", "organizationId", "firstName", "lastName", "email", 
          "password", "role", "isActive", "isEmailVerified", "requirePasswordChange", "createdById"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $1)`,
        [
          userId,
          savedTenant.id,
          savedOrganization.id,
          registrationDto.adminFirstName,
          registrationDto.adminLastName,
          registrationDto.adminEmail.toLowerCase(),
          hashedPassword,
          Role.ADMIN,
          true,
          false,
          false
        ]
      );
      
      // Get the complete user object
      const savedUser = await queryRunner.manager.findOne(User, { where: { id: userId } });

      // 4. Create user settings
      const userSettings = this.userSettingsRepository.create({
        userId: savedUser.id,
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notificationPreferences: {
          email: true,
          push: true,
          sms: false,
          inApp: true
        },
      });

      await queryRunner.manager.save(userSettings);

      // 5. Create user verification record
      const verificationToken = uuidv4();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

      const userVerification = this.userVerificationRepository.create({
        userId: savedUser.id,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: expiresAt,
        lastEmailVerificationSent: now,
      });

      await queryRunner.manager.save(userVerification);

      // 6. Update the organization with the admin as creator
      await queryRunner.query(
        `UPDATE organizations SET "createdById" = $1 WHERE id = $2`,
        [savedUser.id, savedOrganization.id]
      );

      // 7. Update the tenant status to active
      savedTenant.status = TenantStatus.ACTIVE;
      await queryRunner.manager.save(savedTenant);

      // Re-enable constraints and commit the transaction
      await queryRunner.query('SET CONSTRAINTS ALL IMMEDIATE');
      await queryRunner.commitTransaction();

      return {
        tenant: savedTenant,
        organization: savedOrganization,
        adminUser: {
          id: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
        },
      };
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Tenant with this subdomain already exists');
      }
      
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  /**
   * Add a new organization to an existing tenant
   * @param setupDto The organization setup data
   * @returns The created organization
   */
  async addOrganization(setupDto: OrganizationSetupDto) {
    // Check if tenant exists and is active
    const tenant = await this.tenantRepository.findOne({
      where: { id: setupDto.tenantId },
    });

    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }

    if (!tenant.isActive) {
      throw new BadRequestException('Tenant is not active');
    }

    // Check if tenant has reached the maximum number of organizations
    const organizationCount = await this.organizationRepository.count({
      where: { tenantId: setupDto.tenantId },
    });

    if (organizationCount >= tenant.maxOrganizations) {
      throw new BadRequestException('Maximum number of organizations reached for this tenant');
    }

    // Create the organization
    const organizationSlug = this.generateSlug(setupDto.name);
    
    const organization = this.organizationRepository.create({
      tenantId: setupDto.tenantId,
      name: setupDto.name,
      description: setupDto.description,
      slug: organizationSlug,
      status: OrganizationStatus.ACTIVE,
      contactInfo: {
        email: setupDto.email,
        phone: setupDto.phone,
        address: setupDto.address,
      },
    });

    return this.organizationRepository.save(organization);
  }

  /**
   * Get a tenant by its subdomain
   * @param subdomain The tenant's subdomain
   * @returns The tenant if found
   */
  async getTenantBySubdomain(subdomain: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { subdomain: subdomain.toLowerCase() },
    });
    
    if (!tenant) {
      throw new BadRequestException(`Tenant with subdomain '${subdomain}' not found`);
    }
    
    return tenant;
  }

  /**
   * Generate a URL-friendly slug from a name
   * @param name The name to convert to a slug
   * @returns The generated slug
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
