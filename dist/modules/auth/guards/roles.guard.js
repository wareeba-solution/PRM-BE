"use strict";
// src/modules/auth/guards/roles.guard.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_enum_1 = require("../../users/enums/role.enum");
const roles_decorator_1 = require("../decorators/roles.decorator");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const auth_service_1 = require("../services/auth.service");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new common_1.Logger(RolesGuard_1.name);
    }
    async canActivate(context) {
        // Get required roles and permissions from decorators
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const requiredPermissions = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        // If no roles or permissions are required, allow access
        if (!requiredRoles && !requiredPermissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('User not found in request');
        }
        try {
            // Check roles
            if ((requiredRoles === null || requiredRoles === void 0 ? void 0 : requiredRoles.length) > 0) {
                const hasRole = this.matchRoles(requiredRoles, user.role);
                if (!hasRole) {
                    this.logger.warn(`User ${user.id} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`);
                    return false;
                }
            }
            // Check permissions
            if ((requiredPermissions === null || requiredPermissions === void 0 ? void 0 : requiredPermissions.length) > 0) {
                const hasPermissions = await this.matchPermissions(requiredPermissions, user);
                if (!hasPermissions) {
                    this.logger.warn(`User ${user.id} attempted to access resource requiring permissions: ${requiredPermissions.join(', ')}`);
                    return false;
                }
            }
            // Handle organization-specific permissions
            if (request.params.organizationId) {
                const hasOrgAccess = await this.authService.checkOrganizationAccess(user.id, request.params.organizationId);
                if (!hasOrgAccess) {
                    this.logger.warn(`User ${user.id} attempted to access organization ${request.params.organizationId} without permission`);
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Error in roles guard: ${error.message}`, error.stack);
            return false;
        }
    }
    matchRoles(requiredRoles, userRole) {
        // Super admin has access to everything
        if (userRole === role_enum_1.Role.SUPER_ADMIN) {
            return true;
        }
        return requiredRoles.includes(userRole);
    }
    async matchPermissions(requiredPermissions, user) {
        // Get user permissions (could be cached)
        const userPermissions = await this.authService.getUserPermissions(user.id);
        // Super admin has all permissions
        if (user.role === role_enum_1.Role.SUPER_ADMIN) {
            return true;
        }
        // Check if user has all required permissions
        return requiredPermissions.every((permission) => userPermissions.includes(permission));
    }
    // Helper method to check resource ownership
    async checkResourceOwnership(user, resourceId, resourceType) {
        // Basic implementation of resource ownership check
        // For now, only super admins and resource owners can access
        if (user.role === role_enum_1.Role.SUPER_ADMIN) {
            return true;
        }
        // In a real implementation, we would check the database
        // to see if the user owns or has access to the resource
        // This is a simplified version
        return user.id === resourceId;
    }
};
RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map