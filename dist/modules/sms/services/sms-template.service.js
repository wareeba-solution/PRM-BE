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
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsTemplate } from '../entities/sms-template.entity';
let SmsTemplateService = SmsTemplateService_1 = class SmsTemplateService {
    constructor(smsTemplateRepository) {
        this.smsTemplateRepository = smsTemplateRepository;
        this.logger = new Logger(SmsTemplateService_1.name);
    }
    async findAll(organizationId) {
        const query = this.smsTemplateRepository.createQueryBuilder('template');
        if (organizationId) {
            query.where('template.organizationId = :organizationId', { organizationId });
        }
        return query.orderBy('template.name', 'ASC').getMany();
    }
    async findOne(id, organizationId) {
        const query = this.smsTemplateRepository.createQueryBuilder('template')
            .where('template.id = :id', { id });
        if (organizationId) {
            query.andWhere('template.organizationId = :organizationId', { organizationId });
        }
        const template = await query.getOne();
        if (!template) {
            throw new NotFoundException(`SMS template with ID ${id} not found`);
        }
        return template;
    }
    async findByType(type, organizationId) {
        const template = await this.smsTemplateRepository.findOne({
            where: {
                type,
                organizationId,
            },
        });
        if (!template) {
            this.logger.warn(`No template found for type ${type} in organization ${organizationId}`);
            const defaultTemplate = await this.smsTemplateRepository.findOne({
                where: {
                    type,
                    isDefault: true,
                },
            });
            if (!defaultTemplate) {
                throw new NotFoundException(`No template found for type ${type}`);
            }
            return defaultTemplate;
        }
        return template;
    }
    async create(data) {
        const template = this.smsTemplateRepository.create(data);
        return this.smsTemplateRepository.save(template);
    }
    async update(id, data, organizationId) {
        const template = await this.findOne(id, organizationId);
        Object.assign(template, data);
        return this.smsTemplateRepository.save(template);
    }
    async remove(id, organizationId) {
        const template = await this.findOne(id, organizationId);
        await this.smsTemplateRepository.remove(template);
    }
    renderTemplate(template, variables) {
        let content = template.content;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            content = content.replace(regex, String(value));
        }
        return content;
    }
};
SmsTemplateService = SmsTemplateService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(SmsTemplate)),
    __metadata("design:paramtypes", [Repository])
], SmsTemplateService);
export { SmsTemplateService };
//# sourceMappingURL=sms-template.service.js.map