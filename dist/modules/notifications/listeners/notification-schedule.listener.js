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
var NotificationScheduleListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationScheduleListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../entities/notification.entity");
const notification_scheduler_service_1 = require("../services/notification-scheduler.service");
const update_notification_dto_1 = require("../dto/update-notification.dto");
let NotificationScheduleListener = NotificationScheduleListener_1 = class NotificationScheduleListener {
    constructor(notificationRepository, schedulerService) {
        this.notificationRepository = notificationRepository;
        this.schedulerService = schedulerService;
        this.logger = new common_1.Logger(NotificationScheduleListener_1.name);
    }
    async handleNotificationSchedule(payload) {
        try {
            const { notification, scheduledFor } = payload;
            this.logger.debug(`Scheduling notification ${notification.id} for ${scheduledFor}`);
            await this.schedulerService.scheduleNotification(notification, scheduledFor);
        }
        catch (error) {
            this.logger.error(`Error scheduling notification ${payload.notification.id}:`, error);
            throw error;
        }
    }
    async handleNotificationReschedule(payload) {
        try {
            const { notificationId, newScheduledFor } = payload;
            this.logger.debug(`Rescheduling notification ${notificationId} for ${newScheduledFor}`);
            await this.schedulerService.rescheduleNotification(notificationId, newScheduledFor);
        }
        catch (error) {
            this.logger.error(`Error rescheduling notification ${payload.notificationId}:`, error);
            throw error;
        }
    }
    async handleNotificationCancelSchedule(notificationId) {
        try {
            this.logger.debug(`Canceling scheduled notification ${notificationId}`);
            await this.schedulerService.cancelScheduledNotification(notificationId);
        }
        catch (error) {
            this.logger.error(`Error canceling scheduled notification ${notificationId}:`, error);
            throw error;
        }
    }
    async handleScheduleExpired(notification) {
        try {
            this.logger.debug(`Schedule expired for notification ${notification.id}`);
            notification.status = update_notification_dto_1.NotificationStatus.EXPIRED;
            notification.metadata = Object.assign(Object.assign({}, notification.metadata), { expirationReason: 'schedule_expired', expiredAt: new Date() });
            await this.notificationRepository.save(notification);
        }
        catch (error) {
            this.logger.error(`Error handling expired schedule for notification ${notification.id}:`, error);
            throw error;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('notification.schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationSchedule", null);
__decorate([
    (0, event_emitter_1.OnEvent)('notification.reschedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationReschedule", null);
__decorate([
    (0, event_emitter_1.OnEvent)('notification.cancel_schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationCancelSchedule", null);
__decorate([
    (0, event_emitter_1.OnEvent)('notification.schedule_expired'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_entity_1.Notification]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleScheduleExpired", null);
NotificationScheduleListener = NotificationScheduleListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notification_scheduler_service_1.NotificationSchedulerService])
], NotificationScheduleListener);
exports.NotificationScheduleListener = NotificationScheduleListener;
//# sourceMappingURL=notification-schedule.listener.js.map