import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual as TypeORMMoreThanOrEqual, LessThanOrEqual, FindOperator, DataSource } from 'typeorm';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { ScheduleException } from '../entities/schedule-exception.entity';

// Helper function for TypeORM date comparison
function MoreThanOrEqual(date: Date): FindOperator<Date> {
  return TypeORMMoreThanOrEqual(date);
}

@Injectable()
export class DoctorScheduleService {
  private readonly logger = new Logger(DoctorScheduleService.name);

  constructor(
      @InjectRepository(DoctorSchedule)
      private doctorScheduleRepository: Repository<DoctorSchedule>,
      @InjectRepository(ScheduleException)
      private scheduleExceptionRepository: Repository<ScheduleException>,
      private dataSource: DataSource
  ) {}

  // Method to directly create schedule via SQL, bypassing TypeORM entity mapping
  async createScheduleDirectly(data: any): Promise<DoctorSchedule> {
    try {
      this.logger.debug(`Creating schedule directly with data: ${JSON.stringify(data)}`);

      // Use direct query to insert
      const result = await this.dataSource.query(
          `INSERT INTO public.doctor_schedules(
            "doctorId", "organizationId", "dayOfWeek", "workStart", "workEnd",
            "breakStart", "breakEnd", "slotDuration", "isActive",
            "createdById", "metadata", "createdAt", "updatedAt"
          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
             RETURNING *`,
          [
            data.doctorId,
            data.organizationId,
            data.dayOfWeek,
            data.workStart,
            data.workEnd,
            data.breakStart || null,
            data.breakEnd || null,
            data.slotDuration,
            data.isActive,
            data.createdById,
            data.metadata ? JSON.stringify(data.metadata) : null
          ]
      );

      if (result && result.length > 0) {
        // Create and return a DoctorSchedule entity from the result
        return result[0] as DoctorSchedule;
      }

      throw new Error('Failed to insert schedule');
    } catch (error) {
      this.logger.error(`Database error while creating schedule: ${error.message}`, error.stack);
      throw error;
    }
  }


  /**
   * Check if a doctor is available for a specific time slot
   */
  async checkAvailability(data: {
    doctorId: string;
    startTime: Date;
    endTime: Date;
  }): Promise<boolean> {
    try {
      // Get the day of week (0 = Sunday, 1 = Monday, etc.)
      const dayOfWeek = data.startTime.getDay();

      // Find the doctor's schedule for this day of the week
      const schedule = await this.doctorScheduleRepository.findOne({
        where: {
          doctorId: data.doctorId,
          dayOfWeek,
          isActive: true
        }
      });

      // If no schedule found for this day, doctor is not available
      if (!schedule) {
        return false;
      }

      // Check if the appointment time is within the doctor's working hours
      try {
        const startHour = data.startTime.getHours();
        const startMinute = data.startTime.getMinutes();
        const endHour = data.endTime.getHours();
        const endMinute = data.endTime.getMinutes();

        const scheduleStartHour = schedule.workStart.getHours();
        const scheduleStartMinute = schedule.workStart.getMinutes();
        const scheduleEndHour = schedule.workEnd.getHours();
        const scheduleEndMinute = schedule.workEnd.getMinutes();

        // Check if appointment is within working hours
        const isWithinWorkingHours =
            (startHour > scheduleStartHour || (startHour === scheduleStartHour && startMinute >= scheduleStartMinute)) &&
            (endHour < scheduleEndHour || (endHour === scheduleEndHour && endMinute <= scheduleEndMinute));

        if (!isWithinWorkingHours) {
          return false;
        }
      } catch (e) {
        this.logger.warn(`Error comparing time values: ${e.message}`);
        return false;
      }

      // Check for schedule exceptions (vacation, time off, etc.)
      const startDate = new Date(data.startTime);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(data.endTime);
      endDate.setHours(23, 59, 59, 999);

      const exceptions = await this.scheduleExceptionRepository.find({
        where: {
          doctorId: data.doctorId,
          startDate: Between(startDate, endDate)
        }
      });

      // If any exceptions are found, check if they overlap with the appointment time
      for (const exception of exceptions) {
        const exceptionStart = exception.startTime || exception.startDate;
        const exceptionEnd = exception.endTime || exception.endDate;

        // Check for overlap
        if (data.startTime < exceptionEnd && data.endTime > exceptionStart) {
          return false;
        }
      }

      // If we get here, the doctor is available for the requested time slot
      return true;
    } catch (error) {
      this.logger.error(`Error checking availability: ${error.message}`, error.stack);
      return false;
    }
  }

  /**
   * Get doctor's schedule for a specific date
   */
  async getDoctorScheduleForDate(
      doctorId: string,
      date: Date,
      organizationId: string
  ): Promise<DoctorSchedule | null> {
    try {
      // Get the day of week (0 = Sunday, 1 = Monday, etc.)
      const dayOfWeek = date.getDay();

      // Find the doctor's schedule for this day of the week
      const schedule = await this.doctorScheduleRepository.findOne({
        where: {
          doctorId,
          organizationId,
          dayOfWeek,
          isActive: true
        }
      });

      if (!schedule) {
        return null;
      }

      // Check if there are any exceptions for this date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const exception = await this.scheduleExceptionRepository.findOne({
        where: {
          doctorId,
          organizationId,
          startDate: Between(startOfDay, endOfDay)
        }
      });

      if (exception && exception.isFullDay) {
        // Doctor is not available for the entire day
        return null;
      }

      // Return the schedule, possibly modified by the exception
      return schedule;
    } catch (error) {
      this.logger.error(`Error getting schedule for date: ${error.message}`, error.stack);
      return null;
    }
  }

  /**
   * Get all schedules for a doctor
   */
  async getDoctorSchedules(doctorId: string, organizationId: string): Promise<DoctorSchedule[]> {
    try {
      return await this.doctorScheduleRepository.find({
        where: {
          doctorId,
          organizationId,
          isActive: true
        },
        order: {
          dayOfWeek: 'ASC'
        }
      });
    } catch (error) {
      this.logger.error(`Error getting doctor schedules: ${error.message}`, error.stack);
      return [];
    }
  }

  /**
   * Create or update doctor's schedule
   */
  async createOrUpdateSchedule(scheduleData: Partial<DoctorSchedule>): Promise<DoctorSchedule> {
    try {
      const { doctorId, dayOfWeek, organizationId } = scheduleData;

      let schedule = await this.doctorScheduleRepository.findOne({
        where: {
          doctorId,
          dayOfWeek,
          organizationId
        }
      });

      if (schedule) {
        // Update existing schedule
        Object.assign(schedule, scheduleData);
      } else {
        // Create new schedule
        schedule = this.doctorScheduleRepository.create(scheduleData);
      }

      return await this.doctorScheduleRepository.save(schedule);
    } catch (error) {
      this.logger.error(`Error creating/updating schedule: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Create a schedule exception (vacation, time off, etc.)
   */
  async createException(exceptionData: any): Promise<ScheduleException> {
    try {
      const exception = this.scheduleExceptionRepository.create(exceptionData);
      const savedException = await this.scheduleExceptionRepository.save(exception);

      // Handle the case where save might return an array
      if (Array.isArray(savedException)) {
        return savedException[0];
      }

      return savedException;
    } catch (error) {
      this.logger.error(`Error creating exception: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Delete a schedule exception
   */
  async deleteException(id: string, organizationId: string): Promise<void> {
    try {
      const exception = await this.scheduleExceptionRepository.findOne({
        where: {
          id,
          organizationId
        }
      });

      if (!exception) {
        throw new NotFoundException('Schedule exception not found');
      }

      await this.scheduleExceptionRepository.remove(exception);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error deleting exception: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get all future exceptions for a doctor
   */
  async getDoctorExceptions(doctorId: string, organizationId: string): Promise<ScheduleException[]> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await this.scheduleExceptionRepository.find({
        where: {
          doctorId,
          organizationId,
          endDate: MoreThanOrEqual(today)
        },
        order: {
          startDate: 'ASC'
        }
      });
    } catch (error) {
      this.logger.error(`Error getting doctor exceptions: ${error.message}`, error.stack);
      return [];
    }
  }
}

// Export the helper function
export { MoreThanOrEqual };