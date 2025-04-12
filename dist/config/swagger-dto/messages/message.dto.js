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
exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Message DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class MessageDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this message belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who sent the message',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the recipient (user or contact)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "recipientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of recipient (USER or CONTACT)',
        example: 'CONTACT',
        enum: ['USER', 'CONTACT', 'GROUP'],
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "recipientType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subject of the message',
        example: 'Appointment Confirmation',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content of the message',
        example: 'Your appointment has been confirmed for tomorrow at 10:00 AM.'
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of message',
        example: 'EMAIL',
        enum: ['EMAIL', 'SMS', 'CHAT', 'WHATSAPP', 'SYSTEM', 'OTHER']
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the message',
        example: 'SENT',
        enum: ['DRAFT', 'SENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
        default: 'DRAFT'
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the message has been read',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], MessageDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the message was read',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MessageDto.prototype, "readAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the message was sent',
        example: '2023-05-14T15:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MessageDto.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the message was delivered',
        example: '2023-05-14T15:30:05.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MessageDto.prototype, "deliveredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Priority level of the message',
        example: 'NORMAL',
        enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
        default: 'NORMAL'
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the conversation this message belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the message this is replying to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "replyToId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the message has attachments',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], MessageDto.prototype, "hasAttachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'External message ID (e.g., email message ID)',
        example: '<abc123@example.com>',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MessageDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the message',
        example: {
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            emailHeaders: {
                from: 'sender@example.com',
                to: 'recipient@example.com'
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], MessageDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the message',
        example: ['appointment', 'confirmation', 'automated'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], MessageDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the message is scheduled to be sent',
        example: '2023-05-15T08:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MessageDto.prototype, "scheduledFor", void 0);
exports.MessageDto = MessageDto;
//# sourceMappingURL=message.dto.js.map