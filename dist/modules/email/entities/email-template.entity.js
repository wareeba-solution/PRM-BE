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
exports.EmailTemplate = exports.EmailTemplateType = exports.EmailTemplateStatus = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/email/entities/email-template.entity.ts
const typeorm_1 = require("typeorm");
/**
 * Email template status enum
 */
var EmailTemplateStatus;
(function (EmailTemplateStatus) {
    EmailTemplateStatus["DRAFT"] = "draft";
    EmailTemplateStatus["ACTIVE"] = "active";
    EmailTemplateStatus["INACTIVE"] = "inactive";
    EmailTemplateStatus["ARCHIVED"] = "archived";
})(EmailTemplateStatus = exports.EmailTemplateStatus || (exports.EmailTemplateStatus = {}));
/**
 * Email template type enum
 */
var EmailTemplateType;
(function (EmailTemplateType) {
    EmailTemplateType["TRANSACTIONAL"] = "transactional";
    EmailTemplateType["MARKETING"] = "marketing";
    EmailTemplateType["NOTIFICATION"] = "notification";
    EmailTemplateType["REPORT"] = "report";
    EmailTemplateType["GENERAL"] = "general";
})(EmailTemplateType = exports.EmailTemplateType || (exports.EmailTemplateType = {}));
/**
 * Email template entity
 */
let EmailTemplate = class EmailTemplate {
    /**
     * Processes template content by replacing variable placeholders with values
     * @param variables The values to replace placeholders with
     * @returns Processed email content
     */
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
    /**
     * Processes email subject by replacing variable placeholders with values
     * @param variables The values to replace placeholders with
     * @returns Processed email subject
     */
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
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, type: { required: true, enum: require("./email-template.entity").EmailTemplateType }, status: { required: true, enum: require("./email-template.entity").EmailTemplateStatus }, subject: { required: true, type: () => String }, content: { required: true, type: () => String }, plainTextContent: { required: false, type: () => String }, isDefault: { required: true, type: () => Boolean }, category: { required: false, type: () => String }, language: { required: false, type: () => String }, variables: { required: false, type: () => Object }, metadata: { required: false, type: () => Object }, previewText: { required: false, type: () => String }, fromEmail: { required: false, type: () => String }, fromName: { required: false, type: () => String }, replyToEmail: { required: false, type: () => String }, headerImageUrl: { required: false, type: () => String }, footerContent: { required: false, type: () => String }, createdById: { required: false, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, lastUsedAt: { required: false, type: () => Date }, useCount: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmailTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EmailTemplateType, default: EmailTemplateType.GENERAL }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EmailTemplateStatus, default: EmailTemplateStatus.DRAFT }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "plainTextContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EmailTemplate.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], EmailTemplate.prototype, "variables", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], EmailTemplate.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "previewText", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "fromEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "fromName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "replyToEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "headerImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "footerContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EmailTemplate.prototype, "useCount", void 0);
EmailTemplate = __decorate([
    (0, typeorm_1.Entity)('email_templates')
], EmailTemplate);
exports.EmailTemplate = EmailTemplate;
//# sourceMappingURL=email-template.entity.js.map