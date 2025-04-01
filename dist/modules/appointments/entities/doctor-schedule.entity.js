var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
let DoctorSchedule = class DoctorSchedule {
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
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "id", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "doctorId", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'int', enum: DayOfWeek }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "dayOfWeek", void 0);
__decorate([
    Column({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "startTime", void 0);
__decorate([
    Column({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "endTime", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "workStart", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "workEnd", void 0);
__decorate([
    Column({ type: 'int', default: 30 }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "slotDuration", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "breakBetweenSlots", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], DoctorSchedule.prototype, "isAvailable", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], DoctorSchedule.prototype, "isActive", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "validFrom", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "validTo", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Array)
], DoctorSchedule.prototype, "breakTimes", void 0);
__decorate([
    Column({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], DoctorSchedule.prototype, "metadata", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "location", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "virtualLink", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "notes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], DoctorSchedule.prototype, "slotCapacity", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "deletedAt", void 0);
DoctorSchedule = __decorate([
    Entity('doctor_schedules')
], DoctorSchedule);
export { DoctorSchedule };
//# sourceMappingURL=doctor-schedule.entity.js.map