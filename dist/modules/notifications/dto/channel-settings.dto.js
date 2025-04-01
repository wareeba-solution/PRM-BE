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
import { IsOptional, IsArray, IsString, IsBoolean, IsEmail, IsPhoneNumber, IsEnum, ValidateNested, IsUrl, MaxLength, ArrayMaxSize, IsNumber, Min, Max, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
export class WebhookRetryConfigDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Maximum number of retry attempts' }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Max(5),
    __metadata("design:type", Number)
], WebhookRetryConfigDto.prototype, "maxAttempts", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Delay between retry attempts in seconds' }),
    IsOptional(),
    IsNumber(),
    Min(1),
    Max(300),
    __metadata("design:type", Number)
], WebhookRetryConfigDto.prototype, "retryDelay", void 0);
export class WebhookSettingsDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Webhook URL' }),
    IsOptional(),
    IsUrl(),
    __metadata("design:type", String)
], WebhookSettingsDto.prototype, "url", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Secret key for webhook authentication' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], WebhookSettingsDto.prototype, "secret", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom headers for webhook requests' }),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], WebhookSettingsDto.prototype, "headers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Retry configuration for failed webhooks' }),
    IsOptional(),
    ValidateNested(),
    Type(() => WebhookRetryConfigDto),
    __metadata("design:type", WebhookRetryConfigDto)
], WebhookSettingsDto.prototype, "retryConfig", void 0);
export class EmailSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'List of email addresses' }),
    IsOptional(),
    IsArray(),
    IsEmail({}, { each: true }),
    ArrayMaxSize(5),
    __metadata("design:type", Array)
], EmailSettingsDto.prototype, "addresses", void 0);
__decorate([
    ApiPropertyOptional({ enum: ['HTML', 'TEXT'], description: 'Email format preference' }),
    IsOptional(),
    IsEnum(['HTML', 'TEXT']),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "format", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to include attachments in email notifications' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], EmailSettingsDto.prototype, "includeAttachments", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom email template ID' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "templateId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Email signature' }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], EmailSettingsDto.prototype, "signature", void 0);
export class SmsSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'List of phone numbers' }),
    IsOptional(),
    IsArray(),
    IsPhoneNumber(undefined, { each: true }),
    ArrayMaxSize(3),
    __metadata("design:type", Array)
], SmsSettingsDto.prototype, "phoneNumbers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to include media in SMS' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], SmsSettingsDto.prototype, "includeMedia", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Preferred SMS provider' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SmsSettingsDto.prototype, "provider", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to use URL shortening in SMS' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], SmsSettingsDto.prototype, "useUrlShortening", void 0);
export class PushSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'Device tokens for push notifications' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(10),
    __metadata("design:type", Array)
], PushSettingsDto.prototype, "deviceTokens", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to play sound with push notifications' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "sound", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to show badge count' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "badge", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to use rich notifications' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], PushSettingsDto.prototype, "useRichNotifications", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom notification sound name' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PushSettingsDto.prototype, "soundName", void 0);
export class InAppSettingsDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Whether to show badge count' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "showBadge", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to play sound' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "playSound", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to mark as read when opened' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "markAsRead", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to show desktop notifications' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], InAppSettingsDto.prototype, "showDesktopNotifications", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Maximum number of unread notifications to show' }),
    IsOptional(),
    IsNumber(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], InAppSettingsDto.prototype, "maxUnreadCount", void 0);
export class WhatsappSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'WhatsApp numbers' }),
    IsOptional(),
    IsArray(),
    IsPhoneNumber(undefined, { each: true }),
    ArrayMaxSize(2),
    __metadata("design:type", Array)
], WhatsappSettingsDto.prototype, "numbers", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to allow media messages' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], WhatsappSettingsDto.prototype, "allowMedia", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Language preference for WhatsApp messages' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], WhatsappSettingsDto.prototype, "language", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Template namespace for business accounts' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], WhatsappSettingsDto.prototype, "templateNamespace", void 0);
export class SlackSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'Slack channel names' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(5),
    __metadata("design:type", Array)
], SlackSettingsDto.prototype, "channels", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to mention user in messages' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], SlackSettingsDto.prototype, "mentionUser", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Slack workspace ID' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SlackSettingsDto.prototype, "workspaceId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Use thread replies for updates' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], SlackSettingsDto.prototype, "useThreads", void 0);
export class TeamsSettingsDto {
}
__decorate([
    ApiPropertyOptional({ type: [String], description: 'Teams channel IDs' }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(5),
    __metadata("design:type", Array)
], TeamsSettingsDto.prototype, "channelIds", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to use adaptive cards' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TeamsSettingsDto.prototype, "useAdaptiveCards", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to show user mentions' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], TeamsSettingsDto.prototype, "showMentions", void 0);
export class ChannelSettingsDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => EmailSettingsDto),
    __metadata("design:type", EmailSettingsDto)
], ChannelSettingsDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => SmsSettingsDto),
    __metadata("design:type", SmsSettingsDto)
], ChannelSettingsDto.prototype, "sms", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => PushSettingsDto),
    __metadata("design:type", PushSettingsDto)
], ChannelSettingsDto.prototype, "push", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => InAppSettingsDto),
    __metadata("design:type", InAppSettingsDto)
], ChannelSettingsDto.prototype, "inApp", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => WhatsappSettingsDto),
    __metadata("design:type", WhatsappSettingsDto)
], ChannelSettingsDto.prototype, "whatsapp", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => SlackSettingsDto),
    __metadata("design:type", SlackSettingsDto)
], ChannelSettingsDto.prototype, "slack", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => TeamsSettingsDto),
    __metadata("design:type", TeamsSettingsDto)
], ChannelSettingsDto.prototype, "teams", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => WebhookSettingsDto),
    __metadata("design:type", WebhookSettingsDto)
], ChannelSettingsDto.prototype, "webhook", void 0);
//# sourceMappingURL=channel-settings.dto.js.map