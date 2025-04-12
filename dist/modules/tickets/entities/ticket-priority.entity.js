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
exports.TicketPriority = exports.PriorityLevel = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../../modules/organizations/entities/organization.entity");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
var PriorityLevel;
(function (PriorityLevel) {
    PriorityLevel["LOW"] = "LOW";
    PriorityLevel["MEDIUM"] = "MEDIUM";
    PriorityLevel["HIGH"] = "HIGH";
    PriorityLevel["URGENT"] = "URGENT";
})(PriorityLevel = exports.PriorityLevel || (exports.PriorityLevel = {}));
let TicketPriority = class TicketPriority {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketPriority.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketPriority.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PriorityLevel,
        default: PriorityLevel.MEDIUM
    }),
    __metadata("design:type", String)
], TicketPriority.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketPriority.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 24 }),
    __metadata("design:type", Number)
], TicketPriority.prototype, "responseTimeHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 48 }),
    __metadata("design:type", Number)
], TicketPriority.prototype, "resolutionTimeHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TicketPriority.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketPriority.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], TicketPriority.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketPriority.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], TicketPriority.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TicketPriority.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TicketPriority.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TicketPriority.prototype, "deletedAt", void 0);
TicketPriority = __decorate([
    (0, typeorm_1.Entity)('ticket_priorities')
], TicketPriority);
exports.TicketPriority = TicketPriority;
//# sourceMappingURL=ticket-priority.entity.js.map