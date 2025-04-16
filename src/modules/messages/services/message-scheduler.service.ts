// src/modules/messages/services/message-scheduler.service.ts

import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Message } from '../entities/message.entity';
import { MessageStatus } from '../dto/create-message.dto';

@Injectable()
export class MessageSchedulerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessageSchedulerService.name);
  private schedulerInterval: NodeJS.Timeout;

  constructor(
      @InjectRepository(Message)
      private readonly messageRepository: Repository<Message>,
      private readonly eventEmitter: EventEmitter2,
      private readonly dataSource: DataSource,
  ) {}

  /**
   * Initialize the scheduler when the module starts
   */
  async onModuleInit() {
    this.logger.log('Message scheduler service initialized');
    try {
      await this.processScheduledMessages();
    } catch (error) {
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
  async scheduleMessage(message: Message, scheduledFor: Date): Promise<Message> {
    try {
      // Use direct query to set the scheduled time and status
      await this.dataSource.query(
          `UPDATE public.messages
         SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
         WHERE id = $3`,
          [scheduledFor, MessageStatus.SCHEDULED, message.id]
      );

      // Return the message with updated properties
      return {
        ...message,
        scheduledFor,
        status: MessageStatus.SCHEDULED
      } as Message;
    } catch (error) {
      this.logger.error(`Error scheduling message:`, error);
      throw error;
    }
  }

  /**
   * Cancel a scheduled message
   */
  async cancelScheduledMessage(messageId: string): Promise<void> {
    try {
      await this.dataSource.query(
          `UPDATE public.messages 
         SET status = $1, "scheduledFor" = NULL, "updatedAt" = NOW() 
         WHERE id = $2 AND status = $3`,
          [MessageStatus.SENDING, messageId, MessageStatus.SCHEDULED]
      );

      this.logger.log(`Scheduled message ${messageId} has been canceled`);
    } catch (error) {
      this.logger.error(`Error canceling message ${messageId}:`, error);
      throw new Error(`Failed to cancel message: ${error.message}`);
    }
  }

  /**
   * Reschedule a message for a different time
   */
  async rescheduleMessage(messageId: string, newScheduledFor: Date): Promise<Message> {
    try {
      // First check if the message exists
      const result = await this.dataSource.query(
          `SELECT * FROM public.messages WHERE id = $1`,
          [messageId]
      );

      if (!result || result.length === 0) {
        throw new Error(`Message with ID ${messageId} not found`);
      }

      // Update the message schedule time
      await this.dataSource.query(
          `UPDATE public.messages 
         SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW() 
         WHERE id = $3`,
          [newScheduledFor, MessageStatus.SCHEDULED, messageId]
      );

      this.logger.log(`Message ${messageId} rescheduled for ${newScheduledFor}`);

      // Return the updated message data
      return {
        ...result[0],
        scheduledFor: newScheduledFor,
        status: MessageStatus.SCHEDULED
      } as Message;
    } catch (error) {
      this.logger.error(`Error rescheduling message ${messageId}:`, error);
      throw error;
    }
  }

  /**
   * Run every minute to check for messages that need to be sent
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async processScheduledMessages() {
    try {
      this.logger.debug('Checking for scheduled messages...');

      const now = new Date();
      const dueMessages = await this.dataSource.query(
          `SELECT * FROM public.messages 
         WHERE status = $1 AND "scheduledFor" <= $2 AND "deletedAt" IS NULL`,
          [MessageStatus.SCHEDULED, now]
      );

      if (!dueMessages || dueMessages.length === 0) {
        return;
      }

      this.logger.log(`Found ${dueMessages.length} scheduled messages to process`);

      for (const message of dueMessages) {
        await this.dataSource.query(
            `UPDATE public.messages 
           SET status = $1, "updatedAt" = NOW() 
           WHERE id = $2`,
            [MessageStatus.SENDING, message.id]
        );

        // Emit event with the message data
        this.eventEmitter.emit('message.created', message);
      }
    } catch (error) {
      this.logger.error('Error processing scheduled messages:', error);
    }
  }

  /**
   * Get all scheduled messages
   */
  async getAllScheduledMessages(): Promise<any[]> {
    try {
      return await this.dataSource.query(
          `SELECT * FROM public.messages 
         WHERE status = $1 AND "deletedAt" IS NULL 
         ORDER BY "scheduledFor" ASC`,
          [MessageStatus.SCHEDULED]
      );
    } catch (error) {
      this.logger.error('Error getting scheduled messages:', error);
      return [];
    }
  }

  /**
   * Get scheduled messages for a specific time period
   */
  async getScheduledMessagesForPeriod(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      return await this.dataSource.query(
          `SELECT * FROM public.messages 
         WHERE status = $1 
         AND "scheduledFor" BETWEEN $2 AND $3 
         AND "deletedAt" IS NULL 
         ORDER BY "scheduledFor" ASC`,
          [MessageStatus.SCHEDULED, startDate, endDate]
      );
    } catch (error) {
      this.logger.error('Error getting scheduled messages for period:', error);
      return [];
    }
  }
}