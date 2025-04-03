"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberDto = exports.DepartmentMemberRole = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var DepartmentMemberRole;
(function (DepartmentMemberRole) {
    DepartmentMemberRole["MANAGER"] = "MANAGER";
    DepartmentMemberRole["SUPERVISOR"] = "SUPERVISOR";
    DepartmentMemberRole["MEMBER"] = "MEMBER";
})(DepartmentMemberRole = exports.DepartmentMemberRole || (exports.DepartmentMemberRole = {}));
class AddMemberDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, role: { required: true, enum: require("./add-member.dto").DepartmentMemberRole }, title: { required: false, type: () => String }, responsibilities: { required: false, type: () => String }, startDate: { required: false, type: () => String }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DepartmentMemberRole }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(DepartmentMemberRole),
    __metadata("design:type", String)
], AddMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "responsibilities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AddMemberDto.prototype, "metadata", void 0);
exports.AddMemberDto = AddMemberDto;
//# sourceMappingURL=add-member.dto.js.map