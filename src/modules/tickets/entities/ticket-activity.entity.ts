import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';

@Entity('ticket_activities')
@Index(['ticketId', 'timestamp'])
@Index(['performedById', 'timestamp'])
export class TicketActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    @Index()
    ticketId: string;

    @Column('uuid')
    @Index()
    organizationId: string;

    @Column('uuid')
    @Index()
    performedById: string;

    @Column({
        type: 'enum',
        enum: TicketActivityType
    })
    @Index()
    type: string;

    @Column('jsonb')
    data: Record<string, any>;

    @Column('jsonb', { nullable: true })
    metadata?: Record<string, any>;

    @CreateDateColumn()
    @Index()
    timestamp: Date;

    @Column({ nullable: true })
    ipAddress?: string;

    @Column({ nullable: true })
    userAgent?: string;

    @Column('jsonb', { nullable: true })
    changes?: {
        field: string;
        oldValue: any;
        newValue: any;
    }[];

    @Column('text', { array: true, nullable: true })
    @Index()
    tags?: string[];

    @Column({ nullable: true })
    parentActivityId?: string;

    @Column('jsonb', { nullable: true })
    context?: {
        location?: string;
        deviceInfo?: string;
        sessionId?: string;
        referrer?: string;
    };

    @Column('boolean', { default: false })
    isSystem: boolean;

    @Column('boolean', { default: false })
    isAutomated: boolean;

    @Column('boolean', { default: false })
    requiresAttention: boolean;

    @Column({ nullable: true })
    expiresAt?: Date;

    @Column('jsonb', { nullable: true })
    relatedEntities?: {
        entityType: string;
        entityId: string;
        relationship: string;
    }[];

    @Column('int', { nullable: true })
    duration?: number;

    @Column('varchar', { length: 50, nullable: true })
    @Index()
    status?: string;

    @Column('int', { default: 0 })
    importance: number;

    @Column('boolean', { default: false })
    isHidden: boolean;

    @Column('jsonb', { nullable: true })
    customFields?: Record<string, any>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    processedAt?: Date;

    @Column({ type: 'text', array: true, nullable: true })
    @Index()
    categories?: string[];

    @Column('jsonb', { nullable: true })
    validationResults?: {
        isValid: boolean;
        errors?: string[];
        warnings?: string[];
    };

    @Column('jsonb', { nullable: true })
    metrics?: {
        responseTime?: number;
        resourceUsage?: Record<string, number>;
        performance?: Record<string, number>;
    };

    @Column('jsonb', { nullable: true })
    securityContext?: {
        permissions?: string[];
        roles?: string[];
        accessLevel?: string;
        authenticationType?: string;
    };

    @Column('jsonb', { nullable: true })
    businessContext?: {
        department?: string;
        costCenter?: string;
        projectCode?: string;
        priority?: string;
    };

    @Column('jsonb', { nullable: true })
    audit?: {
        version: number;
        changedBy: string;
        changedAt: Date;
        reason?: string;
    };

    // Relations
    @ManyToOne(() => Ticket, ticket => ticket.activities, { lazy: true })
    @JoinColumn({ name: 'ticketId' })
    ticket: Promise<Ticket>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'performedById' })
    performedBy: Promise<User>;

    @ManyToOne(() => TicketActivity, { nullable: true, lazy: true })
    @JoinColumn({ name: 'parentActivityId' })
    parentActivity?: Promise<TicketActivity>;

    // Alias properties for backward compatibility
    get userId(): string {
        return this.performedById;
    }

    get action(): string {
        return this.type;
    }

    get details(): Record<string, any> {
        return this.data;
    }
}