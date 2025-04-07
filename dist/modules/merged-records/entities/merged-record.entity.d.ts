import { Contact } from '../../contacts/entities/contact.entity';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
export declare class MergedRecord {
    id: string;
    organizationId: string;
    primaryContactId: string;
    secondaryContactId: string;
    metadata?: Record<string, any>;
    createdById: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: Promise<Organization>;
    primaryContact: Promise<Contact>;
    secondaryContact: Promise<Contact>;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
}
