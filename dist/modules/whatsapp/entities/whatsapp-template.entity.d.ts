import { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
export { WhatsappTemplateStatus, WhatsappTemplateCategory, WhatsappTemplateComponentType, WhatsappTemplateHeaderType, WhatsappTemplateButtonType } from '../enums/whatsapp-template.enums';
/**
 * Interface for template button
 */
export interface WhatsappTemplateButton {
    type: WhatsappTemplateButtonType;
    text: string;
    url?: string;
    phoneNumber?: string;
    payload?: string;
}
/**
 * Interface for template component
 */
export interface WhatsappTemplateComponent {
    type: WhatsappTemplateComponentType;
    text?: string;
    format?: WhatsappTemplateHeaderType;
    example?: {
        header_text?: string[];
        body_text?: string[][];
        header_handle?: string[];
    };
    buttons?: WhatsappTemplateButton[];
}
/**
 * Whatsapp template entity
 */
export declare class WhatsappTemplate {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    category: WhatsappTemplateCategory;
    status: WhatsappTemplateStatus;
    language: string;
    externalTemplateId?: string;
    components: WhatsappTemplateComponent[];
    isDefault: boolean;
    submittedAt?: Date;
    approvedAt?: Date;
    rejectionReason?: string;
    metadata?: Record<string, any>;
    useCount: number;
    lastUsedAt?: Date;
    createdById?: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    /**
     * Get template variable placeholders
     * Extracts all {{variable}} patterns from components
     */
    getVariables(): string[];
    /**
     * Get the body text of the template
     */
    getBodyText(): string | null;
    /**
     * Get the header text of the template
     */
    getHeaderText(): string | null;
    /**
     * Process template with variables
     */
    processTemplate(variables?: Record<string, any>): {
        body: string;
        header?: string;
        footer?: string;
        buttons?: WhatsappTemplateButton[];
    };
    /**
     * Process text by replacing variables
     */
    private processText;
}
