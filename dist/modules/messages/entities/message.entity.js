var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, Index, JoinColumn, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageType, MessagePriority, MessageStatus } from '../dto/create-message.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { MessageTemplate } from './message-template.entity';
import { MessageAttachment } from './message-attachment.entity';
let Message = class Message {
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
        return this.status === MessageStatus.FAILED;
    }
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Message.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'enum', enum: MessageType }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Message.prototype, "contactId", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Message.prototype, "senderId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: MessagePriority,
        default: MessagePriority.NORMAL,
    }),
    __metadata("design:type", String)
], Message.prototype, "priority", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.QUEUED,
    }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "emailOptions", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "templateId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "scheduledFor", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "requireConfirmation", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "confirmedAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "confirmedById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "deliveredAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "readAt", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "notes", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "externalId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "deliveryDetails", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "metadata", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "parentMessageId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne(() => Organization, { lazy: true }),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], Message.prototype, "organization", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'senderId' }),
    __metadata("design:type", Promise)
], Message.prototype, "sender", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Message.prototype, "updatedBy", void 0);
__decorate([
    ManyToOne('User', { lazy: true }),
    JoinColumn({ name: 'confirmedById' }),
    __metadata("design:type", Promise)
], Message.prototype, "confirmedBy", void 0);
__decorate([
    ManyToOne('Contact', { lazy: true }),
    JoinColumn({ name: 'contactId' }),
    __metadata("design:type", Promise)
], Message.prototype, "contact", void 0);
__decorate([
    ManyToOne(() => MessageTemplate, { lazy: true }),
    JoinColumn({ name: 'templateId' }),
    __metadata("design:type", Promise)
], Message.prototype, "template", void 0);
__decorate([
    ManyToOne(() => Message, { lazy: true }),
    JoinColumn({ name: 'parentMessageId' }),
    __metadata("design:type", Promise)
], Message.prototype, "parentMessage", void 0);
__decorate([
    OneToMany(() => Message, message => message.parentMessage, { lazy: true }),
    __metadata("design:type", Promise)
], Message.prototype, "replies", void 0);
__decorate([
    OneToMany(() => MessageAttachment, attachment => attachment.message, { lazy: true }),
    __metadata("design:type", Promise)
], Message.prototype, "attachments", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Message.prototype, "isRead", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Message.prototype, "isConfirmed", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Message.prototype, "isDelivered", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Message.prototype, "isScheduled", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Message.prototype, "isFailed", null);
Message = __decorate([
    Entity('messages'),
    Index(['organizationId', 'contactId']),
    Index(['organizationId', 'type']),
    Index(['organizationId', 'status'])
], Message);
export { Message };
//# sourceMappingURL=message.entity.js.map