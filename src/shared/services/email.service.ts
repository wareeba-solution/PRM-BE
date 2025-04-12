import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { promisify } from 'util';
import * as dns from 'dns';
import { EmailTemplate, EmailTemplateType, EmailTemplateStatus } from '../../modules/email/entities/email-template.entity';
import { EmailLog } from '../../modules/notifications/entities/email-log.entity';
import { EmailQueue } from '../../modules/notifications/entities/email-queue.entity';
import { EmailContent } from '../../modules/notifications/entities/email-content.entity';
import { EmailStatus } from '../../modules/notifications/enums/email-status.enum';
import { DomainVerificationStatus } from '../../modules/domain/enums/domain-verification-status.enum';
import { DomainVerificationService } from '../../modules/domain/services/domain-verification.service';
import { Notification } from '../../modules/notifications/entities/notification.entity';
import * as Handlebars from 'handlebars';

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

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: nodemailer.Transporter;
    private readonly maxRetries = 3;
    private readonly resolveTxt = promisify(dns.resolveTxt);

    constructor(
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => DomainVerificationService))
        private readonly domainVerificationService: DomainVerificationService,
        @InjectRepository(EmailTemplate)
        private readonly emailTemplateRepository: Repository<EmailTemplate>,
        @InjectRepository(EmailLog)
        private readonly logRepository: Repository<EmailLog>,
        @InjectRepository(EmailQueue)
        private readonly queueRepository: Repository<EmailQueue>,
        @InjectRepository(EmailContent)
        private readonly contentRepository: Repository<EmailContent>
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: this.configService.get('SMTP_SECURE'),
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASSWORD'),
            },
            pool: true,
            maxConnections: 5,
            rateDelta: 1000,
            rateLimit: 5,
        });
    }

    async send(notification: Notification): Promise<boolean> {
        // Implement notification-specific email sending
        return this.sendEmail({
            to: notification.recipient,
            subject: notification.title,
            template: notification.templateId,
            context: notification.data,
            metadata: { notificationId: notification.id }
        });
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        try {
            let htmlContent: string = '';
            let textContent: string = '';

            if (options.template) {
                const template = await this.emailTemplateRepository.findOne({
                    where: {
                        type: options.template as EmailTemplateType,
                        status: EmailTemplateStatus.ACTIVE
                    }
                });

                if (!template) {
                    throw new Error(`Email template not found for type: ${options.template}`);
                }

                htmlContent = this.compileTemplate(template.content, options.context || {});
                textContent = template.plainTextContent || '';
            }

            const emailData = {
                from: this.configService.get('MAIL_FROM'),
                to: Array.isArray(options.to) ? options.to.join(',') : options.to,
                cc: options.cc,
                bcc: options.bcc,
                replyTo: options.replyTo,
                subject: options.subject,
                html: htmlContent,
                text: textContent || this.stripHtml(htmlContent),
                attachments: options.attachments,
                priority: options.priority || 'normal',
                headers: this.generateHeaders(options),
            };

            if (this.configService.get('EMAIL_QUEUE_ENABLED')) {
                await this.queueEmail(emailData, options.metadata);
                return true;
            } else {
                const result = await this.transporter.sendMail(emailData);
                await this.logEmail(emailData, result, options.metadata);
                return true;
            }
        } catch (error) {
            this.logger.error('Error sending email:', error);
            throw error;
        }
    }

    private compileTemplate(template: string, variables: Record<string, any> = {}): string {
        try {
            const compiledTemplate = Handlebars.compile(template);
            return compiledTemplate(variables);
        } catch (error) {
            this.logger.error('Error compiling template:', error);
            throw error;
        }
    }

    private async processTemplate(
        template: EmailTemplate,
        context: Record<string, any>
    ): Promise<{ html: string; text: string }> {
        try {
            let html = template.content;
            let text = template.plainTextContent || '';

            Object.entries(context).forEach(([key, value]) => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html = html.replace(regex, String(value));
                text = text.replace(regex, String(value));
            });

            return { html, text };
        } catch (error) {
            this.logger.error('Error processing email template:', error);
            throw error;
        }
    }

    private async queueEmail(
        emailData: any,
        metadata?: Record<string, any>
    ): Promise<void> {
        const queueEntry = this.queueRepository.create({
            data: emailData,
            metadata,
            status: EmailStatus.QUEUED,
            priority: emailData.priority === 'high' ? 1 : emailData.priority === 'low' ? 3 : 2,
            attempts: 0,
            maxAttempts: this.maxRetries,
        });

        await this.queueRepository.save(queueEntry);
    }

    private async logEmail(
        emailData: any,
        result: any,
        metadata?: Record<string, any>
    ): Promise<void> {
        // Create log without messageId
        const log = this.logRepository.create({
            recipient: emailData.to,
            subject: emailData.subject,
            template: emailData.template,
            status: EmailStatus.SENT,
            sentAt: new Date(),
        });

        // Save the log first to get an ID
        const savedLog = await this.logRepository.save(log);

        // Create content record with messageId and other data
        const content = this.contentRepository.create({
            emailLogId: savedLog.id,
            messageId: result.messageId, // Store messageId here in the content entity
            metadata: metadata || {},
            htmlContent: emailData.html || null,
            textContent: emailData.text || null
        });

        await this.contentRepository.save(content);
    }

    private stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    private generateHeaders(options: EmailOptions): Record<string, string> {
        const headers: Record<string, string> = {
            'X-Message-ID': `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
            'X-Priority': options.priority === 'high' ? '1' : options.priority === 'low' ? '5' : '3',
            'X-Environment': this.configService.get('NODE_ENV', 'development'),
            'X-Application': this.configService.get('APP_NAME', 'DefaultAppName'),
        };

        if (options.metadata) {
            headers['X-Metadata'] = Buffer.from(JSON.stringify(options.metadata)).toString('base64');
        }

        return headers;
    }

    async verifyEmailDomain(domain: string): Promise<boolean> {
        try {
            const verificationStatus = await this.domainVerificationService.getDomainVerificationStatus(domain);

            if (!verificationStatus) {
                throw new Error(`Domain ${domain} not found`);
            }

            const [hasDmarc, hasSpf] = await Promise.all([
                this.verifyDmarcRecord(domain),
                this.verifySpfRecord(domain)
            ]);

            if (!hasDmarc) {
                this.logger.warn(`DMARC record not found for domain ${domain}`);
            }

            if (!hasSpf) {
                this.logger.warn(`SPF record not found for domain ${domain}`);
            }

            return verificationStatus.status === DomainVerificationStatus.VERIFIED && hasDmarc && hasSpf;
        } catch (error) {
            this.logger.error(`Error verifying email domain ${domain}:`, error);
            throw error;
        }
    }

    private async verifyDmarcRecord(domain: string): Promise<boolean> {
        try {
            const records = await this.resolveTxt(`_dmarc.${domain}`);
            return records.some(record =>
                record.join('').toLowerCase().includes('v=dmarc1')
            );
        } catch (error) {
            return false;
        }
    }

    private async verifySpfRecord(domain: string): Promise<boolean> {
        try {
            const records = await this.resolveTxt(domain);
            return records.some(record =>
                record.join('').toLowerCase().includes('v=spf1')
            );
        } catch (error) {
            return false;
        }
    }

    async getEmailStatus(messageId: string): Promise<EmailLog | null> {
        try {
            // Find by messageId in content entity instead of directly in log
            const content = await this.contentRepository.findOne({
                where: { messageId },
                relations: ['emailLog']
            });

            // Return the related email log if found
            return content?.emailLog || null;
        } catch (error) {
            this.logger.error(`Error getting email status for message ${messageId}:`, error);
            throw error;
        }
    }

    async processEmailQueue(batchSize: number = 10): Promise<void> {
        try {
            const queuedEmails = await this.queueRepository.find({
                where: {
                    status: EmailStatus.QUEUED,
                    attempts: LessThan(this.maxRetries)
                },
                order: {
                    createdAt: 'ASC'
                },
                take: batchSize
            });

            for (const queuedEmail of queuedEmails) {
                try {
                    const result = await this.transporter.sendMail(queuedEmail.data);
                    await this.logEmail(queuedEmail.data, result, queuedEmail.metadata);

                    queuedEmail.status = EmailStatus.SENT;
                    queuedEmail.sentAt = new Date();
                    await this.queueRepository.save(queuedEmail);
                } catch (error) {
                    queuedEmail.attempts += 1;
                    queuedEmail.lastError = error.message;
                    queuedEmail.status = queuedEmail.attempts >= this.maxRetries
                        ? EmailStatus.FAILED
                        : EmailStatus.QUEUED;
                    await this.queueRepository.save(queuedEmail);
                }
            }
        } catch (error) {
            this.logger.error('Error processing email queue:', error);
            throw error;
        }
    }

    async cleanupEmailQueue(days: number = 30): Promise<void> {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);

            await this.queueRepository.delete({
                status: In([EmailStatus.SENT, EmailStatus.FAILED]),
                updatedAt: LessThan(cutoffDate)
            });
        } catch (error) {
            this.logger.error('Error cleaning up email queue:', error);
            throw error;
        }
    }
}