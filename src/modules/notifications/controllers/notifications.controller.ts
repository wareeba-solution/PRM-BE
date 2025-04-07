// src/modules/notifications/controllers/notifications.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
    HttpStatus,
    ParseUUIDPipe,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { NotificationQueryDto } from '../dto/notification-query.dto';
import { NotificationPreferencesDto } from '../dto/notification-preferences.dto';
import { CustomRequest } from '../../../interfaces/request.interface';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.STAFF)
    async create(
        @Body() createNotificationDto: CreateNotificationDto,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.create({
            ...createNotificationDto,
            organizationId: req.organization.id,
            senderId: req.user.id,
        });
    }

    @Get()
    async findAll(
        @Query() query: NotificationQueryDto,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        // Create a clean query object with explicitly declared properties
        const notificationQuery: NotificationQueryDto = {
            skip: query.skip,
            take: query.take,
            includeRead: query.includeRead,
            organizationId: req.organization.id,
        };

        return this.notificationsService.getUserNotifications(
            req.user.id,
            notificationQuery
        );
    }

    @Get('unread')
    async getUnreadCount(
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.getUnreadCount(req.user.id);
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        const notification = await this.notificationsService.getNotificationById(
            id,
            req.organization.id,
            req.user.id,
        );
        
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        
        return notification;
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateNotificationDto: UpdateNotificationDto,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.updateNotification(id, {
            ...updateNotificationDto,
            organizationId: req.organization.id,
        });
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        await this.notificationsService.updateNotification(
            id,
            { isDeleted: true, organizationId: req.organization.id },
        );
    }

    @Post(':id/mark-read')
    async markAsRead(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.markAsRead(
            id,
            req.user.id,
        );
    }

    @Post('mark-all-read')
    async markAllAsRead(
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.markAllAsRead(req.user.id);
    }

    @Get('preferences')
    async getPreferences(
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.getUserPreferences(
            req.organization.id,
            req.user.id,
        );
    }

    @Put('preferences')
    async updatePreferences(
        @Body() preferencesDto: NotificationPreferencesDto,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.getUserPreferences(
            req.organization.id,
            req.user.id,
        );
    }

    @Post('test')
    @Roles(Role.ADMIN)
    async sendTestNotification(
        @Body() data: { type: string },
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.sendNotification(
            req.user.id,
            data.type,
            {
                ...data,
                organizationId: req.organization.id,
                userId: req.user.id,
            }
        );
    }

    @Get('channels')
    async getChannels(
        @Request() req: CustomRequest,
    ) {
        if (!req.organization || !req.user) {
            throw new BadRequestException('User or organization not found');
        }

        return this.notificationsService.getNotificationChannels(
            req.organization.id,
            req.user.id,
        );
    }
}