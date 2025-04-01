var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsBoolean, MinLength, MaxLength, Matches, IsPhoneNumber, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
export class UserAddress {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UserAddress.prototype, "street", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UserAddress.prototype, "city", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UserAddress.prototype, "state", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], UserAddress.prototype, "postalCode", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UserAddress.prototype, "country", void 0);
export class EmergencyContact {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], EmergencyContact.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], EmergencyContact.prototype, "relationship", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], EmergencyContact.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], EmergencyContact.prototype, "address", void 0);
export class CreateUserDto {
    constructor() {
        this.requirePasswordChange = true;
    }
}
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty(),
    IsEmail(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(8),
    MaxLength(100),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    ApiProperty({ enum: Role }),
    IsEnum(Role),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "department", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "employeeId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UserAddress),
    __metadata("design:type", UserAddress)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => EmergencyContact),
    __metadata("design:type", EmergencyContact)
], CreateUserDto.prototype, "emergencyContact", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "licenseNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "specialization", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "qualifications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "certifications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isOnCall", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "languages", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "requirePasswordChange", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "preferences", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-user.dto.js.map