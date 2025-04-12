// src/modules/auth/dto/create-branch.dto.ts

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

export class BranchAddressDto {
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

export class BranchAdminDto {
    @ApiProperty({ description: 'Branch admin\'s first name', example: 'John' })
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name must not exceed 50 characters' })
    firstName: string;

    @ApiProperty({ description: 'Branch admin\'s last name', example: 'Doe' })
    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
    lastName: string;

    @ApiProperty({ description: 'Branch admin\'s email address', example: 'branch.admin@example.com' })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ description: 'Branch admin\'s password', example: 'SecurePass123!' })
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

    @ApiPropertyOptional({ description: 'Branch admin\'s phone number', example: '+1234567890' })
    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' })
    phone?: string;

    @ApiPropertyOptional({
        description: 'Branch admin\'s role',
        enum: Role,
        default: Role.ADMIN,
        example: Role.ADMIN
    })
    @IsOptional()
    @IsEnum(Role)
    role?: Role = Role.ADMIN;
}

export class BranchDetailsDto {
    @ApiProperty({ description: 'Branch name', example: 'Acme Healthcare - Downtown Branch' })
    @IsString()
    @IsNotEmpty({ message: 'Branch name is required' })
    @MinLength(2, { message: 'Branch name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Branch name must not exceed 100 characters' })
    name: string;

    @ApiPropertyOptional({ description: 'Branch website', example: 'https://downtown.acme-health.com' })
    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/.+\..+$/, {
        message: 'Please enter a valid website URL',
    })
    website?: string;

    @ApiPropertyOptional({ description: 'Branch phone number', example: '+1234567890' })
    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please enter a valid phone number' })
    phone?: string;

    @ApiPropertyOptional({
        description: 'Branch address',
        type: () => BranchAddressDto
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => BranchAddressDto)
    address?: BranchAddressDto;

    @ApiPropertyOptional({
        description: 'Branch subscription plan',
        enum: SubscriptionPlan,
        example: SubscriptionPlan.BASIC
    })
    @IsOptional()
    @IsEnum(SubscriptionPlan)
    subscriptionPlan?: SubscriptionPlan;
}

export class CreateBranchDto {
    @ApiProperty({
        description: 'Branch admin information',
        type: () => BranchAdminDto
    })
    @ValidateNested()
    @Type(() => BranchAdminDto)
    user: BranchAdminDto;

    @ApiProperty({
        description: 'Branch details',
        type: () => BranchDetailsDto
    })
    @ValidateNested()
    @Type(() => BranchDetailsDto)
    organization: BranchDetailsDto;

    @ApiProperty({
        description: 'Tenant ID (required for multi-tenant applications)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsOptional()
    @IsUUID(4)
    tenantId?: string;
}

// Response interfaces
export interface CreateBranchResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        organizationId: string;
    };
    branch: {
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
    isEmailVerified: boolean;
    verificationToken?: string; // Only included in development
}