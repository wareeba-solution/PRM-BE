"use strict";
// src/modules/tenants/controllers/tenants.controller.ts
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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("../services/tenants.service");
const create_tenant_dto_1 = require("../dto/create-tenant.dto");
const update_tenant_dto_1 = require("../dto/update-tenant.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
let TenantsController = class TenantsController {
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    async testSubdomain(req) {
        const host = req.headers.host || '';
        const subdomain = this.extractSubdomain(host);
        return {
            host,
            extractedSubdomain: subdomain,
            headers: req.headers,
        };
    }
    extractSubdomain(host) {
        try {
            if (!host || typeof host !== 'string')
                return null;
            if (host.includes('localhost') || /\d+\.\d+\.\d+\.\d+/.test(host))
                return null;
            const hostWithoutPort = host.split(':')[0];
            const parts = hostWithoutPort.split('.').filter(part => part.length > 0);
            if (parts.length < 3)
                return null;
            const subdomain = parts[0];
            if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(subdomain))
                return null;
            return subdomain;
        }
        catch (error) {
            return null;
        }
    }
    async create(createTenantDto) {
        const tenant = await this.tenantsService.create(createTenantDto);
        return {
            message: 'Tenant created successfully',
            data: tenant,
        };
    }
    async findAll() {
        const tenants = await this.tenantsService.findAll();
        return {
            data: tenants,
        };
    }
    async findOne(id) {
        const tenant = await this.tenantsService.findOne(id);
        return {
            data: tenant,
        };
    }
    async findBySubdomain(subdomain) {
        const tenant = await this.tenantsService.findBySubdomain(subdomain);
        return {
            data: tenant,
        };
    }
    async update(id, updateTenantDto) {
        const tenant = await this.tenantsService.update(id, updateTenantDto);
        return {
            message: 'Tenant updated successfully',
            data: tenant,
        };
    }
    async activate(id) {
        const tenant = await this.tenantsService.activate(id);
        return {
            message: 'Tenant activated successfully',
            data: tenant,
        };
    }
    async deactivate(id) {
        const tenant = await this.tenantsService.deactivate(id);
        return {
            message: 'Tenant deactivated successfully',
            data: tenant,
        };
    }
    async suspend(id) {
        const tenant = await this.tenantsService.suspend(id);
        return {
            message: 'Tenant suspended successfully',
            data: tenant,
        };
    }
    async remove(id) {
        await this.tenantsService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)('test-subdomain'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "testSubdomain", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('subdomain/:subdomain'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('subdomain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "findBySubdomain", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tenant_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/suspend'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "suspend", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "remove", null);
TenantsController = __decorate([
    (0, common_1.Controller)('tenants'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
exports.TenantsController = TenantsController;
//# sourceMappingURL=tenants.controller.js.map