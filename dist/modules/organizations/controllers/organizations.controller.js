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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const organizations_service_1 = require("../services/organizations.service");
const create_organization_dto_1 = require("../dto/create-organization.dto");
const update_organization_dto_1 = require("../dto/update-organization.dto");
const organization_query_dto_1 = require("../dto/organization-query.dto");
const add_user_dto_1 = require("../dto/add-user.dto");
const update_subscription_dto_1 = require("../dto/update-subscription.dto");
let OrganizationsController = class OrganizationsController {
    constructor(organizationsService) {
        this.organizationsService = organizationsService;
    }
    async create(createOrganizationDto, req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        return this.organizationsService.create(Object.assign(Object.assign({}, createOrganizationDto), { createdById: req.user.id }));
    }
    async findAll(query) {
        return this.organizationsService.findAll(query);
    }
    async getCurrentOrganization(req) {
        if (!req.organization) {
            throw new common_1.UnauthorizedException('No organization context found');
        }
        return this.organizationsService.findOne(req.organization.id);
    }
    async findOne(id) {
        const organization = await this.organizationsService.findOne(id);
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return organization;
    }
    async update(id, updateOrganizationDto, req) {
        if (!req.user || !req.organization) {
            throw new common_1.UnauthorizedException('User or organization context not found');
        }
        // Only allow updating current organization unless super admin
        if (id !== req.organization.id && req.user.role !== role_enum_1.Role.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Cannot update other organizations');
        }
        return this.organizationsService.update(id, Object.assign(Object.assign({}, updateOrganizationDto), { updatedBy: req.user.id }));
    }
    async remove(id) {
        await this.organizationsService.remove(id);
    }
    async addUser(id, addUserDto, req) {
        if (!req.organization) {
            throw new common_1.UnauthorizedException('No organization context found');
        }
        // Only allow adding users to current organization
        if (id !== req.organization.id) {
            throw new common_1.ForbiddenException('Cannot add users to other organizations');
        }
        return this.organizationsService.addUser(id, addUserDto);
    }
    async removeUser(id, userId, req) {
        if (!req.user || !req.organization) {
            throw new common_1.UnauthorizedException('User or organization context not found');
        }
        // Only allow removing users from current organization
        if (id !== req.organization.id) {
            throw new common_1.ForbiddenException('Cannot remove users from other organizations');
        }
        // Prevent removing the last admin
        if (req.user.id === userId) {
            const admins = await this.organizationsService.getAdminCount(id);
            if (admins === 1) {
                throw new common_1.BadRequestException('Cannot remove the last administrator');
            }
        }
        await this.organizationsService.removeUser(id, userId);
    }
    async updateSubscription(id, updateSubscriptionDto, req) {
        if (!req.user || !req.organization) {
            throw new common_1.UnauthorizedException('User or organization context not found');
        }
        // Only allow updating current organization unless super admin
        if (id !== req.organization.id && req.user.role !== role_enum_1.Role.SUPER_ADMIN) {
            throw new common_1.ForbiddenException('Cannot update other organizations\' subscriptions');
        }
        return this.organizationsService.updateSubscription(id, updateSubscriptionDto);
    }
    async getStatistics(id, req) {
        if (!req.organization) {
            throw new common_1.UnauthorizedException('No organization context found');
        }
        // Only allow viewing current organization stats
        if (id !== req.organization.id) {
            throw new common_1.ForbiddenException('Cannot view other organizations\' statistics');
        }
        return this.organizationsService.getStatistics(id);
    }
    async verifyDomain(id, domain, req) {
        if (!req.organization) {
            throw new common_1.UnauthorizedException('No organization context found');
        }
        // Only allow verifying current organization domain
        if (id !== req.organization.id) {
            throw new common_1.ForbiddenException('Cannot verify other organizations\' domains');
        }
        return this.organizationsService.verifyDomain(id, domain);
    }
    async getAuditLogs(id, query, req) {
        if (!req.organization) {
            throw new common_1.UnauthorizedException('No organization context found');
        }
        // Only allow viewing current organization logs
        if (id !== req.organization.id) {
            throw new common_1.ForbiddenException('Cannot view other organizations\' audit logs');
        }
        return this.organizationsService.getAuditLogs(id, query);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_organization_dto_1.CreateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_query_dto_1.OrganizationQueryDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getCurrentOrganization", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organization_dto_1.UpdateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/users'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_user_dto_1.AddUserDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)(':id/users/:userId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Put)(':id/subscription'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_1.UpdateSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "updateSubscription", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)(':id/verify-domain'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('domain')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "verifyDomain", null);
__decorate([
    (0, common_1.Get)(':id/audit-logs'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getAuditLogs", null);
OrganizationsController = __decorate([
    (0, common_1.Controller)('organizations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [organizations_service_1.OrganizationsService])
], OrganizationsController);
exports.OrganizationsController = OrganizationsController;
//# sourceMappingURL=organizations.controller.js.map