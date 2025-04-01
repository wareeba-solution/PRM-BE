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
import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '../modules/notifications/entities/notification.entity';
import { User } from '../modules/users/entities/user.entity';
import { PushSubscription } from '../modules/notifications/entities/push-subscription.entity';
import { EmailService } from '../modules/email/services/email.service';
import { SmsService } from '../modules/sms/services/sms.service';
import { NotificationPriority } from '../modules/notifications/enums/notification-priority.enum';
let NotificationJob = NotificationJob_1 = class NotificationJob {
    constructor(notificationQueue, notificationRepository, userRepository, pushSubscriptionRepository, emailService, smsService, configService) {
        this.notificationQueue = notificationQueue;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.pushSubscriptionRepository = pushSubscriptionRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.configService = configService;
        this.logger = new Logger(NotificationJob_1.name);
    }
    async processNotification(job) {
        var _a, _b, _c, _d;
        const { data } = job;
        this.logger.debug(`Processing notification job ${job.id}`);
        try {
            const recipients = await this.getRecipients(data.recipients);
            if (!recipients.length) {
                this.logger.warn(`No recipients found for notification ${job.id}`);
                return { success: false, error: 'No recipients found' };
            }
            const notifications = await this.createNotifications(data, recipients);
            await Promise.all([
                ((_a = data.channels) === null || _a === void 0 ? void 0 : _a.inApp) !== false && this.sendInAppNotifications(notifications),
                ((_b = data.channels) === null || _b === void 0 ? void 0 : _b.email) && this.sendEmailNotifications(notifications),
                ((_c = data.channels) === null || _c === void 0 ? void 0 : _c.sms) && this.sendSmsNotifications(notifications),
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
            const notification = new Notification();
            notification.type = data.type;
            notification.title = data.title;
            notification.message = data.message;
            notification.data = data.data;
            notification.priority = data.priority || NotificationPriority.MEDIUM;
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
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            Object.entries(userNotifications).forEach(([userId, userNotifs]) => {
                this.server.to(`user:${userId}`).emit('notifications', userNotifs);
            });
            await this.notificationRepository.update({ id: In(notifications.map(n => n.id)) }, {
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
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
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
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
            const smsPromises = Object.entries(userNotifications).map(async ([userId, userNotifs]) => {
                const user = await this.userRepository.findOne({ where: { id: userId } });
                if (!user || !user.mobilePhone)
                    return;
                const message = `You have ${userNotifs.length} new notification(s): ${userNotifs[0].title}${userNotifs.length > 1 ? ' and more...' : ''}`;
                await this.smsService.sendSms(user.mobilePhone, message);
            });
            await Promise.all(smsPromises);
        }
        catch (error) {
            this.logger.error('Failed to send SMS notifications:', error);
            throw error;
        }
    }
    async sendPushNotifications(notifications) {
        try {
            const subscriptions = await this.pushSubscriptionRepository.find({
                where: {
                    userId: In(notifications.map(n => n.userId)),
                    active: true,
                },
            });
            const userNotifications = notifications.reduce((acc, notification) => {
                if (!acc[notification.userId]) {
                    acc[notification.userId] = [];
                }
                acc[notification.userId].push(notification);
                return acc;
            }, {});
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
                await this.pushSubscriptionRepository.update({ id: subscription.id }, { active: false });
            }
            throw error;
        }
    }
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
            case NotificationPriority.URGENT:
                return 1;
            case NotificationPriority.HIGH:
                return 2;
            case NotificationPriority.MEDIUM:
                return 3;
            case NotificationPriority.LOW:
                return 4;
            default:
                return 3;
        }
    }
    async cleanupOldNotifications() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        await this.notificationRepository.delete({
            createdAt: LessThan(thirtyDaysAgo),
            status: In(['DELIVERED', 'READ']),
        });
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], NotificationJob.prototype, "server", void 0);
__decorate([
    Process('send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationJob.prototype, "processNotification", null);
NotificationJob = NotificationJob_1 = __decorate([
    Injectable(),
    Processor('notifications'),
    WebSocketGateway(),
    __param(0, InjectQueue('notifications')),
    __param(1, InjectRepository(Notification)),
    __param(2, InjectRepository(User)),
    __param(3, InjectRepository(PushSubscription)),
    __metadata("design:paramtypes", [Object, Repository,
        Repository,
        Repository,
        EmailService,
        SmsService,
        ConfigService])
], NotificationJob);
export { NotificationJob };
//# sourceMappingURL=notification.job.js.map