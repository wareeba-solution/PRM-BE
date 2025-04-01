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
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, IsPhoneNumber, IsEnum, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../users/enums/role.enum';
import { SubscriptionPlan } from '../../organizations/enums/subscription-plan.enum';
export class OrganizationAddressDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "street", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "city", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "state", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "postalCode", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], OrganizationAddressDto.prototype, "country", void 0);
export class RegisterUserDto {
}
__decorate([
    ApiProperty({
        description: 'User first name',
        example: 'John',
    }),
    IsString(),
    IsNotEmpty({ message: 'First name is required' }),
    MinLength(2, { message: 'First name must be at least 2 characters long' }),
    MaxLength(50, { message: 'First name must not exceed 50 characters' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty({
        description: 'User last name',
        example: 'Doe',
    }),
    IsString(),
    IsNotEmpty({ message: 'Last name is required' }),
    MinLength(2, { message: 'Last name must be at least 2 characters long' }),
    MaxLength(50, { message: 'Last name must not exceed 50 characters' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    }),
    IsEmail({}, { message: 'Please enter a valid email address' }),
    IsNotEmpty({ message: 'Email is required' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({
        description: 'User password',
        example: 'Password123!',
        minLength: 8,
    }),
    IsString(),
    IsNotEmpty({ message: 'Password is required' }),
    MinLength(8, { message: 'Password must be at least 8 characters long' }),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'User phone number',
        example: '+1234567890',
    }),
    IsOptional(),
    IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({
        enum: Role,
        description: 'User role',
        default: Role.ADMIN,
    }),
    IsOptional(),
    IsEnum(Role),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
export class RegisterOrganizationDto {
}
__decorate([
    ApiProperty({
        description: 'Organization name',
        example: 'Acme Medical Center',
    }),
    IsString(),
    IsNotEmpty({ message: 'Organization name is required' }),
    MinLength(2, { message: 'Organization name must be at least 2 characters long' }),
    MaxLength(100, { message: 'Organization name must not exceed 100 characters' }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization website',
        example: 'https://www.acmemedical.com',
    }),
    IsOptional(),
    IsString(),
    Matches(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "website", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization phone number',
        example: '+1234567890',
    }),
    IsOptional(),
    IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' }),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization address',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => OrganizationAddressDto),
    __metadata("design:type", OrganizationAddressDto)
], RegisterOrganizationDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({
        enum: SubscriptionPlan,
        description: 'Subscription plan',
        default: SubscriptionPlan.BASIC,
    }),
    IsOptional(),
    IsEnum(SubscriptionPlan),
    __metadata("design:type", String)
], RegisterOrganizationDto.prototype, "subscriptionPlan", void 0);
export class RegisterDto {
}
__decorate([
    ApiProperty(),
    ValidateNested(),
    Type(() => RegisterUserDto),
    __metadata("design:type", RegisterUserDto)
], RegisterDto.prototype, "user", void 0);
__decorate([
    ApiProperty(),
    ValidateNested(),
    Type(() => RegisterOrganizationDto),
    __metadata("design:type", RegisterOrganizationDto)
], RegisterDto.prototype, "organization", void 0);
//# sourceMappingURL=register.dto.js.map