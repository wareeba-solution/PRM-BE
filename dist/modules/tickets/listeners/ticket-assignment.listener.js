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
var TicketAssignmentListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAssignmentListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("../entities/ticket.entity");
const ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const users_service_1 = require("../../users/services/users.service");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
const ticket_enums_1 = require("../enums/ticket.enums");
const ticket_priority_entity_1 = require("../entities/ticket-priority.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const tickets_service_1 = require("../services/tickets.service");
const ticket_activity_service_1 = require("../services/ticket-activity.service");
let TicketAssignmentListener = TicketAssignmentListener_1 = class TicketAssignmentListener {
    constructor(ticketRepository, activityRepository, notificationsService, usersService, ticketsService, ticketActivityService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
        this.ticketsService = ticketsService;
        this.ticketActivityService = ticketActivityService;
        this.logger = new common_1.Logger(TicketAssignmentListener_1.name);
        this.agentAssignments = new Map();
    }
    async handleTicketAssigned(event) {
        await Promise.all([
            this.createAssignmentActivity(event),
            this.sendAssignmentNotifications(event),
        ]);
    }
    async createAssignmentActivity(event) {
        const activity = this.activityRepository.create({
            ticketId: event.ticketId,
            organizationId: event.organizationId,
            performedById: event.assignedBy,
            type: ticket_activity_type_enum_1.TicketActivityType.ASSIGNED,
            data: {
                description: `Ticket assigned to ${event.assigneeId}`,
                previousAssigneeId: event.previousAssigneeId,
                newAssigneeId: event.newAssigneeId,
                note: event.note,
            },
        });
        await this.activityRepository.save(activity);
    }
    async sendAssignmentNotifications(event) {
        const [assignee, assignedBy] = await Promise.all([
            this.usersService.findOne(event.assigneeId, event.organizationId),
            this.usersService.findOne(event.assignedBy, event.organizationId),
        ]);
        if (!assignee || !assignedBy) {
            return;
        }
        await this.notificationsService.create({
            type: 'TICKET_ASSIGNED',
            title: 'New Ticket Assignment',
            content: `You have been assigned a new ticket by ${assignedBy.firstName} ${assignedBy.lastName}`,
            recipients: [{ userId: event.assigneeId }],
            organizationId: event.organizationId,
            senderId: event.assignedBy,
        });
    }
    async handleAutoAssignment(payload) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: payload.ticketId },
        });
        if (!ticket) {
            return;
        }
        const availableAgent = await this.findAvailableAgent(payload.organizationId, payload.priority);
        if (availableAgent) {
            ticket.assigneeId = availableAgent.id;
            await this.ticketRepository.save(ticket);
            await this.handleTicketAssigned({
                ticketId: ticket.id,
                organizationId: ticket.organizationId,
                priority: payload.priority,
                assigneeId: availableAgent.id,
                assignedBy: 'system',
            });
        }
    }
    getMaxAssignments(priority) {
        switch (priority) {
            case ticket_priority_entity_1.PriorityLevel.HIGH:
                return 2;
            case ticket_priority_entity_1.PriorityLevel.MEDIUM:
                return 3;
            case ticket_priority_entity_1.PriorityLevel.LOW:
                return 4;
            default:
                return 3;
        }
    }
    async findAvailableAgent(organizationId, priority) {
        // Get all active agents in the organization
        const agents = await this.usersService.findByRole(role_enum_1.Role.AGENT, organizationId);
        // Filter agents who are not currently assigned to a high priority ticket
        const availableAgents = agents.filter(agent => {
            const currentAssignments = this.agentAssignments.get(agent.id) || 0;
            return currentAssignments < this.getMaxAssignments(priority);
        });
        if (availableAgents.length === 0) {
            return null;
        }
        // Sort agents by current assignment count and return the least busy one
        return availableAgents.sort((a, b) => {
            const aCount = this.agentAssignments.get(a.id) || 0;
            const bCount = this.agentAssignments.get(b.id) || 0;
            return aCount - bCount;
        })[0];
    }
    async handleAgentAvailabilityChange(payload) {
        const assignedTickets = await this.ticketRepository.find({
            where: {
                assigneeId: payload.userId,
                status: (0, typeorm_2.In)([ticket_enums_1.TicketStatus.OPEN, ticket_enums_1.TicketStatus.IN_PROGRESS]),
            },
        });
        for (const ticket of assignedTickets) {
            await this.handleAutoAssignment({
                ticketId: ticket.id,
                organizationId: ticket.organizationId,
                priority: ticket.priority.level,
            });
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.assigned'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleTicketAssigned", null);
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.auto-assign'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAutoAssignment", null);
__decorate([
    (0, event_emitter_1.OnEvent)('agent.availability-changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAgentAvailabilityChange", null);
TicketAssignmentListener = TicketAssignmentListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_activity_entity_1.TicketActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService,
        tickets_service_1.TicketsService,
        ticket_activity_service_1.TicketActivityService])
], TicketAssignmentListener);
exports.TicketAssignmentListener = TicketAssignmentListener;
//# sourceMappingURL=ticket-assignment.listener.js.map