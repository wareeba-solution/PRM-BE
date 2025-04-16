import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { CalendarEvent } from '../interfaces/calendar-event.interface';
import { DataSource } from 'typeorm';
export declare class AppointmentsController {
    private readonly appointmentsService;
    private readonly dataSource;
    private readonly logger;
    constructor(appointmentsService: AppointmentsService, dataSource: DataSource);
    create(req: any, createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(req: any, startDate?: string, endDate?: string, doctorId?: string, patientId?: string, status?: AppointmentStatus[], page?: number, limit?: number): Promise<{
        data: Appointment[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getCalendarEvents(req: any, start: string, end: string): Promise<CalendarEvent[]>;
    getAvailableSlots(req: any, doctorId: string, date: string): Promise<{
        startTime: string;
        endTime: string;
    }[]>;
    checkAvailability(req: any, doctorId: string, date: string, startTime: string, endTime: string): Promise<boolean>;
    getStatistics(req: any, startDate: string, endDate: string, doctorId?: string): Promise<{
        total: number;
        completed: number;
        cancelled: number;
        noShow: number;
        rescheduled: number;
    }>;
    findOne(req: any, id: string): Promise<Appointment>;
    update(req: any, id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    cancel(req: any, id: string, reason: string): Promise<Appointment>;
    reschedule(req: any, id: string, data: {
        startTime: Date;
        endTime: Date;
        reason: string;
    }): Promise<Appointment>;
    confirm(req: any, id: string): Promise<Appointment>;
    complete(req: any, id: string): Promise<Appointment>;
    remove(req: any, id: string): Promise<void>;
    private directCreateAppointment;
    private ensureAppointmentsTable;
}
