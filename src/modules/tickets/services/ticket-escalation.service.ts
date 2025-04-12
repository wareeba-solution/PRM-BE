import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, FindOperator, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
import { TicketStatus } from '../enums/ticket.enums';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { OrganizationsService } from '../../organizations/services/organizations.service';
import { StaffMember } from '../../organizations/interfaces/staff-member.interface';
import { PriorityLevel } from '../entities/ticket-priority.entity';

interface EscalationRule {
  priority: PriorityLevel;
  responseTime: number; // in hours
  resolutionTime: number; // in hours
  escalationLevels: {
    level: number;
    timeThreshold: number; // in hours
    notifyRoles: string[];
  }[];
}

@Injectable()
export class TicketEscalationService {
  private readonly logger = new Logger(TicketEscalationService.name);
  private escalationRules: Record<PriorityLevel, EscalationRule> = {
    [PriorityLevel.LOW]: {
      priority: PriorityLevel.LOW,
      responseTime: 24,
      resolutionTime: 48,
      escalationLevels: [
        { level: 1, timeThreshold: 12, notifyRoles: ['AGENT'] },
        { level: 2, timeThreshold: 24, notifyRoles: ['SUPERVISOR'] },
        { level: 3, timeThreshold: 36, notifyRoles: ['ADMIN'] }
      ]
    },
    [PriorityLevel.MEDIUM]: {
      priority: PriorityLevel.MEDIUM,
      responseTime: 12,
      resolutionTime: 24,
      escalationLevels: [
        { level: 1, timeThreshold: 6, notifyRoles: ['AGENT'] },
        { level: 2, timeThreshold: 12, notifyRoles: ['SUPERVISOR'] },
        { level: 3, timeThreshold: 18, notifyRoles: ['ADMIN'] }
      ]
    },
    [PriorityLevel.HIGH]: {
      priority: PriorityLevel.HIGH,
      responseTime: 6,
      resolutionTime: 12,
      escalationLevels: [
        { level: 1, timeThreshold: 3, notifyRoles: ['AGENT'] },
        { level: 2, timeThreshold: 6, notifyRoles: ['SUPERVISOR'] },
        { level: 3, timeThreshold: 9, notifyRoles: ['ADMIN'] }
      ]
    },
    [PriorityLevel.URGENT]: {
      priority: PriorityLevel.URGENT,
      responseTime: 2,
      resolutionTime: 4,
      escalationLevels: [
        { level: 1, timeThreshold: 1, notifyRoles: ['AGENT'] },
        { level: 2, timeThreshold: 2, notifyRoles: ['SUPERVISOR'] },
        { level: 3, timeThreshold: 3, notifyRoles: ['ADMIN'] }
      ]
    }
  };
  private readonly firstResponseThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketActivity)
    private readonly activityRepository: Repository<TicketActivity>,
    private readonly notificationsService: NotificationsService,
    private readonly organizationsService: OrganizationsService,
    private readonly configService: ConfigService,
  ) {
  }

  /**
   * Check tickets for escalation
   */
  async checkTicketsForEscalation(): Promise<void> {
    // Using metadata to store escalation level instead of directly on Ticket entity
    const unresolved = await this.ticketRepository.find({
      where: {
        status: In([TicketStatus.OPEN, TicketStatus.IN_PROGRESS])
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
  private getCurrentEscalationLevel(ticket: Ticket): number {
    // Try to find the most recent escalation activity
    const escalationActivities = ticket.metadata?.escalationActivities || [];
    
    if (escalationActivities.length > 0) {
      // Sort by created date, descending
      const latestEscalation = escalationActivities.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )[0];
      
      // Get the escalation level from metadata
      return latestEscalation.metadata?.newLevel || 0;
    }
    
    return 0; // Default to no escalation
  }

  /**
   * Check single ticket for escalation
   */
  private async checkTicketEscalation(ticket: Ticket): Promise<void> {
    try {
      // Get activities using the repository
      const activities = await this.activityRepository.find({
        where: { ticketId: ticket.id }
      });
      
      if (!activities || activities.length === 0) return;

      const escalationActivities = activities.filter(
        activity => activity.type === TicketActivityType.ESCALATED
      );

      const currentLevel = this.getCurrentEscalationLevel(ticket);
      const rule = this.escalationRules[ticket.priority.level as PriorityLevel];

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
    } catch (error) {
      this.logger.error(`Error checking ticket escalation for ticket ${ticket.id}:`, error);
    }
  }

  private async escalateTicketInternal(ticket: Ticket, escalation: EscalationRule['escalationLevels'][0]): Promise<void> {
    const activityData = {
      ticketId: ticket.id,
      organizationId: ticket.organizationId,
      performedById: ticket.createdById,
      type: TicketActivityType.ESCALATED,
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
  private async notifyEscalation(ticket: Ticket, escalation: EscalationRule['escalationLevels'][0]): Promise<void> {
    try {
      // Get organization staff with required roles
      // Assuming organizationsService has a method to get staff by roles
      const staff = await this.getOrganizationStaffByRoles(
        ticket.organizationId,
        escalation.notifyRoles
      );

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
    } catch (error) {
      this.logger.error(`Failed to notify escalation for ticket ${ticket.id}:`, error);
    }
  }

  /**
   * Get organization staff by roles (implementation depends on your OrganizationsService)
   */
  private async getOrganizationStaffByRoles(organizationId: string, roles: string[]): Promise<StaffMember[]> {
    // Assuming the organization service has a method to get staff by org ID and roles
    // If not, this method needs to be implemented based on your application's structure
    try {
      // This is a fallback implementation if getStaffByRoles doesn't exist
      // Replace this with the actual implementation based on your OrganizationsService
      const organization = await this.organizationsService.findOne(organizationId);
      if (!organization) return [];
      
      // This is just a placeholder, implement based on your actual data model
      const staff = organization.staff || [];
      return staff.filter((member: StaffMember) => roles.includes(member.role));
    } catch (error) {
      this.logger.error(`Failed to get staff for organization ${organizationId}:`, error);
      return [];
    }
  }

  /**
   * Calculate hours elapsed since a given date
   */
  private getHoursElapsed(date: Date): number {
    const elapsed = Date.now() - date.getTime();
    return elapsed / (1000 * 60 * 60);
  }

  /**
   * Get SLA status for a ticket
   */
  async getTicketSlaStatus(ticketId: string): Promise<{
    responseTime: {
      target: number;
      actual: number | null;
      breached: boolean;
    };
    resolutionTime: {
      target: number;
      actual: number | null;
      breached: boolean;
    };
  }> {
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

    const rule = this.escalationRules[ticket.priority.level as PriorityLevel];
    // Check for RESPONSE and RESOLUTION activity types
    const firstResponse = activities.find(
      a => a.type === TicketActivityType.RESPONSE
    );
    const resolution = activities.find(
      a => a.type === TicketActivityType.RESOLUTION
    );

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
  async checkSlaBreachEscalation(ticketId: string): Promise<void> {
    const slaStatus = await this.getTicketSlaStatus(ticketId);
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['activities']
    });

    if (!ticket) return;

    if (slaStatus.responseTime.breached || slaStatus.resolutionTime.breached) {
      const rule = this.escalationRules[ticket.priority.level as PriorityLevel];
      const currentLevel = this.getCurrentEscalationLevel(ticket);

      // Find appropriate escalation level based on breach severity
      const nextLevel = rule.escalationLevels.find(level => 
        level.level === currentLevel + 1
      );

      if (nextLevel) {
        await this.escalateTicketInternal(ticket, nextLevel);
      }
    }
  }

  async checkFirstResponseTime(ticket: Ticket): Promise<boolean> {
    try {
      // Get activities using the repository
      const activities = await this.activityRepository.find({
        where: { ticketId: ticket.id }
      });
      
      if (!activities || activities.length === 0) return false;

      const firstResponse = activities.find(
        activity => activity.type === TicketActivityType.RESPONSE
      );

      if (!firstResponse) {
        const timeElapsed = Date.now() - ticket.createdAt.getTime();
        return timeElapsed > this.firstResponseThreshold;
      }

      const resolution = activities.find(
        activity => activity.type === TicketActivityType.RESOLUTION
      );

      if (!resolution) {
        const timeElapsed = Date.now() - firstResponse.timestamp.getTime();
        return timeElapsed > this.firstResponseThreshold;
      }

      return false;
    } catch (error) {
      this.logger.error(`Error checking first response time for ticket ${ticket.id}:`, error);
      return false;
    }
  }

  async escalateTicket(ticketId: string, reason: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    const currentLevel = this.getCurrentEscalationLevel(ticket);
    const rule = this.escalationRules[ticket.priority.level as PriorityLevel];

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
}