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
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const organizations_service_1 = require("../../organizations/services/organizations.service");
let TicketEscalationService = TicketEscalationService_1 = class TicketEscalationService {
    constructor(ticketRepository, activityRepository, notificationsService, organizationsService, configService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.organizationsService = organizationsService;
        this.configService = configService;
        this.logger = new common_1.Logger(TicketEscalationService_1.name);
        // Initialize escalation rules from config
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
    /**
     * Check tickets for escalation
     */
    async checkTicketsForEscalation() {
        // Using metadata to store escalation level instead of directly on Ticket entity
        const unresolved = await this.ticketRepository.find({
            where: {
                status: (0, typeorm_2.In)([ticket_status_enum_1.TicketStatus.OPEN, ticket_status_enum_1.TicketStatus.IN_PROGRESS])
            },
            relations: ['assignee', 'organization', 'activities']
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
        const escalationActivities = ((_a = ticket.activities) === null || _a === void 0 ? void 0 : _a.filter(activity => activity.type === ticket_activity_type_enum_1.TicketActivityType.ESCALATION)) || [];
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
        const rule = this.escalationRules[ticket.priority];
        if (!rule)
            return;
        const timeElapsed = this.getHoursElapsed(ticket.createdAt);
        const currentLevel = this.getCurrentEscalationLevel(ticket);
        // Find next escalation level
        const nextEscalation = rule.escalationLevels.find(level => level.level === currentLevel + 1 && timeElapsed >= level.timeThreshold);
        if (nextEscalation) {
            await this.escalateTicket(ticket, nextEscalation);
        }
    }
    /**
     * Escalate a ticket to the next level
     */
    async escalateTicket(ticket, escalation) {
        try {
            // Instead of updating a non-existent escalation level field,
            // we'll track this in the activity metadata
            // Create activity log for the escalation
            // Create with only the fields that exist on TicketActivity
            const activityData = {
                ticket,
                type: ticket_activity_type_enum_1.TicketActivityType.ESCALATION,
                // Using metadata to store all the custom information
                metadata: {
                    description: `Ticket escalated to level ${escalation.level}`,
                    previousLevel: this.getCurrentEscalationLevel(ticket),
                    newLevel: escalation.level,
                    reason: 'SLA breach'
                }
            };
            const activity = this.activityRepository.create(activityData);
            await this.activityRepository.save(activity);
            // Notify relevant staff
            await this.notifyEscalation(ticket, escalation);
        }
        catch (error) {
            this.logger.error(`Failed to escalate ticket ${ticket.id}:`, error);
        }
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
            where: { id: ticketId },
            relations: ['activities']
        });
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        const rule = this.escalationRules[ticket.priority];
        // Check for RESPONSE and RESOLUTION activity types
        const firstResponse = ticket.activities.find(a => a.type === ticket_activity_type_enum_1.TicketActivityType.RESPONSE);
        const resolution = ticket.activities.find(a => a.type === ticket_activity_type_enum_1.TicketActivityType.RESOLUTION);
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
            const rule = this.escalationRules[ticket.priority];
            const currentLevel = this.getCurrentEscalationLevel(ticket);
            // Find appropriate escalation level based on breach severity
            const nextLevel = rule.escalationLevels.find(level => level.level === currentLevel + 1);
            if (nextLevel) {
                await this.escalateTicket(ticket, nextLevel);
            }
        }
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