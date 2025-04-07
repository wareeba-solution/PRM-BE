// src/modules/notifications/entities/notification.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { 
    NotificationType,
    NotificationPriority,
    NotificationChannel,
} from '../dto/create-notification.dto';
import { NotificationStatus } from '../dto/update-notification.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
@Index(['organizationId', 'userId'])
@Index(['organizationId', 'type'])
@Index(['organizationId', 'status'])
@Index(['organizationId', 'scheduledFor'])
export class Notification {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    userId: string;

    @Column({ default: 0 })
    retryCount: number;

    @Column()
    type: string;

    @Column()
    content: string;
    
    @Column({ nullable: true })
    subject?: string;
    
    @Column({ nullable: true })
    templateId?: string;
    
    @Column({ nullable: true })
    message?: string;
    
    @Column({ nullable: true })
    error?: string;
    
    @Column('jsonb', { nullable: true })
    channelContent?: Record<string, any>;
    
    @Column('jsonb', { nullable: true })
    recipient?: any;

    @Column('jsonb', { nullable: true })
    metadata?: Record<string, any>;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    readAt?: Date;

    @Column()
    organizationId: string;

    @Column()
    senderId: string;

    @Column({ type: 'enum', enum: NotificationType })
    title: string;

    @Column({ type: 'text' })

    @Column({
        type: 'enum',
        enum: NotificationPriority,
        default: NotificationPriority.NORMAL,
    })
    priority: NotificationPriority;

    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
    })

    @Column({ type: 'jsonb', nullable: true })
    actions?: {
        label: string;
        url: string;
        method?: string;
        data?: Record<string, any>;
    }[];


    @Column({ type: 'timestamp', nullable: true })
    scheduledFor?: Date;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt?: Date;

    @Column({ default: false })
    requireConfirmation: boolean;

    @Column({ type: 'jsonb', nullable: true })
    data?: Record<string, any>;


      @Column({ type: 'enum', enum: NotificationChannel, array: true })
      channels: NotificationChannel[];

    @Column({ length: 100, nullable: true })
    category?: string;

    @Column({ length: 100, nullable: true })
    groupId?: string;

    @Column({ nullable: true })
    referenceId?: string;

    @Column({ length: 50, nullable: true })
    referenceType?: string;

    @Column({ default: false })
    silent: boolean;

    @Column({ default: false })
    read: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deliveredAt?: Date;


      @Column({ type: 'jsonb', nullable: true })
      deliveryDetails?: {
        // Keep the original type definition
        attempts: number;
        lastAttempt: Date;
        channels: {
          channel: NotificationChannel;
          status: 'SUCCESS' | 'FAILED';
          sentAt: Date;
          error?: string;
        }[];
        error?: string;
        timeoutAt?: Date;
      };

    @Column({ type: 'jsonb', nullable: true })
    recipientDetails?: {
        slackUserId: any;
        email?: string;
        phone?: string;
        deviceTokens?: string[];
        webhookUrl?: string;
    };

    @Column({ nullable: true })
    updatedById?: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'userId' })
    user: Promise<User>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'senderId' })
    sender: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    // Virtual properties
    get isRead(): boolean {
        return this.read;
    }

    get isExpired(): boolean {
        return this.expiresAt ? new Date() > this.expiresAt : false;
    }

    get isScheduled(): boolean {
        return this.scheduledFor ? new Date() < this.scheduledFor : false;
    }

    get isDelivered(): boolean {
        return !!this.deliveredAt;
    }

    get requiresAction(): boolean {
        return this.requireConfirmation && !this.read;
    }

    get failedChannels(): NotificationChannel[] {
        if (!this.deliveryDetails?.channels) return [];
        return this.deliveryDetails.channels
            .filter(c => c.status === 'FAILED')
            .map(c => c.channel);
    }
}

export { NotificationChannel };
