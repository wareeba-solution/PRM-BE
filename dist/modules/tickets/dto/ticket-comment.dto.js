var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, ValidateNested, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var CommentVisibility;
(function (CommentVisibility) {
    CommentVisibility["PUBLIC"] = "public";
    CommentVisibility["INTERNAL"] = "internal";
    CommentVisibility["PRIVATE"] = "private";
})(CommentVisibility || (CommentVisibility = {}));
export class CommentAttachment {
}
__decorate([
    ApiProperty({ description: 'The original name of the uploaded file' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileName", void 0);
__decorate([
    ApiProperty({ description: 'The file size in bytes' }),
    IsNotEmpty(),
    __metadata("design:type", Number)
], CommentAttachment.prototype, "fileSize", void 0);
__decorate([
    ApiProperty({ description: 'The MIME type of the file' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "mimeType", void 0);
__decorate([
    ApiProperty({ description: 'The URL or path to the stored file' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileUrl", void 0);
export class CreateTicketCommentDto {
}
__decorate([
    ApiProperty({
        description: 'The main content of the comment',
        example: 'This is a comment on the ticket'
    }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({
        enum: CommentVisibility,
        description: 'Visibility level of the comment',
        default: CommentVisibility.PUBLIC
    }),
    IsEnum(CommentVisibility),
    IsOptional(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'ID of the parent comment if this is a reply',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "parentId", void 0);
__decorate([
    ApiPropertyOptional({
        type: [CommentAttachment],
        description: 'Array of attachments for the comment'
    }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => CommentAttachment),
    IsOptional(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "attachments", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Mentioned user IDs in the comment',
        type: [String]
    }),
    IsArray(),
    IsUUID('4', { each: true }),
    IsOptional(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "mentionedUserIds", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether the comment should trigger notifications',
        default: true
    }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateTicketCommentDto.prototype, "sendNotifications", void 0);
export class UpdateTicketCommentDto {
}
__decorate([
    ApiPropertyOptional({
        description: 'Updated content of the comment',
        example: 'This is the updated comment'
    }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({
        enum: CommentVisibility,
        description: 'Updated visibility level of the comment'
    }),
    IsEnum(CommentVisibility),
    IsOptional(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    ApiPropertyOptional({
        type: [CommentAttachment],
        description: 'Updated array of attachments'
    }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => CommentAttachment),
    IsOptional(),
    __metadata("design:type", Array)
], UpdateTicketCommentDto.prototype, "attachments", void 0);
export class TicketCommentResponseDto {
}
__decorate([
    ApiProperty({
        description: 'Unique identifier of the comment',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "id", void 0);
__decorate([
    ApiProperty({
        description: 'The ticket ID this comment belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "ticketId", void 0);
__decorate([
    ApiProperty({
        description: 'User ID of the comment author',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "authorId", void 0);
__decorate([
    ApiProperty({
        description: 'The main content of the comment',
        example: 'This is a comment on the ticket'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "content", void 0);
__decorate([
    ApiProperty({
        enum: CommentVisibility,
        description: 'Visibility level of the comment'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "visibility", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'ID of the parent comment if this is a reply',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], TicketCommentResponseDto.prototype, "parentId", void 0);
__decorate([
    ApiProperty({
        type: [CommentAttachment],
        description: 'Array of attachments for the comment'
    }),
    __metadata("design:type", Array)
], TicketCommentResponseDto.prototype, "attachments", void 0);
__decorate([
    ApiProperty({
        description: 'Array of mentioned user IDs',
        type: [String]
    }),
    __metadata("design:type", Array)
], TicketCommentResponseDto.prototype, "mentionedUserIds", void 0);
__decorate([
    ApiProperty({
        description: 'Timestamp when the comment was created',
        example: '2024-02-10T12:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "createdAt", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Timestamp when the comment was last updated',
        example: '2024-02-10T13:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Timestamp when the comment was deleted',
        example: '2024-02-10T14:00:00Z'
    }),
    __metadata("design:type", Date)
], TicketCommentResponseDto.prototype, "deletedAt", void 0);
__decorate([
    ApiProperty({
        description: 'Whether the comment has been edited',
        example: false
    }),
    __metadata("design:type", Boolean)
], TicketCommentResponseDto.prototype, "isEdited", void 0);
__decorate([
    ApiProperty({
        description: 'Number of replies to this comment',
        example: 0
    }),
    __metadata("design:type", Number)
], TicketCommentResponseDto.prototype, "replyCount", void 0);
//# sourceMappingURL=ticket-comment.dto.js.map