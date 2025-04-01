var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePasswordDto {
}
__decorate([
    ApiProperty(),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    ApiProperty({
        description: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    IsNotEmpty(),
    IsString(),
    MinLength(8),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password too weak - must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
__decorate([
    ApiProperty(),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=update-password.dto.js.map