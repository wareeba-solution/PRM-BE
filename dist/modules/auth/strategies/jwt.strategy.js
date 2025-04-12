"use strict";
// src/modules/auth/strategies/jwt.strategy.ts
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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const tenants_service_1 = require("../../tenants/services/tenants.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userRepository, tenantsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
        this.userRepository = userRepository;
        this.tenantsService = tenantsService;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        try {
            // Log for debugging
            this.logger.debug(`JWT payload: ${JSON.stringify(payload)}`);
            if (!payload.sub) {
                this.logger.error('Missing sub in JWT payload');
                throw new common_1.UnauthorizedException('Invalid token format');
            }
            // Verify that tenantId is in the payload
            if (!payload.tenantId) {
                this.logger.error('Missing tenantId in JWT payload');
                throw new common_1.UnauthorizedException('Invalid token format: missing tenant context');
            }
            // Verify that the tenant exists and is active
            try {
                const tenant = await this.tenantsService.findOne(payload.tenantId);
                if (!tenant || !tenant.isActive) {
                    this.logger.warn(`Invalid or inactive tenant in token: ${payload.tenantId}`);
                    throw new common_1.UnauthorizedException('Invalid or inactive tenant');
                }
            }
            catch (error) {
                this.logger.error(`Error verifying tenant from token: ${error.message}`);
                throw new common_1.UnauthorizedException('Invalid tenant context');
            }
            // Find the user with complete relations to check verification status
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
                relations: ['verification'] // Include verification relation if it exists
            });
            if (!user) {
                this.logger.warn(`User not found with ID: ${payload.sub}`);
                throw new common_1.UnauthorizedException('User not found');
            }
            // Check if email verification is required and if user's email is verified
            if (!user.isEmailVerified) {
                this.logger.warn(`Unverified user ${user.id} attempted to access protected resource`);
                throw new common_1.UnauthorizedException('Email verification required. Please verify your email to continue using your account.');
            }
            // Return user data to be attached to request, including tenantId from token
            return {
                id: user.id,
                email: user.email,
                role: user.role,
                tenantId: payload.tenantId,
                organizationId: user.organizationId,
                isEmailVerified: user.isEmailVerified,
                permissions: payload.permissions || user.permissions || []
            };
        }
        catch (error) {
            this.logger.error(`JWT validation error: ${error.message}`);
            throw new common_1.UnauthorizedException(error.message || 'Invalid or expired token');
        }
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        tenants_service_1.TenantsService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map