import { MessageTemplateCategory } from '../enums/message-template-category.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
export declare enum TemplateType {
    APPOINTMENT_REMINDER = "APPOINTMENT_REMINDER",
    FOLLOW_UP = "FOLLOW_UP",
    LAB_RESULTS = "LAB_RESULTS",
    REFERRAL = "REFERRAL",
    MEDICATION_REMINDER = "MEDICATION_REMINDER",
    GENERAL = "GENERAL"
}
export declare class MessageTemplate {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    type: TemplateType;
    category: MessageTemplateCategory;
    subject?: string;
    content: string;
    variables?: string[];
    metadata?: {
        tags?: string[];
        language?: string;
        version?: string;
        [key: string]: any;
    };
    isActive: boolean;
    createdById: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: Promise<Organization>;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
}
