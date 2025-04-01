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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In, Not } from 'typeorm';
import { EmailTemplate, EmailTemplateStatus } from '../entities/email-template.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
let EmailTemplateService = class EmailTemplateService {
    constructor(emailTemplateRepository) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.defaultTemplatePath = path.join(process.cwd(), 'src/templates/email');
        this.registerHandlebarsHelpers();
    }
    async findById(id, organizationId) {
        const template = await this.emailTemplateRepository.findOne({
            where: { id, organizationId }
        });
        if (!template) {
            throw new NotFoundException(`Email template with ID "${id}" not found`);
        }
        return template;
    }
    async findByName(name, organizationId) {
        return this.emailTemplateRepository.findOne({
            where: { name, organizationId, status: EmailTemplateStatus.ACTIVE }
        });
    }
    async findAll(options) {
        const { organizationId, status, type, category, search, page = 1, limit = 25 } = options;
        const where = { organizationId };
        if (status) {
            where.status = Array.isArray(status) ? In(status) : status;
        }
        if (type) {
            where.type = type;
        }
        if (category) {
            where.category = category;
        }
        if (search) {
            where.name = Like(`%${search}%`);
        }
        const [items, total] = await this.emailTemplateRepository.findAndCount({
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
        const existingTemplate = await this.emailTemplateRepository.findOne({
            where: {
                name: data.name,
                organizationId: data.organizationId
            }
        });
        if (existingTemplate) {
            throw new BadRequestException(`Template with name "${data.name}" already exists`);
        }
        const template = this.emailTemplateRepository.create(data);
        return this.emailTemplateRepository.save(template);
    }
    async update(id, organizationId, data) {
        const template = await this.findById(id, organizationId);
        if (data.name && data.name !== template.name) {
            const existingTemplate = await this.emailTemplateRepository.findOne({
                where: {
                    name: data.name,
                    organizationId,
                    id: Not(id)
                }
            });
            if (existingTemplate) {
                throw new BadRequestException(`Template with name "${data.name}" already exists`);
            }
        }
        Object.assign(template, data);
        return this.emailTemplateRepository.save(template);
    }
    async delete(id, organizationId) {
        const template = await this.findById(id, organizationId);
        await this.emailTemplateRepository.softRemove(template);
    }
    async loadTemplateFromFile(filename) {
        const templatePath = path.join(this.defaultTemplatePath, filename);
        try {
            return fs.readFileSync(templatePath, 'utf8');
        }
        catch (error) {
            throw new NotFoundException(`Template file "${filename}" not found`);
        }
    }
    renderTemplate(content, variables = {}) {
        try {
            const template = Handlebars.compile(content);
            return template(variables);
        }
        catch (error) {
            throw new BadRequestException(`Error rendering template: ${error.message}`);
        }
    }
    async renderTemplateById(id, organizationId, variables = {}) {
        const template = await this.findById(id, organizationId);
        const content = this.renderTemplate(template.content, variables);
        const subject = this.renderTemplate(template.subject, variables);
        const plainTextContent = template.plainTextContent
            ? this.renderTemplate(template.plainTextContent, variables)
            : undefined;
        return { subject, content, plainTextContent };
    }
    async getCategories(organizationId) {
        const result = await this.emailTemplateRepository
            .createQueryBuilder('template')
            .select('DISTINCT template.category')
            .where('template.organizationId = :organizationId', { organizationId })
            .andWhere('template.category IS NOT NULL')
            .getRawMany();
        return result.map(item => item.category).filter(Boolean);
    }
    async cloneTemplate(id, organizationId, newName) {
        const template = await this.findById(id, organizationId);
        const { id: templateId } = template, templateData = __rest(template, ["id"]);
        const name = newName || `${template.name} (Copy)`;
        return this.create(Object.assign(Object.assign({}, templateData), { name, status: EmailTemplateStatus.DRAFT, isDefault: false, organizationId }));
    }
    registerHandlebarsHelpers() {
        Handlebars.registerHelper('formatDate', function (date, format) {
            if (!date)
                return '';
            const d = new Date(date);
            switch (format) {
                case 'short':
                    return d.toLocaleDateString();
                case 'long':
                    return d.toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                case 'time':
                    return d.toLocaleTimeString();
                case 'datetime':
                    return d.toLocaleString();
                default:
                    return d.toDateString();
            }
        });
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });
    }
};
EmailTemplateService = __decorate([
    Injectable(),
    __param(0, InjectRepository(EmailTemplate)),
    __metadata("design:paramtypes", [Repository])
], EmailTemplateService);
export { EmailTemplateService };
//# sourceMappingURL=email-template.service.js.map