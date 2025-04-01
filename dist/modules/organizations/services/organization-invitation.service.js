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
var OrganizationInvitationService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as crypto from 'crypto';
import { Organization } from '../entities/organization.entity';
import { OrganizationInvitation } from '../entities/organization-invitation.entity';
import { User } from '../../users/entities/user.entity';
import { EmailService } from '../../../shared/services/email.service';
import { OrganizationSubscriptionService } from './organization-subscription.service';
let OrganizationInvitationService = OrganizationInvitationService_1 = class OrganizationInvitationService {
    constructor(organizationRepository, invitationRepository, userRepository, emailService, subscriptionService, eventEmitter) {
        this.organizationRepository = organizationRepository;
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.subscriptionService = subscriptionService;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(OrganizationInvitationService_1.name);
    }
    async createInvitation(organizationId, email, role, invitedBy) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id: organizationId }
            });
            if (!organization) {
                throw new Error(`Organization ${organizationId} not found`);
            }
            const { allowed, limit, current } = await this.subscriptionService.checkResourceLimit(organizationId, 'users');
            if (!allowed) {
                throw new Error(`Organization has reached member limit (${current}/${limit})`);
            }
            const existingMember = await this.userRepository.findOne({
                where: {
                    email,
                    organizationId
                }
            });
            if (existingMember) {
                throw new Error(`User ${email} is already a member of the organization`);
            }
            const existingInvitations = await this.invitationRepository.createQueryBuilder("invitation")
                .where("invitation.organizationId = :organizationId", { organizationId })
                .andWhere("invitation.email = :email", { email })
                .andWhere("invitation.status = :status", { status: "PENDING" })
                .getMany();
            if (existingInvitations.length > 0) {
                throw new Error(`Pending invitation already exists for ${email}`);
            }
            const invitation = new OrganizationInvitation();
            invitation.organizationId = organizationId;
            invitation.email = email;
            invitation.roles = [role];
            const inviter = await this.userRepository.findOne({
                where: { id: invitedBy }
            });
            if (!inviter) {
                throw new Error(`Inviter ${invitedBy} not found`);
            }
            invitation.invitedBy = inviter;
            invitation.token = this.generateInvitationToken();
            invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            invitation.status = "PENDING";
            const savedInvitation = await this.invitationRepository.save(invitation);
            await this.sendInvitationEmail(savedInvitation, organization);
            this.eventEmitter.emit('organization.invitation.created', {
                organizationId,
                email,
                role,
                invitedBy,
            });
            return savedInvitation;
        }
        catch (error) {
            this.logger.error('Error creating invitation:', error);
            throw error;
        }
    }
    async acceptInvitation(token, userId) {
        try {
            const invitations = await this.invitationRepository.createQueryBuilder("invitation")
                .where("invitation.token = :token", { token })
                .andWhere("invitation.status = :status", { status: "PENDING" })
                .getMany();
            const invitation = invitations.length > 0 ? invitations[0] : null;
            if (!invitation) {
                throw new Error('Invalid or expired invitation');
            }
            if (new Date() > invitation.expiresAt) {
                throw new Error('Invitation has expired');
            }
            const user = await this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.email !== invitation.email) {
                throw new Error('Invitation email does not match user email');
            }
            const organization = await this.organizationRepository.findOne({
                where: { id: invitation.organizationId }
            });
            if (!organization) {
                throw new Error('Organization not found');
            }
            organization.members = [
                ...(organization.members || []),
                {
                    userId,
                    role: invitation.roles,
                    joinedAt: new Date(),
                }
            ];
            await this.organizationRepository.save(organization);
            invitation.status = "ACCEPTED";
            invitation.metadata = Object.assign(Object.assign({}, (invitation.metadata || {})), { acceptedAt: new Date() });
            await this.invitationRepository.save(invitation);
            this.eventEmitter.emit('organization.member.added', {
                organizationId: organization.id,
                userId,
                role: invitation.roles,
                invitedBy: invitation.invitedBy,
            });
        }
        catch (error) {
            this.logger.error('Error accepting invitation:', error);
            throw error;
        }
    }
    async cancelInvitation(invitationId, cancelledBy) {
        try {
            const invitations = await this.invitationRepository.createQueryBuilder("invitation")
                .where("invitation.id = :id", { id: invitationId })
                .andWhere("invitation.status = :status", { status: "PENDING" })
                .getMany();
            const invitation = invitations.length > 0 ? invitations[0] : null;
            if (!invitation) {
                throw new Error('Invitation not found or already processed');
            }
            invitation.status = "CANCELLED";
            invitation.metadata = Object.assign(Object.assign({}, (invitation.metadata || {})), { cancelledAt: new Date(), cancelledBy: cancelledBy });
            await this.invitationRepository.save(invitation);
            this.eventEmitter.emit('organization.invitation.cancelled', {
                organizationId: invitation.organizationId,
                email: invitation.email,
                cancelledBy,
            });
        }
        catch (error) {
            this.logger.error('Error cancelling invitation:', error);
            throw error;
        }
    }
    async resendInvitation(invitationId) {
        try {
            const invitation = await this.invitationRepository.findOne({
                where: { id: invitationId }
            });
            if (!invitation) {
                throw new Error('Invitation not found');
            }
            if (String(invitation.status) !== "PENDING") {
                throw new Error('Can only resend pending invitations');
            }
            const organization = await this.organizationRepository.findOne({
                where: { id: invitation.organizationId }
            });
            if (!organization) {
                throw new Error('Organization not found');
            }
            invitation.token = this.generateInvitationToken();
            invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            invitation.resendCount = (invitation.resendCount || 0) + 1;
            await this.invitationRepository.save(invitation);
            await this.sendInvitationEmail(invitation, organization);
            this.eventEmitter.emit('organization.invitation.resent', {
                organizationId: organization.id,
                email: invitation.email,
                resendCount: invitation.resendCount,
            });
        }
        catch (error) {
            this.logger.error('Error resending invitation:', error);
            throw error;
        }
    }
    async listPendingInvitations(organizationId) {
        try {
            return await this.invitationRepository.createQueryBuilder("invitation")
                .where("invitation.organizationId = :organizationId", { organizationId })
                .andWhere("invitation.status = :status", { status: "PENDING" })
                .orderBy("invitation.createdAt", "DESC")
                .getMany();
        }
        catch (error) {
            this.logger.error('Error listing pending invitations:', error);
            throw error;
        }
    }
    generateInvitationToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    async sendInvitationEmail(invitation, organization) {
        try {
            let inviterName = 'An organization administrator';
            if (invitation.invitedBy) {
                if (typeof invitation.invitedBy === 'object' && invitation.invitedBy.firstName) {
                    inviterName = `${invitation.invitedBy.firstName} ${invitation.invitedBy.lastName || ''}`.trim();
                }
                else if (typeof invitation.invitedBy === 'string') {
                    inviterName = invitation.invitedBy;
                }
            }
            const roleValue = Array.isArray(invitation.roles)
                ? invitation.roles.join(', ')
                : String(invitation.roles || '');
            const emailData = {
                to: invitation.email,
                subject: `Invitation to join ${organization.name}`,
                template: 'organization-invitation',
                context: {
                    organizationName: organization.name,
                    inviterName: inviterName,
                    role: roleValue,
                    acceptUrl: `${process.env.APP_URL}/invitations/accept?token=${invitation.token}`,
                    expiresAt: invitation.expiresAt,
                }
            };
            if (typeof this.emailService.sendEmail === 'function') {
                await this.emailService.sendEmail(emailData);
            }
            else {
                this.logger.warn('No suitable email service method found. Please implement a proper email sending method.');
            }
        }
        catch (error) {
            this.logger.error('Error sending invitation email:', error);
            throw error;
        }
    }
    async cleanupExpiredInvitations() {
        try {
            const expiredInvitations = await this.invitationRepository.createQueryBuilder("invitation")
                .where("invitation.status = :status", { status: "PENDING" })
                .andWhere("invitation.expiresAt <= :now", { now: new Date() })
                .getMany();
            for (const invitation of expiredInvitations) {
                invitation.status = "EXPIRED";
                await this.invitationRepository.save(invitation);
                this.eventEmitter.emit('organization.invitation.expired', {
                    organizationId: invitation.organizationId,
                    email: invitation.email,
                });
            }
        }
        catch (error) {
            this.logger.error('Error cleaning up expired invitations:', error);
            throw error;
        }
    }
};
OrganizationInvitationService = OrganizationInvitationService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Organization)),
    __param(1, InjectRepository(OrganizationInvitation)),
    __param(2, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        EmailService,
        OrganizationSubscriptionService,
        EventEmitter2])
], OrganizationInvitationService);
export { OrganizationInvitationService };
//# sourceMappingURL=organization-invitation.service.js.map