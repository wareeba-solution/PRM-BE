"use strict";
// src/modules/messages/services/message-scheduler.service.ts
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
var MessageSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const message_entity_1 = require("../entities/message.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
let MessageSchedulerService = MessageSchedulerService_1 = class MessageSchedulerService {
    constructor(messageRepository, eventEmitter) {
        this.messageRepository = messageRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(MessageSchedulerService_1.name);
    }
    /**
     * Initialize the scheduler when the module starts
     */
    async onModuleInit() {
        this.logger.log('Message scheduler service initialized');
        try {
            // Process any messages that might have been scheduled
            // but not processed due to server restart
            await this.processScheduledMessages();
        }
        catch (error) {
            this.logger.error('Error processing scheduled messages:', error);
        }
    }
    /**
     * Clean up when the module is destroyed
     */
    onModuleDestroy() {
        if (this.schedulerInterval) {
            clearInterval(this.schedulerInterval);
        }
    }
    /**
     * Schedule a new message for future delivery
     */
    async scheduleMessage(message, scheduledFor) {
        message.scheduledFor = scheduledFor;
        message.status = create_message_dto_1.MessageStatus.SCHEDULED;
        return this.messageRepository.save(message);
    }
    /**
     * Cancel a scheduled message
     */
    async cancelScheduledMessage(messageId) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        if (message.status !== create_message_dto_1.MessageStatus.SCHEDULED) {
            throw new Error(`Message is not scheduled: ${messageId}`);
        }
        message.status = create_message_dto_1.MessageStatus.SENDING;
        message.scheduledFor = undefined;
        await this.messageRepository.save(message);
        this.logger.log(`Scheduled message ${messageId} has been canceled`);
    }
    /**
     * Reschedule a message for a different time
     */
    async rescheduleMessage(messageId, newScheduledFor) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        message.scheduledFor = newScheduledFor;
        message.status = create_message_dto_1.MessageStatus.SCHEDULED;
        const updatedMessage = await this.messageRepository.save(message);
        this.logger.log(`Message ${messageId} rescheduled for ${newScheduledFor}`);
        return updatedMessage;
    }
    /**
     * Run every minute to check for messages that need to be sent
     * Uses NestJS built-in scheduler (requires @nestjs/schedule package)
     */
    async processScheduledMessages() {
        try {
            this.logger.debug('Checking for scheduled messages...');
            // Find all scheduled messages that are due
            const now = new Date();
            const dueSendMessages = await this.messageRepository.find({
                where: {
                    status: create_message_dto_1.MessageStatus.SCHEDULED,
                    scheduledFor: (0, typeorm_2.LessThanOrEqual)(now),
                },
            });
            // If no messages are due, return early
            if (dueSendMessages.length === 0) {
                return;
            }
            this.logger.log(`Found ${dueSendMessages.length} scheduled messages to process`);
            // Update status to pending for all due messages
            await Promise.all(dueSendMessages.map(async (message) => {
                message.status = create_message_dto_1.MessageStatus.SENDING;
                await this.messageRepository.save(message);
                // Emit event to trigger message processing
                this.eventEmitter.emit('message.created', message);
            }));
        }
        catch (error) {
            this.logger.error('Error processing scheduled messages:', error);
        }
    }
    /**
     * Get all scheduled messages
     */
    async getAllScheduledMessages() {
        return this.messageRepository.find({
            where: { status: create_message_dto_1.MessageStatus.SCHEDULED },
            order: { scheduledFor: 'ASC' },
        });
    }
    /**
     * Get scheduled messages for a specific time period
     */
    async getScheduledMessagesForPeriod(startDate, endDate) {
        return this.messageRepository.find({
            where: {
                status: create_message_dto_1.MessageStatus.SCHEDULED,
                scheduledFor: (0, typeorm_2.Between)(startDate, endDate),
            },
            order: { scheduledFor: 'ASC' },
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageSchedulerService.prototype, "processScheduledMessages", null);
MessageSchedulerService = MessageSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], MessageSchedulerService);
exports.MessageSchedulerService = MessageSchedulerService;
//# sourceMappingURL=message-scheduler.service.js.map