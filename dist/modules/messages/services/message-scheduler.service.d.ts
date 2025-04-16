import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from '../entities/message.entity';
export declare class MessageSchedulerService implements OnModuleInit, OnModuleDestroy {
    private readonly messageRepository;
    private readonly eventEmitter;
    private readonly dataSource;
    private readonly logger;
    private schedulerInterval;
    constructor(messageRepository: Repository<Message>, eventEmitter: EventEmitter2, dataSource: DataSource);
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
     */
    processScheduledMessages(): Promise<void>;
    /**
     * Get all scheduled messages
     */
    getAllScheduledMessages(): Promise<any[]>;
    /**
     * Get scheduled messages for a specific time period
     */
    getScheduledMessagesForPeriod(startDate: Date, endDate: Date): Promise<any[]>;
}
