"use strict";
// src/modules/auth/dto/register.dto.ts
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
exports.RegisterDto = exports.RegisterOrganizationDto = exports.RegisterUserDto = exports.OrganizationAddressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const role_enum_1 = require("../../users/enums/role.enum");
const subscription_plan_enum_1 = require("../../organizations/enums/subscription-plan.enum");
const swagger_1 = require("@nestjs/swagger");
class OrganizationAddressDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street address', example: '123 Main St' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City', example: 'New York' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State or province', example: 'NY' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '10001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country', example: 'USA' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "country", void 0);
exports.OrganizationAddressDto = OrganizationAddressDto;
class RegisterUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User\'s first name', example: 'John' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'First name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'First name must not exceed 50 characters' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User\'s last name', example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Last name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Last name must not exceed 50 characters' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User\'s email address', example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
exports.RegisterUserDto = RegisterUserDto;
class RegisterOrganizationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Organization name', example: 'Acme Healthcare' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Organization name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Organization name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Organization name must not exceed 100 characters' }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Organization website', example: 'https://acme-health.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization address',
        type: () => OrganizationAddressDto
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OrganizationAddressDto),
    __metadata("design:type", OrganizationAddressDto)
], RegisterOrganizationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization subscription plan',
        enum: subscription_plan_enum_1.SubscriptionPlan,
        example: subscription_plan_enum_1.SubscriptionPlan.BASIC
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(subscription_plan_enum_1.SubscriptionPlan),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "subscriptionPlan", void 0);
exports.RegisterOrganizationDto = RegisterOrganizationDto;
class RegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User information',
        type: () => RegisterUserDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RegisterUserDto),
    __metadata("design:type", RegisterUserDto)
], RegisterDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization information',
        type: () => RegisterOrganizationDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RegisterOrganizationDto),
    __metadata("design:type", RegisterOrganizationDto)
], RegisterDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tenant ID (required for multi-tenant registration)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], RegisterDto.prototype, "tenantId", void 0);
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map