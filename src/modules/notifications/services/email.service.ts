import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as Handlebars from 'handlebars';
import { EmailTemplate, EmailTemplateType, EmailTemplateStatus } from '../../email/entities/email-template.entity';
import { EmailQueue } from '../entities/email-queue.entity';
import { EmailLog } from '../entities/email-log.entity';
import { EmailContent } from '../entities/email-content.entity';
import { EmailStatus } from '../enums/email-status.enum';
import { MailerService } from '@nestjs-modules/mailer';

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

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(
      @InjectRepository(EmailTemplate)
      private readonly emailTemplateRepository: Repository<EmailTemplate>,
      @InjectRepository(EmailQueue)
      private readonly emailQueueRepository: Repository<EmailQueue>,
      @InjectRepository(EmailLog)
      private readonly emailLogRepository: Repository<EmailLog>,
      @InjectRepository(EmailContent)
      private readonly emailContentRepository: Repository<EmailContent>,
      private readonly configService: ConfigService,
      private readonly mailerService: MailerService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  /**
   * Queue an email for sending
   */
  async queueEmail(data: {
    recipient: string;
    subject: string;
    templateId: string;
    variables?: Record<string, any>;
    organizationId?: string;
    cc?: string[];
    bcc?: string[];
  }): Promise<EmailQueue> {
    const emailQueue = this.emailQueueRepository.create({
      recipient: data.recipient,
      subject: data.subject,
      templateId: data.templateId,
      variables: data.variables || {},
      organizationId: data.organizationId,
      cc: data.cc,
      bcc: data.bcc,
      status: EmailStatus.PENDING,
      priority: 1,
      attempts: 0,
      maxAttempts: 3
    });

    return this.emailQueueRepository.save(emailQueue);
  }

  /**
   * Process queued emails
   */
  async processQueue(batchSize: number = 50): Promise<void> {
    const queuedEmails = await this.emailQueueRepository.find({
      where: [
        { status: EmailStatus.PENDING, scheduledFor: IsNull() },
        {
          status: EmailStatus.PENDING,
          scheduledFor: LessThanOrEqual(new Date())
        }
      ],
      take: batchSize,
      order: { createdAt: 'ASC' }
    });

    for (const email of queuedEmails) {
      try {
        await this.sendEmail(email);
      } catch (error) {
        this.logger.error(`Failed to send email ${email.id}:`, error);
        await this.handleSendError(email, error);
      }
    }
  }

  /**
   * Send a single email
   */
  async sendEmail(emailQueue: EmailQueue): Promise<boolean> {
    try {
      // Update status to sending
      emailQueue.status = EmailStatus.SENDING;
      await this.emailQueueRepository.save(emailQueue);

      // Get template
      const template = await this.emailTemplateRepository.findOne({
        where: {
          id: emailQueue.templateId,
          status: EmailTemplateStatus.ACTIVE
        }
      });

      if (!template) {
        throw new Error(`Email template not found: ${emailQueue.templateId}`);
      }

      // Compile content
      const htmlContent = this.compileTemplate(template.content, emailQueue.variables || {});
      const textContent = template.plainTextContent ?
          this.compileTemplate(template.plainTextContent, emailQueue.variables || {}) :
          '';

      // Send email
      const mailResult = await this.mailerService.sendMail({
        to: emailQueue.recipient,
        subject: emailQueue.subject,
        html: htmlContent,
        text: textContent,
        cc: emailQueue.cc,
        bcc: emailQueue.bcc,
        from: template.fromEmail || this.configService.get('mail.defaults.from'),
      });

      // Create email log (without messageId - it's now in content)
      const emailLog = this.emailLogRepository.create({
        organizationId: emailQueue.organizationId,
        templateId: emailQueue.templateId,
        recipient: emailQueue.recipient,
        subject: emailQueue.subject,
        status: EmailStatus.SENT,
        sentAt: new Date()
      });

      await this.emailLogRepository.save(emailLog);

      // Save email content with metadata and messageId
      const emailContent = this.emailContentRepository.create({
        emailLogId: emailLog.id,
        htmlContent,
        textContent,
        metadata: emailQueue.metadata || {}, // Store metadata in content
        messageId: mailResult?.messageId || null // Store messageId in content
      });

      await this.emailContentRepository.save(emailContent);

      // Update queue status
      emailQueue.status = EmailStatus.SENT;
      emailQueue.sentAt = new Date();
      await this.emailQueueRepository.save(emailQueue);

      return true;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);

      // Update queue status
      emailQueue.status = EmailStatus.FAILED;
      emailQueue.lastError = error.message;
      emailQueue.attempts += 1;
      await this.emailQueueRepository.save(emailQueue);

      // Create failed email log
      const emailLog = this.emailLogRepository.create({
        organizationId: emailQueue.organizationId,
        templateId: emailQueue.templateId,
        recipient: emailQueue.recipient,
        subject: emailQueue.subject,
        status: EmailStatus.FAILED,
        error: error.message
      });

      // Save log first to get ID
      const savedLog = await this.emailLogRepository.save(emailLog);

      // Create content with error details
      const emailContent = this.emailContentRepository.create({
        emailLogId: savedLog.id,
        metadata: emailQueue.metadata || {}
      });

      await this.emailContentRepository.save(emailContent);

      return false;
    }
  }

  /**
   * Handle email send errors
   */
  private async handleSendError(email: EmailQueue, error: any): Promise<void> {
    const maxAttempts = this.configService.get('EMAIL_MAX_ATTEMPTS', 3);

    if (email.attempts >= maxAttempts) {
      // Create failed log entry
      const logEntry = this.emailLogRepository.create({
        organizationId: email.organizationId,
        templateId: email.templateId,
        recipient: email.recipient,
        subject: email.subject,
        status: EmailStatus.FAILED,
        error: error.message,
        sentAt: new Date(),
      });

      // Save log first to get ID
      const savedLog = await this.emailLogRepository.save(logEntry);

      // Then save content with metadata
      const emailContent = this.emailContentRepository.create({
        emailLogId: savedLog.id,
        metadata: email.metadata || {}
      });

      await this.emailContentRepository.save(emailContent);
      await this.emailQueueRepository.delete(email.id);
    } else {
      // Update queue entry with error
      await this.emailQueueRepository.update(email.id, {
        status: EmailStatus.PENDING,
        lastError: error.message,
      });
    }
  }

  /**
   * Compile template with variables
   */
  private compileTemplate(template: string, variables: Record<string, any>): string {
    try {
      const compiledTemplate = Handlebars.compile(template);
      return compiledTemplate(variables);
    } catch (error) {
      this.logger.error(`Failed to compile template: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get email logs for an organization
   */
  async getEmailLogs(
      organizationId: string,
      options: {
        status?: EmailStatus;
        from?: Date;
        to?: Date;
        limit?: number;
        offset?: number;
      } = {}
  ): Promise<[EmailLog[], number]> {
    const query = this.emailLogRepository.createQueryBuilder('emailLog')
        .leftJoinAndSelect('emailLog.content', 'content')
        .where('emailLog.organizationId = :organizationId', { organizationId });

    if (options.status) {
      query.andWhere('emailLog.status = :status', { status: options.status });
    }

    if (options.from) {
      query.andWhere('emailLog.createdAt >= :from', { from: options.from });
    }

    if (options.to) {
      query.andWhere('emailLog.createdAt <= :to', { to: options.to });
    }

    if (options.limit) {
      query.take(options.limit);
    }

    if (options.offset) {
      query.skip(options.offset);
    }

    return query.getManyAndCount();
  }

  /**
   * Update email tracking status
   */
  async updateTrackingStatus(
      messageId: string,
      status: EmailStatus,
      metadata?: Record<string, any>
  ): Promise<void> {
    // Find by messageId in the content table instead of the log table
    const emailContent = await this.emailContentRepository.findOne({
      where: { messageId },
      relations: ['emailLog']
    });

    if (!emailContent || !emailContent.emailLog) {
      throw new Error(`Email log not found for messageId: ${messageId}`);
    }

    const emailLog = emailContent.emailLog;
    emailLog.status = status;

    // Update metadata in content entity
    if (metadata) {
      emailContent.metadata = {
        ...(emailContent.metadata || {}),
        ...metadata
      };
      await this.emailContentRepository.save(emailContent);
    }

    await this.emailLogRepository.save(emailLog);
  }
}