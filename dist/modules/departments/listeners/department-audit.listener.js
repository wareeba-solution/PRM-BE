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
let DepartmentAuditListener = class DepartmentAuditListener {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async handleDepartmentCreated(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.CREATED,
            performedById: event.createdById,
            request: event.request,
        });
    }
    async handleDepartmentUpdated(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.UPDATED,
            performedById: event.updatedById,
            changes: event.changes,
            request: event.request,
        });
    }
    async handleDepartmentDeleted(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.DELETED,
            performedById: event.deletedById,
            request: event.request,
        });
    }
    async handleDepartmentMoved(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.MOVED,
            performedById: event.performedById,
            metadata: {
                previousParentId: event.previousParentId,
                newParentId: event.newParentId,
            },
            request: event.request,
        });
    }
    async handleDepartmentReordered(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.REORDERED,
            performedById: event.performedById,
            metadata: {
                newOrder: event.newOrder,
            },
            request: event.request,
        });
    }
    async handleBulkUpdate(event) {
        for (const departmentId of event.departmentIds) {
            await this.auditService.log({
                departmentId,
                organizationId: event.organizationId,
                action: DepartmentAuditAction.UPDATED,
                performedById: event.performedById,
                changes: event.changes,
                metadata: {
                    bulkUpdate: true,
                    totalDepartments: event.departmentIds.length,
                },
                request: event.request,
            });
        }
    }
    async handleHierarchyChanged(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.UPDATED,
            performedById: event.performedById,
            changes: event.changes,
            metadata: {
                hierarchyUpdate: true,
            },
            request: event.request,
        });
    }
    async handleSettingsUpdated(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.UPDATED,
            performedById: event.performedById,
            changes: event.changes,
            metadata: {
                settingsUpdate: true,
            },
            request: event.request,
        });
    }
    async handleAccessModified(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: DepartmentAuditAction.UPDATED,
            performedById: event.performedById,
            metadata: Object.assign({ accessUpdate: true }, event.changes),
            request: event.request,
        });
    }
};
__decorate([
    OnEvent('department.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentCreated", null);
__decorate([
    OnEvent('department.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentUpdated", null);
__decorate([
    OnEvent('department.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentDeleted", null);
__decorate([
    OnEvent('department.moved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentMoved", null);
__decorate([
    OnEvent('department.reordered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentReordered", null);
__decorate([
    OnEvent('department.bulk_update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleBulkUpdate", null);
__decorate([
    OnEvent('department.hierarchy.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleHierarchyChanged", null);
__decorate([
    OnEvent('department.settings.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleSettingsUpdated", null);
__decorate([
    OnEvent('department.access.modified'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleAccessModified", null);
DepartmentAuditListener = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DepartmentAuditService])
], DepartmentAuditListener);
export { DepartmentAuditListener };
//# sourceMappingURL=department-audit.listener.js.map