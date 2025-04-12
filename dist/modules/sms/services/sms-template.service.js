"use strict";
// src/modules/sms/services/sms-template.service.ts
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
var SmsTemplateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sms_template_entity_1 = require("../entities/sms-template.entity");
let SmsTemplateService = SmsTemplateService_1 = class SmsTemplateService {
    constructor(smsTemplateRepository) {
        this.smsTemplateRepository = smsTemplateRepository;
        this.logger = new common_1.Logger(SmsTemplateService_1.name);
    }
    /**
     * Find all SMS templates
     */
    async findAll(organizationId) {
        const query = this.smsTemplateRepository.createQueryBuilder('template');
        if (organizationId) {
            query.where('template.organizationId = :organizationId', { organizationId });
        }
        return query.orderBy('template.name', 'ASC').getMany();
    }
    /**
     * Find a template by ID
     */
    async findOne(id, organizationId) {
        const query = this.smsTemplateRepository.createQueryBuilder('template')
            .where('template.id = :id', { id });
        if (organizationId) {
            query.andWhere('template.organizationId = :organizationId', { organizationId });
        }
        const template = await query.getOne();
        if (!template) {
            throw new common_1.NotFoundException(`SMS template with ID ${id} not found`);
        }
        return template;
    }
    /**
     * Find a template by type and organization
     */
    async findByType(type, organizationId) {
        const template = await this.smsTemplateRepository.findOne({
            where: {
                type,
                organizationId,
            },
        });
        if (!template) {
            this.logger.warn(`No template found for type ${type} in organization ${organizationId}`);
            // Try to find a default template
            const defaultTemplate = await this.smsTemplateRepository.findOne({
                where: {
                    type,
                    isDefault: true,
                },
            });
            if (!defaultTemplate) {
                throw new common_1.NotFoundException(`No template found for type ${type}`);
            }
            return defaultTemplate;
        }
        return template;
    }
    /**
     * Create a new SMS template
     */
    async create(data) {
        const template = this.smsTemplateRepository.create(data);
        return this.smsTemplateRepository.save(template);
    }
    /**
     * Update an existing SMS template
     */
    async update(id, data, organizationId) {
        const template = await this.findOne(id, organizationId);
        Object.assign(template, data);
        return this.smsTemplateRepository.save(template);
    }
    /**
     * Delete an SMS template
     */
    async remove(id, organizationId) {
        const template = await this.findOne(id, organizationId);
        await this.smsTemplateRepository.remove(template);
    }
    /**
     * Render a template with variables
     */
    renderTemplate(template, variables) {
        let content = template.content;
        // Replace variables in the format {{variableName}}
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            content = content.replace(regex, String(value));
        }
        return content;
    }
};
SmsTemplateService = SmsTemplateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sms_template_entity_1.SmsTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SmsTemplateService);
exports.SmsTemplateService = SmsTemplateService;
//# sourceMappingURL=sms-template.service.js.map