import { Repository } from 'typeorm';
import { EmailTemplate, EmailTemplateStatus, EmailTemplateType } from '../entities/email-template.entity';
export declare class EmailTemplateService {
    private emailTemplateRepository;
    private readonly defaultTemplatePath;
    constructor(emailTemplateRepository: Repository<EmailTemplate>);
    /**
     * Find a template by ID
     */
    findById(id: string, organizationId: string): Promise<EmailTemplate>;
    /**
     * Find a template by name
     */
    findByName(name: string, organizationId: string): Promise<EmailTemplate | null>;
    /**
     * Get all templates for an organization
     */
    findAll(options: {
        organizationId: string;
        status?: EmailTemplateStatus | EmailTemplateStatus[];
        type?: EmailTemplateType;
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: EmailTemplate[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Create a new email template
     */
    create(data: Partial<EmailTemplate>): Promise<EmailTemplate>;
    /**
     * Update an existing email template
     */
    update(id: string, organizationId: string, data: Partial<EmailTemplate>): Promise<EmailTemplate>;
    /**
     * Delete an email template
     */
    delete(id: string, organizationId: string): Promise<void>;
    /**
     * Load and compile template from file
     */
    loadTemplateFromFile(filename: string): Promise<string>;
    /**
     * Render template with variables
     */
    renderTemplate(content: string, variables?: Record<string, any>): string;
    /**
     * Render a template by ID with variables
     */
    renderTemplateById(id: string, organizationId: string, variables?: Record<string, any>): Promise<{
        subject: string;
        content: string;
        plainTextContent?: string;
    }>;
    /**
     * Get template categories for an organization
     */
    getCategories(organizationId: string): Promise<string[]>;
    /**
     * Clone a template
     */
    cloneTemplate(id: string, organizationId: string, newName?: string): Promise<EmailTemplate>;
    /**
     * Register custom Handlebars helpers
     */
    private registerHandlebarsHelpers;
}
