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
exports.TicketAttachment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let TicketAttachment = class TicketAttachment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, fileName: { required: true, type: () => String }, fileSize: { required: true, type: () => Number }, mimeType: { required: true, type: () => String }, storageKey: { required: true, type: () => String }, description: { required: true, type: () => String }, ticketId: { required: true, type: () => String }, ticket: { required: true, type: () => require("./ticket.entity").Ticket }, commentId: { required: true, type: () => String }, comment: { required: true, type: () => Object }, uploadedById: { required: true, type: () => String }, uploadedBy: { required: true, type: () => require("../../users/entities/user.entity").User }, metadata: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, isPrivate: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TicketAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "storageKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketAttachment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, ticket => ticket.attachments),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketAttachment.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], TicketAttachment.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('TicketComment', 'attachments', { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'commentId' }),
    __metadata("design:type", Object)
], TicketAttachment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TicketAttachment.prototype, "uploadedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'uploadedById' }),
    __metadata("design:type", user_entity_1.User)
], TicketAttachment.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketAttachment.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketAttachment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TicketAttachment.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TicketAttachment.prototype, "isActive", void 0);
TicketAttachment = __decorate([
    (0, typeorm_1.Entity)('ticket_attachments')
], TicketAttachment);
exports.TicketAttachment = TicketAttachment;
//# sourceMappingURL=ticket-attachment.entity.js.map