"use strict";
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
// src/modules/auth/strategies/jwt.strategy.ts
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService, userRepository) {
        // Fix: Use type assertion to bypass TypeScript checking
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        }); // Use type assertion to bypass the type checking
        this.configService = configService;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        try {
            this.logger.debug(`JWT payload: ${JSON.stringify(payload)}`);
            if (!payload.sub) {
                this.logger.error('Missing sub in JWT payload');
                throw new common_1.UnauthorizedException('Invalid token format');
            }
            // Use a raw SQL query to get just the user data without relationships
            const user = await this.userRepository.createQueryBuilder('user')
                .select([
                'user.id',
                'user.email',
                'user.role',
                'user.organizationId',
                'user.tenantId',
                'user.isActive'
            ])
                .where('user.id = :id', { id: payload.sub })
                .getOne();
            if (!user) {
                this.logger.warn(`User not found with ID: ${payload.sub}`);
                throw new common_1.UnauthorizedException('User not found');
            }
            // Make sure organization ID from token is properly passed through
            const organizationId = payload.organizationId || user.organizationId;
            // Log for debugging
            this.logger.debug(`User authenticated: ${user.id}, Organization: ${organizationId}`);
            // Return user data with explicit properties
            return {
                id: user.id,
                email: user.email,
                role: user.role,
                tenantId: payload.tenantId || user.tenantId,
                organizationId: organizationId,
                isActive: user.isActive
            };
        }
        catch (error) {
            this.logger.error(`JWT validation error: ${error.message}`);
            throw new common_1.UnauthorizedException(error.message || 'Invalid token');
        }
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map