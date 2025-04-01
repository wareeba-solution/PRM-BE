var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID, IsString, ValidateIf, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export class RescheduleAppointmentDto {
    constructor() {
        this.notifyPatient = true;
        this.requireConfirmation = false;
    }
}
__decorate([
    ApiProperty({
        description: 'New appointment start time',
        example: '2025-04-15T09:00:00Z'
    }),
    IsNotEmpty({ message: 'Start time is required' }),
    IsDateString({}, { message: 'Start time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "startTime", void 0);
__decorate([
    ApiProperty({
        description: 'New appointment end time',
        example: '2025-04-15T10:00:00Z'
    }),
    IsNotEmpty({ message: 'End time is required' }),
    IsDateString({}, { message: 'End time must be a valid ISO date string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'New provider/doctor for the appointment (if changing provider)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsOptional(),
    IsUUID('4', { message: 'Provider ID must be a valid UUID' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "providerId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Reason for rescheduling',
        example: 'Doctor availability changed'
    }),
    IsOptional(),
    IsString({ message: 'Reschedule reason must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "reason", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether to notify the patient about the reschedule',
        default: true
    }),
    IsOptional(),
    IsBoolean({ message: 'Notify patient must be a boolean value' }),
    Type(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "notifyPatient", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Custom notification message to send to the patient',
        example: 'Your appointment has been rescheduled due to unforeseen circumstances.'
    }),
    IsOptional(),
    ValidateIf(o => o.notifyPatient === true),
    IsString({ message: 'Notification message must be a string' }),
    __metadata("design:type", String)
], RescheduleAppointmentDto.prototype, "notificationMessage", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether patient confirmation is required for the rescheduled appointment',
        default: false
    }),
    IsOptional(),
    IsBoolean({ message: 'Require confirmation must be a boolean value' }),
    Type(() => Boolean),
    __metadata("design:type", Boolean)
], RescheduleAppointmentDto.prototype, "requireConfirmation", void 0);
//# sourceMappingURL=reschedule-appointment.dto.js.map