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
var OrganizationSubscriptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const organization_entity_1 = require("../entities/organization.entity");
let OrganizationSubscriptionService = OrganizationSubscriptionService_1 = class OrganizationSubscriptionService {
    constructor(organizationRepository, eventEmitter) {
        this.organizationRepository = organizationRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(OrganizationSubscriptionService_1.name);
    }
    async createSubscription(organizationId, planId) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            // Validate plan
            const plan = await this.getPlan(planId);
            if (!plan) {
                throw new Error(`Invalid plan ID: ${planId}`);
            }
            // Update organization with subscription details
            organization.subscription = {
                planId,
                status: 'active',
                startDate: new Date(),
                features: plan.features,
                limits: plan.limits,
            };
            await this.organizationRepository.save(organization);
            // Emit subscription created event
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
            // Update subscription details
            organization.subscription = Object.assign(Object.assign(Object.assign({}, organization.subscription), changes), { planId, updatedAt: new Date() });
            await this.organizationRepository.save(organization);
            // Emit subscription updated event
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
            // Update subscription status
            organization.subscription = Object.assign(Object.assign({}, organization.subscription), { status: 'cancelled', cancelledAt: new Date(), cancellationReason: reason, endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            await this.organizationRepository.save(organization);
            // Emit subscription cancelled event
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
            // Check if subscription is active and not expired
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
        // Implementation would typically fetch from a database or external service
        // This is a placeholder implementation
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
        // Implementation would vary based on the resource type
        // This is a placeholder implementation
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
                // Implementation for checking storage usage
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], OrganizationSubscriptionService);
exports.OrganizationSubscriptionService = OrganizationSubscriptionService;
//# sourceMappingURL=organization-subscription.service.js.map