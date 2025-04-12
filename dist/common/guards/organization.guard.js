"use strict";
// src/common/guards/organization.guard.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const organizations_service_1 = require("../../modules/organizations/services/organizations.service");
const auth_decorator_1 = require("../decorators/auth.decorator");
let OrganizationGuard = class OrganizationGuard {
    constructor(reflector, organizationService) {
        this.reflector = reflector;
        this.organizationService = organizationService;
    }
    async canActivate(context) {
        // Check if organization check is required
        const requireOrganization = this.reflector.getAllAndOverride(auth_decorator_1.AUTH_ORG_KEY, [context.getHandler(), context.getClass()]);
        if (!requireOrganization) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.organizationId) {
            throw new common_1.ForbiddenException('User is not associated with any organization');
        }
        try {
            // Get organization details
            const organization = await this.organizationService.findOne(user.organizationId);
            if (!organization) {
                throw new common_1.ForbiddenException('Organization not found');
            }
            // Check if organization is active
            if (organization.status !== 'ACTIVE') {
                throw new common_1.ForbiddenException('Organization is inactive');
            }
            // Check subscription status
            if (!this.isSubscriptionValid(organization)) {
                throw new common_1.ForbiddenException('Organization subscription is invalid or expired');
            }
            // Check organization limits
            await this.checkOrganizationLimits(organization, request);
            // Add organization to request for use in controllers
            request.organization = organization;
            return true;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException || error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.ForbiddenException('Organization access denied');
        }
    }
    isSubscriptionValid(organization) {
        const now = new Date();
        const subscriptionEnd = organization.subscriptionEndDate;
        // Check if subscription is active
        if (!organization.isSubscriptionActive) {
            return false;
        }
        // Check if subscription end date is valid
        if (subscriptionEnd && subscriptionEnd < now) {
            return false;
        }
        return true;
    }
    async checkOrganizationLimits(organization, request) {
        // Check user limit
        if (organization.maxUsers > 0) {
            const userCount = await this.organizationService.getAdminCount(organization.id);
            if (userCount >= organization.maxUsers) {
                throw new common_1.ForbiddenException('Organization user limit reached');
            }
        }
        // Check storage limit
        if (organization.maxStorage > 0 && request.url.includes('/storage')) {
            const statistics = await this.organizationService.getStatistics(organization.id);
            if (statistics.storageUsed >= organization.maxStorage) {
                throw new common_1.ForbiddenException('Organization storage limit reached');
            }
        }
        // Check feature access
        const requestedFeature = this.getRequestedFeature(request);
        if (requestedFeature && !this.hasFeatureAccess(organization, requestedFeature)) {
            throw new common_1.ForbiddenException(`Access to ${requestedFeature} feature is not included in your plan`);
        }
    }
    getRequestedFeature(request) {
        // Map endpoints to features
        const featureMap = {
            '/api/messages/whatsapp': 'WHATSAPP_INTEGRATION',
            '/api/analytics': 'ADVANCED_ANALYTICS',
            '/api/export': 'DATA_EXPORT',
            // Add more feature mappings
        };
        for (const [endpoint, feature] of Object.entries(featureMap)) {
            if (request.url.includes(endpoint)) {
                return feature;
            }
        }
        return null;
    }
    hasFeatureAccess(organization, feature) {
        // Check if the feature is included in the organization's settings or tier-based features
        const tierFeatures = this.getTierFeatures(organization.subscriptionTier);
        return tierFeatures.includes(feature);
    }
    getTierFeatures(tier) {
        const tierFeaturesMap = {
            'FREE': ['BASIC'],
            'BASIC': ['BASIC', 'DATA_EXPORT'],
            'PROFESSIONAL': ['BASIC', 'DATA_EXPORT', 'ADVANCED_ANALYTICS'],
            'ENTERPRISE': ['BASIC', 'DATA_EXPORT', 'ADVANCED_ANALYTICS', 'WHATSAPP_INTEGRATION'],
        };
        return tierFeaturesMap[tier] || [];
    }
};
OrganizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        organizations_service_1.OrganizationsService])
], OrganizationGuard);
exports.OrganizationGuard = OrganizationGuard;
//# sourceMappingURL=organization.guard.js.map