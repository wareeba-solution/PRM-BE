var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
export var AttachmentType;
(function (AttachmentType) {
    AttachmentType["IMAGE"] = "image";
    AttachmentType["DOCUMENT"] = "document";
    AttachmentType["AUDIO"] = "audio";
    AttachmentType["VIDEO"] = "video";
    AttachmentType["OTHER"] = "other";
})(AttachmentType || (AttachmentType = {}));
let MessageAttachment = class MessageAttachment {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], MessageAttachment.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "fileName", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MessageAttachment.prototype, "fileSize", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "mimeType", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AttachmentType,
        default: AttachmentType.OTHER
    }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageAttachment.prototype, "filePath", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "publicUrl", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], MessageAttachment.prototype, "isUploaded", void 0);
__decorate([
    ManyToOne('Message', {
        onDelete: 'CASCADE'
    }),
    JoinColumn({ name: 'message_id' }),
    __metadata("design:type", Function)
], MessageAttachment.prototype, "message", void 0);
__decorate([
    Column({ name: 'message_id' }),
    __metadata("design:type", String)
], MessageAttachment.prototype, "messageId", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageAttachment.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MessageAttachment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], MessageAttachment.prototype, "updatedAt", void 0);
MessageAttachment = __decorate([
    Entity('message_attachments')
], MessageAttachment);
export { MessageAttachment };
//# sourceMappingURL=message-attachment.entity.js.map