import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { OrganizationStatus } from '../enums/organization-status.enum';
import { SubscriptionTier } from '../enums/subscription-tier.enum';

export { OrganizationStatus, SubscriptionTier };

@Entity('organizations')
@Index(['domain'])
@Index(['status'])
@Index(['subscriptionTier'])
export class Organization {
    [x: string]: any;
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ length: 100 })
    name: string;

    @ApiProperty()
    @Column({ length: 255, nullable: true })
    description: string;

    @ApiProperty()
    @Column({ length: 100, unique: true })
    @Index()
    slug: string;

    @ApiProperty()
    @Column({ length: 255, nullable: true })
    logo: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    domain: string;

    @ApiProperty()
    @Column({ default: false })
    isDomainVerified: boolean;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: OrganizationStatus,
        default: OrganizationStatus.PENDING
    })
    status: OrganizationStatus;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: SubscriptionTier,
        default: SubscriptionTier.FREE
    })
    subscriptionTier: SubscriptionTier;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    subscriptionStartDate: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    subscriptionEndDate: Date;

    @ApiProperty()
    @Column({ default: false })
    isSubscriptionActive: boolean;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    settings: {
        ticketPriorities?: string[];
        ticketCategories?: string[];
        customFields?: any[];
        notificationSettings?: any;
        brandingSettings?: any;
    };

    @ApiProperty()
    @Column({ type: 'int', default: 0 })
    maxUsers: number;

    @ApiProperty()
    @Column({ type: 'int', default: 0 })
    maxStorage: number; // in MB

    @ApiProperty()
    @Column({ nullable: true })
    createdById: string;

    @ApiProperty()
    @Column({ nullable: true })
    updatedById: string;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        }
    })
    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    })
    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy: Promise<User>;

    // Relationships
    @ApiProperty()
    @OneToMany(() => User, user => user.organization, { lazy: true })
    users: Promise<User[]>;

    @ApiProperty()
    @OneToMany(() => Ticket, ticket => ticket.organization, { lazy: true })
    tickets: Promise<Ticket[]>;

    // Timestamps
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;

    // Additional metadata columns
    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    metadata: {
        industry?: string;
        size?: string;
        location?: string;
        timezone?: string;
        customAttributes?: Record<string, any>;
    };

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    contactInfo: {
        email?: string;
        phone?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            postalCode?: string;
        };
    };

    @ApiProperty()
    @Column({ type: 'simple-array', nullable: true })
    allowedDomains: string[];

    @ApiProperty()
    @Column({ default: true })
    isEmailVerificationRequired: boolean;

    @ApiProperty()
    @Column({ default: false })
    isTwoFactorAuthRequired: boolean;

    // Audit columns
    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    auditConfig: {
        enableAuditLog?: boolean;
        retentionPeriod?: number;
        logLevel?: string;
    };

    get isActive(): boolean {
        return this.status === OrganizationStatus.ACTIVE;
    }

    get isPremium(): boolean {
        return this.subscriptionTier === SubscriptionTier.PROFESSIONAL || this.subscriptionTier === SubscriptionTier.ENTERPRISE;
    }

    get isEnterprise(): boolean {
        return this.subscriptionTier === SubscriptionTier.ENTERPRISE;
    }
}