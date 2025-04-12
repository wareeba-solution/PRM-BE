import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageTemplate, TemplateType } from '../entities/message-template.entity';
import { CreateMessageTemplateDto } from '../dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from '../dto/update-message-template.dto';

@Injectable()
export class MessageTemplateService {
    constructor(
        @InjectRepository(MessageTemplate)
        private readonly messageTemplateRepository: Repository<MessageTemplate>,
    ) {}

    async create(organizationId: string, createDto: CreateMessageTemplateDto, createdById: string) {
        const template = this.messageTemplateRepository.create({
            ...createDto,
            organizationId,
            createdById,
        });

        return this.messageTemplateRepository.save(template);
    }

    async findAll(organizationId: string, type?: TemplateType) {
        const query = this.messageTemplateRepository
            .createQueryBuilder('template')
            .where('template.organizationId = :organizationId', { organizationId })
            .andWhere('template.deletedAt IS NULL');

        if (type) {
            query.andWhere('template.type = :type', { type });
        }

        return query.orderBy('template.name', 'ASC').getMany();
    }

    async findOne(organizationId: string, id: string) {
        const template = await this.messageTemplateRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });

        if (!template) {
            throw new NotFoundException(`Message template with ID ${id} not found`);
        }

        return template;
    }

    async update(organizationId: string, id: string, updateDto: UpdateMessageTemplateDto) {
        const template = await this.findOne(organizationId, id);
        Object.assign(template, updateDto);
        return this.messageTemplateRepository.save(template);
    }

    async remove(organizationId: string, id: string) {
        const template = await this.findOne(organizationId, id);
        return this.messageTemplateRepository.softRemove(template);
    }

    async renderTemplate(template: MessageTemplate, context: Record<string, any>): Promise<string> {
        let content = template.content;

        // Replace placeholders with context values
        for (const [key, value] of Object.entries(context)) {
            const placeholder = `{{${key}}}`;
            content = content.replace(new RegExp(placeholder, 'g'), value?.toString() || '');
        }

        return content;
    }

    async getDefaultTemplates(organizationId: string): Promise<MessageTemplate[]> {
        const defaultTemplates = [
            {
                name: 'Appointment Reminder',
                type: TemplateType.APPOINTMENT_REMINDER,
                content: 'Dear {{patientName}},\n\nThis is a reminder for your appointment on {{appointmentDate}} at {{appointmentTime}} with {{doctorName}}.\n\nPlease arrive 15 minutes before your scheduled time.\n\nBest regards,\n{{organizationName}}',
                description: 'Standard appointment reminder template',
            },
            {
                name: 'Lab Results Available',
                type: TemplateType.LAB_RESULTS,
                content: 'Dear {{patientName}},\n\nYour lab results from {{testDate}} are now available. Please contact your healthcare provider to discuss the results.\n\nBest regards,\n{{organizationName}}',
                description: 'Notification for available lab results',
            },
            {
                name: 'Follow-up Reminder',
                type: TemplateType.FOLLOW_UP,
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
} 