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
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        // If there's an error or no user, throw an error
        if (err || !user) {
            this.logger.warn(`Authentication failed: ${(err === null || err === void 0 ? void 0 : err.message) || 'No user found'}`);
            throw new common_1.UnauthorizedException((err === null || err === void 0 ? void 0 : err.message) || 'Invalid or expired token');
        }
        // Check if token is blacklisted
        if (token && this.authService.isTokenBlacklisted(token)) {
            this.logger.warn(`Blacklisted token used for user ${user.id}`);
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        // Check if user is active
        if (!user.isActive) {
            this.logger.warn(`Inactive user ${user.id} attempted to access the system`);
            throw new common_1.UnauthorizedException('User account is inactive');
        }
        // Check if user's email is verified (if required)
        if (this.authService.requireEmailVerification && !user.emailVerified) {
            this.logger.warn(`Unverified user ${user.id} attempted to access the system`);
            throw new common_1.UnauthorizedException('Email verification required');
        }
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