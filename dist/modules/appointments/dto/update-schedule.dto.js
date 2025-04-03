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
exports.UpdateScheduleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
// For settings, we can reuse the structure from CreateScheduleDto
class ScheduleSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { minAppointmentDuration: { required: false, type: () => Number, minimum: 5 }, appointmentBuffer: { required: false, type: () => Number, minimum: 0 }, maxAppointmentsPerDay: { required: false, type: () => Number, minimum: 1 }, preferredDuration: { required: false, type: () => Number, minimum: 5 }, allowOnlineBooking: { required: false, type: () => Boolean }, advanceBookingDays: { required: false, type: () => Number, minimum: 1 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Minimum appointment duration in minutes', example: 15 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "minAppointmentDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Appointment buffer time in minutes', example: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "appointmentBuffer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Max appointments per day', example: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "maxAppointmentsPerDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Preferred appointment duration in minutes', example: 30 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "preferredDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to allow online booking', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ScheduleSettingsDto.prototype, "allowOnlineBooking", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'How many days in advance appointment can be booked', example: 30 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "advanceBookingDays", void 0);
// Make all fields optional for updates
class UpdateScheduleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dayOfWeek: { required: false, type: () => Number, minimum: 0, maximum: 6 }, workStart: { required: false, type: () => String }, workEnd: { required: false, type: () => String }, breakStart: { required: false, type: () => String }, breakEnd: { required: false, type: () => String }, defaultAppointmentDuration: { required: false, type: () => Number, minimum: 5 }, isActive: { required: false, type: () => Boolean }, settings: { required: false, type: () => ScheduleSettingsDto } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Day of week (0=Sunday, 1=Monday, etc.)', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(6),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Work start time', example: '09:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "workStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Work end time', example: '17:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "workEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Break start time', example: '12:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "breakStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Break end time', example: '13:00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "breakEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Default appointment duration in minutes', example: 30 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "defaultAppointmentDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is this schedule active', default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateScheduleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional schedule settings', type: ScheduleSettingsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ScheduleSettingsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ScheduleSettingsDto)
], UpdateScheduleDto.prototype, "settings", void 0);
exports.UpdateScheduleDto = UpdateScheduleDto;
//# sourceMappingURL=update-schedule.dto.js.map