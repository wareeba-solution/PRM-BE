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
import { Injectable, ForbiddenException, Logger, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { AuthService } from '../services/auth.service';
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new Logger(RolesGuard_1.name);
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const requiredPermissions = this.reflector.getAllAndOverride(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles && !requiredPermissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new ForbiddenException('User not found in request');
        }
        try {
            if ((requiredRoles === null || requiredRoles === void 0 ? void 0 : requiredRoles.length) > 0) {
                const hasRole = this.matchRoles(requiredRoles, user.role);
                if (!hasRole) {
                    this.logger.warn(`User ${user.id} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`);
                    return false;
                }
            }
            if ((requiredPermissions === null || requiredPermissions === void 0 ? void 0 : requiredPermissions.length) > 0) {
                const hasPermissions = await this.matchPermissions(requiredPermissions, user);
                if (!hasPermissions) {
                    this.logger.warn(`User ${user.id} attempted to access resource requiring permissions: ${requiredPermissions.join(', ')}`);
                    return false;
                }
            }
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
        if (userRole === Role.SUPER_ADMIN) {
            return true;
        }
        return requiredRoles.includes(userRole);
    }
    async matchPermissions(requiredPermissions, user) {
        const userPermissions = await this.authService.getUserPermissions(user.id);
        if (user.role === Role.SUPER_ADMIN) {
            return true;
        }
        return requiredPermissions.every((permission) => userPermissions.includes(permission));
    }
    async checkResourceOwnership(user, resourceId, resourceType) {
        return this.authService.checkResourceOwnership(user.id, resourceId, resourceType);
    }
};
RolesGuard = RolesGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService])
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=roles.guard.js.map