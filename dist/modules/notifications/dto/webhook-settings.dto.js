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
exports.WebhookSettingsDto = exports.WebhookRetryConfigDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/webhook-settings.dto.ts
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
        return { url: { required: false, type: () => String, format: "uri" }, secret: { required: false, type: () => String }, headers: { required: false, type: () => Object }, retryConfig: { required: false, type: () => require("./webhook-settings.dto").WebhookRetryConfigDto } };
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
//# sourceMappingURL=webhook-settings.dto.js.map