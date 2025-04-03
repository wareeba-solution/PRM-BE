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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/notifications/controllers/notifications.controller.ts
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const notifications_service_1 = require("../services/notifications.service");
const create_notification_dto_1 = require("../dto/create-notification.dto");
const update_notification_dto_1 = require("../dto/update-notification.dto");
const notification_query_dto_1 = require("../dto/notification-query.dto");
const notification_preferences_dto_1 = require("../dto/notification-preferences.dto");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async create(createNotificationDto, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.create(Object.assign(Object.assign({}, createNotificationDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        // Create a clean query object with explicitly declared properties
        const notificationQuery = {
            skip: query.skip,
            take: query.take,
            includeRead: query.includeRead,
            organizationId: req.organization.id,
        };
        return this.notificationsService.getUserNotifications(req.user.id, notificationQuery);
    }
    async getUnreadCount(req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUnreadCount(req.user.id);
    }
    async findOne(id, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        const notification = await this.notificationsService.getNotificationById(id, req.organization.id, req.user.id);
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return notification;
    }
    async update(id, updateNotificationDto, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.updateNotification(id, Object.assign(Object.assign({}, updateNotificationDto), { organizationId: req.organization.id }));
    }
    async remove(id, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        await this.notificationsService.updateNotification(id, { isDeleted: true, organizationId: req.organization.id });
    }
    async markAsRead(id, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.markAsRead(id, req.user.id);
    }
    async markAllAsRead(req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.markAllAsRead(req.user.id);
    }
    async getPreferences(req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUserPreferences(req.organization.id, req.user.id);
    }
    async updatePreferences(preferencesDto, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUserPreferences(req.organization.id, req.user.id);
    }
    async sendTestNotification(data, req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.sendNotification(req.user.id, data.type, Object.assign(Object.assign({}, data), { organizationId: req.organization.id, userId: req.user.id }));
    }
    async getChannels(req) {
        if (!req.organization || !req.user) {
            throw new common_1.BadRequestException('User or organization not found');
        }
        return this.notificationsService.getNotificationChannels(req.organization.id, req.user.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Create new notification' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Notification created successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user notifications' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return user notifications' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_query_dto_1.NotificationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread notifications count' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return unread notifications count' }),
    openapi.ApiResponse({ status: 200, type: Number }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification by id' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return notification details' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/notification.entity").Notification }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update notification' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Notification updated successfully' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/notification.entity").Notification }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_dto_1.UpdateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete notification' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Notification deleted successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/mark-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark notification as read' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Notification marked as read' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)('mark-all-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'All notifications marked as read' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Get)('preferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification preferences' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return notification preferences' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getPreferences", null);
__decorate([
    (0, common_1.Put)('preferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Update notification preferences' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Preferences updated successfully' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_preferences_dto_1.NotificationPreferencesDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Send test notification' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Test notification sent successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendTestNotification", null);
__decorate([
    (0, common_1.Get)('channels'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available notification channels' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return available channels' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getChannels", null);
NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('Notifications'),
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map