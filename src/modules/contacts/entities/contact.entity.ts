// src/modules/contacts/entities/contact.entity.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    Index,
    JoinColumn
} from 'typeorm';
import { ContactRelationship } from './contact-relationship.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Document } from '../../documents/entities/document.entity';
import { MedicalHistory } from '../../medical-history/medical-history.entity';
import { MergedRecord } from '../../merged-records/entities/merged-record.entity';

export enum ContactType {
    PATIENT = 'PATIENT',
    EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
    FAMILY_MEMBER = 'FAMILY_MEMBER',
    OTHER = 'OTHER',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
    PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum BloodType {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    UNKNOWN = 'UNKNOWN',
}

@Entity('contacts')
@Index(['organizationId', 'email'])
@Index(['organizationId', 'phoneNumber'])
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ nullable: true })
    status: string;
    
    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;
    
    @Column({ nullable: true })
    phone: string;

    @Column()
    organizationId: string;

    @Column({ type: 'enum', enum: ContactType, default: ContactType.PATIENT })
    type: ContactType;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    middleName?: string;

    @Column({ nullable: true })
    preferredName?: string;

    @Column({ unique: true, nullable: true })
    @Index()
    email?: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ nullable: true })
    alternativePhoneNumber?: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender?: Gender;

    @Column({ type: 'date', nullable: true })
    dateOfBirth?: Date;

    @Column({ type: 'enum', enum: BloodType, default: BloodType.UNKNOWN })
    bloodType: BloodType;

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
        phoneNumber: string;
        address?: string;
    };

    @Column({ type: 'simple-array', nullable: true })
    allergies?: string[];

    @Column({ type: 'simple-array', nullable: true })
    medications?: string[];

    @Column({ nullable: true })
    occupation?: string;

    @Column({ nullable: true })
    notes?: string;

    @Column({ type: 'jsonb', nullable: true })
    customFields?: Record<string, any>;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    lastVisitDate?: Date;

    @Column({ nullable: true })
    nextAppointmentDate?: Date;

    @Column()
    createdById: string;

    @Column({ nullable: true })
    updatedById?: string;

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
    @JoinColumn({ name: 'createdById' })
    createdBy: Promise<User>;

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({ name: 'updatedById' })
    updatedBy: Promise<User>;

    @OneToMany(() => Appointment, appointment => appointment.patient, { lazy: true })
    appointments: Promise<Appointment[]>;

    @OneToMany(() => Document, document => document.contact, { lazy: true })
    documents: Promise<Document[]>;

    @OneToMany(() => MedicalHistory, medicalHistory => medicalHistory.contact, { lazy: true })
    medicalHistory: Promise<MedicalHistory[]>;

    @OneToMany(() => ContactRelationship, relationship => relationship.contact, { lazy: true })
    relationships: Promise<ContactRelationship[]>;

    @OneToMany(() => MergedRecord, mergedRecord => mergedRecord.primaryContact, { lazy: true })
    mergedRecords: Promise<MergedRecord[]>;

    // Virtual properties
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get age(): number | null {
        if (!this.dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}