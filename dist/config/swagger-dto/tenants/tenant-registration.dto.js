"use strict";
// src/config/swagger-dto/tenants/tenant-registration.dto.ts
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
exports.TenantRegistrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tenant_entity_1 = require("../../../modules/tenants/entities/tenant.entity");
class TenantRegistrationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the tenant (healthcare network)',
        example: 'Healthcare Network Inc.'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "tenantName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subdomain for the tenant',
        example: 'healthcare-network'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "subdomain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Plan type of the tenant',
        enum: tenant_entity_1.PlanType,
        example: tenant_entity_1.PlanType.BASIC
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the primary admin user',
        example: 'John'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the primary admin user',
        example: 'Doe'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the primary admin user',
        example: 'admin@example.com'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password for the primary admin user',
        example: 'SecurePassword123!'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminPassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Phone number of the primary admin user',
        example: '+1234567890'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the primary organization',
        example: 'Main Hospital'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Address of the organization',
        example: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            country: 'USA',
            postalCode: '12345'
        }
    }),
    __metadata("design:type", Object)
], TenantRegistrationDto.prototype, "organizationAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Phone number of the organization',
        example: '+1234567890'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Email of the organization',
        example: 'contact@hospital.com'
    }),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationEmail", void 0);
exports.TenantRegistrationDto = TenantRegistrationDto;
//# sourceMappingURL=tenant-registration.dto.js.map