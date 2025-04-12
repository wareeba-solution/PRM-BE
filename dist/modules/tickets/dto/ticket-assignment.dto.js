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
exports.AssignmentResponseDto = exports.BulkTicketAssignmentDto = exports.UpdateTicketAssignmentDto = exports.CreateTicketAssignmentDto = exports.AssignmentRules = exports.TicketAssignmentDto = exports.AssignmentNotification = exports.AssignmentType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_2 = require("class-validator");
var AssignmentType;
(function (AssignmentType) {
    AssignmentType["USER"] = "user";
    AssignmentType["TEAM"] = "team";
    AssignmentType["DEPARTMENT"] = "department";
    AssignmentType["AUTO"] = "auto";
    AssignmentType["ROUND_ROBIN"] = "round_robin";
})(AssignmentType = exports.AssignmentType || (exports.AssignmentType = {}));
class AssignmentNotification {
    constructor() {
        this.notifyAssignee = true;
        this.notifyPreviousAssignee = true;
    }
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyAssignee", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyPreviousAssignee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignmentNotification.prototype, "customMessage", void 0);
exports.AssignmentNotification = AssignmentNotification;
class TicketAssignmentDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketAssignmentDto.prototype, "note", void 0);
exports.TicketAssignmentDto = TicketAssignmentDto;
class AssignmentRules {
    constructor() {
        this.considerWorkload = true;
        this.checkSkillMatch = true;
        this.considerTimeZone = false;
    }
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerWorkload", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "checkSkillMatch", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerTimeZone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AssignmentRules.prototype, "requiredSkills", void 0);
exports.AssignmentRules = AssignmentRules;
class CreateTicketAssignmentDto {
    constructor() {
        this.isTemporary = false;
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(AssignmentType),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentNotification),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentNotification)
], CreateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentRules),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentRules)
], CreateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketAssignmentDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTicketAssignmentDto.prototype, "isTemporary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateTicketAssignmentDto.prototype, "temporaryUntil", void 0);
exports.CreateTicketAssignmentDto = CreateTicketAssignmentDto;
class UpdateTicketAssignmentDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(AssignmentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentNotification),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentNotification)
], UpdateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentRules),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentRules)
], UpdateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "reason", void 0);
exports.UpdateTicketAssignmentDto = UpdateTicketAssignmentDto;
class BulkTicketAssignmentDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    ArrayMinSize(1) // Moved this after IsArray and IsUUID to fix decorator type issues
    ,
    __metadata("design:type", Array)
], BulkTicketAssignmentDto.prototype, "ticketIds", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "note", void 0);
exports.BulkTicketAssignmentDto = BulkTicketAssignmentDto;
class AssignmentResponseDto {
}
exports.AssignmentResponseDto = AssignmentResponseDto;
function ArrayMinSize(min, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_2.registerDecorator)({
            name: 'arrayMinSize',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [min],
            validator: {
                validate(value, args) {
                    const [minSize] = args.constraints;
                    return Array.isArray(value) && value.length >= minSize;
                },
                defaultMessage(args) {
                    const [minSize] = args.constraints;
                    return `Array must contain at least ${minSize} elements`;
                }
            }
        });
    };
}
//# sourceMappingURL=ticket-assignment.dto.js.map