import {
    IsString,
    IsEmail,
    IsEnum,
    IsOptional,
    MinLength,
    MaxLength,
    Matches,
    IsPhoneNumber,
    ValidateNested,
    IsArray,
    IsObject
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../users/enums/role.enum';

export class AddressDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    street?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    city?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    state?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    postalCode?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    country?: string;
}

export class EmergencyContactDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(50)
    relationship: string;

    @IsPhoneNumber(undefined)
    phone: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    address?: string;
}

export class AddUserDto {
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
    @MaxLength(50)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }
    )
    password: string;

    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsPhoneNumber(undefined)
    phoneNumber?: string;

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
    @Type(() => AddressDto)
    address?: AddressDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => EmergencyContactDto)
    emergencyContact?: EmergencyContactDto;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    licenseNumber?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
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
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @IsOptional()
    @IsObject()
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
    @IsObject()
    metadata?: Record<string, any>;
}