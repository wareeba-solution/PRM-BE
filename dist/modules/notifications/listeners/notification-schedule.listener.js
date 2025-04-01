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
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationSchedulerService } from '../services/notification-scheduler.service';
import { NotificationStatus } from '../dto/update-notification.dto';
let NotificationScheduleListener = NotificationScheduleListener_1 = class NotificationScheduleListener {
    constructor(notificationRepository, schedulerService) {
        this.notificationRepository = notificationRepository;
        this.schedulerService = schedulerService;
        this.logger = new Logger(NotificationScheduleListener_1.name);
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
            notification.status = NotificationStatus.EXPIRED;
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
    OnEvent('notification.schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationSchedule", null);
__decorate([
    OnEvent('notification.reschedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationReschedule", null);
__decorate([
    OnEvent('notification.cancel_schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleNotificationCancelSchedule", null);
__decorate([
    OnEvent('notification.schedule_expired'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notification]),
    __metadata("design:returntype", Promise)
], NotificationScheduleListener.prototype, "handleScheduleExpired", null);
NotificationScheduleListener = NotificationScheduleListener_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __metadata("design:paramtypes", [Repository,
        NotificationSchedulerService])
], NotificationScheduleListener);
export { NotificationScheduleListener };
//# sourceMappingURL=notification-schedule.listener.js.map