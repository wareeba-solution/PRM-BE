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
exports.TicketComment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_attachment_entity_1 = require("./ticket-attachment.entity");
let TicketComment = class TicketComment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, userId: { required: true, type: () => String }, content: { required: true, type: () => String }, isInternal: { required: true, type: () => Boolean }, ticketId: { required: true, type: () => String }, ticket: { required: true, type: () => require("./ticket.entity").Ticket }, authorId: { required: true, type: () => String }, author: { required: true, type: () => require("../../users/entities/user.entity").User }, attachments: { required: true, type: () => [require("./ticket-attachment.entity").TicketAttachment] }, parentId: { required: true, type: () => String }, parent: { required: true, type: () => require("./ticket-comment.entity").TicketComment }, metadata: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, editedAt: { required: true, type: () => Date }, editedBy: { required: true, type: () => String } };
    }
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
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TicketComment.prototype, "isInternal", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, ticket => ticket.comments),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketComment.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TicketComment.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", user_entity_1.User)
], TicketComment.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_attachment_entity_1.TicketAttachment, attachment => attachment.comment),
    __metadata("design:type", Array)
], TicketComment.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('TicketComment', { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", TicketComment)
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
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TicketComment.prototype, "editedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketComment.prototype, "editedBy", void 0);
TicketComment = __decorate([
    (0, typeorm_1.Entity)('ticket_comments')
], TicketComment);
exports.TicketComment = TicketComment;
//# sourceMappingURL=ticket-comment.entity.js.map