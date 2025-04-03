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
exports.TicketCommentResponseDto = exports.UpdateTicketCommentDto = exports.CreateTicketCommentDto = exports.CommentAttachment = exports.CommentVisibility = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var CommentVisibility;
(function (CommentVisibility) {
    CommentVisibility["PUBLIC"] = "public";
    CommentVisibility["INTERNAL"] = "internal";
    CommentVisibility["PRIVATE"] = "private";
})(CommentVisibility = exports.CommentVisibility || (exports.CommentVisibility = {}));
class CommentAttachment {
    static _OPENAPI_METADATA_FACTORY() {
        return { fileName: { required: true, type: () => String }, fileSize: { required: true, type: () => Number }, mimeType: { required: true, type: () => String }, fileUrl: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The original name of the uploaded file' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The file size in bytes' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CommentAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The MIME type of the file' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The URL or path to the stored file' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileUrl", void 0);
exports.CommentAttachment = CommentAttachment;
class CreateTicketCommentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String }, isInternal: { required: true, type: () => Boolean }, visibility: { required: false, enum: require("./ticket-comment.dto").CommentVisibility }, parentId: { required: false, type: () => String, format: "uuid" }, attachments: { required: false, type: () => [require("./ticket-comment.dto").CommentAttachment] }, mentionedUserIds: { required: false, type: () => [String], format: "uuid" }, sendNotifications: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The main content of the comment',
        example: 'This is a comment on the ticket'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: CommentVisibility,
        description: 'Visibility level of the comment',
        default: CommentVisibility.PUBLIC
    }),
    (0, class_validator_1.IsEnum)(CommentVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the parent comment if this is a reply',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CommentAttachment],
        description: 'Array of attachments for the comment'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CommentAttachment),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mentioned user IDs in the comment',
        type: [String]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "mentionedUserIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the comment should trigger notifications',
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTicketCommentDto.prototype, "sendNotifications", void 0);
exports.CreateTicketCommentDto = CreateTicketCommentDto;
class UpdateTicketCommentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: false, type: () => String }, visibility: { required: false, enum: require("./ticket-comment.dto").CommentVisibility }, attachments: { required: false, type: () => [require("./ticket-comment.dto").CommentAttachment] } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated content of the comment',
        example: 'This is the updated comment'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: CommentVisibility,
        description: 'Updated visibility level of the comment'
    }),
    (0, class_validator_1.IsEnum)(CommentVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CommentAttachment],
        description: 'Updated array of attachments'
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CommentAttachment),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateTicketCommentDto.prototype, "attachments", void 0);
exports.UpdateTicketCommentDto = UpdateTicketCommentDto;
class TicketCommentResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, ticketId: { required: true, type: () => String }, authorId: { required: true, type: () => String }, content: { required: true, type: () => String }, visibility: { required: true, enum: require("./ticket-comment.dto").CommentVisibility }, parentId: { required: false, type: () => String }, attachments: { required: true, type: () => [require("./ticket-comment.dto").CommentAttachment] }, mentionedUserIds: { required: true, type: () => [String] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: false, type: () => Date }, deletedAt: { required: false, type: () => Date }, isEdited: { required: true, type: () => Boolean }, replyCount: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the comment',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ticket ID this comment belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the comment author',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The main content of the comment',
        example: 'This is a comment on the ticket'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: CommentVisibility,
        description: 'Visibility level of the comment'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the parent comment if this is a reply',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CommentAttachment],
        description: 'Array of attachments for the comment'
    }),
    __metadata("design:type", Array)
], TicketCommentResponseDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of mentioned user IDs',
        type: [String]
    }),
    __metadata("design:type", Array)
], TicketCommentResponseDto.prototype, "mentionedUserIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the comment was created',
        example: '2024-02-10T12:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the comment was last updated',
        example: '2024-02-10T13:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the comment was deleted',
        example: '2024-02-10T14:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the comment has been edited',
        example: false
    }),
    __metadata("design:type", Boolean)
], TicketCommentResponseDto.prototype, "isEdited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of replies to this comment',
        example: 0
    }),
    __metadata("design:type", Number)
], TicketCommentResponseDto.prototype, "replyCount", void 0);
exports.TicketCommentResponseDto = TicketCommentResponseDto;
//# sourceMappingURL=ticket-comment.dto.js.map