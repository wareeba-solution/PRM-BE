import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { UsersService } from '../../users/services/users.service';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
import { TicketStatus } from '../enums/ticket.enums';
import { PriorityLevel } from '../entities/ticket-priority.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/enums/role.enum';
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

@Injectable()
export class TicketAssignmentListener {
  private readonly logger = new Logger(TicketAssignmentListener.name);
  private agentAssignments: Map<string, number> = new Map();

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketActivity)
    private readonly activityRepository: Repository<TicketActivity>,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
    private readonly ticketsService: TicketsService,
    private readonly ticketActivityService: TicketActivityService,
  ) {}

  @OnEvent('ticket.assigned')
  async handleTicketAssigned(event: TicketAssignmentEvent) {
    await Promise.all([
      this.createAssignmentActivity(event),
      this.sendAssignmentNotifications(event),
    ]);
  }

  private async createAssignmentActivity(event: TicketAssignmentEvent): Promise<void> {
    const activity = this.activityRepository.create({
      ticketId: event.ticketId,
      organizationId: event.organizationId,
      performedById: event.assignedBy,
      type: TicketActivityType.ASSIGNED,
      data: {
        description: `Ticket assigned to ${event.assigneeId}`,
        previousAssigneeId: event.previousAssigneeId,
        newAssigneeId: event.newAssigneeId,
        note: event.note,
      },
    });

    await this.activityRepository.save(activity);
  }

  private async sendAssignmentNotifications(event: TicketAssignmentEvent): Promise<void> {
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

  @OnEvent('ticket.auto-assign')
  async handleAutoAssignment(payload: {
    ticketId: string;
    organizationId: string;
    priority: PriorityLevel;
  }) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: payload.ticketId },
    });

    if (!ticket) {
      return;
    }

    const availableAgent = await this.findAvailableAgent(
      payload.organizationId,
      payload.priority,
    );

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

  private getMaxAssignments(priority: PriorityLevel): number {
    switch (priority) {
      case PriorityLevel.HIGH:
        return 2;
      case PriorityLevel.MEDIUM:
        return 3;
      case PriorityLevel.LOW:
        return 4;
      default:
        return 3;
    }
  }

  private async findAvailableAgent(organizationId: string, priority: PriorityLevel): Promise<User | null> {
    // Get all active agents in the organization
    const agents = await this.usersService.findByRole(Role.AGENT, organizationId);
    
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

  @OnEvent('agent.availability-changed')
  async handleAgentAvailabilityChange(payload: {
    userId: string;
    isAvailable: boolean;
  }) {
    const assignedTickets = await this.ticketRepository.find({
      where: {
        assigneeId: payload.userId,
        status: In([TicketStatus.OPEN, TicketStatus.IN_PROGRESS]),
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
}