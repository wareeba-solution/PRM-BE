var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index, } from 'typeorm';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { ApiProperty } from '@nestjs/swagger';
let Appointment = class Appointment {
    isUpcoming() {
        return new Date() < this.startTime;
    }
    isInProgress() {
        const now = new Date();
        return now >= this.startTime && now <= this.endTime;
    }
    isOverdue() {
        return new Date() > this.endTime && this.status !== AppointmentStatus.COMPLETED;
    }
    getDuration() {
        return this.endTime.getTime() - this.startTime.getTime();
    }
    canBeModified() {
        return ![
            AppointmentStatus.COMPLETED,
            AppointmentStatus.CANCELLED,
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
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Appointment.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "startTime", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "endTime", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "patientId", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], Appointment.prototype, "createdById", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "updatedById", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "confirmedAt", void 0);
__decorate([
    Column({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "scheduledFor", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AppointmentType,
        default: AppointmentType.IN_PERSON,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "type", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AppointmentPriority,
        default: AppointmentPriority.NORMAL,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "priority", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "description", void 0);
__decorate([
    Column({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "location", void 0);
__decorate([
    Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "meetingLink", void 0);
__decorate([
    Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "sendReminders", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "reminderPreferences", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "formData", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "metadata", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "isRecurring", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "recurrencePattern", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "parentAppointmentId", void 0);
__decorate([
    Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "cancellationReason", void 0);
__decorate([
    Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "reschedulingReason", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "reminderSent", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "reminderSentAt", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "checkedInAt", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "completedAt", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "cancelledAt", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('Organization', { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "organization", void 0);
__decorate([
    ManyToOne('Contact', 'appointments', { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'patientId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "patient", void 0);
__decorate([
    ManyToOne('User', { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'doctorId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "doctor", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Object)
], Appointment.prototype, "createdBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Object)
], Appointment.prototype, "updatedBy", void 0);
__decorate([
    ManyToOne(() => Appointment, { nullable: true }),
    JoinColumn({ name: 'parentAppointmentId' }),
    __metadata("design:type", Appointment)
], Appointment.prototype, "parentAppointment", void 0);
__decorate([
    OneToMany(() => Appointment, appointment => appointment.parentAppointment),
    __metadata("design:type", Array)
], Appointment.prototype, "recurrentAppointments", void 0);
Appointment = __decorate([
    Entity('appointments'),
    Index(['organizationId', 'startTime']),
    Index(['doctorId', 'startTime']),
    Index(['patientId', 'startTime'])
], Appointment);
export { Appointment };
//# sourceMappingURL=appointment.entity.js.map