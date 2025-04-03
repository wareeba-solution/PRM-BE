"use strict";
// src/modules/auth/guards/auth.guard.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const public_decorator_1 = require("../decorators/public.decorator");
const users_service_1 = require("../../users/services/users.service");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, authService, jwtService, configService, usersService) {
        this.reflector = reflector;
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                if (isPublic)
                    return true;
                throw new common_1.UnauthorizedException('No authentication token provided');
            }
            try {
                // Verify and decode the token using JwtService directly
                const payload = this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET')
                });
                // Check if token is blacklisted using existing method
                if (this.authService.isTokenBlacklisted(token)) {
                    throw new common_1.UnauthorizedException('Token has been revoked');
                }
                // Fetch user data using existing UsersService
                const user = await this.usersService.findById(payload.sub);
                if (!user) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                // Check if user is active
                if (!user.isActive) {
                    throw new common_1.UnauthorizedException('User account is inactive');
                }
                // Check if email verification is required
                if (this.authService.requireEmailVerification && !user.isEmailVerified) {
                    throw new common_1.UnauthorizedException('Email verification required');
                }
                // Attach user and token info to request for controllers to use
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
                    throw new common_1.UnauthorizedException('Token has expired');
                }
                if (error.name === 'JsonWebTokenError') {
                    throw new common_1.UnauthorizedException('Invalid token');
                }
                throw error;
            }
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            this.logger.error('Authentication error:', error);
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService,
        jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map