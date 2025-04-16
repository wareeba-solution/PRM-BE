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
    constructor(messageRepository, eventEmitter, dataSource) {
        this.messageRepository = messageRepository;
        this.eventEmitter = eventEmitter;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(MessageSchedulerService_1.name);
    }
    /**
     * Initialize the scheduler when the module starts
     */
    async onModuleInit() {
        this.logger.log('Message scheduler service initialized');
        try {
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
        try {
            // Use direct query to set the scheduled time and status
            await this.dataSource.query(`UPDATE public.messages
         SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
         WHERE id = $3`, [scheduledFor, create_message_dto_1.MessageStatus.SCHEDULED, message.id]);
            // Return the message with updated properties
            return Object.assign(Object.assign({}, message), { scheduledFor, status: create_message_dto_1.MessageStatus.SCHEDULED });
        }
        catch (error) {
            this.logger.error(`Error scheduling message:`, error);
            throw error;
        }
    }
    /**
     * Cancel a scheduled message
     */
    async cancelScheduledMessage(messageId) {
        try {
            await this.dataSource.query(`UPDATE public.messages 
         SET status = $1, "scheduledFor" = NULL, "updatedAt" = NOW() 
         WHERE id = $2 AND status = $3`, [create_message_dto_1.MessageStatus.SENDING, messageId, create_message_dto_1.MessageStatus.SCHEDULED]);
            this.logger.log(`Scheduled message ${messageId} has been canceled`);
        }
        catch (error) {
            this.logger.error(`Error canceling message ${messageId}:`, error);
            throw new Error(`Failed to cancel message: ${error.message}`);
        }
    }
    /**
     * Reschedule a message for a different time
     */
    async rescheduleMessage(messageId, newScheduledFor) {
        try {
            // First check if the message exists
            const result = await this.dataSource.query(`SELECT * FROM public.messages WHERE id = $1`, [messageId]);
            if (!result || result.length === 0) {
                throw new Error(`Message with ID ${messageId} not found`);
            }
            // Update the message schedule time
            await this.dataSource.query(`UPDATE public.messages 
         SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW() 
         WHERE id = $3`, [newScheduledFor, create_message_dto_1.MessageStatus.SCHEDULED, messageId]);
            this.logger.log(`Message ${messageId} rescheduled for ${newScheduledFor}`);
            // Return the updated message data
            return Object.assign(Object.assign({}, result[0]), { scheduledFor: newScheduledFor, status: create_message_dto_1.MessageStatus.SCHEDULED });
        }
        catch (error) {
            this.logger.error(`Error rescheduling message ${messageId}:`, error);
            throw error;
        }
    }
    /**
     * Run every minute to check for messages that need to be sent
     */
    async processScheduledMessages() {
        try {
            this.logger.debug('Checking for scheduled messages...');
            const now = new Date();
            const dueMessages = await this.dataSource.query(`SELECT * FROM public.messages 
         WHERE status = $1 AND "scheduledFor" <= $2 AND "deletedAt" IS NULL`, [create_message_dto_1.MessageStatus.SCHEDULED, now]);
            if (!dueMessages || dueMessages.length === 0) {
                return;
            }
            this.logger.log(`Found ${dueMessages.length} scheduled messages to process`);
            for (const message of dueMessages) {
                await this.dataSource.query(`UPDATE public.messages 
           SET status = $1, "updatedAt" = NOW() 
           WHERE id = $2`, [create_message_dto_1.MessageStatus.SENDING, message.id]);
                // Emit event with the message data
                this.eventEmitter.emit('message.created', message);
            }
        }
        catch (error) {
            this.logger.error('Error processing scheduled messages:', error);
        }
    }
    /**
     * Get all scheduled messages
     */
    async getAllScheduledMessages() {
        try {
            return await this.dataSource.query(`SELECT * FROM public.messages 
         WHERE status = $1 AND "deletedAt" IS NULL 
         ORDER BY "scheduledFor" ASC`, [create_message_dto_1.MessageStatus.SCHEDULED]);
        }
        catch (error) {
            this.logger.error('Error getting scheduled messages:', error);
            return [];
        }
    }
    /**
     * Get scheduled messages for a specific time period
     */
    async getScheduledMessagesForPeriod(startDate, endDate) {
        try {
            return await this.dataSource.query(`SELECT * FROM public.messages 
         WHERE status = $1 
         AND "scheduledFor" BETWEEN $2 AND $3 
         AND "deletedAt" IS NULL 
         ORDER BY "scheduledFor" ASC`, [create_message_dto_1.MessageStatus.SCHEDULED, startDate, endDate]);
        }
        catch (error) {
            this.logger.error('Error getting scheduled messages for period:', error);
            return [];
        }
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
        event_emitter_1.EventEmitter2,
        typeorm_2.DataSource])
], MessageSchedulerService);
exports.MessageSchedulerService = MessageSchedulerService;
//# sourceMappingURL=message-scheduler.service.js.map