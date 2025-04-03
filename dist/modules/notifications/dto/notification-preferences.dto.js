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
exports.UpdateNotificationPreferenceDto = exports.CreateNotificationPreferenceDto = exports.NotificationPreferencesDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const notification_preference_entity_1 = require("../entities/notification-preference.entity");
const channel_settings_dto_1 = require("./channel-settings.dto");
class NotificationPreferencesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: true, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true }, frequency: { required: true, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: () => Boolean }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, workDays: { required: false, type: () => [String] }, customSchedule: { required: false, type: () => ({ days: { required: true, type: () => [String] }, times: { required: true, type: () => [String] }, timezone: { required: true, type: () => String } }) }, channelSpecificSettings: { required: false, type: () => require("./channel-settings.dto").ChannelSettingsDto }, filters: { required: false, type: () => ({ priority: { required: false, type: () => [String] }, status: { required: false, type: () => [String] }, types: { required: false, type: () => [String] }, senders: { required: false, type: () => [String] }, keywords: { required: false, type: () => [String] }, excludeKeywords: { required: false, type: () => [String] } }) }, importanceThreshold: { required: false, type: () => Number }, muteAll: { required: false, type: () => Boolean }, muteUntil: { required: false, type: () => Date }, digestSettings: { required: false, type: () => ({ groupBy: { required: false, type: () => [String] }, sortBy: { required: false, type: () => String }, maxItems: { required: false, type: () => Number }, format: { required: false, type: () => String } }) }, allowReminders: { required: false, type: () => Boolean }, reminderInterval: { required: false, type: () => Number }, maxReminders: { required: false, type: () => Number }, enabledChannels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: notification_preference_entity_1.NotificationChannel,
        isArray: true,
        default: [notification_preference_entity_1.NotificationChannel.EMAIL, notification_preference_entity_1.NotificationChannel.IN_APP],
        description: 'Enabled notification channels'
    }),
    __metadata("design:type", Array)
], NotificationPreferencesDto.prototype, "enabledChannels", void 0);
exports.NotificationPreferencesDto = NotificationPreferencesDto;
class CreateNotificationPreferenceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: true, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: true, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true, minItems: 1 }, frequency: { required: true, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: () => Boolean }, startTime: { required: false, type: () => String, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, endTime: { required: false, type: () => String, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, workDays: { required: false, type: () => [String] }, customSchedule: { required: false, type: () => ({ days: { required: true, type: () => [String] }, times: { required: true, type: () => [String] }, timezone: { required: true, type: () => String } }) }, channelSpecificSettings: { required: false, type: () => require("./channel-settings.dto").ChannelSettingsDto }, filters: { required: false, type: () => ({ priority: { required: false, type: () => [String] }, status: { required: false, type: () => [String] }, types: { required: false, type: () => [String] }, senders: { required: false, type: () => [String] }, keywords: { required: false, type: () => [String] }, excludeKeywords: { required: false, type: () => [String] } }) }, importanceThreshold: { required: false, type: () => Number, minimum: 0, maximum: 100 }, muteAll: { required: false, type: () => Boolean }, muteUntil: { required: false, type: () => Date }, digestSettings: { required: false, type: () => ({ groupBy: { required: false, type: () => [String] }, sortBy: { required: false, type: () => String }, maxItems: { required: false, type: () => Number }, format: { required: false, type: () => String } }) }, allowReminders: { required: false, type: () => Boolean }, reminderInterval: { required: false, type: () => Number, minimum: 1 }, maxReminders: { required: false, type: () => Number, minimum: 0, maximum: 10 }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationCategory }),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateNotificationPreferenceDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_preference_entity_1.NotificationFrequency }),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationFrequency),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], CreateNotificationPreferenceDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateNotificationPreferenceDto.prototype, "workDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomScheduleDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "customSchedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => channel_settings_dto_1.ChannelSettingsDto),
    __metadata("design:type", channel_settings_dto_1.ChannelSettingsDto)
], CreateNotificationPreferenceDto.prototype, "channelSpecificSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationFiltersDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "importanceThreshold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "muteAll", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateNotificationPreferenceDto.prototype, "muteUntil", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DigestSettingsDto),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "digestSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationPreferenceDto.prototype, "allowReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "reminderInterval", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreateNotificationPreferenceDto.prototype, "maxReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateNotificationPreferenceDto.prototype, "metadata", void 0);
exports.CreateNotificationPreferenceDto = CreateNotificationPreferenceDto;
// Supporting DTOs for nested validation
class CustomScheduleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { days: { required: true, type: () => [String] }, times: { required: true, type: () => [String], pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, timezone: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CustomScheduleDto.prototype, "days", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Times must be in HH:mm format',
        each: true
    }),
    __metadata("design:type", Array)
], CustomScheduleDto.prototype, "times", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomScheduleDto.prototype, "timezone", void 0);
class NotificationFiltersDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { priority: { required: false, type: () => [String] }, status: { required: false, type: () => [String] }, types: { required: false, type: () => [String] }, senders: { required: false, type: () => [String] }, keywords: { required: false, type: () => [String] }, excludeKeywords: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "types", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "senders", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "keywords", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], NotificationFiltersDto.prototype, "excludeKeywords", void 0);
class DigestSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { groupBy: { required: false, type: () => [String] }, sortBy: { required: false, type: () => String }, maxItems: { required: false, type: () => Number, minimum: 1 }, format: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DigestSettingsDto.prototype, "groupBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DigestSettingsDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], DigestSettingsDto.prototype, "maxItems", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DigestSettingsDto.prototype, "format", void 0);
class UpdateNotificationPreferenceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: false, enum: require("../entities/notification-preference.entity").NotificationCategory }, channels: { required: false, enum: require("../entities/notification-preference.entity").NotificationChannel, isArray: true }, frequency: { required: false, enum: require("../entities/notification-preference.entity").NotificationFrequency }, enabled: { required: false, type: () => Boolean }, startTime: { required: false, type: () => String, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, endTime: { required: false, type: () => String, pattern: "/^([01]\\d|2[0-3]):([0-5]\\d)$/" }, workDays: { required: false, type: () => [String] }, customSchedule: { required: false, type: () => ({ days: { required: true, type: () => [String] }, times: { required: true, type: () => [String] }, timezone: { required: true, type: () => String } }) }, channelSpecificSettings: { required: false, type: () => require("./channel-settings.dto").ChannelSettingsDto }, filters: { required: false, type: () => ({ priority: { required: false, type: () => [String] }, status: { required: false, type: () => [String] }, types: { required: false, type: () => [String] }, senders: { required: false, type: () => [String] }, keywords: { required: false, type: () => [String] }, excludeKeywords: { required: false, type: () => [String] } }) }, importanceThreshold: { required: false, type: () => Number, minimum: 0, maximum: 100 }, muteAll: { required: false, type: () => Boolean }, muteUntil: { required: false, type: () => Date }, digestSettings: { required: false, type: () => ({ groupBy: { required: false, type: () => [String] }, sortBy: { required: false, type: () => String }, maxItems: { required: false, type: () => Number }, format: { required: false, type: () => String } }) }, allowReminders: { required: false, type: () => Boolean }, reminderInterval: { required: false, type: () => Number, minimum: 1 }, maxReminders: { required: false, type: () => Number, minimum: 0, maximum: 10 }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationCategory }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationCategory),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationChannel, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], UpdateNotificationPreferenceDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_preference_entity_1.NotificationFrequency }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(notification_preference_entity_1.NotificationFrequency),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    }),
    __metadata("design:type", String)
], UpdateNotificationPreferenceDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateNotificationPreferenceDto.prototype, "workDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomScheduleDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "customSchedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => channel_settings_dto_1.ChannelSettingsDto),
    __metadata("design:type", channel_settings_dto_1.ChannelSettingsDto)
], UpdateNotificationPreferenceDto.prototype, "channelSpecificSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationFiltersDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "importanceThreshold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "muteAll", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateNotificationPreferenceDto.prototype, "muteUntil", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DigestSettingsDto),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "digestSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationPreferenceDto.prototype, "allowReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "reminderInterval", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], UpdateNotificationPreferenceDto.prototype, "maxReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateNotificationPreferenceDto.prototype, "metadata", void 0);
exports.UpdateNotificationPreferenceDto = UpdateNotificationPreferenceDto;
//# sourceMappingURL=notification-preferences.dto.js.map