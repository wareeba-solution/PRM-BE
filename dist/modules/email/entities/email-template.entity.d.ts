import { Organization } from '../../organizations/entities/organization.entity';
/**
 * Email template status enum
 */
export declare enum EmailTemplateStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    INACTIVE = "inactive",
    ARCHIVED = "archived"
}
/**
 * Email template type enum
 */
export declare enum EmailTemplateType {
    TRANSACTIONAL = "transactional",
    MARKETING = "marketing",
    NOTIFICATION = "notification",
    REPORT = "report",
    GENERAL = "general"
}
/**
 * Email template entity
 */
export declare class EmailTemplate {
    id: string;
    organizationId: string;
    organization: Promise<Organization>;
    name: string;
    description?: string;
    type: EmailTemplateType;
    status: EmailTemplateStatus;
    subject: string;
    content: string;
    plainTextContent?: string;
    isDefault: boolean;
    category?: string;
    language?: string;
    variables?: Record<string, {
        type: string;
        description?: string;
        required?: boolean;
        defaultValue?: any;
    }>;
    metadata?: Record<string, any>;
    previewText?: string;
    fromEmail?: string;
    fromName?: string;
    replyToEmail?: string;
    headerImageUrl?: string;
    footerContent?: string;
    createdById?: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    lastUsedAt?: Date;
    useCount: number;
    /**
     * Processes template content by replacing variable placeholders with values
     * @param variables The values to replace placeholders with
     * @returns Processed email content
     */
    processContent(variables: Record<string, any>): string;
    /**
     * Processes email subject by replacing variable placeholders with values
     * @param variables The values to replace placeholders with
     * @returns Processed email subject
     */
    processSubject(variables: Record<string, any>): string;
}
