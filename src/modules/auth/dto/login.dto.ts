// src/modules/auth/dto/login.dto.ts

import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsOptional,
    IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ 
        description: 'Email address of the user',
        example: 'user@example.com'
    })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ 
        description: 'Password of the user',
        example: 'SecurePassword123!'
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @ApiPropertyOptional({ 
        description: 'Remember user session',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    rememberMe?: boolean;

    @ApiPropertyOptional({ 
        description: 'ID of the tenant the user belongs to. If not provided, will be determined from subdomain or headers',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsOptional()
    @IsString()
    tenantId?: string; // The tenant ID for multi-tenant authentication
    
    @ApiPropertyOptional({ 
        description: 'ID of the organization if user belongs to multiple organizations',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    @IsOptional()
    @IsString()
    organizationId?: string; // If user belongs to multiple organizations, they can select one

    @ApiPropertyOptional({ 
        description: 'Device identifier for tracking login sessions',
        example: 'device-123'
    })
    @IsOptional()
    @IsString()
    deviceId?: string;
    
    @ApiPropertyOptional({ 
        description: 'Organization domain for domain-based login',
        example: 'example.com'
    })
    @IsOptional()
    @IsString()
    domain?: string; // Allow login via organization domain
    
    @ApiPropertyOptional({ 
        description: 'Tenant subdomain for subdomain-based login',
        example: 'healthcare-network'
    })
    @IsOptional()
    @IsString()
    subdomain?: string; // Allow login via tenant subdomain
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: User information
 *         token:
 *           type: string
 *           description: JWT access token
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *         expiresIn:
 *           type: number
 *           description: Token expiration time in seconds
 *         tenantId:
 *           type: string
 *           description: ID of the tenant the user belongs to
 */
// Response interfaces
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        tenantId: string;
        organizationId: string;
        isEmailVerified: boolean;
        lastLoginAt?: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
    organization: {
        id: string;
        name: string;
        slug: string;
        status: string;
        subscriptionTier: string;
        isSubscriptionActive: boolean;
        logo?: string;
    };
    // If user belongs to multiple organizations, include them here
    availableOrganizations?: Array<{
        id: string;
        name: string;
        slug: string;
        role: string;
    }>;
}

export interface LoginMetadata {
    userAgent: string;
    ip: string;
    deviceId?: string;
    lastLogin?: Date;
    loginAttempts?: number;
}