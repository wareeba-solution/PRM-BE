import { Repository, DataSource } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactQueryDto } from '../dto/contact-query.dto';
import { ContactRelationship, RelationshipType } from '../entities/contact-relationship.entity';
import { MedicalHistory } from '../../medical-history/medical-history.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Document } from '../../documents/entities/document.entity';
import { MergedRecord } from '../../merged-records/entities/merged-record.entity';
export interface CreateContactRelationshipDto {
    relatedContactId: string;
    type: RelationshipType;
    inverseType?: RelationshipType;
    notes?: string;
    isPrimary?: boolean;
    startDate?: Date;
    endDate?: Date;
    metadata?: Record<string, any>;
}
export interface UpdateContactRelationshipDto {
    type?: RelationshipType;
    inverseType?: RelationshipType;
    notes?: string;
    isPrimary?: boolean;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
    metadata?: Record<string, any>;
}
export declare class ContactsService {
    private readonly contactRepository;
    private readonly mergedRecordRepository;
    private readonly relationshipRepository;
    private readonly medicalHistoryRepository;
    private readonly appointmentRepository;
    private readonly documentRepository;
    private readonly dataSource;
    constructor(contactRepository: Repository<Contact>, mergedRecordRepository: Repository<MergedRecord>, relationshipRepository: Repository<ContactRelationship>, medicalHistoryRepository: Repository<MedicalHistory>, appointmentRepository: Repository<Appointment>, documentRepository: Repository<Document>, dataSource: DataSource);
    create(data: CreateContactDto & {
        organizationId: string;
        tenantId: string;
        createdBy: string;
    }): Promise<Contact>;
    findAll(query: ContactQueryDto & {
        organizationId: string;
    }): Promise<Pagination<Contact>>;
    search(searchTerm: string, query: ContactQueryDto & {
        organizationId: string;
    }): Promise<Pagination<Contact, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: string, organizationId: string): Promise<Contact>;
    update(id: string, data: UpdateContactDto & {
        organizationId: string;
        updatedBy: string;
        phone?: string;
    }): Promise<Contact>;
    remove(id: string, organizationId: string): Promise<void>;
    merge(primaryId: string, secondaryId: string, context: {
        organizationId: string;
        userId: string;
    }): Promise<Contact>;
    /**
     * Gets all relationships for a contact
     */
    getRelationships(id: string, organizationId: string, includeInactive?: boolean): Promise<ContactRelationship[]>;
    /**
     * Creates a new relationship between two contacts
     * If the relationship is bidirectional, creates the inverse relationship too
     */
    createRelationship(contactId: string, relationshipDto: CreateContactRelationshipDto, context: {
        organizationId: string;
        userId: string;
    }): Promise<ContactRelationship>;
    /**
     * Updates an existing relationship between contacts
     * If the relationship is bidirectional, updates the inverse relationship too
     */
    updateRelationship(id: string, updateDto: UpdateContactRelationshipDto, context: {
        organizationId: string;
        userId: string;
    }): Promise<ContactRelationship>;
    /**
     * Deletes a relationship between contacts
     * If the relationship is bidirectional, deletes the inverse relationship too
     */
    deleteRelationship(id: string, context: {
        organizationId: string;
        userId: string;
    }): Promise<void>;
    /**
     * Gets all contacts related to a contact by a specific relationship type
     */
    getContactsByRelationshipType(contactId: string, type: RelationshipType, query: {
        organizationId: string;
    }): Promise<any[]>;
    addRelationship(id: string, relationshipDto: any, context: {
        organizationId: string;
        userId: string;
    }): Promise<ContactRelationship>;
    getMedicalHistory(id: string, query: {
        organizationId: string;
    }): Promise<MedicalHistory[]>;
    getDocuments(id: string, query: {
        organizationId: string;
    }): Promise<Document[]>;
    addDocument(id: string, documentDto: any, context: {
        organizationId: string;
        userId: string;
    }): Promise<Document[]>;
    getStatistics(query: {
        organizationId: string;
    }): Promise<any>;
    importContacts(importDto: any, context: {
        organizationId: string;
        userId: string;
    }): Promise<{
        imported: any;
        contacts: any;
    }>;
    exportContacts(exportDto: any, context: {
        organizationId: string;
        userId: string;
    }): Promise<{
        exported: number;
        data: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            type: import("../entities/contact.entity").ContactType;
        }[];
    }>;
    addDocuments(contactId: string, documents: Document[]): Promise<Contact>;
    mergeContacts(organizationId: string, primaryContactId: string, secondaryContactId: string, metadata?: Record<string, any>): Promise<Contact>;
}
