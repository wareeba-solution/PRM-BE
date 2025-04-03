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
exports.UpdateAppointmentMetadataDto = exports.UpdateAppointmentFormDataDto = exports.UpdateReminderPreferencesDto = exports.UpdateAppointmentDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/update-appointment.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const appointment_type_enum_1 = require("../enums/appointment-type.enum");
const appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
const appointment_status_enum_1 = require("../enums/appointment-status.enum");
class UpdateAppointmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { doctorId: { required: false, type: () => String, format: "uuid" }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, type: { required: false, enum: require("../enums/appointment-type.enum").AppointmentType }, priority: { required: false, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, status: { required: false, enum: require("../enums/appointment-status.enum").AppointmentStatus }, title: { required: false, type: () => String, minLength: 3, maxLength: 100 }, description: { required: false, type: () => String, maxLength: 1000 }, location: { required: false, type: () => String, maxLength: 200 }, meetingLink: { required: false, type: () => String, maxLength: 500 }, sendReminders: { required: false, type: () => Boolean }, reminderPreferences: { required: false, type: () => require("./update-appointment.dto").UpdateReminderPreferencesDto }, formData: { required: false, type: () => require("./update-appointment.dto").UpdateAppointmentFormDataDto }, metadata: { required: false, type: () => require("./update-appointment.dto").UpdateAppointmentMetadataDto }, cancellationReason: { required: false, type: () => String, minLength: 3, maxLength: 500 }, reschedulingReason: { required: false, type: () => String, minLength: 3, maxLength: 500 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Doctor ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Appointment start time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Appointment end time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: appointment_type_enum_1.AppointmentType, description: 'Type of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointment_type_enum_1.AppointmentType),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: appointment_priority_enum_1.AppointmentPriority, description: 'Priority of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointment_priority_enum_1.AppointmentPriority),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: appointment_status_enum_1.AppointmentStatus, description: 'Status of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointment_status_enum_1.AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Title/Subject of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Detailed description of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Location of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Meeting link for virtual appointments' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.type === appointment_type_enum_1.AppointmentType.VIRTUAL),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "meetingLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to send reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAppointmentDto.prototype, "sendReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reminder preferences' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => UpdateReminderPreferencesDto),
    __metadata("design:type", UpdateReminderPreferencesDto)
], UpdateAppointmentDto.prototype, "reminderPreferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom form data for appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => UpdateAppointmentFormDataDto),
    __metadata("design:type", UpdateAppointmentFormDataDto)
], UpdateAppointmentDto.prototype, "formData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional metadata for appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => UpdateAppointmentMetadataDto),
    __metadata("design:type", UpdateAppointmentMetadataDto)
], UpdateAppointmentDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cancellation reason' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.status === appointment_status_enum_1.AppointmentStatus.CANCELLED),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "cancellationReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Rescheduling reason' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.status === appointment_status_enum_1.AppointmentStatus.RESCHEDULED),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "reschedulingReason", void 0);
exports.UpdateAppointmentDto = UpdateAppointmentDto;
class UpdateReminderPreferencesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: false, type: () => Boolean }, sms: { required: false, type: () => Boolean }, whatsapp: { required: false, type: () => Boolean }, reminderTimes: { required: false, type: () => [Number] } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send email reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send SMS reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "sms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Send WhatsApp reminders' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reminder times in minutes before appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UpdateReminderPreferencesDto.prototype, "reminderTimes", void 0);
exports.UpdateReminderPreferencesDto = UpdateReminderPreferencesDto;
class UpdateAppointmentFormDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { chiefComplaint: { required: false, type: () => String, maxLength: 500 }, symptoms: { required: false, type: () => [String] }, duration: { required: false, type: () => String, maxLength: 100 }, notes: { required: false, type: () => String, maxLength: 1000 }, diagnosis: { required: false, type: () => String, maxLength: 500 }, treatmentPlan: { required: false, type: () => String, maxLength: 1000 }, prescriptions: { required: false, type: () => [String] }, followUpInstructions: { required: false, type: () => String, maxLength: 1000 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Chief complaint' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "chiefComplaint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Symptoms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentFormDataDto.prototype, "symptoms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Duration of symptoms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Diagnosis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Treatment plan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "treatmentPlan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Prescribed medications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentFormDataDto.prototype, "prescriptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Follow-up instructions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "followUpInstructions", void 0);
exports.UpdateAppointmentFormDataDto = UpdateAppointmentFormDataDto;
class UpdateAppointmentMetadataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { referralSource: { required: false, type: () => String }, insurance: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, externalId: { required: false, type: () => String }, followUpAppointmentId: { required: false, type: () => String, format: "uuid" }, previousAppointmentId: { required: false, type: () => String, format: "uuid" }, billingStatus: { required: false, type: () => String }, claimStatus: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Referral source' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "referralSource", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Insurance information' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "insurance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom tags' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentMetadataDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'External reference ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Follow-up appointment ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "followUpAppointmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Previous appointment ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "previousAppointmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Billing status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "billingStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Insurance claim status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "claimStatus", void 0);
exports.UpdateAppointmentMetadataDto = UpdateAppointmentMetadataDto;
//# sourceMappingURL=update-appointment.dto.js.map