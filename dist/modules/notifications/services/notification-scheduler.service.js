"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const event_emitter_1 = require("@nestjs/event-emitter");
const notification_entity_1 = require("../entities/notification.entity");
const update_notification_dto_1 = require("../dto/update-notification.dto");
const create_notification_dto_1 = require("../dto/create-notification.dto");
const email_service_1 = require("../../../shared/services/email.service");
const sms_service_1 = require("../../../shared/services/sms.service");
const push_notification_service_1 = require("../../../shared/services/push-notification.service");
const whatsapp_services_1 = require("../../whatsapp/services/whatsapp.services");
const slack_service_1 = require("../../integrations/slack/services/slack.service");
let NotificationSchedulerService = NotificationSchedulerService_1 = class NotificationSchedulerService {
    constructor(notificationRepository, emailService, smsService, pushNotificationService, whatsappService, slackService, eventEmitter) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
        this.whatsappService = whatsappService;
        this.slackService = slackService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(NotificationSchedulerService_1.name);
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
            // Check if notification is in a state that allows rescheduling
            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                throw new Error(`Cannot reschedule notification with status ${notificationObj.status}`);
            }
            // Update the notification
            notificationObj.scheduledFor = newScheduledFor;
            notificationObj.status = update_notification_dto_1.NotificationStatus.SCHEDULED;
            notificationObj.updatedAt = new Date();
            await this.notificationRepository.save(notificationObj);
            // Emit event
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
            // Set scheduling details
            notificationData.scheduledFor = scheduledFor;
            notificationData.status = update_notification_dto_1.NotificationStatus.SCHEDULED;
            // Initialize retry count if not set
            if (notificationData.retryCount === undefined) {
                notificationData.retryCount = 0;
            }
            // Save the notification
            const savedNotification = await this.notificationRepository.save(notificationData);
            // Emit event
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
            // Check if notification can be cancelled
            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                throw new Error(`Cannot cancel notification with status ${notificationObj.status}`);
            }
            // Update the notification status
            notificationObj.status = update_notification_dto_1.NotificationStatus.CANCELLED;
            notificationObj.updatedAt = new Date();
            await this.notificationRepository.save(notificationObj);
            // Emit event
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
                    status: update_notification_dto_1.NotificationStatus.SCHEDULED,
                    scheduledFor: (0, typeorm_2.LessThanOrEqual)(new Date()),
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
                    status: update_notification_dto_1.NotificationStatus.FAILED,
                    retryCount: (0, typeorm_2.LessThanOrEqual)(this.MAX_RETRY_ATTEMPTS),
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
            expiryDate.setDate(expiryDate.getDate() - 30); // 30 days retention
            await this.notificationRepository.update({
                status: (0, typeorm_2.Not)((0, typeorm_2.In)([update_notification_dto_1.NotificationStatus.DELIVERED, update_notification_dto_1.NotificationStatus.FAILED])),
                createdAt: (0, typeorm_2.LessThanOrEqual)(expiryDate),
            }, {
                status: update_notification_dto_1.NotificationStatus.EXPIRED,
            });
        }
        catch (error) {
            this.logger.error('Error cleaning up expired notifications', error);
        }
    }
    async processNotification(notification, isRetry = false) {
        this.logger.debug(`Processing notification ${notification.id}`);
        try {
            // Update status to processing
            notification.status = update_notification_dto_1.NotificationStatus.PROCESSING;
            await this.notificationRepository.save(notification);
            // Process each channel
            for (const channel of notification.channels) {
                await this.sendNotificationByChannel(notification, channel);
            }
            // Update notification status
            notification.status = update_notification_dto_1.NotificationStatus.DELIVERED;
            notification.deliveredAt = new Date();
            await this.notificationRepository.save(notification);
            // Emit event for successful delivery
            this.eventEmitter.emit('notification.delivered', notification);
        }
        catch (error) {
            this.logger.error(`Error processing notification ${notification.id}`, error);
            // Handle retry logic
            if (isRetry) {
                notification.retryCount = (notification.retryCount || 0) + 1;
            }
            // Update status based on retry attempts
            if (notification.retryCount >= this.MAX_RETRY_ATTEMPTS) {
                notification.status = update_notification_dto_1.NotificationStatus.FAILED;
                notification.error = error.message;
                this.eventEmitter.emit('notification.failed', notification);
            }
            else {
                notification.status = update_notification_dto_1.NotificationStatus.PENDING;
            }
            await this.notificationRepository.save(notification);
        }
    }
    async sendNotificationByChannel(notification, channel) {
        switch (channel) {
            case create_notification_dto_1.NotificationChannel.EMAIL:
                await this.sendEmailNotification(notification);
                break;
            case create_notification_dto_1.NotificationChannel.SMS:
                await this.sendSmsNotification(notification);
                break;
            case create_notification_dto_1.NotificationChannel.PUSH:
                await this.sendPushNotification(notification);
                break;
            case create_notification_dto_1.NotificationChannel.WHATSAPP:
                await this.sendWhatsappNotification(notification, notification.recipientDetails);
                break;
            case create_notification_dto_1.NotificationChannel.SLACK:
                await this.sendSlackNotification(notification);
                break;
            case create_notification_dto_1.NotificationChannel.IN_APP:
                // In-app notifications don't need additional processing
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
        // The simplest approach: just pass the notification as-is
        await this.emailService.send(notification);
    }
    async sendSmsNotification(notification) {
        var _a;
        if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.phone)) {
            throw new Error('Phone number not provided');
        }
        // The simplest approach: just pass the notification as-is
        await this.smsService.send(notification);
    }
    async sendPushNotification(notification) {
        var _a, _b;
        if (!((_b = (_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.deviceTokens) === null || _b === void 0 ? void 0 : _b.length)) {
            throw new Error('No device tokens available');
        }
        // The simplest approach: just pass the notification as-is
        await this.pushNotificationService.send(notification);
    }
    async sendWhatsappNotification(notification, user) {
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
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "processScheduledNotifications", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "retryFailedNotifications", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationSchedulerService.prototype, "cleanupExpiredNotifications", null);
NotificationSchedulerService = NotificationSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        sms_service_1.SmsService,
        push_notification_service_1.PushNotificationService,
        whatsapp_services_1.WhatsappService,
        slack_service_1.SlackService,
        event_emitter_1.EventEmitter2])
], NotificationSchedulerService);
exports.NotificationSchedulerService = NotificationSchedulerService;
//# sourceMappingURL=notification-scheduler.service.js.map