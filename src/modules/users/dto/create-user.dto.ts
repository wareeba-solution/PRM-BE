// src/modules/users/dto/create-user.dto.ts

import {
    IsString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsArray,
    IsBoolean,
    MinLength,
    MaxLength,
    Matches,
    IsPhoneNumber,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../enums/role.enum';

export class UserAddress {
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

export class EmergencyContact {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(100)
    relationship: string;

    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    address?: string;
}

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        }
    )
    password: string;

    @IsPhoneNumber()
    phoneNumber: string;

    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    department?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    employeeId?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserAddress)
    address?: UserAddress;

    @IsOptional()
    @ValidateNested()
    @Type(() => EmergencyContact)
    emergencyContact?: EmergencyContact;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    licenseNumber?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    specialization?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    qualifications?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    certifications?: string[];

    @IsOptional()
    @IsBoolean()
    isOnCall?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @IsOptional()
    @IsBoolean()
    requirePasswordChange?: boolean = true;

    @IsOptional()
    preferences?: {
        theme?: string;
        notifications?: {
            email?: boolean;
            sms?: boolean;
            inApp?: boolean;
        };
        timezone?: string;
        language?: string;
    };

    @IsOptional()
    metadata?: Record<string, any>;
}