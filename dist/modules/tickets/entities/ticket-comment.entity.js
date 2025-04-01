var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketAttachment } from './ticket-attachment.entity';
let TicketComment = class TicketComment {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], TicketComment.prototype, "content", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], TicketComment.prototype, "isInternal", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "ticketId", void 0);
__decorate([
    ManyToOne(() => Ticket, ticket => ticket.comments),
    JoinColumn({ name: 'ticketId' }),
    __metadata("design:type", Ticket)
], TicketComment.prototype, "ticket", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "authorId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'authorId' }),
    __metadata("design:type", User)
], TicketComment.prototype, "author", void 0);
__decorate([
    OneToMany(() => TicketAttachment, attachment => attachment.comment),
    __metadata("design:type", Array)
], TicketComment.prototype, "attachments", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "parentId", void 0);
__decorate([
    ManyToOne('TicketComment', { nullable: true }),
    JoinColumn({ name: 'parentId' }),
    __metadata("design:type", TicketComment)
], TicketComment.prototype, "parent", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketComment.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], TicketComment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], TicketComment.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], TicketComment.prototype, "editedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "editedBy", void 0);
TicketComment = __decorate([
    Entity('ticket_comments')
], TicketComment);
export { TicketComment };
//# sourceMappingURL=ticket-comment.entity.js.map