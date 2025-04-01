var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthGuard_1;
import { Injectable, UnauthorizedException, Logger, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(reflector, authService) {
        super();
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (err || !user) {
            this.logger.warn(`Authentication failed: ${(err === null || err === void 0 ? void 0 : err.message) || 'No user found'}`);
            throw new UnauthorizedException((err === null || err === void 0 ? void 0 : err.message) || 'Invalid or expired token');
        }
        if (token && this.authService.isTokenBlacklisted(token)) {
            this.logger.warn(`Blacklisted token used for user ${user.id}`);
            throw new UnauthorizedException('Token has been revoked');
        }
        if (!user.isActive) {
            this.logger.warn(`Inactive user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('User account is inactive');
        }
        if (this.authService.requireEmailVerification && !user.emailVerified) {
            this.logger.warn(`Unverified user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('Email verification required');
        }
        request.tokenMetadata = {
            token,
            iat: user.iat,
            exp: user.exp,
        };
        this.logger.debug(`User ${user.id} successfully authenticated`);
        return user;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService])
], JwtAuthGuard);
export { JwtAuthGuard };
//# sourceMappingURL=jwt-auth.guard.js.map