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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = exports.Notification = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/notifications/entities/notification.entity.ts
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const create_notification_dto_1 = require("../dto/create-notification.dto");
Object.defineProperty(exports, "NotificationChannel", { enumerable: true, get: function () { return create_notification_dto_1.NotificationChannel; } });
const update_notification_dto_1 = require("../dto/update-notification.dto");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
let Notification = class Notification {
    // Virtual properties
    get isRead() {
        return this.read;
    }
    get isExpired() {
        return this.expiresAt ? new Date() > this.expiresAt : false;
    }
    get isScheduled() {
        return this.scheduledFor ? new Date() < this.scheduledFor : false;
    }
    get isDelivered() {
        return !!this.deliveredAt;
    }
    get requiresAction() {
        return this.requireConfirmation && !this.read;
    }
    get failedChannels() {
        var _a;
        if (!((_a = this.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels))
            return [];
        return this.deliveryDetails.channels
            .filter(c => c.status === 'FAILED')
            .map(c => c.channel);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, retryCount: { required: true, type: () => Number }, type: { required: true, type: () => String }, content: { required: true, type: () => String }, metadata: { required: false, type: () => Object }, status: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, readAt: { required: false, type: () => Date }, organizationId: { required: true, type: () => String }, senderId: { required: true, type: () => String }, title: { required: true, type: () => String }, priority: { required: true, enum: require("../enums/notification-priority.enum").NotificationPriority }, actions: { required: false }, scheduledFor: { required: false, type: () => Date }, expiresAt: { required: false, type: () => Date }, requireConfirmation: { required: true, type: () => Boolean }, data: { required: false, type: () => Object }, channels: { required: true, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, category: { required: false, type: () => String }, groupId: { required: false, type: () => String }, referenceId: { required: false, type: () => String }, referenceType: { required: false, type: () => String }, silent: { required: true, type: () => Boolean }, read: { required: true, type: () => Boolean }, deliveredAt: { required: false, type: () => Date }, deliveryDetails: { required: false, type: () => ({ attempts: { required: true, type: () => Number }, lastAttempt: { required: true, type: () => Date }, channels: { required: true }, error: { required: false, type: () => String }, timeoutAt: { required: false, type: () => Date } }) }, recipientDetails: { required: false, type: () => ({ slackUserId: { required: true, type: () => Object }, email: { required: false, type: () => String }, phone: { required: false, type: () => String }, deviceTokens: { required: false, type: () => [String] }, webhookUrl: { required: false, type: () => String } }) }, updatedById: { required: false, type: () => String }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, user: { required: true, type: () => require("../../users/entities/user.entity").User }, sender: { required: true, type: () => require("../../users/entities/user.entity").User }, updatedBy: { required: false, type: () => require("../../users/entities/user.entity").User } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Notification.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'enum', enum: create_notification_dto_1.NotificationType }),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_notification_dto_1.NotificationPriority,
        default: create_notification_dto_1.NotificationPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Notification.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: update_notification_dto_1.NotificationStatus,
        default: update_notification_dto_1.NotificationStatus.PENDING,
    }),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Notification.prototype, "actions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "requireConfirmation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: {
            type: 'string',
            enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
        },
        description: 'Notification delivery channels'
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: create_notification_dto_1.NotificationChannel, array: true }),
    __metadata("design:type", Array)
], Notification.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "silent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "deliveredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        nullable: true,
        properties: {
            attempts: { type: 'number' },
            lastAttempt: { type: 'string', format: 'date-time' },
            channels: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        channel: { type: 'string', enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK'] },
                        status: { type: 'string', enum: ['SUCCESS', 'FAILED'] },
                        sentAt: { type: 'string', format: 'date-time' },
                        error: { type: 'string' }
                    }
                }
            },
            error: { type: 'string' },
            timeoutAt: { type: 'string', format: 'date-time' }
        }
    }),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "deliveryDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "recipientDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Notification.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isRead", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isExpired", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isScheduled", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isDelivered", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "requiresAction", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], Notification.prototype, "failedChannels", null);
Notification = __decorate([
    (0, typeorm_1.Entity)('notifications'),
    (0, typeorm_1.Index)(['organizationId', 'userId']),
    (0, typeorm_1.Index)(['organizationId', 'type']),
    (0, typeorm_1.Index)(['organizationId', 'status']),
    (0, typeorm_1.Index)(['organizationId', 'scheduledFor'])
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map