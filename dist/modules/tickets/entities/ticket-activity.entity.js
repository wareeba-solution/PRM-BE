var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
let TicketActivity = class TicketActivity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TicketActivity.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], TicketActivity.prototype, "ticketId", void 0);
__decorate([
    ManyToOne(() => Ticket, ticket => ticket.activities, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'ticketId' }),
    __metadata("design:type", Ticket)
], TicketActivity.prototype, "ticket", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], TicketActivity.prototype, "performedById", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'performedById' }),
    __metadata("design:type", User)
], TicketActivity.prototype, "performedBy", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: TicketActivityType
    }),
    Index(),
    __metadata("design:type", String)
], TicketActivity.prototype, "type", void 0);
__decorate([
    Column('jsonb'),
    __metadata("design:type", Object)
], TicketActivity.prototype, "data", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    Index(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "timestamp", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "userAgent", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], TicketActivity.prototype, "changes", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], TicketActivity.prototype, "tags", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "parentActivityId", void 0);
__decorate([
    ManyToOne(() => TicketActivity, { nullable: true }),
    JoinColumn({ name: 'parentActivityId' }),
    __metadata("design:type", TicketActivity)
], TicketActivity.prototype, "parentActivity", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "context", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isSystem", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isAutomated", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "requiresAttention", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], TicketActivity.prototype, "expiresAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], TicketActivity.prototype, "relatedEntities", void 0);
__decorate([
    Column('int', { nullable: true }),
    __metadata("design:type", Number)
], TicketActivity.prototype, "duration", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    Index(),
    __metadata("design:type", String)
], TicketActivity.prototype, "status", void 0);
__decorate([
    Column('int', { default: 0 }),
    __metadata("design:type", Number)
], TicketActivity.prototype, "importance", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isHidden", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "customFields", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], TicketActivity.prototype, "processedAt", void 0);
__decorate([
    Column({ type: 'text', array: true, nullable: true }),
    Index(),
    __metadata("design:type", Array)
], TicketActivity.prototype, "categories", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "validationResults", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "metrics", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "securityContext", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "businessContext", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "audit", void 0);
TicketActivity = __decorate([
    Entity('ticket_activities'),
    Index(['ticketId', 'timestamp']),
    Index(['performedById', 'timestamp'])
], TicketActivity);
export { TicketActivity };
//# sourceMappingURL=ticket-activity.entity.js.map