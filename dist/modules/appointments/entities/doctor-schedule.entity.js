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
exports.DoctorSchedule = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/doctor-schedule.entity.ts
const typeorm_1 = require("typeorm");
const day_of_week_enum_1 = require("../enums/day-of-week.enum");
let DoctorSchedule = class DoctorSchedule {
    // Helper methods
    isTimeInRange(time) {
        return time >= this.startTime && time <= this.endTime;
    }
    isDateInValidRange(date) {
        if (!this.validFrom && !this.validTo)
            return true;
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);
        if (this.validFrom) {
            const validFromDate = new Date(this.validFrom);
            validFromDate.setHours(0, 0, 0, 0);
            if (currentDate < validFromDate)
                return false;
        }
        if (this.validTo) {
            const validToDate = new Date(this.validTo);
            validToDate.setHours(0, 0, 0, 0);
            if (currentDate > validToDate)
                return false;
        }
        return true;
    }
    getDayNumber() {
        return this.dayOfWeek;
    }
    isBreakTime(time) {
        if (!this.breakTimes || !this.breakTimes.length)
            return false;
        return this.breakTimes.some(breakTime => time >= breakTime.startTime && time < breakTime.endTime);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, doctorId: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, dayOfWeek: { required: true, enum: require("../enums/day-of-week.enum").DayOfWeek }, startTime: { required: true, type: () => String }, endTime: { required: true, type: () => String }, workStart: { required: true, type: () => Date }, workEnd: { required: true, type: () => Date }, slotDuration: { required: true, type: () => Number }, breakBetweenSlots: { required: true, type: () => Number }, isAvailable: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, validFrom: { required: false, type: () => Date }, validTo: { required: false, type: () => Date }, breakTimes: { required: false }, metadata: { required: false, type: () => Object }, location: { required: false, type: () => String }, virtualLink: { required: false, type: () => String }, notes: { required: false, type: () => String }, slotCapacity: { required: false, type: () => Number }, createdById: { required: false, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, appointments: { required: false, type: () => [require("./appointment.entity").Appointment] }, availableSlots: { required: false } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', enum: day_of_week_enum_1.DayOfWeek }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "dayOfWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "workStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "workEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 30 }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "slotDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "breakBetweenSlots", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], DoctorSchedule.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], DoctorSchedule.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "validTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Array)
], DoctorSchedule.prototype, "breakTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], DoctorSchedule.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "virtualLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "slotCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "deletedAt", void 0);
DoctorSchedule = __decorate([
    (0, typeorm_1.Entity)('doctor_schedules')
], DoctorSchedule);
exports.DoctorSchedule = DoctorSchedule;
//# sourceMappingURL=doctor-schedule.entity.js.map