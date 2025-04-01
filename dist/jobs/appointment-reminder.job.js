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
var AppointmentReminderJob_1;
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { EmailService } from '../modules/notifications/services/email.service';
import { SmsService } from '../modules/sms/services/sms.service';
import { WhatsappService } from '../modules/whatsapp/services/whatsapp.services';
import { NotificationsService } from '../modules/notifications/services/notifications.service';
import { Appointment } from '../modules/appointments/entities/appointment.entity';
import { Contact } from '../modules/contacts/entities/contact.entity';
import { Organization } from '../modules/organizations/entities/organization.entity';
import { AppointmentStatus } from '../modules/appointments/enums/appointment-status.enum';
let AppointmentReminderJob = AppointmentReminderJob_1 = class AppointmentReminderJob {
    constructor(appointmentRepository, contactRepository, organizationRepository, emailService, smsService, whatsappService, notificationService) {
        this.appointmentRepository = appointmentRepository;
        this.contactRepository = contactRepository;
        this.organizationRepository = organizationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.whatsappService = whatsappService;
        this.notificationService = notificationService;
        this.logger = new Logger(AppointmentReminderJob_1.name);
    }
    async handleAppointmentReminders() {
        try {
            this.logger.log('Starting appointment reminder job');
            const appointments = await this.getUpcomingAppointments();
            const reminderGroups = this.groupAppointmentsByReminderType(appointments);
            await Promise.all([
                this.processEmailReminders(reminderGroups.email),
                this.processSmsReminders(reminderGroups.sms),
                this.processWhatsappReminders(reminderGroups.whatsapp),
            ]);
            this.logger.log(`Processed ${appointments.length} appointment reminders`);
        }
        catch (error) {
            this.logger.error('Error processing appointment reminders:', error);
            await this.notificationService.notifyError('Appointment Reminder Job', error);
        }
    }
    async getUpcomingAppointments() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const whereClause = {
            startTime: LessThanOrEqual(tomorrow),
            status: AppointmentStatus.CONFIRMED,
            reminderSent: false,
        };
        return this.appointmentRepository.find({
            where: whereClause,
            relations: ['contact', 'doctor', 'organization'],
            order: {
                startTime: 'ASC',
            },
        });
    }
    groupAppointmentsByReminderType(appointments) {
        return appointments.reduce((acc, appointment) => {
            if (!appointment.contact) {
                this.logger.warn(`Appointment ${appointment.id} has no contact information`);
                return acc;
            }
            if (appointment.contact.allowEmail && appointment.contact.email) {
                acc.email.push(appointment);
            }
            if (appointment.contact.allowSMS && appointment.contact.phone) {
                acc.sms.push(appointment);
            }
            if (appointment.contact.allowWhatsApp && appointment.contact.whatsapp) {
                acc.whatsapp.push(appointment);
            }
            return acc;
        }, { email: [], sms: [], whatsapp: [] });
    }
    async processEmailReminders(appointments) {
        for (const appointment of appointments) {
            try {
                if (!appointment.contact || !appointment.doctor || !appointment.organization) {
                    this.logger.warn(`Skipping email reminder for appointment ${appointment.id}: missing required relation`);
                    continue;
                }
                await this.emailService.sendAppointmentReminder(appointment.contact.email || '', {
                    appointmentId: appointment.id,
                    patientName: `${appointment.contact.firstName || ''} ${appointment.contact.lastName || ''}`.trim(),
                    doctorName: `Dr. ${appointment.doctor.firstName || ''} ${appointment.doctor.lastName || ''}`.trim(),
                    dateTime: appointment.startTime,
                    location: appointment.location || 'N/A',
                    notes: appointment.notes || '',
                    organizationName: appointment.organization.name || 'N/A',
                });
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Error sending email reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async processSmsReminders(appointments) {
        for (const appointment of appointments) {
            try {
                if (!appointment.contact || !appointment.organization) {
                    this.logger.warn(`Skipping SMS reminder for appointment ${appointment.id}: missing required relation`);
                    continue;
                }
                await this.smsService.sendAppointmentReminder({
                    id: appointment.id,
                    contact: {
                        phone: appointment.contact.phone || '',
                        firstName: appointment.contact.firstName || '',
                        lastName: appointment.contact.lastName || ''
                    },
                    dateTime: appointment.startTime,
                    organization: {
                        name: appointment.organization.name || 'N/A'
                    }
                });
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Error sending SMS reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async processWhatsappReminders(appointments) {
        for (const appointment of appointments) {
            try {
                if (!appointment.contact || !appointment.doctor || !appointment.organization) {
                    this.logger.warn(`Skipping WhatsApp reminder for appointment ${appointment.id}: missing required relation`);
                    continue;
                }
                await this.whatsappService.sendAppointmentReminder(appointment.contact.whatsapp || '', {
                    appointmentId: appointment.id,
                    patientName: `${appointment.contact.firstName || ''} ${appointment.contact.lastName || ''}`.trim(),
                    doctorName: `Dr. ${appointment.doctor.firstName || ''} ${appointment.doctor.lastName || ''}`.trim(),
                    dateTime: appointment.startTime,
                    location: appointment.location || 'N/A',
                    organizationName: appointment.organization.name || 'N/A',
                });
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Error sending WhatsApp reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async markReminderSent(appointmentId) {
        await this.appointmentRepository.update(appointmentId, {
            reminderSent: true,
            reminderSentAt: new Date(),
        });
    }
    async cleanupOldReminders() {
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const whereClause = {
                startTime: LessThanOrEqual(thirtyDaysAgo),
                reminderSent: true,
            };
            await this.appointmentRepository.update(whereClause, {
                reminderSent: false,
                reminderSentAt: undefined,
            });
        }
        catch (error) {
            this.logger.error('Error cleaning up old reminders:', error);
        }
    }
};
__decorate([
    Cron(CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentReminderJob.prototype, "handleAppointmentReminders", null);
__decorate([
    Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentReminderJob.prototype, "cleanupOldReminders", null);
AppointmentReminderJob = AppointmentReminderJob_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Appointment)),
    __param(1, InjectRepository(Contact)),
    __param(2, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        EmailService,
        SmsService,
        WhatsappService,
        NotificationsService])
], AppointmentReminderJob);
export { AppointmentReminderJob };
//# sourceMappingURL=appointment-reminder.job.js.map