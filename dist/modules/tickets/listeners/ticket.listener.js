"use strict";
// src/modules/tickets/listeners/ticket.listener.ts
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
exports.TicketListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const ticket_entity_1 = require("../entities/ticket.entity");
const ticket_activity_service_1 = require("../services/ticket-activity.service");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const create_notification_dto_1 = require("../../notifications/dto/create-notification.dto");
const users_service_1 = require("../../users/services/users.service");
const role_enum_1 = require("../../users/enums/role.enum");
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
        // For the activity, just record the status without the reason
        await this.activityService.recordActivity({
            ticketId: ticket.id,
            organizationId: ticket.organizationId,
            userId: ticket.escalatedById || '',
            action: 'ESCALATED',
            details: { status: ticket.status },
        });
        // Find admin users based on their role
        const adminUsers = await this.findAdminUsers(ticket.organizationId);
        // Only proceed if we found admin users
        if (adminUsers.length > 0) {
            await this.notificationsService.create({
                type: create_notification_dto_1.NotificationType.TICKET_ESCALATED,
                title: 'Ticket Escalated',
                content: `Ticket #${ticket.referenceNumber} has been escalated: ${reason}`,
                priority: create_notification_dto_1.NotificationPriority.HIGH,
                // Use explicit typing for admin parameter
                recipients: adminUsers.map((admin) => ({ userId: admin.id })),
                organizationId: ticket.organizationId,
                senderId: ticket.escalatedById || '',
            });
        }
    }
    // Helper method to find admin users using the UsersService
    async findAdminUsers(organizationId) {
        try {
            // Use the findAll method with appropriate query parameters
            const result = await this.usersService.findAll({
                organizationId,
                role: role_enum_1.Role.ADMIN,
                isActive: true,
                page: 1,
                limit: 50
            });
            // Map the paginated result items to the AdminUser interface
            return result.items.map(user => ({ id: user.id }));
        }
        catch (error) {
            console.error('Error finding admin users:', error);
            return [];
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_entity_1.Ticket]),
    __metadata("design:returntype", Promise)
], TicketListener.prototype, "handleTicketCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.escalated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketListener.prototype, "handleTicketEscalated", null);
TicketListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ticket_activity_service_1.TicketActivityService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], TicketListener);
exports.TicketListener = TicketListener;
//# sourceMappingURL=ticket.listener.js.map