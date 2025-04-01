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
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Between } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Message } from '../entities/message.entity';
import { MessageStatus } from '../dto/create-message.dto';
let MessageSchedulerService = MessageSchedulerService_1 = class MessageSchedulerService {
    constructor(messageRepository, eventEmitter) {
        this.messageRepository = messageRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(MessageSchedulerService_1.name);
    }
    async onModuleInit() {
        this.logger.log('Message scheduler service initialized');
        try {
            await this.processScheduledMessages();
        }
        catch (error) {
            this.logger.error('Error processing scheduled messages:', error);
        }
    }
    onModuleDestroy() {
        if (this.schedulerInterval) {
            clearInterval(this.schedulerInterval);
        }
    }
    async scheduleMessage(message, scheduledFor) {
        message.scheduledFor = scheduledFor;
        message.status = MessageStatus.SCHEDULED;
        return this.messageRepository.save(message);
    }
    async cancelScheduledMessage(messageId) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        if (message.status !== MessageStatus.SCHEDULED) {
            throw new Error(`Message is not scheduled: ${messageId}`);
        }
        message.status = MessageStatus.SENDING;
        message.scheduledFor = undefined;
        await this.messageRepository.save(message);
        this.logger.log(`Scheduled message ${messageId} has been canceled`);
    }
    async rescheduleMessage(messageId, newScheduledFor) {
        const message = await this.messageRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        message.scheduledFor = newScheduledFor;
        message.status = MessageStatus.SCHEDULED;
        const updatedMessage = await this.messageRepository.save(message);
        this.logger.log(`Message ${messageId} rescheduled for ${newScheduledFor}`);
        return updatedMessage;
    }
    async processScheduledMessages() {
        try {
            this.logger.debug('Checking for scheduled messages...');
            const now = new Date();
            const dueSendMessages = await this.messageRepository.find({
                where: {
                    status: MessageStatus.SCHEDULED,
                    scheduledFor: LessThanOrEqual(now),
                },
            });
            if (dueSendMessages.length === 0) {
                return;
            }
            this.logger.log(`Found ${dueSendMessages.length} scheduled messages to process`);
            await Promise.all(dueSendMessages.map(async (message) => {
                message.status = MessageStatus.SENDING;
                await this.messageRepository.save(message);
                this.eventEmitter.emit('message.created', message);
            }));
        }
        catch (error) {
            this.logger.error('Error processing scheduled messages:', error);
        }
    }
    async getAllScheduledMessages() {
        return this.messageRepository.find({
            where: { status: MessageStatus.SCHEDULED },
            order: { scheduledFor: 'ASC' },
        });
    }
    async getScheduledMessagesForPeriod(startDate, endDate) {
        return this.messageRepository.find({
            where: {
                status: MessageStatus.SCHEDULED,
                scheduledFor: Between(startDate, endDate),
            },
            order: { scheduledFor: 'ASC' },
        });
    }
};
__decorate([
    Cron(CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageSchedulerService.prototype, "processScheduledMessages", null);
MessageSchedulerService = MessageSchedulerService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Message)),
    __metadata("design:paramtypes", [Repository,
        EventEmitter2])
], MessageSchedulerService);
export { MessageSchedulerService };
//# sourceMappingURL=message-scheduler.service.js.map