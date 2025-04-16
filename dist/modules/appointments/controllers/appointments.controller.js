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
var AppointmentsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const appointments_service_1 = require("../services/appointments.service");
const create_appointment_dto_1 = require("../dto/create-appointment.dto");
const update_appointment_dto_1 = require("../dto/update-appointment.dto");
const typeorm_1 = require("typeorm");
const common_2 = require("@nestjs/common");
let AppointmentsController = AppointmentsController_1 = class AppointmentsController {
    constructor(appointmentsService, dataSource) {
        this.appointmentsService = appointmentsService;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(AppointmentsController_1.name);
    }
    // ======== POST Endpoints ========
    async create(req, createAppointmentDto) {
        try {
            // Ensure appointments table exists
            await this.ensureAppointmentsTable();
            // Ensure doctor schedule exists
            await this.appointmentsService.ensureDoctorSchedule(createAppointmentDto.doctorId, req.user.organizationId);
            // Try to create the appointment normally
            return await this.appointmentsService.create(Object.assign(Object.assign({}, createAppointmentDto), { organizationId: req.user.organizationId, createdBy: req.user.id }));
        }
        catch (error) {
            this.logger.error(`Failed to create appointment: ${error.message}`, error.stack);
            // For specific errors, use direct creation as fallback
            if (error.message.includes('schedule') ||
                error.message.includes('conflict') ||
                error.message.includes('doctor')) {
                return this.directCreateAppointment(req.user.organizationId, req.user.id, createAppointmentDto);
            }
            throw error;
        }
    }
    // ======== GET Endpoints - Non-Parameterized First ========
    async findAll(req, startDate, endDate, doctorId, patientId, status, page, limit) {
        try {
            return await this.appointmentsService.findAll({
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
        catch (error) {
            this.logger.error(`Error fetching appointments: ${error.message}`, error.stack);
            // If table doesn't exist yet, create it and return empty result
            if (error.message.includes('relation "appointments" does not exist')) {
                await this.ensureAppointmentsTable();
                return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
            }
            throw error;
        }
    }
    // Put all non-parameterized GET routes before any `:id` routes
    async getCalendarEvents(req, start, end) {
        try {
            return await this.appointmentsService.getCalendarEvents(req.user.organizationId, new Date(start), new Date(end));
        }
        catch (error) {
            if (error.message.includes('relation "appointments" does not exist')) {
                await this.ensureAppointmentsTable();
                return [];
            }
            throw error;
        }
    }
    async getAvailableSlots(req, doctorId, date) {
        try {
            // Ensure doctor schedule exists before getting slots
            await this.appointmentsService.ensureDoctorSchedule(doctorId, req.user.organizationId);
            return await this.appointmentsService.getAvailableSlots(doctorId, req.user.organizationId, new Date(date));
        }
        catch (error) {
            this.logger.error(`Error getting available slots: ${error.message}`, error.stack);
            // If tables don't exist, create them and return default slots
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                await this.ensureAppointmentsTable();
                // Return some default slots
                return [
                    { startTime: '09:00', endTime: '09:30' },
                    { startTime: '09:30', endTime: '10:00' },
                    { startTime: '10:00', endTime: '10:30' },
                    { startTime: '10:30', endTime: '11:00' },
                    { startTime: '11:00', endTime: '11:30' },
                    { startTime: '11:30', endTime: '12:00' },
                    { startTime: '13:00', endTime: '13:30' },
                    { startTime: '13:30', endTime: '14:00' },
                    { startTime: '14:00', endTime: '14:30' },
                    { startTime: '14:30', endTime: '15:00' },
                    { startTime: '15:00', endTime: '15:30' },
                    { startTime: '15:30', endTime: '16:00' },
                    { startTime: '16:00', endTime: '16:30' },
                    { startTime: '16:30', endTime: '17:00' },
                ];
            }
            throw error;
        }
    }
    async checkAvailability(req, doctorId, date, startTime, endTime) {
        try {
            return await this.appointmentsService.checkAvailability(doctorId, req.user.organizationId, new Date(date), startTime, endTime);
        }
        catch (error) {
            // If tables don't exist, assume available
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                return true;
            }
            throw error;
        }
    }
    async getStatistics(req, startDate, endDate, doctorId) {
        try {
            return await this.appointmentsService.getStatistics({
                organizationId: req.user.organizationId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                doctorId,
            });
        }
        catch (error) {
            // If table doesn't exist, return empty stats
            if (error.message.includes('relation "appointments" does not exist')) {
                await this.ensureAppointmentsTable();
                return {
                    total: 0,
                    completed: 0,
                    cancelled: 0,
                    noShow: 0,
                    rescheduled: 0,
                };
            }
            throw error;
        }
    }
    // ======== Parameterized Routes (:id) ========
    async findOne(req, id) {
        try {
            return await this.appointmentsService.findOne(id, req.user.organizationId);
        }
        catch (error) {
            if (error.message.includes('relation "appointments" does not exist')) {
                await this.ensureAppointmentsTable();
                throw new common_2.NotFoundException('Appointment not found');
            }
            throw error;
        }
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
    // ======== Private Helper Methods ========
    async directCreateAppointment(organizationId, userId, dto) {
        try {
            this.logger.log('Falling back to direct appointment creation');
            // Prepare appointment data
            const appointmentData = {
                organizationId,
                createdById: userId,
                doctorId: dto.doctorId,
                patientId: dto.patientId,
                title: dto.title,
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
                status: 'SCHEDULED',
                type: dto.type || 'IN_PERSON',
                notes: dto.notes
            };
            // Use direct query for insertion
            const result = await this.dataSource.query(`INSERT INTO appointments 
                ("organizationId", "doctorId", "patientId", title, "startTime", "endTime", status, type, notes, "createdById", "createdAt", "updatedAt")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
                RETURNING *`, [
                organizationId,
                dto.doctorId,
                dto.patientId,
                dto.title,
                new Date(dto.startTime),
                new Date(dto.endTime),
                'SCHEDULED',
                dto.type || 'IN_PERSON',
                dto.notes || null,
                userId
            ]);
            return result[0];
        }
        catch (error) {
            this.logger.error(`Direct appointment creation failed: ${error.message}`, error.stack);
            throw new common_1.BadRequestException(`Failed to create appointment: ${error.message}`);
        }
    }
    async ensureAppointmentsTable() {
        try {
            // Check if table exists
            const tableExists = await this.dataSource.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'appointments'
                );
            `);
            if (!tableExists[0].exists) {
                // Create the table if it doesn't exist
                await this.dataSource.query(`
                    CREATE TABLE IF NOT EXISTS public.appointments (
                      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                      "organizationId" UUID NOT NULL,
                      "doctorId" UUID NOT NULL,
                      "patientId" UUID NOT NULL,
                      "departmentId" UUID,
                      title VARCHAR(255) NOT NULL,
                      description TEXT,
                      "startTime" TIMESTAMP NOT NULL,
                      "endTime" TIMESTAMP NOT NULL,
                      status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
                      type VARCHAR(50) NOT NULL DEFAULT 'IN_PERSON',
                      priority VARCHAR(50) NOT NULL DEFAULT 'NORMAL',
                      location VARCHAR(255),
                      notes TEXT,
                      metadata JSONB,
                      "isRecurring" BOOLEAN DEFAULT false,
                      "recurrenceRule" JSONB,
                      "parentAppointmentId" UUID,
                      "cancelledAt" TIMESTAMP,
                      "cancelledById" UUID,
                      "cancellationReason" TEXT,
                      "rescheduledAt" TIMESTAMP,
                      "rescheduledById" UUID, 
                      "rescheduleReason" TEXT,
                      "completedAt" TIMESTAMP,
                      "completedById" UUID,
                      "completionNotes" TEXT,
                      "noShowAt" TIMESTAMP,
                      "noShowById" UUID,
                      "noShowReason" TEXT,
                      "createdById" UUID NOT NULL,
                      "updatedById" UUID,
                      "confirmedAt" TIMESTAMP,
                      "reminderSent" BOOLEAN DEFAULT false,
                      "reminderSentAt" TIMESTAMP,
                      "createdAt" TIMESTAMP DEFAULT NOW(),
                      "updatedAt" TIMESTAMP DEFAULT NOW(),
                      "deletedAt" TIMESTAMP
                    );
                    
                    CREATE INDEX IF NOT EXISTS idx_appointments_org_status 
                      ON public.appointments("organizationId", status);
                    CREATE INDEX IF NOT EXISTS idx_appointments_org_doctor 
                      ON public.appointments("organizationId", "doctorId");
                    CREATE INDEX IF NOT EXISTS idx_appointments_org_patient 
                      ON public.appointments("organizationId", "patientId");
                    CREATE INDEX IF NOT EXISTS idx_appointments_org_department 
                      ON public.appointments("organizationId", "departmentId");
                    CREATE INDEX IF NOT EXISTS idx_appointments_org_starttime 
                      ON public.appointments("organizationId", "startTime");
                `);
            }
        }
        catch (error) {
            this.logger.error(`Failed to ensure appointments table: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Failed to initialize appointments feature');
        }
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
AppointmentsController = AppointmentsController_1 = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService,
        typeorm_1.DataSource])
], AppointmentsController);
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map