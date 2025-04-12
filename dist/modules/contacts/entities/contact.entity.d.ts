import { ContactRelationship } from './contact-relationship.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Document } from '../../documents/entities/document.entity';
import { MedicalHistory } from '../../medical-history/medical-history.entity';
import { MergedRecord } from '../../merged-records/entities/merged-record.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
export declare enum ContactType {
    PATIENT = "PATIENT",
    FAMILY_MEMBER = "FAMILY_MEMBER",
    EMERGENCY_CONTACT = "EMERGENCY_CONTACT",
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
export declare enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED",
    SEPARATED = "SEPARATED",
    OTHER = "OTHER"
}
export declare class Contact {
    id: string;
    tenantId: string;
    status: string;
    metadata?: Record<string, any>;
    phone: string;
    organizationId: string;
    type: ContactType;
    familyId: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
    email?: string;
    phoneNumber?: string;
    alternativePhoneNumber?: string;
    gender?: Gender;
    dateOfBirth?: Date;
    maritalStatus?: MaritalStatus;
    bloodType: BloodType;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isPrimary: boolean;
        type?: 'HOME' | 'WORK' | 'OTHER';
    }[];
    emergencyContacts?: {
        name: string;
        relationship: string;
        phoneNumber: string;
        address?: string;
        isPrimary: boolean;
    }[];
    allergies?: string[];
    medications?: string[];
    insurance?: {
        provider: string;
        policyNumber: string;
        groupNumber?: string;
        type: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
        coverageStartDate?: Date;
        coverageEndDate?: Date;
        isActive: boolean;
    }[];
    occupation?: string;
    employment?: {
        employer?: string;
        position?: string;
        workPhone?: string;
        workEmail?: string;
        startDate?: Date;
        endDate?: Date;
    };
    familyHistory?: {
        condition: string;
        relationship: string;
        notes?: string;
    }[];
    socialHistory?: {
        smoking?: {
            status: 'CURRENT' | 'FORMER' | 'NEVER';
            years?: number;
            packsPerDay?: number;
            quitDate?: Date;
        };
        alcohol?: {
            status: 'CURRENT' | 'FORMER' | 'NEVER';
            frequency?: string;
            amount?: string;
            quitDate?: Date;
        };
        exercise?: {
            frequency?: string;
            type?: string;
            duration?: string;
        };
        diet?: {
            type?: string;
            restrictions?: string[];
        };
    };
    medicalConditions?: {
        condition: string;
        diagnosisDate?: Date;
        status: 'ACTIVE' | 'RESOLVED' | 'CHRONIC';
        severity?: 'MILD' | 'MODERATE' | 'SEVERE';
        notes?: string;
    }[];
    immunizations?: {
        vaccine: string;
        date: Date;
        administeredBy?: string;
        lotNumber?: string;
        nextDueDate?: Date;
    }[];
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
    tenant: Promise<Tenant>;
    organization: Promise<Organization>;
    createdBy: Promise<User>;
    updatedBy: Promise<User>;
    appointments: Promise<Appointment[]>;
    documents: Promise<Document[]>;
    medicalHistory: Promise<MedicalHistory[]>;
    relationships: Promise<ContactRelationship[]>;
    relatedRelationships: Promise<ContactRelationship[]>;
    mergedRecords: Promise<MergedRecord[]>;
    get fullName(): string;
    get age(): number | null;
    get isPatient(): boolean;
    get isFamilyMember(): boolean;
    get isEmergencyContact(): boolean;
    get primaryAddress(): any;
    get primaryEmergencyContact(): any;
    get primaryInsurance(): any;
}
