"use strict";
// src/modules/auth/dto/create-branch.dto.ts
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
exports.CreateBranchDto = exports.BranchDetailsDto = exports.BranchAdminDto = exports.BranchAddressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const role_enum_1 = require("../../users/enums/role.enum");
const subscription_plan_enum_1 = require("../../organizations/enums/subscription-plan.enum");
const swagger_1 = require("@nestjs/swagger");
class BranchAddressDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street address', example: '123 Main St' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'City', example: 'New York' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'State or province', example: 'NY' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '10001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country', example: 'USA' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BranchAddressDto.prototype, "country", void 0);
exports.BranchAddressDto = BranchAddressDto;
class BranchAdminDto {
    constructor() {
        this.role = role_enum_1.Role.ADMIN;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Branch admin\'s first name', example: 'John' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'First name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'First name must not exceed 50 characters' }),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Branch admin\'s last name', example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Last name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Last name must not exceed 50 characters' }),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Branch admin\'s email address', example: 'branch.admin@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Branch admin\'s password', example: 'SecurePass123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Branch admin\'s phone number', example: '+1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Branch admin\'s role',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.ADMIN,
        example: role_enum_1.Role.ADMIN
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    __metadata("design:type", String)
], BranchAdminDto.prototype, "role", void 0);
exports.BranchAdminDto = BranchAdminDto;
class BranchDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Branch name', example: 'Acme Healthcare - Downtown Branch' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Branch name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Branch name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Branch name must not exceed 100 characters' }),
    __metadata("design:type", String)
], BranchDetailsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Branch website', example: 'https://downtown.acme-health.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    }),
    __metadata("design:type", String)
], BranchDetailsDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Branch phone number', example: '+1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], BranchDetailsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Branch address',
        type: () => BranchAddressDto
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BranchAddressDto),
    __metadata("design:type", BranchAddressDto)
], BranchDetailsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Branch subscription plan',
        enum: subscription_plan_enum_1.SubscriptionPlan,
        example: subscription_plan_enum_1.SubscriptionPlan.BASIC
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(subscription_plan_enum_1.SubscriptionPlan),
    __metadata("design:type", String)
], BranchDetailsDto.prototype, "subscriptionPlan", void 0);
exports.BranchDetailsDto = BranchDetailsDto;
class CreateBranchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Branch admin information',
        type: () => BranchAdminDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BranchAdminDto),
    __metadata("design:type", BranchAdminDto)
], CreateBranchDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Branch details',
        type: () => BranchDetailsDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BranchDetailsDto),
    __metadata("design:type", BranchDetailsDto)
], CreateBranchDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant ID (required for multi-tenant applications)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "tenantId", void 0);
exports.CreateBranchDto = CreateBranchDto;
//# sourceMappingURL=create-branch.dto.js.map