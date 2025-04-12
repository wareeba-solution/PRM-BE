import { Repository } from 'typeorm';
import { SmsTemplate, SmsTemplateType } from '../entities/sms-template.entity';
export declare class SmsTemplateService {
    private readonly smsTemplateRepository;
    private readonly logger;
    constructor(smsTemplateRepository: Repository<SmsTemplate>);
    /**
     * Find all SMS templates
     */
    findAll(organizationId?: string): Promise<SmsTemplate[]>;
    /**
     * Find a template by ID
     */
    findOne(id: string, organizationId?: string): Promise<SmsTemplate>;
    /**
     * Find a template by type and organization
     */
    findByType(type: SmsTemplateType, organizationId: string): Promise<SmsTemplate>;
    /**
     * Create a new SMS template
     */
    create(data: Partial<SmsTemplate>): Promise<SmsTemplate>;
    /**
     * Update an existing SMS template
     */
    update(id: string, data: Partial<SmsTemplate>, organizationId?: string): Promise<SmsTemplate>;
    /**
     * Delete an SMS template
     */
    remove(id: string, organizationId?: string): Promise<void>;
    /**
     * Render a template with variables
     */
    renderTemplate(template: SmsTemplate, variables: Record<string, any>): string;
}
