var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthGuard_1;
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersService } from '../../users/services/users.service';
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, authService, jwtService, configService, usersService) {
        this.reflector = reflector;
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                if (isPublic)
                    return true;
                throw new UnauthorizedException('No authentication token provided');
            }
            try {
                const payload = this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET')
                });
                if (this.authService.isTokenBlacklisted(token)) {
                    throw new UnauthorizedException('Token has been revoked');
                }
                const user = await this.usersService.findById(payload.sub);
                if (!user) {
                    throw new UnauthorizedException('User not found');
                }
                if (!user.isActive) {
                    throw new UnauthorizedException('User account is inactive');
                }
                if (this.authService.requireEmailVerification && !user.isEmailVerified) {
                    throw new UnauthorizedException('Email verification required');
                }
                request.user = user;
                request.tokenMetadata = {
                    token,
                    iat: payload.iat,
                    exp: payload.exp,
                };
                return true;
            }
            catch (error) {
                if (isPublic)
                    return true;
                this.logger.error('Token validation failed:', error);
                if (error.name === 'TokenExpiredError') {
                    throw new UnauthorizedException('Token has expired');
                }
                if (error.name === 'JsonWebTokenError') {
                    throw new UnauthorizedException('Invalid token');
                }
                throw error;
            }
        }
        catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            this.logger.error('Authentication error:', error);
            throw new UnauthorizedException('Authentication failed');
        }
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
AuthGuard = AuthGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService,
        JwtService,
        ConfigService,
        UsersService])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map