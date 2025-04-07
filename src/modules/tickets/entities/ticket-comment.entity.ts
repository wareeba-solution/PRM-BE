import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';
import { TicketAttachment } from './ticket-attachment.entity';

@Entity('ticket_comments')
export class TicketComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  organizationId: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  isInternal: boolean;

  @Column('uuid')
  ticketId: string;

  @ManyToOne(() => Ticket, ticket => ticket.comments, { lazy: true })
  @JoinColumn({ name: 'ticketId' })
  ticket: Promise<Ticket>;

  @Column('uuid')
  authorId: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'authorId' })
  author: Promise<User>;

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

  @Column({ nullable: true })
  editedAt: Date;

  @Column({ nullable: true })
  editedBy: string;
}