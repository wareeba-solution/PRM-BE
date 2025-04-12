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
exports.ResetPasswordDto = exports.VerifyEmailDto = exports.RegisterDto = exports.RegisterOrganizationDto = exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../../modules/users/enums/role.enum");
const create_organization_dto_1 = require("../../../modules/organizations/dto/create-organization.dto");
class RegisterUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User first name',
        example: 'John',
        minLength: 2,
        maxLength: 50
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User last name',
        example: 'Doe',
        minLength: 2,
        maxLength: 50
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'john.doe@example.com',
        format: 'email'
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'Password123!',
        minLength: 8,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User role',
        enum: role_enum_1.Role,
        example: role_enum_1.Role.ADMIN,
        default: role_enum_1.Role.USER
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User phone number',
        example: '+1234567890',
        pattern: '^\\+[1-9]\\d{1,14}$'
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
exports.RegisterUserDto = RegisterUserDto;
class RegisterOrganizationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization name',
        example: 'Acme Healthcare',
        minLength: 2,
        maxLength: 100
    }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization description',
        example: 'Leading healthcare provider in the region',
        maxLength: 255
    }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization subscription plan',
        enum: create_organization_dto_1.SubscriptionPlan,
        example: create_organization_dto_1.SubscriptionPlan.FREE,
        default: create_organization_dto_1.SubscriptionPlan.FREE
    }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "subscriptionPlan", void 0);
exports.RegisterOrganizationDto = RegisterOrganizationDto;
class RegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User registration details',
        type: RegisterUserDto
    }),
    __metadata("design:type", RegisterUserDto)
], RegisterDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization registration details',
        type: RegisterOrganizationDto
    }),
    __metadata("design:type", RegisterOrganizationDto)
], RegisterDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tenant ID for multi-tenant setup',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "tenantId", void 0);
exports.RegisterDto = RegisterDto;
class VerifyEmailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email verification token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "token", void 0);
exports.VerifyEmailDto = VerifyEmailDto;
class ResetPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password reset token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New password',
        example: 'NewPassword123!',
        minLength: 8,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
//# sourceMappingURL=user-account.dto.js.map