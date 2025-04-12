import { Repository, FindOperator } from 'typeorm';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { ScheduleException } from '../entities/schedule-exception.entity';
declare function MoreThanOrEqual(date: Date): FindOperator<Date>;
export declare class DoctorScheduleService {
    private doctorScheduleRepository;
    private scheduleExceptionRepository;
    constructor(doctorScheduleRepository: Repository<DoctorSchedule>, scheduleExceptionRepository: Repository<ScheduleException>);
    /**
     * Check if a doctor is available for a specific time slot
     */
    checkAvailability(data: {
        doctorId: string;
        startTime: Date;
        endTime: Date;
    }): Promise<boolean>;
    /**
     * Get doctor's schedule for a specific date
     */
    getDoctorScheduleForDate(doctorId: string, date: Date, organizationId: string): Promise<DoctorSchedule | null>;
    /**
     * Get all schedules for a doctor
     */
    getDoctorSchedules(doctorId: string, organizationId: string): Promise<DoctorSchedule[]>;
    /**
     * Create or update doctor's schedule
     */
    createOrUpdateSchedule(scheduleData: Partial<DoctorSchedule>): Promise<DoctorSchedule>;
    /**
     * Create a schedule exception (vacation, time off, etc.)
     */
    createException(exceptionData: Partial<ScheduleException>): Promise<ScheduleException>;
    /**
     * Delete a schedule exception
     */
    deleteException(id: string, organizationId: string): Promise<void>;
    /**
     * Get all future exceptions for a doctor
     */
    getDoctorExceptions(doctorId: string, organizationId: string): Promise<ScheduleException[]>;
}
export { MoreThanOrEqual };
