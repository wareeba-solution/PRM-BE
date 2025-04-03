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
exports.CreateExceptionDto = exports.ScheduleExceptionType = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ScheduleExceptionType;
(function (ScheduleExceptionType) {
    ScheduleExceptionType["VACATION"] = "VACATION";
    ScheduleExceptionType["SICK_LEAVE"] = "SICK_LEAVE";
    ScheduleExceptionType["CONFERENCE"] = "CONFERENCE";
    ScheduleExceptionType["PERSONAL"] = "PERSONAL";
    ScheduleExceptionType["OTHER"] = "OTHER";
})(ScheduleExceptionType = exports.ScheduleExceptionType || (exports.ScheduleExceptionType = {}));
class CreateExceptionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { doctorId: { required: true, type: () => String, format: "uuid" }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, isFullDay: { required: true, type: () => Boolean }, type: { required: true, enum: require("./create-exception.dto").ScheduleExceptionType }, reason: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Doctor ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of the exception',
        example: '2023-06-15',
        type: String,
    }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of the exception',
        example: '2023-06-20',
        type: String,
    }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start time for partial day exceptions (optional)',
        example: '09:00',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End time for partial day exceptions (optional)',
        example: '12:00',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is a full day exception',
        example: true,
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateExceptionDto.prototype, "isFullDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of exception',
        enum: ScheduleExceptionType,
        example: ScheduleExceptionType.VACATION,
    }),
    (0, class_validator_1.IsEnum)(ScheduleExceptionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional details or reason for the exception',
        example: 'Annual family vacation',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "reason", void 0);
exports.CreateExceptionDto = CreateExceptionDto;
//# sourceMappingURL=create-exception.dto.js.map