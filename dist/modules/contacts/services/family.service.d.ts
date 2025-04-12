import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { ContactRelationship } from '../entities/contact-relationship.entity';
import { RelationshipType, RelationshipStatus } from '../entities/contact-relationship.entity';
interface FamilyMemberDTO {
    contact: Partial<Contact>;
    relationshipType: RelationshipType;
    isLegalGuardian?: boolean;
    hasMedicalDecisionAuthority?: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
}
interface AddFamilyMemberOptions {
    isLegalGuardian?: boolean;
    hasMedicalDecisionAuthority?: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
}
export declare class FamilyService {
    private readonly contactRepository;
    private readonly relationshipRepository;
    constructor(contactRepository: Repository<Contact>, relationshipRepository: Repository<ContactRelationship>);
    /**
     * Create a new family with a primary patient and optional family members
     */
    createFamily(organizationId: string, tenantId: string, createdById: string, primaryPatient: Partial<Contact>, familyMembers: FamilyMemberDTO[]): Promise<{
        patient: Contact;
        familyMembers: Contact[];
        familyId: string;
    }>;
    /**
     * Add a new family member to an existing family
     */
    addFamilyMember(organizationId: string, tenantId: string, createdById: string, familyId: string, newMember: Partial<Contact>, relationshipType: RelationshipType, options: AddFamilyMemberOptions): Promise<Contact>;
    /**
     * Get all members of a family
     */
    getFamilyMembers(familyId: string, organizationId: string): Promise<Contact[]>;
    /**
     * Get the primary patient of a family
     */
    getPrimaryPatient(familyId: string, organizationId: string): Promise<Contact>;
    /**
     * Update a family member's relationship
     */
    updateFamilyRelationship(organizationId: string, familyId: string, contactId: string, relatedContactId: string, updates: {
        type?: RelationshipType;
        isLegalGuardian?: boolean;
        hasMedicalDecisionAuthority?: boolean;
        permissions?: {
            canViewMedicalRecords?: boolean;
            canMakeAppointments?: boolean;
            canReceiveUpdates?: boolean;
            canPickupPrescriptions?: boolean;
            canAccessPortal?: boolean;
        };
        status?: RelationshipStatus;
    }): Promise<ContactRelationship>;
    /**
     * Remove a family member
     */
    removeFamilyMember(organizationId: string, familyId: string, contactId: string): Promise<{
        success: boolean;
    }>;
    private createContact;
    private createRelationship;
    private validateFamilyRelationship;
}
export {};
