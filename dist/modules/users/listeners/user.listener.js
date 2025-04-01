var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserEventListener_1;
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { EmailService } from '../../../shared/services/email.service';
import { AuditService } from '../../../shared/services/audit.service';
let UserEventListener = UserEventListener_1 = class UserEventListener {
    constructor(notificationsService, emailService, auditService) {
        this.notificationsService = notificationsService;
        this.emailService = emailService;
        this.auditService = auditService;
        this.logger = new Logger(UserEventListener_1.name);
    }
    async handleUserCreated(event) {
        try {
            await Promise.all([
                this.auditService.log({
                    action: 'USER_CREATED',
                    entityType: 'USER',
                    entityId: event.user.id,
                    actorId: event.performedBy,
                    organizationId: event.organizationId,
                    metadata: event.metadata,
                }),
                this.emailService.sendEmail({
                    to: event.user.email,
                    subject: 'Welcome to the Platform',
                    template: 'welcome-email',
                    context: {
                        firstName: event.user.firstName,
                        loginUrl: `${process.env.APP_URL}/login`,
                    },
                }),
                event.organizationId &&
                    this.notificationsService.send({
                        type: 'USER_CREATED',
                        title: 'New User Created',
                        message: `${event.user.firstName} ${event.user.lastName} has joined the organization`,
                        organizationId: event.organizationId,
                        data: {
                            userId: event.user.id,
                            email: event.user.email,
                        },
                        userId: '',
                    }),
            ].filter(Boolean));
        }
        catch (error) {
            this.logger.error('Error handling user created event', {
                error,
                userId: event.user.id
            });
            throw error;
        }
    }
    async handleUserUpdated(event) {
        var _a;
        try {
            await this.auditService.log({
                action: 'USER_UPDATED',
                entityType: 'USER',
                entityId: event.user.id,
                actorId: event.performedBy,
                organizationId: event.organizationId,
                metadata: event.metadata,
            });
            if ((_a = event.metadata) === null || _a === void 0 ? void 0 : _a.importantChanges) {
                await this.notificationsService.send({
                    type: 'PROFILE_UPDATED',
                    title: 'Profile Updates',
                    message: 'Your profile information has been updated',
                    data: {
                        changes: event.metadata.importantChanges,
                    },
                    userId: '',
                });
            }
        }
        catch (error) {
            this.logger.error('Error handling user updated event', {
                error,
                userId: event.user.id,
            });
            throw error;
        }
    }
    async handlePasswordChanged(event) {
        try {
            await Promise.all([
                this.auditService.log({
                    action: 'PASSWORD_CHANGED',
                    entityType: 'USER',
                    entityId: event.user.id,
                    actorId: event.performedBy || event.user.id,
                    organizationId: event.organizationId,
                    metadata: {
                        requiresReset: event.requiresReset,
                        expiresAt: event.expiresAt,
                    },
                }),
                this.emailService.sendEmail({
                    to: event.user.email,
                    subject: 'Password Changed',
                    template: 'password-changed',
                    context: {
                        firstName: event.user.firstName,
                        requiresReset: event.requiresReset,
                        expiresAt: event.expiresAt,
                    },
                }),
            ]);
        }
        catch (error) {
            this.logger.error('Error handling password changed event', {
                error,
                userId: event.user.id,
            });
            throw error;
        }
    }
    async handleStatusChanged(event) {
        try {
            const status = event.user.isActive ? 'activated' : 'deactivated';
            await Promise.all([
                this.auditService.log({
                    action: `USER_${status.toUpperCase()}`,
                    entityType: 'USER',
                    entityId: event.user.id,
                    actorId: event.performedBy,
                    organizationId: event.organizationId,
                    metadata: event.metadata,
                }),
                event.organizationId &&
                    this.notificationsService.send({
                        type: 'USER_STATUS_CHANGED',
                        title: `User Account ${status}`,
                        message: `${event.user.firstName} ${event.user.lastName}'s account has been ${status}`,
                        organizationId: event.organizationId,
                        data: {
                            userId: event.user.id,
                            status,
                        },
                        userId: '',
                    }),
                this.emailService.sendEmail({
                    to: event.user.email,
                    subject: `Account ${status}`,
                    template: `account-${status}`,
                    context: {
                        firstName: event.user.firstName,
                    },
                }),
            ].filter(Boolean));
        }
        catch (error) {
            this.logger.error('Error handling user status changed event', {
                error,
                userId: event.user.id,
            });
            throw error;
        }
    }
    async handleUserDeleted(event) {
        try {
            await Promise.all([
                this.auditService.log({
                    action: 'USER_DELETED',
                    entityType: 'USER',
                    entityId: event.user.id,
                    actorId: event.performedBy,
                    organizationId: event.organizationId,
                    metadata: event.metadata,
                }),
                event.organizationId &&
                    this.notificationsService.send({
                        type: 'USER_DELETED',
                        title: 'User Account Deleted',
                        message: `${event.user.firstName} ${event.user.lastName}'s account has been deleted`,
                        organizationId: event.organizationId,
                        data: {
                            userId: event.user.id,
                            email: event.user.email,
                        },
                        userId: '',
                    }),
            ].filter(Boolean));
        }
        catch (error) {
            this.logger.error('Error handling user deleted event', {
                error,
                userId: event.user.id,
            });
            throw error;
        }
    }
    async handleUserLogin(event) {
        var _a;
        try {
            await Promise.all([
                this.auditService.log({
                    action: 'USER_LOGIN',
                    entityType: 'USER',
                    entityId: event.user.id,
                    actorId: event.user.id,
                    organizationId: event.organizationId,
                    metadata: Object.assign({ ip: event.ip, userAgent: event.userAgent }, event.metadata),
                }),
                ((_a = event.metadata) === null || _a === void 0 ? void 0 : _a.suspicious) &&
                    this.notificationsService.send({
                        type: 'SUSPICIOUS_LOGIN',
                        title: 'Suspicious Login Detected',
                        message: 'A login attempt from an unrecognized device was detected',
                        userId: event.user.id,
                        priority: 'HIGH',
                        data: {
                            ip: event.ip,
                            userAgent: event.userAgent,
                            location: event.metadata.location,
                        },
                    }),
            ].filter(Boolean));
        }
        catch (error) {
            this.logger.error('Error handling user login event', {
                error,
                userId: event.user.id,
            });
            throw error;
        }
    }
};
__decorate([
    OnEvent('user.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleUserCreated", null);
__decorate([
    OnEvent('user.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleUserUpdated", null);
__decorate([
    OnEvent('user.password.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handlePasswordChanged", null);
__decorate([
    OnEvent('user.status.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleStatusChanged", null);
__decorate([
    OnEvent('user.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleUserDeleted", null);
__decorate([
    OnEvent('user.login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventListener.prototype, "handleUserLogin", null);
UserEventListener = UserEventListener_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationsService,
        EmailService,
        AuditService])
], UserEventListener);
export { UserEventListener };
//# sourceMappingURL=user.listener.js.map