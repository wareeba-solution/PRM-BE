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
import { IsNotEmpty, IsUUID, IsDateString, IsString, IsOptional, IsEnum, IsBoolean, ValidateIf, MinLength, MaxLength, IsArray, } from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
export class CreateAppointmentDto {
}
__decorate([
    ApiProperty({ description: 'Patient/Contact ID' }),
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    ApiProperty({ description: 'Doctor ID' }),
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    ApiProperty({ description: 'Appointment start time', example: '2024-02-10T10:00:00Z' }),
    IsNotEmpty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    ApiProperty({ description: 'Appointment end time', example: '2024-02-10T11:00:00Z' }),
    IsNotEmpty(),
    IsDateString(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    ApiProperty({ enum: AppointmentType, description: 'Type of appointment' }),
    IsNotEmpty(),
    IsEnum(AppointmentType),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ enum: AppointmentPriority, description: 'Priority of appointment' }),
    IsOptional(),
    IsEnum(AppointmentPriority),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "priority", void 0);
__decorate([
    ApiProperty({ description: 'Title/Subject of appointment' }),
    IsNotEmpty(),
    IsString(),
    MinLength(3),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Detailed description of appointment' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Location of appointment' }),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Meeting link for virtual appointments' }),
    ValidateIf(o => o.type === AppointmentType.VIRTUAL),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "meetingLink", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to send reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateAppointmentDto.prototype, "sendReminders", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Reminder preferences' }),
    IsOptional(),
    Type(() => ReminderPreferencesDto),
    __metadata("design:type", ReminderPreferencesDto)
], CreateAppointmentDto.prototype, "reminderPreferences", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom form data for appointment' }),
    IsOptional(),
    Type(() => AppointmentFormDataDto),
    __metadata("design:type", AppointmentFormDataDto)
], CreateAppointmentDto.prototype, "formData", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional metadata for appointment' }),
    IsOptional(),
    Type(() => AppointmentMetadataDto),
    __metadata("design:type", AppointmentMetadataDto)
], CreateAppointmentDto.prototype, "metadata", void 0);
class ReminderPreferencesDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Send email reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Send SMS reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "sms", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Send WhatsApp reminders' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ReminderPreferencesDto.prototype, "whatsapp", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Reminder times in minutes before appointment' }),
    IsOptional(),
    IsArray(),
    Type(() => Number),
    __metadata("design:type", Array)
], ReminderPreferencesDto.prototype, "reminderTimes", void 0);
class AppointmentFormDataDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Chief complaint' }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "chiefComplaint", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Symptoms' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], AppointmentFormDataDto.prototype, "symptoms", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Duration of symptoms' }),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "duration", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional notes' }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], AppointmentFormDataDto.prototype, "notes", void 0);
class AppointmentMetadataDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Referral source' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "referralSource", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Insurance information' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "insurance", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom tags' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], AppointmentMetadataDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({ description: 'External reference ID' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AppointmentMetadataDto.prototype, "externalId", void 0);
//# sourceMappingURL=create-appointment.dto.js.map