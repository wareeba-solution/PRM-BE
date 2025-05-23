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
var TicketComment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketComment = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
const ticket_attachment_entity_1 = require("./ticket-attachment.entity");
let TicketComment = TicketComment_1 = class TicketComment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TicketComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketComment.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, ticket => ticket.comments),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketComment.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketComment.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], TicketComment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TicketComment.prototype, "isInternal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_attachment_entity_1.TicketAttachment, attachment => attachment.comment, { lazy: true }),
    __metadata("design:type", Promise)
], TicketComment.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TicketComment_1, { nullable: true, lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", Promise)
], TicketComment.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketComment.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketComment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TicketComment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TicketComment.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TicketComment.prototype, "editedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "editedBy", void 0);
TicketComment = TicketComment_1 = __decorate([
    (0, typeorm_1.Entity)('ticket_comments')
], TicketComment);
exports.TicketComment = TicketComment;
//# sourceMappingURL=ticket-comment.entity.js.map