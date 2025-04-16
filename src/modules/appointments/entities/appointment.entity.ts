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
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity('appointments')
@Index(['organizationId', 'status'])
@Index(['organizationId', 'doctorId'])
@Index(['organizationId', 'patientId'])
@Index(['organizationId', 'departmentId'])
@Index(['organizationId', 'startTime'])
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    doctorId: string;

    @Column()
    patientId: string;

    @Column({ nullable: true })
    departmentId?: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.SCHEDULED,
    })
    status: AppointmentStatus;

    @Column({
        type: 'enum',
        enum: AppointmentType,
        default: AppointmentType.IN_PERSON,
    })
    type: AppointmentType;

    @Column({
        type: 'enum',
        enum: AppointmentPriority,
        default: AppointmentPriority.NORMAL,
    })
    priority: AppointmentPriority;

    @Column({ nullable: true })
    location?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata?: {
        reason?: string;
        symptoms?: string[];
        previousAppointments?: string[];
        followUpRequired?: boolean;
        followUpNotes?: string;
        [key: string]: any;
    };

    @Column({ default: false })
    isRecurring: boolean;

    @Column({ type: 'jsonb', nullable: true })
    recurrenceRule?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endDate?: Date;
        count?: number;
        daysOfWeek?: number[];
        daysOfMonth?: number[];
    };

    @Column({ nullable: true })
    parentAppointmentId?: string;

    @Column({ nullable: true })
    cancelledAt?: Date;

    @Column({ nullable: true })
    cancelledById?: string;

    @Column({ type: 'text', nullable: true })
    cancellationReason?: string;

    @Column({ nullable: true })
    rescheduledAt?: Date;

    @Column({ nullable: true })
    rescheduledById?: string;

    @Column({ type: 'text', nullable: true })
    rescheduleReason?: string;

    @Column({ nullable: true })
    completedAt?: Date;

    @Column({ nullable: true })
    completedById?: string;

    @Column({ type: 'text', nullable: true })
    completionNotes?: string;

    @Column({ nullable: true })
    noShowAt?: Date;

    @Column({ nullable: true })
    noShowById?: string;

    @Column({ type: 'text', nullable: true })
    noShowReason?: string;

    @Column()
    createdById: string;

    @Column({ nullable: true })
    updatedById?: string;

    @Column({ nullable: true })
    confirmedAt?: Date;

    @Column({ default: false })
    reminderSent: boolean;

    @Column({ nullable: true })
    reminderSentAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations - all using string references to avoid circular dependencies
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'doctorId' })
    doctor: Promise<User>;

    @ManyToOne(() => Contact, { lazy: true })
    @JoinColumn({ name: 'patientId' })
    patient: Promise<Contact>;


    @ManyToOne(() => Department, { lazy: true })
    @JoinColumn({ name: 'departmentId' })
    department?: Promise<Department>;


    @ManyToOne(() => Appointment, { lazy: true })
    @JoinColumn({ name: 'parentAppointmentId' })
    parentAppointment?: Promise<Appointment>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'cancelledById' })
    cancelledBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'rescheduledById' })
    rescheduledBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'completedById' })
    completedBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'noShowById' })
    noShowBy?: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    creator: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    @OneToMany(() => Appointment, appointment => appointment.parentAppointment, { lazy: true })
    childAppointments: Promise<Appointment[]>;

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