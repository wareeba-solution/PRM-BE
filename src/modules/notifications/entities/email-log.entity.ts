import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { EmailStatus } from '../enums/email-status.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { EmailTemplate } from '../../email/entities/email-template.entity';
import { EmailContent } from './email-content.entity';

@Entity('email_logs')
export class EmailLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  organizationId: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @Column('uuid', { nullable: true })
  templateId: string;

  @ManyToOne(() => EmailTemplate)
  @JoinColumn({ name: 'templateId' })
  template: EmailTemplate;

  @Column()
  recipient: string;

  @Column({ nullable: true })
  subject: string;

  @Column({
    type: 'enum',
    enum: EmailStatus,
    default: EmailStatus.PENDING
  })
  status: EmailStatus;

  @Column({ nullable: true })
  error: string;

  @Column({ nullable: true })
  providerResponse: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ nullable: true })
  openedAt: Date;

  @Column({ nullable: true })
  clickedAt: Date;

  @OneToOne(() => EmailContent, content => content.emailLog, { cascade: true, nullable: true })
  content: EmailContent;
}