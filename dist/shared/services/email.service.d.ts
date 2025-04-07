/// <reference types="node" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { EmailTemplate } from '../../modules/email/entities/email-template.entity';
import { EmailLog } from '../../modules/notifications/entities/email-log.entity';
import { EmailQueue } from '../../modules/notifications/entities/email-queue.entity';
import { EmailContent } from '../../modules/notifications/entities/email-content.entity';
import { DomainVerificationService } from '../../modules/domain/services/domain-verification.service';
import { Notification } from '../../modules/notifications/entities/notification.entity';
interface EmailOptions {
    to: string | string[];
    subject: string;
    template?: string;
    html?: string;
    context?: Record<string, any>;
    attachments?: Array<{
        filename: string;
        content: Buffer | string;
        contentType?: string;
    }>;
    priority?: 'high' | 'normal' | 'low';
    replyTo?: string;
    cc?: string | string[];
    bcc?: string | string[];
    metadata?: Record<string, any>;
}
export declare class EmailService {
    private readonly configService;
    private readonly emailTemplateRepository;
    private readonly logRepository;
    private readonly queueRepository;
    private readonly contentRepository;
    private readonly logger;
    private readonly transporter;
    private readonly maxRetries;
    private readonly resolveTxt;
    private readonly domainVerificationService;
    constructor(configService: ConfigService, domainVerificationService: DomainVerificationService, emailTemplateRepository: Repository<EmailTemplate>, logRepository: Repository<EmailLog>, queueRepository: Repository<EmailQueue>, contentRepository: Repository<EmailContent>);
    send(notification: Notification): Promise<boolean>;
    sendEmail(options: EmailOptions): Promise<boolean>;
    private compileTemplate;
    private processTemplate;
    private queueEmail;
    private logEmail;
    private stripHtml;
    private generateHeaders;
    verifyEmailDomain(domain: string): Promise<boolean>;
    private verifyDmarcRecord;
    private verifySpfRecord;
    getEmailStatus(messageId: string): Promise<EmailLog | null>;
    processEmailQueue(batchSize?: number): Promise<void>;
    cleanupEmailQueue(days?: number): Promise<void>;
}
export {};
