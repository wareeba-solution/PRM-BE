import { FamilyService } from '../services/family.service';
import { Contact } from '../entities/contact.entity';
import { ContactRelationship } from '../entities/contact-relationship.entity';
import { RelationshipType, RelationshipStatus } from '../entities/contact-relationship.entity';
import { User } from '../../users/entities/user.entity';
interface CreateFamilyDTO {
    primaryPatient: Partial<Contact>;
    familyMembers: Array<{
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
    }>;
}
interface AddFamilyMemberDTO {
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
interface UpdateRelationshipDTO {
    type?: RelationshipType;
    isLegalGuardian?: boolean;
    hasMedicalDecisionAuthority?: boolean;
    permissions: {
        canViewMedicalRecords: boolean;
        canMakeAppointments: boolean;
        canReceiveUpdates: boolean;
        canPickupPrescriptions: boolean;
        canAccessPortal: boolean;
    };
    status?: RelationshipStatus;
}
export declare class FamilyController {
    private readonly familyService;
    constructor(familyService: FamilyService);
    createFamily(user: User, data: CreateFamilyDTO): Promise<{
        patient: Contact;
        familyMembers: Contact[];
        familyId: string;
    }>;
    addFamilyMember(user: User, familyId: string, data: AddFamilyMemberDTO): Promise<Contact>;
    getFamilyMembers(user: User, familyId: string): Promise<Contact[]>;
    getPrimaryPatient(user: User, familyId: string): Promise<Contact>;
    updateFamilyRelationship(user: User, familyId: string, contactId: string, relatedContactId: string, updates: UpdateRelationshipDTO): Promise<ContactRelationship>;
    removeFamilyMember(user: User, familyId: string, contactId: string): Promise<{
        success: boolean;
    }>;
}
export {};
