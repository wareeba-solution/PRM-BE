// src/modules/organizations/dto/create-organization.dto.ts

import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    IsBoolean,
    IsObject,
    ValidateNested,
    IsArray,
    IsPhoneNumber,
    MaxLength,
    MinLength,
    Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrganizationType {
    HOSPITAL = 'HOSPITAL',
    CLINIC = 'CLINIC',
    PRACTICE = 'PRACTICE',
    LABORATORY = 'LABORATORY',
    PHARMACY = 'PHARMACY',
    OTHER = 'OTHER',
}

export enum SubscriptionPlan {
    FREE = 'FREE',
    STARTER = 'STARTER',
    PROFESSIONAL = 'PROFESSIONAL',
    ENTERPRISE = 'ENTERPRISE',
}

export class Address {
    @IsString()
    @MaxLength(100)
    street: string;

    @IsString()
    @MaxLength(100)
    city: string;

    @IsString()
    @MaxLength(100)
    state: string;

    @IsString()
    @MaxLength(20)
    postalCode: string;

    @IsString()
    @MaxLength(100)
    country: string;
}

export class Contact {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(100)
    position: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;
}

export class CreateOrganizationDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    @Matches(/^[a-zA-Z0-9\s\-_]+$/)
    name: string;

    @IsEnum(OrganizationType)
    type: OrganizationType;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)
    domain?: string;

    @ValidateNested()
    @Type(() => Address)
    address: Address;

    @ValidateNested()
    @Type(() => Contact)
    primaryContact: Contact;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Contact)
    additionalContacts?: Contact[];

    @IsEnum(SubscriptionPlan)
    subscriptionPlan: SubscriptionPlan;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    taxId?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    registrationNumber?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    licenseNumber?: string;

    @IsOptional()
    @IsObject()
    settings?: {
        timezone?: string;
        dateFormat?: string;
        timeFormat?: string;
        currency?: string;
        language?: string;
        notificationSettings?: {
            email?: boolean;
            sms?: boolean;
            push?: boolean;
        };
        branding?: {
            logo?: string;
            colors?: {
                primary?: string;
                secondary?: string;
            };
        };
    };

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}