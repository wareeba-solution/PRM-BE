// src/modules/email/entities/email-verification.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('email_verifications')
export class EmailVerification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index()
    userId: string;

    @Column()
    @Index()
    email: string;

    @Column()
    @Index()
    token: string;

    @Column({ nullable: true })
    organizationId?: string;

    @ManyToOne(() => Organization, { lazy: true })
    @JoinColumn({ name: 'organizationId' })
    organization: Promise<Organization>;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column({ nullable: true })
    verifiedAt?: Date;

    @Column({ default: false })
    isVerified: boolean;
}