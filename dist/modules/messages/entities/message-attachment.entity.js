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
exports.MessageAttachment = exports.AttachmentType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/entities/message-attachment.entity.ts
const typeorm_1 = require("typeorm");
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["IMAGE"] = "image";
    AttachmentType["DOCUMENT"] = "document";
    AttachmentType["AUDIO"] = "audio";
    AttachmentType["VIDEO"] = "video";
    AttachmentType["OTHER"] = "other";
})(AttachmentType = exports.AttachmentType || (exports.AttachmentType = {}));
let MessageAttachment = class MessageAttachment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fileName: { required: true, type: () => String }, fileSize: { required: true, type: () => Number }, mimeType: { required: true, type: () => String }, type: { required: true, enum: require("./message-attachment.entity").AttachmentType }, filePath: { required: true, type: () => String }, publicUrl: { required: true, type: () => String }, isUploaded: { required: true, type: () => Boolean }, message: { required: true, type: () => require("./message.entity").Message }, messageId: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MessageAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AttachmentType,
        default: AttachmentType.OTHER
    }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "publicUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MessageAttachment.prototype, "isUploaded", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Message', {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'message_id' }),
    __metadata("design:type", Function)
], MessageAttachment.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'message_id' }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageAttachment.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageAttachment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageAttachment.prototype, "updatedAt", void 0);
MessageAttachment = __decorate([
    (0, typeorm_1.Entity)('message_attachments')
], MessageAttachment);
exports.MessageAttachment = MessageAttachment;
//# sourceMappingURL=message-attachment.entity.js.map