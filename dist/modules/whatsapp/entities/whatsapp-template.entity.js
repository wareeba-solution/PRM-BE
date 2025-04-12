"use strict";
// src/modules/whatsapp/entities/whatsapp-template.entity.ts
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
exports.WhatsappTemplate = exports.WhatsappTemplateButtonType = exports.WhatsappTemplateHeaderType = exports.WhatsappTemplateComponentType = exports.WhatsappTemplateCategory = exports.WhatsappTemplateStatus = void 0;
const typeorm_1 = require("typeorm");
const whatsapp_template_enums_1 = require("../enums/whatsapp-template.enums");
// Re-export the enums so they can be imported from this file
var whatsapp_template_enums_2 = require("../enums/whatsapp-template.enums");
Object.defineProperty(exports, "WhatsappTemplateStatus", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateStatus; } });
Object.defineProperty(exports, "WhatsappTemplateCategory", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateCategory; } });
Object.defineProperty(exports, "WhatsappTemplateComponentType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateComponentType; } });
Object.defineProperty(exports, "WhatsappTemplateHeaderType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateHeaderType; } });
Object.defineProperty(exports, "WhatsappTemplateButtonType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateButtonType; } });
/**
 * Whatsapp template entity
 */
let WhatsappTemplate = class WhatsappTemplate {
    /**
     * Get template variable placeholders
     * Extracts all {{variable}} patterns from components
     */
    getVariables() {
        const variables = new Set();
        const regex = /{{([^{}]+)}}/g;
        this.components.forEach(component => {
            if (component.text) {
                let match;
                while ((match = regex.exec(component.text)) !== null) {
                    variables.add(match[1].trim());
                }
            }
            // Check button URLs for variables
            if (component.buttons) {
                component.buttons.forEach(button => {
                    if (button.url) {
                        let match;
                        while ((match = regex.exec(button.url)) !== null) {
                            variables.add(match[1].trim());
                        }
                    }
                });
            }
        });
        return Array.from(variables);
    }
    /**
     * Get the body text of the template
     */
    getBodyText() {
        const bodyComponent = this.components.find(c => c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY);
        return (bodyComponent === null || bodyComponent === void 0 ? void 0 : bodyComponent.text) || null;
    }
    /**
     * Get the header text of the template
     */
    getHeaderText() {
        const headerComponent = this.components.find(c => c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER &&
            c.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT);
        return (headerComponent === null || headerComponent === void 0 ? void 0 : headerComponent.text) || null;
    }
    /**
     * Process template with variables
     */
    processTemplate(variables = {}) {
        const result = {
            body: ''
        };
        // Process each component
        for (const component of this.components) {
            switch (component.type) {
                case whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY:
                    result.body = this.processText(component.text || '', variables);
                    break;
                case whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER:
                    if (component.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT) {
                        result.header = this.processText(component.text || '', variables);
                    }
                    break;
                case whatsapp_template_enums_1.WhatsappTemplateComponentType.FOOTER:
                    result.footer = this.processText(component.text || '', variables);
                    break;
                case whatsapp_template_enums_1.WhatsappTemplateComponentType.BUTTONS:
                    if (component.buttons) {
                        result.buttons = component.buttons.map(button => {
                            const processedButton = Object.assign({}, button);
                            if (button.url) {
                                processedButton.url = this.processText(button.url, variables);
                            }
                            return processedButton;
                        });
                    }
                    break;
            }
        }
        return result;
    }
    /**
     * Process text by replacing variables
     */
    processText(text, variables) {
        let processed = text;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            processed = processed.replace(regex, String(value !== null && value !== void 0 ? value : ''));
        }
        return processed;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: whatsapp_template_enums_1.WhatsappTemplateCategory,
        default: whatsapp_template_enums_1.WhatsappTemplateCategory.UTILITY
    }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: whatsapp_template_enums_1.WhatsappTemplateStatus,
        default: whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'en' }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "externalTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], WhatsappTemplate.prototype, "components", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WhatsappTemplate.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappTemplate.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WhatsappTemplate.prototype, "useCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "deletedAt", void 0);
WhatsappTemplate = __decorate([
    (0, typeorm_1.Entity)('whatsapp_templates')
], WhatsappTemplate);
exports.WhatsappTemplate = WhatsappTemplate;
//# sourceMappingURL=whatsapp-template.entity.js.map