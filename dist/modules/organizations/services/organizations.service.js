"use strict";
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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../entities/organization.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const audit_log_entity_1 = require("../../audit/entities/audit-log.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const organization_entity_2 = require("../entities/organization.entity");
const slug_util_1 = require("../../../utils/slug.util");
const domain_verification_service_1 = require("../../domain/services/domain-verification.service");
const email_service_1 = require("../../../shared/services/email.service");
const storage_service_1 = require("../../storage/services/storage.service");
let OrganizationsService = class OrganizationsService {
    getMemberContext(organizationId, id) {
        throw new Error('Method not implemented.');
    }
    findById(organizationId) {
        throw new Error('Method not implemented.');
    }
    constructor(organizationRepository, userRepository, auditLogRepository, domainVerificationService, emailService, storageService) {
        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.domainVerificationService = domainVerificationService;
        this.emailService = emailService;
        this.storageService = storageService;
    }
    async create(createOrganizationDto) {
        // Check if organization with same name exists
        const existingOrg = await this.organizationRepository.findOne({
            where: { name: createOrganizationDto.name }
        });
        if (existingOrg) {
            throw new common_1.ConflictException('Organization with this name already exists');
        }
        // Generate slug from name
        const slug = await this.generateUniqueSlug(createOrganizationDto.name);
        // Create organization with explicit properties to avoid type issues
        const organizationData = {
            name: createOrganizationDto.name,
            description: createOrganizationDto.description,
            slug,
            type: createOrganizationDto.type,
            status: organization_entity_2.OrganizationStatus.PENDING,
            subscriptionTier: organization_entity_2.SubscriptionTier.FREE,
            settings: this.getDefaultSettings(),
            createdById: createOrganizationDto.createdById,
        };
        // Create the entity with type casting to help TypeScript
        const organization = this.organizationRepository.create(organizationData);
        // Save the entity and handle the case where it returns an array
        const result = await this.organizationRepository.save(organization);
        // Convert to single entity if it's an array
        const savedOrg = Array.isArray(result) ? result[0] : result;
        // Create audit log
        await this.createAuditLog({
            organizationId: savedOrg.id,
            action: 'CREATE_ORGANIZATION',
            metadata: { userId: createOrganizationDto.createdById, organizationId: savedOrg.id }
        });
        return savedOrg;
    }
    async findAll(query) {
        const queryBuilder = this.organizationRepository.createQueryBuilder('organization');
        // Apply filters
        if (query.search) {
            queryBuilder.andWhere('(organization.name ILIKE :search OR organization.domain ILIKE :search)', { search: `%${query.search}%` });
        }
        if (query.status) {
            queryBuilder.andWhere('organization.status = :status', { status: query.status });
        }
        if (query.subscriptionTier) {
            queryBuilder.andWhere('organization.subscriptionTier = :tier', { tier: query.subscriptionTier });
        }
        // Add relations
        queryBuilder.leftJoinAndSelect('organization.users', 'users');
        // Add pagination
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        // Add sorting
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder || 'DESC';
        queryBuilder.orderBy(`organization.${sortBy}`, sortOrder);
        // Execute query
        const [items, total] = await queryBuilder.getManyAndCount();
        return { items, total };
    }
    async findOne(id) {
        const organization = await this.organizationRepository.findOne({
            where: { id },
            relations: ['users']
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return organization;
    }
    async update(id, updateOrganizationDto) {
        const organization = await this.findOne(id);
        // If domain is being updated, verify it
        if (updateOrganizationDto.domain && updateOrganizationDto.domain !== organization.domain) {
            organization.isDomainVerified = false;
        }
        // Update organization
        Object.assign(organization, updateOrganizationDto);
        // Save changes
        const updatedOrg = await this.organizationRepository.save(organization);
        // Create audit log
        await this.createAuditLog({
            organizationId: id,
            action: 'UPDATE_ORGANIZATION',
            metadata: {
                userId: updateOrganizationDto.updatedBy,
                organizationId: id,
                changes: updateOrganizationDto
            }
        });
        return updatedOrg;
    }
    async remove(id) {
        const organization = await this.findOne(id);
        // Soft delete organization
        await this.organizationRepository.softDelete(id);
        // Create audit log
        await this.createAuditLog({
            organizationId: id,
            action: 'DELETE_ORGANIZATION',
            metadata: { organizationId: id }
        });
    }
    async addUser(id, addUserDto) {
        const organization = await this.findOne(id);
        // Check if user limit is reached
        const userCount = await this.userRepository.count({ where: { organizationId: id } });
        if (userCount >= organization.maxUsers) {
            throw new common_1.BadRequestException('Organization user limit reached');
        }
        // Create new user
        const user = this.userRepository.create(Object.assign(Object.assign({}, addUserDto), { organizationId: id, requirePasswordChange: true }));
        // Save user
        const savedUser = await this.userRepository.save(user);
        // Send welcome email
        await this.sendWelcomeEmail(savedUser.email, {
            organizationName: organization.name,
            temporaryPassword: addUserDto.password
        });
        // Create audit log
        await this.createAuditLog({
            organizationId: id,
            action: 'ADD_USER',
            metadata: { userId: savedUser.id }
        });
        return savedUser;
    }
    async removeUser(id, userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId, organizationId: id }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found in organization');
        }
        // Soft delete user
        await this.userRepository.softDelete(userId);
        // Create audit log
        await this.createAuditLog({
            organizationId: id,
            action: 'REMOVE_USER',
            metadata: { userId }
        });
    }
    async getAdminCount(organizationId) {
        return this.userRepository.count({
            where: {
                organizationId,
                role: role_enum_1.Role.ADMIN,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
    }
    async updateSubscription(id, updateSubscriptionDto) {
        const organization = await this.findOne(id);
        // Update subscription details
        Object.assign(organization, {
            subscriptionTier: updateSubscriptionDto.tier,
            subscriptionStartDate: updateSubscriptionDto.startDate,
            subscriptionEndDate: updateSubscriptionDto.endDate,
            maxUsers: updateSubscriptionDto.maxUsers,
            maxStorage: updateSubscriptionDto.maxStorage,
            isSubscriptionActive: true
        });
        // Save changes
        const updatedOrg = await this.organizationRepository.save(organization);
        // Create audit log
        await this.createAuditLog({
            organizationId: id,
            action: 'UPDATE_SUBSCRIPTION',
            metadata: { changes: updateSubscriptionDto }
        });
        return updatedOrg;
    }
    async getStatistics(id) {
        const organization = await this.findOne(id);
        // Get user statistics
        const totalUsers = await this.userRepository.count({
            where: { organizationId: id }
        });
        const activeUsers = await this.userRepository.count({
            where: { organizationId: id, isActive: true }
        });
        // Get storage statistics
        const storageUsed = await this.getStorageUsage(id);
        return {
            totalUsers,
            activeUsers,
            storageUsed,
            storageLimit: organization.maxStorage,
            subscriptionStatus: organization.isSubscriptionActive,
            subscriptionTier: organization.subscriptionTier
        };
    }
    async verifyDomain(id, domain) {
        const organization = await this.findOne(id);
        // Verify domain ownership
        const isVerified = await this.verifyDomainOwnership(domain);
        if (isVerified) {
            // Update organization domain status
            organization.domain = domain;
            organization.isDomainVerified = true;
            await this.organizationRepository.save(organization);
            // Create audit log
            await this.createAuditLog({
                organizationId: id,
                action: 'VERIFY_DOMAIN',
                metadata: { domain }
            });
        }
        return isVerified;
    }
    async getAuditLogs(id, query) {
        const queryBuilder = this.auditLogRepository.createQueryBuilder('audit_log')
            .where('audit_log.organizationId = :id', { id });
        // Apply filters
        if (query.action) {
            queryBuilder.andWhere('audit_log.action = :action', { action: query.action });
        }
        if (query.userId) {
            queryBuilder.andWhere('audit_log.metadata->\'userId\' = :userId', { userId: query.userId });
        }
        if (query.startDate && query.endDate) {
            queryBuilder.andWhere('audit_log.createdAt BETWEEN :startDate AND :endDate', {
                startDate: query.startDate,
                endDate: query.endDate
            });
        }
        // Add pagination
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        // Add sorting
        queryBuilder.orderBy('audit_log.createdAt', 'DESC');
        // Execute query
        const [items, total] = await queryBuilder.getManyAndCount();
        return { items, total };
    }
    async generateUniqueSlug(name) {
        let slug = (0, slug_util_1.generateSlug)(name);
        let counter = 1;
        while (await this.organizationRepository.findOne({ where: { slug } })) {
            slug = (0, slug_util_1.generateSlug)(name) + '-' + counter;
            counter++;
        }
        return slug;
    }
    getDefaultSettings() {
        return {
            ticketPriorities: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
            ticketCategories: ['GENERAL', 'TECHNICAL', 'BILLING', 'OTHER'],
            customFields: [],
            notificationSettings: {
                emailEnabled: true,
                smsEnabled: false,
                inAppEnabled: true
            },
            brandingSettings: {
                primaryColor: '#007bff',
                logoUrl: null,
                favIconUrl: null
            }
        };
    }
    async createAuditLog(data) {
        const auditLog = this.auditLogRepository.create(data);
        await this.auditLogRepository.save(auditLog);
    }
    // Custom methods to replace non-existent service methods
    async sendWelcomeEmail(email, data) {
        // Implementation of welcome email sending
        console.log(`Sending welcome email to ${email} for organization ${data.organizationName}`);
        // You can implement your own email sending logic here or call the correct method
        // from your EmailService if it exists with different parameters
        // For example:
        // await this.emailService.sendEmail({
        //     to: email,
        //     subject: 'Welcome to ' + data.organizationName,
        //     template: 'welcome',
        //     context: {
        //         organizationName: data.organizationName,
        //         temporaryPassword: data.temporaryPassword
        //     }
        // });
    }
    async getStorageUsage(organizationId) {
        // Implementation of storage usage calculation
        console.log(`Getting storage usage for organization ${organizationId}`);
        // You can implement your own storage calculation logic here or call the correct method
        // from your StorageService if it exists with different parameters
        // For example:
        // return await this.storageService.calculateUsage(organizationId);
        return 0; // Return default value for now
    }
    async verifyDomainOwnership(domain) {
        // Implementation of domain verification
        console.log(`Verifying domain ownership for ${domain}`);
        // You can implement your own domain verification logic here or call the correct method
        // from your DomainVerificationService if it exists with different parameters
        // For example:
        // return await this.domainVerificationService.verifyOwnership(domain);
        return true; // Return default value for now
    }
};
OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        domain_verification_service_1.DomainVerificationService,
        email_service_1.EmailService,
        storage_service_1.StorageService])
], OrganizationsService);
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map