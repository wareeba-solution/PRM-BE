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
exports.ChannelSettingsDto = exports.TeamsSettingsDto = exports.SlackSettingsDto = exports.WhatsappSettingsDto = exports.InAppSettingsDto = exports.PushSettingsDto = exports.SmsSettingsDto = exports.EmailSettingsDto = exports.WebhookSettingsDto = exports.WebhookRetryConfigDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/channel-settings.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class WebhookRetryConfigDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { maxAttempts: { required: false, type: () => Number, minimum: 0, maximum: 5 }, retryDelay: { required: false, type: () => Number, minimum: 1, maximum: 300 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of retry attempts' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], WebhookRetryConfigDto.prototype, "maxAttempts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Delay between retry attempts in seconds' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], WebhookRetryConfigDto.prototype, "retryDelay", void 0);
exports.WebhookRetryConfigDto = WebhookRetryConfigDto;
class WebhookSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: false, type: () => String, format: "uri" }, secret: { required: false, type: () => String }, headers: { required: false, type: () => Object }, retryConfig: { required: false, type: () => require("./channel-settings.dto").WebhookRetryConfigDto } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Webhook URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], WebhookSettingsDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Secret key for webhook authentication' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WebhookSettingsDto.prototype, "secret", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom headers for webhook requests' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], WebhookSettingsDto.prototype, "headers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Retry configuration for failed webhooks' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WebhookRetryConfigDto),
    __metadata("design:type", WebhookRetryConfigDto)
], WebhookSettingsDto.prototype, "retryConfig", void 0);
exports.WebhookSettingsDto = WebhookSettingsDto;
class EmailSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { addresses: { required: false, type: () => [String], format: "email", maxItems: 5 }, format: { required: false, type: () => Object }, includeAttachments: { required: false, type: () => Boolean }, templateId: { required: false, type: () => String }, signature: { required: false, type: () => String, maxLength: 500 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'List of email addresses' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(5),
    __metadata("design:type", Array)
], EmailSettingsDto.prototype, "addresses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['HTML', 'TEXT'], description: 'Email format preference' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['HTML', 'TEXT']),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to include attachments in email notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EmailSettingsDto.prototype, "includeAttachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom email template ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email signature' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "signature", void 0);
exports.EmailSettingsDto = EmailSettingsDto;
class SmsSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { phoneNumbers: { required: false, type: () => [String], maxItems: 3 }, includeMedia: { required: false, type: () => Boolean }, provider: { required: false, type: () => String }, useUrlShortening: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'List of phone numbers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(3),
    __metadata("design:type", Array)
], SmsSettingsDto.prototype, "phoneNumbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to include media in SMS' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SmsSettingsDto.prototype, "includeMedia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Preferred SMS provider' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SmsSettingsDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use URL shortening in SMS' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SmsSettingsDto.prototype, "useUrlShortening", void 0);
exports.SmsSettingsDto = SmsSettingsDto;
class PushSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { deviceTokens: { required: false, type: () => [String], maxItems: 10 }, sound: { required: false, type: () => Boolean }, badge: { required: false, type: () => Boolean }, useRichNotifications: { required: false, type: () => Boolean }, soundName: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Device tokens for push notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(10),
    __metadata("design:type", Array)
], PushSettingsDto.prototype, "deviceTokens", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to play sound with push notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "sound", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show badge count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use rich notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "useRichNotifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom notification sound name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PushSettingsDto.prototype, "soundName", void 0);
exports.PushSettingsDto = PushSettingsDto;
class InAppSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { showBadge: { required: false, type: () => Boolean }, playSound: { required: false, type: () => Boolean }, markAsRead: { required: false, type: () => Boolean }, showDesktopNotifications: { required: false, type: () => Boolean }, maxUnreadCount: { required: false, type: () => Number, minimum: 1, maximum: 100 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show badge count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "showBadge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to play sound' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "playSound", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to mark as read when opened' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "markAsRead", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show desktop notifications' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "showDesktopNotifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of unread notifications to show' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], InAppSettingsDto.prototype, "maxUnreadCount", void 0);
exports.InAppSettingsDto = InAppSettingsDto;
class WhatsappSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { numbers: { required: false, type: () => [String], maxItems: 2 }, allowMedia: { required: false, type: () => Boolean }, language: { required: false, type: () => String }, templateNamespace: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'WhatsApp numbers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(2),
    __metadata("design:type", Array)
], WhatsappSettingsDto.prototype, "numbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to allow media messages' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], WhatsappSettingsDto.prototype, "allowMedia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Language preference for WhatsApp messages' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WhatsappSettingsDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template namespace for business accounts' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WhatsappSettingsDto.prototype, "templateNamespace", void 0);
exports.WhatsappSettingsDto = WhatsappSettingsDto;
class SlackSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { channels: { required: false, type: () => [String], maxItems: 5 }, mentionUser: { required: false, type: () => Boolean }, workspaceId: { required: false, type: () => String }, useThreads: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Slack channel names' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(5),
    __metadata("design:type", Array)
], SlackSettingsDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to mention user in messages' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlackSettingsDto.prototype, "mentionUser", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Slack workspace ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlackSettingsDto.prototype, "workspaceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Use thread replies for updates' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SlackSettingsDto.prototype, "useThreads", void 0);
exports.SlackSettingsDto = SlackSettingsDto;
class TeamsSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { channelIds: { required: false, type: () => [String], maxItems: 5 }, useAdaptiveCards: { required: false, type: () => Boolean }, showMentions: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Teams channel IDs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMaxSize)(5),
    __metadata("design:type", Array)
], TeamsSettingsDto.prototype, "channelIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use adaptive cards' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TeamsSettingsDto.prototype, "useAdaptiveCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to show user mentions' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TeamsSettingsDto.prototype, "showMentions", void 0);
exports.TeamsSettingsDto = TeamsSettingsDto;
class ChannelSettingsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: false, type: () => require("./channel-settings.dto").EmailSettingsDto }, sms: { required: false, type: () => require("./channel-settings.dto").SmsSettingsDto }, push: { required: false, type: () => require("./channel-settings.dto").PushSettingsDto }, inApp: { required: false, type: () => require("./channel-settings.dto").InAppSettingsDto }, whatsapp: { required: false, type: () => require("./channel-settings.dto").WhatsappSettingsDto }, slack: { required: false, type: () => require("./channel-settings.dto").SlackSettingsDto }, teams: { required: false, type: () => require("./channel-settings.dto").TeamsSettingsDto }, webhook: { required: false, type: () => require("./channel-settings.dto").WebhookSettingsDto } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EmailSettingsDto),
    __metadata("design:type", EmailSettingsDto)
], ChannelSettingsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SmsSettingsDto),
    __metadata("design:type", SmsSettingsDto)
], ChannelSettingsDto.prototype, "sms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PushSettingsDto),
    __metadata("design:type", PushSettingsDto)
], ChannelSettingsDto.prototype, "push", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => InAppSettingsDto),
    __metadata("design:type", InAppSettingsDto)
], ChannelSettingsDto.prototype, "inApp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WhatsappSettingsDto),
    __metadata("design:type", WhatsappSettingsDto)
], ChannelSettingsDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlackSettingsDto),
    __metadata("design:type", SlackSettingsDto)
], ChannelSettingsDto.prototype, "slack", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TeamsSettingsDto),
    __metadata("design:type", TeamsSettingsDto)
], ChannelSettingsDto.prototype, "teams", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WebhookSettingsDto),
    __metadata("design:type", WebhookSettingsDto)
], ChannelSettingsDto.prototype, "webhook", void 0);
exports.ChannelSettingsDto = ChannelSettingsDto;
//# sourceMappingURL=channel-settings.dto.js.map