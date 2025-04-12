"use strict";
// src/modules/tickets/entities/ticket.entity.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Ticket_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const ticket_activity_entity_1 = require("./ticket-activity.entity");
const ticket_attachment_entity_1 = require("./ticket-attachment.entity");
const ticket_priority_entity_1 = require("./ticket-priority.entity");
const ticket_source_enum_1 = require("../enums/ticket-source.enum");
const ticket_category_enum_1 = require("../enums/ticket-category.enum");
const department_entity_1 = require("../../departments/entities/department.entity");
const ticket_comment_entity_1 = require("./ticket-comment.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const ticket_enums_1 = require("../enums/ticket.enums");
let Ticket = Ticket_1 = class Ticket {
    // Virtual properties
    get isEscalated() {
        return !!this.escalatedAt;
    }
    get isResolved() {
        return !!this.resolvedAt;
    }
    get isClosed() {
        return !!this.closedAt;
    }
    get isReopened() {
        return !!this.reopenedAt;
    }
    get hasFirstResponse() {
        return !!this.firstResponseAt;
    }
    get responseTime() {
        if (!this.firstResponseAt || !this.createdAt) {
            return null;
        }
        return this.firstResponseAt.getTime() - this.createdAt.getTime();
    }
    get resolutionTime() {
        if (!this.resolvedAt || !this.createdAt) {
            return null;
        }
        return this.resolvedAt.getTime() - this.createdAt.getTime();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ticket_enums_1.TicketType,
        default: ticket_enums_1.TicketType.GENERAL
    }),
    __metadata("design:type", String)
], Ticket.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ticket_enums_1.TicketStatus,
        default: ticket_enums_1.TicketStatus.OPEN
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticket_source_enum_1.TicketSource, default: ticket_source_enum_1.TicketSource.WEB }),
    __metadata("design:type", String)
], Ticket.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "assigneeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticket_category_enum_1.TicketCategory, nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Ticket.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "relatedTicketId", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Ticket.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "internalNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "resolvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "closedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "escalatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalatedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "reopenedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "firstResponseAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "lastActivityAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "priorityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_priority_entity_1.TicketPriority),
    (0, typeorm_1.JoinColumn)({ name: 'priorityId' }),
    __metadata("design:type", ticket_priority_entity_1.TicketPriority)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Ticket.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Ticket.prototype, "escalationLevel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contactId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.assignedTickets, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigneeId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdTickets, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'resolvedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "resolvedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'closedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "closedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'escalatedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "escalatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reopenedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "reopenedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Ticket_1, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'relatedTicketId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "relatedTicket", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_comment_entity_1.TicketComment, comment => comment.ticket, { lazy: true }),
    __metadata("design:type", Promise)
], Ticket.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_attachment_entity_1.TicketAttachment, attachment => attachment.ticket, { lazy: true }),
    __metadata("design:type", Promise)
], Ticket.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_activity_entity_1.TicketActivity, activity => activity.ticket, { lazy: true }),
    __metadata("design:type", Promise)
], Ticket.prototype, "activities", void 0);
Ticket = Ticket_1 = __decorate([
    (0, typeorm_1.Entity)('tickets'),
    (0, typeorm_1.Index)(['organizationId', 'status']),
    (0, typeorm_1.Index)(['organizationId', 'assigneeId']),
    (0, typeorm_1.Index)(['organizationId', 'contactId']),
    (0, typeorm_1.Index)(['organizationId', 'departmentId']),
    (0, typeorm_1.Index)(['organizationId', 'createdAt'])
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map