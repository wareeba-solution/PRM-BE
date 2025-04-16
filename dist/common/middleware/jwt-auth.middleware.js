"use strict";
// src/common/middleware/jwt-auth.middleware.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../../modules/users/services/users.service");
let JwtAuthMiddleware = JwtAuthMiddleware_1 = class JwtAuthMiddleware {
    constructor(jwtService, configService, usersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(JwtAuthMiddleware_1.name);
    }
    async use(req, res, next) {
        this.logger.debug(`JWT middleware running for: ${req.method} ${req.url}`);
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const payload = this.jwtService.verify(token, {
                    secret: this.configService.get('jwt.secret')
                });
                if (payload && payload.sub) {
                    // Get user from database - pass the organizationId as the second argument
                    // Check if your findOne method requires a second parameter
                    const user = await this.usersService.findOne(payload.sub, payload.organizationId || undefined);
                    if (user) {
                        // Attach user and other data to request
                        req.user = user;
                        if (payload.organizationId) {
                            req.user.organizationId = payload.organizationId;
                        }
                        if (payload.tenantId) {
                            req.user.tenantId = payload.tenantId;
                        }
                        this.logger.debug(`User authenticated: ${user.id}, Organization: ${payload.organizationId || 'none'}`);
                    }
                }
            }
            catch (error) {
                this.logger.warn(`JWT validation failed: ${error.message}`);
                // Don't throw an error, just continue without a user
            }
        }
        next();
    }
};
JwtAuthMiddleware = JwtAuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], JwtAuthMiddleware);
exports.JwtAuthMiddleware = JwtAuthMiddleware;
//# sourceMappingURL=jwt-auth.middleware.js.map