var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsUUID, IsOptional, IsEnum, IsObject, ValidateNested, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '../enums/notification-type.enum';
export var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["LOW"] = "LOW";
})(NotificationPriority || (NotificationPriority = {}));
class NotificationDataDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Department ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "departmentId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Previous department ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "previousDepartmentId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Ticket ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "ticketId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Organization ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "organizationId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Any additional custom data',
        type: 'object',
        additionalProperties: true
    }),
    IsObject(),
    IsOptional(),
    __metadata("design:type", Object)
], NotificationDataDto.prototype, "additionalData", void 0);
export class SendNotificationDto {
}
__decorate([
    ApiProperty({ description: 'User ID to receive the notification' }),
    IsUUID(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "userId", void 0);
__decorate([
    ApiProperty({
        description: 'Notification type',
        enum: NotificationType,
        example: NotificationType.SYSTEM_ANNOUNCEMENT
    }),
    IsEnum(NotificationType),
    IsNotEmpty(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: 'Notification title' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ description: 'Notification message' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "message", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Notification priority',
        enum: NotificationPriority,
        default: NotificationPriority.MEDIUM
    }),
    IsEnum(NotificationPriority),
    IsOptional(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "priority", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization ID that this notification is related to'
    }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], SendNotificationDto.prototype, "organizationId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional structured data for the notification',
        type: 'object',
        additionalProperties: true
    }),
    ValidateNested(),
    Type(() => NotificationDataDto),
    IsOptional(),
    __metadata("design:type", Object)
], SendNotificationDto.prototype, "data", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether to send the notification immediately',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], SendNotificationDto.prototype, "sendImmediately", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether the notification should be persisted in the database',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], SendNotificationDto.prototype, "persist", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Scheduled time to deliver the notification (if not sending immediately)'
    }),
    IsOptional(),
    __metadata("design:type", Date)
], SendNotificationDto.prototype, "scheduledFor", void 0);
export class BulkSendNotificationDto {
}
__decorate([
    ApiProperty({
        description: 'List of user IDs to receive the notification',
        isArray: true,
        type: String
    }),
    IsUUID('4', { each: true }),
    IsNotEmpty(),
    __metadata("design:type", Array)
], BulkSendNotificationDto.prototype, "userIds", void 0);
__decorate([
    ApiProperty({
        description: 'Notification type',
        enum: NotificationType,
        example: NotificationType.SYSTEM_ANNOUNCEMENT
    }),
    IsEnum(NotificationType),
    IsNotEmpty(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: 'Notification title' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "title", void 0);
__decorate([
    ApiProperty({ description: 'Notification message' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "message", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Notification priority',
        enum: NotificationPriority,
        default: NotificationPriority.MEDIUM
    }),
    IsEnum(NotificationPriority),
    IsOptional(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "priority", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Organization ID that this notification is related to'
    }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], BulkSendNotificationDto.prototype, "organizationId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional structured data for the notification',
        type: 'object',
        additionalProperties: true
    }),
    ValidateNested(),
    Type(() => NotificationDataDto),
    IsOptional(),
    __metadata("design:type", Object)
], BulkSendNotificationDto.prototype, "data", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether to send the notification immediately',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], BulkSendNotificationDto.prototype, "sendImmediately", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether the notification should be persisted in the database',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], BulkSendNotificationDto.prototype, "persist", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Scheduled time to deliver the notification (if not sending immediately)'
    }),
    IsOptional(),
    __metadata("design:type", Date)
], BulkSendNotificationDto.prototype, "scheduledFor", void 0);
//# sourceMappingURL=send-notification.dto.js.map