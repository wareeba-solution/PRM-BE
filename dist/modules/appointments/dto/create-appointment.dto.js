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
exports.CreateAppointmentDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/create-appointment.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const appointment_type_enum_1 = require("../enums/appointment-type.enum");
const appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
class CreateAppointmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { patientId: { required: true, type: () => String, format: "uuid" }, isRecurring: { required: false, type: () => Boolean }, recurrencePattern: { required: false, type: () => Object }, doctorId: { required: true, type: () => String, format: "uuid" }, startTime: { required: true, type: () => String }, endTime: { required: true, type: () => String }, type: { required: true, enum: require("../enums/appointment-type.enum").AppointmentType }, priority: { required: false, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, title: { required: true, type: () => String, minLength: 3, maxLength: 100 }, description: { required: false, type: () => String, maxLength: 1000 }, location: { required: false, type: () => String, maxLength: 200 }, meetingLink: { required: false, type: () => String, maxLength: 500 }, sendReminders: { required: false, type: () => Boolean }, reminderPreferences: { required: false, type: () => ReminderPreferencesDto }, formData: { required: false, type: () => AppointmentFormDataDto }, metadata: { required: false, type: () => AppointmentMetadataDto } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Patient/Contact ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Doctor ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Appointment start time', example: '2024-02-10T10:00:00Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Appointment end time', example: '2024-02-10T11:00:00Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: appointment_type_enum_1.AppointmentType, description: 'Type of appointment' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(appointment_type_enum_1.AppointmentType),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: appointment_priority_enum_1.AppointmentPriority, description: 'Priority of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointment_priority_enum_1.AppointmentPriority),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title/Subject of appointment' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Detailed description of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Location of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Meeting link for virtual appointments' }),
    (0, class_validator_1.ValidateIf)(o => o.type === appointment_type_enum_1.AppointmentType.VIRTUAL),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "meetingLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to send reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAppointmentDto.prototype, "sendReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reminder preferences' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ReminderPreferencesDto),
    __metadata("design:type", ReminderPreferencesDto)
], CreateAppointmentDto.prototype, "reminderPreferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom form data for appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => AppointmentFormDataDto),
    __metadata("design:type", AppointmentFormDataDto)
], CreateAppointmentDto.prototype, "formData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional metadata for appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => AppointmentMetadataDto),
    __metadata("design:type", AppointmentMetadataDto)
], CreateAppointmentDto.prototype, "metadata", void 0);
exports.CreateAppointmentDto = CreateAppointmentDto;
class ReminderPreferencesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: false, type: () => Boolean }, sms: { required: false, type: () => Boolean }, whatsapp: { required: false, type: () => Boolean }, reminderTimes: { required: false, type: () => [Number] } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send email reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send SMS reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "sms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send WhatsApp reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reminder times in minutes before appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], ReminderPreferencesDto.prototype, "reminderTimes", void 0);
class AppointmentFormDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { chiefComplaint: { required: false, type: () => String, maxLength: 500 }, symptoms: { required: false, type: () => [String] }, duration: { required: false, type: () => String, maxLength: 100 }, notes: { required: false, type: () => String, maxLength: 1000 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Chief complaint' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Symptoms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AppointmentFormDataDto.prototype, "symptoms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Duration of symptoms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "notes", void 0);
class AppointmentMetadataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { referralSource: { required: false, type: () => String }, insurance: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, externalId: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Referral source' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "referralSource", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Insurance information' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "insurance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom tags' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AppointmentMetadataDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'External reference ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "externalId", void 0);
//# sourceMappingURL=create-appointment.dto.js.map