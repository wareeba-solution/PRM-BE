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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CommentVisibility;
(function (CommentVisibility) {
    CommentVisibility["PUBLIC"] = "public";
    CommentVisibility["INTERNAL"] = "internal";
    CommentVisibility["PRIVATE"] = "private";
})(CommentVisibility = exports.CommentVisibility || (exports.CommentVisibility = {}));
class CommentAttachment {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CommentAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CommentAttachment.prototype, "fileUrl", void 0);
exports.CommentAttachment = CommentAttachment;
class CreateTicketCommentDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CommentVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketCommentDto.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CommentAttachment),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "attachments", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTicketCommentDto.prototype, "mentionedUserIds", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTicketCommentDto.prototype, "sendNotifications", void 0);
exports.CreateTicketCommentDto = CreateTicketCommentDto;
class UpdateTicketCommentDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CommentVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketCommentDto.prototype, "visibility", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CommentAttachment),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateTicketCommentDto.prototype, "attachments", void 0);
exports.UpdateTicketCommentDto = UpdateTicketCommentDto;
class TicketCommentResponseDto {
}
exports.TicketCommentResponseDto = TicketCommentResponseDto;
//# sourceMappingURL=ticket-comment.dto.js.map