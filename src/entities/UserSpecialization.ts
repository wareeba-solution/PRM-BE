import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('user_specializations')
export class UserSpecialization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    specialization: string;

    @ManyToOne(() => User, (user) => user.specializations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
