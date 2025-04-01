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
var NotificationSchedulerService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Not, In } from 'typeorm';
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
let NotificationSchedulerService = NotificationSchedulerService_1 = class NotificationSchedulerService {
    constructor(notificationRepository, emailService, smsService, pushNotificationService, whatsappService, slackService, eventEmitter) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
        this.whatsappService = whatsappService;
        this.slackService = slackService;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(NotificationSchedulerService_1.name);
        this.MAX_RETRY_ATTEMPTS = 3;
        this.BATCH_SIZE = 100;
    }
    async rescheduleNotification(notificationId, newScheduledFor) {
        this.logger.debug(`Rescheduling notification ${notificationId} to ${newScheduledFor}`);
        try {
            const notificationObj = await this.notificationRepository.findOne({ where: { id: notificationId } });
            if (!notificationObj) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }
            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot reschedule notification with status ${notificationObj.status}`);
            }
            notificationObj.scheduledFor = newScheduledFor;
            notificationObj.status = NotificationStatus.SCHEDULED;
            notificationObj.updatedAt = new Date();
            await this.notificationRepository.save(notificationObj);
            this.eventEmitter.emit('notification.rescheduled', notificationObj);
            return notificationObj;
        }
        catch (error) {
            this.logger.error(`Error rescheduling notification ${notificationId}`, error);
            throw error;
        }
    }
    async scheduleNotification(notificationData, scheduledFor) {
        this.logger.debug('Scheduling new notification');
        try {
            notificationData.scheduledFor = scheduledFor;
            notificationData.status = NotificationStatus.SCHEDULED;
            if (notificationData.retryCount === undefined) {
                notificationData.retryCount = 0;
            }
            const savedNotification = await this.notificationRepository.save(notificationData);
            this.eventEmitter.emit('notification.scheduled', savedNotification);
            return savedNotification;
        }
        catch (error) {
            this.logger.error('Error scheduling notification', error);
            throw error;
        }
    }
    async cancelScheduledNotification(notificationId) {
        this.logger.debug(`Cancelling notification ${notificationId}`);
        try {
            const notificationObj = await this.notificationRepository.findOne({ where: { id: notificationId } });
            if (!notificationObj) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }
            if (notificationObj.status === NotificationStatus.DELIVERED ||
                notificationObj.status === NotificationStatus.FAILED) {
                throw new Error(`Cannot cancel notification with status ${notificationObj.status}`);
            }
            notificationObj.status = NotificationStatus.CANCELLED;
            notificationObj.updatedAt = new Date();
            await this.notificationRepository.save(notificationObj);
            this.eventEmitter.emit('notification.cancelled', notificationObj);
            return notificationObj;
        }
        catch (error) {
            this.logger.error(`Error cancelling notification ${notificationId}`, error);
            throw error;
        }
    }
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
        }
        catch (error) {
            this.logger.error('Error processing scheduled notifications', error);
        }
    }
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
        }
        catch (error) {
            this.logger.error('Error retrying failed notifications', error);
        }
    }
    async cleanupExpiredNotifications() {
        this.logger.debug('Cleaning up expired notifications');
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() - 30);
            await this.notificationRepository.update({
                status: Not(In([NotificationStatus.DELIVERED, NotificationStatus.FAILED])),
                createdAt: LessThanOrEqual(expiryDate),
            }, {
                status: NotificationStatus.EXPIRED,
            });
        }
        catch (error) {
            this.logger.error('Error cleaning up expired notifications', error);
        }
    }
    async processNotification(notification, isRetry = false) {
        this.logger.debug(`Processing notification ${notification.id}`);
        try {
            notification.status = NotificationStatus.PROCESSING;
            await this.notificationRepository.save(notification);
            for (const channel of notification.channels) {
                await this.sendNotificationByChannel(notification, channel);
            }
            notification.status = NotificationStatus.DELIVERED;
            notification.deliveredAt = new Date();
            await this.notificationRepository.save(notification);
            this.eventEmitter.emit('notification.delivered', notification);
        }
        catch (error) {
            this.logger.error(`Error processing notification ${notification.id}`, error);
            if (isRetry) {
                notification.retryCount = (notification.retryCount || 0) + 1;
            }
            if (notification.retryCount >= this.MAX_RETRY_ATTEMPTS) {
                notification.status = NotificationStatus.FAILED;
                notification.error = error.message;
                this.eventEmitter.emit('notification.failed', notification);
            }
            else {
                notification.status = NotificationStatus.PENDING;
            }
            await this.notificationRepository.save(notification);
        }
    }
    async sendNotificationByChannel(notification, channel) {
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
                break;
            default:
                this.logger.warn(`Unknown notification channel: ${channel}`);
        }
    }
    async sendEmailNotification(notification) {
        var _a;
        if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.email)) {
            throw new Error('Email address not provided');
        }
        await this.emailService.send(notification);
    }
    async sendSmsNotification(notification) {
        var _a;
        if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.phone)) {
            throw new Error('Phone number not provided');
        }
        await this.smsService.send(notification);
    }
    async sendPushNotification(notification) {
        var _a, _b;
        if (!((_b = (_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.deviceTokens) === null || _b === void 0 ? void 0 : _b.length)) {
            throw new Error('No device tokens available');
        }
        await this.pushNotificationService.send(notification);
    }
    async sendWhatsappNotification(notification, user) {
        try {
            if (!user || !user.phoneNumber) {
                throw new Error('Phone number not provided for WhatsApp notification');
            }
            await this.whatsappService.sendMessage({
                to: user.phoneNumber,
                text: notification.content
            });
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send WhatsApp notification: ${error.message}`, error.stack);
            return false;
        }
    }
    async sendSlackNotification(notification) {
        var _a;
        if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.slackUserId)) {
            throw new Error('Slack user ID not provided');
        }
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
};
__decorate([
    Cron(CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "processScheduledNotifications", null);
__decorate([
    Cron(CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "retryFailedNotifications", null);
__decorate([
    Cron(CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "cleanupExpiredNotifications", null);
NotificationSchedulerService = NotificationSchedulerService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __metadata("design:paramtypes", [Repository,
        EmailService,
        SmsService,
        PushNotificationService,
        WhatsappService,
        SlackService,
        EventEmitter2])
], NotificationSchedulerService);
export { NotificationSchedulerService };
//# sourceMappingURL=notification-scheduler.service.js.map