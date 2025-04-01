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
import { IsEnum, IsBoolean, IsOptional, IsString, IsArray, IsInt, Min, Max, ValidateNested, IsDateString, IsObject, Matches, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel, NotificationCategory, NotificationFrequency } from '../entities/notification-preference.entity';
import { ChannelSettingsDto } from './channel-settings.dto';
export class NotificationPreferencesDto {
}
__decorate([
    ApiProperty({
        enum: NotificationChannel,
        isArray: true,
        default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
        description: 'Enabled notification channels'
    }),
    __metadata("design:type", Array)
], NotificationPreferencesDto.prototype, "enabledChannels", void 0);
export class CreateNotificationPreferenceDto {
}
__decorate([
    ApiProperty({ enum: NotificationCategory }),
    IsEnum(NotificationCategory),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "category", void 0);
__decorate([
    ApiProperty({ enum: NotificationChannel, isArray: true }),
    IsArray(),
    IsEnum(NotificationChannel, { each: true }),
    ArrayMinSize(1),
    __metadata("design:type", Array)
], CreateNotificationPreferenceDto.prototype, "channels", void 0);
__decorate([
    ApiProperty({ enum: NotificationFrequency }),
    IsEnum(NotificationFrequency),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "frequency", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "enabled", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateNotificationPreferenceDto.prototype, "workDays", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => CustomScheduleDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "customSchedule", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => ChannelSettingsDto),
    __metadata("design:type", ChannelSettingsDto)
], CreateNotificationPreferenceDto.prototype, "channelSpecificSettings", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => NotificationFiltersDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "filters", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "importanceThreshold", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "muteAll", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Date)
], CreateNotificationPreferenceDto.prototype, "muteUntil", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => DigestSettingsDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "digestSettings", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "allowReminders", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "reminderInterval", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(10),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "maxReminders", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "metadata", void 0);
class CustomScheduleDto {
}
__decorate([
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CustomScheduleDto.prototype, "days", void 0);
__decorate([
    IsArray(),
    IsString({ each: true }),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Times must be in HH:mm format',
        each: true
    }),
    __metadata("design:type", Array)
], CustomScheduleDto.prototype, "times", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], CustomScheduleDto.prototype, "timezone", void 0);
class NotificationFiltersDto {
}
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "priority", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "types", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "senders", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "keywords", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "excludeKeywords", void 0);
class DigestSettingsDto {
}
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], DigestSettingsDto.prototype, "groupBy", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], DigestSettingsDto.prototype, "sortBy", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], DigestSettingsDto.prototype, "maxItems", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], DigestSettingsDto.prototype, "format", void 0);
export class UpdateNotificationPreferenceDto {
}
__decorate([
    ApiPropertyOptional({ enum: NotificationCategory }),
    IsOptional(),
    IsEnum(NotificationCategory),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "category", void 0);
__decorate([
    ApiPropertyOptional({ enum: NotificationChannel, isArray: true }),
    IsOptional(),
    IsArray(),
    IsEnum(NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], UpdateNotificationPreferenceDto.prototype, "channels", void 0);
__decorate([
    ApiPropertyOptional({ enum: NotificationFrequency }),
    IsOptional(),
    IsEnum(NotificationFrequency),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "frequency", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "enabled", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({ type: [String] }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateNotificationPreferenceDto.prototype, "workDays", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => CustomScheduleDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "customSchedule", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => ChannelSettingsDto),
    __metadata("design:type", ChannelSettingsDto)
], UpdateNotificationPreferenceDto.prototype, "channelSpecificSettings", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => NotificationFiltersDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "filters", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "importanceThreshold", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "muteAll", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Date)
], UpdateNotificationPreferenceDto.prototype, "muteUntil", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    ValidateNested(),
    Type(() => DigestSettingsDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "digestSettings", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "allowReminders", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "reminderInterval", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    Max(10),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "maxReminders", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "metadata", void 0);
//# sourceMappingURL=notification-preferences.dto.js.map