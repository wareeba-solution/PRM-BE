import { Repository } from 'typeorm';
import { WhatsappTemplate } from '../entities/whatsapp-template.entity';
import { ConfigService } from '@nestjs/config';
import { WhatsappTemplateStatus, WhatsappTemplateCategory } from '../enums/whatsapp-template.enums';
export { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
export declare class WhatsappTemplateService {
    private whatsappTemplateRepository;
    private configService;
    private readonly logger;
    constructor(whatsappTemplateRepository: Repository<WhatsappTemplate>, configService: ConfigService);
    /**
     * Find a template by ID
     */
    findById(id: string, organizationId: string): Promise<WhatsappTemplate>;
    /**
     * Find a template by name
     */
    findByName(name: string, organizationId: string): Promise<WhatsappTemplate | null>;
    /**
     * Get all templates for an organization
     */
    findAll(options: {
        organizationId: string;
        status?: WhatsappTemplateStatus | WhatsappTemplateStatus[];
        category?: WhatsappTemplateCategory | WhatsappTemplateCategory[];
        language?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: WhatsappTemplate[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Create a new WhatsApp template
     */
    create(data: Partial<WhatsappTemplate>): Promise<WhatsappTemplate>;
    /**
     * Update an existing WhatsApp template
     */
    update(id: string, organizationId: string, data: Partial<WhatsappTemplate>): Promise<WhatsappTemplate>;
    /**
     * Submit template for approval
     */
    submitForApproval(id: string, organizationId: string): Promise<WhatsappTemplate>;
    /**
     * Delete/archive a WhatsApp template
     */
    delete(id: string, organizationId: string): Promise<void>;
    /**
     * Get available languages for templates
     */
    getAvailableLanguages(): Promise<{
        code: string;
        name: string;
    }[]>;
    /**
     * Process variable placeholders in template text
     */
    processTemplateText(text: string, variables?: Record<string, any>): string;
    /**
     * Validate template structure
     */
    private validateTemplate;
    /**
     * Submit template to WhatsApp API (Meta/Facebook)
     * This is a placeholder for the actual API call
     */
    private submitTemplateToWhatsAppAPI;
    /**
     * Delete template from WhatsApp API (Meta/Facebook)
     * This is a placeholder for the actual API call
     */
    private deleteTemplateFromWhatsAppAPI;
    /**
     * Sync templates from WhatsApp API
     * This would be used to sync the status of pending templates
     */
    syncTemplatesFromWhatsAppAPI(organizationId: string): Promise<void>;
}
