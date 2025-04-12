import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { TicketAttachment } from './ticket-attachment.entity';

@Entity('ticket_comments')
export class TicketComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column()
  ticketId: string;

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @Column()
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ default: false })
  isInternal: boolean;

  @OneToMany(() => TicketAttachment, attachment => attachment.comment, { lazy: true })
  attachments: Promise<TicketAttachment[]>;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => TicketComment, { nullable: true, lazy: true })
  @JoinColumn({ name: 'parentId' })
  parent?: Promise<TicketComment>;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  editedAt: Date;

  @Column({ nullable: true })
  editedBy: string;
}