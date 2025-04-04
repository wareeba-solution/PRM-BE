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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/services/appointments.service.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const appointment_entity_1 = require("../entities/appointment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const appointment_status_enum_1 = require("../enums/appointment-status.enum");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const email_service_1 = require("../../email/services/email.service");
const doctor_schedule_service_1 = require("../services/doctor-schedule.service");
const common_2 = require("@nestjs/common");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentRepository, userRepository, contactRepository, configService, notificationsService, emailService, doctorScheduleService, eventEmitter) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.configService = configService;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
        this.doctorScheduleService = doctorScheduleService;
        this.eventEmitter = eventEmitter;
    }
    async create(createAppointmentDto) {
        const doctor = await this.userRepository.findOne({ where: { id: createAppointmentDto.doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        const creator = await this.userRepository.findOne({ where: { id: createAppointmentDto.createdBy } });
        if (!creator) {
            throw new common_1.NotFoundException('Creator not found');
        }
        // Check for conflicting appointments
        await this.checkConflicts({
            doctorId: doctor.id,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
        });
        // Create appointment
        const appointment = this.appointmentRepository.create(Object.assign(Object.assign({}, createAppointmentDto), { startTime: new Date(createAppointmentDto.startTime), endTime: new Date(createAppointmentDto.endTime), doctor: Promise.resolve(doctor), createdBy: Promise.resolve(creator) }));
        const savedAppointment = await this.appointmentRepository.save(appointment);
        // Handle recurring appointments if specified
        if ('isRecurring' in createAppointmentDto &&
            createAppointmentDto.isRecurring &&
            'recurrencePattern' in createAppointmentDto &&
            createAppointmentDto.recurrencePattern) {
            await this.createRecurringAppointments(savedAppointment, createAppointmentDto.recurrencePattern);
        }
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'created');
        // Emit event
        this.eventEmitter.emit('appointment.created', savedAppointment);
        return savedAppointment;
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
            relations: ['doctor', 'patient', 'creator', 'updater'],
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
        appointment.status = appointment_status_enum_1.AppointmentStatus.CANCELLED;
        appointment.cancellationReason = data.reason;
        appointment.updatedBy = Promise.resolve(updater);
        return this.appointmentRepository.save(appointment);
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
        // Check for conflicts
        const doctor = await appointment.doctor;
        await this.checkConflicts({
            doctorId: doctor.id,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            excludeAppointmentId: appointment.id,
        });
        appointment.startTime = new Date(data.startTime);
        appointment.endTime = new Date(data.endTime);
        appointment.rescheduleReason = data.reason;
        appointment.updatedBy = Promise.resolve(updater);
        return this.appointmentRepository.save(appointment);
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
        appointment.status = appointment_status_enum_1.AppointmentStatus.CONFIRMED;
        appointment.updatedBy = Promise.resolve(updater);
        return this.appointmentRepository.save(appointment);
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
        appointment.status = appointment_status_enum_1.AppointmentStatus.COMPLETED;
        appointment.updatedBy = Promise.resolve(updater);
        return this.appointmentRepository.save(appointment);
    }
    async remove(id, organizationId) {
        const appointment = await this.findOne(id, organizationId);
        await this.appointmentRepository.remove(appointment);
    }
    async getCalendarEvents(query) {
        // Get appointments within the date range
        const whereClause = {
            organizationId: query.organizationId,
            startTime: (0, typeorm_2.MoreThanOrEqual)(query.start),
            endTime: (0, typeorm_2.LessThanOrEqual)(query.end),
        };
        // Add doctorId filter if provided
        if (query.doctorId) {
            whereClause.doctorId = query.doctorId;
        }
        const appointments = await this.appointmentRepository.find({
            where: whereClause,
            relations: ['doctor', 'patient'],
        });
        // Map appointments to calendar format
        const calendarEvents = await Promise.all(appointments.map(async (appointment) => {
            const doctor = appointment.doctor ? await appointment.doctor : null;
            const patient = appointment.patient;
            const patientData = await patient;
            const title = `Appointment with ${(patientData === null || patientData === void 0 ? void 0 : patientData.fullName) || 'Patient'}`;
            return {
                id: appointment.id,
                title: title,
                start: appointment.startTime,
                end: appointment.endTime,
                status: appointment.status,
                doctor: doctor ? {
                    id: doctor.id,
                    name: doctor.fullName || `${doctor.firstName} ${doctor.lastName}`,
                } : null,
                patient: {
                    id: patientData.id,
                    name: patientData.fullName || `${patientData.firstName} ${patientData.lastName}`,
                },
            };
        }));
        return calendarEvents;
    }
    async findAvailableSlots(query) {
        // Get doctor's schedule for that day
        const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(query.doctorId, query.date, query.organizationId);
        if (!schedule) {
            return []; // No schedule found for that day
        }
        // Set start and end of day for querying appointments
        const startOfDay = new Date(query.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(query.date);
        endOfDay.setHours(23, 59, 59, 999);
        // Get booked appointments for that day
        const bookedAppointments = await this.appointmentRepository.find({
            where: {
                doctorId: query.doctorId,
                organizationId: query.organizationId,
                startTime: (0, typeorm_2.Between)(startOfDay, endOfDay),
                status: (0, typeorm_2.In)([
                    appointment_status_enum_1.AppointmentStatus.PENDING,
                    appointment_status_enum_1.AppointmentStatus.CONFIRMED,
                    appointment_status_enum_1.AppointmentStatus.RESCHEDULED,
                ]),
            },
        });
        // Convert booked appointments to time slots
        const bookedSlots = bookedAppointments.map(appointment => ({
            start: appointment.startTime,
            end: appointment.endTime,
        }));
        // Calculate available slots based on the doctor's schedule and booked appointments
        // This is a simplified version - you might want to implement a more sophisticated algorithm
        const slotDuration = 30; // minutes
        const slots = [];
        // Get start and end times from schedule
        const workStart = new Date(query.date);
        workStart.setHours(schedule.workStart.getHours(), schedule.workStart.getMinutes(), 0, 0);
        const workEnd = new Date(query.date);
        workEnd.setHours(schedule.workEnd.getHours(), schedule.workEnd.getMinutes(), 0, 0);
        // Create slots
        let currentSlot = new Date(workStart);
        while (currentSlot < workEnd) {
            const slotEnd = new Date(currentSlot);
            slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
            // Check if this slot overlaps with any booked appointment
            const isBooked = bookedSlots.some(bookedSlot => currentSlot < bookedSlot.end && slotEnd > bookedSlot.start);
            // Add the slot to the result
            slots.push({
                start: currentSlot.toTimeString().substring(0, 5),
                end: slotEnd.toTimeString().substring(0, 5),
                available: !isBooked
            });
            // Move to next slot
            currentSlot = new Date(slotEnd);
        }
        return slots;
    }
    async checkConflicts(data) {
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.doctorId = :doctorId', { doctorId: data.doctorId })
            .andWhere('appointment.status NOT IN (:...excludeStatuses)', {
            excludeStatuses: [appointment_status_enum_1.AppointmentStatus.CANCELLED, appointment_status_enum_1.AppointmentStatus.COMPLETED],
        })
            .andWhere('(appointment.startTime, appointment.endTime) OVERLAPS (:startTime, :endTime)', {
            startTime: data.startTime,
            endTime: data.endTime,
        });
        if (data.excludeAppointmentId) {
            queryBuilder.andWhere('appointment.id != :excludeId', {
                excludeId: data.excludeAppointmentId,
            });
        }
        const conflictingAppointment = await queryBuilder.getOne();
        if (conflictingAppointment) {
            throw new common_1.ConflictException('Time slot conflicts with another appointment');
        }
    }
    async createRecurringAppointments(parentAppointment, recurrencePattern) {
        // Implementation for creating recurring appointments
        // This would create future appointments based on the recurrence pattern
    }
    async sendAppointmentNotifications(appointment, action) {
        const doctor = await appointment.doctor;
        const notificationData = {
            type: 'appointment',
            title: `Appointment ${action}`,
            content: `Appointment has been ${action}`,
            recipients: [{ userId: doctor.id }],
            organizationId: appointment.organizationId,
            senderId: appointment.id,
            priority: 'normal',
            metadata: {
                appointmentId: appointment.id,
                doctor: {
                    id: doctor.id,
                    name: `${doctor.firstName} ${doctor.lastName}`.trim(),
                },
            },
        };
        await this.notificationsService.create(notificationData);
    }
    async getStatistics(query) {
        // Implementation for getting appointment statistics
        // This would return metrics like total appointments, completion rate, etc.
    }
};
__decorate([
    (0, common_2.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "create", null);
__decorate([
    (0, common_2.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "update", null);
__decorate([
    (0, common_2.Post)(':id/cancel'),
    openapi.ApiResponse({ status: 201, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "cancel", null);
__decorate([
    (0, common_2.Post)(':id/reschedule'),
    openapi.ApiResponse({ status: 201, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "reschedule", null);
__decorate([
    (0, common_2.Post)(':id/confirm'),
    openapi.ApiResponse({ status: 201, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "confirm", null);
__decorate([
    (0, common_2.Post)(':id/complete'),
    openapi.ApiResponse({ status: 201, type: require("../entities/appointment.entity").Appointment }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "complete", null);
AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService,
        doctor_schedule_service_1.DoctorScheduleService,
        event_emitter_1.EventEmitter2])
], AppointmentsService);
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.controller.js.map