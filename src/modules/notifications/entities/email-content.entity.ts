// import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
// import { EmailLog } from './email-log.entity';
//
// @Entity('email_contents')
// export class EmailContent {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//
//   @Column('uuid')
//   emailLogId: string;
//
//   @OneToOne(() => EmailLog, emailLog => emailLog.content)
//   @JoinColumn({ name: 'emailLogId' })
//   emailLog: EmailLog;
//
//   @Column('text', { nullable: true })
//   htmlContent: string;
//
//   @Column('text', { nullable: true })
//   textContent: string;
//
//   @Column('jsonb', { nullable: true })
//   metadata: Record<string, any>;
//
//   @Column({ nullable: true })
//   messageId: string;
// }

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { EmailLog } from './email-log.entity';

@Entity('email_contents')
export class EmailContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  emailLogId: string;

  @OneToOne(() => EmailLog, emailLog => emailLog.content)
  @JoinColumn({ name: 'emailLogId' })
  emailLog: EmailLog;

  @Column('text', { nullable: true })
  htmlContent: string;

  @Column('text', { nullable: true })
  textContent: string;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  messageId: string;
}