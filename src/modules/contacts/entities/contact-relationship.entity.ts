// src/modules/contacts/entities/contact-relationship.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
} from 'typeorm';
// Use type-only import to break the circular dependency
import type { Contact } from './contact.entity';

/**
 * Represents different types of relationships between contacts
 */
export enum RelationshipType {
    SPOUSE = 'SPOUSE',
    PARENT = 'PARENT',
    CHILD = 'CHILD',
    SIBLING = 'SIBLING',
    GUARDIAN = 'GUARDIAN',
    DEPENDENT = 'DEPENDENT',
    EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
    PRIMARY_CARE_PROVIDER = 'PRIMARY_CARE_PROVIDER',
    SPECIALIST = 'SPECIALIST',
    CAREGIVER = 'CAREGIVER',
    RELATIVE = 'RELATIVE',
    COLLEAGUE = 'COLLEAGUE',
    FRIEND = 'FRIEND',
    OTHER = 'OTHER',
}

export enum RelationshipStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    TERMINATED = 'TERMINATED',
}

@Entity('contact_relationships')
@Index(['organizationId', 'contactId'])
@Index(['organizationId', 'relatedContactId'])
@Index(['organizationId', 'familyId'])
export class ContactRelationship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    @Index()
    organizationId: string;

    @Column({ type: 'uuid' })
    @Index()
    tenantId: string;


    @Column({ type: 'uuid' })
    @Index()
    contactId: string;

    @ManyToOne('Contact', {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'contactId' })
    contact: Contact;

    @Column({ type: 'uuid' })
    @Index()
    relatedContactId: string;

    @ManyToOne('Contact', {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'relatedContactId' })
    relatedContact: Contact;

    @Column({ type: 'uuid', nullable: true })
    @Index()
    familyId: string; // For grouping family relationships

    @Column({
        type: 'enum',
        enum: RelationshipType,
        default: RelationshipType.OTHER,
    })
    type: RelationshipType;

    @Column({
        type: 'enum',
        enum: RelationshipStatus,
        default: RelationshipStatus.ACTIVE,
    })
    status: RelationshipStatus;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isPrimary: boolean;

    @Column({ type: 'boolean', default: false })
    isLegalGuardian: boolean;

    @Column({ type: 'boolean', default: false })
    hasMedicalDecisionAuthority: boolean;

    @Column({ type: 'jsonb', nullable: true })
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };

    @Column({ type: 'jsonb', nullable: true })
    metadata: Record<string, any>;

    @Column({
        type: 'enum',
        enum: RelationshipType,
        nullable: true,
    })
    inverseType: RelationshipType;

    @Column({ type: 'date', nullable: true })
    startDate: Date;


    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'uuid', nullable: true })
    createdById: string;

    @Column({ type: 'uuid', nullable: true })
    updatedById: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;

    get isFamilyRelationship(): boolean {
        return [
            RelationshipType.SPOUSE,
            RelationshipType.PARENT,
            RelationshipType.CHILD,
            RelationshipType.SIBLING,
            RelationshipType.GUARDIAN,
            RelationshipType.DEPENDENT,
            RelationshipType.RELATIVE,
        ].includes(this.type);
    }

    get isMedicalRelationship(): boolean {
        return [
            RelationshipType.PRIMARY_CARE_PROVIDER,
            RelationshipType.SPECIALIST,
            RelationshipType.CAREGIVER,
        ].includes(this.type);
    }

    get isEmergencyRelationship(): boolean {
        return this.type === RelationshipType.EMERGENCY_CONTACT;
    }
}