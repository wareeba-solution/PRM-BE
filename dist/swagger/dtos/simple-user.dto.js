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
export class SimpleUserDto {
}
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], SimpleUserDto.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], SimpleUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], SimpleUserDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], SimpleUserDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String)
], SimpleUserDto.prototype, "role", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Boolean)
], SimpleUserDto.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Date)
], SimpleUserDto.prototype, "createdAt", void 0);
//# sourceMappingURL=simple-user.dto.js.map