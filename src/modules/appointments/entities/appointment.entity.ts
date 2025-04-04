// src/modules/appointments/entities/appointment.entity.ts

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
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';

@Entity('appointments')
@Index(['organizationId', 'status'])
@Index(['organizationId', 'doctorId'])
@Index(['organizationId', 'patientId'])
@Index(['organizationId', 'departmentId'])
@Index(['organizationId', 'startTime'])
export class Appointment {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    organizationId: string;

    @ApiProperty()
    @Column()
    doctorId: string;

    @ApiProperty()
    @Column()
    patientId: string;

    @ApiProperty()
    @Column({ nullable: true })
    departmentId?: string;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty()
    @Column()
    startTime: Date;

    @ApiProperty()
    @Column()
    endTime: Date;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.SCHEDULED,
    })
    status: AppointmentStatus;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AppointmentType,
        default: AppointmentType.IN_PERSON,
    })
    type: AppointmentType;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: AppointmentPriority,
        default: AppointmentPriority.NORMAL,
    })
    priority: AppointmentPriority;

    @ApiProperty()
    @Column({ nullable: true })
    location?: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    notes?: string;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        reason?: string;
        symptoms?: string[];
        previousAppointments?: string[];
        followUpRequired?: boolean;
        followUpNotes?: string;
        [key: string]: any;
    };

    @ApiProperty()
    @Column({ default: false })
    isRecurring: boolean;

    @ApiProperty()
    @Column({ type: 'jsonb', nullable: true })
    recurrenceRule?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endDate?: Date;
        count?: number;
        daysOfWeek?: number[];
        daysOfMonth?: number[];
    };

    @ApiProperty()
    @Column({ nullable: true })
    parentAppointmentId?: string;

    @ApiProperty()
    @Column({ nullable: true })
    cancelledAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    cancelledById?: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    cancellationReason?: string;

    @ApiProperty()
    @Column({ nullable: true })
    rescheduledAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    rescheduledById?: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    rescheduleReason?: string;

    @ApiProperty()
    @Column({ nullable: true })
    completedAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    completedById?: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    completionNotes?: string;

    @ApiProperty()
    @Column({ nullable: true })
    noShowAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    noShowById?: string;

    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    noShowReason?: string;

    @ApiProperty()
    @Column()
    createdById: string;

    @ApiProperty()
    @Column({ nullable: true })
    updatedById?: string;

    @ApiProperty()
    @Column({ nullable: true })
    confirmedAt?: Date;

    @ApiProperty()
    @Column({ default: false })
    reminderSent: boolean;

    @ApiProperty()
    @Column({ nullable: true })
    reminderSentAt?: Date;

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

    @ApiProperty({ type: () => User })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'doctorId' })
    doctor: Promise<any>;

    @ApiProperty({ type: () => User })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'patientId' })
    patient: Promise<any>;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        },
        nullable: true
    })
    @ManyToOne(() => Department, { lazy: true })
    @JoinColumn({ name: 'departmentId' })
    department?: Promise<Department>;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            title: { type: 'string' }
        },
        nullable: true
    })
    @ManyToOne('Appointment')
    @JoinColumn({ name: 'parentAppointmentId' })
    parentAppointment?: any;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'cancelledById' })
    cancelledBy?: Promise<any>;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'rescheduledById' })
    rescheduledBy?: Promise<any>;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'completedById' })
    completedBy?: Promise<any>;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'noShowById' })
    noShowBy?: Promise<any>;

    @ApiProperty({ type: () => User })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<any>;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne('User', { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<any>;

    @OneToMany('Appointment', 'parentAppointment')
    childAppointments: any[];

    get isCancelled(): boolean {
        return !!this.cancelledAt;
    }

    get isRescheduled(): boolean {
        return !!this.rescheduledAt;
    }

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    get isNoShow(): boolean {
        return !!this.noShowAt;
    }

    get duration(): number {
        return this.endTime.getTime() - this.startTime.getTime();
    }

    canBeModified(): boolean {
        return ![
            AppointmentStatus.COMPLETED,
            AppointmentStatus.CANCELLED,
        ].includes(this.status);
    }
}