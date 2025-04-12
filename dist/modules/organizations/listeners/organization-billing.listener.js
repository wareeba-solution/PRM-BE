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
var OrganizationBillingListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationBillingListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../entities/organization.entity");
const organization_subscription_service_1 = require("../services/organization-subscription.service");
let OrganizationBillingListener = OrganizationBillingListener_1 = class OrganizationBillingListener {
    constructor(organizationRepository, subscriptionService) {
        this.organizationRepository = organizationRepository;
        this.subscriptionService = subscriptionService;
        this.logger = new common_1.Logger(OrganizationBillingListener_1.name);
    }
    async handleSubscriptionCreated(payload) {
        try {
            const { organizationId, planId } = payload;
            this.logger.debug(`Processing new subscription for organization ${organizationId}`);
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            // Update organization billing status
            organization.billing = Object.assign(Object.assign({}, organization.billing), { status: 'active', planId, startDate: new Date() });
            await this.organizationRepository.save(organization);
        }
        catch (error) {
            this.logger.error('Error processing subscription creation:', error);
            throw error;
        }
    }
    async handleSubscriptionUpdated(payload) {
        try {
            const { organizationId, planId, changes } = payload;
            this.logger.debug(`Processing subscription update for organization ${organizationId}`);
            await this.subscriptionService.updateSubscription(organizationId, planId, changes);
        }
        catch (error) {
            this.logger.error('Error processing subscription update:', error);
            throw error;
        }
    }
    async handleSubscriptionCancelled(payload) {
        try {
            const { organizationId } = payload;
            this.logger.debug(`Processing subscription cancellation for organization ${organizationId}`);
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            // Update organization billing status
            organization.billing = Object.assign(Object.assign({}, organization.billing), { status: 'cancelled', cancelledAt: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            await this.organizationRepository.save(organization);
        }
        catch (error) {
            this.logger.error('Error processing subscription cancellation:', error);
            throw error;
        }
    }
    async handlePaymentFailed(payload) {
        try {
            const { organizationId, failureReason, attemptCount } = payload;
            this.logger.debug(`Processing payment failure for organization ${organizationId}`);
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            // Update billing status and record failure
            organization.billing = Object.assign(Object.assign({}, organization.billing), { lastPaymentFailure: {
                    date: new Date(),
                    reason: failureReason,
                    attemptCount,
                } });
            // If multiple failures, mark as past due
            if (attemptCount > 2) {
                organization.billing.status = 'past_due';
            }
            await this.organizationRepository.save(organization);
        }
        catch (error) {
            this.logger.error('Error processing payment failure:', error);
            throw error;
        }
    }
    async handleInvoicePaid(payload) {
        try {
            const { organizationId, invoiceId, amount } = payload;
            this.logger.debug(`Processing paid invoice for organization ${organizationId}`);
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            // Update billing records
            organization.billing = Object.assign(Object.assign({}, organization.billing), { lastPaymentDate: new Date(), lastPaymentAmount: amount, lastInvoiceId: invoiceId, status: 'active' });
            await this.organizationRepository.save(organization);
        }
        catch (error) {
            this.logger.error('Error processing paid invoice:', error);
            throw error;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('organization.subscription.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('organization.subscription.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('organization.subscription.cancelled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionCancelled", null);
__decorate([
    (0, event_emitter_1.OnEvent)('organization.billing.payment_failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handlePaymentFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)('organization.billing.invoice_paid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleInvoicePaid", null);
OrganizationBillingListener = OrganizationBillingListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        organization_subscription_service_1.OrganizationSubscriptionService])
], OrganizationBillingListener);
exports.OrganizationBillingListener = OrganizationBillingListener;
//# sourceMappingURL=organization-billing.listener.js.map