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
var NotificationDeliveryListener_1;
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationStatus } from '../dto/update-notification.dto';
import { NotificationDeliveryService } from '../services/notification-delivery.service';
let NotificationDeliveryListener = NotificationDeliveryListener_1 = class NotificationDeliveryListener {
    constructor(notificationRepository, deliveryService) {
        this.notificationRepository = notificationRepository;
        this.deliveryService = deliveryService;
        this.logger = new Logger(NotificationDeliveryListener_1.name);
    }
    async handleNotificationDelivered(payload) {
        var _a, _b, _c;
        try {
            const { notification, channel } = payload;
            this.logger.debug(`Handling delivery success for notification ${notification.id} on channel ${channel}`);
            notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: ((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0, lastAttempt: ((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.lastAttempt) || new Date(), channels: [
                    ...(((_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || []),
                    {
                        channel,
                        status: 'SUCCESS',
                        sentAt: new Date(),
                    }
                ] });
            const allChannelsDelivered = notification.channels.every(ch => {
                var _a, _b;
                return (_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(d => d.channel === ch && d.status === 'SUCCESS');
            });
            if (allChannelsDelivered) {
                notification.status = NotificationStatus.DELIVERED;
                notification.deliveredAt = new Date();
            }
            await this.notificationRepository.save(notification);
        }
        catch (error) {
            this.logger.error(`Error handling delivery success for notification ${payload.notification.id}:`, error);
            throw error;
        }
    }
    async handleNotificationFailed(payload) {
        var _a, _b;
        try {
            const { notification, channel, error, retry = true } = payload;
            this.logger.debug(`Handling delivery failure for notification ${notification.id} on channel ${channel}`);
            notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: (((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0) + 1, lastAttempt: new Date(), channels: [
                    ...(((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.channels) || []),
                    {
                        channel,
                        status: 'FAILED',
                        sentAt: new Date(),
                        error: error.message || 'Unknown error',
                    }
                ] });
            const allChannelsFailed = notification.channels.every(ch => {
                var _a, _b;
                return (_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(d => d.channel === ch && d.status === 'FAILED');
            });
            if (allChannelsFailed) {
                if (retry && notification.deliveryDetails.attempts < 3) {
                    notification.status = NotificationStatus.RETRY_PENDING;
                    await this.notificationRepository.save(notification);
                    const retryDelay = Math.pow(2, notification.deliveryDetails.attempts) * 1000;
                    setTimeout(() => {
                        this.deliveryService.retryNotification(notification);
                    }, retryDelay);
                }
                else {
                    notification.status = NotificationStatus.FAILED;
                    await this.notificationRepository.save(notification);
                }
            }
            else {
                await this.notificationRepository.save(notification);
            }
        }
        catch (error) {
            this.logger.error(`Error handling delivery failure for notification ${payload.notification.id}:`, error);
            throw error;
        }
    }
    async handleDeliveryTimeout(notification) {
        var _a, _b, _c;
        try {
            this.logger.debug(`Handling delivery timeout for notification ${notification.id}`);
            notification.status = NotificationStatus.FAILED;
            notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: ((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0, lastAttempt: ((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.lastAttempt) || new Date(), channels: ((_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || [], error: 'Delivery timeout exceeded', timeoutAt: new Date() });
            await this.notificationRepository.save(notification);
        }
        catch (error) {
            this.logger.error(`Error handling delivery timeout for notification ${notification.id}:`, error);
            throw error;
        }
    }
};
__decorate([
    OnEvent('notification.delivered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleNotificationDelivered", null);
__decorate([
    OnEvent('notification.failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleNotificationFailed", null);
__decorate([
    OnEvent('notification.delivery_timeout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notification]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleDeliveryTimeout", null);
NotificationDeliveryListener = NotificationDeliveryListener_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __metadata("design:paramtypes", [Repository,
        NotificationDeliveryService])
], NotificationDeliveryListener);
export { NotificationDeliveryListener };
//# sourceMappingURL=notification-delivery.listener.js.map