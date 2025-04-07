// src/modules/messages/entities/message.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    Index,
    JoinColumn,
} from 'typeorm';
import { MessageType, MessagePriority, MessageStatus } from '../dto/create-message.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { MessageTemplate } from './message-template.entity';
import { MessageAttachment } from './message-attachment.entity';

@Entity('messages')
@Index(['organizationId', 'contactId'])
@Index(['organizationId', 'type'])
@Index(['organizationId', 'status'])
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column({ type: 'enum', enum: MessageType })
    type: MessageType;

    @Column()
    contactId: string;

    @Column()
    senderId: string;

    @Column({ type: 'text' })
    content: string;

    @Column({
        type: 'enum',
        enum: MessagePriority,
        default: MessagePriority.NORMAL,
    })
    priority: MessagePriority;

    @Column({
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.QUEUED,
    })
    status: MessageStatus;

    @Column({ type: 'jsonb', nullable: true })
    emailOptions?: {
        subject: string;
        cc?: string;
        bcc?: string;
        trackOpens?: boolean;
        trackClicks?: boolean;
    };

    @Column({ nullable: true })
    templateId?: string;

    @Column({ nullable: true })
    scheduledFor?: Date;

    @Column({ default: false })
    requireConfirmation: boolean;

    @Column({ nullable: true })
    confirmedAt?: Date;

    @Column({ nullable: true })
    confirmedById?: string;

    @Column({ nullable: true })
    deliveredAt?: Date;

    @Column({ nullable: true })
    readAt?: Date;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ nullable: true })
    externalId?: string;

    @Column({ type: 'jsonb', nullable: true })
    deliveryDetails?: {
        provider: string;
        providerMessageId?: string;
        attempts?: number;
        lastAttempt?: Date;
        errorCode?: string;
        errorMessage?: string;
    };

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @Column({ nullable: true })
    parentMessageId?: string;

    @Column({ nullable: true })
    updatedById?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'senderId' })
    sender: Promise<User>;

    @ManyToOne(() => Contact, { lazy: true })
    @JoinColumn({ name: 'recipientId' })
    recipient: Promise<Contact>;

    @ManyToOne(() => MessageTemplate, { lazy: true })
    @JoinColumn({ name: 'templateId' })
    template: Promise<MessageTemplate>;

    @OneToMany(() => MessageAttachment, attachment => attachment.message, { lazy: true })
    attachments: Promise<MessageAttachment[]>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'confirmedById' })
    confirmedBy?: Promise<User>;

    @ManyToOne(() => Message, { lazy: true })
    @JoinColumn({ name: 'parentMessageId' })
    parentMessage?: Promise<Message>;

    @OneToMany(() => Message, message => message.parentMessage, { lazy: true })
    replies?: Promise<Message[]>;

    // Virtual properties
    get isRead(): boolean {
        return !!this.readAt;
    }

    get isConfirmed(): boolean {
        return !!this.confirmedAt;
    }

    get isDelivered(): boolean {
        return !!this.deliveredAt;
    }

    get isScheduled(): boolean {
        return !!this.scheduledFor && this.scheduledFor > new Date();
    }

    get isFailed(): boolean {
        return this.status === MessageStatus.FAILED;
    }
}