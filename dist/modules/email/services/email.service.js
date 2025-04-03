"use strict";
// src/modules/emails/email.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
// Comment out TypeORM imports that may be causing issues
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { EmailTemplate } from '../../notifications/entities/email-template.entity';
// import { Notification } from '../../notifications/entities/notification.entity';
// import { EmailQueue } from '../../notifications/entities/email-queue.entity';
// import { EmailLog } from '../../notifications/entities/email-log.entity';
// import { EmailStatus } from '../../notifications/enums/email-status.enum';
// Define EmailStatus enum locally if needed
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
})(EmailStatus || (EmailStatus = {}));
let EmailService = EmailService_1 = class EmailService {
    // Remove repository injections temporarily
    constructor() {
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    // constructor(
    //     @InjectRepository(EmailTemplate)
    //     private emailTemplateRepository: Repository<EmailTemplate>,
    //     @InjectRepository(EmailQueue)
    //     private emailQueueRepository: Repository<EmailQueue>,
    //     @InjectRepository(EmailLog)
    //     private emailLogRepository: Repository<EmailLog>,
    // ) {}
    async sendNotificationEmail(to, data) {
        this.logger.log(`[MOCK] Sending notification email to ${to}`);
        // Implement your email provider integration here
    }
    async sendFollowUpEmail(email, details) {
        this.logger.log(`[MOCK] Sending follow-up email to ${email}`);
        // Implementation for sending follow-up email
    }
    async sendMail(to, subject, body) {
        this.logger.log(`[MOCK] Sending email to ${to} with subject: ${subject}`);
        // Implement your email sending logic here
        // This is a placeholder implementation
        this.logger.debug('Email content:', body);
    }
    async sendAppointmentReminder(to, data) {
        try {
            this.logger.log(`[MOCK] Sending appointment reminder to ${to} for appointment ${data.appointmentId}`);
            // Mock template compilation and sending
            const subject = `Appointment Reminder: ${data.patientName} with ${data.doctorName}`;
            const emailContent = this.compileTemplate("Dear {{patientName}}, this is a reminder of your appointment with {{doctorName}} at {{organizationName}} on {{dateTime}}. Location: {{location}}{{notes}}", data);
            this.logger.debug(`Subject: ${subject}`);
            this.logger.debug(`Content: ${emailContent}`);
            // Mock repository operations
            this.logger.log('[MOCK] Email added to queue with status: PENDING');
            this.logger.log('[MOCK] Email log created with status: QUEUED');
        }
        catch (error) {
            this.logger.error(`Failed to send appointment reminder email to ${to}:`, error);
            throw error;
        }
    }
    compileTemplate(template, data) {
        return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => data[key.trim()] || '');
    }
};
EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map