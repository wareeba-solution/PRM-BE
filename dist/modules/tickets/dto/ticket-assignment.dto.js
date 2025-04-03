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
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
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
    static _OPENAPI_METADATA_FACTORY() {
        return { notifyAssignee: { required: false, type: () => Boolean, default: true }, notifyPreviousAssignee: { required: false, type: () => Boolean, default: true }, customMessage: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether to notify the assignee',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyAssignee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether to notify the previous assignee',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyPreviousAssignee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custom notification message',
        example: 'You have been assigned to handle this urgent support request.'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignmentNotification.prototype, "customMessage", void 0);
exports.AssignmentNotification = AssignmentNotification;
class TicketAssignmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { assigneeId: { required: true, type: () => String, format: "uuid" }, note: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user to assign the ticket to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional note about the assignment',
        example: 'Assigning to support team lead for escalated issue'
    }),
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
    static _OPENAPI_METADATA_FACTORY() {
        return { considerWorkload: { required: false, type: () => Boolean, default: true }, checkSkillMatch: { required: false, type: () => Boolean, default: true }, considerTimeZone: { required: false, type: () => Boolean, default: false }, requiredSkills: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to consider workload when assigning',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerWorkload", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to check for skill match',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "checkSkillMatch", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to consider time zones',
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerTimeZone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Required skills for the assignment',
        type: [String]
    }),
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
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, enum: require("./ticket-assignment.dto").AssignmentType }, assigneeId: { required: true, type: () => String, format: "uuid" }, notification: { required: false, type: () => require("./ticket-assignment.dto").AssignmentNotification }, rules: { required: false, type: () => require("./ticket-assignment.dto").AssignmentRules }, reason: { required: false, type: () => String }, notes: { required: false, type: () => [String] }, isTemporary: { required: false, type: () => Boolean, default: false }, temporaryUntil: { required: false, type: () => Date } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of assignment',
        enum: AssignmentType,
        example: AssignmentType.USER
    }),
    (0, class_validator_1.IsEnum)(AssignmentType),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the assignee (user, team, or department)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notification settings for the assignment'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentNotification),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentNotification)
], CreateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Assignment rules and preferences'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentRules),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentRules)
], CreateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reason for the assignment',
        example: 'Reassigned due to technical expertise required'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'Additional notes or comments about the assignment'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketAssignmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this is a temporary assignment',
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTicketAssignmentDto.prototype, "isTemporary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Date,
        description: 'If temporary, when the assignment should end'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateTicketAssignmentDto.prototype, "temporaryUntil", void 0);
exports.CreateTicketAssignmentDto = CreateTicketAssignmentDto;
class UpdateTicketAssignmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: false, enum: require("./ticket-assignment.dto").AssignmentType }, assigneeId: { required: false, type: () => String, format: "uuid" }, notification: { required: false, type: () => require("./ticket-assignment.dto").AssignmentNotification }, rules: { required: false, type: () => require("./ticket-assignment.dto").AssignmentRules }, reason: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: AssignmentType,
        description: 'Updated type of assignment'
    }),
    (0, class_validator_1.IsEnum)(AssignmentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated assignee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated notification settings'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentNotification),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentNotification)
], UpdateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated assignment rules'
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AssignmentRules),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AssignmentRules)
], UpdateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reason for updating the assignment',
        example: 'Adjusted assignment due to workload balancing'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "reason", void 0);
exports.UpdateTicketAssignmentDto = UpdateTicketAssignmentDto;
class BulkTicketAssignmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { ticketIds: { required: true, type: () => [String], format: "uuid", minItems: 1 }, assigneeId: { required: true, type: () => String, format: "uuid" }, note: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of ticket IDs to assign',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    ArrayMinSize(1) // Moved this after IsArray and IsUUID to fix decorator type issues
    ,
    __metadata("design:type", Array)
], BulkTicketAssignmentDto.prototype, "ticketIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user to assign the tickets to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional note about the bulk assignment',
        example: 'Assigning all pending tickets to the new support agent'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "note", void 0);
exports.BulkTicketAssignmentDto = BulkTicketAssignmentDto;
class AssignmentResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { success: { required: true, type: () => Boolean }, ticketId: { required: true, type: () => String }, assigneeId: { required: true, type: () => String }, type: { required: true, enum: require("./ticket-assignment.dto").AssignmentType }, error: { required: false, type: () => String }, timestamp: { required: true, type: () => Date }, details: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the assignment was successful'
    }),
    __metadata("design:type", Boolean)
], AssignmentResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ticket ID'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The assignee ID'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of assignment',
        enum: AssignmentType
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Error message if assignment failed'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp of the assignment'
    }),
    __metadata("design:type", Date)
], AssignmentResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional details about the assignment'
    }),
    __metadata("design:type", Object)
], AssignmentResponseDto.prototype, "details", void 0);
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