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
exports.CreateRoutingRuleDto = void 0;
const class_validator_1 = require("class-validator");
const routing_rule_entity_1 = require("../entities/routing-rule.entity");
class CreateRoutingRuleDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRoutingRuleDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(routing_rule_entity_1.RoutingType),
    __metadata("design:type", String)
], CreateRoutingRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(routing_rule_entity_1.RoutingCondition),
    __metadata("design:type", String)
], CreateRoutingRuleDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateRoutingRuleDto.prototype, "conditionValue", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(routing_rule_entity_1.RoutingAction),
    __metadata("design:type", String)
], CreateRoutingRuleDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateRoutingRuleDto.prototype, "actionValue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRoutingRuleDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoutingRuleDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoutingRuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoutingRuleDto.prototype, "isDefault", void 0);
exports.CreateRoutingRuleDto = CreateRoutingRuleDto;
//# sourceMappingURL=create-routing-rule.dto.js.map