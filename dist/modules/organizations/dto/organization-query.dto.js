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
exports.OrganizationQueryDto = exports.DateRangeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const organization_entity_1 = require("../entities/organization.entity");
class DateRangeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { startDate: { required: false, type: () => String }, endDate: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "endDate", void 0);
exports.DateRangeDto = DateRangeDto;
class OrganizationQueryDto {
    constructor() {
        // Pagination parameters
        this.page = 1;
        this.limit = 10;
        // Sorting parameters
        this.sortBy = 'createdAt';
        this.sortOrder = 'DESC';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String }, status: { required: false, enum: require("../entities/organization.entity").OrganizationStatus }, subscriptionTier: { required: false, enum: require("../entities/organization.entity").SubscriptionTier }, isDomainVerified: { required: false, type: () => Boolean }, isSubscriptionActive: { required: false, type: () => Boolean }, minUsers: { required: false, type: () => Number, minimum: 0 }, maxUsers: { required: false, type: () => Number, minimum: 1 }, storageUsagePercentage: { required: false, type: () => Number, minimum: 0, maximum: 100 }, createdAt: { required: false, type: () => require("./organization-query.dto").DateRangeDto }, subscriptionDate: { required: false, type: () => require("./organization-query.dto").DateRangeDto }, industries: { required: false, type: () => [String] }, includeDeleted: { required: false, type: () => Boolean }, location: { required: false, type: () => String }, timezone: { required: false, type: () => String }, page: { required: false, type: () => Number, default: 1, minimum: 1 }, limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 }, sortBy: { required: false, type: () => String, default: "createdAt" }, sortOrder: { required: false, type: () => Object, default: "DESC" }, includeUsers: { required: false, type: () => Boolean }, includeSubscription: { required: false, type: () => Boolean }, includeStatistics: { required: false, type: () => Boolean }, includeAuditLogs: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search term for name or domain' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: organization_entity_1.OrganizationStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(organization_entity_1.OrganizationStatus),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: organization_entity_1.SubscriptionTier }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(organization_entity_1.SubscriptionTier),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "subscriptionTier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by domain verification status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "isDomainVerified", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by subscription active status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user count greater than' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "minUsers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user count less than' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "maxUsers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by storage usage percentage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "storageUsagePercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], OrganizationQueryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], OrganizationQueryDto.prototype, "subscriptionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific industries' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], OrganizationQueryDto.prototype, "industries", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include deleted organizations' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific location' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by timezone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number', minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', minimum: 1, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OrganizationQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort field',
        enum: ['name', 'createdAt', 'userCount', 'storageUsage', 'subscriptionEndDate']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ASC', 'DESC']),
    __metadata("design:type", String)
], OrganizationQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include user details' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeUsers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include subscription details' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeSubscription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include statistics' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeStatistics", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include audit logs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrganizationQueryDto.prototype, "includeAuditLogs", void 0);
exports.OrganizationQueryDto = OrganizationQueryDto;
//# sourceMappingURL=organization-query.dto.js.map