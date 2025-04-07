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
const class_validator_1 = require("class-validator");
var ScheduleExceptionType;
(function (ScheduleExceptionType) {
    ScheduleExceptionType["VACATION"] = "VACATION";
    ScheduleExceptionType["SICK_LEAVE"] = "SICK_LEAVE";
    ScheduleExceptionType["CONFERENCE"] = "CONFERENCE";
    ScheduleExceptionType["PERSONAL"] = "PERSONAL";
    ScheduleExceptionType["OTHER"] = "OTHER";
})(ScheduleExceptionType = exports.ScheduleExceptionType || (exports.ScheduleExceptionType = {}));
class CreateExceptionDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateExceptionDto.prototype, "isFullDay", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ScheduleExceptionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "reason", void 0);
exports.CreateExceptionDto = CreateExceptionDto;
//# sourceMappingURL=create-exception.dto.js.map