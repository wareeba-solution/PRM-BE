var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn, Index, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TicketType, TicketPriority, TicketStatus, TicketSource, } from '../dto/create-ticket.dto';
import { Department } from '../../departments/entities/department.entity';
let Ticket = class Ticket {
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
        if (!this.firstResponseAt)
            return null;
        return this.firstResponseAt.getTime() - this.createdAt.getTime();
    }
    get resolutionTime() {
        if (!this.resolvedAt)
            return null;
        return this.resolvedAt.getTime() - this.createdAt.getTime();
    }
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Ticket.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text' }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: TicketType,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    Column({
        type: 'enum',
        enum: TicketSource,
        default: TicketSource.WEB,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "source", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "contactId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "departmentId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "assigneeId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "category", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "subCategory", void 0);
__decorate([
    ApiProperty(),
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "tags", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "referenceNumber", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "relatedTicketId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Ticket.prototype, "customFields", void 0);
__decorate([
    ApiProperty(),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "isPrivate", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "internalNotes", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolution", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "resolvedAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "resolvedById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "closedById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "escalatedAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalatedById", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "escalationReason", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "reopenedAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenedById", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "reopenReason", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "firstResponseAt", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "lastActivityAt", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Ticket.prototype, "createdById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Ticket.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne('Organization'),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "organization", void 0);
__decorate([
    ManyToOne('Contact'),
    JoinColumn({ name: 'contactId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "contact", void 0);
__decorate([
    ManyToOne(() => Department, { lazy: true }),
    JoinColumn({ name: 'departmentId' }),
    __metadata("design:type", Promise)
], Ticket.prototype, "department", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'assigneeId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "assignee", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "createdBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "updatedBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'resolvedById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "resolvedBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'closedById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "closedBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'escalatedById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "escalatedBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'reopenedById' }),
    __metadata("design:type", Object)
], Ticket.prototype, "reopenedBy", void 0);
__decorate([
    ManyToOne('Ticket'),
    JoinColumn({ name: 'relatedTicketId' }),
    __metadata("design:type", Object)
], Ticket.prototype, "relatedTicket", void 0);
__decorate([
    OneToMany('TicketComment', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
__decorate([
    OneToMany('TicketAttachment', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "attachments", void 0);
__decorate([
    OneToMany('TicketActivity', 'ticket'),
    __metadata("design:type", Array)
], Ticket.prototype, "activities", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isEscalated", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isResolved", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isClosed", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "isReopened", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "hasFirstResponse", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "responseTime", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Ticket.prototype, "resolutionTime", null);
Ticket = __decorate([
    Entity('tickets'),
    Index(['organizationId', 'status']),
    Index(['organizationId', 'assigneeId']),
    Index(['organizationId', 'contactId']),
    Index(['organizationId', 'departmentId']),
    Index(['organizationId', 'createdAt'])
], Ticket);
export { Ticket };
//# sourceMappingURL=ticket.entity.js.map