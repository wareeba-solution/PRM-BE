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
var OrganizationAuditListener_1;
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { OrganizationAuditService } from '../services/organization-audit.service';
let OrganizationAuditListener = OrganizationAuditListener_1 = class OrganizationAuditListener {
    constructor(organizationRepository, auditService) {
        this.organizationRepository = organizationRepository;
        this.auditService = auditService;
        this.logger = new Logger(OrganizationAuditListener_1.name);
    }
    async handleMemberAdded(payload) {
        try {
            const { organizationId, userId, role, addedBy } = payload;
            await this.auditService.logEvent({
                organizationId,
                eventType: 'member_added',
                data: { userId, role },
                performedBy: addedBy,
                timestamp: new Date()
            });
        }
        catch (error) {
            this.logger.error('Error logging member addition:', error);
            throw error;
        }
    }
    async handleMemberRemoved(payload) {
        try {
            const { organizationId, userId, removedBy, reason } = payload;
            await this.auditService.logEvent({
                organizationId,
                eventType: 'member_removed',
                data: { userId, reason },
                performedBy: removedBy,
                timestamp: new Date()
            });
        }
        catch (error) {
            this.logger.error('Error logging member removal:', error);
            throw error;
        }
    }
    async handleRoleChanged(payload) {
        try {
            const { organizationId, userId, oldRole, newRole, changedBy } = payload;
            await this.auditService.logEvent({
                organizationId,
                eventType: 'role_changed',
                data: { userId, oldRole, newRole },
                performedBy: changedBy,
                timestamp: new Date()
            });
        }
        catch (error) {
            this.logger.error('Error logging role change:', error);
            throw error;
        }
    }
    async handleSettingsUpdated(payload) {
        try {
            const { organizationId, changes, updatedBy } = payload;
            await this.auditService.logEvent({
                organizationId,
                eventType: 'settings_updated',
                data: { changes },
                performedBy: updatedBy,
                timestamp: new Date()
            });
        }
        catch (error) {
            this.logger.error('Error logging settings update:', error);
            throw error;
        }
    }
    async handleSubscriptionChanged(payload) {
        try {
            const { organizationId, oldPlan, newPlan, changedBy } = payload;
            await this.auditService.logEvent({
                organizationId,
                eventType: 'subscription_changed',
                data: { oldPlan, newPlan },
                performedBy: changedBy,
                timestamp: new Date()
            });
        }
        catch (error) {
            this.logger.error('Error logging subscription change:', error);
            throw error;
        }
    }
};
__decorate([
    OnEvent('organization.member.added'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationAuditListener.prototype, "handleMemberAdded", null);
__decorate([
    OnEvent('organization.member.removed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationAuditListener.prototype, "handleMemberRemoved", null);
__decorate([
    OnEvent('organization.role.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationAuditListener.prototype, "handleRoleChanged", null);
__decorate([
    OnEvent('organization.settings.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationAuditListener.prototype, "handleSettingsUpdated", null);
__decorate([
    OnEvent('organization.subscription.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationAuditListener.prototype, "handleSubscriptionChanged", null);
OrganizationAuditListener = OrganizationAuditListener_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository,
        OrganizationAuditService])
], OrganizationAuditListener);
export { OrganizationAuditListener };
//# sourceMappingURL=organization-audit.listener.js.map