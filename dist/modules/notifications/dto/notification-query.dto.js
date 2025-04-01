var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsArray, IsBoolean, IsDateString, IsUUID, IsInt, Min, Max, ValidateNested, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel, NotificationCategory } from '../entities/notification-preference.entity';
export class DateRangeDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Start date for the range' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'End date for the range' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "endDate", void 0);
export class NotificationQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'createdAt';
        this.sortOrder = 'DESC';
    }
}
__decorate([
    ApiPropertyOptional({ description: 'Search term for notification content' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "skip", void 0);
__decorate([
    ApiPropertyOptional({ enum: NotificationCategory, isArray: true }),
    IsOptional(),
    IsArray(),
    IsEnum(NotificationCategory, { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "categories", void 0);
__decorate([
    ApiPropertyOptional({ enum: NotificationChannel, isArray: true }),
    IsOptional(),
    IsArray(),
    IsEnum(NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "channels", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by read status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isRead", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by archived status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isArchived", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific user IDs' }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    ArrayMaxSize(50),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "userIds", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific recipient IDs' }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    ArrayMaxSize(50),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific sender IDs' }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    ArrayMaxSize(50),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "senderIds", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], NotificationQueryDto.prototype, "dateRange", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by priority levels' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(10),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "priorities", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by status types' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(10),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "statuses", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific tags' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(20),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by actionable status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isActionable", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by action taken status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "isActionTaken", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include deleted notifications' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeDeleted", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Group results by field' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "groupBy", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Page number', minimum: 1 }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Items per page', minimum: 1, maximum: 100 }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sort field' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "sortBy", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sort order', enum: ['ASC', 'DESC'] }),
    IsOptional(),
    IsEnum(['ASC', 'DESC']),
    __metadata("design:type", String)
], NotificationQueryDto.prototype, "sortOrder", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific template IDs' }),
    IsOptional(),
    IsArray(),
    IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "templateIds", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by delivery status' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "deliveryStatuses", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include only notifications with attachments' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "hasAttachments", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific source systems' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationQueryDto.prototype, "sources", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include metadata in response' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeMetadata", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include read receipts in response' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], NotificationQueryDto.prototype, "includeReadReceipts", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by importance level', minimum: 1, maximum: 5 }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(5),
    __metadata("design:type", Number)
], NotificationQueryDto.prototype, "importanceLevel", void 0);
//# sourceMappingURL=notification-query.dto.js.map