// src/modules/contacts/dto/create-contact.dto.ts

import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsDate,
    IsEnum,
    IsOptional,
    IsBoolean,
    MinLength,
    MaxLength,
    ValidateNested,
    IsArray,
    IsUrl,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export class ContactAddressDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    street: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdBy?: DeepPartial<User>;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    street2?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    state: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    postalCode: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    country: string;
}

export class EmergencyContactDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    relationship: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

export class MedicalInfoDto {
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

export class InsuranceInfoDto {
    @IsString()
    @IsNotEmpty()
    provider: string;

    @IsString()
    @IsNotEmpty()
    policyNumber: string;

    @IsOptional()
    @IsString()
    groupNumber?: string;

    @IsDate()
    @Type(() => Date)
    validFrom: Date;

    @IsDate()
    @Type(() => Date)
    validTo: Date;
}

export class CommunicationPrefsDto {
    @IsBoolean()
    allowEmail: boolean = true;

    @IsBoolean()
    allowSMS: boolean = true;

    @IsBoolean()
    allowWhatsApp: boolean = true;

    @IsBoolean()
    allowPush: boolean = true;

    @IsOptional()
    @IsString()
    preferredLanguage?: string;

    @IsOptional()
    @IsString()
    preferredContactTime?: string;
}

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    firstName: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    lastName: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;


    @IsOptional()
    @IsPhoneNumber()
    whatsapp?: string;


    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;


    @IsEnum(Gender)
    gender: Gender;


    @IsOptional()
    @IsEnum(MaritalStatus)
    maritalStatus?: MaritalStatus;


    @ValidateNested()
    @Type(() => ContactAddressDto)
    address: ContactAddressDto;


    @ValidateNested()
    @Type(() => EmergencyContactDto)
    emergencyContact: EmergencyContactDto;


    @IsOptional()
    @ValidateNested()
    @Type(() => MedicalInfoDto)
    medicalInfo?: MedicalInfoDto;


    @IsOptional()
    @ValidateNested()
    @Type(() => InsuranceInfoDto)
    insuranceInfo?: InsuranceInfoDto;


    @ValidateNested()
    @Type(() => CommunicationPrefsDto)
    communicationPrefs: CommunicationPrefsDto;


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
    @IsArray()
    @IsString({ each: true })
    groups?: string[];
}

export class CreateContactResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    createdBy: string;
}