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
exports.TicketQueryDto = exports.SortOrder = exports.TicketSortField = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var TicketSortField;
(function (TicketSortField) {
    TicketSortField["CREATED_AT"] = "createdAt";
    TicketSortField["UPDATED_AT"] = "updatedAt";
    TicketSortField["PRIORITY"] = "priority";
    TicketSortField["STATUS"] = "status";
    TicketSortField["DUE_DATE"] = "dueDate";
    TicketSortField["LAST_ACTIVITY"] = "lastActivity";
})(TicketSortField = exports.TicketSortField || (exports.TicketSortField = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
class TicketQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.limit2 = 20; // Fixed missing property name
        this.offset = 0;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { searchTerm: { required: false, type: () => String }, priority: { required: false, type: () => String }, type: { required: false, type: () => String }, assigneeId: { required: false, type: () => String, format: "uuid" }, contactId: { required: false, type: () => String, format: "uuid" }, departmentId: { required: false, type: () => String, format: "uuid" }, search: { required: false, type: () => String }, startDate: { required: false, type: () => String }, endDate: { required: false, type: () => String }, page: { required: false, type: () => Number, default: 1, minimum: 1 }, limit: { required: false, type: () => Number, default: 10, minimum: 1 }, status: { required: false, type: () => [String] }, priorities: { required: false, type: () => [String] }, category: { required: false, type: () => [String] }, assigneeIds: { required: false, type: () => [String], format: "uuid" }, creatorIds: { required: false, type: () => [String], format: "uuid" }, tags: { required: false, type: () => [String] }, createdAfter: { required: false, type: () => Date }, createdBefore: { required: false, type: () => Date }, updatedAfter: { required: false, type: () => Date }, updatedBefore: { required: false, type: () => Date }, dueDateStart: { required: false, type: () => Date }, dueDateEnd: { required: false, type: () => Date }, includeArchived: { required: false, type: () => Boolean }, hasUnreadUpdates: { required: false, type: () => Boolean }, hasAttachments: { required: false, type: () => Boolean }, sortField: { required: false, enum: require("./ticket-query.dto").TicketSortField }, sortOrder: { required: false, enum: require("./ticket-query.dto").SortOrder }, limit2: { required: false, type: () => Number, default: 20, minimum: 1, maximum: 100 }, offset: { required: false, type: () => Number, default: 0, minimum: 0 }, customFields: { required: false, type: () => Object }, relatedTicketIds: { required: false, type: () => [String], format: "uuid" }, requiresAttention: { required: false, type: () => Boolean }, hasSlaBreach: { required: false, type: () => Boolean }, slaStatus: { required: false, type: () => [String] }, fields: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search term to filter tickets by title or description',
        example: 'login issue'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "searchTerm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "assigneeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "contactId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by status',
        isArray: true,
        example: ['OPEN', 'IN_PROGRESS']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by priority',
        isArray: true,
        example: ['HIGH', 'URGENT']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "priorities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by category',
        isArray: true,
        example: ['TECHNICAL', 'BILLING']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by assignee IDs',
        isArray: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "assigneeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by creator IDs',
        isArray: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "creatorIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by tag names',
        isArray: true,
        example: ['bug', 'feature-request']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets created after this date',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "createdAfter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets created before this date',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "createdBefore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets updated after this date',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "updatedAfter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets updated before this date',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "updatedBefore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by due date range start',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "dueDateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter tickets by due date range end',
        type: Date
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TicketQueryDto.prototype, "dueDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Include archived tickets in results',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "includeArchived", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only return tickets that have unread updates',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasUnreadUpdates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only return tickets that have attachments',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasAttachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Field to sort tickets by',
        enum: TicketSortField,
        default: TicketSortField.CREATED_AT
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TicketSortField),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order direction',
        enum: SortOrder,
        default: SortOrder.DESC
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder),
    __metadata("design:type", String)
], TicketQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of tickets to return',
        minimum: 1,
        maximum: 100,
        default: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "limit2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of tickets to skip',
        minimum: 0,
        default: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TicketQueryDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Custom field filters',
        type: 'object',
        additionalProperties: true // Added this property to fix the error
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Object)
], TicketQueryDto.prototype, "customFields", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Relation IDs to filter by',
        isArray: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "relatedTicketIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Get tickets requiring attention',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "requiresAttention", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Get tickets with SLA breaches',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketQueryDto.prototype, "hasSlaBreach", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by specific SLA status',
        example: ['warning', 'breached']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "slaStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fields to include in the response',
        isArray: true,
        example: ['id', 'title', 'status']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TicketQueryDto.prototype, "fields", void 0);
exports.TicketQueryDto = TicketQueryDto;
//# sourceMappingURL=ticket-query.dto.js.map