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
var NotificationsService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationChannel } from '../entities/notification.entity';
import { NotificationTemplate } from '../entities/notification-template.entity';
import { NotificationPreference } from '../entities/notification-preference.entity';
import { EmailService } from '../../../shared/services/email.service';
import { SmsService } from '../../../shared/services/sms.service';
import { WhatsappService } from '../../whatsapp/services/whatsapp.services';
import { NotificationStatus } from '../dto/update-notification.dto';
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(notificationRepository, templateRepository, preferenceRepository, emailService, smsService, whatsappService) {
        this.notificationRepository = notificationRepository;
        this.templateRepository = templateRepository;
        this.preferenceRepository = preferenceRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.whatsappService = whatsappService;
        this.logger = new Logger(NotificationsService_1.name);
    }
    async notifyMessageFailure(message) {
    }
    async getNotificationChannels(organizationId, userId) {
        return [];
    }
    async getUserPreferences(organizationId, userId) {
        return {};
    }
    async getNotificationById(id, organizationId, userId) {
        return null;
    }
    async updateNotification(id, updateNotificationDto) {
        const notification = await this.notificationRepository.findOne({ where: { id } });
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        Object.assign(notification, updateNotificationDto);
        return this.notificationRepository.save(notification);
    }
    async notifyMessageDelivery(message) {
        console.log(`Message delivered: ${message.id}`);
    }
    async create(notificationData) {
        console.log('Notification created:', notificationData);
    }
    async send(dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            const preferences = await this.preferenceRepository.findOne({
                where: {
                    userId: dto.userId,
                    category: dto.type,
                },
            });
            if (!preferences) {
                this.logger.warn(`No notification preferences found for user ${dto.userId}`);
                return;
            }
            const template = await this.templateRepository.findOne({
                where: { type: dto.type },
            });
            const content = template
                ? this.compileTemplate(template.content, Object.assign(Object.assign({}, dto.data), { title: dto.title, message: dto.message }))
                : dto.message;
            const notification = await this.notificationRepository.save({
                userId: dto.userId,
                type: dto.type,
                content,
                title: dto.title,
                metadata: Object.assign(Object.assign({}, dto.data), { organizationId: dto.organizationId, priority: dto.priority }),
                status: String(NotificationStatus.PENDING),
                organizationId: dto.organizationId || '',
                senderId: dto.userId,
                channels: preferences.enabledChannels,
            });
            const notificationPromises = [];
            if (preferences.enabledChannels.includes(NotificationChannel.EMAIL) &&
                ((_c = (_b = (_a = preferences.channelSpecificSettings) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.addresses) === null || _c === void 0 ? void 0 : _c.length)) {
                const email = preferences.channelSpecificSettings.email.addresses[0];
                notificationPromises.push(this.sendEmailNotification(email, {
                    appointmentId: ((_d = dto.data) === null || _d === void 0 ? void 0 : _d.userId) || 'N/A',
                    patientName: 'User',
                    doctorName: 'N/A',
                    dateTime: new Date(),
                    location: 'N/A',
                    notes: `${dto.title}: ${dto.message}`,
                    organizationName: dto.organizationId || 'System',
                }));
            }
            if (preferences.enabledChannels.includes(NotificationChannel.SMS) &&
                ((_g = (_f = (_e = preferences.channelSpecificSettings) === null || _e === void 0 ? void 0 : _e.sms) === null || _f === void 0 ? void 0 : _f.phoneNumbers) === null || _g === void 0 ? void 0 : _g.length)) {
                const phone = preferences.channelSpecificSettings.sms.phoneNumbers[0];
                notificationPromises.push(this.sendSmsNotification(phone, {
                    appointmentId: ((_h = dto.data) === null || _h === void 0 ? void 0 : _h.userId) || 'N/A',
                    patientName: 'User',
                    dateTime: new Date(),
                    organizationName: dto.organizationId || 'System',
                }));
            }
            if (preferences.enabledChannels.includes(NotificationChannel.WHATSAPP) &&
                ((_l = (_k = (_j = preferences.channelSpecificSettings) === null || _j === void 0 ? void 0 : _j.whatsapp) === null || _k === void 0 ? void 0 : _k.numbers) === null || _l === void 0 ? void 0 : _l.length)) {
                const whatsappNumber = preferences.channelSpecificSettings.whatsapp.numbers[0];
                notificationPromises.push(this.whatsappService.sendAppointmentReminder(whatsappNumber, {
                    appointmentId: ((_m = dto.data) === null || _m === void 0 ? void 0 : _m.userId) || 'N/A',
                    patientName: 'User',
                    doctorName: 'N/A',
                    dateTime: new Date(),
                    location: 'N/A',
                    organizationName: dto.organizationId || 'System',
                }));
            }
            await Promise.all(notificationPromises);
            await this.notificationRepository
                .createQueryBuilder()
                .update(Notification)
                .set({ status: String(NotificationStatus.SENT) })
                .where('id = :id', { id: notification.id })
                .execute();
            this.logger.log(`Successfully sent notification ${notification.id} to user ${dto.userId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send notification to user ${dto.userId}:`, error);
            throw error;
        }
    }
    async notifyError(source, error) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        try {
            const notification = await this.notificationRepository.save({
                type: 'ERROR',
                source,
                content: error.message,
                title: 'System Error',
                metadata: {
                    stack: error.stack,
                    timestamp: new Date().toISOString(),
                },
                status: String(NotificationStatus.PENDING),
                organizationId: '',
                senderId: 'system',
                channels: [NotificationChannel.EMAIL],
            });
            const adminPreferences = await this.preferenceRepository.find({
                where: { category: 'ERROR' },
            });
            for (const pref of adminPreferences) {
                try {
                    const notificationPromises = [];
                    if (pref.enabledChannels.includes(NotificationChannel.EMAIL) &&
                        ((_c = (_b = (_a = pref.channelSpecificSettings) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.addresses) === null || _c === void 0 ? void 0 : _c.length)) {
                        const email = pref.channelSpecificSettings.email.addresses[0];
                        notificationPromises.push(this.sendEmailNotification(email, {
                            appointmentId: 'N/A',
                            patientName: 'N/A',
                            doctorName: 'N/A',
                            dateTime: new Date(),
                            location: 'N/A',
                            notes: `Error in ${source}: ${error.message}`,
                            organizationName: 'System',
                        }));
                    }
                    if (pref.enabledChannels.includes(NotificationChannel.SMS) &&
                        ((_f = (_e = (_d = pref.channelSpecificSettings) === null || _d === void 0 ? void 0 : _d.sms) === null || _e === void 0 ? void 0 : _e.phoneNumbers) === null || _f === void 0 ? void 0 : _f.length)) {
                        const phone = pref.channelSpecificSettings.sms.phoneNumbers[0];
                        notificationPromises.push(this.sendSmsNotification(phone, {
                            appointmentId: 'N/A',
                            patientName: 'Admin',
                            dateTime: new Date(),
                            organizationName: `System Error: ${source}`,
                        }));
                    }
                    if (pref.enabledChannels.includes(NotificationChannel.WHATSAPP) &&
                        ((_j = (_h = (_g = pref.channelSpecificSettings) === null || _g === void 0 ? void 0 : _g.whatsapp) === null || _h === void 0 ? void 0 : _h.numbers) === null || _j === void 0 ? void 0 : _j.length)) {
                        const whatsappNumber = pref.channelSpecificSettings.whatsapp.numbers[0];
                        notificationPromises.push(this.whatsappService.sendAppointmentReminder(whatsappNumber, {
                            appointmentId: 'N/A',
                            patientName: 'Admin',
                            doctorName: 'N/A',
                            dateTime: new Date(),
                            location: 'N/A',
                            organizationName: `System Error: ${source}`,
                        }));
                    }
                    await Promise.all(notificationPromises);
                }
                catch (notifyError) {
                    this.logger.error(`Failed to notify admin ${pref.userId}:`, notifyError);
                }
            }
            await this.notificationRepository
                .createQueryBuilder()
                .update(Notification)
                .set({ status: String(NotificationStatus.SENT) })
                .where('id = :id', { id: notification.id })
                .execute();
        }
        catch (error) {
            this.logger.error('Failed to process error notification:', error);
            throw error;
        }
    }
    async sendNotification(userId, type, data) {
        try {
            const preferences = await this.preferenceRepository.findOne({
                where: {
                    userId,
                    category: type,
                },
            });
            if (!preferences) {
                this.logger.warn(`No notification preferences found for user ${userId}`);
                return;
            }
            const template = await this.templateRepository.findOne({
                where: { type },
            });
            if (!template) {
                throw new Error(`Template not found for notification type: ${type}`);
            }
            const notification = await this.notificationRepository.save({
                userId,
                type,
                content: this.compileTemplate(template.content, data),
                title: data.title || 'Notification',
                metadata: data,
                status: String(NotificationStatus.PENDING),
                organizationId: data.organizationId || '',
                senderId: userId,
                channels: preferences.enabledChannels,
            });
            const notificationPromises = [];
            if (preferences.enabledChannels.includes(NotificationChannel.EMAIL) &&
                data.email) {
                notificationPromises.push(this.sendEmailNotification(data.email, {
                    appointmentId: data.appointmentId || 'N/A',
                    patientName: data.patientName || 'N/A',
                    doctorName: data.doctorName || 'N/A',
                    dateTime: data.dateTime || new Date(),
                    location: data.location || 'N/A',
                    notes: data.notes,
                    organizationName: data.organizationName || 'System',
                }));
            }
            if (preferences.enabledChannels.includes(NotificationChannel.SMS) &&
                data.phone) {
                notificationPromises.push(this.sendSmsNotification(data.phone, {
                    appointmentId: data.appointmentId || 'N/A',
                    patientName: data.patientName || 'N/A',
                    dateTime: data.dateTime || new Date(),
                    organizationName: data.organizationName || 'System',
                }));
            }
            if (preferences.enabledChannels.includes(NotificationChannel.WHATSAPP) &&
                data.whatsapp) {
                notificationPromises.push(this.whatsappService.sendAppointmentReminder(data.whatsapp, {
                    appointmentId: data.appointmentId || 'N/A',
                    patientName: data.patientName || 'N/A',
                    doctorName: data.doctorName || 'N/A',
                    dateTime: data.dateTime || new Date(),
                    location: data.location || 'N/A',
                    organizationName: data.organizationName || 'System',
                }));
            }
            await Promise.all(notificationPromises);
            await this.notificationRepository
                .createQueryBuilder()
                .update(Notification)
                .set({ status: String(NotificationStatus.SENT) })
                .where('id = :id', { id: notification.id })
                .execute();
            this.logger.log(`Successfully sent notification ${notification.id} to user ${userId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send notification to user ${userId}:`, error);
            throw error;
        }
    }
    compileTemplate(template, data) {
        return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
            const value = key.split('.').reduce((obj, k) => obj === null || obj === void 0 ? void 0 : obj[k], data);
            return value || '';
        });
    }
    async markAsRead(notificationId, userId) {
        await this.notificationRepository
            .createQueryBuilder()
            .update(Notification)
            .set({
            readAt: new Date(),
            read: true
        })
            .where('id = :id AND userId = :userId', { id: notificationId, userId })
            .execute();
    }
    async markAllAsRead(userId) {
        await this.notificationRepository
            .createQueryBuilder()
            .update(Notification)
            .set({
            readAt: new Date(),
            read: true
        })
            .where('userId = :userId AND readAt IS NULL', { userId })
            .execute();
    }
    async getUnreadCount(userId) {
        return this.notificationRepository.count({
            where: {
                userId,
                readAt: null
            },
        });
    }
    async getUserNotifications(userId, options = {}) {
        const { skip = 0, take = 10, includeRead = false } = options;
        const queryBuilder = this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.userId = :userId', { userId });
        if (!includeRead) {
            queryBuilder.andWhere('notification.readAt IS NULL');
        }
        const [notifications, total] = await queryBuilder
            .orderBy('notification.createdAt', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
        return { notifications, total };
    }
    async sendEmailNotification(email, data) {
        var _a, _b;
        try {
            await ((_b = (_a = this.emailService).sendEmail) === null || _b === void 0 ? void 0 : _b.call(_a, {
                to: email,
                subject: `Appointment Reminder: ${data.organizationName}`,
                html: this.formatEmailContent(data)
            }));
            this.logger.log(`Sent email notification to ${email}`);
        }
        catch (error) {
            this.logger.error(`Error sending email to ${email}:`, error);
            this.logger.log(`Would send email to ${email} with content: ${JSON.stringify(data)}`);
        }
    }
    async sendSmsNotification(phone, data) {
        var _a, _b;
        try {
            await ((_b = (_a = this.smsService).sendSms) === null || _b === void 0 ? void 0 : _b.call(_a, phone, this.formatSmsContent(data)));
            this.logger.log(`Sent SMS notification to ${phone}`);
        }
        catch (error) {
            this.logger.error(`Error sending SMS to ${phone}:`, error);
            this.logger.log(`Would send SMS to ${phone} with content: ${JSON.stringify(data)}`);
        }
    }
    formatEmailContent(data) {
        return `
      <div>
        <h2>Appointment Reminder</h2>
        <p>Hello ${data.patientName},</p>
        <p>This is a reminder of your appointment with ${data.doctorName} on ${data.dateTime.toLocaleString()}</p>
        <p>Location: ${data.location}</p>
        ${data.notes ? `<p>Notes: ${data.notes}</p>` : ''}
        <p>Regards,<br>${data.organizationName}</p>
      </div>
    `;
    }
    formatSmsContent(data) {
        return `Hi ${data.patientName}, reminder of your appointment with ${data.organizationName} on ${data.dateTime.toLocaleString()}`;
    }
};
NotificationsService = NotificationsService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __param(1, InjectRepository(NotificationTemplate)),
    __param(2, InjectRepository(NotificationPreference)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        EmailService,
        SmsService,
        WhatsappService])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map