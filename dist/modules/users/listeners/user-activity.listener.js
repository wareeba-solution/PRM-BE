var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserActivityListener_1;
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivityService, ActivityType } from '../services/user-activity.service';
let UserActivityListener = UserActivityListener_1 = class UserActivityListener {
    constructor(activityService) {
        this.activityService = activityService;
        this.logger = new Logger(UserActivityListener_1.name);
    }
    async handleUserLogin(event) {
        var _a, _b, _c;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.LOGIN,
            status: event.status,
            failureReason: event.failureReason,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
            referrer: (_c = event.request) === null || _c === void 0 ? void 0 : _c.headers.referer,
        });
    }
    async handleUserLogout(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.LOGOUT,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handlePasswordChange(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.PASSWORD_CHANGE,
            status: event.status,
            failureReason: event.failureReason,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleProfileUpdate(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.PROFILE_UPDATE,
            metadata: { changes: event.changes },
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleMfaEnabled(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.MFA_ENABLED,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleMfaDisabled(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.MFA_DISABLED,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleRoleChange(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.ROLE_CHANGE,
            metadata: {
                oldRole: event.oldRole,
                newRole: event.newRole,
                changedBy: event.changedBy,
            },
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleDepartmentAssignment(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.DEPARTMENT_ASSIGNMENT,
            metadata: {
                departmentId: event.departmentId,
                action: event.action,
                performedBy: event.performedBy,
            },
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handlePermissionChange(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.PERMISSION_CHANGE,
            metadata: {
                changes: event.changes,
                performedBy: event.performedBy,
            },
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleDataExport(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.EXPORT_DATA,
            metadata: {
                exportType: event.exportType,
                dataTypes: event.dataTypes,
            },
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleBulkAction(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: ActivityType.BULK_ACTION,
            metadata: Object.assign({ action: event.action, targetIds: event.targetIds }, event.metadata),
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
};
__decorate([
    OnEvent('user.login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleUserLogin", null);
__decorate([
    OnEvent('user.logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleUserLogout", null);
__decorate([
    OnEvent('user.password_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handlePasswordChange", null);
__decorate([
    OnEvent('user.profile_update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleProfileUpdate", null);
__decorate([
    OnEvent('user.mfa.enabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleMfaEnabled", null);
__decorate([
    OnEvent('user.mfa.disabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleMfaDisabled", null);
__decorate([
    OnEvent('user.role_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleRoleChange", null);
__decorate([
    OnEvent('user.department_assignment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleDepartmentAssignment", null);
__decorate([
    OnEvent('user.permission_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handlePermissionChange", null);
__decorate([
    OnEvent('user.data_export'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleDataExport", null);
__decorate([
    OnEvent('user.bulk_action'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleBulkAction", null);
UserActivityListener = UserActivityListener_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserActivityService])
], UserActivityListener);
export { UserActivityListener };
//# sourceMappingURL=user-activity.listener.js.map