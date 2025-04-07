import { ContactRelationship } from './contact-relationship.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Document } from '../../documents/entities/document.entity';
import { MedicalHistory } from '../../medical-history/medical-history.entity';
import { MergedRecord } from '../../merged-records/entities/merged-record.entity';
export declare enum ContactType {
    PATIENT = "PATIENT",
    EMERGENCY_CONTACT = "EMERGENCY_CONTACT",
    FAMILY_MEMBER = "FAMILY_MEMBER",
    OTHER = "OTHER"
}
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
}
export declare enum BloodType {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    UNKNOWN = "UNKNOWN"
}
export declare class Contact {
    id: string;
    status: string;
    metadata?: Record<string, any>;
    phone: string;
    organizationId: string;
    type: ContactType;
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
    email?: string;
    phoneNumber?: string;
    alternativePhoneNumber?: string;
    gender?: Gender;
    dateOfBirth?: Date;
    bloodType: BloodType;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    emergencyContact?: {
        name: string;
        relationship: string;
        phoneNumber: string;
        address?: string;
    };
    allergies?: string[];
    medications?: string[];
    occupation?: string;
    notes?: string;
    customFields?: Record<string, any>;
    isActive: boolean;
    lastVisitDate?: Date;
    nextAppointmentDate?: Date;
    createdById: string;
    updatedById?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: Promise<Organization>;
    createdBy: Promise<User>;
    updatedBy: Promise<User>;
    appointments: Promise<Appointment[]>;
    documents: Promise<Document[]>;
    medicalHistory: Promise<MedicalHistory[]>;
    relationships: Promise<ContactRelationship[]>;
    mergedRecords: Promise<MergedRecord[]>;
    get fullName(): string;
    get age(): number | null;
}
