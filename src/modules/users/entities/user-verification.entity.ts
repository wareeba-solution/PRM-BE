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

@Entity('user_verifications')
export class UserVerification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ default: false })
    isPhoneVerified: boolean;

    @Column({ nullable: true })
    emailVerifiedAt?: Date;

    @Column({ nullable: true })
    phoneVerifiedAt?: Date;

    @Column({ nullable: true })
    lastEmailVerificationSent?: Date;

    @Column({ nullable: true })
    lastPhoneVerificationSent?: Date;

    @Column({ nullable: true })
    emailVerificationToken?: string;

    @Column({ nullable: true })
    phoneVerificationToken?: string;

    @Column({ nullable: true })
    emailVerificationExpires?: Date;

    @Column({ nullable: true })
    phoneVerificationExpires?: Date;

    @Column('simple-array', { nullable: true })
    deviceTokens?: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 