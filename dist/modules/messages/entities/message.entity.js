"use strict";
// src/modules/messages/entities/message.entity.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Message_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const create_message_dto_1 = require("../dto/create-message.dto");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const message_template_entity_1 = require("./message-template.entity");
const message_attachment_entity_1 = require("./message-attachment.entity");
let Message = Message_1 = class Message {
    // Virtual properties
    get isRead() {
        return !!this.readAt;
    }
    get isConfirmed() {
        return !!this.confirmedAt;
    }
    get isDelivered() {
        return !!this.deliveredAt;
    }
    get isScheduled() {
        return !!this.scheduledFor && this.scheduledFor > new Date();
    }
    get isFailed() {
        return this.status === create_message_dto_1.MessageStatus.FAILED;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: create_message_dto_1.MessageType }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_message_dto_1.MessagePriority,
        default: create_message_dto_1.MessagePriority.NORMAL,
    }),
    __metadata("design:type", String)
], Message.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_message_dto_1.MessageStatus,
        default: create_message_dto_1.MessageStatus.QUEUED,
    }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "emailOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "requireConfirmation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "confirmedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "readAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "deliveryDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "parentMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], Message.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", Promise)
], Message.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'recipientId' }),
    __metadata("design:type", Promise)
], Message.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => message_template_entity_1.MessageTemplate, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", Promise)
], Message.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_attachment_entity_1.MessageAttachment, attachment => attachment.message, { lazy: true }),
    __metadata("design:type", Promise)
], Message.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Message.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'confirmedById' }),
    __metadata("design:type", Promise)
], Message.prototype, "confirmedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Message_1, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentMessageId' }),
    __metadata("design:type", Promise)
], Message.prototype, "parentMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1, message => message.parentMessage, { lazy: true }),
    __metadata("design:type", Promise)
], Message.prototype, "replies", void 0);
Message = Message_1 = __decorate([
    (0, typeorm_1.Entity)('messages'),
    (0, typeorm_1.Index)(['organizationId', 'contactId']),
    (0, typeorm_1.Index)(['organizationId', 'type']),
    (0, typeorm_1.Index)(['organizationId', 'status'])
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map