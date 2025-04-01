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
import { Injectable, Logger } from '@nestjs/common';
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
})(EmailStatus || (EmailStatus = {}));
let EmailService = EmailService_1 = class EmailService {
    constructor() {
        this.logger = new Logger(EmailService_1.name);
    }
    async sendNotificationEmail(to, data) {
        this.logger.log(`[MOCK] Sending notification email to ${to}`);
    }
    async sendFollowUpEmail(email, details) {
        this.logger.log(`[MOCK] Sending follow-up email to ${email}`);
    }
    async sendMail(to, subject, body) {
        this.logger.log(`[MOCK] Sending email to ${to} with subject: ${subject}`);
        this.logger.debug('Email content:', body);
    }
    async sendAppointmentReminder(to, data) {
        try {
            this.logger.log(`[MOCK] Sending appointment reminder to ${to} for appointment ${data.appointmentId}`);
            const subject = `Appointment Reminder: ${data.patientName} with ${data.doctorName}`;
            const emailContent = this.compileTemplate("Dear {{patientName}}, this is a reminder of your appointment with {{doctorName}} at {{organizationName}} on {{dateTime}}. Location: {{location}}{{notes}}", data);
            this.logger.debug(`Subject: ${subject}`);
            this.logger.debug(`Content: ${emailContent}`);
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
    Injectable(),
    __metadata("design:paramtypes", [])
], EmailService);
export { EmailService };
//# sourceMappingURL=email.service.js.map