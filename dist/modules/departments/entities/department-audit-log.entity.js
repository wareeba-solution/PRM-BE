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
exports.DepartmentAuditLog = exports.DepartmentAuditAction = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./department.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var DepartmentAuditAction;
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
})(DepartmentAuditAction = exports.DepartmentAuditAction || (exports.DepartmentAuditAction = {}));
let DepartmentAuditLog = class DepartmentAuditLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", department_entity_1.Department)
], DepartmentAuditLog.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DepartmentAuditAction
    }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DepartmentAuditLog.prototype, "changes", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DepartmentAuditLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "performedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'performedById' }),
    __metadata("design:type", user_entity_1.User)
], DepartmentAuditLog.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('inet', { nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DepartmentAuditLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentAuditLog.prototype, "affectedUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'affectedUserId' }),
    __metadata("design:type", user_entity_1.User)
], DepartmentAuditLog.prototype, "affectedUser", void 0);
DepartmentAuditLog = __decorate([
    (0, typeorm_1.Entity)('department_audit_logs')
], DepartmentAuditLog);
exports.DepartmentAuditLog = DepartmentAuditLog;
//# sourceMappingURL=department-audit-log.entity.js.map