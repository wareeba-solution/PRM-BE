// src/modules/auth/dto/register.dto.ts

import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
    IsPhoneNumber,
    IsEnum,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../users/enums/role.enum';
import { SubscriptionPlan } from '../../organizations/enums/subscription-plan.enum';

export class OrganizationAddressDto {
    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name must not exceed 50 characters' })
    firstName: string;


    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
    lastName: string;


    @IsEmail({}, { message: 'Please enter a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        },
    )
    password: string;


    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' })
    phone?: string;


    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}

export class RegisterOrganizationDto {
    @IsString()
    @IsNotEmpty({ message: 'Organization name is required' })
    @MinLength(2, { message: 'Organization name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Organization name must not exceed 100 characters' })
    name: string;


    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    })
    website?: string;


    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' })
    phone?: string;


    @IsOptional()
    @ValidateNested()
    @Type(() => OrganizationAddressDto)
    address?: OrganizationAddressDto;


    @IsOptional()
    @IsEnum(SubscriptionPlan)
    subscriptionPlan?: SubscriptionPlan;
}

export class RegisterDto {
    @ValidateNested()
    @Type(() => RegisterUserDto)
    user: RegisterUserDto;

    @ValidateNested()
    @Type(() => RegisterOrganizationDto)
    organization: RegisterOrganizationDto;
}

// Response interfaces
export interface RegisterResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        organizationId: string;
    };
    organization: {
        id: string;
        name: string;
        subscriptionPlan: string;
        status: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
}

export interface RegistrationMetadata {
    userAgent: string;
    ip: string;
    deviceId?: string;
    verificationToken?: string;
    verificationExpires?: Date;
}