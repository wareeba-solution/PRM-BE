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
var TicketEscalationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketEscalationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const ticket_entity_1 = require("../entities/ticket.entity");
const ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
const ticket_enums_1 = require("../enums/ticket.enums");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const organizations_service_1 = require("../../organizations/services/organizations.service");
const ticket_priority_entity_1 = require("../entities/ticket-priority.entity");
let TicketEscalationService = TicketEscalationService_1 = class TicketEscalationService {
    constructor(ticketRepository, activityRepository, notificationsService, organizationsService, configService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.organizationsService = organizationsService;
        this.configService = configService;
        this.logger = new common_1.Logger(TicketEscalationService_1.name);
        this.escalationRules = {
            [ticket_priority_entity_1.PriorityLevel.LOW]: {
                priority: ticket_priority_entity_1.PriorityLevel.LOW,
                responseTime: 24,
                resolutionTime: 48,
                escalationLevels: [
                    { level: 1, timeThreshold: 12, notifyRoles: ['AGENT'] },
                    { level: 2, timeThreshold: 24, notifyRoles: ['SUPERVISOR'] },
                    { level: 3, timeThreshold: 36, notifyRoles: ['ADMIN'] }
                ]
            },
            [ticket_priority_entity_1.PriorityLevel.MEDIUM]: {
                priority: ticket_priority_entity_1.PriorityLevel.MEDIUM,
                responseTime: 12,
                resolutionTime: 24,
                escalationLevels: [
                    { level: 1, timeThreshold: 6, notifyRoles: ['AGENT'] },
                    { level: 2, timeThreshold: 12, notifyRoles: ['SUPERVISOR'] },
                    { level: 3, timeThreshold: 18, notifyRoles: ['ADMIN'] }
                ]
            },
            [ticket_priority_entity_1.PriorityLevel.HIGH]: {
                priority: ticket_priority_entity_1.PriorityLevel.HIGH,
                responseTime: 6,
                resolutionTime: 12,
                escalationLevels: [
                    { level: 1, timeThreshold: 3, notifyRoles: ['AGENT'] },
                    { level: 2, timeThreshold: 6, notifyRoles: ['SUPERVISOR'] },
                    { level: 3, timeThreshold: 9, notifyRoles: ['ADMIN'] }
                ]
            },
            [ticket_priority_entity_1.PriorityLevel.URGENT]: {
                priority: ticket_priority_entity_1.PriorityLevel.URGENT,
                responseTime: 2,
                resolutionTime: 4,
                escalationLevels: [
                    { level: 1, timeThreshold: 1, notifyRoles: ['AGENT'] },
                    { level: 2, timeThreshold: 2, notifyRoles: ['SUPERVISOR'] },
                    { level: 3, timeThreshold: 3, notifyRoles: ['ADMIN'] }
                ]
            }
        };
        this.firstResponseThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }
    /**
     * Check tickets for escalation
     */
    async checkTicketsForEscalation() {
        // Using metadata to store escalation level instead of directly on Ticket entity
        const unresolved = await this.ticketRepository.find({
            where: {
                status: (0, typeorm_2.In)([ticket_enums_1.TicketStatus.OPEN, ticket_enums_1.TicketStatus.IN_PROGRESS])
            },
            relations: ['assignee', 'organization', 'activities', 'priority']
        });
        for (const ticket of unresolved) {
            // We'll check if the current escalation level is less than 3
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            if (currentLevel < 3) {
                await this.checkTicketEscalation(ticket);
            }
        }
    }
    /**
     * Get the current escalation level from the ticket's metadata or activities
     */
    getCurrentEscalationLevel(ticket) {
        var _a, _b;
        // Try to find the most recent escalation activity
        const escalationActivities = ((_a = ticket.metadata) === null || _a === void 0 ? void 0 : _a.escalationActivities) || [];
        if (escalationActivities.length > 0) {
            // Sort by created date, descending
            const latestEscalation = escalationActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
            // Get the escalation level from metadata
            return ((_b = latestEscalation.metadata) === null || _b === void 0 ? void 0 : _b.newLevel) || 0;
        }
        return 0; // Default to no escalation
    }
    /**
     * Check single ticket for escalation
     */
    async checkTicketEscalation(ticket) {
        try {
            // Get activities using the repository
            const activities = await this.activityRepository.find({
                where: { ticketId: ticket.id }
            });
            if (!activities || activities.length === 0)
                return;
            const escalationActivities = activities.filter(activity => activity.type === ticket_activity_type_enum_1.TicketActivityType.ESCALATED);
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            const rule = this.escalationRules[ticket.priority.level];
            if (!rule) {
                this.logger.warn(`No escalation rule found for priority ${ticket.priority}`);
                return;
            }
            const nextLevel = rule.escalationLevels.find(level => level.level === currentLevel + 1);
            if (!nextLevel) {
                this.logger.debug(`No next escalation level found for ticket ${ticket.id}`);
                return;
            }
            const timeElapsed = this.getHoursElapsed(ticket.createdAt);
            if (timeElapsed >= nextLevel.timeThreshold) {
                await this.escalateTicketInternal(ticket, nextLevel);
            }
        }
        catch (error) {
            this.logger.error(`Error checking ticket escalation for ticket ${ticket.id}:`, error);
        }
    }
    async escalateTicketInternal(ticket, escalation) {
        const activityData = {
            ticketId: ticket.id,
            organizationId: ticket.organizationId,
            performedById: ticket.createdById,
            type: ticket_activity_type_enum_1.TicketActivityType.ESCALATED,
            data: {
                description: `Ticket escalated to level ${escalation.level}`,
                previousLevel: this.getCurrentEscalationLevel(ticket),
                newLevel: escalation.level,
                reason: 'Time threshold exceeded'
            }
        };
        const activity = this.activityRepository.create(activityData);
        await this.activityRepository.save(activity);
        await this.notifyEscalation(ticket, escalation);
    }
    /**
     * Send escalation notifications
     */
    async notifyEscalation(ticket, escalation) {
        try {
            // Get organization staff with required roles
            // Assuming organizationsService has a method to get staff by roles
            const staff = await this.getOrganizationStaffByRoles(ticket.organizationId, escalation.notifyRoles);
            // Send notifications
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
    /**
     * Get organization staff by roles (implementation depends on your OrganizationsService)
     */
    async getOrganizationStaffByRoles(organizationId, roles) {
        // Assuming the organization service has a method to get staff by org ID and roles
        // If not, this method needs to be implemented based on your application's structure
        try {
            // This is a fallback implementation if getStaffByRoles doesn't exist
            // Replace this with the actual implementation based on your OrganizationsService
            const organization = await this.organizationsService.findOne(organizationId);
            if (!organization)
                return [];
            // This is just a placeholder, implement based on your actual data model
            const staff = organization.staff || [];
            return staff.filter((member) => roles.includes(member.role));
        }
        catch (error) {
            this.logger.error(`Failed to get staff for organization ${organizationId}:`, error);
            return [];
        }
    }
    /**
     * Calculate hours elapsed since a given date
     */
    getHoursElapsed(date) {
        const elapsed = Date.now() - date.getTime();
        return elapsed / (1000 * 60 * 60);
    }
    /**
     * Get SLA status for a ticket
     */
    async getTicketSlaStatus(ticketId) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId }
        });
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        // Get activities using the repository
        const activities = await this.activityRepository.find({
            where: { ticketId }
        });
        const rule = this.escalationRules[ticket.priority.level];
        // Check for RESPONSE and RESOLUTION activity types
        const firstResponse = activities.find(a => a.type === ticket_activity_type_enum_1.TicketActivityType.RESPONSE);
        const resolution = activities.find(a => a.type === ticket_activity_type_enum_1.TicketActivityType.RESOLUTION);
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
    /**
     * Check if ticket needs auto-escalation due to SLA breach
     */
    async checkSlaBreachEscalation(ticketId) {
        const slaStatus = await this.getTicketSlaStatus(ticketId);
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
            relations: ['activities']
        });
        if (!ticket)
            return;
        if (slaStatus.responseTime.breached || slaStatus.resolutionTime.breached) {
            const rule = this.escalationRules[ticket.priority.level];
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            // Find appropriate escalation level based on breach severity
            const nextLevel = rule.escalationLevels.find(level => level.level === currentLevel + 1);
            if (nextLevel) {
                await this.escalateTicketInternal(ticket, nextLevel);
            }
        }
    }
    async checkFirstResponseTime(ticket) {
        try {
            // Get activities using the repository
            const activities = await this.activityRepository.find({
                where: { ticketId: ticket.id }
            });
            if (!activities || activities.length === 0)
                return false;
            const firstResponse = activities.find(activity => activity.type === ticket_activity_type_enum_1.TicketActivityType.RESPONSE);
            if (!firstResponse) {
                const timeElapsed = Date.now() - ticket.createdAt.getTime();
                return timeElapsed > this.firstResponseThreshold;
            }
            const resolution = activities.find(activity => activity.type === ticket_activity_type_enum_1.TicketActivityType.RESOLUTION);
            if (!resolution) {
                const timeElapsed = Date.now() - firstResponse.timestamp.getTime();
                return timeElapsed > this.firstResponseThreshold;
            }
            return false;
        }
        catch (error) {
            this.logger.error(`Error checking first response time for ticket ${ticket.id}:`, error);
            return false;
        }
    }
    async escalateTicket(ticketId, reason) {
        const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID ${ticketId} not found`);
        }
        const currentLevel = this.getCurrentEscalationLevel(ticket);
        const rule = this.escalationRules[ticket.priority.level];
        if (!rule) {
            this.logger.warn(`No escalation rule found for priority ${ticket.priority}`);
            return ticket;
        }
        const nextLevel = rule.escalationLevels.find(level => level.level === currentLevel + 1);
        if (!nextLevel) {
            this.logger.debug(`No next escalation level found for ticket ${ticket.id}`);
            return ticket;
        }
        await this.escalateTicketInternal(ticket, nextLevel);
        return ticket;
    }
};
TicketEscalationService = TicketEscalationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_activity_entity_1.TicketActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService,
        organizations_service_1.OrganizationsService,
        config_1.ConfigService])
], TicketEscalationService);
exports.TicketEscalationService = TicketEscalationService;
//# sourceMappingURL=ticket-escalation.service.js.map