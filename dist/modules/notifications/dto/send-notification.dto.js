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
exports.BulkSendNotificationDto = exports.SendNotificationDto = exports.NotificationPriority = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const notification_type_enum_1 = require("../enums/notification-type.enum");
/**
 * Enum for notification priorities
 */
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["LOW"] = "LOW";
})(NotificationPriority = exports.NotificationPriority || (exports.NotificationPriority = {}));
/**
 * DTO for notification data
 */
class NotificationDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { departmentId: { required: false, type: () => String, format: "uuid" }, previousDepartmentId: { required: false, type: () => String, format: "uuid" }, ticketId: { required: false, type: () => String, format: "uuid" }, organizationId: { required: false, type: () => String, format: "uuid" }, additionalData: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Department ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Previous department ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "previousDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ticket ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Organization ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Any additional custom data',
        type: 'object',
        additionalProperties: true
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], NotificationDataDto.prototype, "additionalData", void 0);
/**
 * DTO for sending a notification
 */
class SendNotificationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, type: { required: true, type: () => String }, title: { required: true, type: () => String }, message: { required: true, type: () => String }, priority: { required: false, type: () => Object }, organizationId: { required: false, type: () => String, format: "uuid" }, data: { required: false, type: () => Object }, sendImmediately: { required: false, type: () => Boolean }, persist: { required: false, type: () => Boolean }, scheduledFor: { required: false, type: () => Date } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID to receive the notification' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification type',
        enum: notification_type_enum_1.NotificationType,
        example: notification_type_enum_1.NotificationType.SYSTEM_ANNOUNCEMENT
    }),
    (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification message' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notification priority',
        enum: NotificationPriority,
        default: NotificationPriority.MEDIUM
    }),
    (0, class_validator_1.IsEnum)(NotificationPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization ID that this notification is related to'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional structured data for the notification',
        type: 'object',
        additionalProperties: true
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationDataDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SendNotificationDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to send the notification immediately',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SendNotificationDto.prototype, "sendImmediately", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the notification should be persisted in the database',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SendNotificationDto.prototype, "persist", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Scheduled time to deliver the notification (if not sending immediately)'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SendNotificationDto.prototype, "scheduledFor", void 0);
exports.SendNotificationDto = SendNotificationDto;
/**
 * DTO for bulk sending notifications to multiple users
 */
class BulkSendNotificationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userIds: { required: true, type: () => [String], format: "uuid" }, type: { required: true, type: () => String }, title: { required: true, type: () => String }, message: { required: true, type: () => String }, priority: { required: false, type: () => Object }, organizationId: { required: false, type: () => String, format: "uuid" }, data: { required: false, type: () => Object }, sendImmediately: { required: false, type: () => Boolean }, persist: { required: false, type: () => Boolean }, scheduledFor: { required: false, type: () => Date } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of user IDs to receive the notification',
        isArray: true,
        type: String
    }),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkSendNotificationDto.prototype, "userIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification type',
        enum: notification_type_enum_1.NotificationType,
        example: notification_type_enum_1.NotificationType.SYSTEM_ANNOUNCEMENT
    }),
    (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification message' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notification priority',
        enum: NotificationPriority,
        default: NotificationPriority.MEDIUM
    }),
    (0, class_validator_1.IsEnum)(NotificationPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Organization ID that this notification is related to'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional structured data for the notification',
        type: 'object',
        additionalProperties: true
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationDataDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BulkSendNotificationDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether to send the notification immediately',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], BulkSendNotificationDto.prototype, "sendImmediately", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the notification should be persisted in the database',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], BulkSendNotificationDto.prototype, "persist", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Scheduled time to deliver the notification (if not sending immediately)'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], BulkSendNotificationDto.prototype, "scheduledFor", void 0);
exports.BulkSendNotificationDto = BulkSendNotificationDto;
//# sourceMappingURL=send-notification.dto.js.map