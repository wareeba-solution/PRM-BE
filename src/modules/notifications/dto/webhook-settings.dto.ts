// src/modules/notifications/dto/webhook-settings.dto.ts
import {
    IsOptional,
    IsUrl,
    IsString,
    IsObject,
    ValidateNested,
    IsNumber,
    Min,
    Max
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