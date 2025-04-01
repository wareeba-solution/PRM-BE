var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEnum, IsUUID, IsOptional, IsArray, ValidateNested, IsBoolean, IsNotEmpty, MaxLength, IsISO8601, IsObject, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var NotificationType;
(function (NotificationType) {
    NotificationType["SYSTEM"] = "SYSTEM";
    NotificationType["APPOINTMENT"] = "APPOINTMENT";
    NotificationType["MESSAGE"] = "MESSAGE";
    NotificationType["TASK"] = "TASK";
    NotificationType["ALERT"] = "ALERT";
    NotificationType["REMINDER"] = "REMINDER";
    NotificationType["DOCUMENT"] = "DOCUMENT";
    NotificationType["TICKET_ESCALATED"] = "TICKET_ESCALATED";
})(NotificationType || (NotificationType = {}));
export var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "LOW";
    NotificationPriority["NORMAL"] = "NORMAL";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["URGENT"] = "URGENT";
})(NotificationPriority || (NotificationPriority = {}));
export var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["IN_APP"] = "IN_APP";
    NotificationChannel["EMAIL"] = "EMAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["PUSH"] = "PUSH";
    NotificationChannel["WEBHOOK"] = "WEBHOOK";
    NotificationChannel["SLACK"] = "SLACK";
    NotificationChannel["WHATSAPP"] = "WHATSAPP";
})(NotificationChannel || (NotificationChannel = {}));
export class NotificationAction {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], NotificationAction.prototype, "label", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], NotificationAction.prototype, "url", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], NotificationAction.prototype, "method", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], NotificationAction.prototype, "data", void 0);
export class NotificationRecipient {
}
__decorate([
    ApiProperty(),
    IsUUID(),
    __metadata("design:type", String)
], NotificationRecipient.prototype, "userId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsEnum(NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], NotificationRecipient.prototype, "channels", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], NotificationRecipient.prototype, "metadata", void 0);
export class CreateNotificationDto {
    constructor() {
        this.priority = NotificationPriority.NORMAL;
    }
}
__decorate([
    ApiProperty({ enum: NotificationType }),
    IsEnum(NotificationType),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(1000),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({ enum: NotificationPriority }),
    IsOptional(),
    IsEnum(NotificationPriority),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "priority", void 0);
__decorate([
    ApiProperty(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => NotificationRecipient),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "recipients", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => NotificationAction),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "actions", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsISO8601(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "scheduledFor", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsISO8601(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "expiresAt", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "requireConfirmation", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "data", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsEnum(NotificationChannel, { each: true }),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "channels", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "category", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "groupId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "referenceId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "referenceType", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "silent", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "organizationId", void 0);
//# sourceMappingURL=create-notification.dto.js.map