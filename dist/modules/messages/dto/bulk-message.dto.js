var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsUUID, IsOptional, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageType } from '../enums/message-type.enum';
export class AttachmentDto {
}
__decorate([
    ApiProperty({ description: 'Attachment filename' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "filename", void 0);
__decorate([
    ApiProperty({ description: 'Attachment content type' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "contentType", void 0);
__decorate([
    ApiProperty({ description: 'Attachment URL or content ID' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "content", void 0);
export class BulkMessageDto {
}
__decorate([
    ApiProperty({ description: 'Array of contact IDs to send messages to', type: [String] }),
    IsArray(),
    IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], BulkMessageDto.prototype, "contactIds", void 0);
__decorate([
    ApiProperty({ description: 'Message sender ID' }),
    ApiProperty({ description: 'Message subject (for email)', required: false }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "subject", void 0);
__decorate([
    ApiProperty({ description: 'Message content body' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "content", void 0);
__decorate([
    ApiProperty({ description: 'Type of message', enum: MessageType }),
    IsEnum(MessageType),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Template ID to use', required: false }),
    IsUUID('4'),
    IsOptional(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "templateId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Template variables', required: false }),
    IsObject(),
    IsOptional(),
    __metadata("design:type", Object)
], BulkMessageDto.prototype, "variables", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Message attachments', type: [AttachmentDto], required: false }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => AttachmentDto),
    IsOptional(),
    __metadata("design:type", Array)
], BulkMessageDto.prototype, "attachments", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Schedule message for a later time', required: false }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "scheduledFor", void 0);
//# sourceMappingURL=bulk-message.dto.js.map