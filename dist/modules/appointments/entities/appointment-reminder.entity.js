var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { Appointment } from './appointment.entity';
export var ReminderType;
(function (ReminderType) {
    ReminderType["EMAIL"] = "email";
    ReminderType["SMS"] = "sms";
    ReminderType["PUSH"] = "push";
    ReminderType["WHATSAPP"] = "whatsapp";
})(ReminderType || (ReminderType = {}));
export var ReminderStatus;
(function (ReminderStatus) {
    ReminderStatus["PENDING"] = "pending";
    ReminderStatus["SENT"] = "sent";
    ReminderStatus["FAILED"] = "failed";
    ReminderStatus["CANCELLED"] = "cancelled";
})(ReminderStatus || (ReminderStatus = {}));
let AppointmentReminder = class AppointmentReminder {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "appointmentId", void 0);
__decorate([
    ManyToOne(() => Appointment, appointment => appointment.reminderSent),
    JoinColumn({ name: 'appointmentId' }),
    __metadata("design:type", Appointment)
], AppointmentReminder.prototype, "appointment", void 0);
__decorate([
    Column({ type: 'enum', enum: ReminderType }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "type", void 0);
__decorate([
    Column({ type: 'enum', enum: ReminderStatus, default: ReminderStatus.PENDING }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "status", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AppointmentReminder.prototype, "scheduledFor", void 0);
__decorate([
    Column({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], AppointmentReminder.prototype, "sentAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "content", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "recipientId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "recipientEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "recipientPhone", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], AppointmentReminder.prototype, "metadata", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], AppointmentReminder.prototype, "deliveryDetails", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "organizationId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AppointmentReminder.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], AppointmentReminder.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], AppointmentReminder.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], AppointmentReminder.prototype, "deletedAt", void 0);
AppointmentReminder = __decorate([
    Entity('appointment_reminders')
], AppointmentReminder);
export { AppointmentReminder };
//# sourceMappingURL=appointment-reminder.entity.js.map