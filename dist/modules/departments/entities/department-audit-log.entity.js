var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { User } from '../../users/entities/user.entity';
export var DepartmentAuditAction;
(function (DepartmentAuditAction) {
    DepartmentAuditAction["CREATED"] = "CREATED";
    DepartmentAuditAction["UPDATED"] = "UPDATED";
    DepartmentAuditAction["DELETED"] = "DELETED";
    DepartmentAuditAction["MEMBER_ADDED"] = "MEMBER_ADDED";
    DepartmentAuditAction["MEMBER_REMOVED"] = "MEMBER_REMOVED";
    DepartmentAuditAction["MEMBER_TRANSFERRED"] = "MEMBER_TRANSFERRED";
    DepartmentAuditAction["MANAGER_CHANGED"] = "MANAGER_CHANGED";
    DepartmentAuditAction["MOVED"] = "MOVED";
    DepartmentAuditAction["REORDERED"] = "REORDERED";
})(DepartmentAuditAction || (DepartmentAuditAction = {}));
let DepartmentAuditLog = class DepartmentAuditLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "departmentId", void 0);
__decorate([
    ManyToOne(() => Department),
    JoinColumn({ name: 'departmentId' }),
    __metadata("design:type", Department)
], DepartmentAuditLog.prototype, "department", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "organizationId", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DepartmentAuditAction
    }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "action", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DepartmentAuditLog.prototype, "changes", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DepartmentAuditLog.prototype, "metadata", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "performedById", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'performedById' }),
    __metadata("design:type", User)
], DepartmentAuditLog.prototype, "performedBy", void 0);
__decorate([
    Column('inet', { nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "userAgent", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], DepartmentAuditLog.prototype, "createdAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "affectedUserId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'affectedUserId' }),
    __metadata("design:type", User)
], DepartmentAuditLog.prototype, "affectedUser", void 0);
DepartmentAuditLog = __decorate([
    Entity('department_audit_logs')
], DepartmentAuditLog);
export { DepartmentAuditLog };
//# sourceMappingURL=department-audit-log.entity.js.map