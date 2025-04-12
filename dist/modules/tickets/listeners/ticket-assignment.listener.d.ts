import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UsersService } from '../../users/services/users.service';
import { PriorityLevel } from '../entities/ticket-priority.entity';
import { TicketsService } from '../services/tickets.service';
import { TicketActivityService } from '../services/ticket-activity.service';
interface TicketAssignmentEvent {
    ticketId: string;
    organizationId: string;
    priority: PriorityLevel;
    assigneeId: string;
    assignedBy: string;
    previousAssigneeId?: string;
    newAssigneeId?: string;
    assignedById?: string;
    note?: string;
}
export declare class TicketAssignmentListener {
    private readonly ticketRepository;
    private readonly activityRepository;
    private readonly notificationsService;
    private readonly usersService;
    private readonly ticketsService;
    private readonly ticketActivityService;
    private readonly logger;
    private agentAssignments;
    constructor(ticketRepository: Repository<Ticket>, activityRepository: Repository<TicketActivity>, notificationsService: NotificationsService, usersService: UsersService, ticketsService: TicketsService, ticketActivityService: TicketActivityService);
    handleTicketAssigned(event: TicketAssignmentEvent): Promise<void>;
    private createAssignmentActivity;
    private sendAssignmentNotifications;
    handleAutoAssignment(payload: {
        ticketId: string;
        organizationId: string;
        priority: PriorityLevel;
    }): Promise<void>;
    private getMaxAssignments;
    private findAvailableAgent;
    handleAgentAvailabilityChange(payload: {
        userId: string;
        isAvailable: boolean;
    }): Promise<void>;
}
export {};
