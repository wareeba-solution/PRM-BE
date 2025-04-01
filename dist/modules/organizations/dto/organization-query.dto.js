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
import { IsOptional, IsString, IsEnum, IsBoolean, IsInt, IsArray, Min, Max, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { OrganizationStatus, SubscriptionTier } from '../entities/organization.entity';
export class DateRangeDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Start date for filtering' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'End date for filtering' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "endDate", void 0);
export class OrganizationQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'createdAt';
        this.sortOrder = 'DESC';
    }
}
__decorate([
    ApiPropertyOptional({ description: 'Search term for name or domain' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ enum: OrganizationStatus }),
    IsOptional(),
    IsEnum(OrganizationStatus),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ enum: SubscriptionTier }),
    IsOptional(),
    IsEnum(SubscriptionTier),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "subscriptionTier", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by domain verification status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "isDomainVerified", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by subscription active status' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "isSubscriptionActive", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by user count greater than' }),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "minUsers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by user count less than' }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "maxUsers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by storage usage percentage' }),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "storageUsagePercentage", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], OrganizationQueryDto.prototype, "createdAt", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], OrganizationQueryDto.prototype, "subscriptionDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific industries' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], OrganizationQueryDto.prototype, "industries", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include deleted organizations' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeDeleted", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by specific location' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by timezone' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "timezone", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Page number', minimum: 1 }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Items per page', minimum: 1, maximum: 100 }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Sort field',
        enum: ['name', 'createdAt', 'userCount', 'storageUsage', 'subscriptionEndDate']
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "sortBy", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sort order', enum: ['ASC', 'DESC'] }),
    IsOptional(),
    IsEnum(['ASC', 'DESC']),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "sortOrder", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include user details' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeUsers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include subscription details' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeSubscription", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include statistics' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeStatistics", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Include audit logs' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeAuditLogs", void 0);
//# sourceMappingURL=organization-query.dto.js.map