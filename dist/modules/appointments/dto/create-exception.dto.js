var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsUUID, IsString, IsBoolean, IsOptional, IsEnum, IsISO8601 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var ScheduleExceptionType;
(function (ScheduleExceptionType) {
    ScheduleExceptionType["VACATION"] = "VACATION";
    ScheduleExceptionType["SICK_LEAVE"] = "SICK_LEAVE";
    ScheduleExceptionType["CONFERENCE"] = "CONFERENCE";
    ScheduleExceptionType["PERSONAL"] = "PERSONAL";
    ScheduleExceptionType["OTHER"] = "OTHER";
})(ScheduleExceptionType || (ScheduleExceptionType = {}));
export class CreateExceptionDto {
}
__decorate([
    ApiProperty({ description: 'Doctor ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    IsUUID(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "doctorId", void 0);
__decorate([
    ApiProperty({
        description: 'Start date of the exception',
        example: '2023-06-15',
        type: String,
    }),
    IsISO8601(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startDate", void 0);
__decorate([
    ApiProperty({
        description: 'End date of the exception',
        example: '2023-06-20',
        type: String,
    }),
    IsISO8601(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Start time for partial day exceptions (optional)',
        example: '09:00',
        type: String,
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'End time for partial day exceptions (optional)',
        example: '12:00',
        type: String,
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "endTime", void 0);
__decorate([
    ApiProperty({
        description: 'Whether this is a full day exception',
        example: true,
        default: false,
    }),
    IsBoolean(),
    IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateExceptionDto.prototype, "isFullDay", void 0);
__decorate([
    ApiProperty({
        description: 'Type of exception',
        enum: ScheduleExceptionType,
        example: ScheduleExceptionType.VACATION,
    }),
    IsEnum(ScheduleExceptionType),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional details or reason for the exception',
        example: 'Annual family vacation',
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateExceptionDto.prototype, "reason", void 0);
//# sourceMappingURL=create-exception.dto.js.map