"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SmsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio_1 = __importDefault(require("twilio"));
let SmsService = SmsService_1 = class SmsService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SmsService_1.name);
        this.mockMode = false;
        try {
            const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
            const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
            this.fromNumber = this.configService.get('TWILIO_FROM_NUMBER') || '+15555555555'; // Default mock number
            if (accountSid && accountSid.startsWith('AC') && authToken) {
                this.twilioClient = (0, twilio_1.default)(accountSid, authToken);
                this.logger.log('Twilio client initialized successfully');
            }
            else {
                this.logger.warn('Invalid Twilio credentials - using mock client');
                this.initializeMockClient();
                this.mockMode = true;
            }
        }
        catch (error) {
            this.logger.warn(`Failed to initialize Twilio client: ${error.message}`);
            this.logger.warn('Using mock client instead');
            this.initializeMockClient();
            this.mockMode = true;
        }
    }
    initializeMockClient() {
        this.twilioClient = {
            messages: {
                create: async (params) => {
                    this.logger.log(`[MOCK] Sending SMS to ${params.to}: ${params.body}`);
                    return {
                        sid: `MOCK_${Date.now()}`,
                        to: params.to,
                        from: params.from,
                        body: params.body,
                        status: 'queued',
                        dateCreated: new Date(),
                        dateUpdated: new Date(),
                        errorMessage: null
                    };
                }
            }
        };
        // Mock the messages function to handle message fetching
        const originalMessages = this.twilioClient.messages;
        this.twilioClient.messages = (messageSid) => {
            if (typeof messageSid === 'string') {
                return {
                    fetch: async () => {
                        this.logger.log(`[MOCK] Fetching message status for ${messageSid}`);
                        return {
                            sid: messageSid,
                            status: 'delivered',
                            dateCreated: new Date(),
                            dateUpdated: new Date(),
                            errorMessage: null
                        };
                    }
                };
            }
            return originalMessages;
        };
    }
    async send(notification) {
        try {
            const { recipient, content } = notification;
            // Extract phone number from recipient
            const toNumber = this.formatPhoneNumber(recipient.phoneNumber);
            // Format content for SMS (strip HTML, limit length, etc.)
            const smsContent = this.formatContent(content);
            // Send SMS via Twilio
            const message = await this.twilioClient.messages.create(Object.assign({ body: smsContent, from: this.fromNumber, to: toNumber }, this.getOptionalParams(notification.metadata)));
            this.logger.debug(`SMS sent to ${toNumber}: ${message.sid}`);
        }
        catch (error) {
            this.logger.error('Failed to send SMS:', error);
            throw new Error(`SMS delivery failed: ${error.message}`);
        }
    }
    formatPhoneNumber(phoneNumber) {
        // Remove any non-numeric characters and ensure E.164 format
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (!cleaned.startsWith('1') && cleaned.length === 10) {
            return `+1${cleaned}`;
        }
        return `+${cleaned}`;
    }
    formatContent(content) {
        // Remove HTML tags
        let smsContent = content.replace(/<[^>]*>/g, '');
        // Trim whitespace and normalize spaces
        smsContent = smsContent.replace(/\s+/g, ' ').trim();
        // SMS length limit (160 chars for single message)
        if (smsContent.length > 160) {
            smsContent = smsContent.substring(0, 157) + '...';
        }
        return smsContent;
    }
    getOptionalParams(metadata = {}) {
        const params = {};
        // Handle optional Twilio parameters from metadata
        if (metadata === null || metadata === void 0 ? void 0 : metadata.statusCallback) {
            params.statusCallback = metadata.statusCallback;
        }
        if (metadata === null || metadata === void 0 ? void 0 : metadata.mediaUrl) {
            params.mediaUrl = metadata.mediaUrl;
        }
        return params;
    }
    async sendSms(phoneNumber, message) {
        if (this.mockMode) {
            this.logger.log(`[MOCK] Sending SMS to ${phoneNumber}: ${message}`);
            return {
                success: true,
                sid: `MOCK_${Date.now()}`,
                status: 'sent'
            };
        }
        const result = await this.twilioClient.messages.create({
            body: message,
            from: this.fromNumber,
            to: this.formatPhoneNumber(phoneNumber)
        });
        return {
            success: true,
            sid: result.sid,
            status: result.status
        };
    }
    async getDeliveryStatus(messageSid) {
        try {
            const message = await this.twilioClient.messages(messageSid).fetch();
            return {
                status: message.status,
                error: message.errorMessage,
                dateCreated: message.dateCreated,
                dateUpdated: message.dateUpdated
            };
        }
        catch (error) {
            this.logger.error(`Failed to get SMS status for ${messageSid}:`, error);
            throw new Error(`Failed to get SMS status: ${error.message}`);
        }
    }
};
SmsService = SmsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map