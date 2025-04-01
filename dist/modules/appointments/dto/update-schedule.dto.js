var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsString, IsBoolean, IsOptional, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
class ScheduleSettingsDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Minimum appointment duration in minutes', example: 15 }),
    IsInt(),
    Min(5),
    IsOptional(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "minAppointmentDuration", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Appointment buffer time in minutes', example: 5 }),
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "appointmentBuffer", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Max appointments per day', example: 20 }),
    IsInt(),
    Min(1),
    IsOptional(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "maxAppointmentsPerDay", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Preferred appointment duration in minutes', example: 30 }),
    IsInt(),
    Min(5),
    IsOptional(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "preferredDuration", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to allow online booking', example: true }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], ScheduleSettingsDto.prototype, "allowOnlineBooking", void 0);
__decorate([
    ApiPropertyOptional({ description: 'How many days in advance appointment can be booked', example: 30 }),
    IsInt(),
    Min(1),
    IsOptional(),
    __metadata("design:type", Number)
], ScheduleSettingsDto.prototype, "advanceBookingDays", void 0);
export class UpdateScheduleDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Day of week (0=Sunday, 1=Monday, etc.)', example: 1 }),
    IsInt(),
    Min(0),
    Max(6),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "dayOfWeek", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Work start time', example: '09:00' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "workStart", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Work end time', example: '17:00' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "workEnd", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Break start time', example: '12:00' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "breakStart", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Break end time', example: '13:00' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "breakEnd", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Default appointment duration in minutes', example: 30 }),
    IsInt(),
    Min(5),
    IsOptional(),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "defaultAppointmentDuration", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Is this schedule active', default: true }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], UpdateScheduleDto.prototype, "isActive", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional schedule settings', type: ScheduleSettingsDto }),
    ValidateNested(),
    Type(() => ScheduleSettingsDto),
    IsOptional(),
    __metadata("design:type", ScheduleSettingsDto)
], UpdateScheduleDto.prototype, "settings", void 0);
//# sourceMappingURL=update-schedule.dto.js.map