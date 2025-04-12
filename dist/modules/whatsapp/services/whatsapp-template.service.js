"use strict";
// src/modules/whatsapp/services/whatsapp-template.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WhatsappTemplateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappTemplateService = exports.WhatsappTemplateButtonType = exports.WhatsappTemplateHeaderType = exports.WhatsappTemplateComponentType = exports.WhatsappTemplateCategory = exports.WhatsappTemplateStatus = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const whatsapp_template_entity_1 = require("../entities/whatsapp-template.entity");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
const whatsapp_template_enums_1 = require("../enums/whatsapp-template.enums");
// Re-export enums for backward compatibility
var whatsapp_template_enums_2 = require("../enums/whatsapp-template.enums");
Object.defineProperty(exports, "WhatsappTemplateStatus", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateStatus; } });
Object.defineProperty(exports, "WhatsappTemplateCategory", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateCategory; } });
Object.defineProperty(exports, "WhatsappTemplateComponentType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateComponentType; } });
Object.defineProperty(exports, "WhatsappTemplateHeaderType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateHeaderType; } });
Object.defineProperty(exports, "WhatsappTemplateButtonType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateButtonType; } });
let WhatsappTemplateService = WhatsappTemplateService_1 = class WhatsappTemplateService {
    constructor(whatsappTemplateRepository, configService) {
        this.whatsappTemplateRepository = whatsappTemplateRepository;
        this.configService = configService;
        this.logger = new common_2.Logger(WhatsappTemplateService_1.name);
    }
    /**
     * Find a template by ID
     */
    async findById(id, organizationId) {
        const template = await this.whatsappTemplateRepository.findOne({
            where: { id, organizationId }
        });
        if (!template) {
            throw new common_1.NotFoundException(`WhatsApp template with ID "${id}" not found`);
        }
        return template;
    }
    /**
     * Find a template by name
     */
    async findByName(name, organizationId) {
        return this.whatsappTemplateRepository.findOne({
            where: { name, organizationId, status: whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE }
        });
    }
    /**
     * Get all templates for an organization
     */
    async findAll(options) {
        const { organizationId, status, category, language, search, page = 1, limit = 25 } = options;
        const where = { organizationId };
        if (status) {
            where.status = Array.isArray(status) ? (0, typeorm_2.In)(status) : status;
        }
        if (category) {
            where.category = Array.isArray(category) ? (0, typeorm_2.In)(category) : category;
        }
        if (language) {
            where.language = language;
        }
        if (search) {
            where.name = (0, typeorm_2.Like)(`%${search}%`);
        }
        const [items, total] = await this.whatsappTemplateRepository.findAndCount({
            where,
            order: { updatedAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            items,
            total,
            page,
            limit,
        };
    }
    /**
     * Create a new WhatsApp template
     */
    async create(data) {
        // Validate template structure
        this.validateTemplate(data);
        // Check if template with same name already exists
        const existingTemplate = await this.whatsappTemplateRepository.findOne({
            where: {
                name: data.name,
                organizationId: data.organizationId,
                language: data.language
            }
        });
        if (existingTemplate) {
            throw new common_1.BadRequestException(`Template with name "${data.name}" and language "${data.language}" already exists`);
        }
        const template = this.whatsappTemplateRepository.create(Object.assign(Object.assign({}, data), { status: data.status || whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT }));
        return this.whatsappTemplateRepository.save(template);
    }
    /**
     * Update an existing WhatsApp template
     */
    async update(id, organizationId, data) {
        const template = await this.findById(id, organizationId);
        // Check if template is in a state that allows updates
        if (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL) {
            throw new common_1.BadRequestException('Cannot update a template that is pending approval');
        }
        if (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED && data.components) {
            throw new common_1.BadRequestException('Cannot update components of an approved template. Create a new version instead.');
        }
        // If updating name, check if it already exists
        if (data.name && data.name !== template.name) {
            const existingTemplate = await this.whatsappTemplateRepository.findOne({
                where: {
                    name: data.name,
                    organizationId,
                    language: data.language || template.language,
                    id: (0, typeorm_2.Not)(id)
                }
            });
            if (existingTemplate) {
                throw new common_1.BadRequestException(`Template with name "${data.name}" and language "${data.language || template.language}" already exists`);
            }
        }
        // Validate template if components are being updated
        if (data.components) {
            this.validateTemplate(Object.assign(Object.assign({}, template), data));
        }
        // Update template
        Object.assign(template, data);
        // Set status to draft if content was changed and template was rejected
        if (data.components &&
            (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.REJECTED)) {
            template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT;
            template.rejectionReason = undefined;
        }
        return this.whatsappTemplateRepository.save(template);
    }
    /**
     * Submit template for approval
     */
    async submitForApproval(id, organizationId) {
        const template = await this.findById(id, organizationId);
        if (template.status !== whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT) {
            throw new common_1.BadRequestException(`Only templates in DRAFT status can be submitted for approval`);
        }
        // Validate template before submitting
        this.validateTemplate(template);
        // Update status
        template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL;
        template.submittedAt = new Date();
        // Save and return updated template
        const updatedTemplate = await this.whatsappTemplateRepository.save(template);
        // Here you would typically call the WhatsApp API to submit the template
        this.submitTemplateToWhatsAppAPI(updatedTemplate).catch(error => {
            this.logger.error(`Failed to submit template to WhatsApp API: ${error.message}`, error.stack);
        });
        return updatedTemplate;
    }
    /**
     * Delete/archive a WhatsApp template
     */
    async delete(id, organizationId) {
        const template = await this.findById(id, organizationId);
        if (template.status === whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE) {
            template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.INACTIVE;
            await this.whatsappTemplateRepository.save(template);
        }
        else {
            await this.whatsappTemplateRepository.softRemove(template);
        }
        // If the template is approved/active on the WhatsApp API, you would call the API to delete it
        if ([whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED, whatsapp_template_enums_1.WhatsappTemplateStatus.ACTIVE].includes(template.status)) {
            this.deleteTemplateFromWhatsAppAPI(template).catch(error => {
                this.logger.error(`Failed to delete template from WhatsApp API: ${error.message}`, error.stack);
            });
        }
    }
    /**
     * Get available languages for templates
     */
    async getAvailableLanguages() {
        return [
            { code: 'en', name: 'English' },
            { code: 'es', name: 'Spanish' },
            { code: 'pt_BR', name: 'Portuguese (Brazil)' },
            { code: 'fr', name: 'French' },
            { code: 'de', name: 'German' },
            { code: 'it', name: 'Italian' },
            { code: 'ar', name: 'Arabic' },
            { code: 'hi', name: 'Hindi' },
            { code: 'id', name: 'Indonesian' },
            { code: 'ru', name: 'Russian' },
            { code: 'zh_CN', name: 'Chinese (Simplified)' },
            { code: 'ja', name: 'Japanese' },
            { code: 'ko', name: 'Korean' },
        ];
    }
    /**
     * Process variable placeholders in template text
     */
    processTemplateText(text, variables = {}) {
        if (!text)
            return '';
        // Replace {{variable}} placeholders
        let processed = text;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            processed = processed.replace(regex, String(value !== null && value !== void 0 ? value : ''));
        }
        return processed;
    }
    /**
     * Validate template structure
     */
    validateTemplate(template) {
        if (!template.components || !Array.isArray(template.components) || template.components.length === 0) {
            throw new common_1.BadRequestException('Template must have at least one component');
        }
        // Check for required body component
        const bodyComponent = template.components.find(c => c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY);
        if (!bodyComponent) {
            throw new common_1.BadRequestException('Template must have a body component');
        }
        if (!bodyComponent.text) {
            throw new common_1.BadRequestException('Body component must have text');
        }
        // Check header component if present
        const headerComponent = template.components.find(c => c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER);
        if (headerComponent) {
            if (!headerComponent.format) {
                throw new common_1.BadRequestException('Header component must specify a format');
            }
            if (headerComponent.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT && !headerComponent.text) {
                throw new common_1.BadRequestException('Text header must have text content');
            }
        }
        // Check buttons if present
        const buttonsComponent = template.components.find(c => c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BUTTONS);
        if (buttonsComponent && buttonsComponent.buttons) {
            if (buttonsComponent.buttons.length > 3) {
                throw new common_1.BadRequestException('Template can have a maximum of 3 buttons');
            }
            // Validate each button
            for (const button of buttonsComponent.buttons) {
                if (!button.type) {
                    throw new common_1.BadRequestException('Each button must have a type');
                }
                if (!button.text) {
                    throw new common_1.BadRequestException('Each button must have text');
                }
                if (button.type === whatsapp_template_enums_1.WhatsappTemplateButtonType.URL && !button.url) {
                    throw new common_1.BadRequestException('URL button must have a URL');
                }
                if (button.type === whatsapp_template_enums_1.WhatsappTemplateButtonType.PHONE_NUMBER && !button.phoneNumber) {
                    throw new common_1.BadRequestException('Phone number button must have a phone number');
                }
            }
        }
    }
    /**
     * Submit template to WhatsApp API (Meta/Facebook)
     * This is a placeholder for the actual API call
     */
    async submitTemplateToWhatsAppAPI(template) {
        // This would be implemented based on the specific WhatsApp Business API you're using
        const apiKey = this.configService.get('WHATSAPP_API_KEY');
        const accountId = this.configService.get('WHATSAPP_ACCOUNT_ID');
        // This is just a placeholder - you would replace with actual API call
        this.logger.log(`[Mock] Submitting template ${template.name} to WhatsApp API`);
        // Mock API response
        return {
            id: `${Date.now()}`,
            status: 'PENDING',
            category: template.category
        };
    }
    /**
     * Delete template from WhatsApp API (Meta/Facebook)
     * This is a placeholder for the actual API call
     */
    async deleteTemplateFromWhatsAppAPI(template) {
        // This would be implemented based on the specific WhatsApp Business API you're using
        this.logger.log(`[Mock] Deleting template ${template.name} from WhatsApp API`);
        // Mock API response
        return {
            success: true
        };
    }
    /**
     * Sync templates from WhatsApp API
     * This would be used to sync the status of pending templates
     */
    async syncTemplatesFromWhatsAppAPI(organizationId) {
        // Get pending templates
        const pendingTemplates = await this.whatsappTemplateRepository.find({
            where: {
                organizationId,
                status: whatsapp_template_enums_1.WhatsappTemplateStatus.PENDING_APPROVAL
            }
        });
        for (const template of pendingTemplates) {
            // This would make an API call to check the status
            // For now, we'll just simulate a response
            const mockApiResponse = {
                status: Math.random() > 0.3 ? 'APPROVED' : 'REJECTED',
                reason: 'This is a simulated response'
            };
            if (mockApiResponse.status === 'APPROVED') {
                template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.APPROVED;
                template.approvedAt = new Date();
            }
            else {
                template.status = whatsapp_template_enums_1.WhatsappTemplateStatus.REJECTED;
                template.rejectionReason = mockApiResponse.reason;
            }
            await this.whatsappTemplateRepository.save(template);
        }
    }
};
WhatsappTemplateService = WhatsappTemplateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(whatsapp_template_entity_1.WhatsappTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], WhatsappTemplateService);
exports.WhatsappTemplateService = WhatsappTemplateService;
//# sourceMappingURL=whatsapp-template.service.js.map