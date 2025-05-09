import { ModuleRef } from '@nestjs/core';
import { AuthService, TokenPair } from '../services/auth.service';
import { UserAccountService } from '../services/user-account.service';
import { LoginDto } from '../dto/login.dto';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../../users/entities/user.entity';
import { Request, Response } from 'express';
import { EmailVerificationService } from '../../email/services/email-verification.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly userAccountService;
    private readonly moduleRef;
    private readonly emailVerificationService;
    private readonly jwtService;
    private readonly logger;
    constructor(authService: AuthService, userAccountService: UserAccountService, moduleRef: ModuleRef, emailVerificationService: EmailVerificationService, jwtService: JwtService);
    login(loginDto: LoginDto, req: Request, res: Response, headerTenantId: string): Promise<TokenPair & {
        isEmailVerified: boolean;
    }>;
    createBranch(createBranchDto: CreateBranchDto, req: Request, authHeader: string, headerTenantId: string): Promise<TokenPair & {
        isEmailVerified: boolean;
        verificationToken?: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        tokens: TokenPair;
    }>;
    logout(user: User, authHeader: string): Promise<{
        message: string;
    }>;
    forgotPassword({ email }: {
        email: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    resetPassword({ token, newPassword }: {
        token: string;
        newPassword: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    getCurrentUser(user: User, req: Request): Promise<{
        user: User;
    }>;
    verifyEmail(token: string, tenantId: string, req: Request): Promise<{
        message: string;
    }>;
    resendVerification(user: User): Promise<{
        message: string;
    }>;
    checkVerificationToken(token: string): Promise<{
        isValid: boolean;
    }>;
}
