// src/modules/users/entities/user.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    Index,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Message } from '../../messages/entities/message.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { UserActivity } from './user-activity.entity';
import { UserProfile } from './user-profile.entity';
import { UserVerification } from './user-verification.entity';
import { UserSettings } from './user-settings.entity';
import { UserReferenceDto } from '../dto/user-reference.dto';

@Entity('users')
@Index(['organizationId', 'email'])
@Index(['organizationId', 'role'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ unique: true })
    @Index()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.STAFF
    })
    role: Role;

    @Column({ type: 'simple-array', nullable: true })
    permissions: string[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isLocked: boolean;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ default: true })
    requirePasswordChange: boolean;

    @Column({ nullable: true })
    lastLoginAt?: Date;

    @Column({ nullable: true })
    lastActiveAt?: Date;

    @Column()
    createdById: string;

    @Column({ nullable: true })
    updatedById?: string;

    @Column({ nullable: true })
    refreshToken?: string;

    @Column({ nullable: true, type: 'timestamp' })
    refreshTokenExpiresAt?: Date;

    @Column({ nullable: true })
    passwordResetToken?: string;

    @Column({ nullable: true, type: 'timestamp' })
    passwordResetExpiresAt?: Date;

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

    @ManyToOne(() => User, user => user.createdTickets, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    @OneToOne(() => UserProfile, { lazy: true })
    profile: Promise<UserProfile>;

    @OneToOne(() => UserVerification, { lazy: true })
    verification: Promise<UserVerification>;

    @OneToOne(() => UserSettings, { lazy: true })
    settings: Promise<UserSettings>;

    @OneToMany(() => Ticket, ticket => ticket.assigneeId, { lazy: true })
    assignedTickets: Promise<Ticket[]>;

    @OneToMany(() => Ticket, ticket => ticket.createdById, { lazy: true })
    createdTickets: Promise<Ticket[]>;

    @OneToMany(() => Message, message => message.sender, { lazy: true })
    messages: Promise<Message[]>;

    @OneToMany(() => Appointment, appointment => appointment.doctorId, { lazy: true })
    appointments: Promise<Appointment[]>;

    @OneToMany(() => Notification, notification => notification.userId, { lazy: true })
    notifications: Promise<Notification[]>;

    @OneToMany(() => UserActivity, activity => activity.user, { lazy: true })
    activities: Promise<UserActivity[]>;

    // Virtual properties
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get isAvailable(): boolean {
        return this.isActive && !this.isLocked;
    }

    @BeforeInsert()
    @BeforeUpdate()
    normalizeEmail() {
        if (this.email) {
            this.email = this.email.toLowerCase().trim();
        }
    }
}