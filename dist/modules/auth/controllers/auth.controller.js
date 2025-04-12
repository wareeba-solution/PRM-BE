"use strict";
// // src/modules/auth/controllers/auth.controller.ts
//
// import {
//     Controller,
//     Post,
//     Body,
//     HttpCode,
//     HttpStatus,
//     Get,
//     UseGuards,
//     Req,
//     Headers,
//     UnauthorizedException,
//     Res,
//     Version,
//     BadRequestException,
//     Logger,
// } from '@nestjs/common';
//
// import { ModuleRef } from '@nestjs/core';
// import { TenantsService } from '../../tenants/services/tenants.service';
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
// import { AuthService, TokenPair } from '../services/auth.service';
// import { UserAccountService } from '../services/user-account.service';
// import { LoginDto } from '../dto/login.dto';
// import { RegisterDto } from '../dto/register.dto';
// import { ForgotPasswordDto } from '../dto/forgot-password.dto';
// import { ResetPasswordDto } from '../dto/reset-password.dto';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { RefreshTokenDto } from '../dto/refresh-token.dto';
// import { User } from '../../users/entities/user.entity';
// import { Public } from '../decorators/public.decorator';
// import { CurrentUser } from '../decorators/current-user.decorator';
// import { RateLimitGuard } from '../guards/rate-limit.guard';
// import { Request, Response } from 'express';
//
// @ApiTags('Authentication')
// @Controller('auth')
// @UseGuards(RateLimitGuard)
// export class AuthController {
//     private readonly logger = new Logger(AuthController.name);
//
//     constructor(
//         private readonly authService: AuthService,
//         private readonly userAccountService: UserAccountService,
//         private readonly moduleRef: ModuleRef
//
//     ) {}
//
//
//     @Post('login')
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @ApiOperation({ summary: 'Authenticate user and get tokens', description: 'Authenticates a user with email and password within a tenant context' })
//     @ApiBody({ type: LoginDto })
//     // @ApiHeader({ name: 'X-Tenant-ID', description: 'Optional tenant ID header (can also be provided in request body or determined from subdomain)', required: false })
//     @ApiHeader({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false })
//     @ApiResponse({ status: HttpStatus.OK, description: 'User authenticated successfully' })
//     @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials or inactive user/tenant' })
//     @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Missing tenant ID or invalid input' })
//     async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @Headers('x-tenant-id') headerTenantId: string) {
//         try {
//             // Get tenant from multiple possible sources
//             let tenantId = req.tenantId;
//             let tenant = req.tenant;
//
//             // If not set by middleware, try header directly
//             if ((!tenantId || !tenant) && headerTenantId) {
//                 this.logger.log(`Using X-Tenant-ID header: ${headerTenantId}`);
//                 try {
//                     // Get TenantsService to fetch tenant
//                     const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
//                     tenant = await tenantsService.findOne(headerTenantId);
//                     if (tenant && tenant.isActive) {
//                         tenantId = tenant.id;
//                         req.tenantId = tenantId;
//                         req.tenant = tenant;
//                     }
//                 } catch (error) {
//                     this.logger.error(`Failed to fetch tenant by header: ${error.message}`);
//                 }
//             }
//
//             // If still not found, try from request body
//             if ((!tenantId || !tenant) && loginDto.tenantId) {
//                 this.logger.log(`Using tenantId from request body: ${loginDto.tenantId}`);
//                 try {
//                     const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
//                     tenant = await tenantsService.findOne(loginDto.tenantId);
//                     if (tenant && tenant.isActive) {
//                         tenantId = tenant.id;
//                         req.tenantId = tenantId;
//                         req.tenant = tenant;
//                     }
//                 } catch (error) {
//                     this.logger.error(`Failed to fetch tenant from body: ${error.message}`);
//                 }
//             }
//
//             // Final check - if we still don't have tenant context, throw error
//             if (!tenantId || !tenant) {
//                 this.logger.warn('Login attempt without tenant context');
//                 throw new BadRequestException('Tenant context is required for login. Please provide a valid tenant ID via header or subdomain.');
//             }
//
//             const result = await this.authService.login(loginDto);
//
//             // Set tenant-specific cookie
//             res.cookie('tenant', tenant.subdomain, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'strict',
//             });
//
//             return result;
//         } catch (error) {
//             this.logger.error(`Login error for user ${loginDto.email}:`, error);
//             throw error;
//         }
//     }
//
//
//     @Post('register')
//     @Public()
//     @ApiOperation({ summary: 'Register a new user', description: 'Creates a new user account within a tenant and organization' })
//     @ApiBody({ type: RegisterDto })
//     @ApiHeader({ name: 'X-Tenant-ID', description: 'Optional tenant ID header (can also be provided in request body)', required: false })
//     @ApiHeader({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false })
//     @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully' })
//     @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
//     @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data or missing tenant' })
//     async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
//         // Get tenant from request (set by middleware)
//         const tenantId = req.tenantId;
//         const tenant = req.tenant;
//
//         if (!tenantId || !tenant) {
//             this.logger.warn('Registration attempt without tenant context');
//             throw new BadRequestException('Tenant context is required for registration');
//         }
//
//         return this.authService.register(registerDto);
//     }
//
//
//     @Post('refresh-token')
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @ApiOperation({ summary: 'Refresh authentication tokens', description: 'Generates new access and refresh tokens using a valid refresh token' })
//     @ApiBody({ type: RefreshTokenDto })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Tokens refreshed successfully' })
//     @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid or expired refresh token' })
//     async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ tokens: TokenPair }> {
//         const tokens = await this.authService.refreshToken(refreshTokenDto.refreshToken);
//         return { tokens };
//     }
//
//
//     @Post('logout')
//     @UseGuards(JwtAuthGuard)
//     @HttpCode(HttpStatus.OK)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Logout user', description: 'Revokes all refresh tokens for the authenticated user' })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Logout successful' })
//     @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid token or unauthorized access' })
//     async logout(
//         @CurrentUser() user: User,
//         @Headers('authorization') authHeader: string,
//     ) {
//         const token = authHeader?.split(' ')[1];
//         if (!token) {
//             throw new UnauthorizedException('Invalid token');
//         }
//
//         await this.authService.logout(user.id);
//         return { message: 'Logout successful' };
//     }
//
//
//     @Post('forgot-password')
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @ApiOperation({ summary: 'Request password reset', description: 'Sends password reset instructions to the user\'s email' })
//     @ApiBody({ type: ForgotPasswordDto })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Password reset instructions sent' })
//     async forgotPassword(@Body() { email }: { email: string }, @Req() req: Request) {
//         const tenantId = req.tenantId;
//         if (!tenantId) {
//             throw new BadRequestException('Tenant context is required');
//         }
//         return this.authService.forgotPassword(email, tenantId);
//     }
//
//
//     @Post('reset-password')
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @ApiOperation({ summary: 'Reset user password', description: 'Resets user password using a valid reset token' })
//     @ApiBody({ type: ResetPasswordDto })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Password reset successful' })
//     @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired token' })
//     async resetPassword(
//         @Body() { token, newPassword }: { token: string; newPassword: string },
//         @Req() req: Request,
//     ) {
//         const tenantId = req.tenantId;
//         if (!tenantId) {
//             throw new BadRequestException('Tenant context is required');
//         }
//         return this.authService.resetPassword(token, newPassword, tenantId);
//     }
//
//
//     @Get('me')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get current user profile', description: 'Returns the authenticated user\'s profile information' })
//     // @ApiHeader({ name: 'X-Tenant-ID', description: 'Tenant ID header', required: true })
//     @ApiResponse({ status: HttpStatus.OK, description: 'User profile retrieved successfully' })
//     @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
//     async getCurrentUser(@CurrentUser() user: User, @Headers('x-tenant-id') tenantId: string, @Req() req: Request) {
//         // Ensure tenant context is available
//         if (!req.tenantId && tenantId) {
//             try {
//                 const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
//                 const tenant = await tenantsService.findOne(tenantId);
//                 if (tenant && tenant.isActive) {
//                     req.tenantId = tenant.id;
//                     req.tenant = tenant;
//                 }
//             } catch (error) {
//                 this.logger.error(`Failed to fetch tenant for /me endpoint: ${error.message}`);
//             }
//         }
//
//         return { user };
//     }
//
//     @Post('verify-email')
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @ApiOperation({ summary: 'Verify user email', description: 'Confirms a user\'s email address using a verification token' })
//     @ApiHeader({ name: 'X-Tenant-ID', description: 'Tenant ID header', required: true })
//     @ApiBody({ schema: { properties: { token: { type: 'string', example: 'verification-token-123' } } } })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Email verification successful' })
//     @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired verification token' })
//     async verifyEmail(@Body('token') token: string, @Headers('x-tenant-id') tenantId: string, @Req() req: Request) {
//         // Ensure tenant context is available for email verification
//         if (!req.tenantId && tenantId) {
//             try {
//                 const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
//                 const tenant = await tenantsService.findOne(tenantId);
//                 if (tenant && tenant.isActive) {
//                     req.tenantId = tenant.id;
//                     req.tenant = tenant;
//                 }
//             } catch (error) {
//                 this.logger.error(`Failed to fetch tenant for verify-email endpoint: ${error.message}`);
//                 throw new BadRequestException('Valid tenant context is required');
//             }
//         }
//
//         await this.userAccountService.confirmEmail(token);
//         return { message: 'Email verification successful' };
//     }
//
//
//     @Post('resend-verification')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Resend verification email', description: 'Sends a new verification email to the authenticated user' })
//     @ApiResponse({ status: HttpStatus.OK, description: 'Verification email sent successfully' })
//     @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
//     async resendVerification(@CurrentUser() user: User) {
//         await this.userAccountService.sendVerificationEmail(user.id);
//         return { message: 'Verification email sent' };
//     }
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
// src/modules/auth/controllers/auth.controller.ts
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const tenants_service_1 = require("../../tenants/services/tenants.service");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const user_account_service_1 = require("../services/user-account.service");
const login_dto_1 = require("../dto/login.dto");
const register_dto_1 = require("../dto/register.dto");
const forgot_password_dto_1 = require("../dto/forgot-password.dto");
const reset_password_dto_1 = require("../dto/reset-password.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const user_entity_1 = require("../../users/entities/user.entity");
const public_decorator_1 = require("../decorators/public.decorator");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const rate_limit_guard_1 = require("../guards/rate-limit.guard");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, userAccountService, moduleRef) {
        this.authService = authService;
        this.userAccountService = userAccountService;
        this.moduleRef = moduleRef;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(loginDto, req, res, headerTenantId) {
        try {
            // Get tenant from multiple possible sources
            let tenantId = req.tenantId;
            let tenant = req.tenant;
            // If not set by middleware, try header directly
            if ((!tenantId || !tenant) && headerTenantId) {
                this.logger.log(`Using X-Tenant-ID header: ${headerTenantId}`);
                try {
                    // Get TenantsService to fetch tenant
                    const tenantsService = this.moduleRef.get(tenants_service_1.TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(headerTenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to fetch tenant by header: ${error.message}`);
                }
            }
            // If still not found, try from request body
            if ((!tenantId || !tenant) && loginDto.tenantId) {
                this.logger.log(`Using tenantId from request body: ${loginDto.tenantId}`);
                try {
                    const tenantsService = this.moduleRef.get(tenants_service_1.TenantsService, { strict: false });
                    tenant = await tenantsService.findOne(loginDto.tenantId);
                    if (tenant && tenant.isActive) {
                        tenantId = tenant.id;
                        req.tenantId = tenantId;
                        req.tenant = tenant;
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to fetch tenant from body: ${error.message}`);
                }
            }
            // Final check - if we still don't have tenant context, throw error
            if (!tenantId || !tenant) {
                this.logger.warn('Login attempt without tenant context');
                throw new common_1.BadRequestException('Tenant context is required for login. Please provide a valid tenant ID via header or subdomain.');
            }
            const result = await this.authService.login(loginDto);
            // Set tenant-specific cookie
            res.cookie('tenant', tenant.subdomain, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Login error for user ${loginDto.email}:`, error);
            throw error;
        }
    }
    async register(registerDto, req) {
        // Get tenant from request (set by middleware)
        const tenantId = req.tenantId;
        const tenant = req.tenant;
        if (!tenantId || !tenant) {
            this.logger.warn('Registration attempt without tenant context');
            throw new common_1.BadRequestException('Tenant context is required for registration');
        }
        return this.authService.register(registerDto);
    }
    async refreshToken(refreshTokenDto) {
        const tokens = await this.authService.refreshToken(refreshTokenDto.refreshToken);
        return { tokens };
    }
    async logout(user, authHeader) {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        await this.authService.logout(user.id);
        return { message: 'Logout successful' };
    }
    async forgotPassword({ email }, req) {
        const tenantId = req.tenantId;
        if (!tenantId) {
            throw new common_1.BadRequestException('Tenant context is required');
        }
        return this.authService.forgotPassword(email, tenantId);
    }
    async resetPassword({ token, newPassword }, req) {
        const tenantId = req.tenantId;
        if (!tenantId) {
            throw new common_1.BadRequestException('Tenant context is required');
        }
        return this.authService.resetPassword(token, newPassword, tenantId);
    }
    async getCurrentUser(user, req) {
        // Ensure tenant context is available
        // if (!req.tenantId && tenantId) {
        //     try {
        //         const tenantsService = this.moduleRef.get(TenantsService, { strict: false });
        //         const tenant = await tenantsService.findOne(tenantId);
        //         if (tenant && tenant.isActive) {
        //             req.tenantId = tenant.id;
        //             req.tenant = tenant;
        //         }
        //     } catch (error) {
        //         this.logger.error(`Failed to fetch tenant for /me endpoint: ${error.message}`);
        //     }
        // }
        return { user };
    }
    async verifyEmail(token, tenantId, req) {
        // Ensure tenant context is available for email verification
        if (!req.tenantId && tenantId) {
            try {
                const tenantsService = this.moduleRef.get(tenants_service_1.TenantsService, { strict: false });
                const tenant = await tenantsService.findOne(tenantId);
                if (tenant && tenant.isActive) {
                    req.tenantId = tenant.id;
                    req.tenant = tenant;
                }
            }
            catch (error) {
                this.logger.error(`Failed to fetch tenant for verify-email endpoint: ${error.message}`);
                throw new common_1.BadRequestException('Valid tenant context is required');
            }
        }
        await this.userAccountService.confirmEmail(token);
        return { message: 'Email verification successful' };
    }
    async resendVerification(user) {
        await this.userAccountService.sendVerificationEmail(user.id);
        return { message: 'Verification email sent' };
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate user and get tokens', description: 'Authenticates a user with email and password within a tenant context' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiHeader)({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'User authenticated successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Invalid credentials or inactive user/tenant' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Missing tenant ID or invalid input' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user', description: 'Creates a new user account within a tenant and organization' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, swagger_1.ApiHeader)({ name: 'user-agent', description: 'Browser user agent (automatically sent by browser)', required: false }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'User registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Email already exists' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid input data or missing tenant' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh authentication tokens', description: 'Generates new access and refresh tokens using a valid refresh token' }),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Tokens refreshed successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Invalid or expired refresh token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user', description: 'Revokes all refresh tokens for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Logout successful' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Invalid token or unauthorized access' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset', description: 'Sends password reset instructions to the user\'s email' }),
    (0, swagger_1.ApiBody)({ type: forgot_password_dto_1.ForgotPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Password reset instructions sent' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset user password', description: 'Resets user password using a valid reset token' }),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Password reset successful' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid or expired token' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile', description: 'Returns the authenticated user\'s profile information' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'User profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify user email', description: 'Confirms a user\'s email address using a verification token' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { token: { type: 'string', example: 'verification-token-123' } } } }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Email verification successful' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid or expired verification token' }),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Resend verification email', description: 'Sends a new verification email to the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Verification email sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard)
    // @ApiHeader({ name: 'X-Tenant-ID', description: 'Tenant ID header (required for all authenticated operations)', required: true })
    ,
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_account_service_1.UserAccountService,
        core_1.ModuleRef])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map