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
exports.Ticket = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/tickets/entities/ticket.entity.ts
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const create_ticket_dto_1 = require("../dto/create-ticket.dto");
// Remove direct entity imports that cause circular dependencies
// import { Organization } from '../../organizations/entities/organization.entity';
// import { User } from '../../users/entities/user.entity';
// import { Contact } from '../../contacts/entities/contact.entity';
const department_entity_1 = require("../../departments/entities/department.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Ticket = class Ticket {
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
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, enum: require("../dto/create-ticket.dto").TicketType }, priority: { required: true, enum: require("../dto/create-ticket.dto").TicketPriority }, status: { required: true, enum: require("../dto/create-ticket.dto").TicketStatus }, source: { required: true, enum: require("../dto/create-ticket.dto").TicketSource }, contactId: { required: false, type: () => String }, departmentId: { required: false, type: () => String }, assigneeId: { required: false, type: () => String }, category: { required: false, type: () => String }, subCategory: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, referenceNumber: { required: false, type: () => String }, relatedTicketId: { required: false, type: () => String }, isPrivate: { required: true, type: () => Boolean }, internalNotes: { required: false, type: () => String }, resolution: { required: false, type: () => String }, resolvedAt: { required: false, type: () => Date }, resolvedById: { required: false, type: () => String }, closedAt: { required: false, type: () => Date }, closedById: { required: false, type: () => String }, escalatedAt: { required: false, type: () => Date }, escalatedById: { required: false, type: () => String }, escalationReason: { required: false, type: () => String }, reopenedAt: { required: false, type: () => Date }, reopenedById: { required: false, type: () => String }, reopenReason: { required: false, type: () => String }, firstResponseAt: { required: false, type: () => Date }, lastActivityAt: { required: false, type: () => Date }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => Object }, contact: { required: false, type: () => Object }, department: { required: false, type: () => require("../../departments/entities/department.entity").Department }, assignee: { required: false, type: () => Object }, createdBy: { required: true, type: () => Object }, updatedBy: { required: false, type: () => Object }, resolvedBy: { required: false, type: () => Object }, closedBy: { required: false, type: () => Object }, escalatedBy: { required: false, type: () => Object }, reopenedBy: { required: false, type: () => Object }, relatedTicket: { required: false, type: () => Object }, comments: { required: true, type: () => [Object] }, attachments: { required: true, type: () => [Object] }, activities: { required: true, type: () => [Object] } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_ticket_dto_1.TicketType,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_ticket_dto_1.TicketPriority,
        default: create_ticket_dto_1.TicketPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_ticket_dto_1.TicketStatus,
        default: create_ticket_dto_1.TicketStatus.OPEN,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: create_ticket_dto_1.TicketSource,
        default: create_ticket_dto_1.TicketSource.WEB,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "referenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "relatedTicketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Ticket.prototype, "customFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "isPrivate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "internalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolvedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "closedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "escalatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalatedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalationReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "reopenedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "firstResponseAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "lastActivityAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "updatedById", void 0);
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
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)('Organization'),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)('Contact'),
    (0, typeorm_1.JoinColumn)({ name: 'contactId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigneeId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "assignee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'resolvedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "resolvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'closedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "closedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'escalatedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "escalatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reopenedById' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "reopenedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            title: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)('Ticket'),
    (0, typeorm_1.JoinColumn)({ name: 'relatedTicketId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "relatedTicket", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('TicketComment', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('TicketAttachment', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('TicketActivity', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "activities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isEscalated", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isResolved", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isClosed", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isReopened", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "hasFirstResponse", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "responseTime", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "resolutionTime", null);
Ticket = __decorate([
    (0, typeorm_1.Entity)('tickets'),
    (0, typeorm_1.Index)(['organizationId', 'status']),
    (0, typeorm_1.Index)(['organizationId', 'assigneeId']),
    (0, typeorm_1.Index)(['organizationId', 'contactId']),
    (0, typeorm_1.Index)(['organizationId', 'departmentId']),
    (0, typeorm_1.Index)(['organizationId', 'createdAt'])
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map