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
var OrganizationRoleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireOrganizationRoles = exports.OrganizationRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_enum_1 = require("../../users/enums/role.enum");
let OrganizationRoleGuard = OrganizationRoleGuard_1 = class OrganizationRoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(OrganizationRoleGuard_1.name);
    }
    async canActivate(context) {
        try {
            const roles = this.reflector.get('roles', context.getHandler());
            // If no roles are specified, allow access
            if (!roles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const member = request.organizationMember;
            // Super admins bypass role checks
            if (user.role === role_enum_1.Role.SUPER_ADMIN) {
                return true;
            }
            // Ensure we have organization member info
            if (!member) {
                this.logger.warn(`Organization member info not found for user ${user.id}. ` +
                    'Make sure OrganizationAccessGuard runs before this guard.');
                return false;
            }
            // Check if user has required role
            if (!roles.roles.includes(member.role)) {
                // Check for self-access if allowed
                if (roles.allowSelf) {
                    const targetUserId = this.extractTargetUserId(request);
                    if (targetUserId === user.id) {
                        return true;
                    }
                }
                // Check resource ownership if enabled
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
            // Check common ownership fields
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OrganizationRoleGuard);
exports.OrganizationRoleGuard = OrganizationRoleGuard;
// Export the decorator for specifying required roles
const RequireOrganizationRoles = (metadata) => {
    return (target, propertyKey, descriptor) => {
        (0, common_1.SetMetadata)('roles', metadata)(target, propertyKey, descriptor);
        return descriptor;
    };
};
exports.RequireOrganizationRoles = RequireOrganizationRoles;
//# sourceMappingURL=organization-role.guard.js.map