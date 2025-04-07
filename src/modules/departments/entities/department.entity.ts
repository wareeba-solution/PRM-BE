import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { DepartmentStatus } from '../enums/department-status.enum';
import { User } from '../../users/entities/user.entity';

@Entity('departments')
@Index(['organizationId', 'status'])
@Index(['organizationId', 'managerId'])
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ nullable: true })
    parentDepartmentId?: string;

    @Column({ nullable: true })
    managerId?: string;

    @Column({
        type: 'enum',
        enum: DepartmentStatus,
        default: DepartmentStatus.ACTIVE,
    })
    status: DepartmentStatus;

    @Column({ type: 'jsonb', nullable: true })
    settings?: {
        workingHours?: {
            start: string;
            end: string;
            timezone: string;
            workingDays: string[];
        };
        notificationPreferences?: {
            email?: boolean;
            sms?: boolean;
            whatsapp?: boolean;
        };
        [key: string]: any;
    };

    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        location?: string;
        floor?: string;
        room?: string;
        equipment?: string[];
        [key: string]: any;
    };

    @Column()
    createdById: string;

    @Column({ nullable: true })
    updatedById?: string;

    @Column({ default: 0 })
    memberCount: number;

    @Column({ default: 0 })
    sortOrder: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations - all using string references to avoid circular dependencies
    @ManyToOne('Organization')
    @JoinColumn({ name: 'organizationId' })
    organization: any;


    @ManyToOne('Department')
    @JoinColumn({ name: 'parentDepartmentId' })
    parentDepartment?: any;


    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'managerId' })
    manager?: Promise<any>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<any>;

    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<any>;

    @OneToMany('Department', 'parentDepartment')
    childDepartments: any[];

    @OneToMany('User', 'department')
    users: any[];

    @OneToMany('Ticket', 'department')
    tickets: any[];

    get isActive(): boolean {
        return this.status === DepartmentStatus.ACTIVE;
    }

    get hasManager(): boolean {
        return !!this.managerId;
    }

    get isParentDepartment(): boolean {
        return !this.parentDepartmentId;
    }
}