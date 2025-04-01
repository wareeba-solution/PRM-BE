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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, BadRequestException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { NotificationQueryDto } from '../dto/notification-query.dto';
import { NotificationPreferencesDto } from '../dto/notification-preferences.dto';
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async create(createNotificationDto, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.create(Object.assign(Object.assign({}, createNotificationDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
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
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUnreadCount(req.user.id);
    }
    async findOne(id, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        const notification = await this.notificationsService.getNotificationById(id, req.organization.id, req.user.id);
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        return notification;
    }
    async update(id, updateNotificationDto, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.updateNotification(id, Object.assign(Object.assign({}, updateNotificationDto), { organizationId: req.organization.id }));
    }
    async remove(id, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        await this.notificationsService.updateNotification(id, { isDeleted: true, organizationId: req.organization.id });
    }
    async markAsRead(id, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.markAsRead(id, req.user.id);
    }
    async markAllAsRead(req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.markAllAsRead(req.user.id);
    }
    async getPreferences(req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUserPreferences(req.organization.id, req.user.id);
    }
    async updatePreferences(preferencesDto, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.getUserPreferences(req.organization.id, req.user.id);
    }
    async sendTestNotification(data, req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.sendNotification(req.user.id, data.type, Object.assign(Object.assign({}, data), { organizationId: req.organization.id, userId: req.user.id }));
    }
    async getChannels(req) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }
        return this.notificationsService.getNotificationChannels(req.organization.id, req.user.id);
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Create new notification' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Notification created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Get user notifications' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return user notifications' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NotificationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    Get('unread'),
    ApiOperation({ summary: 'Get unread notifications count' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return unread notifications count' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUnreadCount", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get notification by id' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return notification details' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: 'Update notification' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Notification updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: 'Delete notification' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Notification deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "remove", null);
__decorate([
    Post(':id/mark-read'),
    ApiOperation({ summary: 'Mark notification as read' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Notification marked as read' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    Post('mark-all-read'),
    ApiOperation({ summary: 'Mark all notifications as read' }),
    ApiResponse({ status: HttpStatus.OK, description: 'All notifications marked as read' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    Get('preferences'),
    ApiOperation({ summary: 'Get notification preferences' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return notification preferences' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getPreferences", null);
__decorate([
    Put('preferences'),
    ApiOperation({ summary: 'Update notification preferences' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Preferences updated successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NotificationPreferencesDto, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "updatePreferences", null);
__decorate([
    Post('test'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Send test notification' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Test notification sent successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendTestNotification", null);
__decorate([
    Get('channels'),
    ApiOperation({ summary: 'Get available notification channels' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return available channels' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getChannels", null);
NotificationsController = __decorate([
    ApiTags('Notifications'),
    Controller('notifications'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [NotificationsService])
], NotificationsController);
export { NotificationsController };
//# sourceMappingURL=notifications.controller.js.map