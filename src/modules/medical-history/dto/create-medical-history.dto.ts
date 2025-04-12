import { IsEnum, IsString, IsDate, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested, IsObject, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { EncounterType, HealthcareProviderType } from '../entities/medical-history.entity';

class VitalSignsDto {
    @IsOptional()
    @IsString()
    bloodPressure?: string;

    @IsOptional()
    @IsNumber()
    temperature?: number;

    @IsOptional()
    @IsNumber()
    heartRate?: number;

    @IsOptional()
    @IsNumber()
    respiratoryRate?: number;

    @IsOptional()
    @IsNumber()
    oxygenSaturation?: number;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    bmi?: number;
}

class ReferralDto {
    @IsString()
    to: string;

    @IsString()
    reason: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsEnum(['PENDING', 'COMPLETED', 'CANCELLED'])
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

class AttachmentDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    url: string;
}

class LabResultDto {
    @IsString()
    test: string;

    @IsString()
    result: string;

    @IsString()
    normalRange: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsBoolean()
    isAbnormal: boolean;
}

export class CreateMedicalHistoryDto {
    @IsUUID()
    contactId: string;

    @IsEnum(EncounterType)
    encounterType: EncounterType;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    diagnosis?: string;

    @IsOptional()
    @IsString()
    treatment?: string;

    @IsOptional()
    @IsString()
    medications?: string;

    @IsOptional()
    @IsString()
    symptoms?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => VitalSignsDto)
    vitalSigns?: VitalSignsDto;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReferralDto)
    referrals?: ReferralDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    attachments?: AttachmentDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LabResultDto)
    labResults?: LabResultDto[];

    @IsOptional()
    @IsString()
    providerName?: string;

    @IsOptional()
    @IsEnum(HealthcareProviderType)
    providerType?: HealthcareProviderType;

    @IsOptional()
    @IsString()
    facilityName?: string;

    @IsOptional()
    @IsString()
    facilityLocation?: string;

    @IsOptional()
    @IsBoolean()
    isInsuranceClaim?: boolean;

    @IsOptional()
    @IsString()
    insuranceClaimNumber?: string;

    @IsOptional()
    @IsNumber()
    costAmount?: number;

    @IsOptional()
    @IsString()
    costCurrency?: string;
} 