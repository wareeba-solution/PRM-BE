"use strict";
// src/modules/appointments/controllers/appointments.controller.ts
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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const appointments_service_1 = require("../services/appointments.service");
const create_appointment_dto_1 = require("../dto/create-appointment.dto");
const update_appointment_dto_1 = require("../dto/update-appointment.dto");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async create(req, createAppointmentDto) {
        return this.appointmentsService.create(Object.assign(Object.assign({}, createAppointmentDto), { organizationId: req.user.organizationId, createdBy: req.user.id }));
    }
    async findAll(req, startDate, endDate, doctorId, patientId, status, page, limit) {
        return this.appointmentsService.findAll({
            organizationId: req.user.organizationId,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            doctorId,
            patientId,
            status,
            page,
            limit,
        });
    }
    async findOne(req, id) {
        return this.appointmentsService.findOne(id, req.user.organizationId);
    }
    async update(req, id, updateAppointmentDto) {
        return this.appointmentsService.update(id, Object.assign(Object.assign({}, updateAppointmentDto), { organizationId: req.user.organizationId, updatedBy: req.user.id }));
    }
    async cancel(req, id, reason) {
        return this.appointmentsService.cancel(id, {
            reason,
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }
    async reschedule(req, id, data) {
        return this.appointmentsService.reschedule(id, Object.assign(Object.assign({}, data), { organizationId: req.user.organizationId, updatedBy: req.user.id }));
    }
    async confirm(req, id) {
        return this.appointmentsService.confirm(id, {
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }
    async complete(req, id) {
        return this.appointmentsService.complete(id, {
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }
    async remove(req, id) {
        return this.appointmentsService.remove(id, req.user.organizationId);
    }
    async getCalendarEvents(req, start, end) {
        return this.appointmentsService.getCalendarEvents(req.user.organizationId, new Date(start), new Date(end));
    }
    async getAvailableSlots(req, doctorId, date) {
        return this.appointmentsService.getAvailableSlots(doctorId, req.user.organizationId, new Date(date));
    }
    async checkAvailability(req, doctorId, date, startTime, endTime) {
        return this.appointmentsService.checkAvailability(doctorId, req.user.organizationId, new Date(date), startTime, endTime);
    }
    async getStatistics(req, startDate, endDate, doctorId) {
        return this.appointmentsService.getStatistics({
            organizationId: req.user.organizationId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            doctorId,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('doctorId')),
    __param(4, (0, common_1.Query)('patientId')),
    __param(5, (0, common_1.Query)('status')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Array, Number, Number]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/reschedule'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "reschedule", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('calendar/events'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getCalendarEvents", null);
__decorate([
    (0, common_1.Get)('available-slots'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('doctorId')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Get)('check-availability'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('doctorId')),
    __param(2, (0, common_1.Query)('date')),
    __param(3, (0, common_1.Query)('startTime')),
    __param(4, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "checkAvailability", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getStatistics", null);
AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map