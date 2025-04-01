var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
export class ResetPasswordDto {
}
__decorate([
    ApiProperty({
        description: 'Reset token received via email',
        example: 'abcdef123456789'
    }),
    IsNotEmpty({ message: 'Token is required' }),
    IsString({ message: 'Token must be a string' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    ApiProperty({
        description: 'New password',
        example: 'StrongP@ssw0rd!'
    }),
    IsNotEmpty({ message: 'Password is required' }),
    IsString({ message: 'Password must be a string' }),
    MinLength(8, { message: 'Password must be at least 8 characters long' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character'
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    ApiProperty({
        description: 'Confirm new password',
        example: 'StrongP@ssw0rd!'
    }),
    IsNotEmpty({ message: 'Password confirmation is required' }),
    IsString({ message: 'Password confirmation must be a string' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "passwordConfirmation", void 0);
//# sourceMappingURL=reset-password.dto.js.map