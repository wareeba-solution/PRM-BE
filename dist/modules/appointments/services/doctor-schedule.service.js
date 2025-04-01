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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual as TypeORMMoreThanOrEqual } from 'typeorm';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { ScheduleException } from '../entities/schedule-exception.entity';
function MoreThanOrEqual(date) {
    return TypeORMMoreThanOrEqual(date);
}
let DoctorScheduleService = class DoctorScheduleService {
    constructor(doctorScheduleRepository, scheduleExceptionRepository) {
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.scheduleExceptionRepository = scheduleExceptionRepository;
    }
    async checkAvailability(data) {
        const dayOfWeek = data.startTime.getDay();
        const schedule = await this.doctorScheduleRepository.findOne({
            where: {
                doctorId: data.doctorId,
                dayOfWeek,
                isActive: true
            }
        });
        if (!schedule) {
            return false;
        }
        const startHour = data.startTime.getHours();
        const startMinute = data.startTime.getMinutes();
        const endHour = data.endTime.getHours();
        const endMinute = data.endTime.getMinutes();
        const scheduleStartHour = schedule.workStart.getHours();
        const scheduleStartMinute = schedule.workStart.getMinutes();
        const scheduleEndHour = schedule.workEnd.getHours();
        const scheduleEndMinute = schedule.workEnd.getMinutes();
        const isWithinWorkingHours = (startHour > scheduleStartHour || (startHour === scheduleStartHour && startMinute >= scheduleStartMinute)) &&
            (endHour < scheduleEndHour || (endHour === scheduleEndHour && endMinute <= scheduleEndMinute));
        if (!isWithinWorkingHours) {
            return false;
        }
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
        for (const exception of exceptions) {
            const exceptionStart = exception.startTime || exception.startDate;
            const exceptionEnd = exception.endTime || exception.endDate;
            if (data.startTime < exceptionEnd && data.endTime > exceptionStart) {
                return false;
            }
        }
        return true;
    }
    async getDoctorScheduleForDate(doctorId, date, organizationId) {
        const dayOfWeek = date.getDay();
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
            return null;
        }
        return schedule;
    }
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
            Object.assign(schedule, scheduleData);
        }
        else {
            schedule = this.doctorScheduleRepository.create(scheduleData);
        }
        return this.doctorScheduleRepository.save(schedule);
    }
    async createException(exceptionData) {
        const exception = this.scheduleExceptionRepository.create(exceptionData);
        return this.scheduleExceptionRepository.save(exception);
    }
    async deleteException(id, organizationId) {
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
    }
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
    Injectable(),
    __param(0, InjectRepository(DoctorSchedule)),
    __param(1, InjectRepository(ScheduleException)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], DoctorScheduleService);
export { DoctorScheduleService };
export { MoreThanOrEqual };
//# sourceMappingURL=doctor-schedule.service.js.map