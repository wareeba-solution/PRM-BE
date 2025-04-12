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
exports.DepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Department DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class DepartmentDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this department belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department name',
        example: 'Cardiology'
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department description',
        example: 'Specializes in heart-related conditions and treatments',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the department head/manager',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "managerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address for the department',
        example: 'cardiology@hospital.com',
        format: 'email',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number for the department',
        example: '+1-555-123-4567',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location or address of the department',
        example: 'Building A, Floor 3, Room 305',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the department is active',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], DepartmentDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department code or identifier',
        example: 'CARD',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parent department ID if this is a sub-department',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Working hours of the department',
        example: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: null
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], DepartmentDto.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the department',
        example: {
            specialties: ['Cardiac Surgery', 'Interventional Cardiology'],
            equipmentCount: 15,
            averageWaitTime: '3 days'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], DepartmentDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the department',
        example: ['specialty', 'surgical', 'inpatient'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], DepartmentDto.prototype, "tags", void 0);
exports.DepartmentDto = DepartmentDto;
//# sourceMappingURL=department.dto.js.map