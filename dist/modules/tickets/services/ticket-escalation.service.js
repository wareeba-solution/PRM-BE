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
var TicketEscalationService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { OrganizationsService } from '../../organizations/services/organizations.service';
let TicketEscalationService = TicketEscalationService_1 = class TicketEscalationService {
    constructor(ticketRepository, activityRepository, notificationsService, organizationsService, configService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.organizationsService = organizationsService;
        this.configService = configService;
        this.logger = new Logger(TicketEscalationService_1.name);
        this.escalationRules = {
            HIGH: {
                priority: 'HIGH',
                responseTime: 1,
                resolutionTime: 4,
                escalationLevels: [
                    {
                        level: 1,
                        timeThreshold: 1,
                        notifyRoles: ['SUPERVISOR']
                    },
                    {
                        level: 2,
                        timeThreshold: 2,
                        notifyRoles: ['MANAGER']
                    },
                    {
                        level: 3,
                        timeThreshold: 4,
                        notifyRoles: ['DIRECTOR']
                    }
                ]
            },
            MEDIUM: {
                priority: 'MEDIUM',
                responseTime: 4,
                resolutionTime: 24,
                escalationLevels: [
                    {
                        level: 1,
                        timeThreshold: 4,
                        notifyRoles: ['SUPERVISOR']
                    },
                    {
                        level: 2,
                        timeThreshold: 8,
                        notifyRoles: ['MANAGER']
                    }
                ]
            },
            LOW: {
                priority: 'LOW',
                responseTime: 24,
                resolutionTime: 72,
                escalationLevels: [
                    {
                        level: 1,
                        timeThreshold: 24,
                        notifyRoles: ['SUPERVISOR']
                    }
                ]
            }
        };
    }
    async checkTicketsForEscalation() {
        const unresolved = await this.ticketRepository.find({
            where: {
                status: In([TicketStatus.OPEN, TicketStatus.IN_PROGRESS])
            },
            relations: ['assignee', 'organization', 'activities']
        });
        for (const ticket of unresolved) {
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            if (currentLevel < 3) {
                await this.checkTicketEscalation(ticket);
            }
        }
    }
    getCurrentEscalationLevel(ticket) {
        var _a, _b;
        const escalationActivities = ((_a = ticket.activities) === null || _a === void 0 ? void 0 : _a.filter(activity => activity.type === TicketActivityType.ESCALATION)) || [];
        if (escalationActivities.length > 0) {
            const latestEscalation = escalationActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
            return ((_b = latestEscalation.metadata) === null || _b === void 0 ? void 0 : _b.newLevel) || 0;
        }
        return 0;
    }
    async checkTicketEscalation(ticket) {
        const rule = this.escalationRules[ticket.priority];
        if (!rule)
            return;
        const timeElapsed = this.getHoursElapsed(ticket.createdAt);
        const currentLevel = this.getCurrentEscalationLevel(ticket);
        const nextEscalation = rule.escalationLevels.find(level => level.level === currentLevel + 1 && timeElapsed >= level.timeThreshold);
        if (nextEscalation) {
            await this.escalateTicket(ticket, nextEscalation);
        }
    }
    async escalateTicket(ticket, escalation) {
        try {
            const activityData = {
                ticket,
                type: TicketActivityType.ESCALATION,
                metadata: {
                    description: `Ticket escalated to level ${escalation.level}`,
                    previousLevel: this.getCurrentEscalationLevel(ticket),
                    newLevel: escalation.level,
                    reason: 'SLA breach'
                }
            };
            const activity = this.activityRepository.create(activityData);
            await this.activityRepository.save(activity);
            await this.notifyEscalation(ticket, escalation);
        }
        catch (error) {
            this.logger.error(`Failed to escalate ticket ${ticket.id}:`, error);
        }
    }
    async notifyEscalation(ticket, escalation) {
        try {
            const staff = await this.getOrganizationStaffByRoles(ticket.organizationId, escalation.notifyRoles);
            for (const user of staff) {
                await this.notificationsService.send({
                    userId: user.id,
                    type: 'TICKET_ESCALATION',
                    title: `Ticket #${ticket.id} Escalated`,
                    message: `Ticket has been escalated to level ${escalation.level}`,
                    data: {
                        ticketId: ticket.id,
                        escalationLevel: escalation.level,
                        priority: ticket.priority
                    }
                });
            }
        }
        catch (error) {
            this.logger.error(`Failed to notify escalation for ticket ${ticket.id}:`, error);
        }
    }
    async getOrganizationStaffByRoles(organizationId, roles) {
        try {
            const organization = await this.organizationsService.findOne(organizationId);
            if (!organization)
                return [];
            const staff = organization.staff || [];
            return staff.filter((member) => roles.includes(member.role));
        }
        catch (error) {
            this.logger.error(`Failed to get staff for organization ${organizationId}:`, error);
            return [];
        }
    }
    getHoursElapsed(date) {
        const elapsed = Date.now() - date.getTime();
        return elapsed / (1000 * 60 * 60);
    }
    async getTicketSlaStatus(ticketId) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
            relations: ['activities']
        });
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        const rule = this.escalationRules[ticket.priority];
        const firstResponse = ticket.activities.find(a => a.type === TicketActivityType.RESPONSE);
        const resolution = ticket.activities.find(a => a.type === TicketActivityType.RESOLUTION);
        return {
            responseTime: {
                target: rule.responseTime,
                actual: firstResponse ?
                    this.getHoursElapsed(ticket.createdAt) : null,
                breached: !firstResponse &&
                    this.getHoursElapsed(ticket.createdAt) > rule.responseTime
            },
            resolutionTime: {
                target: rule.resolutionTime,
                actual: resolution ?
                    this.getHoursElapsed(ticket.createdAt) : null,
                breached: !resolution &&
                    this.getHoursElapsed(ticket.createdAt) > rule.resolutionTime
            }
        };
    }
    async checkSlaBreachEscalation(ticketId) {
        const slaStatus = await this.getTicketSlaStatus(ticketId);
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
            relations: ['activities']
        });
        if (!ticket)
            return;
        if (slaStatus.responseTime.breached || slaStatus.resolutionTime.breached) {
            const rule = this.escalationRules[ticket.priority];
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            const nextLevel = rule.escalationLevels.find(level => level.level === currentLevel + 1);
            if (nextLevel) {
                await this.escalateTicket(ticket, nextLevel);
            }
        }
    }
};
TicketEscalationService = TicketEscalationService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Ticket)),
    __param(1, InjectRepository(TicketActivity)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        NotificationsService,
        OrganizationsService,
        ConfigService])
], TicketEscalationService);
export { TicketEscalationService };
//# sourceMappingURL=ticket-escalation.service.js.map