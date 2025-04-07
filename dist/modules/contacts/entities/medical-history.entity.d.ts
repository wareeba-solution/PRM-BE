import { Contact } from './contact.entity';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
export declare class MedicalHistory {
    id: string;
    organizationId: string;
    contactId: string;
    title: string;
    description?: string;
    date?: Date;
    diagnosis?: {
        code?: string;
        description?: string;
        severity?: string;
        status?: string;
    };
    symptoms?: string[];
    medications?: string[];
    procedures?: string[];
    attachments?: {
        type: string;
        url: string;
        name: string;
    }[];
    metadata?: Record<string, any>;
    createdById: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: Promise<Organization>;
    contact: Promise<Contact>;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
}
