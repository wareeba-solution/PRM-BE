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
import { Injectable, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource, Not } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Contact } from '../entities/contact.entity';
import { ContactRelationship, RelationshipType } from '../entities/contact-relationship.entity';
import { MedicalHistory } from '../../medical-history/medical-history.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Document } from '../../documents/entities/document.entity';
function getInverseRelationshipType(type) {
    const inverseMap = {
        [RelationshipType.SPOUSE]: RelationshipType.SPOUSE,
        [RelationshipType.PARENT]: RelationshipType.CHILD,
        [RelationshipType.CHILD]: RelationshipType.PARENT,
        [RelationshipType.SIBLING]: RelationshipType.SIBLING,
        [RelationshipType.GUARDIAN]: RelationshipType.DEPENDENT,
        [RelationshipType.DEPENDENT]: RelationshipType.GUARDIAN,
        [RelationshipType.EMERGENCY_CONTACT]: RelationshipType.OTHER,
        [RelationshipType.PRIMARY_CARE_PROVIDER]: RelationshipType.OTHER,
        [RelationshipType.SPECIALIST]: RelationshipType.OTHER,
        [RelationshipType.CAREGIVER]: RelationshipType.OTHER,
        [RelationshipType.RELATIVE]: RelationshipType.RELATIVE,
        [RelationshipType.COLLEAGUE]: RelationshipType.COLLEAGUE,
        [RelationshipType.FRIEND]: RelationshipType.FRIEND,
        [RelationshipType.OTHER]: RelationshipType.OTHER,
    };
    return inverseMap[type];
}
let ContactsService = class ContactsService {
    constructor(contactRepository, relationshipRepository, medicalHistoryRepository, appointmentRepository, documentRepository, dataSource) {
        this.contactRepository = contactRepository;
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
            throw new ConflictException('Contact with this email or phone number already exists');
        }
        const { documents: documentIds } = data, contactData = __rest(data, ["documents"]);
        const contact = new Contact();
        Object.assign(contact, contactData);
        contact.createdById = data.createdBy;
        if (documentIds && Array.isArray(documentIds)) {
            const documents = await this.documentRepository.find({
                where: { id: In(documentIds) }
            });
            if (documents.length > 0) {
                contact.documents = documents;
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
        return paginate(queryBuilder, { page, limit });
    }
    async search(searchTerm, query) {
        const { organizationId, page = 1, limit = 10 } = query;
        const queryBuilder = this.contactRepository.createQueryBuilder('contact')
            .where('contact.organizationId = :organizationId', { organizationId })
            .andWhere('(LOWER(contact.firstName) LIKE LOWER(:search) OR LOWER(contact.lastName) LIKE LOWER(:search) OR LOWER(contact.email) LIKE LOWER(:search) OR contact.phone LIKE :search)', { search: `%${searchTerm}%` });
        return paginate(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const contact = await this.contactRepository.findOne({
            where: { id, organizationId },
            relations: ['documents', 'appointments', 'medicalHistory'],
        });
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }
    async update(id, data) {
        const contact = await this.findOne(id, data.organizationId);
        if (data.email || data.phone) {
            const whereCondition = [];
            if (data.email) {
                whereCondition.push({ email: data.email, organizationId: data.organizationId, id: Not(id) });
            }
            if (data.phone) {
                whereCondition.push({ phone: data.phone, organizationId: data.organizationId, id: Not(id) });
            }
            const existingContact = await this.contactRepository.findOne({
                where: whereCondition,
            });
            if (existingContact) {
                throw new ConflictException('Contact with this email or phone number already exists');
            }
        }
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
            if (!primary.middleName)
                primary.middleName = secondary.middleName;
            if ('alternativePhoneNumber' in primary && 'alternativePhoneNumber' in secondary) {
                if (!primary.alternativePhoneNumber)
                    primary.alternativePhoneNumber = secondary.alternativePhoneNumber;
            }
            if ('allergies' in primary && 'allergies' in secondary) {
                if (!primary.allergies)
                    primary.allergies = secondary.allergies;
                if (primary.allergies && secondary.allergies) {
                    primary.allergies = [...new Set([...primary.allergies, ...secondary.allergies])];
                }
            }
            if ('medications' in primary && 'medications' in secondary) {
                if (!primary.medications)
                    primary.medications = secondary.medications;
                if (primary.medications && secondary.medications) {
                    primary.medications = [...new Set([...primary.medications, ...secondary.medications])];
                }
            }
            if (primary.metadata && secondary.metadata) {
                primary.metadata = Object.assign(Object.assign({}, secondary.metadata), primary.metadata);
            }
            else if (secondary.metadata) {
                primary.metadata = secondary.metadata;
            }
            await queryRunner.manager
                .createQueryBuilder()
                .update(Appointment)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .update(Document)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId })
                .execute();
            await queryRunner.manager
                .createQueryBuilder()
                .update(MedicalHistory)
                .set({ contactId: primaryId })
                .where("contactId = :secondaryId", { secondaryId });
            primary.mergedRecords = [...(primary.mergedRecords || []), secondary];
            if ('mergedRecords' in primary) {
                primary.mergedRecords = [...(primary.mergedRecords || []), secondary];
            }
            secondary.status = 'INACTIVE';
            await queryRunner.manager.save(Contact, primary);
            await queryRunner.manager.save(Contact, secondary);
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
    async createRelationship(contactId, relationshipDto, context) {
        var _a, _b, _c, _d, _e, _f;
        const [contact, relatedContact] = await Promise.all([
            this.findOne(contactId, context.organizationId),
            this.findOne(relationshipDto.relatedContactId, context.organizationId),
        ]);
        const existingRelationship = await this.relationshipRepository.findOne({
            where: {
                contactId,
                relatedContactId: relationshipDto.relatedContactId,
                organizationId: context.organizationId,
            },
        });
        if (existingRelationship) {
            throw new BadRequestException('Relationship already exists between these contacts');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const inverseType = relationshipDto.inverseType || getInverseRelationshipType(relationshipDto.type);
            const relationship = new ContactRelationship();
            relationship.contactId = contactId;
            relationship.relatedContactId = relationshipDto.relatedContactId;
            relationship.type = relationshipDto.type;
            relationship.inverseType = inverseType !== null && inverseType !== void 0 ? inverseType : RelationshipType.OTHER;
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
            if (inverseType && inverseType !== RelationshipType.OTHER) {
                const inverseRelationship = new ContactRelationship();
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
    async updateRelationship(id, updateDto, context) {
        var _a;
        const relationship = await this.relationshipRepository.findOne({
            where: { id, organizationId: context.organizationId },
            relations: ['contact', 'relatedContact'],
        });
        if (!relationship) {
            throw new NotFoundException('Relationship not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateDto.type !== undefined) {
                relationship.type = updateDto.type;
            }
            if (updateDto.inverseType !== undefined) {
                relationship.inverseType = updateDto.inverseType;
            }
            else if (updateDto.type !== undefined) {
                relationship.inverseType = (_a = getInverseRelationshipType(updateDto.type)) !== null && _a !== void 0 ? _a : RelationshipType.OTHER;
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
            const inverseRelationship = await this.relationshipRepository.findOne({
                where: {
                    contactId: relationship.relatedContactId,
                    relatedContactId: relationship.contactId,
                    organizationId: context.organizationId,
                },
            });
            if (inverseRelationship) {
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
    async deleteRelationship(id, context) {
        const relationship = await this.relationshipRepository.findOne({
            where: { id, organizationId: context.organizationId },
        });
        if (!relationship) {
            throw new NotFoundException('Relationship not found');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const inverseRelationship = await this.relationshipRepository.findOne({
                where: {
                    contactId: relationship.relatedContactId,
                    relatedContactId: relationship.contactId,
                    organizationId: context.organizationId,
                },
            });
            await queryRunner.manager.softRemove(relationship);
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
    async addRelationship(id, relationshipDto, context) {
        return this.createRelationship(id, relationshipDto, context);
    }
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
            const savedContacts = await queryRunner.manager.save(Contact, contacts);
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
        }
        const contacts = await queryBuilder.getMany();
        const exportData = contacts.map(contact => ({
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            type: contact.type,
        }));
        return {
            exported: exportData.length,
            data: exportData,
        };
    }
};
ContactsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Contact)),
    __param(1, InjectRepository(ContactRelationship)),
    __param(2, InjectRepository(MedicalHistory)),
    __param(3, InjectRepository(Appointment)),
    __param(4, InjectRepository(Document)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        Repository,
        DataSource])
], ContactsService);
export { ContactsService };
//# sourceMappingURL=contacts.service.js.map