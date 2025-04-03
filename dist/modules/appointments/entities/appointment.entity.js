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
var Appointment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/appointment.entity.ts
const typeorm_1 = require("typeorm");
const appointment_type_enum_1 = require("../enums/appointment-type.enum");
const appointment_status_enum_1 = require("../enums/appointment-status.enum");
const appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
const swagger_1 = require("@nestjs/swagger");
// DO NOT import Contact directly - this is what causes the circular dependency
let Appointment = Appointment_1 = class Appointment {
    // Helper methods
    isUpcoming() {
        return new Date() < this.startTime;
    }
    isInProgress() {
        const now = new Date();
        return now >= this.startTime && now <= this.endTime;
    }
    isOverdue() {
        return new Date() > this.endTime && this.status !== appointment_status_enum_1.AppointmentStatus.COMPLETED;
    }
    getDuration() {
        return this.endTime.getTime() - this.startTime.getTime();
    }
    canBeModified() {
        return ![
            appointment_status_enum_1.AppointmentStatus.COMPLETED,
            appointment_status_enum_1.AppointmentStatus.CANCELLED,
        ].includes(this.status);
    }
    needsReminder() {
        var _a;
        if (!this.sendReminders || this.reminderSent || !this.isUpcoming()) {
            return false;
        }
        const now = new Date();
        const nextReminderTime = Math.min(...((_a = this.reminderPreferences) === null || _a === void 0 ? void 0 : _a.reminderTimes) || [60]);
        const reminderDue = new Date(this.startTime.getTime() - nextReminderTime * 60000);
        return now >= reminderDue;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, startTime: { required: true, type: () => Date }, endTime: { required: true, type: () => Date }, notes: { required: false, type: () => String }, organizationId: { required: true, type: () => String }, patientId: { required: true, type: () => String }, doctorId: { required: true, type: () => String }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, confirmedAt: { required: false, type: () => Date }, scheduledFor: { required: true, type: () => Date }, type: { required: true, enum: require("../enums/appointment-type.enum").AppointmentType }, status: { required: true, enum: require("../enums/appointment-status.enum").AppointmentStatus }, priority: { required: true, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, description: { required: true, type: () => String }, location: { required: true, type: () => String }, meetingLink: { required: true, type: () => String }, sendReminders: { required: true, type: () => Boolean }, reminderPreferences: { required: true, type: () => ({ email: { required: true, type: () => Boolean }, sms: { required: true, type: () => Boolean }, whatsapp: { required: true, type: () => Boolean }, reminderTimes: { required: true, type: () => [Number] } }) }, formData: { required: true, type: () => ({ chiefComplaint: { required: false, type: () => String }, symptoms: { required: false, type: () => [String] }, duration: { required: false, type: () => String }, notes: { required: false, type: () => String }, diagnosis: { required: false, type: () => String }, treatmentPlan: { required: false, type: () => String }, prescriptions: { required: false, type: () => [String] }, followUpInstructions: { required: false, type: () => String } }) }, metadata: { required: true, type: () => ({ referralSource: { required: false, type: () => String }, insurance: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, externalId: { required: false, type: () => String }, followUpAppointmentId: { required: false, type: () => String }, previousAppointmentId: { required: false, type: () => String }, billingStatus: { required: false, type: () => String }, claimStatus: { required: false, type: () => String }, followUpSentAt: { required: false, type: () => String } }) }, isRecurring: { required: true, type: () => Boolean }, recurrencePattern: { required: true, type: () => ({ frequency: { required: true, type: () => Object }, interval: { required: true, type: () => Number }, endDate: { required: false, type: () => Date }, daysOfWeek: { required: false, type: () => [Number] } }) }, parentAppointmentId: { required: true, type: () => String }, cancellationReason: { required: true, type: () => String }, reschedulingReason: { required: true, type: () => String }, reminderSent: { required: true, type: () => Boolean }, reminderSentAt: { required: true, type: () => Date }, checkedInAt: { required: true, type: () => Date }, completedAt: { required: true, type: () => Date }, cancelledAt: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, organization: { required: true, type: () => Object }, patient: { required: true, type: () => Object }, doctor: { required: true, type: () => Object }, createdBy: { required: true, type: () => Object }, updatedBy: { required: true, type: () => Object }, parentAppointment: { required: true, type: () => require("./appointment.entity").Appointment }, recurrentAppointments: { required: true, type: () => [require("./appointment.entity").Appointment] }, provider: { required: true, type: () => Object } };
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
], Appointment.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_type_enum_1.AppointmentType,
        default: appointment_type_enum_1.AppointmentType.IN_PERSON,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_status_enum_1.AppointmentStatus,
        default: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_priority_enum_1.AppointmentPriority,
        default: appointment_priority_enum_1.AppointmentPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "meetingLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "sendReminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "reminderPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "formData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "isRecurring", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "recurrencePattern", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "parentAppointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "cancellationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "reschedulingReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "reminderSent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "reminderSentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "checkedInAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Organization', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Contact', 'appointments', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User'),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Object)
], Appointment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User'),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Object)
], Appointment.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Appointment_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentAppointmentId' }),
    __metadata("design:type", Appointment)
], Appointment.prototype, "parentAppointment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Appointment_1, appointment => appointment.parentAppointment),
    __metadata("design:type", Array)
], Appointment.prototype, "recurrentAppointments", void 0);
Appointment = Appointment_1 = __decorate([
    (0, typeorm_1.Entity)('appointments'),
    (0, typeorm_1.Index)(['organizationId', 'startTime']),
    (0, typeorm_1.Index)(['doctorId', 'startTime']),
    (0, typeorm_1.Index)(['patientId', 'startTime'])
], Appointment);
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map