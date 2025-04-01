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
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { AuditLog } from '../../audit/entities/audit-log.entity';
import { Role } from '../../users/enums/role.enum';
import { SubscriptionTier, OrganizationStatus } from '../entities/organization.entity';
import { generateSlug } from '../../../utils/slug.util';
import { DomainVerificationService } from '../../domain/services/domain-verification.service';
import { EmailService } from '../../../shared/services/email.service';
import { StorageService } from '../../storage/services/storage.service';
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
        const existingOrg = await this.organizationRepository.findOne({
            where: { name: createOrganizationDto.name }
        });
        if (existingOrg) {
            throw new ConflictException('Organization with this name already exists');
        }
        const slug = await this.generateUniqueSlug(createOrganizationDto.name);
        const organizationData = {
            name: createOrganizationDto.name,
            description: createOrganizationDto.description,
            slug,
            type: createOrganizationDto.type,
            status: OrganizationStatus.PENDING,
            subscriptionTier: SubscriptionTier.FREE,
            settings: this.getDefaultSettings(),
            createdById: createOrganizationDto.createdById,
        };
        const organization = this.organizationRepository.create(organizationData);
        const result = await this.organizationRepository.save(organization);
        const savedOrg = Array.isArray(result) ? result[0] : result;
        await this.createAuditLog({
            organizationId: savedOrg.id,
            action: 'CREATE_ORGANIZATION',
            metadata: { userId: createOrganizationDto.createdById, organizationId: savedOrg.id }
        });
        return savedOrg;
    }
    async findAll(query) {
        const queryBuilder = this.organizationRepository.createQueryBuilder('organization');
        if (query.search) {
            queryBuilder.andWhere('(organization.name ILIKE :search OR organization.domain ILIKE :search)', { search: `%${query.search}%` });
        }
        if (query.status) {
            queryBuilder.andWhere('organization.status = :status', { status: query.status });
        }
        if (query.subscriptionTier) {
            queryBuilder.andWhere('organization.subscriptionTier = :tier', { tier: query.subscriptionTier });
        }
        queryBuilder.leftJoinAndSelect('organization.users', 'users');
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder || 'DESC';
        queryBuilder.orderBy(`organization.${sortBy}`, sortOrder);
        const [items, total] = await queryBuilder.getManyAndCount();
        return { items, total };
    }
    async findOne(id) {
        const organization = await this.organizationRepository.findOne({
            where: { id },
            relations: ['users']
        });
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        return organization;
    }
    async update(id, updateOrganizationDto) {
        const organization = await this.findOne(id);
        if (updateOrganizationDto.domain && updateOrganizationDto.domain !== organization.domain) {
            organization.isDomainVerified = false;
        }
        Object.assign(organization, updateOrganizationDto);
        const updatedOrg = await this.organizationRepository.save(organization);
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
        await this.organizationRepository.softDelete(id);
        await this.createAuditLog({
            organizationId: id,
            action: 'DELETE_ORGANIZATION',
            metadata: { organizationId: id }
        });
    }
    async addUser(id, addUserDto) {
        const organization = await this.findOne(id);
        const userCount = await this.userRepository.count({ where: { organizationId: id } });
        if (userCount >= organization.maxUsers) {
            throw new BadRequestException('Organization user limit reached');
        }
        const user = this.userRepository.create(Object.assign(Object.assign({}, addUserDto), { organizationId: id, requirePasswordChange: true }));
        const savedUser = await this.userRepository.save(user);
        await this.sendWelcomeEmail(savedUser.email, {
            organizationName: organization.name,
            temporaryPassword: addUserDto.password
        });
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
            throw new NotFoundException('User not found in organization');
        }
        await this.userRepository.softDelete(userId);
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
                role: Role.ADMIN,
                deletedAt: IsNull()
            }
        });
    }
    async updateSubscription(id, updateSubscriptionDto) {
        const organization = await this.findOne(id);
        Object.assign(organization, {
            subscriptionTier: updateSubscriptionDto.tier,
            subscriptionStartDate: updateSubscriptionDto.startDate,
            subscriptionEndDate: updateSubscriptionDto.endDate,
            maxUsers: updateSubscriptionDto.maxUsers,
            maxStorage: updateSubscriptionDto.maxStorage,
            isSubscriptionActive: true
        });
        const updatedOrg = await this.organizationRepository.save(organization);
        await this.createAuditLog({
            organizationId: id,
            action: 'UPDATE_SUBSCRIPTION',
            metadata: { changes: updateSubscriptionDto }
        });
        return updatedOrg;
    }
    async getStatistics(id) {
        const organization = await this.findOne(id);
        const totalUsers = await this.userRepository.count({
            where: { organizationId: id }
        });
        const activeUsers = await this.userRepository.count({
            where: { organizationId: id, isActive: true }
        });
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
        const isVerified = await this.verifyDomainOwnership(domain);
        if (isVerified) {
            organization.domain = domain;
            organization.isDomainVerified = true;
            await this.organizationRepository.save(organization);
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
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        queryBuilder.orderBy('audit_log.createdAt', 'DESC');
        const [items, total] = await queryBuilder.getManyAndCount();
        return { items, total };
    }
    async generateUniqueSlug(name) {
        let slug = generateSlug(name);
        let counter = 1;
        while (await this.organizationRepository.findOne({ where: { slug } })) {
            slug = generateSlug(name) + '-' + counter;
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
    async sendWelcomeEmail(email, data) {
        console.log(`Sending welcome email to ${email} for organization ${data.organizationName}`);
    }
    async getStorageUsage(organizationId) {
        console.log(`Getting storage usage for organization ${organizationId}`);
        return 0;
    }
    async verifyDomainOwnership(domain) {
        console.log(`Verifying domain ownership for ${domain}`);
        return true;
    }
};
OrganizationsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __param(1, InjectRepository(User)),
    __param(2, InjectRepository(AuditLog)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        DomainVerificationService,
        EmailService,
        StorageService])
], OrganizationsService);
export { OrganizationsService };
//# sourceMappingURL=organizations.service.js.map