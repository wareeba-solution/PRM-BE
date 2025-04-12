// src/modules/tickets/services/tickets.service.ts

import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
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
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';
import { TicketPriorityService } from './ticket-priority.service';
import { MessageTemplateService } from '../../messages/services/message-template.service';
import { TemplateType } from '../../messages/entities/message-template.entity';
import { TicketStatus, TicketType } from '../enums/ticket.enums';
import { Express } from 'express';
import * as multer from 'multer';


// Define a simplified assignment DTO for single assignment operations
interface SingleTicketAssignmentDto {
    assigneeId: string;
    note?: string;
}

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(TicketComment)
        private readonly commentRepository: Repository<TicketComment>,
        @InjectRepository(TicketAttachment)
        private readonly attachmentRepository: Repository<TicketAttachment>,
        @InjectRepository(TicketActivity)
        private readonly activityRepository: Repository<TicketActivity>,
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly eventEmitter: EventEmitter2,
        private readonly notificationsService: NotificationsService,
        private readonly ticketPriorityService: TicketPriorityService,
        private readonly messageTemplateService: MessageTemplateService,
    ) { }
    async getRelatedTickets(ticketId: string, organizationId: string): Promise<any> {
        // Implement the logic to get related tickets
        return [];
    }

    async remove(
        id: string,
        organizationId: string
    ): Promise<void> {
        const ticket = await this.findOne(id, organizationId);
        ticket.deletedAt = new Date();
        await this.ticketRepository.save(ticket);
    }

    async reopenTicket(id: string, reopenDetails: { reason: string; organizationId: string; reopenedBy: string }) {
        const ticket = await this.ticketRepository.findOne({ where: { id, organizationId: reopenDetails.organizationId } });
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        ticket.status = TicketStatus.OPEN;
        ticket.reopenReason = reopenDetails.reason;
        const reopenedByUser = await this.userRepository.findOne({ where: { id: reopenDetails.reopenedBy } });
        if (!reopenedByUser) {
            throw new NotFoundException('User not found');
        }
        ticket.reopenedBy = Promise.resolve(reopenedByUser);
        await this.ticketRepository.save(ticket);
        return ticket;
    }

    async create(data: CreateTicketDto): Promise<Ticket> {
        const createdByUser = await this.userRepository.findOne({ where: { id: data.createdBy } });
        if (!createdByUser) {
            throw new NotFoundException('User not found');
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
            status: TicketStatus.OPEN,
            createdBy: Promise.resolve(createdByUser),
            attachments: Promise.resolve([]),
            assigneeId: data.assignedToId,
            tags: data.tags,
            metadata: data.metadata,
        });

        const savedTicket = await this.ticketRepository.save(ticket);

        if (data.attachments?.length) {
            const attachments = data.attachments.map(attachmentData => {
                const attachment = new TicketAttachment();
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

    async findAll(query: TicketQueryDto & { organizationId: string }) {
        const {
            organizationId,
            status,
            type,
            assigneeId,
            contactId,
            departmentId,
            search,
            startDate,
            endDate,
            limit = 10,
            offset = 0,
        } = query;

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
            queryBuilder.andWhere(
                '(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)',
                { search: `%${search}%` }
            );
        }

        if (startDate) {
            queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate });
        }

        if (endDate) {
            queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate });
        }

        queryBuilder.orderBy('ticket.createdAt', 'DESC');

        return paginate(queryBuilder, { page: Math.floor(offset / limit) + 1, limit });
    }

    async findOne(id: string, organizationId: string): Promise<Ticket> {
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
            throw new NotFoundException('Ticket not found');
        }

        return ticket;
    }

    async update(
        id: string,
        data: UpdateTicketDto & { organizationId: string; updatedBy: string; note?: string }
    ): Promise<Ticket> {
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
                const activity = new TicketActivity();
                activity.ticketId = id;
                activity.organizationId = data.organizationId;
                activity.performedById = data.updatedBy;
                activity.type = TicketActivityType.STATUS_CHANGED;
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
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async assignTicket(
        id: string,
        data: BulkTicketAssignmentDto & { organizationId: string; assignedBy: string }
    ): Promise<Ticket> {
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
        const activity = new TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.assignedBy;
        activity.type = TicketActivityType.ASSIGNED;
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

    async addComment(
        id: string,
        data: CreateTicketCommentDto & { organizationId: string; userId: string }
    ): Promise<TicketComment> {
        const ticket = await this.findOne(id, data.organizationId);

        // Create comment
        const comment = new TicketComment();
        Object.assign(comment, {
            ...data,
            ticketId: ticket.id,
            userId: data.userId
        });

        await this.commentRepository.save(comment);

        // Update ticket's last activity
        ticket.lastActivityAt = new Date();
        await this.ticketRepository.save(ticket);

        // Create activity record
        const activity = new TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.userId;
        activity.type = TicketActivityType.COMMENT_ADDED;
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

    async escalateTicket(
        id: string,
        data: { reason: string; organizationId: string; escalatedBy: string }
    ): Promise<Ticket> {
        const ticket = await this.findOne(id, data.organizationId);

        ticket.status = TicketStatus.IN_PROGRESS;
        ticket.escalatedAt = new Date();
        ticket.escalatedById = data.escalatedBy;
        ticket.escalationReason = data.reason;
        
        const escalatedByUser = await this.userRepository.findOne({ where: { id: data.escalatedBy } });
        if (escalatedByUser) {
            ticket.escalatedBy = Promise.resolve(escalatedByUser);
        }

        await this.ticketRepository.save(ticket);

        // Create activity record
        const activity = new TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.escalatedBy;
        activity.type = TicketActivityType.ESCALATED;
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

    async resolveTicket(
        id: string,
        data: { resolution: string; organizationId: string; resolvedBy: string }
    ): Promise<Ticket> {
        const ticket = await this.findOne(id, data.organizationId);

        ticket.status = TicketStatus.RESOLVED;
        ticket.resolvedAt = new Date();
        ticket.resolvedById = data.resolvedBy;
        ticket.resolution = data.resolution;
        
        const resolvedByUser = await this.userRepository.findOne({ where: { id: data.resolvedBy } });
        if (resolvedByUser) {
            ticket.resolvedBy = Promise.resolve(resolvedByUser);
        }

        await this.ticketRepository.save(ticket);

        // Create activity record
        const activity = new TicketActivity();
        activity.ticketId = id;
        activity.organizationId = data.organizationId;
        activity.performedById = data.resolvedBy;
        activity.type = TicketActivityType.RESOLUTION;
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

    async getAssignedTickets(query: TicketQueryDto & { organizationId: string; userId: string }) {
        const {
            organizationId,
            userId,
            status,
            type,
            contactId,
            departmentId,
            search,
            startDate,
            endDate,
            limit = 10,
            offset = 0,
        } = query;

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
            queryBuilder.andWhere(
                '(LOWER(ticket.title) LIKE LOWER(:search) OR LOWER(ticket.description) LIKE LOWER(:search) OR ticket.referenceNumber LIKE :search)',
                { search: `%${search}%` }
            );
        }

        if (startDate) {
            queryBuilder.andWhere('ticket.createdAt >= :startDate', { startDate });
        }

        if (endDate) {
            queryBuilder.andWhere('ticket.createdAt <= :endDate', { endDate });
        }

        queryBuilder.orderBy('ticket.createdAt', 'DESC');

        return paginate(queryBuilder, { page: Math.floor(offset / limit) + 1, limit });
    }

    async getTimeline(id: string, organizationId: string) {
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

    async getDashboard(organizationId: string) {
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
            .setParameter('open', TicketStatus.OPEN)
            .setParameter('inProgress', TicketStatus.IN_PROGRESS)
            .setParameter('urgent', 'URGENT')
            .getRawOne();

        return stats;
    }

    private async sendTicketNotification(ticket: Ticket) {
        let templateType: TemplateType;
        let context: Record<string, any> = {
            ticketId: ticket.id,
            ticketTitle: ticket.title,
            ticketDescription: ticket.description,
            priority: ticket.priority?.name,
        };

        switch (ticket.type) {
            case TicketType.APPOINTMENT_REQUEST:
                templateType = TemplateType.APPOINTMENT_REMINDER;
                break;
            case TicketType.LAB_RESULTS:
                templateType = TemplateType.LAB_RESULTS;
                break;
            case TicketType.REFERRAL:
                templateType = TemplateType.REFERRAL;
                break;
            default:
                templateType = TemplateType.GENERAL;
        }

        const template = await this.messageTemplateService.findAll(ticket.organizationId, templateType);
        if (template.length > 0) {
            const renderedContent = await this.messageTemplateService.renderTemplate(template[0], context);
            // TODO: Implement actual notification sending (email, SMS, etc.)
            console.log('Notification content:', renderedContent);
        }
    }

    async getTicketMetrics(organizationId: string) {
        const query = new TicketQueryDto();
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
            if (ticket.status === TicketStatus.RESOLVED && ticket.resolvedAt && ticket.createdAt) {
                const resolutionTime = ticket.resolvedAt.getTime() - ticket.createdAt.getTime();
                metrics.averageResolutionTime += resolutionTime;
            }
        });

        // Calculate average resolution time
        const resolvedCount = metrics.byStatus[TicketStatus.RESOLVED] || 0;
        metrics.averageResolutionTime = resolvedCount > 0 
            ? metrics.averageResolutionTime / resolvedCount 
            : 0;

        return metrics;
    }

    async bulkAssignTickets(data: BulkTicketAssignmentDto & { organizationId: string; assignedBy: string }): Promise<void> {
        const { ticketIds, assigneeId, note, organizationId, assignedBy } = data;

        const assignee = await this.userRepository.findOne({
            where: { id: assigneeId, organizationId },
        });

        if (!assignee) {
            throw new NotFoundException('Assignee not found');
        }

        const tickets = await this.ticketRepository.find({
            where: {
                id: In(ticketIds),
                organizationId,
            },
        });

        if (tickets.length !== ticketIds.length) {
            throw new NotFoundException('One or more tickets not found');
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
                const activity = new TicketActivity();
                activity.ticketId = ticket.id;
                activity.organizationId = organizationId;
                activity.performedById = assignedBy;
                activity.type = TicketActivityType.ASSIGNED;
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
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async uploadAttachment(
        ticketId: string,
        file: multer.File,
        organizationId: string,
        uploadedById: string,
    ): Promise<TicketAttachment> {
        const ticket = await this.findOne(ticketId, organizationId);

        const attachment = new TicketAttachment();
        attachment.ticketId = ticketId;
        attachment.organizationId = organizationId;
        attachment.fileName = file.originalname;
        attachment.fileSize = file.size;
        attachment.mimeType = file.mimetype;
        attachment.storageKey = file.path;
        attachment.uploadedById = uploadedById;

        const savedAttachment = await this.attachmentRepository.save(attachment);

        // Create activity record
        const activity = new TicketActivity();
        activity.ticketId = ticketId;
        activity.organizationId = organizationId;
        activity.performedById = uploadedById;
        activity.type = TicketActivityType.ATTACHMENT_ADDED;
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

    async getTicketActivities(ticketId: string, organizationId: string): Promise<TicketActivity[]> {
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
}