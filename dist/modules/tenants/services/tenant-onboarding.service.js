"use strict";
// src/modules/tenants/services/tenant-onboarding.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantOnboardingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("../entities/tenant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const user_settings_entity_1 = require("../../users/entities/user-settings.entity");
const user_verification_entity_1 = require("../../users/entities/user-verification.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
let TenantOnboardingService = class TenantOnboardingService {
    constructor(tenantRepository, organizationRepository, userRepository, userSettingsRepository, userVerificationRepository, connection) {
        this.tenantRepository = tenantRepository;
        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
        this.userSettingsRepository = userSettingsRepository;
        this.userVerificationRepository = userVerificationRepository;
        this.connection = connection;
    }
    /**
     * Register a new tenant with initial organization and admin user
     * @param registrationDto The tenant registration data
     * @returns The created tenant, organization, and admin user
     */
    async registerTenant(registrationDto) {
        // Start a transaction
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 1. Create the tenant
            const tenant = this.tenantRepository.create({
                name: registrationDto.tenantName,
                subdomain: registrationDto.subdomain.toLowerCase(),
                planType: registrationDto.planType || tenant_entity_1.PlanType.BASIC,
                status: tenant_entity_1.TenantStatus.PENDING,
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
                status: organization_entity_1.OrganizationStatus.ACTIVE,
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
            const hashedPassword = await (0, bcrypt_1.hash)(registrationDto.adminPassword, 10);
            // First, create a temporary user ID that we'll use for the circular reference
            const tempUserId = await queryRunner.query(`SELECT gen_random_uuid() as id`);
            const userId = tempUserId[0].id;
            // Create the admin user with a self-reference for createdById using the pre-generated ID
            await queryRunner.query(`INSERT INTO users (
          "id", "tenantId", "organizationId", "firstName", "lastName", "email", 
          "password", "role", "isActive", "isEmailVerified", "requirePasswordChange", "createdById"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $1)`, [
                userId,
                savedTenant.id,
                savedOrganization.id,
                registrationDto.adminFirstName,
                registrationDto.adminLastName,
                registrationDto.adminEmail.toLowerCase(),
                hashedPassword,
                role_enum_1.Role.ADMIN,
                true,
                false,
                false
            ]);
            // Get the complete user object
            const savedUser = await queryRunner.manager.findOne(user_entity_1.User, { where: { id: userId } });
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
            const verificationToken = (0, uuid_1.v4)();
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
            await queryRunner.query(`UPDATE organizations SET "createdById" = $1 WHERE id = $2`, [savedUser.id, savedOrganization.id]);
            // 7. Update the tenant status to active
            savedTenant.status = tenant_entity_1.TenantStatus.ACTIVE;
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
        }
        catch (error) {
            // Rollback the transaction in case of error
            await queryRunner.rollbackTransaction();
            if (error.code === '23505') { // Unique constraint violation
                throw new common_1.ConflictException('Tenant with this subdomain already exists');
            }
            throw error;
        }
        finally {
            // Release the query runner
            await queryRunner.release();
        }
    }
    /**
     * Add a new organization to an existing tenant
     * @param setupDto The organization setup data
     * @returns The created organization
     */
    async addOrganization(setupDto) {
        // Check if tenant exists and is active
        const tenant = await this.tenantRepository.findOne({
            where: { id: setupDto.tenantId },
        });
        if (!tenant) {
            throw new common_1.BadRequestException('Tenant not found');
        }
        if (!tenant.isActive) {
            throw new common_1.BadRequestException('Tenant is not active');
        }
        // Check if tenant has reached the maximum number of organizations
        const organizationCount = await this.organizationRepository.count({
            where: { tenantId: setupDto.tenantId },
        });
        if (organizationCount >= tenant.maxOrganizations) {
            throw new common_1.BadRequestException('Maximum number of organizations reached for this tenant');
        }
        // Create the organization
        const organizationSlug = this.generateSlug(setupDto.name);
        const organization = this.organizationRepository.create({
            tenantId: setupDto.tenantId,
            name: setupDto.name,
            description: setupDto.description,
            slug: organizationSlug,
            status: organization_entity_1.OrganizationStatus.ACTIVE,
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
    async getTenantBySubdomain(subdomain) {
        const tenant = await this.tenantRepository.findOne({
            where: { subdomain: subdomain.toLowerCase() },
        });
        if (!tenant) {
            throw new common_1.BadRequestException(`Tenant with subdomain '${subdomain}' not found`);
        }
        return tenant;
    }
    /**
     * Generate a URL-friendly slug from a name
     * @param name The name to convert to a slug
     * @returns The generated slug
     */
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
};
TenantOnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(user_settings_entity_1.UserSettings)),
    __param(4, (0, typeorm_1.InjectRepository)(user_verification_entity_1.UserVerification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], TenantOnboardingService);
exports.TenantOnboardingService = TenantOnboardingService;
//# sourceMappingURL=tenant-onboarding.service.js.map