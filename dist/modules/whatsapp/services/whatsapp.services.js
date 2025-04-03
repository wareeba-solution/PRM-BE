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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const axios_1 = __importDefault(require("axios"));
const whatsapp_message_entity_1 = require("../entities/whatsapp-message.entity");
const whatsapp_template_entity_1 = require("../entities/whatsapp-template.entity");
const whatsapp_message_status_enum_1 = require("../enums/whatsapp-message-status.enum");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(configService, eventEmitter, messageRepository, templateRepository) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.messageRepository = messageRepository;
        this.templateRepository = templateRepository;
        this.logger = new common_1.Logger(WhatsappService_1.name);
        this.maxRetries = 3;
        this.client = axios_1.default.create({
            baseURL: this.configService.get('WHATSAPP_API_URL'),
            headers: {
                'Authorization': `Bearer ${this.configService.get('WHATSAPP_API_TOKEN')}`,
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        });
    }
    async sendAppointmentReminder(whatsappNumber, data) {
        try {
            const template = await this.templateRepository.findOne({
                where: { name: 'appointment_reminder' }
            });
            if (!template) {
                throw new Error('Appointment reminder template not found');
            }
            await this.sendMessage({
                to: whatsappNumber,
                template: 'appointment_reminder',
                parameters: {
                    header: data.organizationName,
                    body: {
                        patientName: data.patientName,
                        doctorName: data.doctorName,
                        dateTime: data.dateTime.toLocaleString(),
                        location: data.location
                    }
                },
                metadata: {
                    appointmentId: data.appointmentId,
                    type: 'APPOINTMENT_REMINDER'
                }
            });
        }
        catch (error) {
            this.logger.error(`Failed to send WhatsApp reminder to ${whatsappNumber}:`, error);
            throw error;
        }
    }
    async sendMessage(options) {
        try {
            // Format phone number
            const formattedNumber = this.formatPhoneNumber(options.to);
            // Validate phone number
            if (!this.isValidPhoneNumber(formattedNumber)) {
                throw new Error(`Invalid phone number: ${options.to}`);
            }
            let messageData;
            if (options.template) {
                messageData = await this.prepareTemplateMessage(options);
            }
            else if (options.mediaUrl) {
                messageData = await this.prepareMediaMessage(options);
            }
            else {
                messageData = this.prepareTextMessage(options);
            }
            // Create message record
            const message = this.messageRepository.create({
                to: formattedNumber,
                messageType: options.template ? 'template' : options.mediaUrl ? 'media' : 'text',
                content: messageData,
                metadata: options.metadata,
                status: this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.PENDING),
                retryCount: 0,
            });
            await this.messageRepository.save(message);
            // Send message
            const response = await this.client.post('/messages', Object.assign({ messaging_product: 'whatsapp', recipient_type: 'individual', to: formattedNumber }, messageData));
            // Update message with WhatsApp message ID
            message.whatsappMessageId = response.data.messages[0].id;
            message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT);
            message.sentAt = new Date();
            await this.messageRepository.save(message);
            // Emit event
            this.eventEmitter.emit('whatsapp.message.sent', message);
            return message;
        }
        catch (error) {
            this.logger.error('Error sending WhatsApp message:', error);
            throw error;
        }
    }
    async prepareTemplateMessage(options) {
        const template = await this.templateRepository.findOne({
            where: { name: options.template }
        });
        if (!template) {
            throw new Error(`Template not found: ${options.template}`);
        }
        return {
            type: 'template',
            template: {
                name: template.name,
                language: {
                    code: template.language
                },
                components: this.buildTemplateComponents(template, options.parameters)
            }
        };
    }
    async prepareMediaMessage(options) {
        if (!options.mediaType) {
            throw new Error('Media type is required for media messages');
        }
        return {
            type: options.mediaType.toLowerCase(),
            [options.mediaType.toLowerCase()]: {
                link: options.mediaUrl
            },
            text: options.text
        };
    }
    prepareTextMessage(options) {
        if (!options.text) {
            throw new Error('Text is required for text messages');
        }
        return {
            type: 'text',
            text: {
                body: options.text,
                preview_url: true
            }
        };
    }
    buildTemplateComponents(template, parameters) {
        const components = [];
        // Find header component if it exists
        const headerComponent = template.components.find(c => c.type === whatsapp_template_entity_1.WhatsappTemplateComponentType.HEADER);
        if (headerComponent && (parameters === null || parameters === void 0 ? void 0 : parameters.header)) {
            components.push({
                type: 'header',
                parameters: this.formatParameters(headerComponent.format || whatsapp_template_entity_1.WhatsappTemplateHeaderType.TEXT, parameters.header)
            });
        }
        if (parameters === null || parameters === void 0 ? void 0 : parameters.body) {
            components.push({
                type: 'body',
                parameters: this.formatParameters('text', parameters.body)
            });
        }
        // Find button component if it exists
        const buttonComponent = template.components.find(c => c.type === whatsapp_template_entity_1.WhatsappTemplateComponentType.BUTTONS);
        if ((buttonComponent === null || buttonComponent === void 0 ? void 0 : buttonComponent.buttons) && (parameters === null || parameters === void 0 ? void 0 : parameters.buttons)) {
            components.push({
                type: 'button',
                sub_type: 'quick_reply',
                index: 0,
                parameters: parameters.buttons
            });
        }
        return components;
    }
    formatParameters(type, value) {
        switch (type) {
            case 'text':
                return [{ type: 'text', text: value }];
            case 'image':
                return [{ type: 'image', image: { link: value } }];
            case 'document':
                return [{ type: 'document', document: { link: value } }];
            case 'video':
                return [{ type: 'video', video: { link: value } }];
            default:
                return [{ type: 'text', text: value }];
        }
    }
    async handleWebhook(data) {
        try {
            const { entry } = data;
            for (const e of entry) {
                for (const change of e.changes) {
                    if (change.value.messages) {
                        await this.handleIncomingMessages(change.value.messages);
                    }
                    if (change.value.statuses) {
                        await this.handleMessageStatuses(change.value.statuses);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error('Error processing WhatsApp webhook:', error);
            throw error;
        }
    }
    async handleIncomingMessages(messages) {
        for (const message of messages) {
            try {
                // Create message record for incoming message
                const incomingMessage = this.messageRepository.create({
                    whatsappMessageId: message.id,
                    from: message.from,
                    messageType: message.type,
                    content: message,
                    status: this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.RECEIVED),
                    receivedAt: new Date(),
                });
                await this.messageRepository.save(incomingMessage);
                // Emit event
                this.eventEmitter.emit('whatsapp.message.received', incomingMessage);
            }
            catch (error) {
                this.logger.error('Error processing incoming WhatsApp message:', error);
            }
        }
    }
    async handleMessageStatuses(statuses) {
        for (const status of statuses) {
            try {
                const message = await this.messageRepository.findOne({
                    where: { whatsappMessageId: status.id }
                });
                if (message) {
                    message.status = this.mapWhatsAppStatus(status.status);
                    message.deliveredAt = status.status === 'delivered' ? new Date() : null;
                    message.readAt = status.status === 'read' ? new Date() : null;
                    await this.messageRepository.save(message);
                    // Emit event
                    this.eventEmitter.emit('whatsapp.message.status_updated', message);
                }
            }
            catch (error) {
                this.logger.error('Error processing WhatsApp message status:', error);
            }
        }
    }
    mapWhatsAppStatus(status) {
        // Create a mapping from WhatsApp API status to our enum
        const statusMapping = {
            'sent': whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT,
            'delivered': whatsapp_message_status_enum_1.WhatsAppMessageStatus.DELIVERED,
            'read': whatsapp_message_status_enum_1.WhatsAppMessageStatus.READ,
            'failed': whatsapp_message_status_enum_1.WhatsAppMessageStatus.FAILED,
            'pending': whatsapp_message_status_enum_1.WhatsAppMessageStatus.PENDING
        };
        // Get the mapped status or default to UNKNOWN
        const mappedStatus = statusMapping[status.toLowerCase()] || whatsapp_message_status_enum_1.WhatsAppMessageStatus.UNKNOWN;
        // Cast to MessageStatus (assuming they share the same string values)
        return mappedStatus;
    }
    formatPhoneNumber(phone) {
        // Remove any non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        // Ensure number starts with country code
        if (!cleaned.startsWith('1') && cleaned.length === 10) {
            return `1${cleaned}`;
        }
        return cleaned;
    }
    isValidPhoneNumber(phone) {
        // Basic validation for E.164 format
        return /^\d{11,15}$/.test(phone);
    }
    async getMessageStatus(messageId) {
        try {
            return await this.messageRepository.findOne({
                where: { id: messageId }
            });
        }
        catch (error) {
            this.logger.error(`Error getting message status for ${messageId}:`, error);
            throw error;
        }
    }
    async retryFailedMessages() {
        try {
            const failedMessages = await this.messageRepository.find({
                where: {
                    status: whatsapp_message_status_enum_1.WhatsAppMessageStatus.FAILED,
                    retryCount: (0, typeorm_2.LessThan)(this.maxRetries)
                }
            });
            for (const message of failedMessages) {
                try {
                    const response = await this.client.post('/messages', message.content);
                    message.whatsappMessageId = response.data.messages[0].id;
                    message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.SENT);
                    message.sentAt = new Date();
                    message.retryCount += 1;
                    await this.messageRepository.save(message);
                }
                catch (error) {
                    this.logger.error(`Error retrying message ${message.id}:`, error);
                    message.retryCount += 1;
                    message.lastError = error.message;
                    if (message.retryCount >= this.maxRetries) {
                        message.status = this.mapWhatsAppStatus(whatsapp_message_status_enum_1.WhatsAppMessageStatus.PERMANENTLY_FAILED);
                    }
                    await this.messageRepository.save(message);
                }
            }
        }
        catch (error) {
            this.logger.error('Error retrying failed messages:', error);
            throw error;
        }
    }
};
WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(whatsapp_message_entity_1.WhatsAppMessage)),
    __param(3, (0, typeorm_1.InjectRepository)(whatsapp_template_entity_1.WhatsappTemplate)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        event_emitter_1.EventEmitter2,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WhatsappService);
exports.WhatsappService = WhatsappService;
//# sourceMappingURL=whatsapp.services.js.map