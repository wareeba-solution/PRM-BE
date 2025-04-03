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
exports.RescheduleAppointmentDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/reschedule-appointment.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RescheduleAppointmentDto {
    constructor() {
        this.notifyPatient = true;
        this.requireConfirmation = false;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { startTime: { required: true, type: () => String }, endTime: { required: true, type: () => String }, providerId: { required: false, type: () => String, format: "uuid" }, reason: { required: false, type: () => String }, notifyPatient: { required: false, type: () => Boolean, default: true }, notificationMessage: { required: false, type: () => String }, requireConfirmation: { required: false, type: () => Boolean, default: false }, organizationId: { required: false, type: () => String }, updatedBy: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New appointment start time',
        example: '2025-04-15T09:00:00Z'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Start time is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Start time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New appointment end time',
        example: '2025-04-15T10:00:00Z'
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'End time is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'New provider/doctor for the appointment (if changing provider)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Provider ID must be a valid UUID' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reason for rescheduling',
        example: 'Doctor availability changed'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Reschedule reason must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to notify the patient about the reschedule',
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Notify patient must be a boolean value' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "notifyPatient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Custom notification message to send to the patient',
        example: 'Your appointment has been rescheduled due to unforeseen circumstances.'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.notifyPatient === true),
    (0, class_validator_1.IsString)({ message: 'Notification message must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "notificationMessage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether patient confirmation is required for the rescheduled appointment',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Require confirmation must be a boolean value' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "requireConfirmation", void 0);
exports.RescheduleAppointmentDto = RescheduleAppointmentDto;
//# sourceMappingURL=reschedule-appointment.dto.js.map