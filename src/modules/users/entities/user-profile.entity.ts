import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'userId' })
    user: Promise<User>;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    department?: string;

    @Column({ nullable: true })
    employeeId?: string;

    @Column({ type: 'jsonb', nullable: true })
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };

    @Column({ type: 'jsonb', nullable: true })
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
        address?: string;
    };

    @Column({ nullable: true })
    licenseNumber?: string;

    @Column({ nullable: true })
    specialization?: string;

    @Column('simple-array', { nullable: true })
    qualifications?: string[];

    @Column('simple-array', { nullable: true })
    certifications?: string[];

    @Column({ default: false })
    isOnCall: boolean;

    @Column('simple-array', { nullable: true })
    languages?: string[];

    @Column({ type: 'jsonb', nullable: true })
    preferences?: {
        theme?: string;
        notifications?: {
            email?: boolean;
            sms?: boolean;
            inApp?: boolean;
        };
        timezone?: string;
        language?: string;
    };

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    signature?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 