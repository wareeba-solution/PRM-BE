var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, } from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
export var DocumentType;
(function (DocumentType) {
    DocumentType["MEDICAL_RECORD"] = "MEDICAL_RECORD";
    DocumentType["LAB_RESULT"] = "LAB_RESULT";
    DocumentType["PRESCRIPTION"] = "PRESCRIPTION";
    DocumentType["IMAGING"] = "IMAGING";
    DocumentType["INSURANCE"] = "INSURANCE";
    DocumentType["CONSENT_FORM"] = "CONSENT_FORM";
    DocumentType["IDENTIFICATION"] = "IDENTIFICATION";
    DocumentType["INVOICE"] = "INVOICE";
    DocumentType["RECEIPT"] = "RECEIPT";
    DocumentType["CORRESPONDENCE"] = "CORRESPONDENCE";
    DocumentType["REFERRAL"] = "REFERRAL";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (DocumentType = {}));
export var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["DRAFT"] = "DRAFT";
    DocumentStatus["PENDING_REVIEW"] = "PENDING_REVIEW";
    DocumentStatus["APPROVED"] = "APPROVED";
    DocumentStatus["REJECTED"] = "REJECTED";
    DocumentStatus["EXPIRED"] = "EXPIRED";
    DocumentStatus["ARCHIVED"] = "ARCHIVED";
})(DocumentStatus || (DocumentStatus = {}));
let Document = class Document {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], Document.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    Index(),
    __metadata("design:type", String)
], Document.prototype, "contactId", void 0);
__decorate([
    ManyToOne(() => Contact, contact => contact.documents, { onDelete: 'SET NULL' }),
    JoinColumn({ name: 'contactId' }),
    __metadata("design:type", Contact)
], Document.prototype, "contact", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "name", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DocumentType,
        default: DocumentType.OTHER,
    }),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "fileName", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "fileType", void 0);
__decorate([
    Column({ type: 'bigint' }),
    __metadata("design:type", Number)
], Document.prototype, "fileSize", void 0);
__decorate([
    Column({ length: 1024 }),
    __metadata("design:type", String)
], Document.prototype, "filePath", void 0);
__decorate([
    Column({ length: 1024, nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "fileUrl", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "description", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DocumentStatus,
        default: DocumentStatus.APPROVED,
    }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Document.prototype, "isPrivate", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Document.prototype, "documentDate", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Document.prototype, "expiryDate", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "metadata", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "notes", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Document.prototype, "tags", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Document.prototype, "shareWith", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "appointmentId", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "medicalHistoryId", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "contentText", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    Index(),
    __metadata("design:type", String)
], Document.prototype, "createdById", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    Index(),
    __metadata("design:type", String)
], Document.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Document.prototype, "deletedAt", void 0);
Document = __decorate([
    Entity('documents'),
    Index(['organizationId', 'contact'])
], Document);
export { Document };
//# sourceMappingURL=document.entity.js.map