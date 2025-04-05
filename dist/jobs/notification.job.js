"use strict";
// src/jobs/notification.job.ts
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
var NotificationJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationJob = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_entity_1 = require("../modules/notifications/entities/notification.entity");
const user_entity_1 = require("../modules/users/entities/user.entity");
const push_subscription_entity_1 = require("../modules/notifications/entities/push-subscription.entity");
const email_service_1 = require("../modules/email/services/email.service");
const sms_service_1 = require("../modules/sms/services/sms.service");
const notification_priority_enum_1 = require("../modules/notifications/enums/notification-priority.enum");
const users_service_1 = require("../modules/users/services/users.service");
let NotificationJob = NotificationJob_1 = class NotificationJob {
    constructor(notificationQueue, notificationRepository, userRepository, pushSubscriptionRepository, emailService, smsService, configService, usersService) {
        this.notificationQueue = notificationQueue;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.pushSubscriptionRepository = pushSubscriptionRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(NotificationJob_1.name);
    }
    async processNotification(job) {
        var _a, _b, _c, _d;
        const { data } = job;
        this.logger.debug(`Processing notification job ${job.id}`);
        try {
            // Get recipients
            const recipients = await this.getRecipients(data.recipients);
            if (!recipients.length) {
                this.logger.warn(`No recipients found for notification ${job.id}`);
                return { success: false, error: 'No recipients found' };
            }
            // Create notification records
            const notifications = await this.createNotifications(data, recipients);
            // Process each delivery channel
            await Promise.all([
                // In-app notifications
                ((_a = data.channels) === null || _a === void 0 ? void 0 : _a.inApp) !== false && this.sendInAppNotifications(notifications),
                // Email notifications
                ((_b = data.channels) === null || _b === void 0 ? void 0 : _b.email) && this.sendEmailNotifications(notifications),
                // SMS notifications
                ((_c = data.channels) === null || _c === void 0 ? void 0 : _c.sms) && this.sendSmsNotifications(notifications),
                // Push notifications
                ((_d = data.channels) === null || _d === void 0 ? void 0 : _d.push) && this.sendPushNotifications(notifications),
            ]);
            return { success: true, notificationIds: notifications.map(n => n.id) };
        }
        catch (error) {
            this.logger.error(`Failed to process notification job ${job.id}:`, error);
            throw error;
        }
    }
    async getRecipients(recipientData) {
        var _a, _b, _c;
        const query = this.userRepository.createQueryBuilder('user');
        if ((_a = recipientData.userIds) === null || _a === void 0 ? void 0 : _a.length) {
            query.orWhere('user.id IN (:...userIds)', { userIds: recipientData.userIds });
        }
        if ((_b = recipientData.organizationIds) === null || _b === void 0 ? void 0 : _b.length) {
            query.orWhere('user.organizationId IN (:...orgIds)', {
                orgIds: recipientData.organizationIds
            });
        }
        if ((_c = recipientData.roles) === null || _c === void 0 ? void 0 : _c.length) {
            query.orWhere('user.role IN (:...roles)', { roles: recipientData.roles });
        }
        return query.getMany();
    }
    async createNotifications(data, recipients) {
        const notifications = recipients.map(recipient => {
            var _a;
            const notification = new notification_entity_1.Notification();
            notification.type = data.type;
            notification.title = data.title;
            notification.message = data.message;
            notification.data = data.data;
            notification.priority = data.priority || notification_priority_enum_1.NotificationPriority.MEDIUM;
            notification.userId = recipient.id;
            notification.organizationId = recipient.organizationId;
            notification.metadata = Object.assign(Object.assign({}, data.metadata), { recipientRole: recipient.role });
            notification.status = 'PENDING';
            notification.expiresAt = (_a = data.metadata) === null || _a === void 0 ? void 0 : _a.expiresAt;
            return notification;
        });
        return this.notificationRepository.save(notifications);
    }
    async sendInAppNotifications(notifications) {
        try {
            // Group notifications by user
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            // Send to connected users via WebSocket
            Object.entries(userNotifications).forEach(([userId, userNotifs]) => {
                this.server.to(`user:${userId}`).emit('notifications', userNotifs);
            });
            // Mark as delivered
            await this.notificationRepository.update({ id: (0, typeorm_2.In)(notifications.map(n => n.id)) }, {
                status: 'DELIVERED',
                deliveredAt: new Date(),
            });
        }
        catch (error) {
            this.logger.error('Failed to send in-app notifications:', error);
            throw error;
        }
    }
    async sendEmailNotifications(notifications) {
        try {
            // Group by user to avoid duplicate emails
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            // Send emails
            const emailPromises = Object.entries(userNotifications).map(async ([userId, userNotifs]) => {
                const user = await this.userRepository.findOne({ where: { id: userId } });
                if (!(user === null || user === void 0 ? void 0 : user.email))
                    return;
                await this.emailService.sendNotificationEmail(user.email, {
                    notifications: userNotifs,
                    userName: `${user.firstName} ${user.lastName}`,
                });
            });
            await Promise.all(emailPromises);
        }
        catch (error) {
            this.logger.error('Failed to send email notifications:', error);
            throw error;
        }
    }
    async sendSmsNotifications(notifications) {
        try {
            // Group by user to avoid duplicate SMS
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            // Send SMS
            const smsPromises = Object.entries(userNotifications).map(async ([userId, userNotifs]) => {
                var _a;
                const user = await this.usersService.findOne(userId, notifications[0].organizationId);
                if (!user)
                    return;
                const settings = await user.settings;
                if (!(settings === null || settings === void 0 ? void 0 : settings.phone) || !((_a = settings.notificationPreferences) === null || _a === void 0 ? void 0 : _a.sms))
                    return;
                const message = this.formatMessage(userNotifs[0], userNotifs);
                if (!message)
                    return;
                await this.smsService.sendSms(settings.phone, message);
            });
            await Promise.all(smsPromises);
        }
        catch (error) {
            this.logger.error('Failed to send SMS notifications:', error);
            throw error;
        }
    }
    formatMessage(notification, notifications) {
        if (notifications) {
            return `You have ${notifications.length} new notification(s): ${notification.title}${notifications.length > 1 ? ' and more...' : ''}`;
        }
        return `New notification: ${notification.title}`;
    }
    async sendPushNotifications(notifications) {
        try {
            // Get push subscriptions for users
            const subscriptions = await this.pushSubscriptionRepository.find({
                where: {
                    userId: (0, typeorm_2.In)(notifications.map(n => n.userId)),
                    active: true,
                },
            });
            // Group notifications by user
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            // Send push notifications
            const pushPromises = subscriptions.map(async (subscription) => {
                const userNotifs = userNotifications[subscription.userId];
                if (!userNotifs)
                    return;
                await this.sendPushNotification(subscription, userNotifs);
            });
            await Promise.all(pushPromises);
        }
        catch (error) {
            this.logger.error('Failed to send push notifications:', error);
            throw error;
        }
    }
    async sendPushNotification(subscription, notifications) {
        try {
            const webpush = require('web-push');
            webpush.setVapidDetails('mailto:' + this.configService.get('mail.from'), this.configService.get('push.publicKey'), this.configService.get('push.privateKey'));
            await webpush.sendNotification(JSON.parse(subscription.subscription), JSON.stringify({
                notifications,
                timestamp: new Date().toISOString(),
            }));
        }
        catch (error) {
            this.logger.error('Failed to send push notification:', error);
            if (error.statusCode === 410) {
                // Subscription has expired or is no longer valid
                await this.pushSubscriptionRepository.update({ id: subscription.id }, { active: false });
            }
            throw error;
        }
    }
    // Queue management methods
    async addToQueue(data) {
        return this.notificationQueue.add('send', data, {
            priority: this.getPriorityLevel(data.priority),
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
    }
    getPriorityLevel(priority) {
        switch (priority) {
            case notification_priority_enum_1.NotificationPriority.URGENT:
                return 1;
            case notification_priority_enum_1.NotificationPriority.HIGH:
                return 2;
            case notification_priority_enum_1.NotificationPriority.MEDIUM:
                return 3;
            case notification_priority_enum_1.NotificationPriority.LOW:
                return 4;
            default:
                return 3;
        }
    }
    // Cleanup methods
    async cleanupOldNotifications() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        await this.notificationRepository.delete({
            createdAt: (0, typeorm_2.LessThan)(thirtyDaysAgo),
            status: (0, typeorm_2.In)(['DELIVERED', 'READ']),
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationJob.prototype, "server", void 0);
__decorate([
    (0, bull_1.Process)('send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationJob.prototype, "processNotification", null);
NotificationJob = NotificationJob_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('notifications'),
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, bull_1.InjectQueue)('notifications')),
    __param(1, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(push_subscription_entity_1.PushSubscription)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        sms_service_1.SmsService,
        config_1.ConfigService,
        users_service_1.UsersService])
], NotificationJob);
exports.NotificationJob = NotificationJob;
//# sourceMappingURL=notification.job.js.map