// src/modules/appointments/entities/doctor-schedule.entity.ts

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
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Appointment } from './appointment.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';

@Entity('doctor_schedules')
export class DoctorSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  doctorId: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'doctorId' })
  doctor: Promise<User>;

  @Column()
  @Index()
  organizationId: string;

  @ManyToOne(() => Organization, { lazy: true })
  @JoinColumn({ name: 'organizationId' })
  organization: Promise<Organization>;

  @Column({ type: 'int', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column({ type: 'timestamp' })
  workStart: Date;

  @Column({ type: 'timestamp' })
  workEnd: Date;

  @Column({ type: 'int', default: 30 })
  slotDuration: number; // Duration of each appointment slot in minutes

  @Column({ type: 'int', default: 0 })
  breakBetweenSlots: number; // Buffer time between appointments in minutes

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  validFrom?: Date;

  @Column({ type: 'date', nullable: true })
  validTo?: Date;

  @Column({ nullable: true, type: 'jsonb' })
  breakTimes?: {
    startTime: string;
    endTime: string;
    reason?: string;
  }[];

  @Column({ nullable: true, type: 'jsonb' })
  metadata?: Record<string, any>;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  virtualLink?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  slotCapacity?: number; // For group appointments/sessions

  @Column({ nullable: true })
  createdById?: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Promise<User>;

  @Column({ nullable: true })
  updatedById?: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Promise<Appointment[]>;

  // Helper methods
  isTimeInRange(time: Date): boolean {
    const timeStr = time.toTimeString().slice(0, 5);
    const startStr = this.workStart.toTimeString().slice(0, 5);
    const endStr = this.workEnd.toTimeString().slice(0, 5);
    return timeStr >= startStr && timeStr <= endStr;
  }

  isDateInValidRange(date: Date): boolean {
    if (!this.validFrom && !this.validTo) return true;

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    if (this.validFrom) {
      const validFromDate = new Date(this.validFrom);
      validFromDate.setHours(0, 0, 0, 0);
      if (currentDate < validFromDate) return false;
    }

    if (this.validTo) {
      const validToDate = new Date(this.validTo);
      validToDate.setHours(0, 0, 0, 0);
      if (currentDate > validToDate) return false;
    }

    return true;
  }

  getDayNumber(): number {
    return this.dayOfWeek;
  }

  isBreakTime(time: Date): boolean {
    if (!this.breakTimes || !this.breakTimes.length) return false;

    const timeStr = time.toTimeString().slice(0, 5);
    return this.breakTimes.some(
        breakTime => timeStr >= breakTime.startTime && timeStr < breakTime.endTime
    );
  }
}