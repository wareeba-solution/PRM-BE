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
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { OrganizationSubscriptionService } from '../services/organization-subscription.service';
let OrganizationBillingListener = OrganizationBillingListener_1 = class OrganizationBillingListener {
    constructor(organizationRepository, subscriptionService) {
        this.organizationRepository = organizationRepository;
        this.subscriptionService = subscriptionService;
        this.logger = new Logger(OrganizationBillingListener_1.name);
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
            organization.billing = Object.assign(Object.assign({}, organization.billing), { lastPaymentFailure: {
                    date: new Date(),
                    reason: failureReason,
                    attemptCount,
                } });
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
    OnEvent('organization.subscription.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionCreated", null);
__decorate([
    OnEvent('organization.subscription.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionUpdated", null);
__decorate([
    OnEvent('organization.subscription.cancelled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleSubscriptionCancelled", null);
__decorate([
    OnEvent('organization.billing.payment_failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handlePaymentFailed", null);
__decorate([
    OnEvent('organization.billing.invoice_paid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationBillingListener.prototype, "handleInvoicePaid", null);
OrganizationBillingListener = OrganizationBillingListener_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository,
        OrganizationSubscriptionService])
], OrganizationBillingListener);
export { OrganizationBillingListener };
//# sourceMappingURL=organization-billing.listener.js.map