import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { ContactRelationship } from '../entities/contact-relationship.entity';
import { RelationshipType, RelationshipStatus } from '../entities/contact-relationship.entity';
import { ContactType } from '../entities/contact.entity';
import { v4 as uuidv4 } from 'uuid';

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

@Injectable()
export class FamilyService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
        @InjectRepository(ContactRelationship)
        private readonly relationshipRepository: Repository<ContactRelationship>,
    ) {}

    /**
     * Create a new family with a primary patient and optional family members
     */
    async createFamily(
        organizationId: string,
        tenantId: string,
        createdById: string,
        primaryPatient: Partial<Contact>,
        familyMembers: FamilyMemberDTO[],
    ) {
        // Generate a unique family ID
        const familyId = uuidv4();

        // Create primary patient
        const patient = await this.createContact({
            ...primaryPatient,
            organizationId,
            tenantId,
            createdById,
            type: ContactType.PATIENT,
            familyId,
        });

        // Create family members and their relationships
        const createdMembers = await Promise.all(
            familyMembers.map(async (member) => {
                const contact = await this.createContact({
                    ...member.contact,
                    organizationId,
                    tenantId,
                    createdById,
                    type: ContactType.FAMILY_MEMBER,
                    familyId,
                });

                // Create relationship between patient and family member
                await this.createRelationship({
                    organizationId,
                    contactId: patient.id,
                    relatedContactId: contact.id,
                    familyId,
                    type: member.relationshipType,
                    isLegalGuardian: member.isLegalGuardian,
                    hasMedicalDecisionAuthority: member.hasMedicalDecisionAuthority,
                    permissions: member.permissions,
                    createdById,
                });

                return contact;
            }),
        );

        return {
            patient,
            familyMembers: createdMembers,
            familyId,
        };
    }

    /**
     * Add a new family member to an existing family
     */
    async addFamilyMember(
        organizationId: string,
        tenantId: string,
        createdById: string,
        familyId: string,
        newMember: Partial<Contact>,
        relationshipType: RelationshipType,
        options: AddFamilyMemberOptions,
    ) {
        // Validate family exists
        const familyExists = await this.contactRepository.findOne({
            where: { familyId, organizationId },
        });

        if (!familyExists) {
            throw new NotFoundException('Family not found');
        }

        // Validate relationship type
        this.validateFamilyRelationship(relationshipType);

        // Create new family member
        const contact = await this.createContact({
            ...newMember,
            organizationId,
            tenantId,
            createdById,
            type: ContactType.FAMILY_MEMBER,
            familyId,
        });

        // Create relationship with primary patient
        const primaryPatient = await this.getPrimaryPatient(familyId, organizationId);
        await this.createRelationship({
            organizationId,
            contactId: primaryPatient.id,
            relatedContactId: contact.id,
            familyId,
            type: relationshipType,
            isLegalGuardian: options?.isLegalGuardian,
            hasMedicalDecisionAuthority: options?.hasMedicalDecisionAuthority,
            permissions: options?.permissions,
            createdById,
        });

        return contact;
    }

    /**
     * Get all members of a family
     */
    async getFamilyMembers(familyId: string, organizationId: string) {
        const members = await this.contactRepository.find({
            where: { familyId, organizationId },
            relations: ['relationships', 'relatedRelationships'],
        });

        if (!members.length) {
            throw new NotFoundException('Family not found');
        }

        return members;
    }

    /**
     * Get the primary patient of a family
     */
    async getPrimaryPatient(familyId: string, organizationId: string) {
        const patient = await this.contactRepository.findOne({
            where: { familyId, organizationId, type: ContactType.PATIENT },
        });

        if (!patient) {
            throw new NotFoundException('Primary patient not found');
        }

        return patient;
    }

    /**
     * Update a family member's relationship
     */
    async updateFamilyRelationship(
        organizationId: string,
        familyId: string,
        contactId: string,
        relatedContactId: string,
        updates: {
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
        },
    ) {
        const relationship = await this.relationshipRepository.findOne({
            where: {
                organizationId,
                familyId,
                contactId,
                relatedContactId,
            },
        });

        if (!relationship) {
            throw new NotFoundException('Relationship not found');
        }

        if (updates.type) {
            this.validateFamilyRelationship(updates.type);
        }

        Object.assign(relationship, updates);
        return this.relationshipRepository.save(relationship);
    }

    /**
     * Remove a family member
     */
    async removeFamilyMember(
        organizationId: string,
        familyId: string,
        contactId: string,
    ) {
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId, familyId },
        });

        if (!contact) {
            throw new NotFoundException('Family member not found');
        }

        // Don't allow removing the primary patient
        if (contact.type === ContactType.PATIENT) {
            throw new BadRequestException('Cannot remove primary patient');
        }

        // Remove all relationships
        await this.relationshipRepository.delete({
            organizationId,
            familyId,
            contactId,
        });

        await this.relationshipRepository.delete({
            organizationId,
            familyId,
            relatedContactId: contactId,
        });

        // Soft delete the contact
        await this.contactRepository.softDelete(contactId);

        return { success: true };
    }

    private async createContact(data: Partial<Contact>) {
        const contact = this.contactRepository.create(data);
        return this.contactRepository.save(contact);
    }

    private async createRelationship(data: Partial<ContactRelationship>) {
        const relationship = this.relationshipRepository.create(data);
        return this.relationshipRepository.save(relationship);
    }

    private validateFamilyRelationship(type: RelationshipType) {
        const validFamilyRelationships = [
            RelationshipType.SPOUSE,
            RelationshipType.PARENT,
            RelationshipType.CHILD,
            RelationshipType.SIBLING,
            RelationshipType.GUARDIAN,
            RelationshipType.DEPENDENT,
            RelationshipType.RELATIVE,
        ];

        if (!validFamilyRelationships.includes(type)) {
            throw new BadRequestException(
                `Invalid family relationship type: ${type}. Must be one of: ${validFamilyRelationships.join(', ')}`,
            );
        }
    }
} 