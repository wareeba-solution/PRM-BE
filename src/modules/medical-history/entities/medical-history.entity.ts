import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';

export enum EncounterType {
    CONSULTATION = 'CONSULTATION',
    EMERGENCY = 'EMERGENCY',
    FOLLOW_UP = 'FOLLOW_UP',
    LAB_TEST = 'LAB_TEST',
    PROCEDURE = 'PROCEDURE',
    VACCINATION = 'VACCINATION',
    OTHER = 'OTHER',
}

export enum HealthcareProviderType {
    DOCTOR = 'DOCTOR',
    NURSE = 'NURSE',
    SPECIALIST = 'SPECIALIST',
    PHYSICIAN_ASSISTANT = 'PHYSICIAN_ASSISTANT',
    NURSE_PRACTITIONER = 'NURSE_PRACTITIONER',
    OTHER = 'OTHER',
}

@Entity('medical_history')
export class MedicalHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organizationId: string;

    @Column()
    contactId: string;

    @ManyToOne(() => Contact)
    @JoinColumn({ name: 'contactId' })
    contact: Contact;

    @Column({
        type: 'enum',
        enum: EncounterType,
    })
    encounterType: EncounterType;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column({ nullable: true })
    diagnosis?: string;

    @Column({ nullable: true })
    treatment?: string;

    @Column({ nullable: true })
    medications?: string;

    @Column({ nullable: true })
    symptoms?: string;

    @Column('jsonb', { nullable: true })
    vitalSigns?: {
        bloodPressure?: string;
        temperature?: number;
        heartRate?: number;
        respiratoryRate?: number;
        oxygenSaturation?: number;
        height?: number;
        weight?: number;
        bmi?: number;
    };

    @Column({ nullable: true })
    notes?: string;

    @Column('jsonb', { nullable: true })
    referrals?: {
        to: string;
        reason: string;
        date: Date;
        status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    }[];

    @Column('jsonb', { nullable: true })
    attachments?: {
        name: string;
        type: string;
        url: string;
    }[];

    @Column('jsonb', { nullable: true })
    labResults?: {
        test: string;
        result: string;
        normalRange: string;
        date: Date;
        isAbnormal: boolean;
    }[];

    @Column({ nullable: true })
    providerName?: string;

    @Column({
        type: 'enum',
        enum: HealthcareProviderType,
        nullable: true,
    })
    providerType?: HealthcareProviderType;

    @Column({ nullable: true })
    facilityName?: string;

    @Column({ nullable: true })
    facilityLocation?: string;

    @Column({ default: false })
    isInsuranceClaim: boolean;

    @Column({ nullable: true })
    insuranceClaimNumber?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    costAmount?: number;

    @Column({ nullable: true })
    costCurrency?: string;

    @Column({ default: false })
    isFlagged: boolean;

    @Column({ nullable: true })
    flagReason?: string;

    @Column({ default: false })
    requiresFollowUp: boolean;

    @Column({ nullable: true })
    followUpDate?: Date;

    @Column()
    createdById: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
} 