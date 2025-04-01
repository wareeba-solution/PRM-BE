var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DepartmentAuditService } from '../services/department-audit.service';
import { DepartmentAuditAction } from '../entities/department-audit-log.entity';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UsersService } from '../../users/services/users.service';
let DepartmentAssignmentListener = class DepartmentAssignmentListener {
    constructor(auditService, notificationsService, usersService) {
        this.auditService = auditService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleMemberAdded(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.MEMBER_ADDED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
            },
        });
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
                priority: 'MEDIUM',
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleMemberRemoved(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.MEMBER_REMOVED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
            },
        });
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
                priority: 'MEDIUM',
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleMemberTransferred(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.MEMBER_TRANSFERRED,
            performedById: event.performedById,
            affectedUserId: event.userId,
            metadata: {
                action: event.action,
                previousDepartmentId: event.previousDepartmentId,
            },
        });
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
                priority: 'MEDIUM',
            };
            await this.notificationsService.send(notification);
        }
    }
    async handleManagerChanged(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.MANAGER_CHANGED,
            performedById: event.performedById,
            affectedUserId: event.newManagerId,
            metadata: {
                previousManagerId: event.previousManagerId,
            },
        });
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
            priority: 'MEDIUM',
        };
        await this.notificationsService.send(newManagerNotification);
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
                priority: 'MEDIUM',
            };
            await this.notificationsService.send(previousManagerNotification);
        }
    }
};
__decorate([
    OnEvent('department.member.added'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberAdded", null);
__decorate([
    OnEvent('department.member.removed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberRemoved", null);
__decorate([
    OnEvent('department.member.transferred'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleMemberTransferred", null);
__decorate([
    OnEvent('department.manager.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAssignmentListener.prototype, "handleManagerChanged", null);
DepartmentAssignmentListener = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DepartmentAuditService,
        NotificationsService,
        UsersService])
], DepartmentAssignmentListener);
export { DepartmentAssignmentListener };
//# sourceMappingURL=department-assignment.listener.js.map