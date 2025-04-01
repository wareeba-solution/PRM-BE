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
import { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType } from '../enums/whatsapp-template.enums';
export { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
let WhatsappTemplate = class WhatsappTemplate {
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
    getBodyText() {
        const bodyComponent = this.components.find(c => c.type === WhatsappTemplateComponentType.BODY);
        return (bodyComponent === null || bodyComponent === void 0 ? void 0 : bodyComponent.text) || null;
    }
    getHeaderText() {
        const headerComponent = this.components.find(c => c.type === WhatsappTemplateComponentType.HEADER &&
            c.format === WhatsappTemplateHeaderType.TEXT);
        return (headerComponent === null || headerComponent === void 0 ? void 0 : headerComponent.text) || null;
    }
    processTemplate(variables = {}) {
        const result = {
            body: ''
        };
        for (const component of this.components) {
            switch (component.type) {
                case WhatsappTemplateComponentType.BODY:
                    result.body = this.processText(component.text || '', variables);
                    break;
                case WhatsappTemplateComponentType.HEADER:
                    if (component.format === WhatsappTemplateHeaderType.TEXT) {
                        result.header = this.processText(component.text || '', variables);
                    }
                    break;
                case WhatsappTemplateComponentType.FOOTER:
                    result.footer = this.processText(component.text || '', variables);
                    break;
                case WhatsappTemplateComponentType.BUTTONS:
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
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "id", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "organizationId", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "description", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: WhatsappTemplateCategory,
        default: WhatsappTemplateCategory.UTILITY
    }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "category", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: WhatsappTemplateStatus,
        default: WhatsappTemplateStatus.DRAFT
    }),
    Index(),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "status", void 0);
__decorate([
    Column({ default: 'en' }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "language", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "externalTemplateId", void 0);
__decorate([
    Column({ type: 'jsonb' }),
    __metadata("design:type", Array)
], WhatsappTemplate.prototype, "components", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], WhatsappTemplate.prototype, "isDefault", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "submittedAt", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "approvedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "rejectionReason", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], WhatsappTemplate.prototype, "metadata", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], WhatsappTemplate.prototype, "useCount", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WhatsappTemplate.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], WhatsappTemplate.prototype, "deletedAt", void 0);
WhatsappTemplate = __decorate([
    Entity('whatsapp_templates')
], WhatsappTemplate);
export { WhatsappTemplate };
//# sourceMappingURL=whatsapp-template.entity.js.map