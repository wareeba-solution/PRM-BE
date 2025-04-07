"use strict";
// src/modules/tickets/services/tickets.service.ts
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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const ticket_entity_1 = require("../entities/ticket.entity");
const ticket_comment_entity_1 = require("../entities/ticket-comment.entity");
const ticket_attachment_entity_1 = require("../entities/ticket-attachment.entity");
const ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const user_entity_1 = require("../../users/entities/user.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
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
        // Implement the logic to get related tickets
        return [];
    }
    async remove(id, organizationId) {
        const ticket = await this.findOne(id, organizationId);
        // Make sure TicketStatus.DELETED exists in your enum
        ticket.status = ticket_status_enum_1.TicketStatus.DELETED;
        ticket.deletedAt = new Date();
        await this.ticketRepository.save(ticket);
    }
    async reopenTicket(id, reopenDetails) {
        // Implement the logic to reopen a ticket
        // Example:
        const ticket = await this.ticketRepository.findOne({ where: { id, organizationId: reopenDetails.organizationId } });
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        ticket.status = ticket_status_enum_1.TicketStatus.REOPENED;
        ticket.reopenReason = reopenDetails.reason;
        const reopenedByUser = await this.userRepository.findOne({ where: { id: reopenDetails.reopenedBy } });
        if (!reopenedByUser) {
            throw new common_1.NotFoundException('User not found');
        }
        ticket.reopenedBy = Promise.resolve(reopenedByUser);
        await this.ticketRepository.save(ticket);
        return ticket;
    }
    async create(data) {
        var _a;
        const createdByUser = await this.userRepository.findOne({ where: { id: data.createdBy } });
        if (!createdByUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const assigneeUser = data.assigneeId ? await this.userRepository.findOne({ where: { id: data.assigneeId } }) : null;
        const ticket = this.ticketRepository.create({
            organizationId: data.organizationId,
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            category: data.category,
            status: ticket_status_enum_1.TicketStatus.OPEN,
            createdBy: Promise.resolve(createdByUser),
            attachments: Promise.resolve([]),
            assigneeId: data.assigneeId,
            tags: data.tags,
            metadata: data.metadata,
        });
        const savedTicket = await this.ticketRepository.save(ticket);
        if ((_a = data.attachments) === null || _a === void 0 ? void 0 : _a.length) {
            const attachments = data.attachments.map(attachmentData => {
                const attachment = new ticket_attachment_entity_1.TicketAttachment();
                Object.assign(attachment, attachmentData);
                attachment.ticketId = savedTicket.id;
                attachment.organizationId = data.organizationId;
                attachment.uploadedById = data.createdBy;
                return attachment;
            });
            await this.attachmentRepository.save(attachments);
            savedTicket.attachments = Promise.resolve(attachments);
            await this.ticketRepository.save(savedTicket);
        }
        return savedTicket;
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
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        // Using query builder to avoid TypeORM find() type issues
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
            throw new common_1.NotFoundException('Ticket not found');
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
            // Update ticket fields
            Object.assign(ticket, data);
            // Handle updatedBy relationship
            if (data.updatedBy) {
                const updatedByUser = await this.userRepository.findOne({ where: { id: data.updatedBy } });
                if (updatedByUser) {
                    ticket.updatedBy = Promise.resolve(updatedByUser);
                }
            }
            await queryRunner.manager.save(ticket);
            // Create activity record for status change
            if (data.status && data.status !== oldStatus) {
                const activity = this.activityRepository.create({
                    ticketId: id,
                    organizationId: data.organizationId,
                    performedById: data.updatedBy,
                    type: ticket_activity_type_enum_1.TicketActivityType.STATUS_CHANGED,
                    data: {
                        status: data.status,
                        note: data.statusNote
                    }
                });
                await queryRunner.manager.save(activity);
                // Send notification for status change
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
        if (data.assigneeId) {
            const assigneeUser = await this.userRepository.findOne({ where: { id: data.assigneeId } });
            if (assigneeUser) {
                ticket.assignee = Promise.resolve(assigneeUser);
            }
        }
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = this.activityRepository.create({
            ticketId: id,
            organizationId: data.organizationId,
            performedById: data.assignedBy,
            type: ticket_activity_type_enum_1.TicketActivityType.ASSIGNED,
            data: {
                assigneeId: data.assigneeId,
                note: data.note
            }
        });
        await this.activityRepository.save(activity);
        // Send notification to new assignee
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
        // Create comment
        const comment = new ticket_comment_entity_1.TicketComment();
        // Copy properties from data (content, isInternal, etc.)
        Object.assign(comment, data);
        comment.ticketId = ticket.id;
        comment.organizationId = data.organizationId;
        comment.authorId = data.userId; // Changed from userId to authorId
        await this.commentRepository.save(comment);
        // Update ticket's last activity
        ticket.lastActivityAt = new Date();
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = this.activityRepository.create({
            ticketId: id,
            organizationId: data.organizationId,
            performedById: data.userId,
            type: ticket_activity_type_enum_1.TicketActivityType.COMMENT_ADDED,
            data: { commentId: comment.id }
        });
        await this.activityRepository.save(activity);
        // Send notification if internal note
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
        ticket.status = ticket_status_enum_1.TicketStatus.ESCALATED;
        ticket.escalatedAt = new Date();
        ticket.escalatedById = data.escalatedBy;
        ticket.escalationReason = data.reason;
        const escalatedByUser = await this.userRepository.findOne({ where: { id: data.escalatedBy } });
        if (escalatedByUser) {
            ticket.escalatedBy = Promise.resolve(escalatedByUser);
        }
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = this.activityRepository.create({
            ticketId: id,
            organizationId: data.organizationId,
            performedById: data.escalatedBy,
            type: ticket_activity_type_enum_1.TicketActivityType.ESCALATED,
            data: { reason: data.reason }
        });
        await this.activityRepository.save(activity);
        // Notify administrators
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
        ticket.status = ticket_status_enum_1.TicketStatus.RESOLVED;
        ticket.resolvedAt = new Date();
        ticket.resolvedById = data.resolvedBy;
        ticket.resolution = data.resolution;
        const resolvedByUser = await this.userRepository.findOne({ where: { id: data.resolvedBy } });
        if (resolvedByUser) {
            ticket.resolvedBy = Promise.resolve(resolvedByUser);
        }
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = this.activityRepository.create({
            ticketId: id,
            organizationId: data.organizationId,
            performedById: data.resolvedBy,
            type: ticket_activity_type_enum_1.TicketActivityType.RESOLUTION,
            data: { resolution: data.resolution }
        });
        await this.activityRepository.save(activity);
        // Notify ticket creator if different from resolver
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
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async getTimeline(id, organizationId) {
        // Using query builder to avoid TypeORM find() type issues
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
            .setParameter('open', ticket_status_enum_1.TicketStatus.OPEN)
            .setParameter('inProgress', ticket_status_enum_1.TicketStatus.IN_PROGRESS)
            .setParameter('escalated', ticket_status_enum_1.TicketStatus.ESCALATED)
            .setParameter('urgent', 'URGENT')
            .getRawOne();
        return stats;
    }
};
TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_comment_entity_1.TicketComment)),
    __param(2, (0, typeorm_1.InjectRepository)(ticket_attachment_entity_1.TicketAttachment)),
    __param(3, (0, typeorm_1.InjectRepository)(ticket_activity_entity_1.TicketActivity)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2,
        notifications_service_1.NotificationsService])
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map