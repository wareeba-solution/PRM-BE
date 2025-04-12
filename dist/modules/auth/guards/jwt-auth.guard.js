"use strict";
// src/modules/auth/guards/jwt-auth.guard.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../services/auth.service");
const public_decorator_1 = require("../decorators/public.decorator");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, authService) {
        super();
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        // Check if the endpoint is marked as public
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        // Log request details for debugging
        const request = context.switchToHttp().getRequest();
        this.logger.debug(`JWT Auth Guard - Incoming request to: ${request.method} ${request.url}`);
        this.logger.debug(`Has Authorization Header: ${!!request.headers.authorization}`);
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        // Enhanced logging for debugging
        this.logger.debug(`Token present: ${!!token}`);
        this.logger.debug(`JWT Strategy error: ${(err === null || err === void 0 ? void 0 : err.message) || 'No error'}`);
        this.logger.debug(`User from JWT Strategy: ${JSON.stringify(user) || 'No user'}`);
        this.logger.debug(`Info from JWT Strategy: ${JSON.stringify(info) || 'No info'}`);
        // If there's an error or no user, throw an error with detailed info
        if (err || !user) {
            this.logger.warn(`Authentication failed: ${(err === null || err === void 0 ? void 0 : err.message) || 'No user found'}`);
            // For debugging - log the token info
            if (token) {
                try {
                    const tokenParts = token.split('.');
                    if (tokenParts.length === 3) {
                        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
                        this.logger.debug(`Token payload: ${JSON.stringify(payload)}`);
                        this.logger.debug(`Token expiry: ${new Date(payload.exp * 1000).toISOString()}`);
                        this.logger.debug(`Current time: ${new Date().toISOString()}`);
                    }
                }
                catch (e) {
                    this.logger.debug(`Failed to decode token: ${e.message}`);
                }
            }
            throw new common_1.UnauthorizedException((err === null || err === void 0 ? void 0 : err.message) || 'Invalid or expired token');
        }
        // TEMPORARILY SIMPLIFY - skip additional validations for debugging
        /*
        // Check if user is active
        if (!user.isActive) {
            this.logger.warn(`Inactive user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('User account is inactive');
        }

        // Check if user's email is verified
        if (user.verification && !user.isEmailVerified) {
            this.logger.warn(`Unverified user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('Email verification required');
        }
        */
        // Add token metadata to request
        request.tokenMetadata = {
            token,
            iat: user.iat,
            exp: user.exp,
        };
        // Log successful authentication
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map