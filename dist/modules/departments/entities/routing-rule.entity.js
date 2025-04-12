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
exports.RoutingRule = exports.RoutingAction = exports.RoutingCondition = exports.RoutingType = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./department.entity");
var RoutingType;
(function (RoutingType) {
    RoutingType["TICKET"] = "TICKET";
    RoutingType["MESSAGE"] = "MESSAGE";
    RoutingType["APPOINTMENT"] = "APPOINTMENT";
})(RoutingType = exports.RoutingType || (exports.RoutingType = {}));
var RoutingCondition;
(function (RoutingCondition) {
    RoutingCondition["KEYWORD"] = "KEYWORD";
    RoutingCondition["PRIORITY"] = "PRIORITY";
    RoutingCondition["PATIENT_TYPE"] = "PATIENT_TYPE";
    RoutingCondition["TIME_OF_DAY"] = "TIME_OF_DAY";
    RoutingCondition["DAY_OF_WEEK"] = "DAY_OF_WEEK";
    RoutingCondition["CUSTOM"] = "CUSTOM";
})(RoutingCondition = exports.RoutingCondition || (exports.RoutingCondition = {}));
var RoutingAction;
(function (RoutingAction) {
    RoutingAction["ASSIGN_TO_DEPARTMENT"] = "ASSIGN_TO_DEPARTMENT";
    RoutingAction["ASSIGN_TO_USER"] = "ASSIGN_TO_USER";
    RoutingAction["ESCALATE"] = "ESCALATE";
    RoutingAction["NOTIFY"] = "NOTIFY";
    RoutingAction["AUTO_REPLY"] = "AUTO_REPLY";
})(RoutingAction = exports.RoutingAction || (exports.RoutingAction = {}));
let RoutingRule = class RoutingRule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoutingRule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoutingRule.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoutingRule.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", department_entity_1.Department)
], RoutingRule.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoutingType,
    }),
    __metadata("design:type", String)
], RoutingRule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoutingCondition,
    }),
    __metadata("design:type", String)
], RoutingRule.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], RoutingRule.prototype, "conditionValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RoutingAction,
    }),
    __metadata("design:type", String)
], RoutingRule.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], RoutingRule.prototype, "actionValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RoutingRule.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RoutingRule.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoutingRule.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RoutingRule.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoutingRule.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RoutingRule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RoutingRule.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RoutingRule.prototype, "deletedAt", void 0);
RoutingRule = __decorate([
    (0, typeorm_1.Entity)('routing_rules')
], RoutingRule);
exports.RoutingRule = RoutingRule;
//# sourceMappingURL=routing-rule.entity.js.map