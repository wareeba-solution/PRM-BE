var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
let ScheduleException = class ScheduleException {
    isDateTimeInException(dateTime) {
        const exceptionStartDate = new Date(this.startDate);
        exceptionStartDate.setHours(0, 0, 0, 0);
        const exceptionEndDate = new Date(this.endDate);
        exceptionEndDate.setHours(23, 59, 59, 999);
        const testDate = new Date(dateTime);
        if (testDate < exceptionStartDate || testDate > exceptionEndDate) {
            return false;
        }
        if (this.isFullDay) {
            return true;
        }
        if (this.startTime && this.endTime) {
            const exceptionStartDateTime = new Date(testDate);
            exceptionStartDateTime.setHours(this.startTime.getHours(), this.startTime.getMinutes(), this.startTime.getSeconds());
            const exceptionEndDateTime = new Date(testDate);
            exceptionEndDateTime.setHours(this.endTime.getHours(), this.endTime.getMinutes(), this.endTime.getSeconds());
            return testDate >= exceptionStartDateTime && testDate <= exceptionEndDateTime;
        }
        return true;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ScheduleException.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "doctorId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'doctor_id' }),
    __metadata("design:type", User)
], ScheduleException.prototype, "doctor", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organization_id' }),
    __metadata("design:type", Organization)
], ScheduleException.prototype, "organization", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "startDate", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "endDate", void 0);
__decorate([
    Column({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "startTime", void 0);
__decorate([
    Column({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "endTime", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ScheduleException.prototype, "isFullDay", void 0);
__decorate([
    Column({ type: 'enum', enum: ['VACATION', 'SICK_LEAVE', 'CONFERENCE', 'PERSONAL', 'OTHER'], default: 'OTHER' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "type", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "reason", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'created_by' }),
    __metadata("design:type", User)
], ScheduleException.prototype, "creator", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "updatedBy", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'updated_by' }),
    __metadata("design:type", User)
], ScheduleException.prototype, "updater", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "updatedAt", void 0);
ScheduleException = __decorate([
    Entity('schedule_exceptions')
], ScheduleException);
export { ScheduleException };
//# sourceMappingURL=schedule-exception.entity.js.map