import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from '../entities/message.entity';
export declare class MessageSchedulerService implements OnModuleInit, OnModuleDestroy {
    private readonly messageRepository;
    private readonly eventEmitter;
    private readonly logger;
    private schedulerInterval;
    constructor(messageRepository: Repository<Message>, eventEmitter: EventEmitter2);
    /**
     * Initialize the scheduler when the module starts
     */
    onModuleInit(): Promise<void>;
    /**
     * Clean up when the module is destroyed
     */
    onModuleDestroy(): void;
    /**
     * Schedule a new message for future delivery
     */
    scheduleMessage(message: Message, scheduledFor: Date): Promise<Message>;
    /**
     * Cancel a scheduled message
     */
    cancelScheduledMessage(messageId: string): Promise<void>;
    /**
     * Reschedule a message for a different time
     */
    rescheduleMessage(messageId: string, newScheduledFor: Date): Promise<Message>;
    /**
     * Run every minute to check for messages that need to be sent
     * Uses NestJS built-in scheduler (requires @nestjs/schedule package)
     */
    processScheduledMessages(): Promise<void>;
    /**
     * Get all scheduled messages
     */
    getAllScheduledMessages(): Promise<Message[]>;
    /**
     * Get scheduled messages for a specific time period
     */
    getScheduledMessagesForPeriod(startDate: Date, endDate: Date): Promise<Message[]>;
}
