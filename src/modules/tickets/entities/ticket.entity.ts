// src/modules/tickets/entities/ticket.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { TicketActivity } from './ticket-activity.entity';
import { TicketAttachment } from './ticket-attachment.entity';
import { TicketPriority } from './ticket-priority.entity';
import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { Department } from '../../departments/entities/department.entity';
import { TicketComment } from './ticket-comment.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { TicketStatus, TicketType } from '../enums/ticket.enums';

@Entity('tickets')
@Index(['organizationId', 'status'])
@Index(['organizationId', 'assigneeId'])
@Index(['organizationId', 'contactId'])
@Index(['organizationId', 'departmentId'])
@Index(['organizationId', 'createdAt'])
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: TicketType,
        default: TicketType.GENERAL
    })
    type: TicketType;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN
    })
    status: TicketStatus;

    @Column({ type: 'enum', enum: TicketSource, default: TicketSource.WEB })
    source: TicketSource;

    @Column({ nullable: true })
    contactId?: string;

    @Column({ nullable: true })
    departmentId?: string;

    @Column('uuid')
    createdById: string;

    @Column('uuid', { nullable: true })
    assigneeId?: string;

    @Column({ type: 'enum', enum: TicketCategory, nullable: true })
    category?: TicketCategory;

    @Column({ nullable: true })
    subCategory?: string;

    @Column('text', { array: true, default: '{}' })
    tags: string[];

    @Column({ nullable: true })
    referenceNumber?: string;

    @Column({ nullable: true })
    relatedTicketId?: string;

    @Column('jsonb', { nullable: true })
    metadata?: Record<string, any>;

    @Column({ default: false })
    isPrivate: boolean;

    @Column({ type: 'text', nullable: true })
    internalNotes?: string;

    @Column({ type: 'text', nullable: true })
    resolution?: string;

    @Column({ nullable: true })
    resolvedAt?: Date;

    @Column({ nullable: true })
    resolvedById?: string;

    @Column({ nullable: true })
    closedAt?: Date;

    @Column({ nullable: true })
    closedById?: string;

    @Column({ nullable: true })
    escalatedAt?: Date;

    @Column({ nullable: true })
    escalatedById?: string;

    @Column({ type: 'text', nullable: true })
    escalationReason?: string;

    @Column({ nullable: true })
    reopenedAt?: Date;

    @Column({ nullable: true })
    reopenedById?: string;

    @Column({ type: 'text', nullable: true })
    reopenReason?: string;

    @Column({ nullable: true })
    firstResponseAt?: Date;

    @Column({ nullable: true })
    lastActivityAt?: Date;

    @Column({ nullable: true })
    updatedById?: string;

    @Column({ nullable: true })
    priorityId: string;

    @ManyToOne(() => TicketPriority)
    @JoinColumn({ name: 'priorityId' })
    priority: TicketPriority;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ default: 0 })
    escalationLevel: number;

    // Relations - all using string references to avoid circular dependencies
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;


    @ManyToOne(() => Contact, { lazy: true })
    @JoinColumn({ name: 'contactId' })
    contact?: Promise<Contact>;

    @ManyToOne(() => Department, { lazy: true })
    @JoinColumn({ name: 'departmentId' })
    department?: Promise<Department>;

    @ManyToOne(() => User, user => user.assignedTickets, { lazy: true })
    @JoinColumn({ name: 'assigneeId' })
    assignee?: Promise<User>;

    @ManyToOne(() => User, user => user.createdTickets, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'resolvedById' })
    resolvedBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'closedById' })
    closedBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'escalatedById' })
    escalatedBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'reopenedById' })
    reopenedBy?: Promise<User>;


    @ManyToOne(() => Ticket, { lazy: true })
    @JoinColumn({ name: 'relatedTicketId' })
    relatedTicket?: Promise<Ticket>;

    @OneToMany(() => TicketComment, comment => comment.ticket, { lazy: true })
    comments: Promise<TicketComment[]>;

    @OneToMany(() => TicketAttachment, attachment => attachment.ticket, { lazy: true })
    attachments: Promise<TicketAttachment[]>;

    @OneToMany(() => TicketActivity, activity => activity.ticket, { lazy: true })
    activities: Promise<TicketActivity[]>;

    // Virtual properties
    get isEscalated(): boolean {
        return !!this.escalatedAt;
    }

    get isResolved(): boolean {
        return !!this.resolvedAt;
    }

    get isClosed(): boolean {
        return !!this.closedAt;
    }

    get isReopened(): boolean {
        return !!this.reopenedAt;
    }

    get hasFirstResponse(): boolean {
        return !!this.firstResponseAt;
    }

    get responseTime(): number | null {
        if (!this.firstResponseAt || !this.createdAt) {
            return null;
        }
        return this.firstResponseAt.getTime() - this.createdAt.getTime();
    }

    get resolutionTime(): number | null {
        if (!this.resolvedAt || !this.createdAt) {
            return null;
        }
        return this.resolvedAt.getTime() - this.createdAt.getTime();
    }
}