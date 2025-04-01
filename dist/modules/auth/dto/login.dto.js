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
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean, } from 'class-validator';
export class LoginDto {
}
__decorate([
    ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    }),
    IsEmail({}, { message: 'Please enter a valid email address' }),
    IsNotEmpty({ message: 'Email is required' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    ApiProperty({
        description: 'User password',
        example: 'Password123!',
        minLength: 8,
    }),
    IsString(),
    IsNotEmpty({ message: 'Password is required' }),
    MinLength(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Remember user session',
        default: false,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization identifier for multi-tenant applications',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "organizationId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Device identifier for multi-device management',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "deviceId", void 0);
//# sourceMappingURL=login.dto.js.map