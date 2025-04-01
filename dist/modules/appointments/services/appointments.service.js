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
import { Injectable, NotFoundException, BadRequestException, ConflictException, ForbiddenException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { EmailService } from '../../email/services/email.service';
import { DoctorScheduleService } from './doctor-schedule.service';
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
        const [doctor, patient] = await Promise.all([
            this.userRepository.findOne({ where: { id: createAppointmentDto.doctorId } }),
            this.contactRepository.findOne({ where: { id: createAppointmentDto.patientId } }),
        ]);
        if (!doctor)
            throw new NotFoundException('Doctor not found');
        if (!patient)
            throw new NotFoundException('Patient not found');
        const isAvailable = await this.doctorScheduleService.checkAvailability({
            doctorId: doctor.id,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
        });
        if (!isAvailable) {
            throw new ConflictException('Doctor is not available at the selected time');
        }
        await this.checkConflicts({
            doctorId: doctor.id,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
        });
        const appointment = this.appointmentRepository.create(Object.assign(Object.assign({}, createAppointmentDto), { startTime: new Date(createAppointmentDto.startTime), endTime: new Date(createAppointmentDto.endTime) }));
        const savedAppointment = await this.appointmentRepository.save(appointment);
        if ('isRecurring' in createAppointmentDto &&
            createAppointmentDto.isRecurring &&
            'recurrencePattern' in createAppointmentDto &&
            createAppointmentDto.recurrencePattern) {
            await this.createRecurringAppointments(savedAppointment, createAppointmentDto.recurrencePattern);
        }
        await this.sendAppointmentNotifications(savedAppointment, 'created');
        this.eventEmitter.emit('appointment.created', savedAppointment);
        return savedAppointment;
    }
    async findAll(query) {
        const { organizationId, startDate, endDate, doctorId, patientId, status, page = 1, limit = 10, } = query;
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.organizationId = :organizationId', { organizationId });
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
        queryBuilder
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .leftJoinAndSelect('appointment.patient', 'patient')
            .leftJoinAndSelect('appointment.creator', 'creator');
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
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
            throw new NotFoundException('Appointment not found');
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const appointment = await this.findOne(id, updateAppointmentDto.organizationId);
        if (!appointment.canBeModified()) {
            throw new ForbiddenException('Appointment cannot be modified');
        }
        if (updateAppointmentDto.startTime || updateAppointmentDto.endTime) {
            await this.checkConflicts({
                doctorId: updateAppointmentDto.doctorId || appointment.doctorId,
                startTime: new Date(updateAppointmentDto.startTime || appointment.startTime),
                endTime: new Date(updateAppointmentDto.endTime || appointment.endTime),
                excludeAppointmentId: id,
            });
        }
        Object.assign(appointment, updateAppointmentDto);
        const savedAppointment = await this.appointmentRepository.save(appointment);
        await this.sendAppointmentNotifications(savedAppointment, 'updated');
        this.eventEmitter.emit('appointment.updated', savedAppointment);
        return savedAppointment;
    }
    async cancel(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment.canBeModified()) {
            throw new ForbiddenException('Appointment cannot be cancelled');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }
        appointment.status = AppointmentStatus.CANCELLED;
        appointment.cancellationReason = data.reason;
        appointment.cancelledAt = new Date();
        appointment.updatedBy = updater;
        const savedAppointment = await this.appointmentRepository.save(appointment);
        await this.sendAppointmentNotifications(savedAppointment, 'cancelled');
        this.eventEmitter.emit('appointment.cancelled', savedAppointment);
        return savedAppointment;
    }
    async reschedule(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (!appointment.canBeModified()) {
            throw new ForbiddenException('Appointment cannot be rescheduled');
        }
        await this.checkConflicts({
            doctorId: appointment.doctorId,
            startTime: data.startTime,
            endTime: data.endTime,
            excludeAppointmentId: id,
        });
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }
        appointment.startTime = data.startTime;
        appointment.endTime = data.endTime;
        appointment.status = AppointmentStatus.RESCHEDULED;
        appointment.reschedulingReason = data.reason;
        appointment.updatedBy = updater;
        const savedAppointment = await this.appointmentRepository.save(appointment);
        await this.sendAppointmentNotifications(savedAppointment, 'rescheduled');
        this.eventEmitter.emit('appointment.rescheduled', savedAppointment);
        return savedAppointment;
    }
    async confirm(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (appointment.status !== AppointmentStatus.PENDING) {
            throw new BadRequestException('Only pending appointments can be confirmed');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }
        appointment.status = AppointmentStatus.CONFIRMED;
        appointment.confirmedAt = new Date();
        appointment.updatedBy = updater;
        const savedAppointment = await this.appointmentRepository.save(appointment);
        await this.sendAppointmentNotifications(savedAppointment, 'confirmed');
        this.eventEmitter.emit('appointment.confirmed', savedAppointment);
        return savedAppointment;
    }
    async complete(id, data) {
        const appointment = await this.findOne(id, data.organizationId);
        if (appointment.status !== AppointmentStatus.CONFIRMED) {
            throw new BadRequestException('Only confirmed appointments can be completed');
        }
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }
        appointment.status = AppointmentStatus.COMPLETED;
        appointment.completedAt = new Date();
        appointment.updatedBy = updater;
        const savedAppointment = await this.appointmentRepository.save(appointment);
        await this.sendAppointmentNotifications(savedAppointment, 'completed');
        this.eventEmitter.emit('appointment.completed', savedAppointment);
        return savedAppointment;
    }
    async remove(id, organizationId) {
        const appointment = await this.findOne(id, organizationId);
        await this.appointmentRepository.remove(appointment);
    }
    async getCalendarEvents(query) {
        const whereClause = {
            organizationId: query.organizationId,
            startTime: MoreThanOrEqual(query.start),
            endTime: LessThanOrEqual(query.end),
        };
        if (query.doctorId) {
            whereClause.doctorId = query.doctorId;
        }
        const appointments = await this.appointmentRepository.find({
            where: whereClause,
            relations: ['doctor', 'patient'],
        });
        return appointments.map(appointment => {
            var _a;
            return ({
                id: appointment.id,
                title: `Appointment with ${((_a = appointment.patient) === null || _a === void 0 ? void 0 : _a.fullName) || 'Patient'}`,
                start: appointment.startTime,
                end: appointment.endTime,
                status: appointment.status,
                doctor: appointment.doctor ? {
                    id: appointment.doctor.id,
                    name: appointment.doctor.fullName || `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
                } : null,
                patient: appointment.patient ? {
                    id: appointment.patient.id,
                    name: appointment.patient.fullName || `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                } : null,
            });
        });
    }
    async findAvailableSlots(query) {
        const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(query.doctorId, query.date, query.organizationId);
        if (!schedule) {
            return [];
        }
        const startOfDay = new Date(query.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(query.date);
        endOfDay.setHours(23, 59, 59, 999);
        const bookedAppointments = await this.appointmentRepository.find({
            where: {
                doctorId: query.doctorId,
                organizationId: query.organizationId,
                startTime: Between(startOfDay, endOfDay),
                status: In([
                    AppointmentStatus.PENDING,
                    AppointmentStatus.CONFIRMED,
                    AppointmentStatus.RESCHEDULED,
                ]),
            },
        });
        const bookedSlots = bookedAppointments.map(appointment => ({
            start: appointment.startTime,
            end: appointment.endTime,
        }));
        const slotDuration = 30;
        const slots = [];
        const workStart = new Date(query.date);
        workStart.setHours(schedule.workStart.getHours(), schedule.workStart.getMinutes(), 0, 0);
        const workEnd = new Date(query.date);
        workEnd.setHours(schedule.workEnd.getHours(), schedule.workEnd.getMinutes(), 0, 0);
        let currentSlot = new Date(workStart);
        while (currentSlot < workEnd) {
            const slotEnd = new Date(currentSlot);
            slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
            const isBooked = bookedSlots.some(bookedSlot => currentSlot < bookedSlot.end && slotEnd > bookedSlot.start);
            slots.push({
                start: currentSlot.toTimeString().substring(0, 5),
                end: slotEnd.toTimeString().substring(0, 5),
                available: !isBooked
            });
            currentSlot = new Date(slotEnd);
        }
        return slots;
    }
    async getStatistics(query) {
    }
    async checkConflicts(data) {
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.doctorId = :doctorId', { doctorId: data.doctorId })
            .andWhere('appointment.status NOT IN (:...excludeStatuses)', {
            excludeStatuses: [AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED],
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
            throw new ConflictException('Time slot conflicts with another appointment');
        }
    }
    async createRecurringAppointments(parentAppointment, recurrencePattern) {
    }
    async sendAppointmentNotifications(appointment, action) {
    }
};
AppointmentsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Appointment)),
    __param(1, InjectRepository(User)),
    __param(2, InjectRepository(Contact)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        ConfigService,
        NotificationsService,
        EmailService,
        DoctorScheduleService,
        EventEmitter2])
], AppointmentsService);
export { AppointmentsService };
//# sourceMappingURL=appointments.service.js.map