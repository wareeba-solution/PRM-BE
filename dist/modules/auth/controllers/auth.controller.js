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
import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Headers, Ip, UnauthorizedException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RateLimitGuard } from '../guards/rate-limit.guard';
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, userAgent, ip) {
        const result = await this.authService.login(loginDto, {
            userAgent,
            ip,
        });
        return {
            user: result.user,
            tokens: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            },
        };
    }
    async register(registerDto, userAgent, ip) {
        const result = await this.authService.register(registerDto, {
            userAgent,
            ip,
        });
        return {
            user: result.user,
            organization: result.organization,
            tokens: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            },
        };
    }
    async refreshToken(refreshTokenDto) {
        const tokens = await this.authService.refreshToken(refreshTokenDto.refreshToken);
        return { tokens };
    }
    async logout(user, authHeader) {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }
        await this.authService.logout(user.id);
        return { message: 'Logout successful' };
    }
    async forgotPassword(forgotPasswordDto) {
        await this.authService.sendPasswordResetEmail(forgotPasswordDto.email);
        return { message: 'Password reset instructions sent to email' };
    }
    async resetPassword(resetPasswordDto) {
        await this.authService.changePassword(resetPasswordDto.token, resetPasswordDto.password);
        return { message: 'Password reset successful' };
    }
    async getCurrentUser(user) {
        return { user };
    }
    async verifyEmail(token) {
        await this.authService.confirmEmail(token);
        return { message: 'Email verification successful' };
    }
    async resendVerification(user) {
        await this.authService.sendVerificationEmail(user.id);
        return { message: 'Verification email sent' };
    }
};
__decorate([
    Post('login'),
    Public(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'User login' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Login successful' }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' }),
    __param(0, Body()),
    __param(1, Headers('user-agent')),
    __param(2, Ip()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('register'),
    Public(),
    ApiOperation({ summary: 'Register new user/organization' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Registration successful' }),
    __param(0, Body()),
    __param(1, Headers('user-agent')),
    __param(2, Ip()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('refresh-token'),
    Public(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Refresh access token' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    Post('logout'),
    UseGuards(JwtAuthGuard),
    HttpCode(HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({ summary: 'User logout' }),
    __param(0, CurrentUser()),
    __param(1, Headers('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Post('forgot-password'),
    Public(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Request password reset' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    Post('reset-password'),
    Public(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Reset password' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get current user profile' }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    Post('verify-email'),
    Public(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Verify email address' }),
    __param(0, Body('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    Post('resend-verification'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Resend verification email' }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
AuthController = __decorate([
    ApiTags('Authentication'),
    Controller('auth'),
    UseGuards(RateLimitGuard),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map