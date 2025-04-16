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
    constructor(notificationRepository, emailService, smsService, pushNotificationService, whatsappService, slackService, eventEmitter, dataSource) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
        this.whatsappService = whatsappService;
        this.slackService = slackService;
        this.eventEmitter = eventEmitter;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(NotificationSchedulerService_1.name);
        this.MAX_RETRY_ATTEMPTS = 3;
        this.BATCH_SIZE = 100;
    }
    async rescheduleNotification(notificationId, newScheduledFor) {
        this.logger.debug(`Rescheduling notification ${notificationId} to ${newScheduledFor}`);
        try {
            const notifications = await this.dataSource.query(`SELECT * FROM public.notifications WHERE id = $1 AND "deletedAt" IS NULL`, [notificationId]);
            if (!notifications || notifications.length === 0) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }
            const notificationObj = notifications[0];
            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                throw new Error(`Cannot reschedule notification with status ${notificationObj.status}`);
            }
            await this.dataSource.query(`UPDATE public.notifications
                 SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
                 WHERE id = $3`, [newScheduledFor, update_notification_dto_1.NotificationStatus.SCHEDULED, notificationId]);
            const updatedNotification = Object.assign(Object.assign({}, notificationObj), { scheduledFor: newScheduledFor, status: update_notification_dto_1.NotificationStatus.SCHEDULED, updatedAt: new Date() });
            this.eventEmitter.emit('notification.rescheduled', updatedNotification);
            return updatedNotification;
        }
        catch (error) {
            this.logger.error(`Error rescheduling notification ${notificationId}`, error);
            throw error;
        }
    }
    async scheduleNotification(notificationData, scheduledFor) {
        this.logger.debug('Scheduling new notification');
        try {
            // Handle existing notification update
            if (notificationData.id) {
                await this.dataSource.query(`UPDATE public.notifications
                     SET "scheduledFor" = $1, status = $2, "updatedAt" = NOW()
                     WHERE id = $3`, [scheduledFor, update_notification_dto_1.NotificationStatus.SCHEDULED, notificationData.id]);
                const result = await this.dataSource.query(`SELECT * FROM public.notifications WHERE id = $1`, [notificationData.id]);
                if (result && result.length > 0) {
                    const updatedNotification = result[0];
                    this.eventEmitter.emit('notification.scheduled', updatedNotification);
                    return updatedNotification;
                }
            }
            // For new notifications or as fallback, use the repository
            // with a properly typed notification object
            const notification = this.notificationRepository.create(Object.assign(Object.assign({}, notificationData), { scheduledFor, status: update_notification_dto_1.NotificationStatus.SCHEDULED }));
            const savedNotification = await this.notificationRepository.save(notification);
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
            const notifications = await this.dataSource.query(`SELECT * FROM public.notifications WHERE id = $1 AND "deletedAt" IS NULL`, [notificationId]);
            if (!notifications || notifications.length === 0) {
                throw new Error(`Notification with ID ${notificationId} not found`);
            }
            const notificationObj = notifications[0];
            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                throw new Error(`Cannot cancel notification with status ${notificationObj.status}`);
            }
            await this.dataSource.query(`UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE id = $2`, [update_notification_dto_1.NotificationStatus.CANCELLED, notificationId]);
            const updatedNotification = Object.assign(Object.assign({}, notificationObj), { status: update_notification_dto_1.NotificationStatus.CANCELLED, updatedAt: new Date() });
            this.eventEmitter.emit('notification.cancelled', updatedNotification);
            return updatedNotification;
        }
        catch (error) {
            this.logger.error(`Error cancelling notification ${notificationId}`, error);
            throw error;
        }
    }
    async processScheduledNotifications() {
        this.logger.debug('Processing scheduled notifications');
        try {
            const notifications = await this.dataSource.query(`SELECT * FROM public.notifications
                 WHERE status = $1
                 AND "scheduledFor" <= NOW()
                 AND "deletedAt" IS NULL
                 LIMIT $2`, [update_notification_dto_1.NotificationStatus.SCHEDULED, this.BATCH_SIZE]);
            if (!notifications || notifications.length === 0) {
                return;
            }
            this.logger.log(`Processing ${notifications.length} scheduled notifications`);
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
            const notifications = await this.dataSource.query(`SELECT * FROM public.notifications
                 WHERE status = $1
                 AND "deletedAt" IS NULL
                 LIMIT $2`, [update_notification_dto_1.NotificationStatus.FAILED, this.BATCH_SIZE]);
            if (!notifications || notifications.length === 0) {
                return;
            }
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
            await this.dataSource.query(`UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE status NOT IN ($2, $3)
                 AND "createdAt" <= $4`, [
                update_notification_dto_1.NotificationStatus.EXPIRED,
                update_notification_dto_1.NotificationStatus.DELIVERED,
                update_notification_dto_1.NotificationStatus.FAILED,
                expiryDate
            ]);
        }
        catch (error) {
            this.logger.error('Error cleaning up expired notifications', error);
        }
    }
    async processNotification(notification, isRetry = false) {
        this.logger.debug(`Processing notification ${notification.id}`);
        try {
            await this.dataSource.query(`UPDATE public.notifications
                 SET status = $1, "updatedAt" = NOW()
                 WHERE id = $2`, [update_notification_dto_1.NotificationStatus.PROCESSING, notification.id]);
            const channels = typeof notification.channels === 'string'
                ? JSON.parse(notification.channels)
                : (notification.channels || []);
            for (const channel of channels) {
                await this.sendNotificationByChannel(notification, channel);
            }
            await this.dataSource.query(`UPDATE public.notifications
                 SET status = $1, "deliveredAt" = NOW(), "updatedAt" = NOW()
                 WHERE id = $2`, [update_notification_dto_1.NotificationStatus.DELIVERED, notification.id]);
            this.eventEmitter.emit('notification.delivered', notification);
        }
        catch (error) {
            this.logger.error(`Error processing notification ${notification.id}`, error);
            const status = isRetry ? update_notification_dto_1.NotificationStatus.FAILED : update_notification_dto_1.NotificationStatus.PENDING;
            await this.dataSource.query(`UPDATE public.notifications
                 SET status = $1, error = $2, "updatedAt" = NOW()
                 WHERE id = $3`, [status, error.message, notification.id]);
            if (status === update_notification_dto_1.NotificationStatus.FAILED) {
                this.eventEmitter.emit('notification.failed', notification);
            }
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
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;
        if (!(recipientDetails === null || recipientDetails === void 0 ? void 0 : recipientDetails.email)) {
            throw new Error('Email address not provided');
        }
        await this.emailService.send(notification);
    }
    async sendSmsNotification(notification) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;
        if (!(recipientDetails === null || recipientDetails === void 0 ? void 0 : recipientDetails.phone)) {
            throw new Error('Phone number not provided');
        }
        await this.smsService.send(notification);
    }
    async sendPushNotification(notification) {
        var _a;
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;
        if (!((_a = recipientDetails === null || recipientDetails === void 0 ? void 0 : recipientDetails.deviceTokens) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error('No device tokens available');
        }
        await this.pushNotificationService.send(notification);
    }
    async sendWhatsappNotification(notification, recipientDetails) {
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
        }
        catch (error) {
            this.logger.error(`Failed to send WhatsApp notification: ${error.message}`, error.stack);
            return false;
        }
    }
    async sendSlackNotification(notification) {
        const recipientDetails = typeof notification.recipientDetails === 'string'
            ? JSON.parse(notification.recipientDetails)
            : notification.recipientDetails;
        if (!(recipientDetails === null || recipientDetails === void 0 ? void 0 : recipientDetails.slackUserId)) {
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
        event_emitter_1.EventEmitter2,
        typeorm_2.DataSource])
], NotificationSchedulerService);
exports.NotificationSchedulerService = NotificationSchedulerService;
//# sourceMappingURL=notification-scheduler.service.js.map