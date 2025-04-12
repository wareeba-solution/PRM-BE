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
import { Tenant } from '../../tenants/entities/tenant.entity';

export enum ContactType {
    PATIENT = 'PATIENT',
    FAMILY_MEMBER = 'FAMILY_MEMBER',
    EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
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

export enum MaritalStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    DIVORCED = 'DIVORCED',
    WIDOWED = 'WIDOWED',
    SEPARATED = 'SEPARATED',
    OTHER = 'OTHER',
}

@Entity('contacts')
@Index(['organizationId', 'email'])
@Index(['organizationId', 'type'])
@Index(['organizationId', 'familyId'])
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    tenantId: string;
    
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

    @Column({ nullable: true })
    familyId: string; // For grouping family members together

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

    @Column({ type: 'enum', enum: MaritalStatus, nullable: true })
    maritalStatus?: MaritalStatus;

    @Column({ type: 'enum', enum: BloodType, default: BloodType.UNKNOWN })
    bloodType: BloodType;

    @Column({ type: 'jsonb', nullable: true })
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isPrimary: boolean;
        type?: 'HOME' | 'WORK' | 'OTHER';
    }[];

    @Column({ type: 'jsonb', nullable: true })
    emergencyContacts?: {
        name: string;
        relationship: string;
        phoneNumber: string;
        address?: string;
        isPrimary: boolean;
    }[];

    @Column({ type: 'simple-array', nullable: true })
    allergies?: string[];

    @Column({ type: 'simple-array', nullable: true })
    medications?: string[];

    @Column({ type: 'jsonb', nullable: true })
    insurance?: {
        provider: string;
        policyNumber: string;
        groupNumber?: string;
        type: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
        coverageStartDate?: Date;
        coverageEndDate?: Date;
        isActive: boolean;
    }[];

    @Column({ nullable: true })
    occupation?: string;

    @Column({ type: 'jsonb', nullable: true })
    employment?: {
        employer?: string;
        position?: string;
        workPhone?: string;
        workEmail?: string;
        startDate?: Date;
        endDate?: Date;
    };

    @Column({ type: 'jsonb', nullable: true })
    familyHistory?: {
        condition: string;
        relationship: string;
        notes?: string;
    }[];

    @Column({ type: 'jsonb', nullable: true })
    socialHistory?: {
        smoking?: {
            status: 'CURRENT' | 'FORMER' | 'NEVER';
            years?: number;
            packsPerDay?: number;
            quitDate?: Date;
        };
        alcohol?: {
            status: 'CURRENT' | 'FORMER' | 'NEVER';
            frequency?: string;
            amount?: string;
            quitDate?: Date;
        };
        exercise?: {
            frequency?: string;
            type?: string;
            duration?: string;
        };
        diet?: {
            type?: string;
            restrictions?: string[];
        };
    };

    @Column({ type: 'jsonb', nullable: true })
    medicalConditions?: {
        condition: string;
        diagnosisDate?: Date;
        status: 'ACTIVE' | 'RESOLVED' | 'CHRONIC';
        severity?: 'MILD' | 'MODERATE' | 'SEVERE';
        notes?: string;
    }[];

    @Column({ type: 'jsonb', nullable: true })
    immunizations?: {
        vaccine: string;
        date: Date;
        administeredBy?: string;
        lotNumber?: string;
        nextDueDate?: Date;
    }[];

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
    @ManyToOne(() => Tenant, { lazy: true })
    @JoinColumn({ name: 'tenantId' })
    tenant: Promise<Tenant>;
    
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

    @OneToMany(() => ContactRelationship, relationship => relationship.relatedContact, { lazy: true })
    relatedRelationships: Promise<ContactRelationship[]>;

    @OneToMany(() => MergedRecord, mergedRecord => mergedRecord.primaryContact, { lazy: true })
    mergedRecords: Promise<MergedRecord[]>;

    // Virtual properties
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`.trim();
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

    get isPatient(): boolean {
        return this.type === ContactType.PATIENT;
    }

    get isFamilyMember(): boolean {
        return this.type === ContactType.FAMILY_MEMBER;
    }

    get isEmergencyContact(): boolean {
        return this.type === ContactType.EMERGENCY_CONTACT;
    }

    get primaryAddress(): any {
        return this.address?.find(addr => addr.isPrimary);
    }

    get primaryEmergencyContact(): any {
        return this.emergencyContacts?.find(contact => contact.isPrimary);
    }

    get primaryInsurance(): any {
        return this.insurance?.find(ins => ins.type === 'PRIMARY');
    }
}