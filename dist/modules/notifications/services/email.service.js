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
const email_template_entity_1 = require("../entities/email-template.entity");
const email_queue_entity_1 = require("../entities/email-queue.entity");
const email_log_entity_1 = require("../entities/email-log.entity");
const email_status_enum_1 = require("../enums/email-status.enum");
let EmailService = EmailService_1 = class EmailService {
    async sendAppointmentReminder(email, details) {
        // Implementation for sending email reminder
        // Example:
        console.log(`Sending email to ${email} with details:`, details);
    }
    constructor(templateRepository, queueRepository, logRepository, configService) {
        this.templateRepository = templateRepository;
        this.queueRepository = queueRepository;
        this.logRepository = logRepository;
        this.configService = configService;
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
    async queueEmail(options) {
        let htmlContent = options.htmlContent;
        let textContent = options.textContent;
        // If template is specified, fetch and compile it
        if (options.template) {
            const template = await this.templateRepository.findOne({
                where: {
                    name: options.template,
                    organizationId: options.organizationId,
                    isActive: true
                }
            });
            if (template) {
                htmlContent = this.compileTemplate(template.htmlContent, options.variables);
                textContent = template.textContent ?
                    this.compileTemplate(template.textContent, options.variables) :
                    undefined;
            }
        }
        // Create queue entry
        const queueEntry = this.queueRepository.create({
            recipient: Array.isArray(options.to) ? options.to.join(',') : options.to,
            subject: options.subject,
            htmlContent,
            textContent,
            variables: options.variables,
            metadata: options.metadata,
            organizationId: options.organizationId,
            scheduledFor: options.scheduledFor,
            status: email_status_enum_1.EmailStatus.PENDING,
        });
        return this.queueRepository.save(queueEntry);
    }
    /**
     * Process queued emails
     */
    async processQueue(batchSize = 50) {
        const queuedEmails = await this.queueRepository.find({
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
    async sendEmail(queuedEmail) {
        // Update status to sending
        await this.queueRepository.update(queuedEmail.id, {
            status: email_status_enum_1.EmailStatus.SENDING,
            attempts: () => '"attempts" + 1'
        });
        // Prepare email data
        const mailOptions = {
            from: this.configService.get('MAIL_FROM'),
            to: queuedEmail.recipient,
            subject: queuedEmail.subject,
            html: queuedEmail.htmlContent,
            text: queuedEmail.textContent,
        };
        try {
            // Send email
            const result = await this.transporter.sendMail(mailOptions);
            // Create log entry
            const logEntry = this.logRepository.create({
                organizationId: queuedEmail.organizationId,
                templateId: queuedEmail.templateId,
                recipient: queuedEmail.recipient,
                subject: queuedEmail.subject,
                htmlContent: queuedEmail.htmlContent,
                textContent: queuedEmail.textContent,
                metadata: queuedEmail.metadata,
                status: email_status_enum_1.EmailStatus.SENT,
                messageId: result.messageId,
                sentAt: new Date(),
            });
            await this.logRepository.save(logEntry);
            // Remove from queue
            await this.queueRepository.delete(queuedEmail.id);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Handle email send errors
     */
    async handleSendError(email, error) {
        const maxAttempts = this.configService.get('EMAIL_MAX_ATTEMPTS', 3);
        if (email.attempts >= maxAttempts) {
            // Create failed log entry
            const logEntry = this.logRepository.create({
                organizationId: email.organizationId,
                templateId: email.templateId,
                recipient: email.recipient,
                subject: email.subject,
                htmlContent: email.htmlContent,
                textContent: email.textContent,
                metadata: email.metadata,
                status: email_status_enum_1.EmailStatus.FAILED,
                error: error.message,
                sentAt: new Date(),
            });
            await this.logRepository.save(logEntry);
            await this.queueRepository.delete(email.id);
        }
        else {
            // Update queue entry with error
            await this.queueRepository.update(email.id, {
                status: email_status_enum_1.EmailStatus.PENDING,
                lastError: error.message,
            });
        }
    }
    /**
     * Compile template with variables
     */
    compileTemplate(template, variables = {}) {
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(variables);
    }
    /**
     * Get email logs for an organization
     */
    async getEmailLogs(organizationId, options = {}) {
        const query = this.logRepository.createQueryBuilder('log')
            .where('log.organizationId = :organizationId', { organizationId });
        if (options.status) {
            query.andWhere('log.status = :status', { status: options.status });
        }
        if (options.from) {
            query.andWhere('log.createdAt >= :from', { from: options.from });
        }
        if (options.to) {
            query.andWhere('log.createdAt <= :to', { to: options.to });
        }
        return query
            .orderBy('log.createdAt', 'DESC')
            .take(options.limit || 50)
            .skip(options.offset || 0)
            .getManyAndCount();
    }
    /**
     * Update email tracking status
     */
    async updateTrackingStatus(messageId, status, metadata) {
        const log = await this.logRepository.findOne({
            where: { messageId }
        });
        if (!log) {
            return;
        }
        const update = { status };
        switch (status) {
            case email_status_enum_1.EmailStatus.DELIVERED:
                update.deliveredAt = new Date();
                break;
            case email_status_enum_1.EmailStatus.OPENED:
                update.openedAt = new Date();
                break;
            case email_status_enum_1.EmailStatus.CLICKED:
                update.clickedAt = new Date();
                break;
        }
        if (metadata) {
            update.metadata = Object.assign(Object.assign({}, log.metadata), metadata);
        }
        await this.logRepository.update(log.id, update);
    }
};
EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_template_entity_1.EmailTemplate)),
    __param(1, (0, typeorm_1.InjectRepository)(email_queue_entity_1.EmailQueue)),
    __param(2, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map