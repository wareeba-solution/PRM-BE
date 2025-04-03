"use strict";
// src/modules/tickets/listeners/ticket-escalation.listener.ts
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
exports.TicketEscalationListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const tickets_service_1 = require("../services/tickets.service");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const users_service_1 = require("../../users/services/users.service");
const role_enum_1 = require("../../users/enums/role.enum");
let TicketEscalationListener = class TicketEscalationListener {
    constructor(ticketsService, notificationsService, usersService) {
        this.ticketsService = ticketsService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleSlaBreachEvent(payload) {
        const { ticketId, organizationId, slaType, elapsedTime } = payload;
        // Get ticket details
        const ticket = await this.ticketsService.findOne(ticketId, organizationId);
        // Find admins to notify
        const admins = await this.findAdmins(organizationId);
        if (admins.length === 0) {
            console.warn('No admins to notify for SLA breach');
            return;
        }
        // Create type message based on SLA type
        const typeMessage = slaType === 'response'
            ? 'Response time SLA breached'
            : 'Resolution time SLA breached';
        // Format elapsed time for human-readable display
        const formattedTime = this.formatElapsedTime(elapsedTime);
        // Notify each admin
        for (const admin of admins) {
            await this.notificationsService.create({
                type: 'SLA_BREACH',
                title: `${typeMessage} for Ticket #${ticket.referenceNumber}`,
                content: `${typeMessage} (${formattedTime}) for Ticket #${ticket.referenceNumber}`,
                priority: 'HIGH',
                recipients: [{ userId: admin.id }],
                organizationId: organizationId,
                senderId: 'system'
            });
        }
    }
    async handleEscalationLevelChanged(payload) {
        const { ticketId, organizationId, previousLevel, newLevel } = payload;
        // Get ticket details
        const ticket = await this.ticketsService.findOne(ticketId, organizationId);
        // Find admins to notify
        const admins = await this.findAdmins(organizationId);
        if (admins.length === 0) {
            console.warn('No admins to notify for escalation level change');
            return;
        }
        // Notify each admin
        for (const admin of admins) {
            await this.notificationsService.create({
                type: 'ESCALATION_LEVEL_CHANGED',
                title: `Ticket #${ticket.referenceNumber} Escalation Level Changed`,
                content: `Ticket #${ticket.referenceNumber} escalation level changed from ${previousLevel} to ${newLevel}`,
                priority: 'MEDIUM',
                recipients: [{ userId: admin.id }],
                organizationId: organizationId,
                senderId: 'system'
            });
        }
    }
    // Helper method to find admins in the organization
    async findAdmins(organizationId) {
        try {
            const result = await this.usersService.findAll({
                organizationId,
                role: role_enum_1.Role.ADMIN,
                isActive: true,
                page: 1,
                limit: 50
            });
            return result.items;
        }
        catch (error) {
            console.error('Error finding admin users:', error);
            return [];
        }
    }
    // Helper method to format elapsed time
    formatElapsedTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        }
        else {
            return `${seconds}s`;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.sla.breach'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketEscalationListener.prototype, "handleSlaBreachEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.escalation.levelchanged'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketEscalationListener.prototype, "handleEscalationLevelChanged", null);
TicketEscalationListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], TicketEscalationListener);
exports.TicketEscalationListener = TicketEscalationListener;
//# sourceMappingURL=ticket-escalation.listener.js.map