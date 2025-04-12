import { Repository } from 'typeorm';
import { MedicalHistory } from '../entities/medical-history.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';
export declare class MedicalHistoryService {
    private readonly medicalHistoryRepository;
    private readonly contactRepository;
    constructor(medicalHistoryRepository: Repository<MedicalHistory>, contactRepository: Repository<Contact>);
    createMedicalHistory(organizationId: string, createdById: string, data: {
        contactId: string;
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
        isInsuranceClaim?: boolean;
        insuranceClaimNumber?: string;
        costAmount?: number;
        costCurrency?: string;
    }): Promise<MedicalHistory>;
    getContactMedicalHistory(organizationId: string, contactId: string): Promise<MedicalHistory[]>;
    getMedicalHistory(organizationId: string, id: string): Promise<MedicalHistory>;
    updateMedicalHistory(organizationId: string, id: string, updates: Partial<MedicalHistory>): Promise<MedicalHistory>;
    deleteMedicalHistory(organizationId: string, id: string): Promise<{
        success: boolean;
    }>;
    flagMedicalHistory(organizationId: string, id: string, data: {
        reason: string;
        requiresFollowUp?: boolean;
        followUpDate?: Date;
    }): Promise<MedicalHistory>;
    addReferral(organizationId: string, id: string, data: {
        to: string;
        reason: string;
        date: Date;
        status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    }): Promise<MedicalHistory>;
    addLabResult(organizationId: string, id: string, data: {
        test: string;
        result: string;
        normalRange: string;
        date: Date;
        isAbnormal: boolean;
    }): Promise<MedicalHistory>;
}
