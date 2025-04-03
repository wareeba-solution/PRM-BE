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
var WhatsAppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const axios_1 = __importDefault(require("axios"));
const whatsapp_message_entity_1 = require("../../modules/whatsapp/entities/whatsapp-message.entity"); // Import MessageDirection
const whatsapp_template_entity_1 = require("../../modules/whatsapp/entities/whatsapp-template.entity");
let WhatsAppService = WhatsAppService_1 = class WhatsAppService {
    constructor(configService, eventEmitter, messageRepository, templateRepository) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.messageRepository = messageRepository;
        this.templateRepository = templateRepository;
        this.logger = new common_1.Logger(WhatsAppService_1.name);
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
    async sendMessage(options) {
        try {
            const formattedNumber = this.formatPhoneNumber(options.to);
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
            const message = this.messageRepository.create({
                to: formattedNumber,
                messageType: options.template ? 'template' : options.mediaUrl ? 'media' : 'text',
                content: JSON.stringify(messageData),
                metadata: options.metadata,
                status: whatsapp_message_entity_1.MessageStatus.QUEUED,
                retryCount: 0,
                recipientPhone: formattedNumber,
            });
            await this.messageRepository.save(message);
            const response = await this.client.post('/messages', Object.assign({ messaging_product: 'whatsapp', recipient_type: 'individual', to: formattedNumber }, messageData));
            message.whatsappMessageId = response.data.messages[0].id;
            message.status = whatsapp_message_entity_1.MessageStatus.SENT;
            message.sentAt = new Date();
            await this.messageRepository.save(message);
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
            where: { name: options.template },
        });
        if (!template) {
            throw new Error(`Template not found: ${options.template}`);
        }
        return {
            type: 'template',
            template: {
                name: template.name,
                language: {
                    code: template.language,
                },
                components: this.buildTemplateComponents(template, options.parameters),
            },
        };
    }
    async prepareMediaMessage(options) {
        if (!options.mediaType) {
            throw new Error('Media type is required for media messages');
        }
        return {
            type: options.mediaType.toLowerCase(),
            [options.mediaType.toLowerCase()]: {
                link: options.mediaUrl,
            },
            text: options.text,
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
                preview_url: true,
            },
        };
    }
    buildTemplateComponents(template, parameters) {
        const components = [];
        if (parameters === null || parameters === void 0 ? void 0 : parameters.header) {
            components.push({
                type: 'header',
                parameters: this.formatParameters('text', parameters.header),
            });
        }
        if (parameters === null || parameters === void 0 ? void 0 : parameters.body) {
            components.push({
                type: 'body',
                parameters: this.formatParameters('text', parameters.body),
            });
        }
        if (parameters === null || parameters === void 0 ? void 0 : parameters.buttons) {
            components.push({
                type: 'button',
                sub_type: 'quick_reply',
                index: 0,
                parameters: parameters.buttons,
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
                const incomingMessage = this.messageRepository.create({
                    whatsappMessageId: message.id,
                    from: message.from,
                    messageType: message.type,
                    content: JSON.stringify(message),
                    status: whatsapp_message_entity_1.MessageStatus.QUEUED,
                    receivedAt: new Date(),
                    recipientPhone: message.from,
                    direction: whatsapp_message_entity_1.MessageDirection.INBOUND, // Use enum value
                });
                await this.messageRepository.save(incomingMessage);
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
                    where: { whatsappMessageId: status.id },
                });
                if (message) {
                    message.status = this.mapWhatsAppStatus(status.status);
                    message.deliveredAt = status.status === 'delivered' ? new Date() : message.deliveredAt;
                    message.readAt = status.status === 'read' ? new Date() : message.readAt;
                    await this.messageRepository.save(message);
                    this.eventEmitter.emit('whatsapp.message.status_updated', message);
                }
            }
            catch (error) {
                this.logger.error('Error processing WhatsApp message status:', error);
            }
        }
    }
    mapWhatsAppStatus(status) {
        switch (status.toLowerCase()) {
            case 'sent':
                return whatsapp_message_entity_1.MessageStatus.SENT;
            case 'delivered':
                return whatsapp_message_entity_1.MessageStatus.DELIVERED;
            case 'read':
                return whatsapp_message_entity_1.MessageStatus.READ;
            case 'failed':
                return whatsapp_message_entity_1.MessageStatus.FAILED;
            default:
                return whatsapp_message_entity_1.MessageStatus.UNKNOWN;
        }
    }
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (!cleaned.startsWith('1') && cleaned.length === 10) {
            return `1${cleaned}`;
        }
        return cleaned;
    }
    isValidPhoneNumber(phone) {
        return /^\d{11,15}$/.test(phone);
    }
    async getMessageStatus(messageId) {
        try {
            return await this.messageRepository.findOne({
                where: { id: messageId },
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
                    status: whatsapp_message_entity_1.MessageStatus.FAILED,
                    retryCount: (0, typeorm_2.LessThan)(this.maxRetries),
                },
            });
            for (const message of failedMessages) {
                try {
                    const content = JSON.parse(message.content);
                    const response = await this.client.post('/messages', content);
                    message.whatsappMessageId = response.data.messages[0].id;
                    message.status = whatsapp_message_entity_1.MessageStatus.SENT;
                    message.sentAt = new Date();
                    message.retryCount += 1;
                    await this.messageRepository.save(message);
                }
                catch (error) {
                    this.logger.error(`Error retrying message ${message.id}:`, error);
                    message.retryCount += 1;
                    message.lastError = error.message || String(error);
                    if (message.retryCount >= this.maxRetries) {
                        message.status = whatsapp_message_entity_1.MessageStatus.FAILED;
                        message.metadata = Object.assign(Object.assign({}, message.metadata), { permanentlyFailed: true });
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
WhatsAppService = WhatsAppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(whatsapp_message_entity_1.WhatsAppMessage)),
    __param(3, (0, typeorm_1.InjectRepository)(whatsapp_template_entity_1.WhatsappTemplate)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        event_emitter_1.EventEmitter2,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WhatsAppService);
exports.WhatsAppService = WhatsAppService;
//# sourceMappingURL=whatsapp.service.js.map