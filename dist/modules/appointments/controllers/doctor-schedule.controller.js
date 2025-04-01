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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, BadRequestException, NotFoundException, ParseUUIDPipe, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { DoctorScheduleService } from '../services/doctor-schedule.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { CreateExceptionDto } from '../dto/create-exception.dto';
let DoctorScheduleController = class DoctorScheduleController {
    constructor(doctorScheduleService) {
        this.doctorScheduleService = doctorScheduleService;
    }
    async create(createScheduleDto, req) {
        if (!req.user || !req.organization) {
            throw new BadRequestException('Authentication data missing');
        }
        return this.doctorScheduleService.createOrUpdateSchedule(Object.assign(Object.assign({}, createScheduleDto), { organizationId: req.organization.id, createdById: req.user.id, workStart: new Date(createScheduleDto.workStart), workEnd: new Date(createScheduleDto.workEnd) }));
    }
    async getDoctorSchedules(doctorId, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        return this.doctorScheduleService.getDoctorSchedules(doctorId, req.organization.id);
    }
    async getScheduleForDate(doctorId, dateString, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid date format');
        }
        const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(doctorId, date, req.organization.id);
        if (!schedule) {
            throw new NotFoundException('No schedule found for the specified date');
        }
        return schedule;
    }
    async update(id, updateScheduleDto, req) {
        if (!req.user || !req.organization) {
            throw new BadRequestException('Authentication data missing');
        }
        const schedule = await this.getScheduleById(id, req.organization.id);
        return this.doctorScheduleService.createOrUpdateSchedule(Object.assign(Object.assign(Object.assign({}, schedule), updateScheduleDto), { workStart: updateScheduleDto.workStart ? new Date(updateScheduleDto.workStart) : undefined, workEnd: updateScheduleDto.workEnd ? new Date(updateScheduleDto.workEnd) : undefined, updatedById: req.user ? req.user.id : undefined }));
    }
    async remove(id, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        const schedule = await this.getScheduleById(id, req.organization.id);
        await this.doctorScheduleService.createOrUpdateSchedule(Object.assign(Object.assign({}, schedule), { isActive: false, updatedById: req.user ? req.user.id : undefined }));
    }
    async getScheduleById(id, organizationId) {
        try {
            const doctorSchedules = await this.doctorScheduleService.getDoctorSchedules('any', organizationId);
            const schedule = doctorSchedules.find((s) => s.id === id);
            if (!schedule) {
                throw new NotFoundException('Schedule not found');
            }
            return schedule;
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to get schedule');
        }
    }
    async createException(createExceptionDto, req) {
        if (!req.user || !req.organization) {
            throw new BadRequestException('Authentication data missing');
        }
        return this.doctorScheduleService.createException(Object.assign(Object.assign({}, createExceptionDto), { organizationId: req.organization.id, createdBy: req.user.id, startDate: new Date(createExceptionDto.startDate), endDate: new Date(createExceptionDto.endDate), startTime: createExceptionDto.startTime ? new Date(createExceptionDto.startTime) : undefined, endTime: createExceptionDto.endTime ? new Date(createExceptionDto.endTime) : undefined }));
    }
    async getDoctorExceptions(doctorId, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        return this.doctorScheduleService.getDoctorExceptions(doctorId, req.organization.id);
    }
    async removeException(id, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        await this.doctorScheduleService.deleteException(id, req.organization.id);
    }
    async checkAvailability(doctorId, startTimeString, endTimeString, req) {
        if (!req.organization) {
            throw new BadRequestException('Organization information missing');
        }
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            throw new BadRequestException('Invalid date format');
        }
        const isAvailable = await this.doctorScheduleService.checkAvailability({
            doctorId,
            startTime,
            endTime,
        });
        return { available: isAvailable };
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN, Role.DOCTOR),
    ApiOperation({ summary: 'Create a new doctor schedule' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Schedule created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "create", null);
__decorate([
    Get('doctor/:doctorId'),
    ApiOperation({ summary: 'Get all schedules for a doctor' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Returns all schedules for the specified doctor' }),
    __param(0, Param('doctorId', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getDoctorSchedules", null);
__decorate([
    Get('date'),
    ApiOperation({ summary: 'Get doctor schedule for a specific date' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Returns the schedule for the specified date' }),
    __param(0, Query('doctorId', ParseUUIDPipe)),
    __param(1, Query('date')),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getScheduleForDate", null);
__decorate([
    Put(':id'),
    Roles(Role.ADMIN, Role.DOCTOR),
    ApiOperation({ summary: 'Update a doctor schedule' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Schedule updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN, Role.DOCTOR),
    ApiOperation({ summary: 'Delete a doctor schedule' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Schedule deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "remove", null);
__decorate([
    Post('exceptions'),
    Roles(Role.ADMIN, Role.DOCTOR),
    ApiOperation({ summary: 'Create a new schedule exception (vacation, time off, etc.)' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Exception created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateExceptionDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "createException", null);
__decorate([
    Get('exceptions/doctor/:doctorId'),
    ApiOperation({ summary: 'Get all future exceptions for a doctor' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Returns all future exceptions for the specified doctor' }),
    __param(0, Param('doctorId', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getDoctorExceptions", null);
__decorate([
    Delete('exceptions/:id'),
    Roles(Role.ADMIN, Role.DOCTOR),
    ApiOperation({ summary: 'Delete a schedule exception' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Exception deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "removeException", null);
__decorate([
    Get('check-availability'),
    ApiOperation({ summary: 'Check if a doctor is available for a specific time slot' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Returns availability status' }),
    __param(0, Query('doctorId', ParseUUIDPipe)),
    __param(1, Query('startTime')),
    __param(2, Query('endTime')),
    __param(3, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "checkAvailability", null);
DoctorScheduleController = __decorate([
    ApiTags('Doctor Schedules'),
    Controller('doctor-schedules'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [DoctorScheduleService])
], DoctorScheduleController);
export { DoctorScheduleController };
//# sourceMappingURL=doctor-schedule.controller.js.map