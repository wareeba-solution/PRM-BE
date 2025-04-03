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
exports.MoreThanOrEqual = exports.DoctorScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_schedule_entity_1 = require("../entities/doctor-schedule.entity");
const schedule_exception_entity_1 = require("../entities/schedule-exception.entity");
// Helper function for TypeORM date comparison
function MoreThanOrEqual(date) {
    return (0, typeorm_2.MoreThanOrEqual)(date);
}
exports.MoreThanOrEqual = MoreThanOrEqual;
let DoctorScheduleService = class DoctorScheduleService {
    constructor(doctorScheduleRepository, scheduleExceptionRepository) {
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.scheduleExceptionRepository = scheduleExceptionRepository;
    }
    /**
     * Check if a doctor is available for a specific time slot
     */
    async checkAvailability(data) {
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
        const startHour = data.startTime.getHours();
        const startMinute = data.startTime.getMinutes();
        const endHour = data.endTime.getHours();
        const endMinute = data.endTime.getMinutes();
        const scheduleStartHour = schedule.workStart.getHours();
        const scheduleStartMinute = schedule.workStart.getMinutes();
        const scheduleEndHour = schedule.workEnd.getHours();
        const scheduleEndMinute = schedule.workEnd.getMinutes();
        // Check if appointment is within working hours
        const isWithinWorkingHours = (startHour > scheduleStartHour || (startHour === scheduleStartHour && startMinute >= scheduleStartMinute)) &&
            (endHour < scheduleEndHour || (endHour === scheduleEndHour && endMinute <= scheduleEndMinute));
        if (!isWithinWorkingHours) {
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
                startDate: (0, typeorm_2.Between)(startDate, endDate)
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
    }
    /**
     * Get doctor's schedule for a specific date
     */
    async getDoctorScheduleForDate(doctorId, date, organizationId) {
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
                startDate: (0, typeorm_2.Between)(startOfDay, endOfDay)
            }
        });
        if (exception && exception.isFullDay) {
            // Doctor is not available for the entire day
            return null;
        }
        // Return the schedule, possibly modified by the exception
        return schedule;
    }
    /**
     * Get all schedules for a doctor
     */
    async getDoctorSchedules(doctorId, organizationId) {
        return this.doctorScheduleRepository.find({
            where: {
                doctorId,
                organizationId,
                isActive: true
            },
            order: {
                dayOfWeek: 'ASC'
            }
        });
    }
    /**
     * Create or update doctor's schedule
     */
    async createOrUpdateSchedule(scheduleData) {
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
        }
        else {
            // Create new schedule
            schedule = this.doctorScheduleRepository.create(scheduleData);
        }
        return this.doctorScheduleRepository.save(schedule);
    }
    /**
     * Create a schedule exception (vacation, time off, etc.)
     */
    async createException(exceptionData) {
        const exception = this.scheduleExceptionRepository.create(exceptionData);
        return this.scheduleExceptionRepository.save(exception);
    }
    /**
     * Delete a schedule exception
     */
    async deleteException(id, organizationId) {
        const exception = await this.scheduleExceptionRepository.findOne({
            where: {
                id,
                organizationId
            }
        });
        if (!exception) {
            throw new common_1.NotFoundException('Schedule exception not found');
        }
        await this.scheduleExceptionRepository.remove(exception);
    }
    /**
     * Get all future exceptions for a doctor
     */
    async getDoctorExceptions(doctorId, organizationId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.scheduleExceptionRepository.find({
            where: {
                doctorId,
                organizationId,
                endDate: MoreThanOrEqual(today)
            },
            order: {
                startDate: 'ASC'
            }
        });
    }
};
DoctorScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_schedule_entity_1.DoctorSchedule)),
    __param(1, (0, typeorm_1.InjectRepository)(schedule_exception_entity_1.ScheduleException)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DoctorScheduleService);
exports.DoctorScheduleService = DoctorScheduleService;
//# sourceMappingURL=doctor-schedule.service.js.map