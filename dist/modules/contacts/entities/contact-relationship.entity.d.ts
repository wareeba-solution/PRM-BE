import type { Contact } from './contact.entity';
/**
 * Represents different types of relationships between contacts
 */
export declare enum RelationshipType {
    SPOUSE = "SPOUSE",
    PARENT = "PARENT",
    CHILD = "CHILD",
    SIBLING = "SIBLING",
    GUARDIAN = "GUARDIAN",
    DEPENDENT = "DEPENDENT",
    EMERGENCY_CONTACT = "EMERGENCY_CONTACT",
    PRIMARY_CARE_PROVIDER = "PRIMARY_CARE_PROVIDER",
    SPECIALIST = "SPECIALIST",
    CAREGIVER = "CAREGIVER",
    RELATIVE = "RELATIVE",
    COLLEAGUE = "COLLEAGUE",
    FRIEND = "FRIEND",
    OTHER = "OTHER"
}
export declare enum RelationshipStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    TERMINATED = "TERMINATED"
}
export declare class ContactRelationship {
    id: string;
    organizationId: string;
    tenantId: string;
    contactId: string;
    contact: Contact;
    relatedContactId: string;
    relatedContact: Contact;
    familyId: string;
    type: RelationshipType;
    status: RelationshipStatus;
    notes: string;
    isActive: boolean;
    isPrimary: boolean;
    isLegalGuardian: boolean;
    hasMedicalDecisionAuthority: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
    metadata: Record<string, any>;
    inverseType: RelationshipType;
    startDate: Date;
    endDate: Date;
    createdById: string;
    updatedById: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    get isFamilyRelationship(): boolean;
    get isMedicalRelationship(): boolean;
    get isEmergencyRelationship(): boolean;
}
