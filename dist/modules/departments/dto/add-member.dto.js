var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var DepartmentMemberRole;
(function (DepartmentMemberRole) {
    DepartmentMemberRole["MANAGER"] = "MANAGER";
    DepartmentMemberRole["SUPERVISOR"] = "SUPERVISOR";
    DepartmentMemberRole["MEMBER"] = "MEMBER";
})(DepartmentMemberRole || (DepartmentMemberRole = {}));
export class AddMemberDto {
}
__decorate([
    ApiProperty(),
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "userId", void 0);
__decorate([
    ApiProperty({ enum: DepartmentMemberRole }),
    IsNotEmpty(),
    IsEnum(DepartmentMemberRole),
    __metadata("design:type", String)
], AddMemberDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "responsibilities", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    __metadata("design:type", Object)
], AddMemberDto.prototype, "metadata", void 0);
//# sourceMappingURL=add-member.dto.js.map