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
import { ApiProperty } from '@nestjs/swagger';
import { 
    NotificationType,
    NotificationPriority,
    NotificationChannel,
} from '../dto/create-notification.dto';
import { NotificationStatus } from '../dto/update-notification.dto';
import { Organization } from '../../organizations/entities/organization.entity';
// Change to type-only import to break circular dependency
import type { User } from '../../users/entities/user.entity';

@Entity('notifications')
@Index(['organizationId', 'userId'])
@Index(['organizationId', 'type'])
@Index(['organizationId', 'status'])
@Index(['organizationId', 'scheduledFor'])
export class Notification {
    [x: string]: any;
    @ApiProperty()
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

    @ApiProperty()
    @Column()
    organizationId: string;

    @ApiProperty()
    @Column()

    @ApiProperty()
    @Column()
    senderId: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: NotificationType })

    @ApiProperty()
    @Column({ length: 200 })
    title: string;

    @ApiProperty()
    @Column({ type: 'text' })

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: NotificationPriority,
        default: NotificationPriority.NORMAL,
    })
    priority: NotificationPriority;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING,
    })

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    actions?: {
        label: string;
        url: string;
        method?: string;
        data?: Record<string, any>;
    }[];


    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    scheduledFor?: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    expiresAt?: Date;

    @ApiProperty()
    @Column({ default: false })
    requireConfirmation: boolean;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    data?: Record<string, any>;

    @ApiProperty({ 
        type: 'array',
        items: { 
          type: 'string', 
          enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
        },
        description: 'Notification delivery channels'
      })
      @Column({ type: 'enum', enum: NotificationChannel, array: true })
      channels: NotificationChannel[];

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    category?: string;

    @ApiProperty()
    @Column({ length: 100, nullable: true })
    groupId?: string;

    @ApiProperty()
    @Column({ nullable: true })
    referenceId?: string;

    @ApiProperty()
    @Column({ length: 50, nullable: true })
    referenceType?: string;

    @ApiProperty()
    @Column({ default: false })
    silent: boolean;

    @ApiProperty()
    @Column({ default: false })
    read: boolean;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    deliveredAt?: Date;

    

    @ApiProperty({
        type: 'object',
        nullable: true,
        properties: {
          attempts: { type: 'number' },
          lastAttempt: { type: 'string', format: 'date-time' },
          channels: { 
            type: 'array',
            items: {
              type: 'object',
              properties: {
                channel: { type: 'string', enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK'] },
                status: { type: 'string', enum: ['SUCCESS', 'FAILED'] },
                sentAt: { type: 'string', format: 'date-time' },
                error: { type: 'string' }
              }
            }
          },
          error: { type: 'string' },
          timeoutAt: { type: 'string', format: 'date-time' }
        }
      })
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

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    recipientDetails?: {
        slackUserId: any;
        email?: string;
        phone?: string;
        deviceTokens?: string[];
        webhookUrl?: string;
    };

    @ApiProperty()
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

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    // Virtual properties
    @ApiProperty()
    get isRead(): boolean {
        return this.read;
    }

    @ApiProperty()
    get isExpired(): boolean {
        return this.expiresAt ? new Date() > this.expiresAt : false;
    }

    @ApiProperty()
    get isScheduled(): boolean {
        return this.scheduledFor ? new Date() < this.scheduledFor : false;
    }

    @ApiProperty()
    get isDelivered(): boolean {
        return !!this.deliveredAt;
    }

    @ApiProperty()
    get requiresAction(): boolean {
        return this.requireConfirmation && !this.read;
    }

    @ApiProperty()
    get failedChannels(): NotificationChannel[] {
        if (!this.deliveryDetails?.channels) return [];
        return this.deliveryDetails.channels
            .filter(c => c.status === 'FAILED')
            .map(c => c.channel);
    }
}

export { NotificationChannel };
