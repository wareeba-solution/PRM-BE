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
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationCategory } from '../enums/notification-category.enum';
import { NotificationFrequency } from '../enums/notification-frequency.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';

export { NotificationChannel, NotificationCategory, NotificationFrequency };

@Entity('notification_preferences')
@Index(['organizationId', 'userId'])
@Index(['organizationId', 'category'])
@Check(`"startTime" < "endTime"`)
export class NotificationPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  organizationId: string;

  @Column()
  @Index()
  userId: string;

  @Column({
    type: 'enum',
    enum: NotificationCategory,
    default: NotificationCategory.GENERAL,
  })
  category: NotificationCategory;

  @Column('simple-array')
  channels: NotificationChannel[];

  @Column('simple-array')
  enabledChannels: NotificationChannel[];

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

  @Column({ type: 'jsonb', nullable: true })
  metadata?: {
    lastUpdated?: Date;
    [key: string]: any;
  };

  @Column()
  createdById: string;

  @Column({ nullable: true })
  updatedById?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations - all using string references to avoid circular dependencies
  @ManyToOne(() => Organization, { lazy: true })
  @JoinColumn({ name: 'organizationId' })
  organization: Promise<Organization>;


  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;


  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: Promise<User>;


  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;
}