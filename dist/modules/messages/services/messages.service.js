"use strict";
// src/modules/messages/services/messages.service.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
const message_template_entity_1 = require("../entities/message-template.entity");
const message_attachment_entity_1 = require("../entities/message-attachment.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
const contact_entity_1 = require("../../contacts/entities/contact.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const user_entity_1 = require("../../users/entities/user.entity");
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
    /**
     * Helper method to convert an entity to a Promise
     */
    asPromiseEntity(entity) {
        return Promise.resolve(entity);
    }
    /**
     * Execute a database operation within a transaction
     */
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
    /**
     * Validate and fetch a contact
     */
    async getValidContact(contactId, organizationId, messageType) {
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId },
        });
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID ${contactId} not found`);
        }
        // Validate contact info for specific message types
        if (messageType === create_message_dto_1.MessageType.EMAIL && !contact.email) {
            throw new common_1.BadRequestException('Contact has no email address');
        }
        if (messageType === create_message_dto_1.MessageType.SMS && !contact.phoneNumber) {
            throw new common_1.BadRequestException('Contact has no phone number');
        }
        return contact;
    }
    /**
     * Get a user by ID
     */
    async getUser(userId, errorContext) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new common_1.NotFoundException(`${errorContext} with ID ${userId} not found`);
        }
        return user;
    }
    /**
     * Prepare email options
     */
    prepareEmailOptions(data) {
        var _a, _b, _c, _d, _e;
        if (data.type !== create_message_dto_1.MessageType.EMAIL) {
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
    /**
     * Apply template content if template ID is provided
     */
    async applyTemplate(message, templateId, organizationId, contact) {
        if (!templateId)
            return;
        const template = await this.templateRepository.findOne({
            where: { id: templateId, organizationId },
        });
        if (!template) {
            throw new common_1.NotFoundException(`Template with ID ${templateId} not found`);
        }
        message.content = this.processTemplate(template.content, contact);
    }
    /**
     * Create message attachments
     */
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
    /**
     * Create a new message
     */
    async create(data) {
        return this.withTransaction(async (queryRunner) => {
            // Validate entities
            const [contact, sender] = await Promise.all([
                this.getValidContact(data.contactId, data.organizationId, data.type),
                this.getUser(data.senderId, 'Sender')
            ]);
            // Prepare message data using foreign keys instead of relation objects
            const messageData = {
                content: data.content,
                type: data.type,
                scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                metadata: data.metadata,
                organizationId: data.organizationId,
                contactId: contact.id,
                senderId: sender.id,
                status: data.scheduledFor ? create_message_dto_1.MessageStatus.SCHEDULED : create_message_dto_1.MessageStatus.QUEUED,
                priority: data.priority,
                requireConfirmation: data.requireConfirmation || false,
                notes: data.notes,
                externalId: data.externalId,
                templateId: data.templateId,
                emailOptions: this.prepareEmailOptions(data)
            };
            // Create and save message
            const message = this.messageRepository.create(messageData);
            await this.applyTemplate(message, data.templateId, data.organizationId, contact);
            await queryRunner.manager.save(message);
            // Handle attachments
            const attachmentEntities = this.createAttachmentEntities(data.attachments, message);
            if (attachmentEntities.length > 0) {
                await queryRunner.manager.save(message_attachment_entity_1.MessageAttachment, attachmentEntities);
            }
            // Emit event for immediate sending if not scheduled
            if (!data.scheduledFor) {
                this.eventEmitter.emit('message.created', message);
            }
            return message;
        });
    }
    /**
     * Find all messages with pagination and filtering
     */
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
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    /**
     * Get conversations grouped by contact
     */
    async getConversations(query) {
        const { organizationId, page = 1, limit = 10 } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .select('DISTINCT ON (message.contactId) message.*')
            .where('message.organizationId = :organizationId', { organizationId })
            .orderBy('message.contactId')
            .addOrderBy('message.createdAt', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    /**
     * Get a single conversation with a contact
     */
    async getConversation(contactId, query) {
        const { organizationId, page = 1, limit = 20 } = query;
        const queryBuilder = this.messageRepository
            .createQueryBuilder('message')
            .where('message.organizationId = :organizationId', { organizationId })
            .andWhere('message.contactId = :contactId', { contactId })
            .leftJoinAndSelect('message.attachments', 'attachments')
            .orderBy('message.createdAt', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    /**
     * Find a single message by ID
     */
    async findOne(id, organizationId) {
        const message = await this.messageRepository.findOne({
            where: { id, organizationId },
            relations: ['contact', 'sender', 'attachments'],
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    /**
     * Update a message
     */
    async update(id, data) {
        const [message, user] = await Promise.all([
            this.findOne(id, data.organizationId),
            this.getUser(data.updatedBy, 'User')
        ]);
        if (message.status === create_message_dto_1.MessageStatus.SENT || message.status === create_message_dto_1.MessageStatus.DELIVERED) {
            throw new common_1.BadRequestException('Cannot update sent or delivered messages');
        }
        // Apply updates selectively
        if (data.subject && message.type === create_message_dto_1.MessageType.EMAIL) {
            // Update email subject in emailOptions
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
    /**
     * Remove a message (soft delete)
     */
    async remove(id, organizationId) {
        const message = await this.findOne(id, organizationId);
        await this.messageRepository.softRemove(message);
    }
    /**
     * Create a message template
     */
    async createTemplate(data) {
        const user = await this.getUser(data.createdBy, 'User');
        // Extract category from data
        const { category } = data, restData = __rest(data, ["category"]);
        // Create template with explicit fields
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
        // Create the template entity and handle possible array return
        const templateEntity = this.templateRepository.create(templateData);
        // Ensure we're working with a single entity
        const template = Array.isArray(templateEntity) ? templateEntity[0] : templateEntity;
        // Handle category if provided
        if (category) {
            if (typeof category === 'string') {
                // If it's a string, set it as reference entity
                template.category = { id: category };
            }
            else if (category && typeof category === 'object') {
                // If it's an object, use it directly
                template.category = category;
            }
        }
        // Save and handle possible array return
        const result = await this.templateRepository.save(template);
        // Return the first item if it's an array, otherwise return the result directly
        return Array.isArray(result) ? result[0] : result;
    }
    /**
     * Get all templates for an organization
     */
    async getTemplates(query) {
        return this.templateRepository.find({
            where: { organizationId: query.organizationId },
            order: { name: 'ASC' },
        });
    }
    async sendBulk(data) {
        // Use transaction to ensure data consistency
        return this.withTransaction(async (queryRunner) => {
            // Find contacts
            const contacts = await this.contactRepository.find({
                where: { id: (0, typeorm_2.In)(data.contactIds), organizationId: data.organizationId },
            });
            if (contacts.length !== data.contactIds.length) {
                throw new common_1.BadRequestException('Some contacts were not found');
            }
            // Ensure data.messageData exists
            if (!data.messageData) {
                throw new common_1.BadRequestException('Message data is required');
            }
            // Get sender
            const sender = await this.getUser(data.senderId, 'Sender');
            // Create messages for each contact with explicit fields
            const messagesData = contacts.map(contact => {
                return {
                    content: data.content || '',
                    subject: data.subject,
                    type: data.type,
                    scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : undefined,
                    organizationId: data.organizationId,
                    contactId: contact.id,
                    senderId: data.senderId,
                    status: data.scheduledFor ? create_message_dto_1.MessageStatus.SCHEDULED : create_message_dto_1.MessageStatus.QUEUED,
                    templateId: data.templateId
                };
            });
            // Create and save message entities
            const messages = this.messageRepository.create(messagesData);
            const savedMessages = await queryRunner.manager.save(message_entity_1.Message, messages);
            // Handle attachments separately if any
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
                    await queryRunner.manager.save(message_attachment_entity_1.MessageAttachment, allAttachments);
                }
            }
            // Emit event for processing
            this.eventEmitter.emit('messages.bulk.created', savedMessages);
            return {
                success: true,
                count: savedMessages.length,
                messageIds: savedMessages.map(m => m.id),
            };
        });
    }
    /**
     * Get message statistics for an organization
     */
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
            .setParameter('sent', create_message_dto_1.MessageStatus.SENT)
            .setParameter('delivered', create_message_dto_1.MessageStatus.DELIVERED)
            .setParameter('failed', create_message_dto_1.MessageStatus.FAILED)
            .getRawOne();
        return stats;
    }
    /**
     * Resend a failed message
     */
    async resend(id, context) {
        // Get message and user in parallel
        const [message, user] = await Promise.all([
            this.findOne(id, context.organizationId),
            this.getUser(context.userId, 'User')
        ]);
        if (message.status !== create_message_dto_1.MessageStatus.FAILED) {
            throw new common_1.BadRequestException('Only failed messages can be resent');
        }
        // Update message
        // Ensure deliveryDetails exists before updating it
        const deliveryDetails = message.deliveryDetails || {};
        message.deliveryDetails = Object.assign({ provider: '', attempts: 0, lastAttempt: undefined, errorCode: undefined, errorMessage: undefined }, (message.deliveryDetails || {}));
        message.status = create_message_dto_1.MessageStatus.QUEUED;
        // Fix: Wrap user in Promise
        message.updatedBy = this.asPromiseEntity(user);
        const savedMessage = await this.messageRepository.save(message);
        // Emit event for processing
        this.eventEmitter.emit('message.resend', savedMessage);
        return savedMessage;
    }
    /**
     * Mark a message as read
     */
    async markAsRead(id, context) {
        const message = await this.findOne(id, context.organizationId);
        if (!message.readAt) {
            message.readAt = new Date();
            await this.messageRepository.save(message);
        }
        return message;
    }
    /**
     * Process a message template
     */
    processTemplate(template, contact) {
        // Replace template variables with contact data
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            // Use type-safe property access
            const value = contact[key];
            return value !== undefined && value !== null ? String(value) : match;
        });
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(message_template_entity_1.MessageTemplate)),
    __param(2, (0, typeorm_1.InjectRepository)(message_attachment_entity_1.MessageAttachment)),
    __param(3, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        event_emitter_1.EventEmitter2])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map