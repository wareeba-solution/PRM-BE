"use strict";
// src/modules/email/services/email-template.service.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_template_entity_1 = require("../entities/email-template.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Handlebars = __importStar(require("handlebars"));
let EmailTemplateService = class EmailTemplateService {
    constructor(emailTemplateRepository) {
        this.emailTemplateRepository = emailTemplateRepository;
        // Set the default path for template files
        this.defaultTemplatePath = path.join(process.cwd(), 'src/templates/email');
        // Register Handlebars helpers
        this.registerHandlebarsHelpers();
    }
    /**
     * Find a template by ID
     */
    async findById(id, organizationId) {
        const template = await this.emailTemplateRepository.findOne({
            where: { id, organizationId }
        });
        if (!template) {
            throw new common_1.NotFoundException(`Email template with ID "${id}" not found`);
        }
        return template;
    }
    /**
     * Find a template by name
     */
    async findByName(name, organizationId) {
        return this.emailTemplateRepository.findOne({
            where: { name, organizationId, status: email_template_entity_1.EmailTemplateStatus.ACTIVE }
        });
    }
    /**
     * Get all templates for an organization
     */
    async findAll(options) {
        const { organizationId, status, type, category, search, page = 1, limit = 25 } = options;
        const where = { organizationId };
        if (status) {
            where.status = Array.isArray(status) ? (0, typeorm_2.In)(status) : status;
        }
        if (type) {
            where.type = type;
        }
        if (category) {
            where.category = category;
        }
        if (search) {
            where.name = (0, typeorm_2.Like)(`%${search}%`);
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
    /**
     * Create a new email template
     */
    async create(data) {
        // Check if template with same name already exists
        const existingTemplate = await this.emailTemplateRepository.findOne({
            where: {
                name: data.name,
                organizationId: data.organizationId
            }
        });
        if (existingTemplate) {
            throw new common_1.BadRequestException(`Template with name "${data.name}" already exists`);
        }
        const template = this.emailTemplateRepository.create(data);
        return this.emailTemplateRepository.save(template);
    }
    /**
     * Update an existing email template
     */
    async update(id, organizationId, data) {
        const template = await this.findById(id, organizationId);
        // If updating name, check if it already exists
        if (data.name && data.name !== template.name) {
            const existingTemplate = await this.emailTemplateRepository.findOne({
                where: {
                    name: data.name,
                    organizationId,
                    id: (0, typeorm_2.Not)(id)
                }
            });
            if (existingTemplate) {
                throw new common_1.BadRequestException(`Template with name "${data.name}" already exists`);
            }
        }
        Object.assign(template, data);
        return this.emailTemplateRepository.save(template);
    }
    /**
     * Delete an email template
     */
    async delete(id, organizationId) {
        const template = await this.findById(id, organizationId);
        await this.emailTemplateRepository.softRemove(template);
    }
    /**
     * Load and compile template from file
     */
    async loadTemplateFromFile(filename) {
        const templatePath = path.join(this.defaultTemplatePath, filename);
        try {
            return fs.readFileSync(templatePath, 'utf8');
        }
        catch (error) {
            throw new common_1.NotFoundException(`Template file "${filename}" not found`);
        }
    }
    /**
     * Render template with variables
     */
    renderTemplate(content, variables = {}) {
        try {
            const template = Handlebars.compile(content);
            return template(variables);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error rendering template: ${error.message}`);
        }
    }
    /**
     * Render a template by ID with variables
     */
    async renderTemplateById(id, organizationId, variables = {}) {
        const template = await this.findById(id, organizationId);
        const content = this.renderTemplate(template.content, variables);
        const subject = this.renderTemplate(template.subject, variables);
        const plainTextContent = template.plainTextContent
            ? this.renderTemplate(template.plainTextContent, variables)
            : undefined;
        return { subject, content, plainTextContent };
    }
    /**
     * Get template categories for an organization
     */
    async getCategories(organizationId) {
        const result = await this.emailTemplateRepository
            .createQueryBuilder('template')
            .select('DISTINCT template.category')
            .where('template.organizationId = :organizationId', { organizationId })
            .andWhere('template.category IS NOT NULL')
            .getRawMany();
        return result.map(item => item.category).filter(Boolean);
    }
    /**
     * Clone a template
     */
    async cloneTemplate(id, organizationId, newName) {
        const template = await this.findById(id, organizationId);
        // Using destructuring to exclude the id from the template data
        const { id: templateId } = template, templateData = __rest(template, ["id"]);
        // Create a new name if not provided
        const name = newName || `${template.name} (Copy)`;
        return this.create(Object.assign(Object.assign({}, templateData), { name, status: email_template_entity_1.EmailTemplateStatus.DRAFT, isDefault: false, // Never clone as default
            organizationId }));
    }
    /**
     * Register custom Handlebars helpers
     */
    registerHandlebarsHelpers() {
        // Format date helper
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
        // Conditional helper
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_template_entity_1.EmailTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailTemplateService);
exports.EmailTemplateService = EmailTemplateService;
//# sourceMappingURL=email-template.service.js.map