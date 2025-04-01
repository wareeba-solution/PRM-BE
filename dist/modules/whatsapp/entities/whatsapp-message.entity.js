var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
export var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "TEXT";
    MessageType["IMAGE"] = "IMAGE";
    MessageType["VIDEO"] = "VIDEO";
    MessageType["DOCUMENT"] = "DOCUMENT";
    MessageType["AUDIO"] = "AUDIO";
    MessageType["LOCATION"] = "LOCATION";
    MessageType["CONTACT"] = "CONTACT";
    MessageType["TEMPLATE"] = "TEMPLATE";
    MessageType["INTERACTIVE"] = "INTERACTIVE";
})(MessageType || (MessageType = {}));
export var MessageStatus;
(function (MessageStatus) {
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["READ"] = "READ";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["UNKNOWN"] = "UNKNOWN";
})(MessageStatus || (MessageStatus = {}));
export var MessageDirection;
(function (MessageDirection) {
    MessageDirection["INBOUND"] = "INBOUND";
    MessageDirection["OUTBOUND"] = "OUTBOUND";
})(MessageDirection || (MessageDirection = {}));
let WhatsAppMessage = class WhatsAppMessage {
    canRetry() {
        return (this.status === MessageStatus.FAILED &&
            this.retryCount < 3 &&
            !this.isExpired());
    }
    isExpired() {
        if (this.isScheduled && this.scheduledFor) {
            return this.scheduledFor < new Date();
        }
        if (this.requiresUserReply && this.replyDeadline) {
            return this.replyDeadline < new Date();
        }
        return false;
    }
    shouldSendNow() {
        if (!this.isScheduled) {
            return true;
        }
        if (!this.scheduledFor) {
            return true;
        }
        return this.scheduledFor <= new Date();
    }
    updateStatus(status) {
        this.status = status;
        switch (status) {
            case MessageStatus.SENT:
                this.sentAt = new Date();
                break;
            case MessageStatus.DELIVERED:
                this.deliveredAt = new Date();
                break;
            case MessageStatus.READ:
                this.readAt = new Date();
                break;
            case MessageStatus.FAILED:
                this.failedAt = new Date();
                break;
        }
    }
    retry() {
        if (!this.canRetry()) {
            throw new Error('Message cannot be retried');
        }
        this.retryCount += 1;
        this.lastRetryAt = new Date();
        this.status = MessageStatus.QUEUED;
        this.errorCode = null;
        this.errorMessage = null;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "id", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "content", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], WhatsAppMessage.prototype, "organization", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], WhatsAppMessage.prototype, "user", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "recipientPhone", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "recipientName", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: MessageDirection,
        default: MessageDirection.OUTBOUND
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "direction", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: MessageType,
        default: MessageType.TEXT
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "type", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "metadata", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "templateName", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "templateData", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.QUEUED
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "whatsappMessageId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "errorCode", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "errorMessage", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], WhatsAppMessage.prototype, "retryCount", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "lastRetryAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "sentAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "queuedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "deliveredAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "readAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], WhatsAppMessage.prototype, "attachments", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "locationData", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], WhatsAppMessage.prototype, "contactData", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "interactiveData", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isScheduled", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "scheduledFor", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isTemplate", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "requiresUserReply", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], WhatsAppMessage.prototype, "replyTimeoutHours", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "replyDeadline", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isAutomatedReply", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "automationTriggerId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "updatedAt", void 0);
WhatsAppMessage = __decorate([
    Entity('whatsapp_messages'),
    Index(['organizationId', 'createdAt']),
    Index(['recipientPhone', 'createdAt'])
], WhatsAppMessage);
export { WhatsAppMessage };
//# sourceMappingURL=whatsapp-message.entity.js.map