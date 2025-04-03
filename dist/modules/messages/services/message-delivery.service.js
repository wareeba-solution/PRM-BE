"use strict";
// src/modules/messages/services/message-delivery.service.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeliveryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const message_entity_1 = require("../entities/message.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
let MessageDeliveryService = MessageDeliveryService_1 = class MessageDeliveryService {
    constructor(messageRepository, eventEmitter) {
        this.messageRepository = messageRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(MessageDeliveryService_1.name);
    }
    /**
     * Process a single message for delivery
     */
    async processMessage(message) {
        try {
            // Skip if message is already delivered or scheduled for future
            if (message.status === create_message_dto_1.MessageStatus.DELIVERED) {
                return;
            }
            // If message is scheduled for future, don't process yet
            if (message.scheduledFor && message.scheduledFor > new Date()) {
                return;
            }
            // Update status to delivering
            message.status = create_message_dto_1.MessageStatus.DELIVERING;
            await this.messageRepository.save(message);
            // Implement your delivery logic based on message type, destination, etc.
            // This is a placeholder for actual delivery implementation
            const deliveryResult = await this.deliverMessage(message);
            if (deliveryResult.success) {
                // Emit success event
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
                // Emit failure event
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
            // Emit failure event
            this.eventEmitter.emit('message.failed', {
                message,
                error: {
                    code: 'PROCESS_ERROR',
                    message: error.message,
                },
            });
        }
    }
    /**
     * Process multiple messages in bulk
     */
    async processBulkMessages(messages) {
        try {
            // Process each message, but don't wait for each to complete before moving to next
            const promises = messages.map(message => this.processMessage(message));
            // Wait for all messages to be processed
            await Promise.all(promises);
        }
        catch (error) {
            this.logger.error(`Error processing bulk messages: ${error.message}`, error.stack);
        }
    }
    /**
     * Implement actual message delivery logic
     * This is a placeholder that would be replaced with actual delivery implementation
     */
    async deliverMessage(message) {
        try {
            // Placeholder for message delivery logic
            // This would be replaced with actual provider implementation
            // e.g., SMS provider, email provider, push notification, etc.
            // Simulate successful delivery 80% of the time
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
    /**
     * Retry a failed message
     */
    async retryMessage(messageId) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        // Reset status to pending
        message.status = create_message_dto_1.MessageStatus.SENDING;
        await this.messageRepository.save(message);
        // Emit event to trigger reprocessing
        this.eventEmitter.emit('message.resend', message);
    }
};
MessageDeliveryService = MessageDeliveryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], MessageDeliveryService);
exports.MessageDeliveryService = MessageDeliveryService;
//# sourceMappingURL=message-delivery.service.js.map