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
import { ApiProperty } from '@nestjs/swagger';
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

@Entity('users')
@Index(['organizationId', 'email'])
@Index(['organizationId', 'role'])
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    organizationId: string;

    @ApiProperty()
    @Column({ length: 50 })
    firstName: string;

    @ApiProperty()
    @Column({ length: 50 })
    lastName: string;

    @ApiProperty()
    @Column({ unique: true })
    @Index()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.STAFF
    })
    role: Role;

    @ApiProperty()
    @Column({ type: 'simple-array', nullable: true })
    permissions: string[];

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty()
    @Column({ default: false })
    isLocked: boolean;

    @ApiProperty()
    @Column({ default: false })
    isEmailVerified: boolean;

    @ApiProperty()
    @Column({ default: true })
    requirePasswordChange: boolean;

    @ApiProperty()
    @Column({ nullable: true })
    lastLoginAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    lastActiveAt?: Date;

    @ApiProperty()
    @Column()
    createdById: string;

    @ApiProperty()
    @Column({ nullable: true })
    updatedById?: string;

    @ApiProperty()
    @Column({ nullable: true })
    refreshToken?: string;

    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    refreshTokenExpiresAt?: Date;

    @ApiProperty()
    @Column({ nullable: true })
    passwordResetToken?: string;

    @ApiProperty()
    @Column({ nullable: true, type: 'timestamp' })
    passwordResetExpiresAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    // Relations
    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    })
    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ApiProperty({ type: () => User, nullable: true })
    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: Promise<User>;

    @OneToOne(() => UserProfile, { lazy: true })
    profile: Promise<UserProfile>;

    @OneToOne(() => UserVerification, { lazy: true })
    verification: Promise<UserVerification>;

    @OneToOne(() => UserSettings, { lazy: true })
    settings: Promise<UserSettings>;

    @OneToMany(() => Ticket, ticket => ticket.assignee, { lazy: true })
    assignedTickets: Promise<Ticket[]>;

    @OneToMany(() => Ticket, ticket => ticket.createdBy, { lazy: true })
    createdTickets: Promise<Ticket[]>;

    @OneToMany(() => Message, message => message.sender, { lazy: true })
    messages: Promise<Message[]>;

    @OneToMany(() => Appointment, appointment => appointment.doctor, { lazy: true })
    appointments: Promise<Appointment[]>;

    @OneToMany(() => Notification, notification => notification.recipient, { lazy: true })
    notifications: Promise<Notification[]>;

    @OneToMany(() => UserActivity, activity => activity.user, { lazy: true })
    activities: Promise<UserActivity[]>;

    // Virtual properties
    @ApiProperty()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @ApiProperty()
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