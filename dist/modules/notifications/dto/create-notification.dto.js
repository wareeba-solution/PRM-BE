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
exports.CreateNotificationDto = exports.NotificationRecipient = exports.NotificationAction = exports.NotificationType = exports.NotificationPriority = exports.NotificationChannel = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/create-notification.dto.ts
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const notification_channel_enum_1 = require("../enums/notification-channel.enum");
Object.defineProperty(exports, "NotificationChannel", { enumerable: true, get: function () { return notification_channel_enum_1.NotificationChannel; } });
const notification_priority_enum_1 = require("../enums/notification-priority.enum");
Object.defineProperty(exports, "NotificationPriority", { enumerable: true, get: function () { return notification_priority_enum_1.NotificationPriority; } });
const notification_type_enum_1 = require("../enums/notification-type.enum");
Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function () { return notification_type_enum_1.NotificationType; } });
class NotificationAction {
    static _OPENAPI_METADATA_FACTORY() {
        return { label: { required: true, type: () => String }, url: { required: true, type: () => String }, method: { required: false, type: () => Object }, data: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationAction.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificationAction.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationAction.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], NotificationAction.prototype, "data", void 0);
exports.NotificationAction = NotificationAction;
class NotificationRecipient {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, role: { required: true, type: () => String }, organizationId: { required: false, type: () => String, format: "uuid" }, channels: { required: false, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NotificationRecipient.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationRecipient.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NotificationRecipient.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_channel_enum_1.NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], NotificationRecipient.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], NotificationRecipient.prototype, "metadata", void 0);
exports.NotificationRecipient = NotificationRecipient;
class CreateNotificationDto {
    constructor() {
        this.priority = notification_priority_enum_1.NotificationPriority.NORMAL;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, enum: require("../enums/notification-type.enum").NotificationType }, title: { required: true, type: () => String, maxLength: 200 }, content: { required: true, type: () => String, maxLength: 1000 }, priority: { required: false, default: notification_priority_enum_1.NotificationPriority.NORMAL, enum: require("../enums/notification-priority.enum").NotificationPriority }, recipients: { required: true, type: () => [require("./create-notification.dto").NotificationRecipient] }, actions: { required: false, type: () => [require("./create-notification.dto").NotificationAction] }, scheduledFor: { required: false, type: () => String }, expiresAt: { required: false, type: () => String }, requireConfirmation: { required: false, type: () => Boolean }, data: { required: false, type: () => Object }, channels: { required: false, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, category: { required: false, type: () => String, maxLength: 100 }, groupId: { required: false, type: () => String, maxLength: 100 }, referenceId: { required: false, type: () => String, format: "uuid" }, referenceType: { required: false, type: () => String, maxLength: 50 }, silent: { required: false, type: () => Boolean }, organizationId: { required: true, type: () => String, format: "uuid" }, senderId: { required: false, type: () => String, format: "uuid" }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: notification_priority_enum_1.NotificationPriority }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(notification_priority_enum_1.NotificationPriority),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NotificationRecipient),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "recipients", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NotificationAction),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "actions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "requireConfirmation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(notification_channel_enum_1.NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "silent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "metadata", void 0);
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=create-notification.dto.js.map