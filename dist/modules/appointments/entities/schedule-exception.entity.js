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
exports.ScheduleException = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
/**
 * Entity for doctor's schedule exceptions (time off, vacations, etc.)
 */
let ScheduleException = class ScheduleException {
    /**
     * Check if a given datetime falls within the exception
     */
    isDateTimeInException(dateTime) {
        // Create date objects without time for date comparisons
        const exceptionStartDate = new Date(this.startDate);
        exceptionStartDate.setHours(0, 0, 0, 0);
        const exceptionEndDate = new Date(this.endDate);
        exceptionEndDate.setHours(23, 59, 59, 999);
        const testDate = new Date(dateTime);
        // First check if the date is within the exception date range
        if (testDate < exceptionStartDate || testDate > exceptionEndDate) {
            return false;
        }
        // If it's a full day exception, the datetime is in the exception
        if (this.isFullDay) {
            return true;
        }
        // If not a full day, check time range
        // Only if we have start and end times
        if (this.startTime && this.endTime) {
            const exceptionStartDateTime = new Date(testDate);
            exceptionStartDateTime.setHours(this.startTime.getHours(), this.startTime.getMinutes(), this.startTime.getSeconds());
            const exceptionEndDateTime = new Date(testDate);
            exceptionEndDateTime.setHours(this.endTime.getHours(), this.endTime.getMinutes(), this.endTime.getSeconds());
            return testDate >= exceptionStartDateTime && testDate <= exceptionEndDateTime;
        }
        // If we don't have specific times, it affects the whole day
        return true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, doctorId: { required: true, type: () => String }, doctor: { required: true, type: () => require("../../users/entities/user.entity").User }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, startTime: { required: true, type: () => Date, nullable: true }, endTime: { required: true, type: () => Date, nullable: true }, isFullDay: { required: true, type: () => Boolean }, type: { required: true, type: () => String }, reason: { required: true, type: () => String }, createdBy: { required: true, type: () => String }, creator: { required: true, type: () => require("../../users/entities/user.entity").User }, updatedBy: { required: true, type: () => String }, updater: { required: true, type: () => require("../../users/entities/user.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScheduleException.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'doctor_id' }),
    __metadata("design:type", user_entity_1.User)
], ScheduleException.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", organization_entity_1.Organization)
], ScheduleException.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ScheduleException.prototype, "isFullDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['VACATION', 'SICK_LEAVE', 'CONFERENCE', 'PERSONAL', 'OTHER'], default: 'OTHER' }),
    __metadata("design:type", String)
], ScheduleException.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], ScheduleException.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ScheduleException.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.User)
], ScheduleException.prototype, "updater", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScheduleException.prototype, "updatedAt", void 0);
ScheduleException = __decorate([
    (0, typeorm_1.Entity)('schedule_exceptions')
], ScheduleException);
exports.ScheduleException = ScheduleException;
//# sourceMappingURL=schedule-exception.entity.js.map