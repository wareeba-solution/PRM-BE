// src/modules/contacts/dto/contact-query.dto.ts

import {
    IsOptional,
    IsString,
    IsEnum,
    IsBoolean,
    IsDateString,
    IsArray,
    IsInt,
    Min,
    Max,
    IsIn,
    ValidateNested,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';

export enum ContactType {
    PATIENT = 'PATIENT',
    PROVIDER = 'PROVIDER',
    STAFF = 'STAFF',
    VENDOR = 'VENDOR',
    OTHER = 'OTHER',
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    PHONE = 'phone',
    DATE_OF_BIRTH = 'dateOfBirth',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}

export class DateRangeDto {
    @IsOptional()
    @IsDateString()
    from?: string;

    @IsOptional()
    @IsDateString()
    to?: string;
}

export class ContactQueryDto {
    @IsOptional()
    @IsString()
    search?: string;


    @IsOptional()
    @IsEnum(ContactType)
    type?: ContactType;


    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;


    @IsOptional()
    @IsEnum(MaritalStatus)
    maritalStatus?: MaritalStatus;


    @IsOptional()
    @IsEnum(BloodGroup)
    bloodGroup?: BloodGroup;


    @IsOptional()
    @IsBoolean()
    isActive?: boolean;


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    groups?: string[];


    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    createdAt?: DateRangeDto;


    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    updatedAt?: DateRangeDto;


    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDto)
    dateOfBirth?: DateRangeDto;


    @IsOptional()
    @IsString()
    city?: string;


    @IsOptional()
    @IsString()
    state?: string;


    @IsOptional()
    @IsString()
    country?: string;


    @IsOptional()
    @IsString()
    postalCode?: string;


    @IsOptional()
    @IsEmail()
    email?: string;


    @IsOptional()
    @IsPhoneNumber()
    phone?: string;


    @IsOptional()
    @IsString()
    insuranceProvider?: string;


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    medicalConditions?: string[];


    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    allergies?: string[];


    @IsOptional()
    @IsString()
    createdBy?: string;


    @IsOptional()
    @IsString()
    updatedBy?: string;


    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;


    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;


    @IsOptional()
    @IsIn(Object.values(SortField))
    sortBy?: SortField;


    @IsOptional()
    @IsIn(Object.values(SortOrder))
    sortOrder?: SortOrder;


    @IsOptional()
    @IsBoolean()
    includeInactive?: boolean;


    @IsOptional()
    @IsBoolean()
    hasUpcomingAppointments?: boolean;


    @IsOptional()
    @IsInt()
    @Min(1)
    recentActivityDays?: number;


    @IsOptional()
    @IsBoolean()
    allowsEmail?: boolean;


    @IsOptional()
    @IsBoolean()
    allowsSMS?: boolean;


    @IsOptional()
    @IsBoolean()
    hasDocuments?: boolean;


    @IsOptional()
    @IsBoolean()
    hasMedicalHistory?: boolean;


    @IsOptional()
    @IsString()
    preferredLanguage?: string;
}