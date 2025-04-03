"use strict";
// src/jobs/email-queue.job.ts
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
var EmailQueueJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailQueueJob = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_log_entity_1 = require("../modules/email/entities/email-log.entity");
let EmailQueueJob = EmailQueueJob_1 = class EmailQueueJob {
    constructor(emailQueue, emailLogRepository, mailerService, configService) {
        this.emailQueue = emailQueue;
        this.emailLogRepository = emailLogRepository;
        this.mailerService = mailerService;
        this.configService = configService;
        this.logger = new common_1.Logger(EmailQueueJob_1.name);
    }
    async processEmailJob(job) {
        const { data } = job;
        try {
            this.logger.debug(`Processing email job ${job.id} to ${data.to}`);
            // Check rate limits
            await this.checkRateLimit(data.organizationId);
            // Send email
            await this.mailerService.sendMail({
                to: data.to,
                subject: data.subject,
                template: data.template,
                context: data.context,
                cc: data.cc,
                bcc: data.bcc,
                attachments: data.attachments,
            });
            // Log success
            await this.logEmail({
                jobId: job.id.toString(),
                to: Array.isArray(data.to) ? data.to.join(', ') : data.to,
                subject: data.subject,
                template: data.template,
                status: 'SUCCESS',
                organizationId: data.organizationId,
                userId: data.userId,
            });
            return { success: true };
        }
        catch (error) {
            // Log failure
            await this.logEmail({
                jobId: job.id.toString(),
                to: Array.isArray(data.to) ? data.to.join(', ') : data.to,
                subject: data.subject,
                template: data.template,
                status: 'FAILED',
                error: error.message,
                organizationId: data.organizationId,
                userId: data.userId,
            });
            // Handle specific errors
            if (this.isRetryableError(error)) {
                throw error; // Bull will retry based on configuration
            }
            this.logger.error(`Failed to process email job ${job.id}:`, error);
            return { success: false, error: error.message };
        }
    }
    async checkRateLimit(organizationId) {
        if (!organizationId)
            return;
        const key = `email:ratelimit:${organizationId}`;
        const limit = this.configService.get('email.rateLimit.perHour') || 100;
        // TypeORM query using MoreThanOrEqual for date comparison
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const count = await this.emailLogRepository.count({
            where: {
                organizationId,
                createdAt: (0, typeorm_2.MoreThanOrEqual)(oneHourAgo)
            },
        });
        if (count >= limit) {
            throw new Error('Rate limit exceeded');
        }
    }
    async logEmail(data) {
        try {
            await this.emailLogRepository.save(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
        }
        catch (error) {
            this.logger.error('Failed to log email:', error);
        }
    }
    isRetryableError(error) {
        return [
            'ECONNREFUSED',
            'ECONNRESET',
            'ETIMEDOUT',
            'ESOCKET',
        ].includes(error.code) || error.message.includes('rate limit');
    }
    // Queue management methods
    async addToQueue(data) {
        return this.emailQueue.add('send', data, {
            priority: data.priority || 0,
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
    }
    async addBulkToQueue(emails) {
        const jobs = emails.map(email => ({
            name: 'send',
            data: email,
            opts: {
                priority: email.priority || 0,
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
                removeOnComplete: true,
                removeOnFail: false,
            },
        }));
        return this.emailQueue.addBulk(jobs);
    }
    // Monitoring methods
    async getQueueStatus() {
        const [waiting, active, completed, failed] = await Promise.all([
            this.emailQueue.getWaitingCount(),
            this.emailQueue.getActiveCount(),
            this.emailQueue.getCompletedCount(),
            this.emailQueue.getFailedCount(),
        ]);
        return {
            waiting,
            active,
            completed,
            failed,
        };
    }
    async cleanupOldJobs() {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await this.emailQueue.clean(30 * 24 * 60 * 60 * 1000, 'completed');
        await this.emailQueue.clean(30 * 24 * 60 * 60 * 1000, 'failed');
        // Clean up logs using TypeORM's LessThan operator
        await this.emailLogRepository.delete({
            createdAt: (0, typeorm_2.LessThan)(thirtyDaysAgo)
        });
    }
};
__decorate([
    (0, bull_1.Process)('send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailQueueJob.prototype, "processEmailJob", null);
EmailQueueJob = EmailQueueJob_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('email'),
    __param(0, (0, bull_1.InjectQueue)('email')),
    __param(1, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailLog)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        mailer_1.MailerService,
        config_1.ConfigService])
], EmailQueueJob);
exports.EmailQueueJob = EmailQueueJob;
//# sourceMappingURL=email-queue.job.js.map