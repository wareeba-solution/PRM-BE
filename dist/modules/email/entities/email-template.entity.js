var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, } from 'typeorm';
export var EmailTemplateStatus;
(function (EmailTemplateStatus) {
    EmailTemplateStatus["DRAFT"] = "draft";
    EmailTemplateStatus["ACTIVE"] = "active";
    EmailTemplateStatus["INACTIVE"] = "inactive";
    EmailTemplateStatus["ARCHIVED"] = "archived";
})(EmailTemplateStatus || (EmailTemplateStatus = {}));
export var EmailTemplateType;
(function (EmailTemplateType) {
    EmailTemplateType["TRANSACTIONAL"] = "transactional";
    EmailTemplateType["MARKETING"] = "marketing";
    EmailTemplateType["NOTIFICATION"] = "notification";
    EmailTemplateType["REPORT"] = "report";
    EmailTemplateType["GENERAL"] = "general";
})(EmailTemplateType || (EmailTemplateType = {}));
let EmailTemplate = class EmailTemplate {
    processContent(variables) {
        if (!variables)
            return this.content;
        let processedContent = this.content;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            processedContent = processedContent.replace(regex, String(value !== null && value !== void 0 ? value : ''));
        }
        return processedContent;
    }
    processSubject(variables) {
        if (!variables)
            return this.subject;
        let processedSubject = this.subject;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            processedSubject = processedSubject.replace(regex, String(value !== null && value !== void 0 ? value : ''));
        }
        return processedSubject;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], EmailTemplate.prototype, "id", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "organizationId", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "description", void 0);
__decorate([
    Column({ type: 'enum', enum: EmailTemplateType, default: EmailTemplateType.GENERAL }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "type", void 0);
__decorate([
    Column({ type: 'enum', enum: EmailTemplateStatus, default: EmailTemplateStatus.DRAFT }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "subject", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "content", void 0);
__decorate([
    Column({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "plainTextContent", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], EmailTemplate.prototype, "isDefault", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "category", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "language", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], EmailTemplate.prototype, "variables", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], EmailTemplate.prototype, "metadata", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "previewText", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "fromEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "fromName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "replyToEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "headerImageUrl", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "footerContent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "deletedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], EmailTemplate.prototype, "useCount", void 0);
EmailTemplate = __decorate([
    Entity('email_templates')
], EmailTemplate);
export { EmailTemplate };
//# sourceMappingURL=email-template.entity.js.map