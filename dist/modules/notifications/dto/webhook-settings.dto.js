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
import { IsOptional, IsUrl, IsString, IsObject, ValidateNested, IsNumber, Min, Max } from 'class-validator';
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
//# sourceMappingURL=webhook-settings.dto.js.map