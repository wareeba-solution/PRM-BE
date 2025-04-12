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
exports.BaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
/**
 * Base DTO class with common properties for Swagger documentation
 * Using DTOs instead of entity classes helps avoid circular dependency issues
 */
class BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], BaseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-01-01T00:00:00.000Z',
        format: 'date-time'
    }),
    __metadata("design:type", Date)
], BaseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-01-01T00:00:00.000Z',
        format: 'date-time'
    }),
    __metadata("design:type", Date)
], BaseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Soft delete timestamp',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], BaseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who created this record',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], BaseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who last updated this record',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], BaseDto.prototype, "updatedById", void 0);
exports.BaseDto = BaseDto;
//# sourceMappingURL=base.dto.js.map