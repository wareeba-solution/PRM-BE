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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_template_entity_1 = require("../entities/message-template.entity");
let MessageTemplateService = class MessageTemplateService {
    constructor(messageTemplateRepository) {
        this.messageTemplateRepository = messageTemplateRepository;
    }
    async create(organizationId, createDto, createdById) {
        const template = this.messageTemplateRepository.create(Object.assign(Object.assign({}, createDto), { organizationId,
            createdById }));
        return this.messageTemplateRepository.save(template);
    }
    async findAll(organizationId, type) {
        const query = this.messageTemplateRepository
            .createQueryBuilder('template')
            .where('template.organizationId = :organizationId', { organizationId })
            .andWhere('template.deletedAt IS NULL');
        if (type) {
            query.andWhere('template.type = :type', { type });
        }
        return query.orderBy('template.name', 'ASC').getMany();
    }
    async findOne(organizationId, id) {
        const template = await this.messageTemplateRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });
        if (!template) {
            throw new common_1.NotFoundException(`Message template with ID ${id} not found`);
        }
        return template;
    }
    async update(organizationId, id, updateDto) {
        const template = await this.findOne(organizationId, id);
        Object.assign(template, updateDto);
        return this.messageTemplateRepository.save(template);
    }
    async remove(organizationId, id) {
        const template = await this.findOne(organizationId, id);
        return this.messageTemplateRepository.softRemove(template);
    }
    async renderTemplate(template, context) {
        let content = template.content;
        // Replace placeholders with context values
        for (const [key, value] of Object.entries(context)) {
            const placeholder = `{{${key}}}`;
            content = content.replace(new RegExp(placeholder, 'g'), (value === null || value === void 0 ? void 0 : value.toString()) || '');
        }
        return content;
    }
    async getDefaultTemplates(organizationId) {
        const defaultTemplates = [
            {
                name: 'Appointment Reminder',
                type: message_template_entity_1.TemplateType.APPOINTMENT_REMINDER,
                content: 'Dear {{patientName}},\n\nThis is a reminder for your appointment on {{appointmentDate}} at {{appointmentTime}} with {{doctorName}}.\n\nPlease arrive 15 minutes before your scheduled time.\n\nBest regards,\n{{organizationName}}',
                description: 'Standard appointment reminder template',
            },
            {
                name: 'Lab Results Available',
                type: message_template_entity_1.TemplateType.LAB_RESULTS,
                content: 'Dear {{patientName}},\n\nYour lab results from {{testDate}} are now available. Please contact your healthcare provider to discuss the results.\n\nBest regards,\n{{organizationName}}',
                description: 'Notification for available lab results',
            },
            {
                name: 'Follow-up Reminder',
                type: message_template_entity_1.TemplateType.FOLLOW_UP,
                content: 'Dear {{patientName}},\n\nThis is a reminder for your follow-up appointment on {{followUpDate}} at {{followUpTime}}.\n\nPlease let us know if you need to reschedule.\n\nBest regards,\n{{organizationName}}',
                description: 'Follow-up appointment reminder',
            },
        ];
        // Create default templates if they don't exist
        for (const template of defaultTemplates) {
            const existingTemplate = await this.messageTemplateRepository.findOne({
                where: {
                    organizationId,
                    type: template.type,
                    deletedAt: null,
                },
            });
            if (!existingTemplate) {
                await this.create(organizationId, template, 'system');
            }
        }
        return this.findAll(organizationId);
    }
};
MessageTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_template_entity_1.MessageTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageTemplateService);
exports.MessageTemplateService = MessageTemplateService;
//# sourceMappingURL=message-template.service.js.map