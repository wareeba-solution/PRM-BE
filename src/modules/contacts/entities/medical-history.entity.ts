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
import { Contact } from './contact.entity';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('medical_history')
@Index(['organizationId', 'contactId'])
export class MedicalHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    contactId: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'date', nullable: true })
    date?: Date;

    @Column({ type: 'jsonb', nullable: true })
    diagnosis?: {
        code?: string;
        description?: string;
        severity?: string;
        status?: string;
    };

    @Column({ type: 'simple-array', nullable: true })
    symptoms?: string[];

    @Column({ type: 'simple-array', nullable: true })
    medications?: string[];

    @Column({ type: 'simple-array', nullable: true })
    procedures?: string[];

    @Column({ type: 'jsonb', nullable: true })
    attachments?: {
        type: string;
        url: string;
        name: string;
    }[];

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

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

    // Relations
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @ManyToOne(() => Contact, { lazy: true })
    @JoinColumn({ name: 'contactId' })
    contact: Promise<Contact>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;
} 