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
var TicketActivity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketActivity = void 0;
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
let TicketActivity = TicketActivity_1 = class TicketActivity {
    // Alias properties for backward compatibility
    get userId() {
        return this.performedById;
    }
    get action() {
        return this.type;
    }
    get details() {
        return this.data;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketActivity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "performedById", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ticket_activity_type_enum_1.TicketActivityType
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], TicketActivity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], TicketActivity.prototype, "changes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], TicketActivity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "parentActivityId", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isSystem", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isAutomated", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "requiresAttention", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TicketActivity.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], TicketActivity.prototype, "relatedEntities", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], TicketActivity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], TicketActivity.prototype, "importance", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], TicketActivity.prototype, "isHidden", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "customFields", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TicketActivity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TicketActivity.prototype, "processedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], TicketActivity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "validationResults", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "metrics", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "securityContext", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "businessContext", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], TicketActivity.prototype, "audit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, ticket => ticket.activities, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", Promise)
], TicketActivity.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'performedById' }),
    __metadata("design:type", Promise)
], TicketActivity.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TicketActivity_1, { nullable: true, lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentActivityId' }),
    __metadata("design:type", Promise)
], TicketActivity.prototype, "parentActivity", void 0);
TicketActivity = TicketActivity_1 = __decorate([
    (0, typeorm_1.Entity)('ticket_activities'),
    (0, typeorm_1.Index)(['ticketId', 'timestamp']),
    (0, typeorm_1.Index)(['performedById', 'timestamp'])
], TicketActivity);
exports.TicketActivity = TicketActivity;
//# sourceMappingURL=ticket-activity.entity.js.map