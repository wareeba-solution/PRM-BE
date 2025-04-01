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
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In, Not } from 'typeorm';
import { WhatsappTemplate } from '../entities/whatsapp-template.entity';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WhatsappTemplateStatus, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
export { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
let WhatsappTemplateService = WhatsappTemplateService_1 = class WhatsappTemplateService {
    constructor(whatsappTemplateRepository, configService) {
        this.whatsappTemplateRepository = whatsappTemplateRepository;
        this.configService = configService;
        this.logger = new Logger(WhatsappTemplateService_1.name);
    }
    async findById(id, organizationId) {
        const template = await this.whatsappTemplateRepository.findOne({
            where: { id, organizationId }
        });
        if (!template) {
            throw new NotFoundException(`WhatsApp template with ID "${id}" not found`);
        }
        return template;
    }
    async findByName(name, organizationId) {
        return this.whatsappTemplateRepository.findOne({
            where: { name, organizationId, status: WhatsappTemplateStatus.ACTIVE }
        });
    }
    async findAll(options) {
        const { organizationId, status, category, language, search, page = 1, limit = 25 } = options;
        const where = { organizationId };
        if (status) {
            where.status = Array.isArray(status) ? In(status) : status;
        }
        if (category) {
            where.category = Array.isArray(category) ? In(category) : category;
        }
        if (language) {
            where.language = language;
        }
        if (search) {
            where.name = Like(`%${search}%`);
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
    async create(data) {
        this.validateTemplate(data);
        const existingTemplate = await this.whatsappTemplateRepository.findOne({
            where: {
                name: data.name,
                organizationId: data.organizationId,
                language: data.language
            }
        });
        if (existingTemplate) {
            throw new BadRequestException(`Template with name "${data.name}" and language "${data.language}" already exists`);
        }
        const template = this.whatsappTemplateRepository.create(Object.assign(Object.assign({}, data), { status: data.status || WhatsappTemplateStatus.DRAFT }));
        return this.whatsappTemplateRepository.save(template);
    }
    async update(id, organizationId, data) {
        const template = await this.findById(id, organizationId);
        if (template.status === WhatsappTemplateStatus.PENDING_APPROVAL) {
            throw new BadRequestException('Cannot update a template that is pending approval');
        }
        if (template.status === WhatsappTemplateStatus.APPROVED && data.components) {
            throw new BadRequestException('Cannot update components of an approved template. Create a new version instead.');
        }
        if (data.name && data.name !== template.name) {
            const existingTemplate = await this.whatsappTemplateRepository.findOne({
                where: {
                    name: data.name,
                    organizationId,
                    language: data.language || template.language,
                    id: Not(id)
                }
            });
            if (existingTemplate) {
                throw new BadRequestException(`Template with name "${data.name}" and language "${data.language || template.language}" already exists`);
            }
        }
        if (data.components) {
            this.validateTemplate(Object.assign(Object.assign({}, template), data));
        }
        Object.assign(template, data);
        if (data.components &&
            (template.status === WhatsappTemplateStatus.REJECTED)) {
            template.status = WhatsappTemplateStatus.DRAFT;
            template.rejectionReason = undefined;
        }
        return this.whatsappTemplateRepository.save(template);
    }
    async submitForApproval(id, organizationId) {
        const template = await this.findById(id, organizationId);
        if (template.status !== WhatsappTemplateStatus.DRAFT) {
            throw new BadRequestException(`Only templates in DRAFT status can be submitted for approval`);
        }
        this.validateTemplate(template);
        template.status = WhatsappTemplateStatus.PENDING_APPROVAL;
        template.submittedAt = new Date();
        const updatedTemplate = await this.whatsappTemplateRepository.save(template);
        this.submitTemplateToWhatsAppAPI(updatedTemplate).catch(error => {
            this.logger.error(`Failed to submit template to WhatsApp API: ${error.message}`, error.stack);
        });
        return updatedTemplate;
    }
    async delete(id, organizationId) {
        const template = await this.findById(id, organizationId);
        if (template.status === WhatsappTemplateStatus.ACTIVE) {
            template.status = WhatsappTemplateStatus.INACTIVE;
            await this.whatsappTemplateRepository.save(template);
        }
        else {
            await this.whatsappTemplateRepository.softRemove(template);
        }
        if ([WhatsappTemplateStatus.APPROVED, WhatsappTemplateStatus.ACTIVE].includes(template.status)) {
            this.deleteTemplateFromWhatsAppAPI(template).catch(error => {
                this.logger.error(`Failed to delete template from WhatsApp API: ${error.message}`, error.stack);
            });
        }
    }
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
    processTemplateText(text, variables = {}) {
        if (!text)
            return '';
        let processed = text;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            processed = processed.replace(regex, String(value !== null && value !== void 0 ? value : ''));
        }
        return processed;
    }
    validateTemplate(template) {
        if (!template.components || !Array.isArray(template.components) || template.components.length === 0) {
            throw new BadRequestException('Template must have at least one component');
        }
        const bodyComponent = template.components.find(c => c.type === WhatsappTemplateComponentType.BODY);
        if (!bodyComponent) {
            throw new BadRequestException('Template must have a body component');
        }
        if (!bodyComponent.text) {
            throw new BadRequestException('Body component must have text');
        }
        const headerComponent = template.components.find(c => c.type === WhatsappTemplateComponentType.HEADER);
        if (headerComponent) {
            if (!headerComponent.format) {
                throw new BadRequestException('Header component must specify a format');
            }
            if (headerComponent.format === WhatsappTemplateHeaderType.TEXT && !headerComponent.text) {
                throw new BadRequestException('Text header must have text content');
            }
        }
        const buttonsComponent = template.components.find(c => c.type === WhatsappTemplateComponentType.BUTTONS);
        if (buttonsComponent && buttonsComponent.buttons) {
            if (buttonsComponent.buttons.length > 3) {
                throw new BadRequestException('Template can have a maximum of 3 buttons');
            }
            for (const button of buttonsComponent.buttons) {
                if (!button.type) {
                    throw new BadRequestException('Each button must have a type');
                }
                if (!button.text) {
                    throw new BadRequestException('Each button must have text');
                }
                if (button.type === WhatsappTemplateButtonType.URL && !button.url) {
                    throw new BadRequestException('URL button must have a URL');
                }
                if (button.type === WhatsappTemplateButtonType.PHONE_NUMBER && !button.phoneNumber) {
                    throw new BadRequestException('Phone number button must have a phone number');
                }
            }
        }
    }
    async submitTemplateToWhatsAppAPI(template) {
        const apiKey = this.configService.get('WHATSAPP_API_KEY');
        const accountId = this.configService.get('WHATSAPP_ACCOUNT_ID');
        this.logger.log(`[Mock] Submitting template ${template.name} to WhatsApp API`);
        return {
            id: `${Date.now()}`,
            status: 'PENDING',
            category: template.category
        };
    }
    async deleteTemplateFromWhatsAppAPI(template) {
        this.logger.log(`[Mock] Deleting template ${template.name} from WhatsApp API`);
        return {
            success: true
        };
    }
    async syncTemplatesFromWhatsAppAPI(organizationId) {
        const pendingTemplates = await this.whatsappTemplateRepository.find({
            where: {
                organizationId,
                status: WhatsappTemplateStatus.PENDING_APPROVAL
            }
        });
        for (const template of pendingTemplates) {
            const mockApiResponse = {
                status: Math.random() > 0.3 ? 'APPROVED' : 'REJECTED',
                reason: 'This is a simulated response'
            };
            if (mockApiResponse.status === 'APPROVED') {
                template.status = WhatsappTemplateStatus.APPROVED;
                template.approvedAt = new Date();
            }
            else {
                template.status = WhatsappTemplateStatus.REJECTED;
                template.rejectionReason = mockApiResponse.reason;
            }
            await this.whatsappTemplateRepository.save(template);
        }
    }
};
WhatsappTemplateService = WhatsappTemplateService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(WhatsappTemplate)),
    __metadata("design:paramtypes", [Repository,
        ConfigService])
], WhatsappTemplateService);
export { WhatsappTemplateService };
//# sourceMappingURL=whatsapp-template.service.js.map