// src/modules/email/entities/email-log.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
  
  export enum EmailStatus {
    QUEUED = 'QUEUED',
    SENDING = 'SENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    BOUNCED = 'BOUNCED'
  }
  
  @Entity('email_logs')
  export class EmailLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: true })
    jobId?: string;
  
    @Column()
    to: string;
  
    @Column({ nullable: true })
    cc?: string;
  
    @Column({ nullable: true })
    bcc?: string;
  
    @Column()
    subject: string;
  
    @Column()
    template: string;
  
    @Column({ type: 'json', nullable: true })
    context?: Record<string, any>;
  
    @Column({
      type: 'enum',
      enum: EmailStatus,
      default: EmailStatus.QUEUED
    })
    status: string;
  
    @Column({ nullable: true })
    error?: string;
  
    @Column({ type: 'uuid', nullable: true })
    @Index()
    organizationId?: string;
  
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;
  
    @Column({ nullable: true })
    userId?: string;
  
    @CreateDateColumn()
    @Index()
    createdAt: Date;
  
    @Column({ nullable: true })
    sentAt?: Date;
  }