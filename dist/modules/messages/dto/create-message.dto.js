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
export var MessageType;
(function (MessageType) {
    MessageType["SMS"] = "SMS";
    MessageType["EMAIL"] = "EMAIL";
    MessageType["WHATSAPP"] = "WHATSAPP";
    MessageType["INTERNAL_NOTE"] = "INTERNAL_NOTE";
})(MessageType || (MessageType = {}));
export var MessagePriority;
(function (MessagePriority) {
    MessagePriority["LOW"] = "LOW";
    MessagePriority["NORMAL"] = "NORMAL";
    MessagePriority["HIGH"] = "HIGH";
    MessagePriority["URGENT"] = "URGENT";
})(MessagePriority || (MessagePriority = {}));
export var MessageStatus;
(function (MessageStatus) {
    MessageStatus["DRAFT"] = "DRAFT";
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENDING"] = "SENDING";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["SCHEDULED"] = "SCHEDULED";
    MessageStatus["DELIVERING"] = "DELIVERING";
    MessageStatus["PENDING"] = "PENDING";
})(MessageStatus || (MessageStatus = {}));
export class Attachment {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], Attachment.prototype, "fileType", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], Attachment.prototype, "fileUrl", void 0);
__decorate([
    ApiProperty(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], Attachment.prototype, "fileSize", void 0);
export class EmailOptions {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], EmailOptions.prototype, "subject", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], EmailOptions.prototype, "cc", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], EmailOptions.prototype, "bcc", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], EmailOptions.prototype, "trackOpens", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], EmailOptions.prototype, "trackClicks", void 0);
export class CreateMessageDto {
    constructor() {
        this.priority = MessagePriority.NORMAL;
        this.status = MessageStatus.QUEUED;
    }
}
__decorate([
    ApiProperty({ enum: MessageType }),
    IsEnum(MessageType),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "contactId", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(5000),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({ enum: MessagePriority }),
    IsOptional(),
    IsEnum(MessagePriority),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "priority", void 0);
__decorate([
    ApiPropertyOptional({ enum: MessageStatus }),
    IsOptional(),
    IsEnum(MessageStatus),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsISO8601(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "scheduledFor", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => EmailOptions),
    __metadata("design:type", EmailOptions)
], CreateMessageDto.prototype, "emailOptions", void 0);
__decorate([
    ApiPropertyOptional({ type: [Attachment] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => Attachment),
    __metadata("design:type", Array)
], CreateMessageDto.prototype, "attachments", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "templateId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateMessageDto.prototype, "requireConfirmation", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "externalId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "subject", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateMessageDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-message.dto.js.map