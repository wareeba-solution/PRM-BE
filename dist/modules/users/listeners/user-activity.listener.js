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
var UserActivityListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_activity_service_1 = require("../services/user-activity.service");
let UserActivityListener = UserActivityListener_1 = class UserActivityListener {
    constructor(activityService) {
        this.activityService = activityService;
        this.logger = new common_1.Logger(UserActivityListener_1.name);
    }
    async handleUserLogin(event) {
        var _a, _b, _c;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: user_activity_service_1.ActivityType.LOGIN,
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
            type: user_activity_service_1.ActivityType.LOGOUT,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handlePasswordChange(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: user_activity_service_1.ActivityType.PASSWORD_CHANGE,
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
            type: user_activity_service_1.ActivityType.PROFILE_UPDATE,
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
            type: user_activity_service_1.ActivityType.MFA_ENABLED,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleMfaDisabled(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: user_activity_service_1.ActivityType.MFA_DISABLED,
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
    async handleRoleChange(event) {
        var _a, _b;
        await this.activityService.logActivity({
            userId: event.userId,
            organizationId: event.organizationId,
            type: user_activity_service_1.ActivityType.ROLE_CHANGE,
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
            type: user_activity_service_1.ActivityType.DEPARTMENT_ASSIGNMENT,
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
            type: user_activity_service_1.ActivityType.PERMISSION_CHANGE,
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
            type: user_activity_service_1.ActivityType.EXPORT_DATA,
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
            type: user_activity_service_1.ActivityType.BULK_ACTION,
            metadata: Object.assign({ action: event.action, targetIds: event.targetIds }, event.metadata),
            ip: (_a = event.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = event.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('user.login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleUserLogin", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleUserLogout", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.password_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handlePasswordChange", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.profile_update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleProfileUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.mfa.enabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleMfaEnabled", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.mfa.disabled'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleMfaDisabled", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.role_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleRoleChange", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.department_assignment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleDepartmentAssignment", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.permission_change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handlePermissionChange", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.data_export'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleDataExport", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.bulk_action'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityListener.prototype, "handleBulkAction", null);
UserActivityListener = UserActivityListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_activity_service_1.UserActivityService])
], UserActivityListener);
exports.UserActivityListener = UserActivityListener;
//# sourceMappingURL=user-activity.listener.js.map