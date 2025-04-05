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

@Entity('user_settings')
export class UserSettings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    theme?: string;

    @Column({ nullable: true })
    language?: string;

    @Column({ nullable: true })
    timezone?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: 'jsonb', nullable: true })
    notificationPreferences?: {
        email?: boolean;
        sms?: boolean;
        inApp?: boolean;
        push?: boolean;
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 