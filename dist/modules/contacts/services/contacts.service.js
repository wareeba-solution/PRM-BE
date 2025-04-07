"use strict";
// src/modules/contacts/services/contacts.service.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const contact_entity_1 = require("../entities/contact.entity");
const contact_relationship_entity_1 = require("../entities/contact-relationship.entity");
const medical_history_entity_1 = require("../../medical-history/medical-history.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const document_entity_1 = require("../../documents/entities/document.entity");
const merged_record_entity_1 = require("../../merged-records/entities/merged-record.entity");
/**
 * Gets the inverse relationship type for bidirectional relationships
 * @param type The original relationship type
 * @returns The inverse relationship type or undefined
 */
function getInverseRelationshipType(type) {
    const inverseMap = {
        [contact_relationship_entity_1.RelationshipType.SPOUSE]: contact_relationship_entity_1.RelationshipType.SPOUSE,
        [contact_relationship_entity_1.RelationshipType.PARENT]: contact_relationship_entity_1.RelationshipType.CHILD,
        [contact_relationship_entity_1.RelationshipType.CHILD]: contact_relationship_entity_1.RelationshipType.PARENT,
        [contact_relationship_entity_1.RelationshipType.SIBLING]: contact_relationship_entity_1.RelationshipType.SIBLING,
        [contact_relationship_entity_1.RelationshipType.GUARDIAN]: contact_relationship_entity_1.RelationshipType.DEPENDENT,
        [contact_relationship_entity_1.RelationshipType.DEPENDENT]: contact_relationship_entity_1.RelationshipType.GUARDIAN,
        [contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT]: contact_relationship_entity_1.RelationshipType.OTHER,
        [contact_relationship_entity_1.RelationshipType.PRIMARY_CARE_PROVIDER]: contact_relationship_entity_1.RelationshipType.OTHER,
        [contact_relationship_entity_1.RelationshipType.SPECIALIST]: contact_relationship_entity_1.RelationshipType.OTHER,
        [contact_relationship_entity_1.RelationshipType.CAREGIVER]: contact_relationship_entity_1.RelationshipType.OTHER,
        [contact_relationship_entity_1.RelationshipType.RELATIVE]: contact_relationship_entity_1.RelationshipType.RELATIVE,
        [contact_relationship_entity_1.RelationshipType.COLLEAGUE]: contact_relationship_entity_1.RelationshipType.COLLEAGUE,
        [contact_relationship_entity_1.RelationshipType.FRIEND]: contact_relationship_entity_1.RelationshipType.FRIEND,
        [contact_relationship_entity_1.RelationshipType.OTHER]: contact_relationship_entity_1.RelationshipType.OTHER,
    };
    return inverseMap[type];
}
let ContactsService = class ContactsService {
    constructor(contactRepository, mergedRecordRepository, relationshipRepository, medicalHistoryRepository, appointmentRepository, documentRepository, dataSource) {
        this.contactRepository = contactRepository;
        this.mergedRecordRepository = mergedRecordRepository;
        this.relationshipRepository = relationshipRepository;
        this.medicalHistoryRepository = medicalHistoryRepository;
        this.appointmentRepository = appointmentRepository;
        this.documentRepository = documentRepository;
        this.dataSource = dataSource;
    }
    async create(data) {
        const existingContact = await this.contactRepository.findOne({
            where: [
                { email: data.email, organizationId: data.organizationId },
                { phone: data.phone, organizationId: data.organizationId },
            ],
        });
        if (existingContact) {
            throw new common_1.ConflictException('Contact with this email or phone number already exists');
        }
        // Extract documents data if it exists to handle properly
        const { documents: documentIds } = data, contactData = __rest(data, ["documents"]);
        // Create a new contact with correct property mapping
        const contact = new contact_entity_1.Contact();
        Object.assign(contact, contactData);
        // Set createdBy properly - use the string ID directly instead of object
        contact.createdById = data.createdBy;
        // Handle documents properly if present
        if (documentIds && Array.isArray(documentIds)) {
            // Find existing documents or create references using the IDs
            const documents = await this.documentRepository.find({
                where: { id: (0, typeorm_2.In)(documentIds) }
            });
            // If documents exist, assign them to the contact
            if (documents.length > 0) {
                contact.documents = Promise.resolve(documents);
            }
        }
        const savedContact = await this.contactRepository.save(contact);
        return savedContact;
    }
    async findAll(query) {
        const _a = query, { organizationId, search, type, isActive, page = 1, limit = 10 } = _a, filters = __rest(_a, ["organizationId", "search", "type", "isActive", "page", "limit"]);
        const queryBuilder = this.contactRepository.createQueryBuilder('contact')
            .where('contact.organizationId = :organizationId', { organizationId });
        if (search) {
            queryBuilder.andWhere('(LOWER(contact.firstName) LIKE LOWER(:search) OR LOWER(contact.lastName) LIKE LOWER(:search) OR LOWER(contact.email) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        if (type) {
            queryBuilder.andWhere('contact.type = :type', { type });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('contact.isActive = :isActive', { isActive });
        }
        Object.keys(filters).forEach(key => {
            queryBuilder.andWhere(`contact.${key} = :${key}`, { [key]: filters[key] });
        });
        // Fixed pagination by using explicit type parameter
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async search(searchTerm, query) {
        const { organizationId, page = 1, limit = 10 } = query;
        const queryBuilder = this.contactRepository.createQueryBuilder('contact')
            .where('contact.organizationId = :organizationId', { organizationId })
            .andWhere('(LOWER(contact.firstName) LIKE LOWER(:search) OR LOWER(contact.lastName) LIKE LOWER(:search) OR LOWER(contact.email) LIKE LOWER(:search) OR contact.phone LIKE :search)', { search: `%${searchTerm}%` });
        // Fixed pagination by using explicit type parameter
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const contact = await this.contactRepository.findOne({
            where: { id, organizationId },
            relations: ['documents', 'appointments', 'medicalHistory'],
        });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contact;
    }
    async update(id, data) {
        const contact = await this.findOne(id, data.organizationId);
        // Check unique constraints if email or phone is being updated
        if (data.email || data.phone) {
            const whereCondition = [];
            if (data.email) {
                whereCondition.push({ email: data.email, organizationId: data.organizationId, id: (0, typeorm_2.Not)(id) });
            }
            if (data.phone) {
                whereCondition.push({ phone: data.phone, organizationId: data.organizationId, id: (0, typeorm_2.Not)(id) });
            }
            const existingContact = await this.contactRepository.findOne({
                where: whereCondition,
            });
            if (existingContact) {
                throw new common_1.ConflictException('Contact with this email or phone number already exists');
            }
        }
        // Update the updatedById field instead of trying to create a relation
        Object.assign(contact, Object.assign(Object.assign({}, data), { updatedById: data.updatedBy }));
        return this.contactRepository.save(contact);
    }
    async remove(id, organizationId) {
        const contact = await this.findOne(id, organizationId);
        await this.contactRepository.softRemove(contact);
    }
    async merge(primaryId, secondaryId, context) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const [primary, secondary] = await Promise.all([
                this.findOne(primaryId, context.organizationId),
                this.findOne(secondaryId, context.organizationId),
            ]);
            // Merge basic information (keeping primary's core data)
            if (!primary.middleName)
                primary.middleName = secondary.middleName;
            // if (!primary.mobilePhone) primary.mobilePhone = secondary.mobilePhone;
            // Handle properties that might not exist on the Contact entity
            if ('alternativePhoneNumber' in primary && 'alternativePhoneNumber' in secondary) {
                if (!primary.alternativePhoneNumber)
                    primary.alternativePhoneNumber = secondary.alternativePhoneNumber;
            }
            if ('allergies' in primary && 'allergies' in secondary) {
                if (!primary.allergies)
                    primary.allergies = secondary.allergies;
                // Merge arrays if both exist
                if (primary.allergies && secondary.allergies) {
                    primary.allergies = [...new Set([...primary.allergies, ...secondary.allergies])];
                }
            }
            if ('medications' in primary && 'medications' in secondary) {
                if (!primary.medications)
                    primary.medications = secondary.medications;
                // Merge arrays if both exist
                if (primary.medications && secondary.medications) {
                    primary.medications = [...new Set([...primary.medications, ...secondary.medications])];
                }
            }
            // Safely merge metadata objects
            if (primary.metadata && secondary.metadata) {
                primary.metadata = Object.assign(Object.assign({}, secondary.metadata), primary.metadata);
            }
            else if (secondary.metadata) {
                primary.metadata = secondary.metadata;
            }
            // Update relationships
            await queryRunner.manager
                .createQueryBuilder()
                .update(appointment_entity_1.Appointment)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .update(document_entity_1.Document)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .update(medical_history_entity_1.MedicalHistory)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId })
                .execute();
            // Get existing merged records or initialize as empty array
            const existingMergedRecords = await primary.mergedRecords || [];
            // Create a new merged record
            const newMergedRecord = this.mergedRecordRepository.create({
                organizationId: context.organizationId,
                primaryContactId: primaryId,
                secondaryContactId: secondaryId,
                createdById: context.userId
            });
            // Save the new merged record
            const savedMergedRecord = await queryRunner.manager.save(merged_record_entity_1.MergedRecord, newMergedRecord);
            // Update the primary contact's merged records with Promise.resolve
            primary.mergedRecords = Promise.resolve([...existingMergedRecords, savedMergedRecord]);
            // Mark secondary as inactive
            secondary.status = 'INACTIVE';
            await queryRunner.manager.save(contact_entity_1.Contact, primary);
            await queryRunner.manager.save(contact_entity_1.Contact, secondary);
            await queryRunner.commitTransaction();
            return primary;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    /**
     * Gets all relationships for a contact
     */
    async getRelationships(id, organizationId, includeInactive = false) {
        const queryBuilder = this.relationshipRepository.createQueryBuilder('relationship')
            .leftJoinAndSelect('relationship.relatedContact', 'relatedContact')
            .where('relationship.contactId = :id', { id })
            .andWhere('relationship.organizationId = :organizationId', { organizationId });
        if (!includeInactive) {
            queryBuilder.andWhere('relationship.isActive = true');
        }
        return queryBuilder.getMany();
    }
    /**
     * Creates a new relationship between two contacts
     * If the relationship is bidirectional, creates the inverse relationship too
     */
    async createRelationship(contactId, relationshipDto, context) {
        var _a, _b, _c, _d, _e, _f;
        // Verify that both contacts exist
        const [contact, relatedContact] = await Promise.all([
            this.findOne(contactId, context.organizationId),
            this.findOne(relationshipDto.relatedContactId, context.organizationId),
        ]);
        // Check if relationship already exists
        const existingRelationship = await this.relationshipRepository.findOne({
            where: {
                contactId,
                relatedContactId: relationshipDto.relatedContactId,
                organizationId: context.organizationId,
            },
        });
        if (existingRelationship) {
            throw new common_1.BadRequestException('Relationship already exists between these contacts');
        }
        // Start a transaction for potential bidirectional relationship creation
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Determine inverse type if not provided
            const inverseType = relationshipDto.inverseType || getInverseRelationshipType(relationshipDto.type);
            // Create the primary relationship directly using class instantiation
            const relationship = new contact_relationship_entity_1.ContactRelationship();
            relationship.contactId = contactId;
            relationship.relatedContactId = relationshipDto.relatedContactId;
            relationship.type = relationshipDto.type;
            relationship.inverseType = inverseType !== null && inverseType !== void 0 ? inverseType : contact_relationship_entity_1.RelationshipType.OTHER;
            relationship.notes = (_a = relationshipDto.notes) !== null && _a !== void 0 ? _a : '';
            relationship.isPrimary = relationshipDto.isPrimary || false;
            relationship.startDate = (_b = relationshipDto.startDate) !== null && _b !== void 0 ? _b : new Date();
            if (relationshipDto.endDate) {
                relationship.endDate = relationshipDto.endDate;
            }
            relationship.metadata = (_c = relationshipDto.metadata) !== null && _c !== void 0 ? _c : {};
            relationship.organizationId = context.organizationId;
            relationship.createdById = context.userId;
            const savedRelationship = await queryRunner.manager.save(relationship);
            // Create the inverse relationship if applicable
            if (inverseType && inverseType !== contact_relationship_entity_1.RelationshipType.OTHER) {
                const inverseRelationship = new contact_relationship_entity_1.ContactRelationship();
                inverseRelationship.contactId = relationshipDto.relatedContactId;
                inverseRelationship.relatedContactId = contactId;
                inverseRelationship.type = inverseType;
                inverseRelationship.inverseType = relationshipDto.type;
                inverseRelationship.notes = (_d = relationshipDto.notes) !== null && _d !== void 0 ? _d : '';
                inverseRelationship.isPrimary = relationshipDto.isPrimary || false;
                inverseRelationship.startDate = (_e = relationshipDto.startDate) !== null && _e !== void 0 ? _e : new Date();
                if (relationshipDto.endDate !== undefined) {
                    inverseRelationship.endDate = relationshipDto.endDate;
                }
                inverseRelationship.metadata = (_f = relationshipDto.metadata) !== null && _f !== void 0 ? _f : {};
                inverseRelationship.organizationId = context.organizationId;
                inverseRelationship.createdById = context.userId;
                await queryRunner.manager.save(inverseRelationship);
            }
            await queryRunner.commitTransaction();
            return savedRelationship;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    /**
     * Updates an existing relationship between contacts
     * If the relationship is bidirectional, updates the inverse relationship too
     */
    async updateRelationship(id, updateDto, context) {
        var _a;
        const relationship = await this.relationshipRepository.findOne({
            where: { id, organizationId: context.organizationId },
            relations: ['contact', 'relatedContact'],
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Relationship not found');
        }
        // Start a transaction for potential bidirectional relationship update
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Update the primary relationship
            if (updateDto.type !== undefined) {
                relationship.type = updateDto.type;
            }
            if (updateDto.inverseType !== undefined) {
                relationship.inverseType = updateDto.inverseType;
            }
            else if (updateDto.type !== undefined) {
                // Update inverse type based on new type if type changed
                relationship.inverseType = (_a = getInverseRelationshipType(updateDto.type)) !== null && _a !== void 0 ? _a : contact_relationship_entity_1.RelationshipType.OTHER;
            }
            if (updateDto.notes !== undefined) {
                relationship.notes = updateDto.notes;
            }
            if (updateDto.isPrimary !== undefined) {
                relationship.isPrimary = updateDto.isPrimary;
            }
            if (updateDto.isActive !== undefined) {
                relationship.isActive = updateDto.isActive;
            }
            if (updateDto.startDate !== undefined) {
                relationship.startDate = updateDto.startDate;
            }
            if (updateDto.endDate !== undefined) {
                relationship.endDate = updateDto.endDate;
            }
            if (updateDto.metadata !== undefined) {
                relationship.metadata = updateDto.metadata;
            }
            relationship.updatedById = context.userId;
            const savedRelationship = await queryRunner.manager.save(relationship);
            // Find and update the inverse relationship if it exists
            const inverseRelationship = await this.relationshipRepository.findOne({
                where: {
                    contactId: relationship.relatedContactId,
                    relatedContactId: relationship.contactId,
                    organizationId: context.organizationId,
                },
            });
            if (inverseRelationship) {
                // Update the inverse relationship with corresponding values
                if (relationship.inverseType !== undefined) {
                    inverseRelationship.type = relationship.inverseType;
                }
                if (relationship.type !== undefined) {
                    inverseRelationship.inverseType = relationship.type;
                }
                if (updateDto.notes !== undefined) {
                    inverseRelationship.notes = updateDto.notes;
                }
                if (updateDto.isPrimary !== undefined) {
                    inverseRelationship.isPrimary = updateDto.isPrimary;
                }
                if (updateDto.isActive !== undefined) {
                    inverseRelationship.isActive = updateDto.isActive;
                }
                if (updateDto.startDate !== undefined) {
                    inverseRelationship.startDate = updateDto.startDate;
                }
                if (updateDto.endDate !== undefined) {
                    inverseRelationship.endDate = updateDto.endDate;
                }
                if (updateDto.metadata !== undefined) {
                    inverseRelationship.metadata = updateDto.metadata;
                }
                inverseRelationship.updatedById = context.userId;
                await queryRunner.manager.save(inverseRelationship);
            }
            await queryRunner.commitTransaction();
            return savedRelationship;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    /**
     * Deletes a relationship between contacts
     * If the relationship is bidirectional, deletes the inverse relationship too
     */
    async deleteRelationship(id, context) {
        const relationship = await this.relationshipRepository.findOne({
            where: { id, organizationId: context.organizationId },
        });
        if (!relationship) {
            throw new common_1.NotFoundException('Relationship not found');
        }
        // Start a transaction for potential bidirectional relationship deletion
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Find the inverse relationship if it exists
            const inverseRelationship = await this.relationshipRepository.findOne({
                where: {
                    contactId: relationship.relatedContactId,
                    relatedContactId: relationship.contactId,
                    organizationId: context.organizationId,
                },
            });
            // Delete the primary relationship
            await queryRunner.manager.softRemove(relationship);
            // Delete the inverse relationship if it exists
            if (inverseRelationship) {
                await queryRunner.manager.softRemove(inverseRelationship);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    /**
     * Gets all contacts related to a contact by a specific relationship type
     */
    async getContactsByRelationshipType(contactId, type, query) {
        const relationships = await this.relationshipRepository.find({
            where: {
                contactId,
                type,
                organizationId: query.organizationId,
                isActive: true,
            },
            relations: ['relatedContact'],
        });
        return relationships.map(rel => ({
            relationshipId: rel.id,
            relationshipType: rel.type,
            contact: {
                id: rel.relatedContact.id,
                firstName: rel.relatedContact.firstName,
                lastName: rel.relatedContact.lastName,
                email: rel.relatedContact.email,
                phone: rel.relatedContact.phone,
            },
            notes: rel.notes,
            isPrimary: rel.isPrimary,
            startDate: rel.startDate,
            endDate: rel.endDate,
        }));
    }
    // Legacy method - kept for backward compatibility
    async addRelationship(id, relationshipDto, context) {
        return this.createRelationship(id, relationshipDto, context);
    }
    // Fixed getMedicalHistory method
    async getMedicalHistory(id, query) {
        return this.medicalHistoryRepository.find({
            where: {
                contactId: id,
                organizationId: query.organizationId
            },
            order: { date: 'DESC' },
        });
    }
    async getDocuments(id, query) {
        return this.documentRepository.find({
            where: {
                contactId: id,
                organizationId: query.organizationId
            },
            order: { createdAt: 'DESC' },
        });
    }
    async addDocument(id, documentDto, context) {
        await this.findOne(id, context.organizationId);
        const document = this.documentRepository.create(Object.assign(Object.assign({}, documentDto), { contactId: id, organizationId: context.organizationId, createdById: context.userId }));
        return this.documentRepository.save(document);
    }
    async getStatistics(query) {
        const stats = await this.contactRepository
            .createQueryBuilder('contact')
            .where('contact.organizationId = :organizationId', { organizationId: query.organizationId })
            .select([
            'COUNT(*) as total',
            'COUNT(CASE WHEN contact.type = \'PATIENT\' THEN 1 END) as patients',
            'COUNT(CASE WHEN contact.status = \'ACTIVE\' THEN 1 END) as active',
            'COUNT(CASE WHEN contact.createdAt >= NOW() - INTERVAL \'30 days\' THEN 1 END) as newLast30Days',
        ])
            .getRawOne();
        return stats;
    }
    async importContacts(importDto, context) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const contacts = importDto.contacts.map((contactData) => (Object.assign(Object.assign({}, contactData), { organizationId: context.organizationId, createdById: context.userId })));
            const savedContacts = await queryRunner.manager.save(contact_entity_1.Contact, contacts);
            await queryRunner.commitTransaction();
            return {
                imported: savedContacts.length,
                contacts: savedContacts,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async exportContacts(exportDto, context) {
        const queryBuilder = this.contactRepository.createQueryBuilder('contact')
            .where('contact.organizationId = :organizationId', { organizationId: context.organizationId });
        if (exportDto.filters) {
            // Apply filters similar to findAll method
        }
        const contacts = await queryBuilder.getMany();
        // Transform contacts for export
        const exportData = contacts.map(contact => ({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            type: contact.type,
            // Add other fields as needed
        }));
        return {
            exported: exportData.length,
            data: exportData,
        };
    }
    async addDocuments(contactId, documents) {
        const contact = await this.contactRepository.findOne({ where: { id: contactId } });
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID ${contactId} not found`);
        }
        contact.documents = Promise.resolve(documents);
        return this.contactRepository.save(contact);
    }
    async mergeContacts(organizationId, primaryContactId, secondaryContactId, metadata) {
        // Find both contacts first
        const [primaryContact, secondaryContact] = await Promise.all([
            this.contactRepository.findOneOrFail({
                where: { id: primaryContactId, organizationId }
            }).catch(() => {
                throw new common_1.NotFoundException('Primary contact not found');
            }),
            this.contactRepository.findOneOrFail({
                where: { id: secondaryContactId, organizationId }
            }).catch(() => {
                throw new common_1.NotFoundException('Secondary contact not found');
            })
        ]);
        // Create new merged record
        const mergedRecord = this.mergedRecordRepository.create({
            organizationId,
            primaryContactId,
            secondaryContactId,
            metadata
        });
        await this.mergedRecordRepository.save(mergedRecord);
        // Get all merged records for this contact
        const mergedRecords = await this.mergedRecordRepository.find({
            where: { primaryContactId }
        });
        // Update the contact with the new merged records
        primaryContact.mergedRecords = Promise.resolve(mergedRecords);
        await this.contactRepository.save(primaryContact);
        return primaryContact;
    }
};
ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __param(1, (0, typeorm_1.InjectRepository)(merged_record_entity_1.MergedRecord)),
    __param(2, (0, typeorm_1.InjectRepository)(contact_relationship_entity_1.ContactRelationship)),
    __param(3, (0, typeorm_1.InjectRepository)(medical_history_entity_1.MedicalHistory)),
    __param(4, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(5, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ContactsService);
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map