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
export declare class ContactRelationship {
    id: string;
    organizationId: string;
    contactId: string;
    contact: Contact;
    relatedContactId: string;
    relatedContact: Contact;
    type: RelationshipType;
    notes: string;
    isActive: boolean;
    isPrimary: boolean;
    createdById: string;
    updatedById: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    /**
     * Custom metadata for the relationship (JSON field)
     * This can store additional information specific to the relationship type
     * For example, for a PARENT-CHILD relationship, it might store custodial information
     */
    metadata: Record<string, any>;
    /**
     * Inverse relationship type (if applicable)
     * For example, if this relationship is PARENT, the inverse would be CHILD
     * This helps maintain consistency when querying from either direction
     */
    inverseType: RelationshipType;
    /**
     * Start date of the relationship (if applicable)
     * For example, when a provider became a patient's specialist
     */
    startDate: Date;
    /**
     * End date of the relationship (if applicable)
     * For example, when a provider stopped being a patient's specialist
     */
    endDate: Date;
}
