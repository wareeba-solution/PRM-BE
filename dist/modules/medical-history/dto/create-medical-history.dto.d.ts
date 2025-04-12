import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';
declare class VitalSignsDto {
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    height?: number;
    weight?: number;
    bmi?: number;
}
declare class ReferralDto {
    to: string;
    reason: string;
    date: Date;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}
declare class AttachmentDto {
    name: string;
    type: string;
    url: string;
}
declare class LabResultDto {
    test: string;
    result: string;
    normalRange: string;
    date: Date;
    isAbnormal: boolean;
}
export declare class CreateMedicalHistoryDto {
    contactId: string;
    encounterType: EncounterType;
    date: Date;
    description: string;
    diagnosis?: string;
    treatment?: string;
    medications?: string;
    symptoms?: string;
    vitalSigns?: VitalSignsDto;
    notes?: string;
    referrals?: ReferralDto[];
    attachments?: AttachmentDto[];
    labResults?: LabResultDto[];
    providerName?: string;
    providerType?: HealthcareProviderType;
    facilityName?: string;
    facilityLocation?: string;
    isInsuranceClaim?: boolean;
    insuranceClaimNumber?: string;
    costAmount?: number;
    costCurrency?: string;
}
export {};
