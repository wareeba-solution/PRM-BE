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
var OrganizationSubscriptionService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Organization } from '../entities/organization.entity';
let OrganizationSubscriptionService = OrganizationSubscriptionService_1 = class OrganizationSubscriptionService {
    constructor(organizationRepository, eventEmitter) {
        this.organizationRepository = organizationRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(OrganizationSubscriptionService_1.name);
    }
    async createSubscription(organizationId, planId) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            const plan = await this.getPlan(planId);
            if (!plan) {
                throw new Error(`Invalid plan ID: ${planId}`);
            }
            organization.subscription = {
                planId,
                status: 'active',
                startDate: new Date(),
                features: plan.features,
                limits: plan.limits,
            };
            await this.organizationRepository.save(organization);
            this.eventEmitter.emit('organization.subscription.created', {
                organizationId,
                planId,
            });
        }
        catch (error) {
            this.logger.error(`Error creating subscription for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async updateSubscription(organizationId, planId, changes) {
        var _a;
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            const oldPlanId = (_a = organization.subscription) === null || _a === void 0 ? void 0 : _a.planId;
            organization.subscription = Object.assign(Object.assign(Object.assign({}, organization.subscription), changes), { planId, updatedAt: new Date() });
            await this.organizationRepository.save(organization);
            this.eventEmitter.emit('organization.subscription.updated', {
                organizationId,
                oldPlanId,
                newPlanId: planId,
                changes,
            });
        }
        catch (error) {
            this.logger.error(`Error updating subscription for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async cancelSubscription(organizationId, reason) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            organization.subscription = Object.assign(Object.assign({}, organization.subscription), { status: 'cancelled', cancelledAt: new Date(), cancellationReason: reason, endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            await this.organizationRepository.save(organization);
            this.eventEmitter.emit('organization.subscription.cancelled', {
                organizationId,
                reason,
            });
        }
        catch (error) {
            this.logger.error(`Error cancelling subscription for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async checkSubscriptionStatus(organizationId) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                return false;
            }
            return (organization.subscription.status === 'active' &&
                (!organization.subscription.endDate ||
                    new Date(organization.subscription.endDate) > new Date()));
        }
        catch (error) {
            this.logger.error(`Error checking subscription status for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async validateFeatureAccess(organizationId, feature) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                return false;
            }
            return organization.subscription.features.includes(feature);
        }
        catch (error) {
            this.logger.error(`Error validating feature access for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async checkResourceLimit(organizationId, resource) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                return { allowed: false, limit: 0, current: 0 };
            }
            const limit = organization.subscription.limits[resource] || 0;
            const current = await this.getCurrentResourceUsage(organizationId, resource);
            return {
                allowed: current < limit,
                limit,
                current,
            };
        }
        catch (error) {
            this.logger.error(`Error checking resource limit for organization ${organizationId}:`, error);
            throw error;
        }
    }
    async getPlan(planId) {
        const plans = {
            basic: {
                id: 'basic',
                name: 'Basic Plan',
                features: ['feature1', 'feature2'],
                limits: { users: 10, storage: 5 },
                price: 10,
            },
            pro: {
                id: 'pro',
                name: 'Pro Plan',
                features: ['feature1', 'feature2', 'feature3'],
                limits: { users: 50, storage: 25 },
                price: 25,
            },
        };
        return plans[planId] || null;
    }
    async getCurrentResourceUsage(organizationId, resource) {
        const resourceCounters = {
            users: async () => {
                var _a;
                const org = await this.organizationRepository.findOne({
                    where: { id: organizationId },
                    relations: ['members'],
                });
                return ((_a = org === null || org === void 0 ? void 0 : org.members) === null || _a === void 0 ? void 0 : _a.length) || 0;
            },
            storage: async () => {
                return 0;
            },
        };
        if (resourceCounters[resource]) {
            return await resourceCounters[resource]();
        }
        return 0;
    }
};
OrganizationSubscriptionService = OrganizationSubscriptionService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository,
        EventEmitter2])
], OrganizationSubscriptionService);
export { OrganizationSubscriptionService };
//# sourceMappingURL=organization-subscription.service.js.map