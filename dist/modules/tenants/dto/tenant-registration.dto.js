"use strict";
// src/modules/tenants/dto/tenant-registration.dto.ts
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
exports.TenantRegistrationDto = exports.OrganizationAddressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const tenant_entity_1 = require("../entities/tenant.entity");
class OrganizationAddressDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Street address', example: '123 Main St' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'City', example: 'New York' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'State or province', example: 'NY' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Country', example: 'USA' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Postal code', example: '10001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "postalCode", void 0);
exports.OrganizationAddressDto = OrganizationAddressDto;
class TenantRegistrationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the tenant (healthcare network)', example: 'Healthcare Network Inc.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "tenantName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subdomain for the tenant', example: 'healthcare-network' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "subdomain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Plan type of the tenant', enum: tenant_entity_1.PlanType, example: tenant_entity_1.PlanType.BASIC }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(tenant_entity_1.PlanType),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First name of the primary admin user', example: 'John' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last name of the primary admin user', example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email of the primary admin user', example: 'admin@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Password for the primary admin user', example: 'SecurePassword123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminPassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the primary admin user', example: '+1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "adminPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the primary organization', example: 'Main Hospital' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Address of the organization', type: () => OrganizationAddressDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OrganizationAddressDto),
    __metadata("design:type", OrganizationAddressDto)
], TenantRegistrationDto.prototype, "organizationAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Phone number of the organization', example: '+1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email of the organization', example: 'contact@hospital.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], TenantRegistrationDto.prototype, "organizationEmail", void 0);
exports.TenantRegistrationDto = TenantRegistrationDto;
//# sourceMappingURL=tenant-registration.dto.js.map