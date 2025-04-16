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
var DoctorScheduleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorScheduleController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const doctor_schedule_service_1 = require("../services/doctor-schedule.service");
const create_schedule_dto_1 = require("../dto/create-schedule.dto");
const update_schedule_dto_1 = require("../dto/update-schedule.dto");
const create_exception_dto_1 = require("../dto/create-exception.dto");
let DoctorScheduleController = DoctorScheduleController_1 = class DoctorScheduleController {
    constructor(doctorScheduleService) {
        this.doctorScheduleService = doctorScheduleService;
        this.logger = new common_1.Logger(DoctorScheduleController_1.name);
    }
    async create(createScheduleDto, req) {
        var _a;
        this.logger.debug(`Request received with body: ${JSON.stringify(createScheduleDto)}`);
        if (!req.user || !req.organization) {
            this.logger.error('Authentication data missing from request');
            throw new common_1.BadRequestException('Authentication data missing');
        }
        try {
            // Use direct database insertion to bypass TypeORM's entity mapper
            return await this.doctorScheduleService.createScheduleDirectly({
                doctorId: createScheduleDto.doctorId,
                organizationId: req.organization.id,
                dayOfWeek: createScheduleDto.dayOfWeek,
                workStart: createScheduleDto.workStart,
                workEnd: createScheduleDto.workEnd,
                breakStart: createScheduleDto.breakStart,
                breakEnd: createScheduleDto.breakEnd,
                slotDuration: createScheduleDto.defaultAppointmentDuration,
                isActive: (_a = createScheduleDto.isActive) !== null && _a !== void 0 ? _a : true,
                createdById: req.user.id,
                metadata: createScheduleDto.settings
            });
        }
        catch (error) {
            this.logger.error(`Failed to create schedule: ${error.message}`);
            throw new common_1.BadRequestException(`Failed to create schedule: ${error.message}`);
        }
    }
    async getDoctorSchedules(doctorId, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        return this.doctorScheduleService.getDoctorSchedules(doctorId, req.organization.id);
    }
    async getScheduleForDate(doctorId, dateString, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(doctorId, date, req.organization.id);
        if (!schedule) {
            throw new common_1.NotFoundException('No schedule found for the specified date');
        }
        return schedule;
    }
    async update(id, updateScheduleDto, req) {
        if (!req.user || !req.organization) {
            throw new common_1.BadRequestException('Authentication data missing');
        }
        // Get existing schedule
        const schedule = await this.getScheduleById(id, req.organization.id);
        // Prepare update data
        const updateData = {
            updatedById: req.user.id
        };
        // Add fields that are present in the DTO
        if (updateScheduleDto.dayOfWeek !== undefined) {
            updateData.dayOfWeek = updateScheduleDto.dayOfWeek;
        }
        if (updateScheduleDto.workStart) {
            updateData.workStart = updateScheduleDto.workStart; // Pass time as string
        }
        if (updateScheduleDto.workEnd) {
            updateData.workEnd = updateScheduleDto.workEnd; // Pass time as string
        }
        if (updateScheduleDto.breakStart) {
            updateData.breakStart = updateScheduleDto.breakStart; // Pass time as string
        }
        if (updateScheduleDto.breakEnd) {
            updateData.breakEnd = updateScheduleDto.breakEnd; // Pass time as string
        }
        if (updateScheduleDto.defaultAppointmentDuration) {
            updateData.slotDuration = updateScheduleDto.defaultAppointmentDuration;
        }
        if (updateScheduleDto.isActive !== undefined) {
            updateData.isActive = updateScheduleDto.isActive;
        }
        if (updateScheduleDto.settings) {
            updateData.metadata = Object.assign({}, updateScheduleDto.settings);
        }
        // Merge existing schedule with updates
        return this.doctorScheduleService.createOrUpdateSchedule(Object.assign(Object.assign({}, schedule), updateData));
    }
    async remove(id, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        const schedule = await this.getScheduleById(id, req.organization.id);
        await this.doctorScheduleService.createOrUpdateSchedule(Object.assign(Object.assign({}, schedule), { isActive: false, updatedById: req.user.id }));
    }
    // Helper method to get a schedule by ID
    async getScheduleById(id, organizationId) {
        try {
            const doctorSchedules = await this.doctorScheduleService.getDoctorSchedules('any', // This is a workaround until a findById method is implemented
            organizationId);
            const schedule = doctorSchedules.find((s) => s.id === id);
            if (!schedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            return schedule;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to get schedule');
        }
    }
    async createException(createExceptionDto, req) {
        if (!req.user || !req.organization) {
            throw new common_1.BadRequestException('Authentication data missing');
        }
        // Create an explicitly typed object
        const exceptionData = {
            doctorId: createExceptionDto.doctorId,
            organizationId: req.organization.id,
            createdBy: req.user.id,
            startDate: new Date(createExceptionDto.startDate),
            endDate: new Date(createExceptionDto.endDate),
            isFullDay: createExceptionDto.isFullDay,
            type: createExceptionDto.type,
            reason: createExceptionDto.reason
        };
        // Add optional time fields if they exist
        if (createExceptionDto.startTime) {
            exceptionData.startTime = createExceptionDto.startTime;
        }
        if (createExceptionDto.endTime) {
            exceptionData.endTime = createExceptionDto.endTime;
        }
        return this.doctorScheduleService.createException(exceptionData);
    }
    async getDoctorExceptions(doctorId, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        return this.doctorScheduleService.getDoctorExceptions(doctorId, req.organization.id);
    }
    async removeException(id, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        await this.doctorScheduleService.deleteException(id, req.organization.id);
    }
    async checkAvailability(doctorId, startTimeString, endTimeString, req) {
        if (!req.organization) {
            throw new common_1.BadRequestException('Organization information missing');
        }
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
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
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId'),
    __param(0, (0, common_1.Param)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getDoctorSchedules", null);
__decorate([
    (0, common_1.Get)('date'),
    __param(0, (0, common_1.Query)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getScheduleForDate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_dto_1.UpdateScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('exceptions'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exception_dto_1.CreateExceptionDto, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "createException", null);
__decorate([
    (0, common_1.Get)('exceptions/doctor/:doctorId'),
    __param(0, (0, common_1.Param)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "getDoctorExceptions", null);
__decorate([
    (0, common_1.Delete)('exceptions/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "removeException", null);
__decorate([
    (0, common_1.Get)('check-availability'),
    __param(0, (0, common_1.Query)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('startTime')),
    __param(2, (0, common_1.Query)('endTime')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DoctorScheduleController.prototype, "checkAvailability", null);
DoctorScheduleController = DoctorScheduleController_1 = __decorate([
    (0, common_1.Controller)('doctors/schedules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [doctor_schedule_service_1.DoctorScheduleService])
], DoctorScheduleController);
exports.DoctorScheduleController = DoctorScheduleController;
//# sourceMappingURL=doctor-schedule.controller.js.map