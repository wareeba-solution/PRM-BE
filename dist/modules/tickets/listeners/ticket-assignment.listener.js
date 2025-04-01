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
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UsersService } from '../../users/services/users.service';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
let TicketAssignmentListener = class TicketAssignmentListener {
    constructor(ticketRepository, activityRepository, notificationsService, usersService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleTicketAssigned(event) {
        await this.createAssignmentActivity(event);
        await this.sendAssignmentNotifications(event);
    }
    async createAssignmentActivity(event) {
        const activity = this.activityRepository.create({
            ticketId: event.ticketId,
            type: TicketActivityType.ASSIGNED,
            metadata: {
                previousAssigneeId: event.previousAssigneeId,
                newAssigneeId: event.newAssigneeId,
                assignedById: event.assignedById
            }
        });
        await this.activityRepository.save(activity);
    }
    async sendAssignmentNotifications(event) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: event.ticketId },
            relations: ['organization']
        });
        if (!ticket)
            return;
        if (event.newAssigneeId) {
            const newAssignee = await this.usersService.findById(event.newAssigneeId);
            if (newAssignee) {
                await this.notificationsService.send({
                    userId: newAssignee.id,
                    type: 'TICKET_ASSIGNED',
                    title: `Ticket #${ticket.id} Assigned to You`,
                    message: `You have been assigned to ticket: ${ticket.title}`,
                    data: {
                        ticketId: ticket.id,
                        organizationId: ticket.organizationId
                    }
                });
            }
        }
        if (event.previousAssigneeId) {
            const previousAssignee = await this.usersService.findById(event.previousAssigneeId);
            if (previousAssignee) {
                await this.notificationsService.send({
                    userId: previousAssignee.id,
                    type: 'TICKET_UNASSIGNED',
                    title: `Ticket #${ticket.id} Reassigned`,
                    message: `You have been unassigned from ticket: ${ticket.title}`,
                    data: {
                        ticketId: ticket.id,
                        organizationId: ticket.organizationId
                    }
                });
            }
        }
    }
    async handleAutoAssignment(payload) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: payload.ticketId }
        });
        if (!ticket || ticket.assigneeId)
            return;
        const availableAgent = await this.findAvailableAgent(payload.organizationId, payload.priority);
        if (availableAgent) {
            await this.ticketRepository.update(payload.ticketId, {
                assigneeId: availableAgent.id
            });
            await this.handleTicketAssigned({
                ticketId: payload.ticketId,
                newAssigneeId: availableAgent.id,
                assignedById: 'SYSTEM'
            });
        }
    }
    async findAvailableAgent(organizationId, priority) {
        const supportAgents = await this.usersService.findByRole('SUPPORT', organizationId);
        if (!supportAgents || supportAgents.length === 0) {
            return null;
        }
        return supportAgents[0];
    }
    async handleAgentAvailabilityChange(payload) {
        if (!payload.isAvailable) {
            const assignedTickets = await this.ticketRepository.find({
                where: {
                    assigneeId: payload.userId,
                    status: In(['OPEN', 'IN_PROGRESS'])
                }
            });
            for (const ticket of assignedTickets) {
                await this.handleAutoAssignment({
                    ticketId: ticket.id,
                    organizationId: ticket.organizationId,
                    priority: ticket.priority
                });
            }
        }
    }
};
__decorate([
    OnEvent('ticket.assigned'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleTicketAssigned", null);
__decorate([
    OnEvent('ticket.auto_assignment.needed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAutoAssignment", null);
__decorate([
    OnEvent('user.availability.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAgentAvailabilityChange", null);
TicketAssignmentListener = __decorate([
    Injectable(),
    __param(0, InjectRepository(Ticket)),
    __param(1, InjectRepository(TicketActivity)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        NotificationsService,
        UsersService])
], TicketAssignmentListener);
export { TicketAssignmentListener };
//# sourceMappingURL=ticket-assignment.listener.js.map