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
exports.TicketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Ticket DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class TicketDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this ticket belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ticket title',
        example: 'Cannot access patient records'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the ticket',
        example: 'I am unable to access patient records for the last 24 hours. The system shows an error message when I try to view any patient data.'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of ticket',
        enum: ['GENERAL', 'TECHNICAL', 'BILLING', 'MEDICAL', 'APPOINTMENT', 'ACCESS', 'COMPLAINT', 'FEEDBACK'],
        example: 'TECHNICAL',
        enumName: 'TicketType'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Priority level of the ticket',
        enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
        example: 'HIGH',
        default: 'NORMAL',
        enumName: 'TicketPriority'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the ticket',
        enum: ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED', 'ESCALATED', 'REOPENED', 'DELETED'],
        example: 'OPEN',
        enumName: 'TicketStatus'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Source of the ticket',
        enum: ['WEB', 'MOBILE', 'EMAIL', 'PHONE', 'CHAT', 'SYSTEM'],
        example: 'EMAIL',
        default: 'WEB',
        enumName: 'TicketSource'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the contact associated with this ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the department assigned to this ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user assigned to this ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the ticket',
        enum: ['GENERAL', 'TECHNICAL', 'BILLING', 'MEDICAL', 'APPOINTMENT', 'ACCESS', 'COMPLAINT', 'FEEDBACK', 'OTHER'],
        example: 'TECHNICAL',
        required: false,
        nullable: true,
        enumName: 'TicketCategory'
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sub-category of the ticket',
        example: 'Database Access',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the ticket',
        example: ['urgent', 'patient-data', 'access-issue'],
        type: [String],
        default: []
    }),
    __metadata("design:type", Array)
], TicketDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'External reference number',
        example: 'TKT-2023-001',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "referenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of a related ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "relatedTicketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the ticket',
        example: {
            browser: 'Chrome 98.0.4758.102',
            os: 'Windows 10',
            device: 'Desktop',
            customField1: 'Custom value'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], TicketDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket is private (only visible to staff)',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "isPrivate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Internal notes visible only to staff',
        example: 'This issue appears to be related to the database maintenance performed yesterday.',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "internalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resolution details for the ticket',
        example: 'Restored database access permissions for the user account.',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the ticket was resolved',
        example: '2023-01-02T10:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who resolved the ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "resolvedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the ticket was closed',
        example: '2023-01-03T14:15:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "closedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who closed the ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "closedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the ticket was escalated',
        example: '2023-01-01T16:45:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "escalatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who escalated the ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "escalatedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for escalation',
        example: 'Critical issue affecting multiple users',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "escalationReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current escalation level',
        example: 1,
        default: 0
    }),
    __metadata("design:type", Number)
], TicketDto.prototype, "escalationLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the ticket was reopened',
        example: '2023-01-04T09:20:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "reopenedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who reopened the ticket',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "reopenedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for reopening the ticket',
        example: 'Issue has reoccurred after initial fix',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], TicketDto.prototype, "reopenReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the first response was provided',
        example: '2023-01-01T10:15:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "firstResponseAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the last activity occurred',
        example: '2023-01-02T15:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], TicketDto.prototype, "lastActivityAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket has been escalated',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "isEscalated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket has been resolved',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "isResolved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket has been closed',
        example: false,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "isClosed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket has been reopened',
        example: false,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "isReopened", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the ticket has received a first response',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "hasFirstResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time to first response in milliseconds',
        example: 3600000,
        readOnly: true,
        nullable: true
    }),
    __metadata("design:type", Number)
], TicketDto.prototype, "responseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time to resolution in milliseconds',
        example: 86400000,
        readOnly: true,
        nullable: true
    }),
    __metadata("design:type", Number)
], TicketDto.prototype, "resolutionTime", void 0);
exports.TicketDto = TicketDto;
//# sourceMappingURL=ticket.dto.js.map