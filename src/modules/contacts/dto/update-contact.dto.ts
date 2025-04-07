// src/modules/contacts/dto/update-contact.dto.ts

import {
    IsOptional,
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsDate,
    IsEnum,
    IsBoolean,
    MinLength,
    MaxLength,
    ValidateNested,
    IsArray,
    IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';

export class UpdateContactAddressDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    street: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    street2?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    state: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    postalCode: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    country: string;
}

export class UpdateEmergencyContactDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    relationship: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

export class UpdateMedicalInfoDto {
    @IsOptional()
    @IsEnum(BloodGroup)
    bloodGroup?: BloodGroup;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    allergies?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    medications?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    conditions?: string[];

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    surgicalHistory?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    familyHistory?: string;
}

export class UpdateInsuranceInfoDto {
    @IsOptional()
    @IsString()
    provider: string;

    @IsOptional()
    @IsString()
    policyNumber: string;

    @IsOptional()
    @IsString()
    groupNumber?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    validFrom?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    validTo?: Date;
}

export class UpdateCommunicationPrefsDto {
    @IsOptional()
    @IsBoolean()
    allowEmail?: boolean;

    @IsOptional()
    @IsBoolean()
    allowSMS?: boolean;

    @IsOptional()
    @IsBoolean()
    allowWhatsApp?: boolean;

    @IsOptional()
    @IsBoolean()
    allowPush?: boolean;

    @IsOptional()
    @IsString()
    preferredLanguage?: string;

    @IsOptional()
    @IsString()
    preferredContactTime?: string;
}

export class UpdateContactDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsPhoneNumber()
    whatsapp?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsEnum(MaritalStatus)
    maritalStatus?: MaritalStatus;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateContactAddressDto)
    address?: UpdateContactAddressDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateEmergencyContactDto)
    emergencyContact?: UpdateEmergencyContactDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateMedicalInfoDto)
    medicalInfo?: UpdateMedicalInfoDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateInsuranceInfoDto)
    insuranceInfo?: UpdateInsuranceInfoDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateCommunicationPrefsDto)
    communicationPrefs?: UpdateCommunicationPrefsDto;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    notes?: string;

    @IsOptional()
    @IsUrl({}, { each: true })
    @IsArray()
    documents?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    groups?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateContactResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    updatedAt: Date;
    updatedBy: string;
}