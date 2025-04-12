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
const ticket_query_dto_1 = require("../dto/ticket-query.dto");
const notifications_service_1 = require("../../notifications/services/notifications.service");
const user_entity_1 = require("../../users/entities/user.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
const ticket_priority_service_1 = require("./ticket-priority.service");
const message_template_service_1 = require("../../messages/services/message-template.service");
const message_template_entity_1 = require("../../messages/entities/message-template.entity");
const ticket_enums_1 = require("../enums/ticket.enums");
let TicketsService = class TicketsService {
    constructor(ticketRepository, commentRepository, attachmentRepository, activityRepository, dataSource, userRepository, eventEmitter, notificationsService, ticketPriorityService, messageTemplateService) {
        this.ticketRepository = ticketRepository;
        this.commentRepository = commentRepository;
        this.attachmentRepository = attachmentRepository;
        this.activityRepository = activityRepository;
        this.dataSource = dataSource;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        this.notificationsService = notificationsService;
        this.ticketPriorityService = ticketPriorityService;
        this.messageTemplateService = messageTemplateService;
    }
    async getRelatedTickets(ticketId, organizationId) {
        // Implement the logic to get related tickets
        return [];
    }
    async remove(id, organizationId) {
        const ticket = await this.findOne(id, organizationId);
        ticket.deletedAt = new Date();
        await this.ticketRepository.save(ticket);
    }
    async reopenTicket(id, reopenDetails) {
        const ticket = await this.ticketRepository.findOne({ where: { id, organizationId: reopenDetails.organizationId } });
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        ticket.status = ticket_enums_1.TicketStatus.OPEN;
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
        const assigneeUser = data.assignedToId ? await this.userRepository.findOne({ where: { id: data.assignedToId } }) : null;
        // Determine priority based on criteria
        const priority = await this.ticketPriorityService.determinePriority(data.organizationId, {
            patientCondition: data.patientCondition,
            timeSensitivity: data.timeSensitivity,
            impactLevel: data.impactLevel,
        });
        const ticket = this.ticketRepository.create({
            organizationId: data.organizationId,
            title: data.title,
            description: data.description,
            type: data.type,
            priorityId: priority.id,
            status: ticket_enums_1.TicketStatus.OPEN,
            createdBy: Promise.resolve(createdByUser),
            attachments: Promise.resolve([]),
            assigneeId: data.assignedToId,
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
        // Send notification based on ticket type
        await this.sendTicketNotification(savedTicket);
        return savedTicket;
    }
    async findAll(query) {
        const { organizationId, status, type, assigneeId, contactId, departmentId, search, startDate, endDate, limit = 10, offset = 0, } = query;
        const queryBuilder = this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('ticket.assignee', 'assignee')
            .leftJoinAndSelect('ticket.contact', 'contact')
            .leftJoinAndSelect('ticket.department', 'department');
        if (status) {
            queryBuilder.andWhere('ticket.status IN (:...status)', { status });
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
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: Math.floor(offset / limit) + 1, limit });
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
                const activity = new ticket_activity_entity_1.TicketActivity();
                activity.ticketId = id;
                activity.organizationId = data.organizationId;
                activity.performedById = data.updatedBy;
                activity.type = ticket_activity_type_enum_1.TicketActivityType.STATUS_CHANGED;
                activity.data = {
                    status: data.status,
                    note: data.note
                };
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
        const activity = new ticket_activity_entity_1.TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.assignedBy;
        activity.type = ticket_activity_type_enum_1.TicketActivityType.ASSIGNED;
        activity.data = {
            assigneeId: data.assigneeId,
            note: data.note
        };
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
        Object.assign(comment, Object.assign(Object.assign({}, data), { ticketId: ticket.id, userId: data.userId }));
        await this.commentRepository.save(comment);
        // Update ticket's last activity
        ticket.lastActivityAt = new Date();
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = new ticket_activity_entity_1.TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.userId;
        activity.type = ticket_activity_type_enum_1.TicketActivityType.COMMENT_ADDED;
        activity.data = { commentId: comment.id };
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
        ticket.status = ticket_enums_1.TicketStatus.IN_PROGRESS;
        ticket.escalatedAt = new Date();
        ticket.escalatedById = data.escalatedBy;
        ticket.escalationReason = data.reason;
        const escalatedByUser = await this.userRepository.findOne({ where: { id: data.escalatedBy } });
        if (escalatedByUser) {
            ticket.escalatedBy = Promise.resolve(escalatedByUser);
        }
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = new ticket_activity_entity_1.TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.escalatedBy;
        activity.type = ticket_activity_type_enum_1.TicketActivityType.ESCALATED;
        activity.data = { reason: data.reason };
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
        ticket.status = ticket_enums_1.TicketStatus.RESOLVED;
        ticket.resolvedAt = new Date();
        ticket.resolvedById = data.resolvedBy;
        ticket.resolution = data.resolution;
        const resolvedByUser = await this.userRepository.findOne({ where: { id: data.resolvedBy } });
        if (resolvedByUser) {
            ticket.resolvedBy = Promise.resolve(resolvedByUser);
        }
        await this.ticketRepository.save(ticket);
        // Create activity record
        const activity = new ticket_activity_entity_1.TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.resolvedBy;
        activity.type = ticket_activity_type_enum_1.TicketActivityType.RESOLUTION;
        activity.data = { resolution: data.resolution };
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
        const { organizationId, userId, status, type, contactId, departmentId, search, startDate, endDate, limit = 10, offset = 0, } = query;
        const queryBuilder = this.ticketRepository
            .createQueryBuilder('ticket')
            .where('ticket.organizationId = :organizationId', { organizationId })
            .andWhere('ticket.assigneeId = :assigneeId', { assigneeId: userId })
            .leftJoinAndSelect('ticket.contact', 'contact')
            .leftJoinAndSelect('ticket.department', 'department');
        if (status) {
            queryBuilder.andWhere('ticket.status IN (:...status)', { status });
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
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: Math.floor(offset / limit) + 1, limit });
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
            'COUNT(CASE WHEN status = :inProgress THEN 1 END) as escalated',
            'COUNT(CASE WHEN priority = :urgent THEN 1 END) as urgent',
        ])
            .setParameter('open', ticket_enums_1.TicketStatus.OPEN)
            .setParameter('inProgress', ticket_enums_1.TicketStatus.IN_PROGRESS)
            .setParameter('urgent', 'URGENT')
            .getRawOne();
        return stats;
    }
    async sendTicketNotification(ticket) {
        var _a;
        let templateType;
        let context = {
            ticketId: ticket.id,
            ticketTitle: ticket.title,
            ticketDescription: ticket.description,
            priority: (_a = ticket.priority) === null || _a === void 0 ? void 0 : _a.name,
        };
        switch (ticket.type) {
            case ticket_enums_1.TicketType.APPOINTMENT_REQUEST:
                templateType = message_template_entity_1.TemplateType.APPOINTMENT_REMINDER;
                break;
            case ticket_enums_1.TicketType.LAB_RESULTS:
                templateType = message_template_entity_1.TemplateType.LAB_RESULTS;
                break;
            case ticket_enums_1.TicketType.REFERRAL:
                templateType = message_template_entity_1.TemplateType.REFERRAL;
                break;
            default:
                templateType = message_template_entity_1.TemplateType.GENERAL;
        }
        const template = await this.messageTemplateService.findAll(ticket.organizationId, templateType);
        if (template.length > 0) {
            const renderedContent = await this.messageTemplateService.renderTemplate(template[0], context);
            // TODO: Implement actual notification sending (email, SMS, etc.)
            console.log('Notification content:', renderedContent);
        }
    }
    async getTicketMetrics(organizationId) {
        const query = new ticket_query_dto_1.TicketQueryDto();
        query.organizationId = organizationId;
        const tickets = await this.findAll(query);
        const metrics = {
            total: tickets.items.length,
            byStatus: {},
            byType: {},
            byPriority: {},
            averageResolutionTime: 0,
        };
        // Calculate metrics
        tickets.items.forEach(ticket => {
            // Count by status
            metrics.byStatus[ticket.status] = (metrics.byStatus[ticket.status] || 0) + 1;
            // Count by type
            metrics.byType[ticket.type] = (metrics.byType[ticket.type] || 0) + 1;
            // Count by priority
            if (ticket.priority) {
                metrics.byPriority[ticket.priority.level] = (metrics.byPriority[ticket.priority.level] || 0) + 1;
            }
            // Calculate resolution time for resolved tickets
            if (ticket.status === ticket_enums_1.TicketStatus.RESOLVED && ticket.resolvedAt && ticket.createdAt) {
                const resolutionTime = ticket.resolvedAt.getTime() - ticket.createdAt.getTime();
                metrics.averageResolutionTime += resolutionTime;
            }
        });
        // Calculate average resolution time
        const resolvedCount = metrics.byStatus[ticket_enums_1.TicketStatus.RESOLVED] || 0;
        metrics.averageResolutionTime = resolvedCount > 0
            ? metrics.averageResolutionTime / resolvedCount
            : 0;
        return metrics;
    }
    async bulkAssignTickets(data) {
        const { ticketIds, assigneeId, note, organizationId, assignedBy } = data;
        const assignee = await this.userRepository.findOne({
            where: { id: assigneeId, organizationId },
        });
        if (!assignee) {
            throw new common_1.NotFoundException('Assignee not found');
        }
        const tickets = await this.ticketRepository.find({
            where: {
                id: (0, typeorm_2.In)(ticketIds),
                organizationId,
            },
        });
        if (tickets.length !== ticketIds.length) {
            throw new common_1.NotFoundException('One or more tickets not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const ticket of tickets) {
                ticket.assigneeId = assigneeId;
                const updatedByUser = await this.userRepository.findOne({ where: { id: assignedBy } });
                if (updatedByUser) {
                    ticket.updatedBy = Promise.resolve(updatedByUser);
                }
                await queryRunner.manager.save(ticket);
                // Create activity record
                const activity = new ticket_activity_entity_1.TicketActivity();
                activity.ticketId = ticket.id;
                activity.organizationId = organizationId;
                activity.performedById = assignedBy;
                activity.type = ticket_activity_type_enum_1.TicketActivityType.ASSIGNED;
                activity.data = {
                    description: `Ticket assigned to ${assignee.firstName} ${assignee.lastName}`,
                    previousAssigneeId: ticket.assigneeId,
                    newAssigneeId: assigneeId,
                    note,
                };
                await queryRunner.manager.save(activity);
                // Emit event
                this.eventEmitter.emit('ticket.assigned', {
                    ticket,
                    assignee,
                    assignedBy,
                    note,
                });
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async uploadAttachment(ticketId, file, organizationId, uploadedById) {
        const ticket = await this.findOne(ticketId, organizationId);
        const attachment = new ticket_attachment_entity_1.TicketAttachment();
        attachment.ticketId = ticketId;
        attachment.organizationId = organizationId;
        attachment.fileName = file.originalname;
        attachment.fileSize = file.size;
        attachment.mimeType = file.mimetype;
        attachment.storageKey = file.path;
        attachment.uploadedById = uploadedById;
        const savedAttachment = await this.attachmentRepository.save(attachment);
        // Create activity record
        const activity = new ticket_activity_entity_1.TicketActivity();
        activity.ticketId = ticketId;
        activity.organizationId = organizationId;
        activity.performedById = uploadedById;
        activity.type = ticket_activity_type_enum_1.TicketActivityType.ATTACHMENT_ADDED;
        activity.data = {
            description: `Attachment ${file.originalname} added`,
            attachmentId: savedAttachment.id,
            fileName: file.originalname,
            fileSize: file.size,
        };
        await this.activityRepository.save(activity);
        // Emit event
        this.eventEmitter.emit('ticket.attachment.added', {
            ticket,
            attachment: savedAttachment,
            uploadedBy: uploadedById,
        });
        return savedAttachment;
    }
    async getTicketActivities(ticketId, organizationId) {
        const ticket = await this.findOne(ticketId, organizationId);
        return this.activityRepository.find({
            where: {
                ticketId,
                organizationId,
            },
            order: {
                createdAt: 'DESC',
            },
            relations: ['user'],
        });
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
        notifications_service_1.NotificationsService,
        ticket_priority_service_1.TicketPriorityService,
        message_template_service_1.MessageTemplateService])
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map