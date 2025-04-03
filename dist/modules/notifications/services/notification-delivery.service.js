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
var NotificationDeliveryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeliveryService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../entities/notification.entity");
const update_notification_dto_1 = require("../dto/update-notification.dto");
const email_service_1 = require("../../../shared/services/email.service");
const sms_service_1 = require("../../../shared/services/sms.service");
const push_notification_service_1 = require("../../../shared/services/push-notification.service");
const webhook_service_1 = require("../../../shared/services/webhook.service");
let NotificationDeliveryService = NotificationDeliveryService_1 = class NotificationDeliveryService {
    constructor(notificationRepository, emailService, smsService, pushNotificationService, webhookService, eventEmitter) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushNotificationService = pushNotificationService;
        this.webhookService = webhookService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(NotificationDeliveryService_1.name);
        this.MAX_RETRY_ATTEMPTS = 3;
    }
    async processNotification(notification) {
        try {
            notification.status = update_notification_dto_1.NotificationStatus.PROCESSING;
            await this.notificationRepository.save(notification);
            // Process each delivery channel in parallel
            const deliveryPromises = notification.channels.map(channel => this.deliverToChannel(notification, channel));
            await Promise.all(deliveryPromises);
        }
        catch (error) {
            this.logger.error(`Failed to process notification ${notification.id}:`, error);
            notification.status = update_notification_dto_1.NotificationStatus.FAILED;
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
        // Reset failed channels for retry
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        sms_service_1.SmsService,
        push_notification_service_1.PushNotificationService,
        webhook_service_1.WebhookService,
        event_emitter_1.EventEmitter2])
], NotificationDeliveryService);
exports.NotificationDeliveryService = NotificationDeliveryService;
//# sourceMappingURL=notification-delivery.service.js.map