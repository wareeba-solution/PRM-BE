var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsUUID, IsOptional, IsString, IsBoolean, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { registerDecorator } from 'class-validator';
export var AssignmentType;
(function (AssignmentType) {
    AssignmentType["USER"] = "user";
    AssignmentType["TEAM"] = "team";
    AssignmentType["DEPARTMENT"] = "department";
    AssignmentType["AUTO"] = "auto";
    AssignmentType["ROUND_ROBIN"] = "round_robin";
})(AssignmentType || (AssignmentType = {}));
export class AssignmentNotification {
    constructor() {
        this.notifyAssignee = true;
        this.notifyPreviousAssignee = true;
    }
}
__decorate([
    ApiProperty({
        description: 'Whether to notify the assignee',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyAssignee", void 0);
__decorate([
    ApiProperty({
        description: 'Whether to notify the previous assignee',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], AssignmentNotification.prototype, "notifyPreviousAssignee", void 0);
__decorate([
    ApiProperty({
        description: 'Custom notification message',
        example: 'You have been assigned to handle this urgent support request.'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], AssignmentNotification.prototype, "customMessage", void 0);
export class TicketAssignmentDto {
}
__decorate([
    ApiProperty({
        description: 'The ID of the user to assign the ticket to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsUUID(),
    __metadata("design:type", String)
], TicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Optional note about the assignment',
        example: 'Assigning to support team lead for escalated issue'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], TicketAssignmentDto.prototype, "note", void 0);
export class AssignmentRules {
    constructor() {
        this.considerWorkload = true;
        this.checkSkillMatch = true;
        this.considerTimeZone = false;
    }
}
__decorate([
    ApiPropertyOptional({
        description: 'Whether to consider workload when assigning',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerWorkload", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether to check for skill match',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "checkSkillMatch", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether to consider time zones',
        default: false
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], AssignmentRules.prototype, "considerTimeZone", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Required skills for the assignment',
        type: [String]
    }),
    IsArray(),
    IsString({ each: true }),
    IsOptional(),
    __metadata("design:type", Array)
], AssignmentRules.prototype, "requiredSkills", void 0);
export class CreateTicketAssignmentDto {
    constructor() {
        this.isTemporary = false;
    }
}
__decorate([
    ApiProperty({
        description: 'Type of assignment',
        enum: AssignmentType,
        example: AssignmentType.USER
    }),
    IsEnum(AssignmentType),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    ApiProperty({
        description: 'ID of the assignee (user, team, or department)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsUUID('4'),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Notification settings for the assignment'
    }),
    ValidateNested(),
    Type(() => AssignmentNotification),
    IsOptional(),
    __metadata("design:type", AssignmentNotification)
], CreateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Assignment rules and preferences'
    }),
    ValidateNested(),
    Type(() => AssignmentRules),
    IsOptional(),
    __metadata("design:type", AssignmentRules)
], CreateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Reason for the assignment',
        example: 'Reassigned due to technical expertise required'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTicketAssignmentDto.prototype, "reason", void 0);
__decorate([
    ApiPropertyOptional({
        type: [String],
        description: 'Additional notes or comments about the assignment'
    }),
    IsArray(),
    IsString({ each: true }),
    IsOptional(),
    __metadata("design:type", Array)
], CreateTicketAssignmentDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether this is a temporary assignment',
        default: false
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateTicketAssignmentDto.prototype, "isTemporary", void 0);
__decorate([
    ApiPropertyOptional({
        type: Date,
        description: 'If temporary, when the assignment should end'
    }),
    IsOptional(),
    Type(() => Date),
    __metadata("design:type", Date)
], CreateTicketAssignmentDto.prototype, "temporaryUntil", void 0);
export class UpdateTicketAssignmentDto {
}
__decorate([
    ApiPropertyOptional({
        enum: AssignmentType,
        description: 'Updated type of assignment'
    }),
    IsEnum(AssignmentType),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Updated assignee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsUUID('4'),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Updated notification settings'
    }),
    ValidateNested(),
    Type(() => AssignmentNotification),
    IsOptional(),
    __metadata("design:type", AssignmentNotification)
], UpdateTicketAssignmentDto.prototype, "notification", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Updated assignment rules'
    }),
    ValidateNested(),
    Type(() => AssignmentRules),
    IsOptional(),
    __metadata("design:type", AssignmentRules)
], UpdateTicketAssignmentDto.prototype, "rules", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Reason for updating the assignment',
        example: 'Adjusted assignment due to workload balancing'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTicketAssignmentDto.prototype, "reason", void 0);
export class BulkTicketAssignmentDto {
}
__decorate([
    ApiProperty({
        description: 'Array of ticket IDs to assign',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String]
    }),
    IsArray(),
    IsUUID('4', { each: true }),
    ArrayMinSize(1),
    __metadata("design:type", Array)
], BulkTicketAssignmentDto.prototype, "ticketIds", void 0);
__decorate([
    ApiProperty({
        description: 'The ID of the user to assign the tickets to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsUUID(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "assigneeId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Optional note about the bulk assignment',
        example: 'Assigning all pending tickets to the new support agent'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], BulkTicketAssignmentDto.prototype, "note", void 0);
export class AssignmentResponseDto {
}
__decorate([
    ApiProperty({
        description: 'Whether the assignment was successful'
    }),
    __metadata("design:type", Boolean)
], AssignmentResponseDto.prototype, "success", void 0);
__decorate([
    ApiProperty({
        description: 'The ticket ID'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "ticketId", void 0);
__decorate([
    ApiProperty({
        description: 'The assignee ID'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "assigneeId", void 0);
__decorate([
    ApiProperty({
        description: 'Type of assignment',
        enum: AssignmentType
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Error message if assignment failed'
    }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "error", void 0);
__decorate([
    ApiProperty({
        description: 'Timestamp of the assignment'
    }),
    __metadata("design:type", Date)
], AssignmentResponseDto.prototype, "timestamp", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional details about the assignment'
    }),
    __metadata("design:type", Object)
], AssignmentResponseDto.prototype, "details", void 0);
function ArrayMinSize(min, validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
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