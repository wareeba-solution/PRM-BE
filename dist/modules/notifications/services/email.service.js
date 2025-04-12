"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const Handlebars = __importStar(require("handlebars"));
const email_template_entity_1 = require("../../email/entities/email-template.entity");
const email_queue_entity_1 = require("../entities/email-queue.entity");
const email_log_entity_1 = require("../entities/email-log.entity");
const email_content_entity_1 = require("../entities/email-content.entity");
const email_status_enum_1 = require("../enums/email-status.enum");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = EmailService_1 = class EmailService {
    constructor(emailTemplateRepository, emailQueueRepository, emailLogRepository, emailContentRepository, configService, mailerService) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.emailQueueRepository = emailQueueRepository;
        this.emailLogRepository = emailLogRepository;
        this.emailContentRepository = emailContentRepository;
        this.configService = configService;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger(EmailService_1.name);
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
    async queueEmail(data) {
        const emailQueue = this.emailQueueRepository.create({
            recipient: data.recipient,
            subject: data.subject,
            templateId: data.templateId,
            variables: data.variables || {},
            organizationId: data.organizationId,
            cc: data.cc,
            bcc: data.bcc,
            status: email_status_enum_1.EmailStatus.PENDING,
            priority: 1,
            attempts: 0,
            maxAttempts: 3
        });
        return this.emailQueueRepository.save(emailQueue);
    }
    /**
     * Process queued emails
     */
    async processQueue(batchSize = 50) {
        const queuedEmails = await this.emailQueueRepository.find({
            where: [
                { status: email_status_enum_1.EmailStatus.PENDING, scheduledFor: (0, typeorm_2.IsNull)() },
                {
                    status: email_status_enum_1.EmailStatus.PENDING,
                    scheduledFor: (0, typeorm_2.LessThanOrEqual)(new Date())
                }
            ],
            take: batchSize,
            order: { createdAt: 'ASC' }
        });
        for (const email of queuedEmails) {
            try {
                await this.sendEmail(email);
            }
            catch (error) {
                this.logger.error(`Failed to send email ${email.id}:`, error);
                await this.handleSendError(email, error);
            }
        }
    }
    /**
     * Send a single email
     */
    async sendEmail(emailQueue) {
        try {
            // Update status to sending
            emailQueue.status = email_status_enum_1.EmailStatus.SENDING;
            await this.emailQueueRepository.save(emailQueue);
            // Get template
            const template = await this.emailTemplateRepository.findOne({
                where: {
                    id: emailQueue.templateId,
                    status: email_template_entity_1.EmailTemplateStatus.ACTIVE
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
                status: email_status_enum_1.EmailStatus.SENT,
                sentAt: new Date()
            });
            await this.emailLogRepository.save(emailLog);
            // Save email content with metadata and messageId
            const emailContent = this.emailContentRepository.create({
                emailLogId: emailLog.id,
                htmlContent,
                textContent,
                metadata: emailQueue.metadata || {},
                messageId: (mailResult === null || mailResult === void 0 ? void 0 : mailResult.messageId) || null // Store messageId in content
            });
            await this.emailContentRepository.save(emailContent);
            // Update queue status
            emailQueue.status = email_status_enum_1.EmailStatus.SENT;
            emailQueue.sentAt = new Date();
            await this.emailQueueRepository.save(emailQueue);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`, error.stack);
            // Update queue status
            emailQueue.status = email_status_enum_1.EmailStatus.FAILED;
            emailQueue.lastError = error.message;
            emailQueue.attempts += 1;
            await this.emailQueueRepository.save(emailQueue);
            // Create failed email log
            const emailLog = this.emailLogRepository.create({
                organizationId: emailQueue.organizationId,
                templateId: emailQueue.templateId,
                recipient: emailQueue.recipient,
                subject: emailQueue.subject,
                status: email_status_enum_1.EmailStatus.FAILED,
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
    async handleSendError(email, error) {
        const maxAttempts = this.configService.get('EMAIL_MAX_ATTEMPTS', 3);
        if (email.attempts >= maxAttempts) {
            // Create failed log entry
            const logEntry = this.emailLogRepository.create({
                organizationId: email.organizationId,
                templateId: email.templateId,
                recipient: email.recipient,
                subject: email.subject,
                status: email_status_enum_1.EmailStatus.FAILED,
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
        }
        else {
            // Update queue entry with error
            await this.emailQueueRepository.update(email.id, {
                status: email_status_enum_1.EmailStatus.PENDING,
                lastError: error.message,
            });
        }
    }
    /**
     * Compile template with variables
     */
    compileTemplate(template, variables) {
        try {
            const compiledTemplate = Handlebars.compile(template);
            return compiledTemplate(variables);
        }
        catch (error) {
            this.logger.error(`Failed to compile template: ${error.message}`, error.stack);
            throw error;
        }
    }
    /**
     * Get email logs for an organization
     */
    async getEmailLogs(organizationId, options = {}) {
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
    async updateTrackingStatus(messageId, status, metadata) {
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
            emailContent.metadata = Object.assign(Object.assign({}, (emailContent.metadata || {})), metadata);
            await this.emailContentRepository.save(emailContent);
        }
        await this.emailLogRepository.save(emailLog);
    }
};
EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_template_entity_1.EmailTemplate)),
    __param(1, (0, typeorm_1.InjectRepository)(email_queue_entity_1.EmailQueue)),
    __param(2, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailLog)),
    __param(3, (0, typeorm_1.InjectRepository)(email_content_entity_1.EmailContent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map