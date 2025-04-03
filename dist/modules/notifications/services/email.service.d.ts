/// <reference types="node" />
/// <reference types="node" />
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EmailTemplate } from '../entities/email-template.entity';
import { EmailQueue } from '../entities/email-queue.entity';
import { EmailLog } from '../entities/email-log.entity';
import { EmailStatus } from '../enums/email-status.enum';
interface SendEmailOptions {
    to: string | string[];
    subject: string;
    template?: string;
    variables?: Record<string, any>;
    htmlContent?: string;
    textContent?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer | string;
        contentType?: string;
    }>;
    metadata?: Record<string, any>;
    organizationId: string;
    scheduledFor?: Date;
}
export declare class EmailService {
    private readonly templateRepository;
    private readonly queueRepository;
    private readonly logRepository;
    private readonly configService;
    private readonly logger;
    private readonly transporter;
    sendAppointmentReminder(email: string, details: {
        appointmentId: string;
        patientName: string;
        doctorName: string;
        dateTime: Date;
        location: string;
        notes: string;
        organizationName: string;
    }): Promise<void>;
    constructor(templateRepository: Repository<EmailTemplate>, queueRepository: Repository<EmailQueue>, logRepository: Repository<EmailLog>, configService: ConfigService);
    /**
     * Queue an email for sending
     */
    queueEmail(options: SendEmailOptions): Promise<EmailQueue>;
    /**
     * Process queued emails
     */
    processQueue(batchSize?: number): Promise<void>;
    /**
     * Send a single email
     */
    private sendEmail;
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
export {};
