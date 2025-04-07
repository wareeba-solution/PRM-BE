import { MessageTemplateType } from '../enums/message-template-type.enum';
import { MessageTemplateCategory } from '../enums/message-template-category.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
export declare class MessageTemplate {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    type: MessageTemplateType;
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
