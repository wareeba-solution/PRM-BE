"use strict";
// src/modules/appointments/services/appointments.service.ts
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
var AppointmentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const appointment_entity_1 = require("../entities/appointment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const appointment_status_enum_1 = require("../enums/appointment-status.enum");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const email_service_1 = require("../../email/services/email.service");
const doctor_schedule_service_1 = require("./doctor-schedule.service");
let AppointmentsService = AppointmentsService_1 = class AppointmentsService {
    constructor(appointmentRepository, userRepository, contactRepository, configService, notificationsService, emailService, doctorScheduleService, eventEmitter, dataSource) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.configService = configService;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
        this.doctorScheduleService = doctorScheduleService;
        this.eventEmitter = eventEmitter;
        this.dataSource = dataSource;
        this.logger = new common_2.Logger(AppointmentsService_1.name);
    }
    async ensureDoctorSchedule(doctorId, organizationId) {
        try {
            // First check if the doctor_schedules table exists
            const tableExists = await this.dataSource.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'doctor_schedules'
                );
            `);
            if (!tableExists[0].exists) {
                await this.createDoctorSchedulesTable();
            }
            // Check if doctor has any schedules
            const schedules = await this.dataSource.query(`
                SELECT * FROM doctor_schedules 
                WHERE "doctorId" = $1 AND "organizationId" = $2
            `, [doctorId, organizationId]);
            if (schedules.length === 0) {
                // Create default schedules for weekdays (Monday-Friday)
                const defaultSchedules = [];
                for (let day = 1; day <= 5; day++) { // 1-5 = Monday-Friday
                    defaultSchedules.push({
                        organizationId,
                        doctorId,
                        dayOfWeek: day,
                        workStart: '09:00:00',
                        workEnd: '17:00:00',
                        slotDuration: 30,
                        breakBetweenSlots: 0,
                        isActive: true,
                        createdById: 'system'
                    });
                }
                // Insert the schedules
                for (const schedule of defaultSchedules) {
                    await this.dataSource.query(`
                        INSERT INTO doctor_schedules (
                            "organizationId", "doctorId", "dayOfWeek", "workStart", "workEnd", 
                            "slotDuration", "breakBetweenSlots", "isActive", "createdById", "createdAt", "updatedAt"
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
                    `, [
                        schedule.organizationId,
                        schedule.doctorId,
                        schedule.dayOfWeek,
                        schedule.workStart,
                        schedule.workEnd,
                        schedule.slotDuration,
                        schedule.breakBetweenSlots,
                        schedule.isActive,
                        schedule.createdById
                    ]);
                }
            }
        }
        catch (error) {
            this.logger.error(`Failed to ensure doctor schedule: ${error.message}`, error.stack);
            // Don't throw, let the caller handle it
        }
    }
    async createDoctorSchedulesTable() {
        await this.dataSource.query(`
            CREATE TABLE IF NOT EXISTS public.doctor_schedules (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "organizationId" UUID NOT NULL,
                "doctorId" UUID NOT NULL,
                "dayOfWeek" INTEGER NOT NULL, 
                "workStart" TIME NOT NULL,
                "workEnd" TIME NOT NULL,
                "breakStart" TIME,
                "breakEnd" TIME,
                "slotDuration" INTEGER NOT NULL DEFAULT 30,
                "breakBetweenSlots" INTEGER DEFAULT 0,
                "isActive" BOOLEAN DEFAULT true,
                "settings" JSONB,
                "createdById" UUID NOT NULL,
                "updatedById" UUID,
                "createdAt" TIMESTAMP DEFAULT NOW(),
                "updatedAt" TIMESTAMP DEFAULT NOW(),
                "deletedAt" TIMESTAMP
            );

            CREATE INDEX IF NOT EXISTS idx_doctor_schedules_doctor ON public.doctor_schedules("doctorId");
            CREATE INDEX IF NOT EXISTS idx_doctor_schedules_organization ON public.doctor_schedules("organizationId");
        `);
    }
    async create(createAppointmentDto) {
        try {
            const doctor = await this.userRepository.findOne({ where: { id: createAppointmentDto.doctorId } });
            if (!doctor) {
                throw new common_1.NotFoundException('Doctor not found');
            }
            const creator = await this.userRepository.findOne({ where: { id: createAppointmentDto.createdBy } });
            if (!creator) {
                throw new common_1.NotFoundException('Creator not found');
            }
            // Ensure doctor schedule exists
            await this.ensureDoctorSchedule(createAppointmentDto.doctorId, createAppointmentDto.organizationId);
            // Check for conflicting appointments
            await this.checkConflicts({
                doctorId: doctor.id,
                startTime: new Date(createAppointmentDto.startTime),
                endTime: new Date(createAppointmentDto.endTime),
            });
            // Create appointment with proper field names and data types
            const appointmentData = Object.assign(Object.assign({}, createAppointmentDto), { startTime: new Date(createAppointmentDto.startTime), endTime: new Date(createAppointmentDto.endTime), doctorId: doctor.id, createdById: creator.id });
            // Create and save the entity
            const appointment = this.appointmentRepository.create(appointmentData);
            const savedAppointment = await this.appointmentRepository.save(appointment);
            // Try to handle recurring appointments if specified
            try {
                if ('isRecurring' in createAppointmentDto &&
                    createAppointmentDto.isRecurring &&
                    'recurrencePattern' in createAppointmentDto &&
                    createAppointmentDto.recurrencePattern) {
                    await this.createRecurringAppointments(savedAppointment, createAppointmentDto.recurrencePattern);
                }
            }
            catch (error) {
                this.logger.warn(`Failed to create recurring appointments: ${error.message}`);
            }
            // Try to send notifications
            try {
                await this.sendAppointmentNotifications(savedAppointment, 'created');
                this.eventEmitter.emit('appointment.created', savedAppointment);
            }
            catch (error) {
                this.logger.warn(`Failed to send appointment notifications: ${error.message}`);
            }
            return savedAppointment;
        }
        catch (error) {
            this.logger.error(`Failed to create appointment: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(query) {
        const { organizationId, startDate, endDate, doctorId, patientId, status, page = 1, limit = 10, } = query;
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.organizationId = :organizationId', { organizationId });
        // Apply filters
        if (startDate && endDate) {
            queryBuilder.andWhere('appointment.startTime BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }
        if (doctorId) {
            queryBuilder.andWhere('appointment.doctorId = :doctorId', { doctorId });
        }
        if (patientId) {
            queryBuilder.andWhere('appointment.patientId = :patientId', { patientId });
        }
        if (status && status.length > 0) {
            queryBuilder.andWhere('appointment.status IN (:...status)', { status });
        }
        // Add relationships
        queryBuilder
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .leftJoinAndSelect('appointment.patient', 'patient')
            .leftJoinAndSelect('appointment.creator', 'creator');
        // Add pagination
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        // Add ordering
        queryBuilder.orderBy('appointment.startTime', 'ASC');
        const [appointments, total] = await queryBuilder.getManyAndCount();
        return {
            data: appointments,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, organizationId) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id, organizationId },
            relations: ['doctor', 'patient', 'creator'], // Removed 'updater' as it doesn't exist
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const appointment = await this.findOne(id, updateAppointmentDto.organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const updater = await this.userRepository.findOne({ where: { id: updateAppointmentDto.updatedBy } });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        // Update appointment
        Object.assign(appointment, Object.assign(Object.assign({}, updateAppointmentDto), { updatedBy: Promise.resolve(updater) }));
        return this.appointmentRepository.save(appointment);
    }
    async cancel(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        // Update appointment
        Object.assign(appointment, {
            status: appointment_status_enum_1.AppointmentStatus.CANCELLED,
            cancellationReason: data.reason,
            cancelledAt: new Date(),
            cancelledBy: Promise.resolve(updater),
            updatedBy: Promise.resolve(updater),
        });
        const savedAppointment = await this.appointmentRepository.save(appointment);
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'cancelled');
        // Emit event
        this.eventEmitter.emit('appointment.cancelled', savedAppointment);
        return savedAppointment;
    }
    async reschedule(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        // Check for conflicting appointments
        await this.checkConflicts({
            doctorId: appointment.doctorId,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            excludeAppointmentId: appointment.id,
        });
        // Update appointment
        Object.assign(appointment, {
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            rescheduleReason: data.reason,
            rescheduledAt: new Date(),
            rescheduledBy: Promise.resolve(updater),
            updatedBy: Promise.resolve(updater),
        });
        const savedAppointment = await this.appointmentRepository.save(appointment);
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'rescheduled');
        // Emit event
        this.eventEmitter.emit('appointment.rescheduled', savedAppointment);
        return savedAppointment;
    }
    async confirm(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        // Update appointment
        Object.assign(appointment, {
            status: appointment_status_enum_1.AppointmentStatus.CONFIRMED,
            confirmedAt: new Date(),
            confirmedBy: Promise.resolve(updater),
            updatedBy: Promise.resolve(updater),
        });
        const savedAppointment = await this.appointmentRepository.save(appointment);
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'confirmed');
        // Emit event
        this.eventEmitter.emit('appointment.confirmed', savedAppointment);
        return savedAppointment;
    }
    async complete(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new common_1.NotFoundException('Updater not found');
        }
        // Update appointment
        Object.assign(appointment, {
            status: appointment_status_enum_1.AppointmentStatus.COMPLETED,
            completedAt: new Date(),
            completedBy: Promise.resolve(updater),
            updatedBy: Promise.resolve(updater),
        });
        const savedAppointment = await this.appointmentRepository.save(appointment);
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'completed');
        // Emit event
        this.eventEmitter.emit('appointment.completed', savedAppointment);
        return savedAppointment;
    }
    async remove(id, organizationId) {
        const appointment = await this.findOne(id, organizationId);
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        await this.appointmentRepository.softDelete(id);
    }
    async getCalendarEvents(organizationId, startDate, endDate) {
        const appointments = await this.appointmentRepository.find({
            where: {
                organizationId,
                startTime: (0, typeorm_3.Between)(startDate, endDate),
            },
            relations: ['doctor', 'patient'],
        });
        const calendarEvents = [];
        for (const appointment of appointments) {
            const doctor = await appointment.doctor;
            const patient = await appointment.patient;
            calendarEvents.push({
                id: appointment.id,
                title: `${doctor.firstName} ${doctor.lastName} - ${patient.firstName} ${patient.lastName}`,
                start: appointment.startTime.toISOString(),
                end: appointment.endTime.toISOString(),
                status: appointment.status,
                type: appointment.type,
            });
        }
        return calendarEvents;
    }
    async findAvailableSlots(query) {
        const doctor = await this.userRepository.findOne({ where: { id: query.doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        // Get doctor's schedule for the day
        const schedules = await this.doctorScheduleService.getDoctorSchedules(query.doctorId, query.organizationId);
        const dayOfWeek = query.date.getDay();
        const schedule = schedules.find(s => s.dayOfWeek === dayOfWeek);
        if (!schedule) {
            return [];
        }
        // Get existing appointments for the day
        const existingAppointments = await this.appointmentRepository.find({
            where: {
                doctorId: query.doctorId,
                organizationId: query.organizationId,
                startTime: (0, typeorm_3.Between)(new Date(query.date.setHours(0, 0, 0, 0)), new Date(query.date.setHours(23, 59, 59, 999))),
                status: (0, typeorm_3.In)([
                    appointment_status_enum_1.AppointmentStatus.SCHEDULED,
                    appointment_status_enum_1.AppointmentStatus.CONFIRMED,
                ]),
            },
            order: {
                startTime: 'ASC',
            },
        });
        // Calculate available slots
        const slots = [];
        const slotDuration = schedule.slotDuration || 30; // minutes
        let currentTime = new Date(schedule.workStart);
        currentTime.setFullYear(query.date.getFullYear(), query.date.getMonth(), query.date.getDate());
        const endTime = new Date(schedule.workEnd);
        endTime.setFullYear(query.date.getFullYear(), query.date.getMonth(), query.date.getDate());
        while (currentTime < endTime) {
            const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
            // Check if slot overlaps with any existing appointment
            const isOverlapping = existingAppointments.some(appointment => {
                return ((currentTime >= appointment.startTime && currentTime < appointment.endTime) ||
                    (slotEnd > appointment.startTime && slotEnd <= appointment.endTime) ||
                    (currentTime <= appointment.startTime && slotEnd >= appointment.endTime));
            });
            if (!isOverlapping) {
                slots.push({
                    start: new Date(currentTime),
                    end: slotEnd,
                });
            }
            // Add break between slots if configured
            currentTime = new Date(slotEnd.getTime() + (schedule.breakBetweenSlots || 0) * 60000);
        }
        return slots;
    }
    async checkConflicts(data) {
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.doctorId = :doctorId', { doctorId: data.doctorId })
            .andWhere('appointment.status IN (:...statuses)', {
            statuses: [appointment_status_enum_1.AppointmentStatus.SCHEDULED, appointment_status_enum_1.AppointmentStatus.CONFIRMED],
        })
            .andWhere('(appointment.startTime, appointment.endTime) OVERLAPS (:startTime, :endTime)', {
            startTime: data.startTime,
            endTime: data.endTime,
        });
        if (data.excludeAppointmentId) {
            queryBuilder.andWhere('appointment.id != :excludeAppointmentId', {
                excludeAppointmentId: data.excludeAppointmentId,
            });
        }
        const conflictingAppointment = await queryBuilder.getOne();
        if (conflictingAppointment) {
            throw new common_1.ConflictException('The selected time slot conflicts with another appointment');
        }
    }
    async createRecurringAppointments(parentAppointment, recurrencePattern) {
        // TODO: Implement recurring appointments
    }
    async sendAppointmentNotifications(appointment, action) {
        // TODO: Implement appointment notifications
    }
    async getStatistics(query) {
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.organizationId = :organizationId', { organizationId: query.organizationId })
            .andWhere('appointment.startTime BETWEEN :startDate AND :endDate', {
            startDate: query.startDate,
            endDate: query.endDate,
        });
        if (query.doctorId) {
            queryBuilder.andWhere('appointment.doctorId = :doctorId', { doctorId: query.doctorId });
        }
        const appointments = await queryBuilder.getMany();
        return {
            total: appointments.length,
            completed: appointments.filter(a => a.status === appointment_status_enum_1.AppointmentStatus.COMPLETED).length,
            cancelled: appointments.filter(a => a.status === appointment_status_enum_1.AppointmentStatus.CANCELLED).length,
            noShow: appointments.filter(a => a.status === appointment_status_enum_1.AppointmentStatus.NO_SHOW).length,
            rescheduled: appointments.filter(a => !!a.rescheduledAt).length,
        };
    }
    async checkAvailability(doctorId, organizationId, date, startTime, endTime) {
        const schedules = await this.doctorScheduleService.getDoctorSchedules(doctorId, organizationId);
        // Check if there's a schedule for this day
        const dayOfWeek = date.getDay();
        const schedule = schedules.find(s => s.dayOfWeek === dayOfWeek);
        if (!schedule) {
            return false;
        }
        // Convert string times to Date objects for comparison
        const startDate = new Date(date);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        startDate.setHours(startHours, startMinutes, 0, 0);
        const endDate = new Date(date);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        endDate.setHours(endHours, endMinutes, 0, 0);
        // Check if the requested time is within the schedule's working hours
        const scheduleStart = new Date(schedule.workStart);
        scheduleStart.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        const scheduleEnd = new Date(schedule.workEnd);
        scheduleEnd.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        if (startDate < scheduleStart || endDate > scheduleEnd) {
            return false;
        }
        // Check if there are any conflicting appointments
        const conflictingAppointments = await this.appointmentRepository.find({
            where: {
                doctorId,
                organizationId,
                startTime: (0, typeorm_3.LessThanOrEqual)(endDate),
                endTime: (0, typeorm_3.MoreThanOrEqual)(startDate),
                status: (0, typeorm_3.Not)((0, typeorm_3.In)([appointment_status_enum_1.AppointmentStatus.CANCELLED, appointment_status_enum_1.AppointmentStatus.COMPLETED])),
            },
        });
        return conflictingAppointments.length === 0;
    }
    async getAvailableSlots(doctorId, organizationId, date) {
        const schedules = await this.doctorScheduleService.getDoctorSchedules(doctorId, organizationId);
        // Get the schedule for this day
        const dayOfWeek = date.getDay();
        const schedule = schedules.find(s => s.dayOfWeek === dayOfWeek);
        if (!schedule) {
            return [];
        }
        // Generate time slots
        const slots = [];
        let currentTime = new Date(schedule.workStart);
        currentTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        const endTime = new Date(schedule.workEnd);
        endTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        while (currentTime < endTime) {
            const slotStart = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + (schedule.slotDuration || 30));
            if (currentTime <= endTime) {
                slots.push({
                    startTime: slotStart.toTimeString().slice(0, 5),
                    endTime: currentTime.toTimeString().slice(0, 5),
                });
            }
            // Add break between slots if configured
            currentTime.setMinutes(currentTime.getMinutes() + (schedule.breakBetweenSlots || 0));
        }
        // Filter out slots that have appointments
        const availableSlots = [];
        for (const slot of slots) {
            const isAvailable = await this.checkAvailability(doctorId, organizationId, date, slot.startTime, slot.endTime);
            if (isAvailable) {
                availableSlots.push(slot);
            }
        }
        return availableSlots;
    }
};
AppointmentsService = AppointmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        config_1.ConfigService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService,
        doctor_schedule_service_1.DoctorScheduleService,
        event_emitter_1.EventEmitter2,
        typeorm_2.DataSource])
], AppointmentsService);
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.service.js.map