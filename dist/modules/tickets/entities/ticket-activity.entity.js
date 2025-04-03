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
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
let TicketActivity = TicketActivity_1 = class TicketActivity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, userId: { required: true, type: () => String }, action: { required: true, type: () => String }, details: { required: true, type: () => Object }, ticketId: { required: true, type: () => String }, ticket: { required: true, type: () => require("./ticket.entity").Ticket }, performedById: { required: true, type: () => String }, performedBy: { required: true, type: () => require("../../users/entities/user.entity").User }, type: { required: true, enum: require("../enums/ticket-activity-type.enum").TicketActivityType }, data: { required: true, type: () => Object }, metadata: { required: false, type: () => Object }, timestamp: { required: true, type: () => Date }, ipAddress: { required: false, type: () => String }, userAgent: { required: false, type: () => String }, changes: { required: false }, tags: { required: false, type: () => [String] }, parentActivityId: { required: false, type: () => String }, parentActivity: { required: false, type: () => require("./ticket-activity.entity").TicketActivity }, context: { required: false, type: () => ({ location: { required: false, type: () => String }, deviceInfo: { required: false, type: () => String }, sessionId: { required: false, type: () => String }, referrer: { required: false, type: () => String } }) }, isSystem: { required: true, type: () => Boolean }, isAutomated: { required: true, type: () => Boolean }, requiresAttention: { required: true, type: () => Boolean }, expiresAt: { required: false, type: () => Date }, relatedEntities: { required: false }, duration: { required: false, type: () => Number }, status: { required: false, type: () => String }, importance: { required: true, type: () => Number }, isHidden: { required: true, type: () => Boolean }, customFields: { required: false, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, processedAt: { required: false, type: () => Date }, categories: { required: false, type: () => [String] }, validationResults: { required: false, type: () => ({ isValid: { required: true, type: () => Boolean }, errors: { required: false, type: () => [String] }, warnings: { required: false, type: () => [String] } }) }, metrics: { required: false, type: () => ({ responseTime: { required: false, type: () => Number }, resourceUsage: { required: false, type: () => Object }, performance: { required: false, type: () => Object } }) }, securityContext: { required: false, type: () => ({ permissions: { required: false, type: () => [String] }, roles: { required: false, type: () => [String] }, accessLevel: { required: false, type: () => String }, authenticationType: { required: false, type: () => String } }) }, businessContext: { required: false, type: () => ({ department: { required: false, type: () => String }, costCenter: { required: false, type: () => String }, projectCode: { required: false, type: () => String }, priority: { required: false, type: () => String } }) }, audit: { required: false, type: () => ({ version: { required: true, type: () => Number }, changedBy: { required: true, type: () => String }, changedAt: { required: true, type: () => Date }, reason: { required: false, type: () => String } }) } };
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
    (0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, ticket => ticket.activities, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], TicketActivity.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], TicketActivity.prototype, "performedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'performedById' }),
    __metadata("design:type", user_entity_1.User)
], TicketActivity.prototype, "performedBy", void 0);
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
    __metadata("design:type", Array)
], TicketActivity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TicketActivity.prototype, "parentActivityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TicketActivity_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentActivityId' }),
    __metadata("design:type", TicketActivity)
], TicketActivity.prototype, "parentActivity", void 0);
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
TicketActivity = TicketActivity_1 = __decorate([
    (0, typeorm_1.Entity)('ticket_activities'),
    (0, typeorm_1.Index)(['ticketId', 'timestamp']),
    (0, typeorm_1.Index)(['performedById', 'timestamp'])
], TicketActivity);
exports.TicketActivity = TicketActivity;
//# sourceMappingURL=ticket-activity.entity.js.map