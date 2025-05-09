// src/modules/auth/controllers/auth.controller.ts

import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    UseGuards,
    Req,
    Headers,
    UnauthorizedException,
    Res,
    BadRequestException,
    Logger,
    Query,
    Inject,
} from '@nestjs/common';

import { ModuleRef } from '@nestjs/core';
import { TenantsService } from '../../tenants/services/tenants.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthService, TokenPair } from '../services/auth.service';
import { UserAccountService } from '../services/user-account.service';
import { LoginDto } from '../dto/login.dto';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RateLimitGuard } from '../guards/rate-limit.guard';
import { Request, Response } from 'express';
import { SkipEmailVerification } from "../decorators/skip-email-verification.decorator";
import { EmailVerificationService } from '../../email/services/email-verification.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(RateLimitGuard)
// @ApiHeader({ name: 'X-Tenant-ID', description: 'Tenant ID header (required for all authenticated operations)', required: true })
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userAccountService: UserAccountService,
        private readonly moduleRef: ModuleRef,
        private readonly emailVerificationService: EmailVerificationService,
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {}

    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Authenticate user and get tokens', description: 'Authenticates a user with email and password within a tenant context' })
    @ApiBody({ type: LoginDto })
    @ApiHeader({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false })
    @ApiResponse({ status: HttpStatus.OK, description: 'User authenticated successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials or inactive user/tenant' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Missing tenant ID or invalid input' })
    async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @Headers('x-tenant-id') headerTenantId: string) {
        try {
            // Get tenant from multiple possible sources
            let tenantId = req.tenantId;
            let tenant = req.tenant;

            // If not set by middleware, try header directly
            if ((!tenantId || !tenant) && headerTenantId) {
                this.logger.log(`Using X-Tenant-ID header: ${headerTenantId}`);
                try {
                    // Get TenantsService to fetch tenant
                    const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(headerTenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                    }
                } catch (error) {
                    this.logger.error(`Failed to fetch tenant by header: ${error.message}`);
                }
            }

            // If still not found, try from request body
            if ((!tenantId || !tenant) && loginDto.tenantId) {
                this.logger.log(`Using tenantId from request body: ${loginDto.tenantId}`);
                try {
                    const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(loginDto.tenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                    }
                } catch (error) {
                    this.logger.error(`Failed to fetch tenant from body: ${error.message}`);
                }
            }

            // Final check - if we still don't have tenant context, throw error
            if (!tenantId || !tenant) {
                this.logger.warn('Login attempt without tenant context');
                throw new BadRequestException('Tenant context is required for login. Please provide a valid tenant ID via header or subdomain.');
            }

            const result = await this.authService.login(loginDto);

            // Set tenant-specific cookie
            res.cookie('tenant', tenant.subdomain, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return result;
        } catch (error) {
            this.logger.error(`Login error for user ${loginDto.email}:`, error);
            throw error;
        }
    }

    @Post('create-branch')
    @Public()
    @ApiOperation({ summary: 'Create new branch', description: 'Creates a new organization branch within an existing tenant' })
    @ApiBody({ type: CreateBranchDto })
    @ApiHeader({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Branch created successfully' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data or missing tenant' })
    async createBranch(
        @Body() createBranchDto: CreateBranchDto,
        @Req() req: Request,
        @Headers('authorization') authHeader: string,
        @Headers('x-tenant-id') headerTenantId: string
    ) {
        // Get tenant from request (set by middleware)
        let tenantId = req.tenantId;
        let tenant = req.tenant;

        // If not set by middleware, try direct approaches
        if (!tenantId || !tenant) {
            // Try from header first
            if (headerTenantId) {
                this.logger.log(`Trying to find tenant by X-Tenant-ID header: ${headerTenantId}`);
                try {
                    const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(headerTenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                        this.logger.log(`Found tenant from header: ${tenantId}`);
                    }
                } catch (error) {
                    this.logger.warn(`Failed to find tenant by header ID: ${headerTenantId}`, error);
                }
            }

            // If still no tenant, try from request body
            if ((!tenantId || !tenant) && createBranchDto.tenantId) {
                this.logger.log(`Trying to find tenant by body tenantId: ${createBranchDto.tenantId}`);
                try {
                    const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(createBranchDto.tenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                        this.logger.log(`Found tenant from body: ${tenantId}`);
                    }
                } catch (error) {
                    this.logger.warn(`Failed to find tenant by body ID: ${createBranchDto.tenantId}`, error);
                }
            }

            // If still no tenant, try from JWT
            if ((!tenantId || !tenant) && authHeader && authHeader.startsWith('Bearer ')) {
                try {
                    const token = authHeader.substring(7);
                    const payload = this.jwtService.verify(token);

                    if (payload && payload.tenantId) {
                        this.logger.log(`Using tenant from JWT: ${payload.tenantId}`);
                        const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                        tenant = await tenantsService.findOne(payload.tenantId);
                        if (tenant && tenant.isActive) {
                            tenantId = tenant.id;
                            req.tenantId = tenantId;
                            req.tenant = tenant;
                            this.logger.log(`Found tenant from JWT: ${tenantId}`);
                        }
                    }
                } catch (error) {
                    this.logger.error(`Failed to extract tenant from JWT: ${error.message}`);
                }
            }
        }

        if (!tenantId || !tenant) {
            this.logger.warn('Branch creation attempt without tenant context');
            throw new BadRequestException('Tenant context is required for branch creation');
        }

        // For now, use only createBranchDto as the auth service expects
        // We'll need to modify the services instead to support passing the user ID
        return this.authService.createBranch(createBranchDto);
    }

    @Post('refresh-token')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh authentication tokens', description: 'Generates new access and refresh tokens using a valid refresh token' })
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Tokens refreshed successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid or expired refresh token' })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ tokens: TokenPair }> {
        const tokens = await this.authService.refreshToken(refreshTokenDto.refreshToken);
        return { tokens };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout user', description: 'Revokes all refresh tokens for the authenticated user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Logout successful' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid token or unauthorized access' })
    async logout(
        @CurrentUser() user: User,
        @Headers('authorization') authHeader: string,
    ) {
        const token = authHeader?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        await this.authService.logout(user.id);
        return { message: 'Logout successful' };
    }

    @Post('forgot-password')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Request password reset', description: 'Sends password reset instructions to the user\'s email' })
    @ApiBody({ type: ForgotPasswordDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Password reset instructions sent' })
    async forgotPassword(@Body() { email }: { email: string }, @Req() req: Request) {
        const tenantId = req.tenantId;
        if (!tenantId) {
            throw new BadRequestException('Tenant context is required');
        }
        return this.authService.forgotPassword(email, tenantId);
    }

    @Post('reset-password')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset user password', description: 'Resets user password using a valid reset token' })
    @ApiBody({ type: ResetPasswordDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Password reset successful' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired token' })
    async resetPassword(
        @Body() { token, newPassword }: { token: string; newPassword: string },
        @Req() req: Request,
    ) {
        const tenantId = req.tenantId;
        if (!tenantId) {
            throw new BadRequestException('Tenant context is required');
        }
        return this.authService.resetPassword(token, newPassword, tenantId);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile', description: 'Returns the authenticated user\'s profile information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User profile retrieved successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
    async getCurrentUser(@CurrentUser() user: User, @Req() req: Request) {
        return { user };
    }

    @Post('verify-email')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify user email', description: 'Confirms a user\'s email address using a verification token' })
    @ApiBody({ schema: { properties: { token: { type: 'string', example: 'verification-token-123' } } } })
    @ApiResponse({ status: HttpStatus.OK, description: 'Email verification successful' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired verification token' })
    async verifyEmail(@Body('token') token: string, @Headers('x-tenant-id') tenantId: string, @Req() req: Request) {
        // Ensure tenant context is available for email verification
        if (!req.tenantId && tenantId) {
            try {
                const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
                const tenant = await tenantsService.findOne(tenantId);
                if (tenant && tenant.isActive) {
                    req.tenantId = tenant.id;
                    req.tenant = tenant;
                }
            } catch (error) {
                this.logger.error(`Failed to fetch tenant for verify-email endpoint: ${error.message}`);
                throw new BadRequestException('Valid tenant context is required');
            }
        }

        await this.userAccountService.confirmEmail(token);
        return { message: 'Email verification successful' };
    }

    @Post('resend-verification')
    @SkipEmailVerification() // Add this to allow unverified users to request verification emails
    @UseGuards(JwtAuthGuard) // This guard requires authentication
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Resend verification email', description: 'Sends a new verification email to the authenticated user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Verification email sent successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
    async resendVerification(@CurrentUser() user: User) {
        await this.userAccountService.sendVerificationEmail(user.id);
        return { message: 'Verification email sent' };
    }

    @Get('verify-email-token')
    @Public()
    @ApiOperation({ summary: 'Check email verification token validity', description: 'Validates a token without consuming it' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Token validity status' })
    async checkVerificationToken(@Query('token') token: string) {
        const isValid = await this.emailVerificationService.isTokenValid(token);
        return { isValid };
    }
}