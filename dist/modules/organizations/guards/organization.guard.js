var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrganizationGuard_1;
import { Injectable, Logger, UnauthorizedException, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrganizationsService } from '../services/organizations.service';
import { Role } from '../../users/enums/role.enum';
let OrganizationGuard = OrganizationGuard_1 = class OrganizationGuard {
    constructor(reflector, organizationsService) {
        this.reflector = reflector;
        this.organizationsService = organizationsService;
        this.logger = new Logger(OrganizationGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            if (!user) {
                throw new UnauthorizedException('No authenticated user found');
            }
            if (user.role === Role.SUPER_ADMIN) {
                return true;
            }
            const organizationId = this.extractOrganizationId(request);
            if (!organizationId) {
                const isOptional = this.reflector.get('optionalOrganization', context.getHandler());
                return isOptional || false;
            }
            const hasAccess = await this.verifyOrganizationAccess(user.id, organizationId);
            if (!hasAccess) {
                throw new ForbiddenException('User does not have access to this organization');
            }
            const [organization, member] = await Promise.all([
                this.organizationsService.findOne(organizationId),
                this.organizationsService.getMemberContext(organizationId, user.id)
            ]);
            if (!organization) {
                throw new ForbiddenException('Organization not found');
            }
            if (!member) {
                throw new ForbiddenException('User is not a member of this organization');
            }
            request.organization = organization;
            request.organizationMember = member;
            return true;
        }
        catch (error) {
            this.logger.error('Error in organization guard:', error);
            throw error;
        }
    }
    extractOrganizationId(request) {
        var _a, _b, _c;
        return (((_a = request.params) === null || _a === void 0 ? void 0 : _a.organizationId) ||
            ((_b = request.body) === null || _b === void 0 ? void 0 : _b.organizationId) ||
            ((_c = request.query) === null || _c === void 0 ? void 0 : _c.organizationId) ||
            this.extractFromPath(request.path));
    }
    extractFromPath(path) {
        const matches = path.match(/\/organizations\/([^\/]+)/);
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
    async verifyOrganizationAccess(userId, organizationId) {
        try {
            const membership = await this.organizationsService.getMemberContext(organizationId, userId);
            if (!membership) {
                return false;
            }
            if (!membership.isActive) {
                return false;
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Error verifying organization access for user ${userId}:`, error);
            return false;
        }
    }
};
OrganizationGuard = OrganizationGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        OrganizationsService])
], OrganizationGuard);
export { OrganizationGuard };
export const OptionalOrganization = () => {
    return (target, key, descriptor) => {
        if (key) {
            if (descriptor) {
                SetMetadata('optionalOrganization', true)(target, key, descriptor);
            }
        }
        return descriptor;
    };
};
//# sourceMappingURL=organization.guard.js.map