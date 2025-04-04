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
exports.NotificationQueryDto = exports.DateRangeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const notification_preference_entity_1 = require("../entities/notification-preference.entity");
class DateRangeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { startDate: { required: false, type: () => String }, endDate: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start date for the range' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date for the range' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "endDate", void 0);
exports.DateRangeDto = DateRangeDto;
class NotificationQueryDto {
    constructor() {
        // Pagination parameters
        this.page = 1;
        this.limit = 10;
        // Sorting parameters
        this.sortBy = 'createdAt';
        this.sortOrder = 'DESC';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { skip: { required: false, type: () => Number, format: "uuid" }, take: { required: false, type: () => Number }, includeRead: { required: false, type: () => Boolean }, categories: { required: false, enum: require("../enums/notification-category.enum").NotificationCategory, isArray: true }, userId: { required: false, type: () => String }, organizationId: { required: false, type: () => String }, channels: { required: false, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, isRead: { required: false, type: () => Boolean }, isArchived: { required: false, type: () => Boolean }, userIds: { required: false, type: () => [String], format: "uuid", maxItems: 50 }, status: { required: false, type: () => String, format: "uuid", maxItems: 50 }, recipientIds: { required: false, type: () => [String] }, type: { required: false, type: () => String }, read: { required: false, type: () => Boolean }, priority: { required: false, type: () => String }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, senderIds: { required: false, type: () => [String], format: "uuid", maxItems: 50 }, dateRange: { required: false, type: () => require("./notification-query.dto").DateRangeDto }, priorities: { required: false, type: () => [String], maxItems: 10 }, statuses: { required: false, type: () => [String], maxItems: 10 }, tags: { required: false, type: () => [String], maxItems: 20 }, isActionable: { required: false, type: () => Boolean }, isActionTaken: { required: false, type: () => Boolean }, includeDeleted: { required: false, type: () => Boolean }, groupBy: { required: false, type: () => String }, page: { required: false, type: () => Number, default: 1, minimum: 1 }, limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 }, sortBy: { required: false, type: () => String, default: "createdAt" }, sortOrder: { required: false, type: () => Object, default: "DESC" }, templateIds: { required: false, type: () => [String], format: "uuid" }, deliveryStatuses: { required: false, type: () => [String] }, hasAttachments: { required: false, type: () => Boolean }, sources: { required: false, type: () => [String] }, includeMetadata: { required: false, type: () => Boolean }, includeReadReceipts: { required: false, type: () => Boolean }, importanceLevel: { required: false, type: () => Number, minimum: 1, maximum: 5 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search term for notification content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationCategory, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory, { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by read status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by archived status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isArchived", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific user IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMaxSize)(50),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "userIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific recipient IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMaxSize)(50),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific sender IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMaxSize)(50),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "senderIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], NotificationQueryDto.prototype, "dateRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by priority levels' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "priorities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status types' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific tags' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(20),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by actionable status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isActionable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by action taken status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isActionTaken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include deleted notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Group results by field' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "groupBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number', minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', minimum: 1, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort field' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ASC', 'DESC']),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific template IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "templateIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by delivery status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "deliveryStatuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include only notifications with attachments' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "hasAttachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific source systems' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "sources", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include metadata in response' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeMetadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include read receipts in response' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeReadReceipts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by importance level', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "importanceLevel", void 0);
exports.NotificationQueryDto = NotificationQueryDto;
//# sourceMappingURL=notification-query.dto.js.map