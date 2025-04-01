var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType, NotificationPriority, NotificationChannel, } from '../dto/create-notification.dto';
import { NotificationStatus } from '../dto/update-notification.dto';
import { Organization } from '../../organizations/entities/organization.entity';
let Notification = class Notification {
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
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Notification.prototype, "retryCount", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "metadata", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column(),
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "senderId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'enum', enum: NotificationType }),
    ApiProperty(),
    Column({ length: 200 }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text' }),
    ApiProperty(),
    Column({
        type: 'enum',
        enum: NotificationPriority,
        default: NotificationPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Notification.prototype, "priority", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
    }),
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Notification.prototype, "actions", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledFor", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "expiresAt", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "requireConfirmation", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "data", void 0);
__decorate([
    ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
        },
        description: 'Notification delivery channels'
    }),
    Column({ type: 'enum', enum: NotificationChannel, array: true }),
    __metadata("design:type", Array)
], Notification.prototype, "channels", void 0);
__decorate([
    ApiProperty(),
    Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "category", void 0);
__decorate([
    ApiProperty(),
    Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "groupId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "referenceId", void 0);
__decorate([
    ApiProperty(),
    Column({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "referenceType", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "silent", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "read", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'timestamp', nullable: true }),
    ApiProperty(),
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "deliveredAt", void 0);
__decorate([
    ApiProperty({
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
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "deliveryDetails", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "recipientDetails", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "updatedById", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne(() => Organization, { lazy: true }),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "organization", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "user", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'senderId' }),
    __metadata("design:type", Promise)
], Notification.prototype, "sender", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Notification.prototype, "updatedBy", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isRead", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isExpired", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isScheduled", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "isDelivered", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Notification.prototype, "requiresAction", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], Notification.prototype, "failedChannels", null);
Notification = __decorate([
    Entity('notifications'),
    Index(['organizationId', 'userId']),
    Index(['organizationId', 'type']),
    Index(['organizationId', 'status']),
    Index(['organizationId', 'scheduledFor'])
], Notification);
export { Notification };
export { NotificationChannel };
//# sourceMappingURL=notification.entity.js.map