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
import { TicketsService } from '../services/tickets.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UsersService } from '../../users/services/users.service';
import { Role } from '../../users/enums/role.enum';
let TicketEscalationListener = class TicketEscalationListener {
    constructor(ticketsService, notificationsService, usersService) {
        this.ticketsService = ticketsService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleSlaBreachEvent(payload) {
        const { ticketId, organizationId, slaType, elapsedTime } = payload;
        const ticket = await this.ticketsService.findOne(ticketId, organizationId);
        const admins = await this.findAdmins(organizationId);
        if (admins.length === 0) {
            console.warn('No admins to notify for SLA breach');
            return;
        }
        const typeMessage = slaType === 'response'
            ? 'Response time SLA breached'
            : 'Resolution time SLA breached';
        const formattedTime = this.formatElapsedTime(elapsedTime);
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
        const ticket = await this.ticketsService.findOne(ticketId, organizationId);
        const admins = await this.findAdmins(organizationId);
        if (admins.length === 0) {
            console.warn('No admins to notify for escalation level change');
            return;
        }
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
    async findAdmins(organizationId) {
        try {
            const result = await this.usersService.findAll({
                organizationId,
                role: Role.ADMIN,
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
    OnEvent('ticket.sla.breach'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketEscalationListener.prototype, "handleSlaBreachEvent", null);
__decorate([
    OnEvent('ticket.escalation.levelchanged'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketEscalationListener.prototype, "handleEscalationLevelChanged", null);
TicketEscalationListener = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TicketsService,
        NotificationsService,
        UsersService])
], TicketEscalationListener);
export { TicketEscalationListener };
//# sourceMappingURL=ticket-escalation.listener.js.map