// src/modules/contacts/dto/merge-contacts.dto.ts

import {
    IsNotEmpty,
    IsString,
    IsUUID,
    IsArray,
    IsOptional,
    IsEmail,
    IsPhoneNumber,
    IsDate,
    IsEnum,
    IsBoolean,
    MinLength,
    MaxLength,
    ValidateNested,
    IsUrl,
    ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { UpdateContactAddressDto, UpdateEmergencyContactDto, UpdateMedicalInfoDto, UpdateInsuranceInfoDto, UpdateCommunicationPrefsDto } from './update-contact.dto';

export class MergeContactsDto {
    @IsNotEmpty()
    @IsUUID()
    primaryContactId: string;
    secondaryContactId: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMinSize(1)
    secondaryContactIds: string[];

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
    keepHistory?: boolean;

    @IsOptional()
    @IsBoolean()
    deleteSecondaryContacts?: boolean;
}

export class MergeContactsResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mergedContactIds: string[];
    mergedAt: Date;
    mergedBy: string;
}