// src/modules/auth/dto/login.dto.ts

import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Please enter a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsOptional()
    @IsBoolean()
    rememberMe?: boolean;

    @IsOptional()
    @IsString()
    organizationId?: string;

    @IsOptional()
    @IsString()
    deviceId?: string;
}

// Response interfaces
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        organizationId?: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
    organization?: {
        id: string;
        name: string;
        status: string;
    };
}

export interface LoginMetadata {
    userAgent: string;
    ip: string;
    deviceId?: string;
    lastLogin?: Date;
    loginAttempts?: number;
}