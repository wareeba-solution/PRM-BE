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
import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Ticket } from '../entities/ticket.entity';
import { TicketComment } from '../entities/ticket-comment.entity';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { TicketStatus } from '../dto/create-ticket.dto';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { User } from '../../users/entities/user.entity';
import { paginate } from 'nestjs-typeorm-paginate';
let TicketsService = class TicketsService {
    constructor(ticketRepository, commentRepository, attachmentRepository, activityRepository, dataSource, userRepository, eventEmitter, notificationsService) {
        this.ticketRepository = ticketRepository;
        this.commentRepository = commentRepository;
        this.attachmentRepository = attachmentRepository;
        this.activityRepository = activityRepository;
        this.dataSource = dataSource;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        this.notificationsService = notificationsService;
    }
    async getRelatedTickets(ticketId, organizationId) {
        return [];
    }
    async remove(id, organizationId) {
        const ticket = await this.findOne(id, organizationId);
        ticket.status = TicketStatus.DELETED;
        ticket.deletedAt = new Date();
        await this.ticketRepository.save(ticket);
    }
    async reopenTicket(id, reopenDetails) {
        const ticket = await this.ticketRepository.findOne({ where: { id, organizationId: reopenDetails.organizationId } });
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        ticket.status = TicketStatus.REOPENED;
        ticket.reopenReason = reopenDetails.reason;
        const reopenedByUser = await this.userRepository.findOne({ where: { id: reopenDetails.reopenedBy } });
        if (!reopenedByUser) {
            throw new NotFoundException('User not found');
        }
        ticket.reopenedBy = reopenedByUser;
        await this.ticketRepository.save(ticket);
        return ticket;
    }
    async create(data) {
        var _a, _b;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const createdByUser = await this.userRepository.findOne({ where: { id: data.createdBy } });
            if (!createdByUser) {
                throw new NotFoundException('User not found');
            }
            const ticket = this.ticketRepository.create(Object.assign(Object.assign({}, data), { status: TicketStatus.OPEN, createdBy: createdByUser, attachments: (_a = data.attachments) === null || _a === void 0 ? void 0 : _a.map(attachmentData => {
                    const attachment = new TicketAttachment();
                    Object.assign(attachment, attachmentData);
                    attachment.organizationId = data.organizationId;
                    attachment.uploadedById = data.createdBy;
                    return attachment;
                }) }));
            await queryRunner.manager.save(ticket);
            if ((_b = data.attachments) === null || _b === void 0 ? void 0 : _b.length) {
                for (const attachmentData of data.attachments) {
                    const attachment = new TicketAttachment();
                    Object.assign(attachment, attachmentData);
                    attachment.ticketId = ticket.id;
                    attachment.organizationId = data.organizationId;
                    attachment.uploadedById = data.createdBy;
                    await queryRunner.manager.save(attachment);
                }
            }
            const activity = new TicketActivity();
            activity.ticketId = ticket.id;
            activity.organizationId = data.organizationId;
            activity.userId = data.createdBy;
            activity.action = 'CREATED';
            activity.details = { status: ticket.status };
            await queryRunner.manager.save(activity);
            await queryRunner.commitTransaction();
            if (ticket.assigneeId) {
                await this.notificationsService.create({
                    type: 'TICKET_ASSIGNED',
                    title: 'New Ticket Assigned',
                    content: `Ticket #${ticket.referenceNumber} has been assigned to you: ${ticket.title}`,
                    recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                    organizationId: data.organizationId,
                    senderId: data.createdBy,
                });
            }
            this.eventEmitter.emit('ticket.created', ticket);
            return ticket;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(query) {
        const { organizationId, status, priority, type, assigneeId, contactId, departmentId, search, startDate, endDate, page = 1, limit = 10, } = query;
        const queryBuilder = this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('ticket.assignee', 'assignee')
            .leftJoinAndSelect('ticket.contact', 'contact')
            .leftJoinAndSelect('ticket.department', 'department');
        if (status) {
            queryBuilder.andWhere('ticket.status = :status', { status });
        }
        if (priority) {
            queryBuilder.andWhere('ticket.priority = :priority', { priority });
        }
        if (type) {
            queryBuilder.andWhere('ticket.type = :type', { type });
        }
        if (assigneeId) {
            queryBuilder.andWhere('ticket.assigneeId = :assigneeId', { assigneeId });
        }
        if (contactId) {
            queryBuilder.andWhere('ticket.contactId = :contactId', { contactId });
        }
        if (departmentId) {
            queryBuilder.andWhere('ticket.departmentId = :departmentId', { departmentId });
        }
        if (search) {
            queryBuilder.andWhere('(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)', { search: `%${search}%` });
        }
        if (startDate) {
            queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate });
        }
        queryBuilder.orderBy('ticket.createdAt', 'DESC');
        return paginate(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const ticket = await this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.id = :id', { id })
            .andWhere('ticket.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('ticket.assignee', 'assignee')
            .leftJoinAndSelect('ticket.contact', 'contact')
            .leftJoinAndSelect('ticket.department', 'department')
            .leftJoinAndSelect('ticket.comments', 'comments')
            .leftJoinAndSelect('ticket.attachments', 'attachments')
            .leftJoinAndSelect('ticket.activities', 'activities')
            .getOne();
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        return ticket;
    }
    async update(id, data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const ticket = await this.findOne(id, data.organizationId);
            const oldStatus = ticket.status;
            Object.assign(ticket, data);
            await queryRunner.manager.save(ticket);
            if (data.status && data.status !== oldStatus) {
                const activity = new TicketActivity();
                activity.ticketId = ticket.id;
                activity.organizationId = data.organizationId;
                activity.userId = data.updatedBy;
                activity.action = 'STATUS_CHANGED';
                activity.details = {
                    oldStatus,
                    newStatus: data.status,
                    note: data.statusNote,
                };
                await queryRunner.manager.save(activity);
                if (ticket.assigneeId) {
                    await this.notificationsService.create({
                        type: 'TICKET_STATUS_CHANGED',
                        title: 'Ticket Status Updated',
                        content: `Ticket #${ticket.referenceNumber} status changed to ${data.status}`,
                        recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                        organizationId: data.organizationId,
                        senderId: data.updatedBy,
                    });
                }
            }
            await queryRunner.commitTransaction();
            return ticket;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignTicket(id, data) {
        const ticket = await this.findOne(id, data.organizationId);
        const oldAssigneeId = ticket.assigneeId;
        ticket.assigneeId = data.assigneeId;
        await this.ticketRepository.save(ticket);
        const activity = new TicketActivity();
        activity.ticketId = ticket.id;
        activity.organizationId = data.organizationId;
        activity.userId = data.assignedBy;
        activity.action = 'ASSIGNED';
        activity.details = {
            oldAssigneeId,
            newAssigneeId: data.assigneeId,
            note: data.note,
        };
        await this.activityRepository.save(activity);
        await this.notificationsService.create({
            type: 'TICKET_ASSIGNED',
            title: 'Ticket Assigned',
            content: `Ticket #${ticket.referenceNumber} has been assigned to you`,
            recipients: [{ userId: data.assigneeId }],
            organizationId: data.organizationId,
            senderId: data.assignedBy,
        });
        return ticket;
    }
    async addComment(id, data) {
        const ticket = await this.findOne(id, data.organizationId);
        const comment = new TicketComment();
        Object.assign(comment, data);
        comment.ticketId = ticket.id;
        comment.organizationId = data.organizationId;
        comment.userId = data.userId;
        await this.commentRepository.save(comment);
        ticket.lastActivityAt = new Date();
        await this.ticketRepository.save(ticket);
        const activity = new TicketActivity();
        activity.ticketId = ticket.id;
        activity.organizationId = data.organizationId;
        activity.userId = data.userId;
        activity.action = 'COMMENTED';
        activity.details = { commentId: comment.id };
        await this.activityRepository.save(activity);
        if (data.isInternal && ticket.assigneeId !== data.userId) {
            await this.notificationsService.create({
                type: 'TICKET_INTERNAL_NOTE',
                title: 'New Internal Note',
                content: `New internal note added to ticket #${ticket.referenceNumber}`,
                recipients: ticket.assigneeId ? [{ userId: ticket.assigneeId }] : [],
                organizationId: data.organizationId,
                senderId: data.userId,
            });
        }
        return comment;
    }
    async escalateTicket(id, data) {
        const ticket = await this.findOne(id, data.organizationId);
        ticket.status = TicketStatus.ESCALATED;
        ticket.escalatedAt = new Date();
        ticket.escalatedById = data.escalatedBy;
        ticket.escalationReason = data.reason;
        await this.ticketRepository.save(ticket);
        const activity = new TicketActivity();
        activity.ticketId = ticket.id;
        activity.organizationId = data.organizationId;
        activity.userId = data.escalatedBy;
        activity.action = 'ESCALATED';
        activity.details = { reason: data.reason };
        await this.activityRepository.save(activity);
        await this.notificationsService.create({
            type: 'TICKET_ESCALATED',
            title: 'Ticket Escalated',
            content: `Ticket #${ticket.referenceNumber} has been escalated: ${data.reason}`,
            priority: 'HIGH',
            recipients: [{ userId: 'ADMIN_USER_ID' }],
            organizationId: data.organizationId,
            senderId: data.escalatedBy,
        });
        return ticket;
    }
    async resolveTicket(id, data) {
        const ticket = await this.findOne(id, data.organizationId);
        ticket.status = TicketStatus.RESOLVED;
        ticket.resolvedAt = new Date();
        ticket.resolvedById = data.resolvedBy;
        ticket.resolution = data.resolution;
        await this.ticketRepository.save(ticket);
        const activity = new TicketActivity();
        activity.ticketId = ticket.id;
        activity.organizationId = data.organizationId;
        activity.userId = data.resolvedBy;
        activity.action = 'RESOLVED';
        activity.details = { resolution: data.resolution };
        await this.activityRepository.save(activity);
        if (ticket.createdById !== data.resolvedBy) {
            await this.notificationsService.create({
                type: 'TICKET_RESOLVED',
                title: 'Ticket Resolved',
                content: `Your ticket #${ticket.referenceNumber} has been resolved`,
                recipients: [{ userId: ticket.createdById }],
                organizationId: data.organizationId,
                senderId: data.resolvedBy,
            });
        }
        return ticket;
    }
    async getAssignedTickets(query) {
        const { organizationId, userId, status, priority, type, contactId, departmentId, search, startDate, endDate, page = 1, limit = 10, } = query;
        const queryBuilder = this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.organizationId = :organizationId', { organizationId })
            .andWhere('ticket.assigneeId = :assigneeId', { assigneeId: userId })
            .leftJoinAndSelect('ticket.contact', 'contact')
            .leftJoinAndSelect('ticket.department', 'department');
        if (status) {
            queryBuilder.andWhere('ticket.status = :status', { status });
        }
        if (priority) {
            queryBuilder.andWhere('ticket.priority = :priority', { priority });
        }
        if (type) {
            queryBuilder.andWhere('ticket.type = :type', { type });
        }
        if (contactId) {
            queryBuilder.andWhere('ticket.contactId = :contactId', { contactId });
        }
        if (departmentId) {
            queryBuilder.andWhere('ticket.departmentId = :departmentId', { departmentId });
        }
        if (search) {
            queryBuilder.andWhere('(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)', { search: `%${search}%` });
        }
        if (startDate) {
            queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate });
        }
        queryBuilder.orderBy('ticket.createdAt', 'DESC');
        return paginate(queryBuilder, { page, limit });
    }
    async getTimeline(id, organizationId) {
        const activities = await this.activityRepository
            .createQueryBuilder('activity')
            .where('activity.ticketId = :ticketId', { ticketId: id })
            .andWhere('activity.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('activity.user', 'user')
            .orderBy('activity.createdAt', 'DESC')
            .getMany();
        return activities;
    }
    async getDashboard(organizationId) {
        const stats = await this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.organizationId = :organizationId', { organizationId })
            .select([
            'COUNT(*) as total',
            'COUNT(CASE WHEN status = :open THEN 1 END) as open',
            'COUNT(CASE WHEN status = :inProgress THEN 1 END) as inProgress',
            'COUNT(CASE WHEN status = :escalated THEN 1 END) as escalated',
            'COUNT(CASE WHEN priority = :urgent THEN 1 END) as urgent',
        ])
            .setParameter('open', TicketStatus.OPEN)
            .setParameter('inProgress', TicketStatus.IN_PROGRESS)
            .setParameter('escalated', TicketStatus.ESCALATED)
            .setParameter('urgent', 'URGENT')
            .getRawOne();
        return stats;
    }
};
TicketsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Ticket)),
    __param(1, InjectRepository(TicketComment)),
    __param(2, InjectRepository(TicketAttachment)),
    __param(3, InjectRepository(TicketActivity)),
    __param(5, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        DataSource,
        Repository,
        EventEmitter2,
        NotificationsService])
], TicketsService);
export { TicketsService };
//# sourceMappingURL=tickets.service.js.map