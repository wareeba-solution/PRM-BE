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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * User DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class UserDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this user belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], UserDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s first name',
        example: 'John',
        maxLength: 50
    }),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s last name',
        example: 'Doe',
        maxLength: 50
    }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s email address',
        example: 'john.doe@example.com',
        format: 'email'
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s role in the system',
        enum: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF', 'DOCTOR', 'NURSE', 'PATIENT', 'GUEST'],
        example: 'STAFF',
        enumName: 'Role'
    }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of permissions assigned to the user',
        example: ['read:users', 'write:tickets'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user account is active',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user account is locked',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isLocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user\'s email is verified',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isEmailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user needs to change their password on next login',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "requirePasswordChange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last login timestamp',
        example: '2023-01-01T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], UserDto.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last activity timestamp',
        example: '2023-01-01T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], UserDto.prototype, "lastActiveAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s full name (virtual property)',
        example: 'John Doe',
        readOnly: true
    }),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user is available (active and not locked)',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isAvailable", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map