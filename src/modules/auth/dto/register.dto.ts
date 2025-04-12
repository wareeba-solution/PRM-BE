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
    IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../users/enums/role.enum';
import { SubscriptionPlan } from '../../organizations/enums/subscription-plan.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationAddressDto {
    @ApiProperty({ description: 'Street address', example: '123 Main St' })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ description: 'City', example: 'New York' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: 'State or province', example: 'NY' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ description: 'Postal code', example: '10001' })
    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @ApiProperty({ description: 'Country', example: 'USA' })
    @IsString()
    @IsNotEmpty()
    country: string;
}

export class RegisterUserDto {
    @ApiProperty({ description: 'User\'s first name', example: 'John' })
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name must not exceed 50 characters' })
    firstName: string;


    @ApiProperty({ description: 'User\'s last name', example: 'Doe' })
    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
    lastName: string;


    @ApiProperty({ description: 'User\'s email address', example: 'john.doe@example.com' })
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
    @ApiProperty({ description: 'Organization name', example: 'Acme Healthcare' })
    @IsString()
    @IsNotEmpty({ message: 'Organization name is required' })
    @MinLength(2, { message: 'Organization name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Organization name must not exceed 100 characters' })
    name: string;


    @ApiPropertyOptional({ description: 'Organization website', example: 'https://acme-health.com' })
    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    })
    website?: string;


    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' })
    phone?: string;


    @ApiPropertyOptional({ 
        description: 'Organization address', 
        type: () => OrganizationAddressDto 
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => OrganizationAddressDto)
    address?: OrganizationAddressDto;


    @ApiPropertyOptional({ 
        description: 'Organization subscription plan', 
        enum: SubscriptionPlan,
        example: SubscriptionPlan.BASIC
    })
    @IsOptional()
    @IsEnum(SubscriptionPlan)
    subscriptionPlan?: SubscriptionPlan;
}

export class RegisterDto {
    @ApiProperty({ 
        description: 'User information', 
        type: () => RegisterUserDto 
    })
    @ValidateNested()
    @Type(() => RegisterUserDto)
    user: RegisterUserDto;

    @ApiProperty({ 
        description: 'Organization information', 
        type: () => RegisterOrganizationDto 
    })
    @ValidateNested()
    @Type(() => RegisterOrganizationDto)
    organization: RegisterOrganizationDto;
    
    @ApiPropertyOptional({ 
        description: 'Tenant ID (required for multi-tenant registration)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsOptional()
    @IsUUID(4)
    tenantId?: string;
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