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
exports.WhatsAppMessage = exports.MessageDirection = exports.MessageStatus = exports.MessageType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
var MessageType;
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
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["READ"] = "READ";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["UNKNOWN"] = "UNKNOWN";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["INBOUND"] = "INBOUND";
    MessageDirection["OUTBOUND"] = "OUTBOUND";
})(MessageDirection = exports.MessageDirection || (exports.MessageDirection = {}));
let WhatsAppMessage = class WhatsAppMessage {
    /**
     * Check if message can be retried
     */
    canRetry() {
        return (this.status === MessageStatus.FAILED &&
            this.retryCount < 3 &&
            !this.isExpired());
    }
    /**
     * Check if message is expired
     */
    isExpired() {
        if (this.isScheduled && this.scheduledFor) {
            return this.scheduledFor < new Date();
        }
        if (this.requiresUserReply && this.replyDeadline) {
            return this.replyDeadline < new Date();
        }
        return false;
    }
    /**
     * Check if message needs to be sent now
     */
    shouldSendNow() {
        if (!this.isScheduled) {
            return true;
        }
        if (!this.scheduledFor) {
            return true;
        }
        return this.scheduledFor <= new Date();
    }
    /**
     * Update message status
     */
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
    /**
     * Handle retry attempt
     */
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
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, from: { required: true, type: () => String }, to: { required: true, type: () => String }, messageType: { required: true, type: () => String }, content: { required: true, type: () => String }, receivedAt: { required: false, type: () => Date }, lastError: { required: false, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, userId: { required: true, type: () => String }, user: { required: true, type: () => require("../../users/entities/user.entity").User }, recipientPhone: { required: true, type: () => String }, recipientName: { required: true, type: () => String }, direction: { required: true, enum: require("./whatsapp-message.entity").MessageDirection }, type: { required: true, enum: require("./whatsapp-message.entity").MessageType }, metadata: { required: false, type: () => Object }, templateName: { required: true, type: () => String }, templateData: { required: true, type: () => Object }, status: { required: true, enum: require("./whatsapp-message.entity").MessageStatus }, whatsappMessageId: { required: true, type: () => String }, errorCode: { required: true, type: () => String, nullable: true }, errorMessage: { required: true, type: () => String, nullable: true }, retryCount: { required: true, type: () => Number }, lastRetryAt: { required: true, type: () => Date }, sentAt: { required: false, type: () => Date }, queuedAt: { required: true, type: () => Date }, deliveredAt: { required: true, type: () => Date, nullable: true }, readAt: { required: true, type: () => Date, nullable: true }, failedAt: { required: true, type: () => Date }, attachments: { required: true }, locationData: { required: true, type: () => ({ latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, name: { required: false, type: () => String }, address: { required: false, type: () => String } }) }, contactData: { required: true }, interactiveData: { required: true, type: () => ({ type: { required: true, type: () => String }, title: { required: true, type: () => String }, body: { required: true, type: () => String }, buttons: { required: false, type: () => [Object] }, selectedOption: { required: false, type: () => String } }) }, isScheduled: { required: true, type: () => Boolean }, scheduledFor: { required: true, type: () => Date }, isTemplate: { required: true, type: () => Boolean }, requiresUserReply: { required: true, type: () => Boolean }, replyTimeoutHours: { required: true, type: () => Number }, replyDeadline: { required: true, type: () => Date }, isAutomatedReply: { required: true, type: () => Boolean }, automationTriggerId: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], WhatsAppMessage.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], WhatsAppMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "recipientPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "recipientName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageDirection,
        default: MessageDirection.OUTBOUND
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageType,
        default: MessageType.TEXT
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "templateName", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "templateData", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.QUEUED
    }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "whatsappMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "errorCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], WhatsAppMessage.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "lastRetryAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "queuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "readAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], WhatsAppMessage.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "locationData", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], WhatsAppMessage.prototype, "contactData", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], WhatsAppMessage.prototype, "interactiveData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isScheduled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "requiresUserReply", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WhatsAppMessage.prototype, "replyTimeoutHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "replyDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WhatsAppMessage.prototype, "isAutomatedReply", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsAppMessage.prototype, "automationTriggerId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsAppMessage.prototype, "updatedAt", void 0);
WhatsAppMessage = __decorate([
    (0, typeorm_1.Entity)('whatsapp_messages'),
    (0, typeorm_1.Index)(['organizationId', 'createdAt']),
    (0, typeorm_1.Index)(['recipientPhone', 'createdAt'])
], WhatsAppMessage);
exports.WhatsAppMessage = WhatsAppMessage;
//# sourceMappingURL=whatsapp-message.entity.js.map