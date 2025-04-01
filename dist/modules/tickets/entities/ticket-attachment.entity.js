var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
let TicketAttachment = class TicketAttachment {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileName", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], TicketAttachment.prototype, "fileSize", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "mimeType", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "storageKey", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketAttachment.prototype, "description", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "ticketId", void 0);
__decorate([
    ManyToOne(() => Ticket, ticket => ticket.attachments),
    JoinColumn({ name: 'ticketId' }),
    __metadata("design:type", Ticket)
], TicketAttachment.prototype, "ticket", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], TicketAttachment.prototype, "commentId", void 0);
__decorate([
    ManyToOne('TicketComment', 'attachments', { nullable: true }),
    JoinColumn({ name: 'commentId' }),
    __metadata("design:type", Object)
], TicketAttachment.prototype, "comment", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "uploadedById", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'uploadedById' }),
    __metadata("design:type", User)
], TicketAttachment.prototype, "uploadedBy", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketAttachment.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], TicketAttachment.prototype, "createdAt", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], TicketAttachment.prototype, "isPrivate", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], TicketAttachment.prototype, "isActive", void 0);
TicketAttachment = __decorate([
    Entity('ticket_attachments')
], TicketAttachment);
export { TicketAttachment };
//# sourceMappingURL=ticket-attachment.entity.js.map