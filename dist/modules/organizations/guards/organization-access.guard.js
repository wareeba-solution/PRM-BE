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
var OrganizationAccessGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../entities/organization.entity");
const role_enum_1 = require("../../users/enums/role.enum");
let OrganizationAccessGuard = OrganizationAccessGuard_1 = class OrganizationAccessGuard {
    constructor(reflector, organizationRepository) {
        this.reflector = reflector;
        this.organizationRepository = organizationRepository;
        this.logger = new common_1.Logger(OrganizationAccessGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const organizationId = this.extractOrganizationId(request);
            // Skip check if no organization ID is present
            if (!organizationId) {
                return true;
            }
            // Super admins always have access
            if (user.role === role_enum_1.Role.SUPER_ADMIN) {
                return true;
            }
            // Check if user has any access to the organization
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId },
                relations: ['members']
            });
            if (!organization) {
                this.logger.warn(`Organization ${organizationId} not found`);
                return false;
            }
            const member = organization.members.find((m) => m.userId === user.id);
            if (!member) {
                this.logger.warn(`User ${user.id} attempted to access organization ${organizationId} without membership`);
                return false;
            }
            // Store organization and member info in request for later use
            request.organization = organization;
            request.organizationMember = member;
            return true;
        }
        catch (error) {
            this.logger.error('Error in organization access guard:', error);
            return false;
        }
    }
    extractOrganizationId(request) {
        // Try to get organization ID from various places
        return (request.params.organizationId ||
            request.body.organizationId ||
            request.query.organizationId ||
            request.headers['x-organization-id']);
    }
};
OrganizationAccessGuard = OrganizationAccessGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], OrganizationAccessGuard);
exports.OrganizationAccessGuard = OrganizationAccessGuard;
//# sourceMappingURL=organization-access.guard.js.map