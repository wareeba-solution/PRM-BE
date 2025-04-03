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
exports.BulkMessageDto = exports.AttachmentDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/dto/bulk-message.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const message_type_enum_1 = require("../enums/message-type.enum");
// Optionally define attachment info if your system supports attachments
class AttachmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { filename: { required: true, type: () => String }, contentType: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment filename' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment content type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment URL or content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachmentDto.prototype, "content", void 0);
exports.AttachmentDto = AttachmentDto;
class BulkMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactIds: { required: true, type: () => [String], format: "uuid" }, messageData: { required: true, type: () => require("./create-message.dto").CreateMessageDto }, subject: { required: false, type: () => String }, content: { required: true, type: () => String }, type: { required: true, enum: require("../enums/message-type.enum").MessageType }, templateId: { required: false, type: () => String, format: "uuid" }, variables: { required: false, type: () => Object }, attachments: { required: false, type: () => [require("./bulk-message.dto").AttachmentDto] }, scheduledFor: { required: false, type: () => String }, organizationId: { required: false, type: () => String }, senderId: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of contact IDs to send messages to', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], BulkMessageDto.prototype, "contactIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message sender ID' }),
    (0, swagger_1.ApiProperty)({ description: 'Message subject (for email)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message content body' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of message', enum: message_type_enum_1.MessageType }),
    (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template ID to use', required: false }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template variables', required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BulkMessageDto.prototype, "variables", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Message attachments', type: [AttachmentDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AttachmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BulkMessageDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Schedule message for a later time', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkMessageDto.prototype, "scheduledFor", void 0);
exports.BulkMessageDto = BulkMessageDto;
//# sourceMappingURL=bulk-message.dto.js.map