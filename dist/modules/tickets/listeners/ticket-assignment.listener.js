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
let TicketAssignmentListener = class TicketAssignmentListener {
    constructor(ticketRepository, activityRepository, notificationsService, usersService) {
        this.ticketRepository = ticketRepository;
        this.activityRepository = activityRepository;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async handleTicketAssigned(event) {
        // Create activity log
        await this.createAssignmentActivity(event);
        // Notify relevant users
        await this.sendAssignmentNotifications(event);
    }
    async createAssignmentActivity(event) {
        const activity = this.activityRepository.create({
            ticketId: event.ticketId,
            type: ticket_activity_type_enum_1.TicketActivityType.ASSIGNED,
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
        // Notify new assignee
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
        // Notify previous assignee if exists
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
        // Implement auto-assignment logic here
        // This could include:
        // - Round-robin assignment
        // - Load-based assignment
        // - Skill-based routing
        // - Priority-based assignment
        // For example, find available agent with least number of high priority tickets
        const availableAgent = await this.findAvailableAgent(payload.organizationId, payload.priority);
        if (availableAgent) {
            await this.ticketRepository.update(payload.ticketId, {
                assigneeId: availableAgent.id
            });
            // Emit assignment event
            await this.handleTicketAssigned({
                ticketId: payload.ticketId,
                newAssigneeId: availableAgent.id,
                assignedById: 'SYSTEM'
            });
        }
    }
    async findAvailableAgent(organizationId, priority) {
        // Fix #2: Implement this method since it doesn't exist in UsersService
        // This is a temporary implementation until UsersService has the proper method
        // You should eventually implement this method in UsersService
        // Find users with support role in this organization
        const supportAgents = await this.usersService.findByRole('SUPPORT', organizationId);
        if (!supportAgents || supportAgents.length === 0) {
            return null;
        }
        // Simple implementation: return the first available agent
        // In a real implementation, you'd want to consider workload, skills, etc.
        return supportAgents[0];
    }
    async handleAgentAvailabilityChange(payload) {
        if (!payload.isAvailable) {
            // Reassign tickets if agent becomes unavailable
            const assignedTickets = await this.ticketRepository.find({
                where: {
                    assigneeId: payload.userId,
                    status: (0, typeorm_2.In)(['OPEN', 'IN_PROGRESS']) // Fix #3: Using TypeORM's In operator with correct type casting
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
    (0, event_emitter_1.OnEvent)('ticket.assigned'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleTicketAssigned", null);
__decorate([
    (0, event_emitter_1.OnEvent)('ticket.auto_assignment.needed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAutoAssignment", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.availability.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketAssignmentListener.prototype, "handleAgentAvailabilityChange", null);
TicketAssignmentListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_activity_entity_1.TicketActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], TicketAssignmentListener);
exports.TicketAssignmentListener = TicketAssignmentListener;
//# sourceMappingURL=ticket-assignment.listener.js.map