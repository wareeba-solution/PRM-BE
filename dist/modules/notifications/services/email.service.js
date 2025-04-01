var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as Handlebars from 'handlebars';
import { EmailTemplate } from '../entities/email-template.entity';
import { EmailQueue } from '../entities/email-queue.entity';
import { EmailLog } from '../entities/email-log.entity';
import { EmailStatus } from '../enums/email-status.enum';
let EmailService = EmailService_1 = class EmailService {
    async sendAppointmentReminder(email, details) {
        console.log(`Sending email to ${email} with details:`, details);
    }
    constructor(templateRepository, queueRepository, logRepository, configService) {
        this.templateRepository = templateRepository;
        this.queueRepository = queueRepository;
        this.logRepository = logRepository;
        this.configService = configService;
        this.logger = new Logger(EmailService_1.name);
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
    async queueEmail(options) {
        let htmlContent = options.htmlContent;
        let textContent = options.textContent;
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
        const queueEntry = this.queueRepository.create({
            recipient: Array.isArray(options.to) ? options.to.join(',') : options.to,
            subject: options.subject,
            htmlContent,
            textContent,
            variables: options.variables,
            metadata: options.metadata,
            organizationId: options.organizationId,
            scheduledFor: options.scheduledFor,
            status: EmailStatus.PENDING,
        });
        return this.queueRepository.save(queueEntry);
    }
    async processQueue(batchSize = 50) {
        const queuedEmails = await this.queueRepository.find({
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
            }
            catch (error) {
                this.logger.error(`Failed to send email ${email.id}:`, error);
                await this.handleSendError(email, error);
            }
        }
    }
    async sendEmail(queuedEmail) {
        await this.queueRepository.update(queuedEmail.id, {
            status: EmailStatus.SENDING,
            attempts: () => '"attempts" + 1'
        });
        const mailOptions = {
            from: this.configService.get('MAIL_FROM'),
            to: queuedEmail.recipient,
            subject: queuedEmail.subject,
            html: queuedEmail.htmlContent,
            text: queuedEmail.textContent,
        };
        try {
            const result = await this.transporter.sendMail(mailOptions);
            const logEntry = this.logRepository.create({
                organizationId: queuedEmail.organizationId,
                templateId: queuedEmail.templateId,
                recipient: queuedEmail.recipient,
                subject: queuedEmail.subject,
                htmlContent: queuedEmail.htmlContent,
                textContent: queuedEmail.textContent,
                metadata: queuedEmail.metadata,
                status: EmailStatus.SENT,
                messageId: result.messageId,
                sentAt: new Date(),
            });
            await this.logRepository.save(logEntry);
            await this.queueRepository.delete(queuedEmail.id);
        }
        catch (error) {
            throw error;
        }
    }
    async handleSendError(email, error) {
        const maxAttempts = this.configService.get('EMAIL_MAX_ATTEMPTS', 3);
        if (email.attempts >= maxAttempts) {
            const logEntry = this.logRepository.create({
                organizationId: email.organizationId,
                templateId: email.templateId,
                recipient: email.recipient,
                subject: email.subject,
                htmlContent: email.htmlContent,
                textContent: email.textContent,
                metadata: email.metadata,
                status: EmailStatus.FAILED,
                error: error.message,
                sentAt: new Date(),
            });
            await this.logRepository.save(logEntry);
            await this.queueRepository.delete(email.id);
        }
        else {
            await this.queueRepository.update(email.id, {
                status: EmailStatus.PENDING,
                lastError: error.message,
            });
        }
    }
    compileTemplate(template, variables = {}) {
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(variables);
    }
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
    async updateTrackingStatus(messageId, status, metadata) {
        const log = await this.logRepository.findOne({
            where: { messageId }
        });
        if (!log) {
            return;
        }
        const update = { status };
        switch (status) {
            case EmailStatus.DELIVERED:
                update.deliveredAt = new Date();
                break;
            case EmailStatus.OPENED:
                update.openedAt = new Date();
                break;
            case EmailStatus.CLICKED:
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
    Injectable(),
    __param(0, InjectRepository(EmailTemplate)),
    __param(1, InjectRepository(EmailQueue)),
    __param(2, InjectRepository(EmailLog)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        ConfigService])
], EmailService);
export { EmailService };
//# sourceMappingURL=email.service.js.map