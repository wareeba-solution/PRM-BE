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
var WhatsappService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import axios from 'axios';
import { WhatsAppMessage } from '../entities/whatsapp-message.entity';
import { WhatsappTemplate, WhatsappTemplateHeaderType, WhatsappTemplateComponentType } from '../entities/whatsapp-template.entity';
import { WhatsAppMessageStatus } from '../enums/whatsapp-message-status.enum';
let WhatsappService = WhatsappService_1 = class WhatsappService {
    constructor(configService, eventEmitter, messageRepository, templateRepository) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.messageRepository = messageRepository;
        this.templateRepository = templateRepository;
        this.logger = new Logger(WhatsappService_1.name);
        this.maxRetries = 3;
        this.client = axios.create({
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
                content: messageData,
                metadata: options.metadata,
                status: this.mapWhatsAppStatus(WhatsAppMessageStatus.PENDING),
                retryCount: 0,
            });
            await this.messageRepository.save(message);
            const response = await this.client.post('/messages', Object.assign({ messaging_product: 'whatsapp', recipient_type: 'individual', to: formattedNumber }, messageData));
            message.whatsappMessageId = response.data.messages[0].id;
            message.status = this.mapWhatsAppStatus(WhatsAppMessageStatus.SENT);
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
        const headerComponent = template.components.find(c => c.type === WhatsappTemplateComponentType.HEADER);
        if (headerComponent && (parameters === null || parameters === void 0 ? void 0 : parameters.header)) {
            components.push({
                type: 'header',
                parameters: this.formatParameters(headerComponent.format || WhatsappTemplateHeaderType.TEXT, parameters.header)
            });
        }
        if (parameters === null || parameters === void 0 ? void 0 : parameters.body) {
            components.push({
                type: 'body',
                parameters: this.formatParameters('text', parameters.body)
            });
        }
        const buttonComponent = template.components.find(c => c.type === WhatsappTemplateComponentType.BUTTONS);
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
                const incomingMessage = this.messageRepository.create({
                    whatsappMessageId: message.id,
                    from: message.from,
                    messageType: message.type,
                    content: message,
                    status: this.mapWhatsAppStatus(WhatsAppMessageStatus.RECEIVED),
                    receivedAt: new Date(),
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
                    where: { whatsappMessageId: status.id }
                });
                if (message) {
                    message.status = this.mapWhatsAppStatus(status.status);
                    message.deliveredAt = status.status === 'delivered' ? new Date() : null;
                    message.readAt = status.status === 'read' ? new Date() : null;
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
        const statusMapping = {
            'sent': WhatsAppMessageStatus.SENT,
            'delivered': WhatsAppMessageStatus.DELIVERED,
            'read': WhatsAppMessageStatus.READ,
            'failed': WhatsAppMessageStatus.FAILED,
            'pending': WhatsAppMessageStatus.PENDING
        };
        const mappedStatus = statusMapping[status.toLowerCase()] || WhatsAppMessageStatus.UNKNOWN;
        return mappedStatus;
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
                    status: WhatsAppMessageStatus.FAILED,
                    retryCount: LessThan(this.maxRetries)
                }
            });
            for (const message of failedMessages) {
                try {
                    const response = await this.client.post('/messages', message.content);
                    message.whatsappMessageId = response.data.messages[0].id;
                    message.status = this.mapWhatsAppStatus(WhatsAppMessageStatus.SENT);
                    message.sentAt = new Date();
                    message.retryCount += 1;
                    await this.messageRepository.save(message);
                }
                catch (error) {
                    this.logger.error(`Error retrying message ${message.id}:`, error);
                    message.retryCount += 1;
                    message.lastError = error.message;
                    if (message.retryCount >= this.maxRetries) {
                        message.status = this.mapWhatsAppStatus(WhatsAppMessageStatus.PERMANENTLY_FAILED);
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
    Injectable(),
    __param(2, InjectRepository(WhatsAppMessage)),
    __param(3, InjectRepository(WhatsappTemplate)),
    __metadata("design:paramtypes", [ConfigService,
        EventEmitter2,
        Repository,
        Repository])
], WhatsappService);
export { WhatsappService };
//# sourceMappingURL=whatsapp.services.js.map