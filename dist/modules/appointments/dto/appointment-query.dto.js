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
import { IsEnum, IsOptional, IsUUID, IsDate, IsString, IsBoolean, IsInt, Min, Max, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
export var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "SCHEDULED";
    AppointmentStatus["CONFIRMED"] = "CONFIRMED";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
    AppointmentStatus["NO_SHOW"] = "NO_SHOW";
})(AppointmentStatus || (AppointmentStatus = {}));
export class AppointmentQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'startTime';
        this.sortOrder = 'ASC';
    }
}
__decorate([
    ApiPropertyOptional({ description: 'Page number (pagination)', default: 1 }),
    IsOptional(),
    IsInt(),
    Min(1),
    Type(() => Number),
    __metadata("design:type", Number)
], AppointmentQueryDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Number of items per page', default: 10 }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    Type(() => Number),
    __metadata("design:type", Number)
], AppointmentQueryDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Doctor/Provider ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "doctorId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Provider ID (alias for doctorId)' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "providerId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Patient ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "patientId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by status', enum: AppointmentStatus, isArray: true }),
    IsOptional(),
    IsArray(),
    IsEnum(AppointmentStatus, { each: true }),
    Transform(({ value }) => (Array.isArray(value) ? value : [value].filter(Boolean))),
    __metadata("design:type", Array)
], AppointmentQueryDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Start date for range query' }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], AppointmentQueryDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'End date for range query' }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], AppointmentQueryDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Search term for appointment title, notes, etc.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter for upcoming appointments only' }),
    IsOptional(),
    IsBoolean(),
    Transform(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], AppointmentQueryDto.prototype, "upcoming", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter for past appointments only' }),
    IsOptional(),
    IsBoolean(),
    Transform(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], AppointmentQueryDto.prototype, "past", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter for today\'s appointments only' }),
    IsOptional(),
    IsBoolean(),
    Transform(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], AppointmentQueryDto.prototype, "today", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sort field (e.g. startTime, createdAt)' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "sortBy", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Sort order (ASC or DESC)' }),
    IsOptional(),
    IsEnum(['ASC', 'DESC']),
    __metadata("design:type", String)
], AppointmentQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=appointment-query.dto.js.map