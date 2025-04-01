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
var MessageDeliveryService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from '../entities/message.entity';
import { MessageStatus } from '../dto/create-message.dto';
let MessageDeliveryService = MessageDeliveryService_1 = class MessageDeliveryService {
    constructor(messageRepository, eventEmitter) {
        this.messageRepository = messageRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(MessageDeliveryService_1.name);
    }
    async processMessage(message) {
        try {
            if (message.status === MessageStatus.DELIVERED) {
                return;
            }
            if (message.scheduledFor && message.scheduledFor > new Date()) {
                return;
            }
            message.status = MessageStatus.DELIVERING;
            await this.messageRepository.save(message);
            const deliveryResult = await this.deliverMessage(message);
            if (deliveryResult.success) {
                this.eventEmitter.emit('message.delivered', {
                    message,
                    deliveryDetails: {
                        provider: deliveryResult.provider,
                        providerMessageId: deliveryResult.providerMessageId,
                        deliveredAt: new Date(),
                    },
                });
            }
            else {
                this.eventEmitter.emit('message.failed', {
                    message,
                    error: {
                        code: deliveryResult.errorCode || 'DELIVERY_FAILED',
                        message: deliveryResult.errorMessage || 'Unknown delivery error',
                    },
                });
            }
        }
        catch (error) {
            this.logger.error(`Error processing message ${message.id}: ${error.message}`, error.stack);
            this.eventEmitter.emit('message.failed', {
                message,
                error: {
                    code: 'PROCESS_ERROR',
                    message: error.message,
                },
            });
        }
    }
    async processBulkMessages(messages) {
        try {
            const promises = messages.map(message => this.processMessage(message));
            await Promise.all(promises);
        }
        catch (error) {
            this.logger.error(`Error processing bulk messages: ${error.message}`, error.stack);
        }
    }
    async deliverMessage(message) {
        try {
            const isSuccessful = Math.random() > 0.2;
            if (isSuccessful) {
                return {
                    success: true,
                    provider: 'demo-provider',
                    providerMessageId: `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                };
            }
            else {
                return {
                    success: false,
                    provider: 'demo-provider',
                    errorCode: 'PROVIDER_ERROR',
                    errorMessage: 'Simulated provider error',
                };
            }
        }
        catch (error) {
            this.logger.error(`Delivery error for message ${message.id}: ${error.message}`, error.stack);
            return {
                success: false,
                errorCode: 'DELIVERY_EXCEPTION',
                errorMessage: error.message,
            };
        }
    }
    async retryMessage(messageId) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        message.status = MessageStatus.SENDING;
        await this.messageRepository.save(message);
        this.eventEmitter.emit('message.resend', message);
    }
};
MessageDeliveryService = MessageDeliveryService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Message)),
    __metadata("design:paramtypes", [Repository,
        EventEmitter2])
], MessageDeliveryService);
export { MessageDeliveryService };
//# sourceMappingURL=message-delivery.service.js.map