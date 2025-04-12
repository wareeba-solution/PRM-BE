import { EmailStatus } from '../enums/email-status.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { EmailTemplate } from '../../email/entities/email-template.entity';
import { EmailContent } from './email-content.entity';
export declare class EmailLog {
    id: string;
    organizationId: string;
    organization: Organization;
    templateId: string;
    template: EmailTemplate;
    recipient: string;
    subject: string;
    status: EmailStatus;
    error: string;
    providerResponse: string;
    createdAt: Date;
    sentAt: Date;
    deliveredAt: Date;
    openedAt: Date;
    clickedAt: Date;
    content: EmailContent;
}
