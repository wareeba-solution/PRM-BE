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
  Check,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationCategory } from '../enums/notification-category.enum';
import { NotificationFrequency } from '../enums/notification-frequency.enum';

export { NotificationChannel, NotificationCategory, NotificationFrequency };

@Entity('notification_preferences')
@Index(['organizationId', 'userId'])
@Index(['organizationId', 'category'])
@Check(`"startTime" < "endTime"`)
export class NotificationPreference {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index()
  organizationId: string;

  @ApiProperty()
  @Column()
  @Index()
  userId: string;

  @ApiProperty({ enum: NotificationCategory })
  @Column({
    type: 'enum',
    enum: NotificationCategory,
    default: NotificationCategory.GENERAL,
  })
  category: NotificationCategory;

  @ApiProperty({ type: [String], enum: NotificationChannel })
  @Column('simple-array')
  channels: NotificationChannel[];

  @ApiProperty({ type: [String], enum: NotificationChannel })
  @Column('simple-array')
  enabledChannels: NotificationChannel[];

  @ApiProperty({ enum: NotificationFrequency })
  @Column({
    type: 'enum',
    enum: NotificationFrequency,
    default: NotificationFrequency.IMMEDIATELY,
  })
  frequency: NotificationFrequency;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'time', nullable: true })
  startTime?: string;

  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @Column('text', { array: true, nullable: true })
  workDays?: string[];

  @Column({ type: 'jsonb', nullable: true })
  customSchedule?: {
    days: string[];
    times: string[];
    timezone: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  channelSpecificSettings?: {
    email?: {
      addresses?: string[];
      format?: 'HTML' | 'TEXT';
      includeAttachments?: boolean;
    };
    sms?: {
      phoneNumbers?: string[];
      includeMedia?: boolean;
    };
    push?: {
      deviceTokens?: string[];
      sound?: boolean;
      badge?: boolean;
    };
    inApp?: {
      showBadge?: boolean;
      playSound?: boolean;
      markAsRead?: boolean;
    };
    whatsapp?: {
      numbers?: string[];
      allowMedia?: boolean;
    };
    slack?: {
      channels?: string[];
      mentionUser?: boolean;
    };
  };

  @Column({ type: 'jsonb', nullable: true })
  filters?: {
    priority?: string[];
    status?: string[];
    types?: string[];
    senders?: string[];
    keywords?: string[];
    excludeKeywords?: string[];
  };

  @Column({ type: 'int', default: 0 })
  importanceThreshold: number;

  @Column({ default: false })
  muteAll: boolean;

  @Column({ type: 'timestamp', nullable: true })
  muteUntil?: Date;

  @Column({ type: 'jsonb', nullable: true })
  digestSettings?: {
    groupBy?: string[];
    sortBy?: string;
    maxItems?: number;
    format?: string;
  };

  @Column({ default: true })
  allowReminders: boolean;

  @Column({ type: 'int', nullable: true })
  reminderInterval?: number;

  @Column({ type: 'int', default: 3 })
  maxReminders: number;

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true })
  settings?: {
    quietHours?: {
      start: string;
      end: string;
      timezone: string;
    };
    digest?: {
      time: string;
      timezone: string;
    };
    [key: string]: any;
  };

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true })
  metadata?: {
    lastUpdated?: Date;
    [key: string]: any;
  };

  @ApiProperty()
  @Column()
  createdById: string;

  @ApiProperty()
  @Column({ nullable: true })
  updatedById?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations - all using string references to avoid circular dependencies
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' }
    }
  })
  @ManyToOne('Organization')
  @JoinColumn({ name: 'organizationId' })
  organization: any;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' }
    }
  })
  @ManyToOne('User', { lazy: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<any>;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' }
    }
  })
  @ManyToOne('User', { lazy: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: Promise<any>;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' }
    },
    nullable: true
  })
  @ManyToOne('User', { lazy: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<any>;
}