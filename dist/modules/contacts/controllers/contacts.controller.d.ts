import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactQueryDto } from '../dto/contact-query.dto';
import { MergeContactsDto } from '../dto/merge-contacts.dto';
import { Contact } from '../entities/contact.entity';
import { CustomRequest } from '@/interfaces/request.interface';
export declare class ContactsController {
    private readonly contactsService;
    private readonly logger;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto, req: CustomRequest, headerOrgId?: string, tenantId?: string): Promise<Contact>;
    findAll(query: ContactQueryDto, req: CustomRequest, headerOrgId?: string): Promise<import("nestjs-typeorm-paginate").Pagination<Contact, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    search(searchTerm: string, query: ContactQueryDto, req: CustomRequest, headerOrgId?: string): Promise<import("nestjs-typeorm-paginate").Pagination<Contact, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: string, req: CustomRequest, headerOrgId?: string): Promise<Contact>;
    update(id: string, updateContactDto: UpdateContactDto, req: CustomRequest, headerOrgId?: string): Promise<Contact>;
    remove(id: string, req: CustomRequest, headerOrgId?: string): Promise<void>;
    merge(primaryId: string, mergeContactsDto: MergeContactsDto, req: CustomRequest, headerOrgId?: string): Promise<Contact>;
    getRelationships(id: string, req: CustomRequest, headerOrgId?: string): Promise<import("../entities/contact-relationship.entity").ContactRelationship[]>;
    addRelationship(id: string, relationshipDto: any, req: CustomRequest, headerOrgId?: string): Promise<import("../entities/contact-relationship.entity").ContactRelationship>;
    getMedicalHistory(id: string, query: any, req: CustomRequest, headerOrgId?: string): Promise<import("../../medical-history/medical-history.entity").MedicalHistory[]>;
    getDocuments(id: string, query: any, req: CustomRequest, headerOrgId?: string): Promise<import("../../documents/entities/document.entity").Document[]>;
    addDocument(id: string, documentDto: any, req: CustomRequest, headerOrgId?: string): Promise<import("../../documents/entities/document.entity").Document[]>;
    getStatistics(query: any, req: CustomRequest, headerOrgId?: string): Promise<any>;
    importContacts(importDto: any, req: CustomRequest, headerOrgId?: string): Promise<{
        imported: any;
        contacts: any;
    }>;
    exportContacts(exportDto: any, req: CustomRequest, headerOrgId?: string): Promise<{
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
}
