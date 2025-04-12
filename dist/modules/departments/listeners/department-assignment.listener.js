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
exports.DepartmentAssignmentListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const department_audit_service_1 = require("../services/department-audit.service");
const department_audit_log_entity_1 = require("../entities/department-audit-log.entity");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const users_service_1 = require("../../users/services/users.service");
let DepartmentAssignmentListener = class DepartmentAssignmentListener {
    constructor(auditService, notificationsService, usersService) {
        this.auditService = auditService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleMemberAdded(event) {
        // Create audit log
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.MEMBER_ADDED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
            },
        });
        // Notify user
        const user = await this.usersService.findById(event.userId);
        if (user) {
            const notification = {
                userId: user.id,
                type: 'DEPARTMENT_ASSIGNMENT',
                title: 'Department Assignment',
                message: 'You have been assigned to a new department',
                data: {
                    departmentId: event.departmentId,
                    organizationId: event.organizationId,
                },
                organizationId: event.organizationId,
                priority: 'MEDIUM', // Changed from 'NORMAL' to 'MEDIUM'
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleMemberRemoved(event) {
        // Create audit log
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.MEMBER_REMOVED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
            },
        });
        // Notify user
        const user = await this.usersService.findById(event.userId);
        if (user) {
            const notification = {
                userId: user.id,
                type: 'DEPARTMENT_UNASSIGNMENT',
                title: 'Department Unassignment',
                message: 'You have been removed from a department',
                data: {
                    departmentId: event.departmentId,
                    organizationId: event.organizationId,
                },
                organizationId: event.organizationId,
                priority: 'MEDIUM', // Changed from 'NORMAL' to 'MEDIUM'
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleMemberTransferred(event) {
        // Create audit log
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.MEMBER_TRANSFERRED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
                previousDepartmentId: event.previousDepartmentId,
            },
        });
        // Notify user
        const user = await this.usersService.findById(event.userId);
        if (user) {
            const notification = {
                userId: user.id,
                type: 'DEPARTMENT_TRANSFER',
                title: 'Department Transfer',
                message: 'You have been transferred to a different department',
                data: {
                    departmentId: event.departmentId,
                    previousDepartmentId: event.previousDepartmentId,
                    organizationId: event.organizationId,
                },
                organizationId: event.organizationId,
                priority: 'MEDIUM', // Changed from 'NORMAL' to 'MEDIUM'
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleManagerChanged(event) {
        // Create audit log
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.MANAGER_CHANGED,
            performedById: event.performedById,
            affectedUserId: event.newManagerId,
            metadata: {
                previousManagerId: event.previousManagerId,
            },
        });
        // Notify new manager
        const newManagerNotification = {
            userId: event.newManagerId,
            type: 'DEPARTMENT_MANAGER_ASSIGNMENT',
            title: 'Department Manager Assignment',
            message: 'You have been assigned as a department manager',
            data: {
                departmentId: event.departmentId,
                organizationId: event.organizationId,
            },
            organizationId: event.organizationId,
            priority: 'MEDIUM', // Changed from 'NORMAL' to 'MEDIUM'
        };
        await this.notificationsService.send(newManagerNotification);
        // Notify previous manager if exists
        if (event.previousManagerId) {
            const previousManagerNotification = {
                userId: event.previousManagerId,
                type: 'DEPARTMENT_MANAGER_UNASSIGNMENT',
                title: 'Department Manager Unassignment',
                message: 'You are no longer the manager of a department',
                data: {
                    departmentId: event.departmentId,
                    organizationId: event.organizationId,
                },
                organizationId: event.organizationId,
                priority: 'MEDIUM', // Changed from 'NORMAL' to 'MEDIUM'
            };
            await this.notificationsService.send(previousManagerNotification);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('department.member.added'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberAdded", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.member.removed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberRemoved", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.member.transferred'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberTransferred", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.manager.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleManagerChanged", null);
DepartmentAssignmentListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_audit_service_1.DepartmentAuditService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], DepartmentAssignmentListener);
exports.DepartmentAssignmentListener = DepartmentAssignmentListener;
//# sourceMappingURL=department-assignment.listener.js.map