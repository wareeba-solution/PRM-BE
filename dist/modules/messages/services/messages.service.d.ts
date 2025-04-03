import { Repository, DataSource } from 'typeorm';
import { Message } from '../entities/message.entity';
import { MessageTemplate } from '../entities/message-template.entity';
import { MessageAttachment } from '../entities/message-attachment.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageQueryDto } from '../dto/message-query.dto';
import { MessageTemplateDto } from '../dto/message-template.dto';
import { BulkMessageDto } from '../dto/bulk-message.dto';
import { Contact } from '../../contacts/entities/contact.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../users/entities/user.entity';
export declare class MessagesService {
    private readonly messageRepository;
    private readonly templateRepository;
    private readonly attachmentRepository;
    private readonly contactRepository;
    private readonly userRepository;
    private readonly dataSource;
    private readonly eventEmitter;
    constructor(messageRepository: Repository<Message>, templateRepository: Repository<MessageTemplate>, attachmentRepository: Repository<MessageAttachment>, contactRepository: Repository<Contact>, userRepository: Repository<User>, dataSource: DataSource, eventEmitter: EventEmitter2);
    /**
     * Helper method to convert an entity to a Promise
     */
    private asPromiseEntity;
    /**
     * Execute a database operation within a transaction
     */
    private withTransaction;
    /**
     * Validate and fetch a contact
     */
    private getValidContact;
    /**
     * Get a user by ID
     */
    private getUser;
    /**
     * Prepare email options
     */
    private prepareEmailOptions;
    /**
     * Apply template content if template ID is provided
     */
    private applyTemplate;
    /**
     * Create message attachments
     */
    private createAttachmentEntities;
    /**
     * Create a new message
     */
    create(data: CreateMessageDto & {
        organizationId: string;
        senderId: string;
    }): Promise<Message>;
    /**
     * Find all messages with pagination and filtering
     */
    findAll(query: MessageQueryDto & {
        organizationId: string;
    }): Promise<import("nestjs-typeorm-paginate").Pagination<Message, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    /**
     * Get conversations grouped by contact
     */
    getConversations(query: MessageQueryDto & {
        organizationId: string;
    }): Promise<import("nestjs-typeorm-paginate").Pagination<Message, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    /**
     * Get a single conversation with a contact
     */
    getConversation(contactId: string, query: MessageQueryDto & {
        organizationId: string;
    }): Promise<import("nestjs-typeorm-paginate").Pagination<Message, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    /**
     * Find a single message by ID
     */
    findOne(id: string, organizationId: string): Promise<Message>;
    /**
     * Update a message
     */
    update(id: string, data: UpdateMessageDto & {
        organizationId: string;
        updatedBy: string;
    }): Promise<Message>;
    /**
     * Remove a message (soft delete)
     */
    remove(id: string, organizationId: string): Promise<void>;
    /**
     * Create a message template
     */
    createTemplate(data: MessageTemplateDto & {
        organizationId: string;
        createdBy: string;
    }): Promise<any>;
    /**
     * Get all templates for an organization
     */
    getTemplates(query: {
        organizationId: string;
    }): Promise<MessageTemplate[]>;
    sendBulk(data: BulkMessageDto & {
        organizationId: string;
        senderId: string;
    }): Promise<{
        success: boolean;
        count: number;
        messageIds: string[];
    }>;
    /**
     * Get message statistics for an organization
     */
    getStatistics(query: {
        organizationId: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<any>;
    /**
     * Resend a failed message
     */
    resend(id: string, context: {
        organizationId: string;
        userId: string;
    }): Promise<Message>;
    /**
     * Mark a message as read
     */
    markAsRead(id: string, context: {
        organizationId: string;
        userId: string;
    }): Promise<Message>;
    /**
     * Process a message template
     */
    private processTemplate;
}
