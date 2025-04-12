import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from '../../../modules/organizations/entities/organization.entity';
import { User } from '../../../modules/users/entities/user.entity';

export enum PriorityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

@Entity('ticket_priorities')
export class TicketPriority {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: PriorityLevel,
        default: PriorityLevel.MEDIUM
    })
    level: PriorityLevel;

    @Column()
    description: string;

    @Column({ default: 24 })
    responseTimeHours: number;

    @Column({ default: 48 })
    resolutionTimeHours: number;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    organizationId: string;

    @ManyToOne(() => Organization)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column()
    createdById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdById' })
    createdBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
} 