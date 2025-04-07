"use strict";
// src/modules/appointments/dto/reschedule-appointment.dto.ts
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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RescheduleAppointmentDto {
    constructor() {
        this.notifyPatient = true;
        this.requireConfirmation = false;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Start time is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Start time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'End time is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Provider ID must be a valid UUID' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "providerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Reschedule reason must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Notify patient must be a boolean value' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "notifyPatient", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.notifyPatient === true),
    (0, class_validator_1.IsString)({ message: 'Notification message must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "notificationMessage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Require confirmation must be a boolean value' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "requireConfirmation", void 0);
exports.RescheduleAppointmentDto = RescheduleAppointmentDto;
//# sourceMappingURL=reschedule-appointment.dto.js.map