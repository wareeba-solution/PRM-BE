"use strict";
// src/config/swagger-dto/tenants/tenant.dto.ts
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
exports.TenantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tenant_entity_1 = require("../../../modules/tenants/entities/tenant.entity");
class TenantDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the tenant', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], TenantDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the tenant', example: 'Healthcare Network Inc.' }),
    __metadata("design:type", String)
], TenantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subdomain for the tenant', example: 'healthcare-network' }),
    __metadata("design:type", String)
], TenantDto.prototype, "subdomain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plan type of the tenant',
        enum: tenant_entity_1.PlanType,
        example: tenant_entity_1.PlanType.BASIC
    }),
    __metadata("design:type", String)
], TenantDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the tenant',
        enum: tenant_entity_1.TenantStatus,
        example: tenant_entity_1.TenantStatus.ACTIVE
    }),
    __metadata("design:type", String)
], TenantDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tenant settings',
        example: {
            branding: {
                primaryColor: '#007bff',
                secondaryColor: '#6c757d',
                logoUrl: 'https://example.com/logo.png'
            },
            security: {
                passwordPolicy: {
                    minLength: 8,
                    requireUppercase: true
                },
                mfaRequired: false
            }
        }
    }),
    __metadata("design:type", Object)
], TenantDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact information for the tenant',
        example: {
            adminEmail: 'admin@example.com',
            adminPhone: '+1234567890',
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                country: 'USA',
                postalCode: '12345'
            }
        }
    }),
    __metadata("design:type", Object)
], TenantDto.prototype, "contactInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscription start date',
        example: '2025-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], TenantDto.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscription end date',
        example: '2026-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], TenantDto.prototype, "subscriptionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the subscription is active',
        example: true
    }),
    __metadata("design:type", Boolean)
], TenantDto.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of organizations allowed',
        example: 5
    }),
    __metadata("design:type", Number)
], TenantDto.prototype, "maxOrganizations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of users allowed per organization',
        example: 10
    }),
    __metadata("design:type", Number)
], TenantDto.prototype, "maxUsersPerOrganization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum storage allowed per organization in MB',
        example: 1024
    }),
    __metadata("design:type", Number)
], TenantDto.prototype, "maxStoragePerOrganization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date of the tenant',
        example: '2025-04-08T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], TenantDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date of the tenant',
        example: '2025-04-08T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], TenantDto.prototype, "updatedAt", void 0);
exports.TenantDto = TenantDto;
//# sourceMappingURL=tenant.dto.js.map