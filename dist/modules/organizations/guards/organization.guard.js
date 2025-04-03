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
var OrganizationGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalOrganization = exports.OrganizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const organizations_service_1 = require("../services/organizations.service");
const role_enum_1 = require("../../users/enums/role.enum");
let OrganizationGuard = OrganizationGuard_1 = class OrganizationGuard {
    constructor(reflector, organizationsService) {
        this.reflector = reflector;
        this.organizationsService = organizationsService;
        this.logger = new common_1.Logger(OrganizationGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            // Handle case where no user is authenticated
            if (!user) {
                throw new common_1.UnauthorizedException('No authenticated user found');
            }
            // Super admins bypass organization checks
            if (user.role === role_enum_1.Role.SUPER_ADMIN) {
                return true;
            }
            // Get organization ID from request params or query
            const organizationId = this.extractOrganizationId(request);
            // If no organization ID is found, check if the endpoint is marked as optional
            if (!organizationId) {
                const isOptional = this.reflector.get('optionalOrganization', context.getHandler());
                return isOptional || false;
            }
            // Verify user's organization access
            const hasAccess = await this.verifyOrganizationAccess(user.id, organizationId);
            if (!hasAccess) {
                throw new common_1.ForbiddenException('User does not have access to this organization');
            }
            // Get organization details and member context
            const [organization, member] = await Promise.all([
                this.organizationsService.findOne(organizationId),
                this.organizationsService.getMemberContext(organizationId, user.id)
            ]);
            if (!organization) {
                throw new common_1.ForbiddenException('Organization not found');
            }
            if (!member) {
                throw new common_1.ForbiddenException('User is not a member of this organization');
            }
            // Attach organization and member context to request
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
        // Try to get organization ID from different places in the request
        return (((_a = request.params) === null || _a === void 0 ? void 0 : _a.organizationId) ||
            ((_b = request.body) === null || _b === void 0 ? void 0 : _b.organizationId) ||
            ((_c = request.query) === null || _c === void 0 ? void 0 : _c.organizationId) ||
            this.extractFromPath(request.path));
    }
    extractFromPath(path) {
        // Extract organization ID from URL path if it follows the pattern /organizations/{id}/...
        const matches = path.match(/\/organizations\/([^\/]+)/);
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
    async verifyOrganizationAccess(userId, organizationId) {
        try {
            // Check if user is a member of the organization
            const membership = await this.organizationsService.getMemberContext(organizationId, userId);
            if (!membership) {
                return false;
            }
            // Check if membership is active
            if (!membership.isActive) {
                return false;
            }
            // Check if user has required roles/permissions
            // This can be expanded based on your requirements
            return true;
        }
        catch (error) {
            this.logger.error(`Error verifying organization access for user ${userId}:`, error);
            return false;
        }
    }
};
OrganizationGuard = OrganizationGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        organizations_service_1.OrganizationsService])
], OrganizationGuard);
exports.OrganizationGuard = OrganizationGuard;
// Decorator to mark endpoints where organization context is optional
const OptionalOrganization = () => {
    return (target, key, descriptor) => {
        if (key) {
            if (descriptor) {
                (0, common_1.SetMetadata)('optionalOrganization', true)(target, key, descriptor);
            }
        }
        return descriptor;
    };
};
exports.OptionalOrganization = OptionalOrganization;
//# sourceMappingURL=organization.guard.js.map