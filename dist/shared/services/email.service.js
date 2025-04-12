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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = __importStar(require("nodemailer"));
const util_1 = require("util");
const dns = __importStar(require("dns"));
const email_template_entity_1 = require("../../modules/email/entities/email-template.entity");
const email_log_entity_1 = require("../../modules/notifications/entities/email-log.entity");
const email_queue_entity_1 = require("../../modules/notifications/entities/email-queue.entity");
const email_content_entity_1 = require("../../modules/notifications/entities/email-content.entity");
const email_status_enum_1 = require("../../modules/notifications/enums/email-status.enum");
const domain_verification_status_enum_1 = require("../../modules/domain/enums/domain-verification-status.enum");
const domain_verification_service_1 = require("../../modules/domain/services/domain-verification.service");
const Handlebars = __importStar(require("handlebars"));
let EmailService = EmailService_1 = class EmailService {
    constructor(configService, domainVerificationService, emailTemplateRepository, logRepository, queueRepository, contentRepository) {
        this.configService = configService;
        this.domainVerificationService = domainVerificationService;
        this.emailTemplateRepository = emailTemplateRepository;
        this.logRepository = logRepository;
        this.queueRepository = queueRepository;
        this.contentRepository = contentRepository;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.maxRetries = 3;
        this.resolveTxt = (0, util_1.promisify)(dns.resolveTxt);
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
    async send(notification) {
        // Implement notification-specific email sending
        return this.sendEmail({
            to: notification.recipient,
            subject: notification.title,
            template: notification.templateId,
            context: notification.data,
            metadata: { notificationId: notification.id }
        });
    }
    async sendEmail(options) {
        try {
            let htmlContent = '';
            let textContent = '';
            if (options.template) {
                const template = await this.emailTemplateRepository.findOne({
                    where: {
                        type: options.template,
                        status: email_template_entity_1.EmailTemplateStatus.ACTIVE
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
            }
            else {
                const result = await this.transporter.sendMail(emailData);
                await this.logEmail(emailData, result, options.metadata);
                return true;
            }
        }
        catch (error) {
            this.logger.error('Error sending email:', error);
            throw error;
        }
    }
    compileTemplate(template, variables = {}) {
        try {
            const compiledTemplate = Handlebars.compile(template);
            return compiledTemplate(variables);
        }
        catch (error) {
            this.logger.error('Error compiling template:', error);
            throw error;
        }
    }
    async processTemplate(template, context) {
        try {
            let html = template.content;
            let text = template.plainTextContent || '';
            Object.entries(context).forEach(([key, value]) => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                html = html.replace(regex, String(value));
                text = text.replace(regex, String(value));
            });
            return { html, text };
        }
        catch (error) {
            this.logger.error('Error processing email template:', error);
            throw error;
        }
    }
    async queueEmail(emailData, metadata) {
        const queueEntry = this.queueRepository.create({
            data: emailData,
            metadata,
            status: email_status_enum_1.EmailStatus.QUEUED,
            priority: emailData.priority === 'high' ? 1 : emailData.priority === 'low' ? 3 : 2,
            attempts: 0,
            maxAttempts: this.maxRetries,
        });
        await this.queueRepository.save(queueEntry);
    }
    async logEmail(emailData, result, metadata) {
        // Create log without messageId
        const log = this.logRepository.create({
            recipient: emailData.to,
            subject: emailData.subject,
            template: emailData.template,
            status: email_status_enum_1.EmailStatus.SENT,
            sentAt: new Date(),
        });
        // Save the log first to get an ID
        const savedLog = await this.logRepository.save(log);
        // Create content record with messageId and other data
        const content = this.contentRepository.create({
            emailLogId: savedLog.id,
            messageId: result.messageId,
            metadata: metadata || {},
            htmlContent: emailData.html || null,
            textContent: emailData.text || null
        });
        await this.contentRepository.save(content);
    }
    stripHtml(html) {
        return html.replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    generateHeaders(options) {
        const headers = {
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
    async verifyEmailDomain(domain) {
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
            return verificationStatus.status === domain_verification_status_enum_1.DomainVerificationStatus.VERIFIED && hasDmarc && hasSpf;
        }
        catch (error) {
            this.logger.error(`Error verifying email domain ${domain}:`, error);
            throw error;
        }
    }
    async verifyDmarcRecord(domain) {
        try {
            const records = await this.resolveTxt(`_dmarc.${domain}`);
            return records.some(record => record.join('').toLowerCase().includes('v=dmarc1'));
        }
        catch (error) {
            return false;
        }
    }
    async verifySpfRecord(domain) {
        try {
            const records = await this.resolveTxt(domain);
            return records.some(record => record.join('').toLowerCase().includes('v=spf1'));
        }
        catch (error) {
            return false;
        }
    }
    async getEmailStatus(messageId) {
        try {
            // Find by messageId in content entity instead of directly in log
            const content = await this.contentRepository.findOne({
                where: { messageId },
                relations: ['emailLog']
            });
            // Return the related email log if found
            return (content === null || content === void 0 ? void 0 : content.emailLog) || null;
        }
        catch (error) {
            this.logger.error(`Error getting email status for message ${messageId}:`, error);
            throw error;
        }
    }
    async processEmailQueue(batchSize = 10) {
        try {
            const queuedEmails = await this.queueRepository.find({
                where: {
                    status: email_status_enum_1.EmailStatus.QUEUED,
                    attempts: (0, typeorm_2.LessThan)(this.maxRetries)
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
                    queuedEmail.status = email_status_enum_1.EmailStatus.SENT;
                    queuedEmail.sentAt = new Date();
                    await this.queueRepository.save(queuedEmail);
                }
                catch (error) {
                    queuedEmail.attempts += 1;
                    queuedEmail.lastError = error.message;
                    queuedEmail.status = queuedEmail.attempts >= this.maxRetries
                        ? email_status_enum_1.EmailStatus.FAILED
                        : email_status_enum_1.EmailStatus.QUEUED;
                    await this.queueRepository.save(queuedEmail);
                }
            }
        }
        catch (error) {
            this.logger.error('Error processing email queue:', error);
            throw error;
        }
    }
    async cleanupEmailQueue(days = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            await this.queueRepository.delete({
                status: (0, typeorm_2.In)([email_status_enum_1.EmailStatus.SENT, email_status_enum_1.EmailStatus.FAILED]),
                updatedAt: (0, typeorm_2.LessThan)(cutoffDate)
            });
        }
        catch (error) {
            this.logger.error('Error cleaning up email queue:', error);
            throw error;
        }
    }
};
EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => domain_verification_service_1.DomainVerificationService))),
    __param(2, (0, typeorm_1.InjectRepository)(email_template_entity_1.EmailTemplate)),
    __param(3, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailLog)),
    __param(4, (0, typeorm_1.InjectRepository)(email_queue_entity_1.EmailQueue)),
    __param(5, (0, typeorm_1.InjectRepository)(email_content_entity_1.EmailContent)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        domain_verification_service_1.DomainVerificationService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map