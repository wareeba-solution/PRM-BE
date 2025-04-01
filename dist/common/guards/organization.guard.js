var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, ForbiddenException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrganizationsService } from '../../modules/organizations/services/organizations.service';
import { AUTH_ORG_KEY } from '../decorators/auth.decorator';
let OrganizationGuard = class OrganizationGuard {
    constructor(reflector, organizationService) {
        this.reflector = reflector;
        this.organizationService = organizationService;
    }
    async canActivate(context) {
        const requireOrganization = this.reflector.getAllAndOverride(AUTH_ORG_KEY, [context.getHandler(), context.getClass()]);
        if (!requireOrganization) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!user.organizationId) {
            throw new ForbiddenException('User is not associated with any organization');
        }
        try {
            const organization = await this.organizationService.findOne(user.organizationId);
            if (!organization) {
                throw new ForbiddenException('Organization not found');
            }
            if (organization.status !== 'ACTIVE') {
                throw new ForbiddenException('Organization is inactive');
            }
            if (!this.isSubscriptionValid(organization)) {
                throw new ForbiddenException('Organization subscription is invalid or expired');
            }
            await this.checkOrganizationLimits(organization, request);
            request.organization = organization;
            return true;
        }
        catch (error) {
            if (error instanceof ForbiddenException || error instanceof UnauthorizedException) {
                throw error;
            }
            throw new ForbiddenException('Organization access denied');
        }
    }
    isSubscriptionValid(organization) {
        const now = new Date();
        const subscriptionEnd = organization.subscriptionEndDate;
        if (!organization.isSubscriptionActive) {
            return false;
        }
        if (subscriptionEnd && subscriptionEnd < now) {
            return false;
        }
        return true;
    }
    async checkOrganizationLimits(organization, request) {
        if (organization.maxUsers > 0) {
            const userCount = await this.organizationService.getAdminCount(organization.id);
            if (userCount >= organization.maxUsers) {
                throw new ForbiddenException('Organization user limit reached');
            }
        }
        if (organization.maxStorage > 0 && request.url.includes('/storage')) {
            const statistics = await this.organizationService.getStatistics(organization.id);
            if (statistics.storageUsed >= organization.maxStorage) {
                throw new ForbiddenException('Organization storage limit reached');
            }
        }
        const requestedFeature = this.getRequestedFeature(request);
        if (requestedFeature && !this.hasFeatureAccess(organization, requestedFeature)) {
            throw new ForbiddenException(`Access to ${requestedFeature} feature is not included in your plan`);
        }
    }
    getRequestedFeature(request) {
        const featureMap = {
            '/api/messages/whatsapp': 'WHATSAPP_INTEGRATION',
            '/api/analytics': 'ADVANCED_ANALYTICS',
            '/api/export': 'DATA_EXPORT',
        };
        for (const [endpoint, feature] of Object.entries(featureMap)) {
            if (request.url.includes(endpoint)) {
                return feature;
            }
        }
        return null;
    }
    hasFeatureAccess(organization, feature) {
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
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        OrganizationsService])
], OrganizationGuard);
export { OrganizationGuard };
//# sourceMappingURL=organization.guard.js.map