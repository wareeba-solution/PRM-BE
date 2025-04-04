// src/jobs/appointment-reminder.job.ts

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThan, In, FindOptionsWhere, Between } from 'typeorm';
// Fixed import path - adjust based on actual location
import { EmailService } from '../modules/notifications/services/email.service';
import { SmsService } from '../modules/sms/services/sms.service';
import { WhatsappService } from '../modules/whatsapp/services/whatsapp.services';
import { NotificationsService } from '../modules/notifications/services/notifications.service';
import { Appointment } from '../modules/appointments/entities/appointment.entity';
import { Contact } from '../modules/contacts/entities/contact.entity';
import { Organization } from '../modules/organizations/entities/organization.entity';
import { AppointmentStatus } from '../modules/appointments/enums/appointment-status.enum';
import { User } from '../modules/users/entities/user.entity';

interface AppointmentReminderData {
    appointmentId: string;
    patientName: string;
    doctorName: string;
    dateTime: Date;
    location: string;
    notes: string;
    organizationName: string;
}

// This interface adds typed relations to the Appointment entity
interface AppointmentWithRelations extends Appointment {
    organization: Promise<Organization>;
    patient: any;
    doctor: Promise<User>;
    contact: {
        email?: string;
        phone?: string;
        whatsapp?: string;
        firstName: string;
        lastName: string;
        allowEmail?: boolean;
        allowSMS?: boolean;
        allowWhatsApp?: boolean;
    };
}

// Fixed interface to correctly extend Contact
interface ContactWithPreferences {
  id: string; // Required fields from Contact
  firstName: string;
  lastName: string;
  // Optional fields
  allowEmail?: boolean;
  allowSMS?: boolean;
  allowWhatsApp?: boolean;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

@Injectable()
export class AppointmentReminderJob {
    private readonly logger = new Logger(AppointmentReminderJob.name);

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
        private emailService: EmailService,
        private smsService: SmsService,
        private whatsappService: WhatsappService,
        private notificationService: NotificationsService,
    ) {}

    @Cron(CronExpression.EVERY_10_MINUTES)
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
        } catch (error) {
            this.logger.error('Error processing appointment reminders:', error);
            // Notify admin or monitoring service
            await this.notificationService.notifyError('Appointment Reminder Job', error);
        }
    }

    private async getUpcomingAppointments(): Promise<AppointmentWithRelations[]> {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const whereClause = {
            startTime: LessThanOrEqual(tomorrow),
            status: AppointmentStatus.CONFIRMED,
            reminderSent: false,
        } as FindOptionsWhere<Appointment>;

        const appointments = await this.appointmentRepository.find({
            where: whereClause,
            relations: ['contact', 'doctor', 'organization'],
            order: {
                startTime: 'ASC',
            },
        });

        return appointments as AppointmentWithRelations[];
    }

    private groupAppointmentsByReminderType(appointments: AppointmentWithRelations[]) {
        return appointments.reduce(
            (acc, appointment) => {
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
            },
            { email: [], sms: [], whatsapp: [] } as Record<string, AppointmentWithRelations[]>,
        );
    }

    private async processEmailReminders(appointments: AppointmentWithRelations[]) {
        for (const appointment of appointments) {
            if (!appointment.contact?.email || !appointment.contact?.allowEmail) continue;

            try {
                const doctor = await appointment.doctor;
                const organization = await appointment.organization;
                const notificationData: AppointmentReminderData = {
                    appointmentId: appointment.id,
                    patientName: `${appointment.contact.firstName} ${appointment.contact.lastName}`,
                    doctorName: `Dr. ${doctor.firstName || ''} ${doctor.lastName || ''}`.trim(),
                    dateTime: appointment.startTime,
                    location: appointment.location || 'N/A',
                    notes: appointment.notes || '',
                    organizationName: organization.name || 'N/A',
                };

                await this.emailService.sendAppointmentReminder(appointment.contact.email, notificationData);
                await this.markReminderSent(appointment.id);
            } catch (error) {
                this.logger.error(`Failed to send email reminder for appointment ${appointment.id}:`, error);
            }
        }
    }

    private async processSmsReminders(appointments: AppointmentWithRelations[]) {
        for (const appointment of appointments) {
            if (!appointment.contact?.phone || !appointment.contact?.allowSMS) continue;

            try {
                const doctor = await appointment.doctor;
                const organization = await appointment.organization;
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
            } catch (error) {
                this.logger.error(`Failed to send SMS reminder for appointment ${appointment.id}:`, error);
            }
        }
    }

    private async processWhatsappReminders() {
        const appointments = await this.appointmentRepository.find({
            where: {
                startTime: Between(
                    new Date(Date.now() + 24 * 60 * 60 * 1000),
                    new Date(Date.now() + 25 * 60 * 60 * 1000)
                ),
                reminderSent: false,
                status: AppointmentStatus.SCHEDULED,
            },
            relations: ['doctor', 'organization'],
        });

        for (const appointment of appointments) {
            try {
                const doctor = await appointment.doctor;
                const organization = await appointment.organization;

                const notificationData = {
                    appointmentId: appointment.id,
                    appointmentDate: appointment.startTime,
                    appointmentTime: appointment.startTime,
                    doctorName: `${doctor.firstName} ${doctor.lastName}`,
                    organizationName: organization.name,
                };

                await this.notificationService.sendNotification(
                    appointment.patientId,
                    'appointment_reminder',
                    notificationData
                );

                await this.markReminderSent(appointment.id);
            } catch (error) {
                this.logger.error(`Failed to send WhatsApp reminder for appointment ${appointment.id}:`, error);
            }
        }
    }

    private async markReminderSent(appointmentId: string): Promise<void> {
        await this.appointmentRepository.update(
            { id: appointmentId },
            {
                reminderSent: true,
                reminderSentAt: new Date(),
            }
        );
    }

    // Cleanup old reminder records
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async cleanupOldReminders() {
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            // Using proper type casting to avoid type errors
            const whereClause = {
                startTime: LessThanOrEqual(thirtyDaysAgo),
                reminderSent: true,
            } as FindOptionsWhere<Appointment>;

            // Using update without raw SQL
            await this.appointmentRepository.update(
                whereClause,
                {
                    reminderSent: false,
                    reminderSentAt: undefined,
                },
            );
        } catch (error) {
            this.logger.error('Error cleaning up old reminders:', error);
        }
    }
}