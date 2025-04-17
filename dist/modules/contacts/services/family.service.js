"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("../entities/contact.entity");
const contact_relationship_entity_1 = require("../entities/contact-relationship.entity");
const contact_relationship_entity_2 = require("../entities/contact-relationship.entity");
const contact_entity_2 = require("../entities/contact.entity");
const uuid_1 = require("uuid");
let FamilyService = class FamilyService {
    constructor(contactRepository, relationshipRepository) {
        this.contactRepository = contactRepository;
        this.relationshipRepository = relationshipRepository;
    }
    /**
     * Create a new family with a primary patient and optional family members
     */
    async createFamily(organizationId, tenantId, createdById, primaryPatient, familyMembers) {
        // Generate a unique family ID
        const familyId = (0, uuid_1.v4)();
        // Create primary patient
        const patient = await this.createContact(Object.assign(Object.assign({}, primaryPatient), { organizationId,
            tenantId,
            createdById, type: contact_entity_2.ContactType.PATIENT, familyId }));
        // Create family members and their relationships
        const createdMembers = await Promise.all(familyMembers.map(async (member) => {
            const contact = await this.createContact(Object.assign(Object.assign({}, member.contact), { organizationId,
                tenantId,
                createdById, type: contact_entity_2.ContactType.FAMILY_MEMBER, familyId }));
            // Create relationship between patient and family member
            await this.createRelationship({
                organizationId,
                tenantId,
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
        }));
        return {
            patient,
            familyMembers: createdMembers,
            familyId,
        };
    }
    /**
     * Add a new family member to an existing family
     */
    async addFamilyMember(organizationId, tenantId, createdById, familyId, newMember, relationshipType, options) {
        // Validate family exists
        const familyExists = await this.contactRepository.findOne({
            where: { familyId, organizationId },
        });
        if (!familyExists) {
            throw new common_1.NotFoundException('Family not found');
        }
        // Validate relationship type
        this.validateFamilyRelationship(relationshipType);
        // Create new family member
        const contact = await this.createContact(Object.assign(Object.assign({}, newMember), { organizationId,
            tenantId,
            createdById, type: contact_entity_2.ContactType.FAMILY_MEMBER, familyId }));
        // Create relationship with primary patient
        const primaryPatient = await this.getPrimaryPatient(familyId, organizationId);
        await this.createRelationship({
            organizationId,
            tenantId,
            contactId: primaryPatient.id,
            relatedContactId: contact.id,
            familyId,
            type: relationshipType,
            isLegalGuardian: options === null || options === void 0 ? void 0 : options.isLegalGuardian,
            hasMedicalDecisionAuthority: options === null || options === void 0 ? void 0 : options.hasMedicalDecisionAuthority,
            permissions: options === null || options === void 0 ? void 0 : options.permissions,
            createdById,
        });
        return contact;
    }
    /**
     * Get all members of a family
     */
    async getFamilyMembers(familyId, organizationId) {
        const members = await this.contactRepository.find({
            where: { familyId, organizationId },
            relations: ['relationships', 'relatedRelationships'],
        });
        if (!members.length) {
            throw new common_1.NotFoundException('Family not found');
        }
        return members;
    }
    /**
     * Get the primary patient of a family
     */
    async getPrimaryPatient(familyId, organizationId) {
        const patient = await this.contactRepository.findOne({
            where: { familyId, organizationId, type: contact_entity_2.ContactType.PATIENT },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Primary patient not found');
        }
        return patient;
    }
    /**
     * Update a family member's relationship
     */
    async updateFamilyRelationship(organizationId, familyId, contactId, relatedContactId, updates) {
        const relationship = await this.relationshipRepository.findOne({
            where: {
                organizationId,
                familyId,
                contactId,
                relatedContactId,
            },
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Relationship not found');
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
    async removeFamilyMember(organizationId, familyId, contactId) {
        const contact = await this.contactRepository.findOne({
            where: { id: contactId, organizationId, familyId },
        });
        if (!contact) {
            throw new common_1.NotFoundException('Family member not found');
        }
        // Don't allow removing the primary patient
        if (contact.type === contact_entity_2.ContactType.PATIENT) {
            throw new common_1.BadRequestException('Cannot remove primary patient');
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
    async createContact(data) {
        const contact = this.contactRepository.create(data);
        return this.contactRepository.save(contact);
    }
    async createRelationship(data) {
        const relationship = this.relationshipRepository.create(data);
        return this.relationshipRepository.save(relationship);
    }
    validateFamilyRelationship(type) {
        const validFamilyRelationships = [
            contact_relationship_entity_2.RelationshipType.SPOUSE,
            contact_relationship_entity_2.RelationshipType.PARENT,
            contact_relationship_entity_2.RelationshipType.CHILD,
            contact_relationship_entity_2.RelationshipType.SIBLING,
            contact_relationship_entity_2.RelationshipType.GUARDIAN,
            contact_relationship_entity_2.RelationshipType.DEPENDENT,
            contact_relationship_entity_2.RelationshipType.RELATIVE,
        ];
        if (!validFamilyRelationships.includes(type)) {
            throw new common_1.BadRequestException(`Invalid family relationship type: ${type}. Must be one of: ${validFamilyRelationships.join(', ')}`);
        }
    }
};
FamilyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __param(1, (0, typeorm_1.InjectRepository)(contact_relationship_entity_1.ContactRelationship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FamilyService);
exports.FamilyService = FamilyService;
//# sourceMappingURL=family.service.js.map