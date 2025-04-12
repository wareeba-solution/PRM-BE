import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CreateTicketCommentDto } from '../dto/ticket-comment.dto';
import { BulkTicketAssignmentDto } from '../dto/ticket-assignment.dto';
import { TicketQueryDto } from '../dto/ticket-query.dto';
import { OrganizationRequest } from '../../../interfaces/request.interface';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketComment } from '../entities/ticket-comment.entity';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Multer } from 'multer';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, user: User, req: OrganizationRequest): Promise<Ticket>;
    findAll(query: TicketQueryDto, req: OrganizationRequest): Promise<Pagination<Ticket, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getTicketMetrics(req: OrganizationRequest): Promise<{
        total: number;
        byStatus: {};
        byType: {};
        byPriority: {};
        averageResolutionTime: number;
    }>;
    getAssignedTickets(query: TicketQueryDto, user: User, req: OrganizationRequest): Promise<Pagination<Ticket, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: string, req: OrganizationRequest): Promise<Ticket>;
    update(id: string, updateTicketDto: UpdateTicketDto, user: User, req: OrganizationRequest): Promise<Ticket>;
    remove(id: string, req: OrganizationRequest): Promise<void>;
    addComment(id: string, createCommentDto: CreateTicketCommentDto, user: User, req: OrganizationRequest): Promise<TicketComment>;
    bulkAssignTickets(bulkAssignmentDto: BulkTicketAssignmentDto, user: User, req: OrganizationRequest): Promise<void>;
    uploadAttachment(id: string, file: Multer.File, user: User, req: OrganizationRequest): Promise<TicketAttachment>;
    getTicketActivities(id: string, req: OrganizationRequest): Promise<TicketActivity[]>;
    reopenTicket(id: string, data: {
        reason: string;
    }, user: User, req: OrganizationRequest): Promise<Ticket>;
    escalateTicket(id: string, data: {
        reason: string;
    }, user: User, req: OrganizationRequest): Promise<Ticket>;
    resolveTicket(id: string, data: {
        resolution: string;
    }, user: User, req: OrganizationRequest): Promise<Ticket>;
}
