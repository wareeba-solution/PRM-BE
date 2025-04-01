var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength, Matches, IsPhoneNumber, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../users/enums/role.enum';
export class AddressDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], AddressDto.prototype, "state", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], AddressDto.prototype, "postalCode", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
export class EmergencyContactDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "relationship", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(undefined),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "address", void 0);
export class AddUserDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], AddUserDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], AddUserDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty(),
    IsEmail(),
    MaxLength(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(8),
    MaxLength(50),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }),
    __metadata("design:type", String)
], AddUserDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ enum: Role }),
    IsEnum(Role),
    __metadata("design:type", String)
], AddUserDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(undefined),
    __metadata("design:type", String)
], AddUserDto.prototype, "phoneNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "department", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], AddUserDto.prototype, "employeeId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => AddressDto),
    __metadata("design:type", AddressDto)
], AddUserDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => EmergencyContactDto),
    __metadata("design:type", EmergencyContactDto)
], AddUserDto.prototype, "emergencyContact", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], AddUserDto.prototype, "licenseNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], AddUserDto.prototype, "specialization", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], AddUserDto.prototype, "qualifications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], AddUserDto.prototype, "certifications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], AddUserDto.prototype, "languages", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], AddUserDto.prototype, "preferences", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], AddUserDto.prototype, "metadata", void 0);
//# sourceMappingURL=add-user.dto.js.map