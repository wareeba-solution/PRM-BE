var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString, IsBoolean, IsEnum, IsArray, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
export class UserQueryDto {
    constructor() {
        this.orderDirection = 'DESC';
        this.skip = 0;
        this.take = 10;
    }
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ enum: Role, isArray: true }),
    IsOptional(),
    IsArray(),
    IsEnum(Role, { each: true }),
    __metadata("design:type", Array)
], UserQueryDto.prototype, "roles", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString({ each: true }),
    IsArray(),
    __metadata("design:type", Array)
], UserQueryDto.prototype, "departmentIds", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    Type(() => Boolean),
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    Type(() => Boolean),
    __metadata("design:type", Boolean)
], UserQueryDto.prototype, "hasVerifiedEmail", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UserQueryDto.prototype, "relations", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Order by field (e.g., "firstName", "lastName", "createdAt")'
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserQueryDto.prototype, "orderBy", void 0);
__decorate([
    ApiPropertyOptional({
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserQueryDto.prototype, "orderDirection", void 0);
__decorate([
    ApiPropertyOptional({ default: 0 }),
    IsOptional(),
    IsNumber(),
    Type(() => Number),
    Min(0),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "skip", void 0);
__decorate([
    ApiPropertyOptional({ default: 10 }),
    IsOptional(),
    IsNumber(),
    Type(() => Number),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "take", void 0);
//# sourceMappingURL=user-query.dto.js.map