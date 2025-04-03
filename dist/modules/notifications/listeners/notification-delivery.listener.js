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
var NotificationDeliveryListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeliveryListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../entities/notification.entity");
const update_notification_dto_1 = require("../dto/update-notification.dto");
const notification_delivery_service_1 = require("../services/notification-delivery.service");
let NotificationDeliveryListener = NotificationDeliveryListener_1 = class NotificationDeliveryListener {
    constructor(notificationRepository, deliveryService) {
        this.notificationRepository = notificationRepository;
        this.deliveryService = deliveryService;
        this.logger = new common_1.Logger(NotificationDeliveryListener_1.name);
    }
    async handleNotificationDelivered(payload) {
        var _a, _b, _c;
        try {
            const { notification, channel } = payload;
            this.logger.debug(`Handling delivery success for notification ${notification.id} on channel ${channel}`);
            // Update delivery details for the specific channel
            notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: ((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0, lastAttempt: ((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.lastAttempt) || new Date(), channels: [
                    ...(((_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || []),
                    {
                        channel,
                        status: 'SUCCESS',
                        sentAt: new Date(),
                    }
                ] });
            // Check if all channels have delivered successfully
            const allChannelsDelivered = notification.channels.every(ch => {
                var _a, _b;
                return (_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(d => d.channel === ch && d.status === 'SUCCESS');
            });
            if (allChannelsDelivered) {
                notification.status = update_notification_dto_1.NotificationStatus.DELIVERED;
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
            // Update delivery details
            notification.deliveryDetails = Object.assign(Object.assign({}, notification.deliveryDetails), { attempts: (((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0) + 1, lastAttempt: new Date(), channels: [
                    ...(((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.channels) || []),
                    {
                        channel,
                        status: 'FAILED',
                        sentAt: new Date(),
                        error: error.message || 'Unknown error',
                    }
                ] });
            // Check if all channels have failed
            const allChannelsFailed = notification.channels.every(ch => {
                var _a, _b;
                return (_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(d => d.channel === ch && d.status === 'FAILED');
            });
            if (allChannelsFailed) {
                // Check if we should retry
                if (retry && notification.deliveryDetails.attempts < 3) {
                    notification.status = update_notification_dto_1.NotificationStatus.RETRY_PENDING;
                    await this.notificationRepository.save(notification);
                    // Schedule retry with exponential backoff
                    const retryDelay = Math.pow(2, notification.deliveryDetails.attempts) * 1000;
                    setTimeout(() => {
                        this.deliveryService.retryNotification(notification);
                    }, retryDelay);
                }
                else {
                    notification.status = update_notification_dto_1.NotificationStatus.FAILED;
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
            notification.status = update_notification_dto_1.NotificationStatus.FAILED;
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
    (0, event_emitter_1.OnEvent)('notification.delivered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleNotificationDelivered", null);
__decorate([
    (0, event_emitter_1.OnEvent)('notification.failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleNotificationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)('notification.delivery_timeout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_entity_1.Notification]),
    __metadata("design:returntype", Promise)
], NotificationDeliveryListener.prototype, "handleDeliveryTimeout", null);
NotificationDeliveryListener = NotificationDeliveryListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notification_delivery_service_1.NotificationDeliveryService])
], NotificationDeliveryListener);
exports.NotificationDeliveryListener = NotificationDeliveryListener;
//# sourceMappingURL=notification-delivery.listener.js.map