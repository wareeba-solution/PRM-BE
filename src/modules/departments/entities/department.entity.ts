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
import { ApiProperty } from '@nestjs/swagger';
import { DepartmentStatus } from '../enums/department-status.enum';

@Entity('departments')
@Index(['organizationId', 'status'])
@Index(['organizationId', 'managerId'])
export class Department {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    organizationId: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty()
    @Column({ nullable: true })
    parentDepartmentId?: string;

    @ApiProperty()
    @Column({ nullable: true })
    managerId?: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: DepartmentStatus,
        default: DepartmentStatus.ACTIVE,
    })
    status: DepartmentStatus;

    @ApiProperty()
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

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        location?: string;
        floor?: string;
        room?: string;
        equipment?: string[];
        [key: string]: any;
    };

    @ApiProperty()
    @Column()
    createdById: string;

    @ApiProperty()
    @Column({ nullable: true })
    updatedById?: string;

    @ApiProperty()
    @Column({ default: 0 })
    memberCount: number;

    @ApiProperty()
    @Column({ default: 0 })
    sortOrder: number;

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
            name: { type: 'string' }
        },
        nullable: true
    })
    @ManyToOne('Department')
    @JoinColumn({ name: 'parentDepartmentId' })
    parentDepartment?: any;

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
    @JoinColumn({ name: 'managerId' })
    manager?: Promise<any>;

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