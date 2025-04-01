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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Message } from '../entities/message.entity';
import { MessageTemplate } from '../entities/message-template.entity';
import { MessageAttachment } from '../entities/message-attachment.entity';
import { MessageType, MessageStatus } from '../dto/create-message.dto';
import { Contact } from '../../contacts/entities/contact.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { paginate } from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';
let MessagesService = class MessagesService {
    constructor(messageRepository, templateRepository, attachmentRepository, contactRepository, userRepository, dataSource, eventEmitter) {
        this.messageRepository = messageRepository;
        this.templateRepository = templateRepository;
        this.attachmentRepository = attachmentRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.eventEmitter = eventEmitter;
    }
    asPromiseEntity(entity) {
        return Promise.resolve(entity);
    }
    async withTransaction(callback) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await callback(queryRunner);
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getValidContact(contactId, organizationId, messageType) {
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId },
        });
        if (!contact) {
            throw new NotFoundException(`Contact with ID ${contactId} not found`);
        }
        if (messageType === MessageType.EMAIL && !contact.email) {
            throw new BadRequestException('Contact has no email address');
        }
        if (messageType === MessageType.SMS && !contact.phoneNumber) {
            throw new BadRequestException('Contact has no phone number');
        }
        return contact;
    }
    async getUser(userId, errorContext) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new NotFoundException(`${errorContext} with ID ${userId} not found`);
        }
        return user;
    }
    prepareEmailOptions(data) {
        var _a, _b, _c, _d, _e;
        if (data.type !== MessageType.EMAIL) {
            return undefined;
        }
        return {
            subject: ((_a = data.emailOptions) === null || _a === void 0 ? void 0 : _a.subject) || 'No Subject',
            cc: (_b = data.emailOptions) === null || _b === void 0 ? void 0 : _b.cc,
            bcc: (_c = data.emailOptions) === null || _c === void 0 ? void 0 : _c.bcc,
            trackOpens: (_d = data.emailOptions) === null || _d === void 0 ? void 0 : _d.trackOpens,
            trackClicks: (_e = data.emailOptions) === null || _e === void 0 ? void 0 : _e.trackClicks
        };
    }
    async applyTemplate(message, templateId, organizationId, contact) {
        if (!templateId)
            return;
        const template = await this.templateRepository.findOne({
            where: { id: templateId, organizationId },
        });
        if (!template) {
            throw new NotFoundException(`Template with ID ${templateId} not found`);
        }
        message.content = this.processTemplate(template.content, contact);
    }
    createAttachmentEntities(attachments, message) {
        if (!attachments || attachments.length === 0) {
            return [];
        }
        return attachments.map(attachment => {
            return this.attachmentRepository.create({
                fileName: attachment.fileName,
                fileSize: attachment.fileSize ? Number(attachment.fileSize) : 0,
                mimeType: attachment.fileType,
                filePath: attachment.fileUrl,
                publicUrl: attachment.fileUrl,
                isUploaded: true,
                message: message,
                messageId: message.id
            });
        });
    }
    async create(data) {
        return this.withTransaction(async (queryRunner) => {
            const [contact, sender] = await Promise.all([
                this.getValidContact(data.contactId, data.organizationId, data.type),
                this.getUser(data.senderId, 'Sender')
            ]);
            const messageData = {
                content: data.content,
                type: data.type,
                scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                metadata: data.metadata,
                organizationId: data.organizationId,
                contactId: contact.id,
                senderId: sender.id,
                status: data.scheduledFor ? MessageStatus.SCHEDULED : MessageStatus.QUEUED,
                priority: data.priority,
                requireConfirmation: data.requireConfirmation || false,
                notes: data.notes,
                externalId: data.externalId,
                templateId: data.templateId,
                emailOptions: this.prepareEmailOptions(data)
            };
            const message = this.messageRepository.create(messageData);
            await this.applyTemplate(message, data.templateId, data.organizationId, contact);
            await queryRunner.manager.save(message);
            const attachmentEntities = this.createAttachmentEntities(data.attachments, message);
            if (attachmentEntities.length > 0) {
                await queryRunner.manager.save(MessageAttachment, attachmentEntities);
            }
            if (!data.scheduledFor) {
                this.eventEmitter.emit('message.created', message);
            }
            return message;
        });
    }
    async findAll(query) {
        const { organizationId, type, status, startDate, endDate, page = 1, limit = 10 } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .where('message.organizationId = :organizationId', { organizationId })
            .leftJoinAndSelect('message.contact', 'contact')
            .leftJoinAndSelect('message.sender', 'sender')
            .leftJoinAndSelect('message.attachments', 'attachments');
        if (type) {
            queryBuilder.andWhere('message.type = :type', { type });
        }
        if (status) {
            queryBuilder.andWhere('message.status = :status', { status });
        }
        if (startDate) {
            queryBuilder.andWhere('message.createdAt >= :startDate', { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere('message.createdAt <= :endDate', { endDate });
        }
        queryBuilder.orderBy('message.createdAt', 'DESC');
        return paginate(queryBuilder, { page, limit });
    }
    async getConversations(query) {
        const { organizationId, page = 1, limit = 10 } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .select('DISTINCT ON (message.contactId) message.*')
            .where('message.organizationId = :organizationId', { organizationId })
            .orderBy('message.contactId')
            .addOrderBy('message.createdAt', 'DESC');
        return paginate(queryBuilder, { page, limit });
    }
    async getConversation(contactId, query) {
        const { organizationId, page = 1, limit = 20 } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .where('message.organizationId = :organizationId', { organizationId })
            .andWhere('message.contactId = :contactId', { contactId })
            .leftJoinAndSelect('message.attachments', 'attachments')
            .orderBy('message.createdAt', 'DESC');
        return paginate(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const message = await this.messageRepository.findOne({
            where: { id, organizationId },
            relations: ['contact', 'sender', 'attachments'],
        });
        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async update(id, data) {
        const [message, user] = await Promise.all([
            this.findOne(id, data.organizationId),
            this.getUser(data.updatedBy, 'User')
        ]);
        if (message.status === MessageStatus.SENT || message.status === MessageStatus.DELIVERED) {
            throw new BadRequestException('Cannot update sent or delivered messages');
        }
        if (data.subject && message.type === MessageType.EMAIL) {
            const emailOptions = message.emailOptions || { subject: 'No Subject' };
            emailOptions.subject = data.subject;
            message.emailOptions = emailOptions;
        }
        if (data.content)
            message.content = data.content;
        if (data.status)
            message.status = data.status;
        if (data.scheduledFor)
            message.scheduledFor = new Date(data.scheduledFor);
        if (data.metadata)
            message.metadata = data.metadata;
        if (data.notes)
            message.notes = data.notes;
        message.updatedById = data.updatedBy;
        return this.messageRepository.save(message);
    }
    async remove(id, organizationId) {
        const message = await this.findOne(id, organizationId);
        await this.messageRepository.softRemove(message);
    }
    async createTemplate(data) {
        const user = await this.getUser(data.createdBy, 'User');
        const { category } = data, restData = __rest(data, ["category"]);
        const templateData = {
            name: data.name,
            description: data.description,
            type: data.type,
            subject: data.subject || '',
            content: data.content,
            parameters: data.variables || {},
            isDefault: data.isDefault || false,
            isActive: true,
            organizationId: data.organizationId,
            createdById: data.createdBy,
            metadata: {}
        };
        const templateEntity = this.templateRepository.create(templateData);
        const template = Array.isArray(templateEntity) ? templateEntity[0] : templateEntity;
        if (category) {
            if (typeof category === 'string') {
                template.category = { id: category };
            }
            else if (category && typeof category === 'object') {
                template.category = category;
            }
        }
        const result = await this.templateRepository.save(template);
        return Array.isArray(result) ? result[0] : result;
    }
    async getTemplates(query) {
        return this.templateRepository.find({
            where: { organizationId: query.organizationId },
            order: { name: 'ASC' },
        });
    }
    async sendBulk(data) {
        return this.withTransaction(async (queryRunner) => {
            const contacts = await this.contactRepository.find({
                where: { id: In(data.contactIds), organizationId: data.organizationId },
            });
            if (contacts.length !== data.contactIds.length) {
                throw new BadRequestException('Some contacts were not found');
            }
            if (!data.messageData) {
                throw new BadRequestException('Message data is required');
            }
            const sender = await this.getUser(data.senderId, 'Sender');
            const messagesData = contacts.map(contact => {
                return {
                    content: data.content || '',
                    subject: data.subject,
                    type: data.type,
                    scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                    organizationId: data.organizationId,
                    contactId: contact.id,
                    senderId: data.senderId,
                    status: data.scheduledFor ? MessageStatus.SCHEDULED : MessageStatus.QUEUED,
                    templateId: data.templateId
                };
            });
            const messages = this.messageRepository.create(messagesData);
            const savedMessages = await queryRunner.manager.save(Message, messages);
            if (data.attachments && data.attachments.length > 0) {
                const allAttachments = [];
                for (const message of savedMessages) {
                    data.attachments.forEach(attachment => {
                        const newAttachment = this.attachmentRepository.create({
                            fileName: attachment.filename,
                            fileSize: 0,
                            mimeType: attachment.contentType,
                            filePath: attachment.content,
                            publicUrl: attachment.content,
                            isUploaded: true,
                            message: message,
                            messageId: message.id
                        });
                        allAttachments.push(newAttachment);
                    });
                }
                if (allAttachments.length > 0) {
                    await queryRunner.manager.save(MessageAttachment, allAttachments);
                }
            }
            this.eventEmitter.emit('messages.bulk.created', savedMessages);
            return {
                success: true,
                count: savedMessages.length,
                messageIds: savedMessages.map(m => m.id),
            };
        });
    }
    async getStatistics(query) {
        const { organizationId, startDate, endDate } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .where('message.organizationId = :organizationId', { organizationId });
        if (startDate) {
            queryBuilder.andWhere('message.createdAt >= :startDate', { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere('message.createdAt <= :endDate', { endDate });
        }
        const stats = await queryBuilder
            .select([
            'COUNT(*) as total',
            'COUNT(CASE WHEN status = :sent THEN 1 END) as sent',
            'COUNT(CASE WHEN status = :delivered THEN 1 END) as delivered',
            'COUNT(CASE WHEN status = :failed THEN 1 END) as failed',
            'COUNT(CASE WHEN readAt IS NOT NULL THEN 1 END) as read',
        ])
            .setParameter('sent', MessageStatus.SENT)
            .setParameter('delivered', MessageStatus.DELIVERED)
            .setParameter('failed', MessageStatus.FAILED)
            .getRawOne();
        return stats;
    }
    async resend(id, context) {
        const [message, user] = await Promise.all([
            this.findOne(id, context.organizationId),
            this.getUser(context.userId, 'User')
        ]);
        if (message.status !== MessageStatus.FAILED) {
            throw new BadRequestException('Only failed messages can be resent');
        }
        const deliveryDetails = message.deliveryDetails || {};
        message.deliveryDetails = Object.assign({ provider: '', attempts: 0, lastAttempt: undefined, errorCode: undefined, errorMessage: undefined }, (message.deliveryDetails || {}));
        message.status = MessageStatus.QUEUED;
        message.updatedBy = this.asPromiseEntity(user);
        const savedMessage = await this.messageRepository.save(message);
        this.eventEmitter.emit('message.resend', savedMessage);
        return savedMessage;
    }
    async markAsRead(id, context) {
        const message = await this.findOne(id, context.organizationId);
        if (!message.readAt) {
            message.readAt = new Date();
            await this.messageRepository.save(message);
        }
        return message;
    }
    processTemplate(template, contact) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const value = contact[key];
            return value !== undefined && value !== null ? String(value) : match;
        });
    }
};
MessagesService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Message)),
    __param(1, InjectRepository(MessageTemplate)),
    __param(2, InjectRepository(MessageAttachment)),
    __param(3, InjectRepository(Contact)),
    __param(4, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        Repository,
        DataSource,
        EventEmitter2])
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages.service.js.map