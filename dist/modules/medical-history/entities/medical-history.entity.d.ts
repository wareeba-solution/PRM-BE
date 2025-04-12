import { Contact } from '../../contacts/entities/contact.entity';
export declare enum EncounterType {
    CONSULTATION = "CONSULTATION",
    EMERGENCY = "EMERGENCY",
    FOLLOW_UP = "FOLLOW_UP",
    LAB_TEST = "LAB_TEST",
    PROCEDURE = "PROCEDURE",
    VACCINATION = "VACCINATION",
    OTHER = "OTHER"
}
export declare enum HealthcareProviderType {
    DOCTOR = "DOCTOR",
    NURSE = "NURSE",
    SPECIALIST = "SPECIALIST",
    PHYSICIAN_ASSISTANT = "PHYSICIAN_ASSISTANT",
    NURSE_PRACTITIONER = "NURSE_PRACTITIONER",
    OTHER = "OTHER"
}
export declare class MedicalHistory {
    id: string;
    organizationId: string;
    contactId: string;
    contact: Contact;
    encounterType: EncounterType;
    date: Date;
    description: string;
    diagnosis?: string;
    treatment?: string;
    medications?: string;
    symptoms?: string;
    vitalSigns?: {
        bloodPressure?: string;
        temperature?: number;
        heartRate?: number;
        respiratoryRate?: number;
        oxygenSaturation?: number;
        height?: number;
        weight?: number;
        bmi?: number;
    };
    notes?: string;
    referrals?: {
        to: string;
        reason: string;
        date: Date;
        status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    }[];
    attachments?: {
        name: string;
        type: string;
        url: string;
    }[];
    labResults?: {
        test: string;
        result: string;
        normalRange: string;
        date: Date;
        isAbnormal: boolean;
    }[];
    providerName?: string;
    providerType?: HealthcareProviderType;
    facilityName?: string;
    facilityLocation?: string;
    isInsuranceClaim: boolean;
    insuranceClaimNumber?: string;
    costAmount?: number;
    costCurrency?: string;
    isFlagged: boolean;
    flagReason?: string;
    requiresFollowUp: boolean;
    followUpDate?: Date;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
