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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/appointment.entity.ts
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const appointment_status_enum_1 = require("../enums/appointment-status.enum");
const appointment_type_enum_1 = require("../enums/appointment-type.enum");
const appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
const user_entity_1 = require("../../users/entities/user.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
let Appointment = class Appointment {
    get isCancelled() {
        return !!this.cancelledAt;
    }
    get isRescheduled() {
        return !!this.rescheduledAt;
    }
    get isCompleted() {
        return !!this.completedAt;
    }
    get isNoShow() {
        return !!this.noShowAt;
    }
    get duration() {
        return this.endTime.getTime() - this.startTime.getTime();
    }
    canBeModified() {
        return ![
            appointment_status_enum_1.AppointmentStatus.COMPLETED,
            appointment_status_enum_1.AppointmentStatus.CANCELLED,
        ].includes(this.status);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, doctorId: { required: true, type: () => String }, patientId: { required: true, type: () => String }, departmentId: { required: false, type: () => String }, title: { required: true, type: () => String }, description: { required: false, type: () => String }, startTime: { required: true, type: () => Date }, endTime: { required: true, type: () => Date }, status: { required: true, enum: require("../enums/appointment-status.enum").AppointmentStatus }, type: { required: true, enum: require("../enums/appointment-type.enum").AppointmentType }, priority: { required: true, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, location: { required: false, type: () => String }, notes: { required: false, type: () => String }, isRecurring: { required: true, type: () => Boolean }, recurrenceRule: { required: false, type: () => ({ frequency: { required: true, type: () => Object }, interval: { required: true, type: () => Number }, endDate: { required: false, type: () => Date }, count: { required: false, type: () => Number }, daysOfWeek: { required: false, type: () => [Number] }, daysOfMonth: { required: false, type: () => [Number] } }) }, parentAppointmentId: { required: false, type: () => String }, cancelledAt: { required: false, type: () => Date }, cancelledById: { required: false, type: () => String }, cancellationReason: { required: false, type: () => String }, rescheduledAt: { required: false, type: () => Date }, rescheduledById: { required: false, type: () => String }, rescheduleReason: { required: false, type: () => String }, completedAt: { required: false, type: () => Date }, completedById: { required: false, type: () => String }, completionNotes: { required: false, type: () => String }, noShowAt: { required: false, type: () => Date }, noShowById: { required: false, type: () => String }, noShowReason: { required: false, type: () => String }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, confirmedAt: { required: false, type: () => Date }, reminderSent: { required: true, type: () => Boolean }, reminderSentAt: { required: false, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => Object }, doctor: { required: true, type: () => Object }, patient: { required: true, type: () => Object }, department: { required: false, type: () => require("../../departments/entities/department.entity").Department }, parentAppointment: { required: false, type: () => Object }, cancelledBy: { required: false, type: () => Object }, rescheduledBy: { required: false, type: () => Object }, completedBy: { required: false, type: () => Object }, noShowBy: { required: false, type: () => Object }, createdBy: { required: true, type: () => Object }, updatedBy: { required: false, type: () => Object }, childAppointments: { required: true, type: () => [Object] } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appointment.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appointment.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_status_enum_1.AppointmentStatus,
        default: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_type_enum_1.AppointmentType,
        default: appointment_type_enum_1.AppointmentType.IN_PERSON,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_priority_enum_1.AppointmentPriority,
        default: appointment_priority_enum_1.AppointmentPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "isRecurring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "recurrenceRule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "parentAppointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "cancelledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "cancelledById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "cancellationReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "rescheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "rescheduledById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "rescheduleReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "completedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "completionNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "noShowAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "noShowById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "noShowReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "updatedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "confirmedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "reminderSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "reminderSentAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)('Organization'),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            title: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)('Appointment'),
    (0, typeorm_1.JoinColumn)({ name: 'parentAppointmentId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "parentAppointment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'cancelledById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "cancelledBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'rescheduledById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "rescheduledBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'completedById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "completedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'noShowById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "noShowBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Appointment.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Appointment', 'parentAppointment'),
    __metadata("design:type", Array)
], Appointment.prototype, "childAppointments", void 0);
Appointment = __decorate([
    (0, typeorm_1.Entity)('appointments'),
    (0, typeorm_1.Index)(['organizationId', 'status']),
    (0, typeorm_1.Index)(['organizationId', 'doctorId']),
    (0, typeorm_1.Index)(['organizationId', 'patientId']),
    (0, typeorm_1.Index)(['organizationId', 'departmentId']),
    (0, typeorm_1.Index)(['organizationId', 'startTime'])
], Appointment);
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map