import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Not, In } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Notification } from '../entities/notification.entity';
import { NotificationStatus } from '../dto/update-notification.dto';
import { NotificationChannel, NotificationPriority, NotificationType } from '../dto/create-notification.dto';
import { EmailService } from '../../../shared/services/email.service';
import { SmsService } from '../../../shared/services/sms.service';
import { PushNotificationService } from '../../../shared/services/push-notification.service';
import { WhatsappService } from '../../whatsapp/services/whatsapp.services';
import { SlackService } from '../../integrations/slack/services/slack.service';
import { Organization } from '@/modules/organizations/entities/organization.entity';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class NotificationSchedulerService {
    private readonly logger = new Logger(NotificationSchedulerService.name);
    private readonly MAX_RETRY_ATTEMPTS = 3;
    private readonly BATCH_SIZE = 100;

    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        private readonly emailService: EmailService,
        private readonly smsService: SmsService,
        private readonly pushNotificationService: PushNotificationService,
        private readonly whatsappService: WhatsappService,
        private readonly slackService: SlackService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async rescheduleNotification(notificationId: string, newScheduledFor: Date): Promise<Notification> {
        this.logger.debug(`Rescheduling notification ${notificationId} to ${newScheduledFor}`);

        try {
            const notificationObj = await this.notificationRepository.findOne({ where: { id: notificationId } });

            if (!notificationObj) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }

            // Check if notification is in a state that allows rescheduling
            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot reschedule notification with status ${notificationObj.status}`);
            }

            // Update the notification
            notificationObj.scheduledFor = newScheduledFor;
            notificationObj.status = NotificationStatus.SCHEDULED;
            notificationObj.updatedAt = new Date();

            await this.notificationRepository.save(notificationObj);

            // Emit event
            this.eventEmitter.emit('notification.rescheduled', notificationObj);

            return notificationObj;
        } catch (error) {
            this.logger.error(`Error rescheduling notification ${notificationId}`, error);
            throw error;
        }
    }

    async scheduleNotification(notificationData: Notification, scheduledFor: Date): Promise<Notification> {
        this.logger.debug('Scheduling new notification');

        try {
            // Set scheduling details
            notificationData.scheduledFor = scheduledFor;
            notificationData.status = NotificationStatus.SCHEDULED;

            // Initialize retry count if not set
            if (notificationData.retryCount === undefined) {
                notificationData.retryCount = 0;
            }

            // Save the notification
            const savedNotification = await this.notificationRepository.save(notificationData);

            // Emit event
            this.eventEmitter.emit('notification.scheduled', savedNotification);

            return savedNotification;
        } catch (error) {
            this.logger.error('Error scheduling notification', error);
            throw error;
        }
    }

    async cancelScheduledNotification(notificationId: string): Promise<Notification> {
        this.logger.debug(`Cancelling notification ${notificationId}`);

        try {
            const notificationObj = await this.notificationRepository.findOne({ where: { id: notificationId } });

            if (!notificationObj) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }

            // Check if notification can be cancelled
            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot cancel notification with status ${notificationObj.status}`);
            }

            // Update the notification status
            notificationObj.status = NotificationStatus.CANCELLED;
            notificationObj.updatedAt = new Date();

            await this.notificationRepository.save(notificationObj);

            // Emit event
            this.eventEmitter.emit('notification.cancelled', notificationObj);

            return notificationObj;
        } catch (error) {
            this.logger.error(`Error cancelling notification ${notificationId}`, error);
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async processScheduledNotifications() {
        this.logger.debug('Processing scheduled notifications');

        try {
            const notifications = await this.notificationRepository.find({
                where: {
                    status: NotificationStatus.SCHEDULED,
                    scheduledFor: LessThanOrEqual(new Date()),
                },
                take: this.BATCH_SIZE,
            });

            for (const notification of notifications) {
                await this.processNotification(notification);
            }
        } catch (error) {
            this.logger.error('Error processing scheduled notifications', error);
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async retryFailedNotifications() {
        this.logger.debug('Retrying failed notifications');

        try {
            const notifications = await this.notificationRepository.find({
                where: {
                    status: NotificationStatus.FAILED,
                    retryCount: LessThanOrEqual(this.MAX_RETRY_ATTEMPTS),
                },
                take: this.BATCH_SIZE,
            });

            for (const notification of notifications) {
                await this.processNotification(notification, true);
            }
        } catch (error) {
            this.logger.error('Error retrying failed notifications', error);
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    async cleanupExpiredNotifications() {
        this.logger.debug('Cleaning up expired notifications');

        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() - 30); // 30 days retention

            await this.notificationRepository.update(
                {
                    status: Not(In([NotificationStatus.DELIVERED, NotificationStatus.FAILED])),
                    createdAt: LessThanOrEqual(expiryDate),
                },
                {
                    status: NotificationStatus.EXPIRED as any,
                }
            );
        } catch (error) {
            this.logger.error('Error cleaning up expired notifications', error);
        }
    }

    private async processNotification(notification: Notification, isRetry: boolean = false) {
        this.logger.debug(`Processing notification ${notification.id}`);

        try {
            // Update status to processing
            notification.status = NotificationStatus.PROCESSING;
            await this.notificationRepository.save(notification);

            // Process each channel
            for (const channel of notification.channels) {
                await this.sendNotificationByChannel(notification, channel);
            }

            // Update notification status
            notification.status = NotificationStatus.DELIVERED;
            notification.deliveredAt = new Date();
            await this.notificationRepository.save(notification);

            // Emit event for successful delivery
            this.eventEmitter.emit('notification.delivered', notification);

        } catch (error) {
            this.logger.error(`Error processing notification ${notification.id}`, error);

            // Handle retry logic
            if (isRetry) {
                notification.retryCount = (notification.retryCount || 0) + 1;
            }

            // Update status based on retry attempts
            if (notification.retryCount >= this.MAX_RETRY_ATTEMPTS) {
                notification.status = NotificationStatus.FAILED;
                notification.error = error.message;
                this.eventEmitter.emit('notification.failed', notification);
            } else {
                notification.status = NotificationStatus.PENDING;
            }

            await this.notificationRepository.save(notification);
        }
    }

    private async sendNotificationByChannel(notification: Notification, channel: NotificationChannel) {
        switch (channel) {
            case NotificationChannel.EMAIL:
                await this.sendEmailNotification(notification);
                break;
            case NotificationChannel.SMS:
                await this.sendSmsNotification(notification);
                break;
            case NotificationChannel.PUSH:
                await this.sendPushNotification(notification);
                break;
            case NotificationChannel.WHATSAPP:
                await this.sendWhatsappNotification(notification, notification.recipientDetails);
                break;
            case NotificationChannel.SLACK:
                await this.sendSlackNotification(notification);
                break;
            case NotificationChannel.IN_APP:
                // In-app notifications don't need additional processing
                break;
            default:
                this.logger.warn(`Unknown notification channel: ${channel}`);
        }
    }

    private async sendEmailNotification(notification: Notification) {
        if (!notification.recipientDetails?.email) {
            throw new Error('Email address not provided');
        }

        // The simplest approach: just pass the notification as-is
        await this.emailService.send(notification);
    }

    private async sendSmsNotification(notification: Notification) {
        if (!notification.recipientDetails?.phone) {
            throw new Error('Phone number not provided');
        }

        // The simplest approach: just pass the notification as-is
        await this.smsService.send(notification);
    }

    private async sendPushNotification(notification: Notification) {
        if (!notification.recipientDetails?.deviceTokens?.length) {
            throw new Error('No device tokens available');
        }

        // The simplest approach: just pass the notification as-is
        await this.pushNotificationService.send(notification);
    }

    private async sendWhatsappNotification(notification: any, user: any): Promise<boolean> {
        try {
            if (!user || !user.phoneNumber) {
                throw new Error('Phone number not provided for WhatsApp notification');
            }

            // Use the sendMessage method with only required parameters
            await this.whatsappService.sendMessage({
                to: user.phoneNumber,
                text: notification.content
            });

            return true;
        } catch (error) {
            this.logger.error(`Failed to send WhatsApp notification: ${error.message}`, error.stack);
            return false;
        }
    }

    private async sendSlackNotification(notification: Notification) {
        if (!notification.recipientDetails?.slackUserId) {
            throw new Error('Slack user ID not provided');
        }

        // Use only the required parameters for Slack
        await this.slackService.sendDirectMessage({
            userId: notification.recipientDetails.slackUserId,
            message: {
                text: notification.title,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: notification.content,
                        },
                    },
                ],
            },
        });
    }
}