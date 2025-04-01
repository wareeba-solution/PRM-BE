var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsEnum, IsUUID, IsString, IsArray, IsDate, IsBoolean, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export var TicketSortField;
(function (TicketSortField) {
    TicketSortField["CREATED_AT"] = "createdAt";
    TicketSortField["UPDATED_AT"] = "updatedAt";
    TicketSortField["PRIORITY"] = "priority";
    TicketSortField["STATUS"] = "status";
    TicketSortField["DUE_DATE"] = "dueDate";
    TicketSortField["LAST_ACTIVITY"] = "lastActivity";
})(TicketSortField || (TicketSortField = {}));
export var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
export class TicketQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.limit2 = 20;
        this.offset = 0;
    }
}
__decorate([
    ApiPropertyOptional({
        description: 'Search term to filter tickets by title or description',
        example: 'login issue'
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "searchTerm", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "priority", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "assigneeId", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "contactId", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "departmentId", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "search", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "startDate", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "endDate", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "page", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by status',
        isArray: true,
        example: ['OPEN', 'IN_PROGRESS']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by priority',
        isArray: true,
        example: ['HIGH', 'URGENT']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "priorities", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by category',
        isArray: true,
        example: ['TECHNICAL', 'BILLING']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "category", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by assignee IDs',
        isArray: true
    }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "assigneeIds", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by creator IDs',
        isArray: true
    }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "creatorIds", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by tag names',
        isArray: true,
        example: ['bug', 'feature-request']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets created after this date',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "createdAfter", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets created before this date',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "createdBefore", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets updated after this date',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "updatedAfter", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets updated before this date',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "updatedBefore", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by due date range start',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "dueDateStart", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter tickets by due date range end',
        type: Date
    }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "dueDateEnd", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Include archived tickets in results',
        default: false
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "includeArchived", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only return tickets that have unread updates',
        default: false
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasUnreadUpdates", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only return tickets that have attachments',
        default: false
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasAttachments", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Field to sort tickets by',
        enum: TicketSortField,
        default: TicketSortField.CREATED_AT
    }),
    IsOptional(),
    IsEnum(TicketSortField),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "sortField", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Sort order direction',
        enum: SortOrder,
        default: SortOrder.DESC
    }),
    IsOptional(),
    IsEnum(SortOrder),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "sortOrder", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Number of tickets to return',
        minimum: 1,
        maximum: 100,
        default: 20
    }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "limit2", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Number of tickets to skip',
        minimum: 0,
        default: 0
    }),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "offset", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Custom field filters',
        type: 'object',
        additionalProperties: true
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => Object),
    __metadata("design:type", Object)
], TicketQueryDto.prototype, "customFields", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Relation IDs to filter by',
        isArray: true
    }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "relatedTicketIds", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Get tickets requiring attention',
        default: false
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "requiresAttention", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Get tickets with SLA breaches',
        default: false
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasSlaBreach", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by specific SLA status',
        example: ['warning', 'breached']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "slaStatus", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Fields to include in the response',
        isArray: true,
        example: ['id', 'title', 'status']
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "fields", void 0);
//# sourceMappingURL=ticket-query.dto.js.map