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
import { Ticket } from '../entities/ticket.entity';
import { TicketActivityService } from '../services/ticket-activity.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { NotificationPriority, NotificationType } from '@/modules/notifications/dto/create-notification.dto';
import { UsersService } from '../../users/services/users.service';
import { Role } from '../../users/enums/role.enum';
let TicketListener = class TicketListener {
    constructor(activityService, notificationsService, usersService) {
        this.activityService = activityService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleTicketCreated(ticket) {
        await this.activityService.recordActivity({
            ticketId: ticket.id,
            organizationId: ticket.organizationId,
            userId: ticket.createdById,
            action: 'CREATED',
            details: { status: ticket.status },
        });
        if (ticket.assigneeId) {
            await this.notificationsService.create({
                type: 'TICKET_ASSIGNED',
                title: 'New Ticket Assigned',
                content: `Ticket #${ticket.referenceNumber} has been assigned to you`,
                recipients: [{ userId: ticket.assigneeId }],
                organizationId: ticket.organizationId,
                senderId: ticket.createdById,
            });
        }
    }
    async handleTicketEscalated(payload) {
        const { ticket, reason } = payload;
        await this.activityService.recordActivity({
            ticketId: ticket.id,
            organizationId: ticket.organizationId,
            userId: ticket.escalatedById || '',
            action: 'ESCALATED',
            details: { status: ticket.status },
        });
        const adminUsers = await this.findAdminUsers(ticket.organizationId);
        if (adminUsers.length > 0) {
            await this.notificationsService.create({
                type: NotificationType.TICKET_ESCALATED,
                title: 'Ticket Escalated',
                content: `Ticket #${ticket.referenceNumber} has been escalated: ${reason}`,
                priority: NotificationPriority.HIGH,
                recipients: adminUsers.map((admin) => ({ userId: admin.id })),
                organizationId: ticket.organizationId,
                senderId: ticket.escalatedById || '',
            });
        }
    }
    async findAdminUsers(organizationId) {
        try {
            const result = await this.usersService.findAll({
                organizationId,
                role: Role.ADMIN,
                isActive: true,
                page: 1,
                limit: 50
            });
            return result.items.map(user => ({ id: user.id }));
        }
        catch (error) {
            console.error('Error finding admin users:', error);
            return [];
        }
    }
};
__decorate([
    OnEvent('ticket.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Ticket]),
    __metadata("design:returntype", Promise)
], TicketListener.prototype, "handleTicketCreated", null);
__decorate([
    OnEvent('ticket.escalated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketListener.prototype, "handleTicketEscalated", null);
TicketListener = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TicketActivityService,
        NotificationsService,
        UsersService])
], TicketListener);
export { TicketListener };
//# sourceMappingURL=ticket.listener.js.map