var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsUUID, IsBoolean, IsString, IsArray, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class DepartmentQueryDto {
    constructor() {
        this.skip = 0;
        this.take = 10;
    }
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], DepartmentQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], DepartmentQueryDto.prototype, "parentDepartmentId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], DepartmentQueryDto.prototype, "managerId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    Type(() => Boolean),
    __metadata("design:type", Boolean)
], DepartmentQueryDto.prototype, "isActive", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], DepartmentQueryDto.prototype, "relations", void 0);
__decorate([
    ApiPropertyOptional({ default: 0 }),
    IsOptional(),
    IsNumber(),
    Type(() => Number),
    Min(0),
    __metadata("design:type", Number)
], DepartmentQueryDto.prototype, "skip", void 0);
__decorate([
    ApiPropertyOptional({ default: 10 }),
    IsOptional(),
    IsNumber(),
    Type(() => Number),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], DepartmentQueryDto.prototype, "take", void 0);
//# sourceMappingURL=department-query.dto.js.map