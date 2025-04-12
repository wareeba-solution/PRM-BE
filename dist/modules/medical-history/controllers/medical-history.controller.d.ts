import { MedicalHistoryService } from '../services/medical-history.service';
import { MedicalHistory } from '../entities/medical-history.entity';
import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';
import { User } from '../../users/entities/user.entity';
interface CreateMedicalHistoryDTO {
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
}
export declare class MedicalHistoryController {
    private readonly medicalHistoryService;
    constructor(medicalHistoryService: MedicalHistoryService);
    createMedicalHistory(user: User, data: CreateMedicalHistoryDTO): Promise<MedicalHistory>;
    getContactMedicalHistory(user: User, contactId: string): Promise<MedicalHistory[]>;
    getMedicalHistory(user: User, id: string): Promise<MedicalHistory>;
    updateMedicalHistory(user: User, id: string, updates: Partial<CreateMedicalHistoryDTO>): Promise<MedicalHistory>;
    deleteMedicalHistory(user: User, id: string): Promise<{
        success: boolean;
    }>;
    flagMedicalHistory(user: User, id: string, data: {
        reason: string;
        requiresFollowUp?: boolean;
        followUpDate?: Date;
    }): Promise<MedicalHistory>;
    addReferral(user: User, id: string, data: {
        to: string;
        reason: string;
        date: Date;
        status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    }): Promise<MedicalHistory>;
    addLabResult(user: User, id: string, data: {
        test: string;
        result: string;
        normalRange: string;
        date: Date;
        isAbnormal: boolean;
    }): Promise<MedicalHistory>;
}
export {};
