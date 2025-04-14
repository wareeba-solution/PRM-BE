import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Ticket } from '../entities/ticket.entity';
import { TicketComment } from '../entities/ticket-comment.entity';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CreateTicketCommentDto } from '../dto/ticket-comment.dto';
import { BulkTicketAssignmentDto } from '../dto/ticket-assignment.dto';
import { TicketQueryDto } from '../dto/ticket-query.dto';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { User } from '../../users/entities/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TicketPriorityService } from './ticket-priority.service';
import { MessageTemplateService } from '../../messages/services/message-template.service';
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly commentRepository;
    private readonly attachmentRepository;
    private readonly activityRepository;
    private readonly dataSource;
    private readonly userRepository;
    private readonly eventEmitter;
    private readonly notificationsService;
    private readonly ticketPriorityService;
    private readonly messageTemplateService;
    constructor(ticketRepository: Repository<Ticket>, commentRepository: Repository<TicketComment>, attachmentRepository: Repository<TicketAttachment>, activityRepository: Repository<TicketActivity>, dataSource: DataSource, userRepository: Repository<User>, eventEmitter: EventEmitter2, notificationsService: NotificationsService, ticketPriorityService: TicketPriorityService, messageTemplateService: MessageTemplateService);
    getRelatedTickets(ticketId: string, organizationId: string): Promise<any>;
    remove(id: string, organizationId: string): Promise<void>;
    reopenTicket(id: string, reopenDetails: {
        reason: string;
        organizationId: string;
        reopenedBy: string;
    }): Promise<Ticket>;
    create(data: CreateTicketDto): Promise<Ticket>;
    findAll(query: TicketQueryDto & {
        organizationId: string;
    }): Promise<Pagination<Ticket, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: string, organizationId: string): Promise<Ticket>;
    update(id: string, data: UpdateTicketDto & {
        organizationId: string;
        updatedBy: string;
        note?: string;
    }): Promise<Ticket>;
    assignTicket(id: string, data: BulkTicketAssignmentDto & {
        organizationId: string;
        assignedBy: string;
    }): Promise<Ticket>;
    addComment(id: string, data: CreateTicketCommentDto & {
        organizationId: string;
        userId: string;
    }): Promise<TicketComment>;
    escalateTicket(id: string, data: {
        reason: string;
        organizationId: string;
        escalatedBy: string;
    }): Promise<Ticket>;
    resolveTicket(id: string, data: {
        resolution: string;
        organizationId: string;
        resolvedBy: string;
    }): Promise<Ticket>;
    getAssignedTickets(query: TicketQueryDto & {
        organizationId: string;
        userId: string;
    }): Promise<Pagination<Ticket, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getTimeline(id: string, organizationId: string): Promise<TicketActivity[]>;
    getDashboard(organizationId: string): Promise<any>;
    private sendTicketNotification;
    getTicketMetrics(organizationId: string): Promise<{
        total: number;
        byStatus: {};
        byType: {};
        byPriority: {};
        averageResolutionTime: number;
    }>;
    bulkAssignTickets(data: BulkTicketAssignmentDto & {
        organizationId: string;
        assignedBy: string;
    }): Promise<void>;
    uploadAttachment(ticketId: string, file: {
        originalname: string;
        size: number;
        mimetype: string;
        path: string;
    }, // Use inline interface instead of Express.Multer.File
    organizationId: string, uploadedById: string): Promise<TicketAttachment>;
    getTicketActivities(ticketId: string, organizationId: string): Promise<TicketActivity[]>;
}
