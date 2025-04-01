var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrganizationRoleGuard_1;
import { Injectable, Logger, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../users/enums/role.enum';
let OrganizationRoleGuard = OrganizationRoleGuard_1 = class OrganizationRoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new Logger(OrganizationRoleGuard_1.name);
    }
    async canActivate(context) {
        try {
            const roles = this.reflector.get('roles', context.getHandler());
            if (!roles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const member = request.organizationMember;
            if (user.role === Role.SUPER_ADMIN) {
                return true;
            }
            if (!member) {
                this.logger.warn(`Organization member info not found for user ${user.id}. ` +
                    'Make sure OrganizationAccessGuard runs before this guard.');
                return false;
            }
            if (!roles.roles.includes(member.role)) {
                if (roles.allowSelf) {
                    const targetUserId = this.extractTargetUserId(request);
                    if (targetUserId === user.id) {
                        return true;
                    }
                }
                if (roles.checkResourceOwner) {
                    const hasOwnership = await this.checkResourceOwnership(request, user.id);
                    if (hasOwnership) {
                        return true;
                    }
                }
                this.logger.warn(`User ${user.id} with role ${member.role} attempted to access resource ` +
                    `requiring roles: ${roles.roles.join(', ')}`);
                return false;
            }
            return true;
        }
        catch (error) {
            this.logger.error('Error in organization role guard:', error);
            return false;
        }
    }
    extractTargetUserId(request) {
        return (request.params.userId ||
            request.body.userId ||
            request.query.userId);
    }
    async checkResourceOwnership(request, userId) {
        try {
            const resource = request.resource;
            if (!resource) {
                return false;
            }
            const ownerId = resource.userId || resource.createdBy || resource.ownerId;
            return ownerId === userId;
        }
        catch (error) {
            this.logger.error('Error checking resource ownership:', error);
            return false;
        }
    }
};
OrganizationRoleGuard = OrganizationRoleGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], OrganizationRoleGuard);
export { OrganizationRoleGuard };
export const RequireOrganizationRoles = (metadata) => {
    return (target, propertyKey, descriptor) => {
        SetMetadata('roles', metadata)(target, propertyKey, descriptor);
        return descriptor;
    };
};
//# sourceMappingURL=organization-role.guard.js.map