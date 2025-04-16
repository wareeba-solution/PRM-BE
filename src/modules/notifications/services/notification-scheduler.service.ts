import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Notification } from '../entities/notification.entity';
import { NotificationStatus } from '../dto/update-notification.dto';
import { NotificationChannel } from '../dto/create-notification.dto';
import { EmailService } from '../../../shared/services/email.service';
import { SmsService } from '../../../shared/services/sms.service';
import { PushNotificationService } from '../../../shared/services/push-notification.service';
import { WhatsappService } from '../../whatsapp/services/whatsapp.services';
import { SlackService } from '../../integrations/slack/services/slack.service';

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
        private readonly dataSource: DataSource,
    ) {}

    async rescheduleNotification(notificationId: string, newScheduledFor: Date): Promise<any> {
        this.logger.debug(`Rescheduling notification ${notificationId} to ${newScheduledFor}`);

        try {
            const notifications = await this.dataSource.query(
                `SELECT * FROM public.notifications WHERE id = $1 AND "deletedAt" IS NULL`,
                [notificationId]
            );

            if (!notifications || notifications.length === 0) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }

            const notificationObj = notifications[0];

            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot reschedule notification with status ${notificationObj.status}`);
            }

            await this.dataSource.query(
                `UPDATE public.notifications
                 SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
                 WHERE id = $3`,
                [newScheduledFor, NotificationStatus.SCHEDULED, notificationId]
            );

            const updatedNotification = {
                ...notificationObj,
                scheduledFor: newScheduledFor,
                status: NotificationStatus.SCHEDULED,
                updatedAt: new Date()
            };

            this.eventEmitter.emit('notification.rescheduled', updatedNotification);

            return updatedNotification;
        } catch (error) {
            this.logger.error(`Error rescheduling notification ${notificationId}`, error);
            throw error;
        }
    }

    async scheduleNotification(notificationData: any, scheduledFor: Date): Promise<any> {
        this.logger.debug('Scheduling new notification');

        try {
            // Handle existing notification update
            if (notificationData.id) {
                await this.dataSource.query(
                    `UPDATE public.notifications
                     SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
                     WHERE id = $3`,
                    [scheduledFor, NotificationStatus.SCHEDULED, notificationData.id]
                );

                const result = await this.dataSource.query(
                    `SELECT * FROM public.notifications WHERE id = $1`,
                    [notificationData.id]
                );

                if (result && result.length > 0) {
                    const updatedNotification = result[0];
                    this.eventEmitter.emit('notification.scheduled', updatedNotification);
                    return updatedNotification;
                }
            }

            // For new notifications or as fallback, use the repository
            // with a properly typed notification object
            const notification = this.notificationRepository.create({
                ...notificationData,
                scheduledFor,
                status: NotificationStatus.SCHEDULED
            });

            const savedNotification = await this.notificationRepository.save(notification);
            this.eventEmitter.emit('notification.scheduled', savedNotification);
            return savedNotification;
        } catch (error) {
            this.logger.error('Error scheduling notification', error);
            throw error;
        }
    }

    async cancelScheduledNotification(notificationId: string): Promise<any> {
        this.logger.debug(`Cancelling notification ${notificationId}`);

        try {
            const notifications = await this.dataSource.query(
                `SELECT * FROM public.notifications WHERE id = $1 AND "deletedAt" IS NULL`,
                [notificationId]
            );

            if (!notifications || notifications.length === 0) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }

            const notificationObj = notifications[0];

            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot cancel notification with status ${notificationObj.status}`);
            }

            await this.dataSource.query(
                `UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE id = $2`,
                [NotificationStatus.CANCELLED, notificationId]
            );

            const updatedNotification = {
                ...notificationObj,
                status: NotificationStatus.CANCELLED,
                updatedAt: new Date()
            };

            this.eventEmitter.emit('notification.cancelled', updatedNotification);

            return updatedNotification;
        } catch (error) {
            this.logger.error(`Error cancelling notification ${notificationId}`, error);
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async processScheduledNotifications() {
        this.logger.debug('Processing scheduled notifications');

        try {
            const notifications = await this.dataSource.query(
                `SELECT * FROM public.notifications
                 WHERE status = $1
                 AND "scheduledFor" <= NOW()
                 AND "deletedAt" IS NULL
                 LIMIT $2`,
                [NotificationStatus.SCHEDULED, this.BATCH_SIZE]
            );

            if (!notifications || notifications.length === 0) {
                return;
            }

            this.logger.log(`Processing ${notifications.length} scheduled notifications`);

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
            const notifications = await this.dataSource.query(
                `SELECT * FROM public.notifications
                 WHERE status = $1
                 AND "deletedAt" IS NULL
                 LIMIT $2`,
                [NotificationStatus.FAILED, this.BATCH_SIZE]
            );

            if (!notifications || notifications.length === 0) {
                return;
            }

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

            await this.dataSource.query(
                `UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE status NOT IN ($2, $3)
                 AND "createdAt" <= $4`,
                [
                    NotificationStatus.EXPIRED,
                    NotificationStatus.DELIVERED,
                    NotificationStatus.FAILED,
                    expiryDate
                ]
            );
        } catch (error) {
            this.logger.error('Error cleaning up expired notifications', error);
        }
    }

    private async processNotification(notification: any, isRetry: boolean = false) {
        this.logger.debug(`Processing notification ${notification.id}`);

        try {
            await this.dataSource.query(
                `UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE id = $2`,
                [NotificationStatus.PROCESSING, notification.id]
            );

            const channels = typeof notification.channels === 'string'
                ? JSON.parse(notification.channels)
                : (notification.channels || []);

            for (const channel of channels) {
                await this.sendNotificationByChannel(notification, channel);
            }

            await this.dataSource.query(
                `UPDATE public.notifications
                 SET status = $1, "deliveredAt" = NOW(), "updatedAt" = NOW()
                 WHERE id = $2`,
                [NotificationStatus.DELIVERED, notification.id]
            );

            this.eventEmitter.emit('notification.delivered', notification);
        } catch (error) {
            this.logger.error(`Error processing notification ${notification.id}`, error);

            const status = isRetry ? NotificationStatus.FAILED : NotificationStatus.PENDING;

            await this.dataSource.query(
                `UPDATE public.notifications
                 SET status = $1, error = $2, "updatedAt" = NOW()
                 WHERE id = $3`,
                [status, error.message, notification.id]
            );

            if (status === NotificationStatus.FAILED) {
                this.eventEmitter.emit('notification.failed', notification);
            }
        }
    }

    private async sendNotificationByChannel(notification: any, channel: NotificationChannel) {
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

    private async sendEmailNotification(notification: any) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;

        if (!recipientDetails?.email) {
            throw new Error('Email address not provided');
        }

        await this.emailService.send(notification);
    }

    private async sendSmsNotification(notification: any) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;

        if (!recipientDetails?.phone) {
            throw new Error('Phone number not provided');
        }

        await this.smsService.send(notification);
    }

    private async sendPushNotification(notification: any) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;

        if (!recipientDetails?.deviceTokens?.length) {
            throw new Error('No device tokens available');
        }

        await this.pushNotificationService.send(notification);
    }

    private async sendWhatsappNotification(notification: any, recipientDetails: any): Promise<boolean> {
        try {
            const recipient = typeof recipientDetails === 'string'
                ? JSON.parse(recipientDetails)
                : recipientDetails;

            if (!recipient || !recipient.phoneNumber) {
                throw new Error('Phone number not provided for WhatsApp notification');
            }

            await this.whatsappService.sendMessage({
                to: recipient.phoneNumber,
                text: notification.content
            });

            return true;
        } catch (error) {
            this.logger.error(`Failed to send WhatsApp notification: ${error.message}`, error.stack);
            return false;
        }
    }

    private async sendSlackNotification(notification: any) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;

        if (!recipientDetails?.slackUserId) {
            throw new Error('Slack user ID not provided');
        }

        await this.slackService.sendDirectMessage({
            userId: recipientDetails.slackUserId,
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