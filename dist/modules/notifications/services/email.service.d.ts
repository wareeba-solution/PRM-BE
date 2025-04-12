import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EmailTemplate } from '../../email/entities/email-template.entity';
import { EmailQueue } from '../entities/email-queue.entity';
import { EmailLog } from '../entities/email-log.entity';
import { EmailContent } from '../entities/email-content.entity';
import { EmailStatus } from '../enums/email-status.enum';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly emailTemplateRepository;
    private readonly emailQueueRepository;
    private readonly emailLogRepository;
    private readonly emailContentRepository;
    private readonly configService;
    private readonly mailerService;
    private readonly logger;
    private readonly transporter;
    constructor(emailTemplateRepository: Repository<EmailTemplate>, emailQueueRepository: Repository<EmailQueue>, emailLogRepository: Repository<EmailLog>, emailContentRepository: Repository<EmailContent>, configService: ConfigService, mailerService: MailerService);
    /**
     * Queue an email for sending
     */
    queueEmail(data: {
        recipient: string;
        subject: string;
        templateId: string;
        variables?: Record<string, any>;
        organizationId?: string;
        cc?: string[];
        bcc?: string[];
    }): Promise<EmailQueue>;
    /**
     * Process queued emails
     */
    processQueue(batchSize?: number): Promise<void>;
    /**
     * Send a single email
     */
    sendEmail(emailQueue: EmailQueue): Promise<boolean>;
    /**
     * Handle email send errors
     */
    private handleSendError;
    /**
     * Compile template with variables
     */
    private compileTemplate;
    /**
     * Get email logs for an organization
     */
    getEmailLogs(organizationId: string, options?: {
        status?: EmailStatus;
        from?: Date;
        to?: Date;
        limit?: number;
        offset?: number;
    }): Promise<[EmailLog[], number]>;
    /**
     * Update email tracking status
     */
    updateTrackingStatus(messageId: string, status: EmailStatus, metadata?: Record<string, any>): Promise<void>;
}
