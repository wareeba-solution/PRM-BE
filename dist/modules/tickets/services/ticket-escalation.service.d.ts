import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Ticket } from '../entities/ticket.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { OrganizationsService } from '../../organizations/services/organizations.service';
export declare class TicketEscalationService {
    private readonly ticketRepository;
    private readonly activityRepository;
    private readonly notificationsService;
    private readonly organizationsService;
    private readonly configService;
    private readonly logger;
    private readonly escalationRules;
    private readonly firstResponseThreshold;
    constructor(ticketRepository: Repository<Ticket>, activityRepository: Repository<TicketActivity>, notificationsService: NotificationsService, organizationsService: OrganizationsService, configService: ConfigService);
    /**
     * Check tickets for escalation
     */
    checkTicketsForEscalation(): Promise<void>;
    /**
     * Get the current escalation level from the ticket's metadata or activities
     */
    private getCurrentEscalationLevel;
    /**
     * Check single ticket for escalation
     */
    private checkTicketEscalation;
    private escalateTicketInternal;
    /**
     * Send escalation notifications
     */
    private notifyEscalation;
    /**
     * Get organization staff by roles (implementation depends on your OrganizationsService)
     */
    private getOrganizationStaffByRoles;
    /**
     * Calculate hours elapsed since a given date
     */
    private getHoursElapsed;
    /**
     * Get SLA status for a ticket
     */
    getTicketSlaStatus(ticketId: string): Promise<{
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
    }>;
    /**
     * Check if ticket needs auto-escalation due to SLA breach
     */
    checkSlaBreachEscalation(ticketId: string): Promise<void>;
    checkFirstResponseTime(ticket: Ticket): Promise<boolean>;
    escalateTicket(ticketId: string, reason: string): Promise<Ticket>;
}
