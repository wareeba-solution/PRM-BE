"use strict";
// src/modules/tenants/services/tenants.service.ts
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
var TenantsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("../entities/tenant.entity");
const subdomain_utils_1 = require("../utils/subdomain.utils");
let TenantsService = TenantsService_1 = class TenantsService {
    constructor(tenantRepository) {
        this.tenantRepository = tenantRepository;
        this.logger = new common_1.Logger(TenantsService_1.name);
    }
    async create(createTenantDto) {
        var _a;
        try {
            // Validate the subdomain
            if (!subdomain_utils_1.SubdomainUtils.isValidSubdomain(createTenantDto.subdomain)) {
                throw new common_1.BadRequestException('Invalid subdomain format');
            }
            // Check if subdomain already exists
            const existingTenant = await this.findBySubdomain(createTenantDto.subdomain);
            if (existingTenant) {
                throw new common_1.ConflictException(`Subdomain '${createTenantDto.subdomain}' is already in use`);
            }
            // Create the tenant
            const tenant = this.tenantRepository.create(Object.assign(Object.assign({}, createTenantDto), { isActive: (_a = createTenantDto.isActive) !== null && _a !== void 0 ? _a : true }));
            await this.tenantRepository.save(tenant);
            this.logger.log(`Created new tenant with subdomain: ${tenant.subdomain}`);
            return tenant;
        }
        catch (error) {
            this.logger.error('Error creating tenant:', error);
            throw error;
        }
    }
    async findAll() {
        return this.tenantRepository.find();
    }
    async findOne(id) {
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with ID ${id} not found`);
        }
        return tenant;
    }
    async findBySubdomain(subdomain) {
        const tenant = await this.tenantRepository.findOne({ where: { subdomain } });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with subdomain ${subdomain} not found`);
        }
        return tenant;
    }
    async update(id, updateTenantDto) {
        const tenant = await this.findOne(id);
        // Check if subdomain is being changed and if it's already taken
        if (updateTenantDto.subdomain && updateTenantDto.subdomain !== tenant.subdomain) {
            const existingTenant = await this.tenantRepository.findOne({
                where: { subdomain: updateTenantDto.subdomain }
            });
            if (existingTenant) {
                throw new common_1.ConflictException(`Subdomain '${updateTenantDto.subdomain}' is already taken`);
            }
        }
        // Update subscription dates if provided
        if (updateTenantDto.subscriptionStartDate) {
            tenant.subscriptionStartDate = new Date(updateTenantDto.subscriptionStartDate);
        }
        if (updateTenantDto.subscriptionEndDate) {
            tenant.subscriptionEndDate = new Date(updateTenantDto.subscriptionEndDate);
        }
        // Update subscription status based on dates
        if (tenant.subscriptionStartDate && tenant.subscriptionEndDate) {
            const now = new Date();
            tenant.isSubscriptionActive = (tenant.subscriptionStartDate <= now && tenant.subscriptionEndDate >= now);
        }
        // Merge and save the updated tenant
        const updatedTenant = this.tenantRepository.merge(tenant, updateTenantDto);
        return this.tenantRepository.save(updatedTenant);
    }
    async activate(id) {
        const tenant = await this.findOne(id);
        if (tenant.status === tenant_entity_1.TenantStatus.ACTIVE) {
            throw new common_1.BadRequestException('Tenant is already active');
        }
        tenant.status = tenant_entity_1.TenantStatus.ACTIVE;
        return this.tenantRepository.save(tenant);
    }
    async deactivate(id) {
        const tenant = await this.findOne(id);
        if (tenant.status === tenant_entity_1.TenantStatus.INACTIVE) {
            throw new common_1.BadRequestException('Tenant is already inactive');
        }
        tenant.status = tenant_entity_1.TenantStatus.INACTIVE;
        return this.tenantRepository.save(tenant);
    }
    async suspend(id) {
        const tenant = await this.findOne(id);
        if (tenant.status === tenant_entity_1.TenantStatus.SUSPENDED) {
            throw new common_1.BadRequestException('Tenant is already suspended');
        }
        tenant.status = tenant_entity_1.TenantStatus.SUSPENDED;
        return this.tenantRepository.save(tenant);
    }
    async remove(id) {
        const tenant = await this.findOne(id);
        await this.tenantRepository.softRemove(tenant);
    }
};
TenantsService = TenantsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TenantsService);
exports.TenantsService = TenantsService;
//# sourceMappingURL=tenants.service.js.map