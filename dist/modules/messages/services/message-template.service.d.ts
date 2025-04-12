import { Repository } from 'typeorm';
import { MessageTemplate, TemplateType } from '../entities/message-template.entity';
import { CreateMessageTemplateDto } from '../dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from '../dto/update-message-template.dto';
export declare class MessageTemplateService {
    private readonly messageTemplateRepository;
    constructor(messageTemplateRepository: Repository<MessageTemplate>);
    create(organizationId: string, createDto: CreateMessageTemplateDto, createdById: string): Promise<MessageTemplate>;
    findAll(organizationId: string, type?: TemplateType): Promise<MessageTemplate[]>;
    findOne(organizationId: string, id: string): Promise<MessageTemplate>;
    update(organizationId: string, id: string, updateDto: UpdateMessageTemplateDto): Promise<MessageTemplate>;
    remove(organizationId: string, id: string): Promise<MessageTemplate>;
    renderTemplate(template: MessageTemplate, context: Record<string, any>): Promise<string>;
    getDefaultTemplates(organizationId: string): Promise<MessageTemplate[]>;
}
