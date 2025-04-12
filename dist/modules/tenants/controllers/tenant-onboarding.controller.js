"use strict";
// src/modules/tenants/controllers/tenant-onboarding.controller.ts
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
exports.TenantOnboardingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenant_onboarding_service_1 = require("../services/tenant-onboarding.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const tenant_registration_dto_1 = require("../dto/tenant-registration.dto");
const organization_setup_dto_1 = require("../dto/organization-setup.dto");
let TenantOnboardingController = class TenantOnboardingController {
    constructor(tenantOnboardingService) {
        this.tenantOnboardingService = tenantOnboardingService;
    }
    async registerTenant(registrationDto) {
        const result = await this.tenantOnboardingService.registerTenant(registrationDto);
        return {
            message: 'Tenant registered successfully',
            data: {
                tenant: {
                    id: result.tenant.id,
                    name: result.tenant.name,
                    subdomain: result.tenant.subdomain,
                    status: result.tenant.status,
                },
                organization: {
                    id: result.organization.id,
                    name: result.organization.name,
                },
                adminUser: {
                    id: result.adminUser.id,
                    email: result.adminUser.email,
                },
            },
        };
    }
    async addOrganization(setupDto, req) {
        // Ensure the tenant ID from the token matches the one in the request
        if (req.user.tenantId !== setupDto.tenantId && req.user.role !== role_enum_1.Role.SUPER_ADMIN) {
            return {
                message: 'You do not have permission to add organizations to this tenant',
                success: false,
            };
        }
        const organization = await this.tenantOnboardingService.addOrganization(setupDto);
        return {
            message: 'Organization added successfully',
            data: {
                id: organization.id,
                name: organization.name,
                tenantId: organization.tenantId,
            },
        };
    }
    async checkTenantStatus(subdomain) {
        // This endpoint can be used to check if a tenant subdomain is available
        // and the status of an existing tenant
        try {
            const tenant = await this.tenantOnboardingService.getTenantBySubdomain(subdomain);
            return {
                exists: true,
                status: tenant.status,
                name: tenant.name,
            };
        }
        catch (error) {
            return {
                exists: false,
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new tenant with initial organization and admin user' }),
    (0, swagger_1.ApiBody)({ type: tenant_registration_dto_1.TenantRegistrationDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Tenant registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Tenant with this subdomain already exists' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_registration_dto_1.TenantRegistrationDto]),
    __metadata("design:returntype", Promise)
], TenantOnboardingController.prototype, "registerTenant", null);
__decorate([
    (0, common_1.Post)('organizations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new organization to an existing tenant' }),
    (0, swagger_1.ApiBody)({ type: organization_setup_dto_1.OrganizationSetupDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Organization added successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden - insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid input data or tenant not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_setup_dto_1.OrganizationSetupDto, Object]),
    __metadata("design:returntype", Promise)
], TenantOnboardingController.prototype, "addOrganization", null);
__decorate([
    (0, common_1.Get)('status/:subdomain'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Check if a tenant subdomain is available and get tenant status' }),
    (0, swagger_1.ApiParam)({ name: 'subdomain', description: 'The subdomain to check', example: 'healthcare-network' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Tenant status information' }),
    __param(0, (0, common_1.Param)('subdomain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantOnboardingController.prototype, "checkTenantStatus", null);
TenantOnboardingController = __decorate([
    (0, swagger_1.ApiTags)('Tenant Onboarding'),
    (0, common_1.Controller)('tenant-onboarding'),
    __metadata("design:paramtypes", [tenant_onboarding_service_1.TenantOnboardingService])
], TenantOnboardingController);
exports.TenantOnboardingController = TenantOnboardingController;
//# sourceMappingURL=tenant-onboarding.controller.js.map