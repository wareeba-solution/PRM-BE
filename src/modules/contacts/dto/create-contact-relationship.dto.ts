// src/modules/contacts/dto/create-contact-relationship.dto.ts

import {
    IsString,
    IsUUID,
    IsEnum,
    IsOptional,
    IsBoolean,
    IsDate,
    IsNotEmpty,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RelationshipType } from '../entities/contact-relationship.entity';

export class CreateContactRelationshipDto {
    @IsUUID()
    @IsNotEmpty()
    relatedContactId: string;


    @IsEnum(RelationshipType)
    type: RelationshipType;


    @IsOptional()
    @IsEnum(RelationshipType)
    inverseType?: RelationshipType;


    @IsOptional()
    @IsString()
    @MaxLength(500)
    notes?: string;


    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;


    @IsOptional()
    metadata?: Record<string, any>;
}

export class UpdateContactRelationshipDto {

    @IsOptional()
    @IsEnum(RelationshipType)
    type?: RelationshipType;


    @IsOptional()
    @IsEnum(RelationshipType)
    inverseType?: RelationshipType;


    @IsOptional()
    @IsString()
    @MaxLength(500)
    notes?: string;


    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;


    @IsOptional()
    @IsBoolean()
    isActive?: boolean;


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;


    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;


    @IsOptional()
    metadata?: Record<string, any>;
}

export class ContactRelationshipResponseDto {
    id: string;
    contactId: string;
    relatedContactId: string;
    relatedContact: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        type: string;
    };
    type: RelationshipType;
    inverseType?: RelationshipType;
    notes?: string;
    isPrimary: boolean;
    isActive: boolean;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}