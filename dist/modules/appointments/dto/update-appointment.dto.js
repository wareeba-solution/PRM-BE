var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsDateString, IsString, IsEnum, IsBoolean, ValidateIf, MinLength, MaxLength, IsArray, } from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';
export class UpdateAppointmentDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Doctor ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Appointment start time' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Appointment end time' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ enum: AppointmentType, description: 'Type of appointment' }),
    IsOptional(),
    IsEnum(AppointmentType),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ enum: AppointmentPriority, description: 'Priority of appointment' }),
    IsOptional(),
    IsEnum(AppointmentPriority),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "priority", void 0);
__decorate([
    ApiPropertyOptional({ enum: AppointmentStatus, description: 'Status of appointment' }),
    IsOptional(),
    IsEnum(AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Title/Subject of appointment' }),
    IsOptional(),
    IsString(),
    MinLength(3),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Detailed description of appointment' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Location of appointment' }),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Meeting link for virtual appointments' }),
    IsOptional(),
    ValidateIf(o => o.type === AppointmentType.VIRTUAL),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "meetingLink", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to send reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateAppointmentDto.prototype, "sendReminders", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Reminder preferences' }),
    IsOptional(),
    Type(() => UpdateReminderPreferencesDto),
    __metadata("design:type", UpdateReminderPreferencesDto)
], UpdateAppointmentDto.prototype, "reminderPreferences", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom form data for appointment' }),
    IsOptional(),
    Type(() => UpdateAppointmentFormDataDto),
    __metadata("design:type", UpdateAppointmentFormDataDto)
], UpdateAppointmentDto.prototype, "formData", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional metadata for appointment' }),
    IsOptional(),
    Type(() => UpdateAppointmentMetadataDto),
    __metadata("design:type", UpdateAppointmentMetadataDto)
], UpdateAppointmentDto.prototype, "metadata", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Cancellation reason' }),
    IsOptional(),
    ValidateIf(o => o.status === AppointmentStatus.CANCELLED),
    IsString(),
    MinLength(3),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "cancellationReason", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Rescheduling reason' }),
    IsOptional(),
    ValidateIf(o => o.status === AppointmentStatus.RESCHEDULED),
    IsString(),
    MinLength(3),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "reschedulingReason", void 0);
export class UpdateReminderPreferencesDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Send email reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Send SMS reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "sms", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Send WhatsApp reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateReminderPreferencesDto.prototype, "whatsapp", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Reminder times in minutes before appointment' }),
    IsOptional(),
    IsArray(),
    Type(() => Number),
    __metadata("design:type", Array)
], UpdateReminderPreferencesDto.prototype, "reminderTimes", void 0);
export class UpdateAppointmentFormDataDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Chief complaint' }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "chiefComplaint", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Symptoms' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentFormDataDto.prototype, "symptoms", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Duration of symptoms' }),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "duration", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional notes' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Diagnosis' }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "diagnosis", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Treatment plan' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "treatmentPlan", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Prescribed medications' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentFormDataDto.prototype, "prescriptions", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Follow-up instructions' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateAppointmentFormDataDto.prototype, "followUpInstructions", void 0);
export class UpdateAppointmentMetadataDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Referral source' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "referralSource", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Insurance information' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "insurance", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom tags' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateAppointmentMetadataDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({ description: 'External reference ID' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "externalId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Follow-up appointment ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "followUpAppointmentId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Previous appointment ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "previousAppointmentId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Billing status' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "billingStatus", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Insurance claim status' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentMetadataDto.prototype, "claimStatus", void 0);
//# sourceMappingURL=update-appointment.dto.js.map