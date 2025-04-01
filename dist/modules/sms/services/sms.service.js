var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SmsService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
let SmsService = SmsService_1 = class SmsService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new Logger(SmsService_1.name);
        this.twilioClient = null;
        this.mockMode = false;
        this.initializeTwilioClient();
    }
    initializeTwilioClient() {
        try {
            const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
            const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
            const phoneNumber = this.configService.get('TWILIO_PHONE_NUMBER');
            if (accountSid === 'mock' || authToken === 'mock') {
                this.logger.warn('Mock Twilio configuration detected - using mock client');
                this.mockMode = true;
                return;
            }
            if (!accountSid || !authToken || !phoneNumber) {
                this.logger.warn('Invalid Twilio credentials - using mock client');
                this.mockMode = true;
                return;
            }
            try {
                const twilio = require('twilio');
                this.twilioClient = twilio(accountSid, authToken);
                this.logger.log('Twilio client initialized successfully');
            }
            catch (error) {
                this.logger.warn(`Failed to initialize Twilio client: ${error.message}`);
                this.mockMode = true;
            }
        }
        catch (error) {
            this.logger.warn(`Error setting up Twilio: ${error.message}`);
            this.mockMode = true;
        }
    }
    async sendSms(to, message) {
        if (this.mockMode || !this.twilioClient) {
            return this.sendMockSms(to, message);
        }
        try {
            const fromNumber = this.configService.get('TWILIO_PHONE_NUMBER');
            const result = await this.twilioClient.messages.create({
                body: message,
                from: fromNumber,
                to: to
            });
            this.logger.log(`SMS sent to ${to} with SID: ${result.sid}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to send SMS through Twilio: ${error.message}`);
            return this.sendMockSms(to, message);
        }
    }
    sendMockSms(to, message) {
        this.logger.log(`[MOCK] Sending SMS to ${to}`);
        this.logger.debug('[MOCK] SMS content:', message);
        return {
            sid: `MOCK_SMS_${Date.now()}`,
            status: 'delivered',
            dateCreated: new Date(),
            to: to,
            body: message
        };
    }
    async sendAppointmentReminder(appointment) {
        var _a, _b, _c;
        const reminderData = {
            appointmentId: appointment.id,
            patientName: ((_a = appointment.contact) === null || _a === void 0 ? void 0 : _a.firstName) || 'Patient',
            dateTime: appointment.dateTime || new Date(),
            organizationName: ((_b = appointment.organization) === null || _b === void 0 ? void 0 : _b.name) || 'Healthcare Provider'
        };
        const message = this.formatReminderMessage(reminderData);
        const phoneNumber = (_c = appointment.contact) === null || _c === void 0 ? void 0 : _c.phone;
        if (!phoneNumber) {
            this.logger.warn(`No phone number available for appointment ${appointment.id}`);
            return;
        }
        await this.sendSms(phoneNumber, message);
    }
    formatReminderMessage(data) {
        const date = data.dateTime.toLocaleDateString();
        const time = data.dateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `Hi ${data.patientName}, this is a reminder of your appointment with ${data.organizationName} on ${date} at ${time}. Reply CONFIRM to confirm your attendance.`;
    }
    isMockMode() {
        return this.mockMode;
    }
};
SmsService = SmsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SmsService);
export { SmsService };
//# sourceMappingURL=sms.service.js.map