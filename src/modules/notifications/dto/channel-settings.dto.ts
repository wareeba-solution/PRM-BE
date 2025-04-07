// src/modules/notifications/dto/channel-settings.dto.ts

import {
    IsOptional,
    IsArray,
    IsString,
    IsBoolean,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
    ValidateNested,
    IsUrl,
    MaxLength,
    ArrayMaxSize,
    IsNumber,
    Min,
    Max,
    IsObject
} from 'class-validator';
import { Type } from 'class-transformer';

export class WebhookRetryConfigDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    maxAttempts?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(300)
    retryDelay?: number;
}

export class WebhookSettingsDto {
    @IsOptional()
    @IsUrl()
    url?: string;

    @IsOptional()
    @IsString()
    secret?: string;

    @IsOptional()
    @IsObject()
    headers?: Record<string, string>;

    @IsOptional()
    @ValidateNested()
    @Type(() => WebhookRetryConfigDto)
    retryConfig?: WebhookRetryConfigDto;
}

export class EmailSettingsDto {
    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    @ArrayMaxSize(5)
    addresses?: string[];

    @IsOptional()
    @IsEnum(['HTML', 'TEXT'])
    format?: 'HTML' | 'TEXT';

    @IsOptional()
    @IsBoolean()
    includeAttachments?: boolean;

    @IsOptional()
    @IsString()
    templateId?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    signature?: string;
}

export class SmsSettingsDto {
    @IsOptional()
    @IsArray()
    @IsPhoneNumber(undefined, { each: true })
    @ArrayMaxSize(3)
    phoneNumbers?: string[];

    @IsOptional()
    @IsBoolean()
    includeMedia?: boolean;

    @IsOptional()
    @IsString()
    provider?: string;

    @IsOptional()
    @IsBoolean()
    useUrlShortening?: boolean;
}

export class PushSettingsDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(10)
    deviceTokens?: string[];

    @IsOptional()
    @IsBoolean()
    sound?: boolean;

    @IsOptional()
    @IsBoolean()
    badge?: boolean;

    @IsOptional()
    @IsBoolean()
    useRichNotifications?: boolean;

    @IsOptional()
    @IsString()
    soundName?: string;
}

export class InAppSettingsDto {
    @IsOptional()
    @IsBoolean()
    showBadge?: boolean;

    @IsOptional()
    @IsBoolean()
    playSound?: boolean;

    @IsOptional()
    @IsBoolean()
    markAsRead?: boolean;

    @IsOptional()
    @IsBoolean()
    showDesktopNotifications?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    maxUnreadCount?: number;
}

export class WhatsappSettingsDto {
    @IsOptional()
    @IsArray()
    @IsPhoneNumber(undefined, { each: true })
    @ArrayMaxSize(2)
    numbers?: string[];

    @IsOptional()
    @IsBoolean()
    allowMedia?: boolean;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsString()
    templateNamespace?: string;
}

export class SlackSettingsDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(5)
    channels?: string[];

    @IsOptional()
    @IsBoolean()
    mentionUser?: boolean;

    @IsOptional()
    @IsString()
    workspaceId?: string;

    @IsOptional()
    @IsBoolean()
    useThreads?: boolean;
}

export class TeamsSettingsDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(5)
    channelIds?: string[];

    @IsOptional()
    @IsBoolean()
    useAdaptiveCards?: boolean;

    @IsOptional()
    @IsBoolean()
    showMentions?: boolean;
}

export class ChannelSettingsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => EmailSettingsDto)
    email?: EmailSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => SmsSettingsDto)
    sms?: SmsSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => PushSettingsDto)
    push?: PushSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => InAppSettingsDto)
    inApp?: InAppSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => WhatsappSettingsDto)
    whatsapp?: WhatsappSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => SlackSettingsDto)
    slack?: SlackSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => TeamsSettingsDto)
    teams?: TeamsSettingsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => WebhookSettingsDto)
    webhook?: WebhookSettingsDto;
}