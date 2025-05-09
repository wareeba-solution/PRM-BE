"use strict";
// src/jobs/appointment-reminder.job.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentReminderJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
// Fixed import path - adjust based on actual location
const email_service_1 = require("../modules/notifications/services/email.service");
const sms_service_1 = require("../modules/sms/services/sms.service");
const whatsapp_services_1 = require("../modules/whatsapp/services/whatsapp.services");
const notifications_service_1 = require("../modules/notifications/services/notifications.service");
const appointment_entity_1 = require("../modules/appointments/entities/appointment.entity");
const contact_entity_1 = require("../modules/contacts/entities/contact.entity");
const organization_entity_1 = require("../modules/organizations/entities/organization.entity");
const appointment_status_enum_1 = require("../modules/appointments/enums/appointment-status.enum");
const email_template_entity_1 = require("../modules/email/entities/email-template.entity");
let AppointmentReminderJob = AppointmentReminderJob_1 = class AppointmentReminderJob {
    constructor(appointmentRepository, contactRepository, organizationRepository, emailService, smsService, whatsappService, notificationService) {
        this.appointmentRepository = appointmentRepository;
        this.contactRepository = contactRepository;
        this.organizationRepository = organizationRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.whatsappService = whatsappService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(AppointmentReminderJob_1.name);
    }
    async handleAppointmentReminders() {
        try {
            this.logger.log('Starting appointment reminder job');
            // Get upcoming appointments for the next 24 hours
            const appointments = await this.getUpcomingAppointments();
            // Group appointments by reminder type
            const reminderGroups = this.groupAppointmentsByReminderType(appointments);
            // Process each reminder group
            await Promise.all([
                this.processEmailReminders(reminderGroups.email),
                this.processSmsReminders(reminderGroups.sms),
                this.processWhatsappReminders(),
            ]);
            this.logger.log(`Processed ${appointments.length} appointment reminders`);
        }
        catch (error) {
            this.logger.error('Error processing appointment reminders:', error);
            // Notify admin or monitoring service
            await this.notificationService.notifyError('Appointment Reminder Job', error);
        }
    }
    async getUpcomingAppointments() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const whereClause = {
            startTime: (0, typeorm_2.LessThanOrEqual)(tomorrow),
            status: appointment_status_enum_1.AppointmentStatus.CONFIRMED,
            reminderSent: false,
        };
        const appointments = await this.appointmentRepository.find({
            where: whereClause,
            relations: ['contact', 'doctor', 'organization'],
            order: {
                startTime: 'ASC',
            },
        });
        return appointments;
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
        var _a, _b;
        for (const appointment of appointments) {
            if (!((_a = appointment.contact) === null || _a === void 0 ? void 0 : _a.email) || !((_b = appointment.contact) === null || _b === void 0 ? void 0 : _b.allowEmail))
                continue;
            try {
                // Get doctor and organization using IDs instead of relations
                // Get the doctor using doctorId
                const doctor = await this.appointmentRepository
                    .createQueryBuilder('appointment')
                    .leftJoinAndSelect('users', 'doctor', 'doctor.id = appointment.doctorId')
                    .where('appointment.id = :id', { id: appointment.id })
                    .select('doctor.*')
                    .getRawOne()
                    .then(result => result ? {
                    id: result.doctor_id,
                    firstName: result.doctor_firstName,
                    lastName: result.doctor_lastName
                } : null);
                const organization = await this.organizationRepository.findOne({
                    where: { id: appointment.organizationId }
                });
                const notificationData = {
                    appointmentId: appointment.id,
                    patientName: `${appointment.contact.firstName} ${appointment.contact.lastName}`,
                    doctorName: `Dr. ${doctor.firstName || ''} ${doctor.lastName || ''}`.trim(),
                    dateTime: appointment.startTime,
                    location: appointment.location || 'N/A',
                    notes: appointment.notes || '',
                    organizationName: organization.name || 'N/A',
                };
                await this.emailService.queueEmail({
                    recipient: appointment.contact.email,
                    subject: 'Appointment Reminder',
                    templateId: email_template_entity_1.EmailTemplateType.NOTIFICATION,
                    variables: notificationData,
                    organizationId: organization.id,
                });
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Failed to send email reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async processSmsReminders(appointments) {
        var _a, _b;
        for (const appointment of appointments) {
            if (!((_a = appointment.contact) === null || _a === void 0 ? void 0 : _a.phone) || !((_b = appointment.contact) === null || _b === void 0 ? void 0 : _b.allowSMS))
                continue;
            try {
                // Get doctor and organization using IDs instead of relations
                // Get the doctor using doctorId
                const doctor = await this.appointmentRepository
                    .createQueryBuilder('appointment')
                    .leftJoinAndSelect('users', 'doctor', 'doctor.id = appointment.doctorId')
                    .where('appointment.id = :id', { id: appointment.id })
                    .select('doctor.*')
                    .getRawOne()
                    .then(result => result ? {
                    id: result.doctor_id,
                    firstName: result.doctor_firstName,
                    lastName: result.doctor_lastName
                } : null);
                const organization = await this.organizationRepository.findOne({
                    where: { id: appointment.organizationId }
                });
                const smsData = {
                    id: appointment.id,
                    contact: {
                        phone: appointment.contact.phone,
                        firstName: appointment.contact.firstName,
                        lastName: appointment.contact.lastName,
                    },
                    dateTime: appointment.startTime,
                    organization: {
                        name: organization.name || 'N/A',
                    },
                };
                await this.smsService.sendAppointmentReminder(smsData);
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Failed to send SMS reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async processWhatsappReminders() {
        const appointments = await this.appointmentRepository.find({
            where: {
                startTime: (0, typeorm_2.Between)(new Date(Date.now() + 24 * 60 * 60 * 1000), new Date(Date.now() + 25 * 60 * 60 * 1000)),
                reminderSent: false,
                status: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
            },
            relations: ['doctor', 'organization'],
        });
        for (const appointment of appointments) {
            try {
                // Get doctor and organization using IDs instead of relations
                // Get the doctor using doctorId
                const doctor = await this.appointmentRepository
                    .createQueryBuilder('appointment')
                    .leftJoinAndSelect('users', 'doctor', 'doctor.id = appointment.doctorId')
                    .where('appointment.id = :id', { id: appointment.id })
                    .select('doctor.*')
                    .getRawOne()
                    .then(result => result ? {
                    id: result.doctor_id,
                    firstName: result.doctor_firstName,
                    lastName: result.doctor_lastName
                } : null);
                const organization = await this.organizationRepository.findOne({
                    where: { id: appointment.organizationId }
                });
                const notificationData = {
                    appointmentId: appointment.id,
                    appointmentDate: appointment.startTime,
                    appointmentTime: appointment.startTime,
                    doctorName: `${doctor.firstName} ${doctor.lastName}`,
                    organizationName: organization.name,
                };
                await this.notificationService.sendNotification(appointment.patientId, 'appointment_reminder', notificationData);
                await this.markReminderSent(appointment.id);
            }
            catch (error) {
                this.logger.error(`Failed to send WhatsApp reminder for appointment ${appointment.id}:`, error);
            }
        }
    }
    async markReminderSent(appointmentId) {
        await this.appointmentRepository.update(appointmentId, {
            reminderSent: true,
            reminderSentAt: new Date(),
        });
    }
    // Cleanup old reminder records
    async cleanupOldReminders() {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 7); // Keep 7 days of history
        await this.appointmentRepository.update({
            reminderSent: true,
            reminderSentAt: (0, typeorm_2.LessThanOrEqual)(cutoffDate),
        }, {
            reminderSent: false,
            reminderSentAt: null,
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentReminderJob.prototype, "handleAppointmentReminders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentReminderJob.prototype, "cleanupOldReminders", null);
AppointmentReminderJob = AppointmentReminderJob_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        sms_service_1.SmsService,
        whatsapp_services_1.WhatsappService,
        notifications_service_1.NotificationsService])
], AppointmentReminderJob);
exports.AppointmentReminderJob = AppointmentReminderJob;
//# sourceMappingURL=appointment-reminder.job.js.map