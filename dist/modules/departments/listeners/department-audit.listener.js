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
exports.DepartmentAuditListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const department_audit_service_1 = require("../services/department-audit.service");
const department_audit_log_entity_1 = require("../entities/department-audit-log.entity");
let DepartmentAuditListener = class DepartmentAuditListener {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async handleDepartmentCreated(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.CREATED,
            performedById: event.createdById,
            request: event.request,
        });
    }
    async handleDepartmentUpdated(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
            performedById: event.updatedById,
            changes: event.changes,
            request: event.request,
        });
    }
    async handleDepartmentDeleted(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.DELETED,
            performedById: event.deletedById,
            request: event.request,
        });
    }
    async handleDepartmentMoved(event) {
        await this.auditService.log({
            departmentId: event.departmentId,
            organizationId: event.organizationId,
            action: department_audit_log_entity_1.DepartmentAuditAction.MOVED,
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
            action: department_audit_log_entity_1.DepartmentAuditAction.REORDERED,
            performedById: event.performedById,
            metadata: {
                newOrder: event.newOrder,
            },
            request: event.request,
        });
    }
    async handleBulkUpdate(event) {
        // Create separate audit logs for each department affected
        for (const departmentId of event.departmentIds) {
            await this.auditService.log({
                departmentId,
                organizationId: event.organizationId,
                action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
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
            action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
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
            action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
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
            action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
            performedById: event.performedById,
            metadata: Object.assign({ accessUpdate: true }, event.changes),
            request: event.request,
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('department.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentDeleted", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.moved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentMoved", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.reordered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleDepartmentReordered", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.bulk_update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleBulkUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.hierarchy.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleHierarchyChanged", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.settings.updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleSettingsUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('department.access.modified'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentAuditListener.prototype, "handleAccessModified", null);
DepartmentAuditListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_audit_service_1.DepartmentAuditService])
], DepartmentAuditListener);
exports.DepartmentAuditListener = DepartmentAuditListener;
//# sourceMappingURL=department-audit.listener.js.map