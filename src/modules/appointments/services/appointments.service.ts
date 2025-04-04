// src/modules/appointments/services/appointments.service.ts

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { EmailService } from '../../email/services/email.service';
import { DoctorScheduleService } from './doctor-schedule.service';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
        private configService: ConfigService,
        private notificationsService: NotificationsService,
        private emailService: EmailService,
        private doctorScheduleService: DoctorScheduleService,
        private eventEmitter: EventEmitter2,
    ) {}
    

    async create(createAppointmentDto: CreateAppointmentDto & { organizationId: string; createdBy: string }): Promise<Appointment> {
        // Validate doctor and patient
        const [doctor, patient, creator] = await Promise.all([
            this.userRepository.findOne({ where: { id: createAppointmentDto.doctorId } }),
            this.contactRepository.findOne({ where: { id: createAppointmentDto.patientId } }),
            this.userRepository.findOne({ where: { id: createAppointmentDto.createdBy } }),
        ]);

        if (!doctor) throw new NotFoundException('Doctor not found');
        if (!patient) throw new NotFoundException('Patient not found');
        if (!creator) throw new NotFoundException('Creator not found');

        // Check doctor availability
        const isAvailable = await this.doctorScheduleService.checkAvailability({
            doctorId: doctor.id,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
        });

        if (!isAvailable) {
            throw new ConflictException('Doctor is not available at the selected time');
        }

        // Check for conflicting appointments
        await this.checkConflicts({
            doctorId: doctor.id,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
        });

        // Create appointment
        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            startTime: new Date(createAppointmentDto.startTime),
            endTime: new Date(createAppointmentDto.endTime),
            doctor: Promise.resolve(doctor),
            createdBy: Promise.resolve(creator),
        });

        const savedAppointment = await this.appointmentRepository.save(appointment);

        // Handle recurring appointments if specified
        if ('isRecurring' in createAppointmentDto && 
            createAppointmentDto.isRecurring && 
            'recurrencePattern' in createAppointmentDto && 
            createAppointmentDto.recurrencePattern) {
            await this.createRecurringAppointments(
                savedAppointment, 
                (createAppointmentDto as any).recurrencePattern
            );
        }

        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'created');

        // Emit event
        this.eventEmitter.emit('appointment.created', savedAppointment);

        return savedAppointment;
    }

    async findAll(query: {
        organizationId: string;
        startDate?: Date;
        endDate?: Date;
        doctorId?: string;
        patientId?: string;
        status?: AppointmentStatus[];
        page?: number;
        limit?: number;
    }) {
        const {
            organizationId,
            startDate,
            endDate,
            doctorId,
            patientId,
            status,
            page = 1,
            limit = 10,
        } = query;

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

    async findOne(id: string, organizationId: string): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne({
            where: { id, organizationId },
            relations: ['doctor', 'patient', 'creator', 'updater'],
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        return appointment;
    }

    async update(
        id: string,
        updateAppointmentDto: UpdateAppointmentDto & { organizationId: string; updatedBy: string },
    ): Promise<Appointment> {
        const appointment = await this.findOne(id, updateAppointmentDto.organizationId);

        if (!appointment.canBeModified()) {
            throw new ForbiddenException('Appointment cannot be modified');
        }

        // Check for time conflicts if time is being updated
        if (updateAppointmentDto.startTime || updateAppointmentDto.endTime) {
            await this.checkConflicts({
                doctorId: updateAppointmentDto.doctorId || appointment.doctorId,
                startTime: new Date(updateAppointmentDto.startTime || appointment.startTime),
                endTime: new Date(updateAppointmentDto.endTime || appointment.endTime),
                excludeAppointmentId: id,
            });
        }

        // Get the updater user
        const updater = await this.userRepository.findOne({ where: { id: updateAppointmentDto.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }

        // Update appointment
        Object.assign(appointment, updateAppointmentDto);
        
        // Set the updatedBy relationship
        appointment.updatedBy = Promise.resolve(updater);
        
        const savedAppointment = await this.appointmentRepository.save(appointment);

        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'updated');

        // Emit event
        this.eventEmitter.emit('appointment.updated', savedAppointment);

        return savedAppointment;
    }

    async cancel(
        id: string,
        data: { reason: string; organizationId: string; updatedBy: string },
    ): Promise<Appointment> {
        const appointment = await this.findOne(id, data.organizationId);
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }
    
        appointment.status = AppointmentStatus.CANCELLED;
        appointment.cancellationReason = data.reason;
        appointment.cancelledAt = new Date();
        appointment.updatedBy = Promise.resolve(updater); // Use Promise.resolve for Promise<any> properties
    
        const savedAppointment = await this.appointmentRepository.save(appointment);
    
        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'cancelled');
    
        return savedAppointment;
    }
    
    async reschedule(
        id: string,
        data: {
            startTime: Date;
            endTime: Date;
            reason: string;
            organizationId: string;
            updatedBy: string;
        },
    ): Promise<Appointment> {
        const appointment = await this.findOne(id, data.organizationId);
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }

        // Check for conflicts
        await this.checkConflicts({
            doctorId: appointment.doctorId,
            startTime: data.startTime,
            endTime: data.endTime,
            excludeAppointmentId: appointment.id,
        });

        appointment.startTime = data.startTime;
        appointment.endTime = data.endTime;
        appointment.rescheduleReason = data.reason;
        appointment.updatedBy = Promise.resolve(updater); // Use Promise.resolve for Promise<any> properties

        const savedAppointment = await this.appointmentRepository.save(appointment);

        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'rescheduled');

        return savedAppointment;
    }
    
    async confirm(
        id: string,
        data: { organizationId: string; updatedBy: string },
    ): Promise<Appointment> {
        const appointment = await this.findOne(id, data.organizationId);
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }

        appointment.status = AppointmentStatus.CONFIRMED;
        appointment.confirmedAt = new Date();
        appointment.updatedBy = Promise.resolve(updater); // Use Promise.resolve for Promise<any> properties

        const savedAppointment = await this.appointmentRepository.save(appointment);

        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'confirmed');

        return savedAppointment;
    }
    
    async complete(
        id: string,
        data: { organizationId: string; updatedBy: string },
    ): Promise<Appointment> {
        const appointment = await this.findOne(id, data.organizationId);
        const updater = await this.userRepository.findOne({ where: { id: data.updatedBy } });
        if (!updater) {
            throw new NotFoundException('User not found');
        }

        appointment.status = AppointmentStatus.COMPLETED;
        appointment.completedAt = new Date();
        appointment.updatedBy = Promise.resolve(updater); // Use Promise.resolve for Promise<any> properties

        const savedAppointment = await this.appointmentRepository.save(appointment);

        // Send notifications
        await this.sendAppointmentNotifications(savedAppointment, 'completed');

        return savedAppointment;
    }
   

    async remove(id: string, organizationId: string): Promise<void> {
        const appointment = await this.findOne(id, organizationId);
        await this.appointmentRepository.remove(appointment);
    }

    async getCalendarEvents(query: {
        organizationId: string;
        start: Date;
        end: Date;
        doctorId?: string;
    }) {
        // Get appointments within the date range
        const whereClause: any = {
            organizationId: query.organizationId,
            startTime: MoreThanOrEqual(query.start),
            endTime: LessThanOrEqual(query.end),
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
        const calendarEvents = await Promise.all(appointments.map(async appointment => {
            const doctor = appointment.doctor ? await appointment.doctor : null;
            const patient = appointment.patient;
            
            const patientData = await patient;
            const title = `Appointment with ${patientData?.fullName || 'Patient'}`;
            
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

    async findAvailableSlots(query: {
        doctorId: string;
        date: Date;
        organizationId: string;
    }) {
        // Get doctor's schedule for that day
        const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(
            query.doctorId,
            query.date,
            query.organizationId,
        );

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
                startTime: Between(startOfDay, endOfDay),
                status: In([
                    AppointmentStatus.PENDING,
                    AppointmentStatus.CONFIRMED,
                    AppointmentStatus.RESCHEDULED,
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
        workStart.setHours(
            schedule.workStart.getHours(), 
            schedule.workStart.getMinutes(), 
            0, 0
        );
        
        const workEnd = new Date(query.date);
        workEnd.setHours(
            schedule.workEnd.getHours(), 
            schedule.workEnd.getMinutes(), 
            0, 0
        );
        
        // Create slots
        let currentSlot = new Date(workStart);
        
        while (currentSlot < workEnd) {
            const slotEnd = new Date(currentSlot);
            slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
            
            // Check if this slot overlaps with any booked appointment
            const isBooked = bookedSlots.some(bookedSlot => 
                currentSlot < bookedSlot.end && slotEnd > bookedSlot.start
            );
            
            // Add the slot to the result
            slots.push({
                start: currentSlot.toTimeString().substring(0, 5), // Format as "HH:MM"
                end: slotEnd.toTimeString().substring(0, 5),
                available: !isBooked
            });
            
            // Move to next slot
            currentSlot = new Date(slotEnd);
        }
        
        return slots;
    }

    async getStatistics(query: {
        organizationId: string;
        startDate: Date;
        endDate: Date;
        doctorId?: string;
    }) {
        // Implementation for getting appointment statistics
        // This would return metrics like total appointments, completion rate, etc.
    }

    private async checkConflicts(data: {
        doctorId: string;
        startTime: Date;
        endTime: Date;
        excludeAppointmentId?: string;
    }) {
        const queryBuilder = this.appointmentRepository
            .createQueryBuilder('appointment')
            .where('appointment.doctorId = :doctorId', { doctorId: data.doctorId })
            .andWhere('appointment.status NOT IN (:...excludeStatuses)', {
                excludeStatuses: [AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED],
            })
            .andWhere(
                '(appointment.startTime, appointment.endTime) OVERLAPS (:startTime, :endTime)',
                {
                    startTime: data.startTime,
                    endTime: data.endTime,
                },
            );

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

    private async createRecurringAppointments(
        parentAppointment: Appointment,
        recurrencePattern: any,
    ) {
        // Implementation for creating recurring appointments
        // This would create future appointments based on the recurrence pattern
    }

    private async sendAppointmentNotifications(appointment: Appointment, action: string) {
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
}