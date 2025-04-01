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
var NotificationDeliveryService_1;
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationStatus } from '../dto/update-notification.dto';
import { EmailService } from '../../../shared/services/email.service';
import { SmsService } from '../../../shared/services/sms.service';
import { PushNotificationService } from '../../../shared/services/push-notification.service';
import { WebhookService } from '../../../shared/services/webhook.service';
let NotificationDeliveryService = NotificationDeliveryService_1 = class NotificationDeliveryService {
    constructor(notificationRepository, emailService, smsService, pushNotificationService, webhookService, eventEmitter) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
        this.webhookService = webhookService;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(NotificationDeliveryService_1.name);
        this.MAX_RETRY_ATTEMPTS = 3;
    }
    async processNotification(notification) {
        try {
            notification.status = NotificationStatus.PROCESSING;
            await this.notificationRepository.save(notification);
            const deliveryPromises = notification.channels.map(channel => this.deliverToChannel(notification, channel));
            await Promise.all(deliveryPromises);
        }
        catch (error) {
            this.logger.error(`Failed to process notification ${notification.id}:`, error);
            notification.status = NotificationStatus.FAILED;
            await this.notificationRepository.save(notification);
            this.eventEmitter.emit('notification.failed', {
                notification,
                error
            });
        }
    }
    async retryNotification(notification) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) !== null && _b !== void 0 ? _b : 0) >= this.MAX_RETRY_ATTEMPTS) {
            throw new Error('Maximum retry attempts exceeded');
        }
        notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: (_d = (_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.attempts) !== null && _d !== void 0 ? _d : 0, lastAttempt: (_f = (_e = notification.deliveryDetails) === null || _e === void 0 ? void 0 : _e.lastAttempt) !== null && _f !== void 0 ? _f : new Date(), channels: ((_g = notification.deliveryDetails) === null || _g === void 0 ? void 0 : _g.channels.filter(c => c.status === 'SUCCESS')) || [] });
        return this.processNotification(notification);
    }
    async deliverToChannel(notification, channel) {
        try {
            switch (channel.toLowerCase()) {
                case 'email':
                    await this.emailService.send(notification);
                    break;
                case 'sms':
                    await this.smsService.send(notification);
                    break;
                case 'push':
                    await this.pushNotificationService.send(notification);
                    break;
                case 'webhook':
                    await this.webhookService.send(notification);
                    break;
                default:
                    throw new Error(`Unsupported channel: ${channel}`);
            }
            this.eventEmitter.emit('notification.delivered', {
                notification,
                channel
            });
        }
        catch (error) {
            this.logger.error(`Failed to deliver notification ${notification.id} to channel ${channel}:`, error);
            this.eventEmitter.emit('notification.failed', {
                notification,
                channel,
                error
            });
        }
    }
    async getDeliveryStatus(notificationId) {
        const notification = await this.notificationRepository.findOne({
            where: { id: notificationId }
        });
        if (!notification) {
            throw new Error('Notification not found');
        }
        return {
            status: notification.status,
            deliveryDetails: notification.deliveryDetails,
            channels: notification.channels
        };
    }
};
NotificationDeliveryService = NotificationDeliveryService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __metadata("design:paramtypes", [Repository,
        EmailService,
        SmsService,
        PushNotificationService,
        WebhookService,
        EventEmitter2])
], NotificationDeliveryService);
export { NotificationDeliveryService };
//# sourceMappingURL=notification-delivery.service.js.map