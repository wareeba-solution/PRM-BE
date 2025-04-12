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
exports.AppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Appointment DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class AppointmentDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this appointment belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the patient/contact for this appointment',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the doctor/provider for this appointment',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title or subject of the appointment',
        example: 'Annual Check-up'
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notes or description for the appointment',
        example: 'Regular annual physical examination with blood work',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time of the appointment',
        example: '2023-05-15T10:00:00.000Z',
        format: 'date-time'
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time of the appointment',
        example: '2023-05-15T11:00:00.000Z',
        format: 'date-time'
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the appointment',
        example: 'scheduled',
        enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show']
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of appointment',
        example: 'in-person',
        enum: ['in-person', 'video', 'phone']
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location of the appointment',
        example: 'Main Office - Room 305',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether reminders have been sent',
        example: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], AppointmentDto.prototype, "reminderSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When reminders were last sent',
        example: '2023-05-14T10:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "lastReminderSentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the appointment has been confirmed by the patient',
        example: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], AppointmentDto.prototype, "isConfirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the appointment was confirmed',
        example: '2023-05-14T15:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "confirmedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the appointment has been cancelled',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], AppointmentDto.prototype, "isCancelled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the appointment was cancelled',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who cancelled the appointment',
        example: null,
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "cancelledById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for cancellation',
        example: 'Patient requested rescheduling',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "cancellationReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the appointment has been completed',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], AppointmentDto.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the appointment was marked as completed',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who marked the appointment as completed',
        example: null,
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], AppointmentDto.prototype, "completedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the appointment',
        example: {
            insuranceVerified: true,
            preAppointmentFormCompleted: false,
            specialRequirements: 'Wheelchair access needed'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], AppointmentDto.prototype, "metadata", void 0);
exports.AppointmentDto = AppointmentDto;
//# sourceMappingURL=appointment.dto.js.map