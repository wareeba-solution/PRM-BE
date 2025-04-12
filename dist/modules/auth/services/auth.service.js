"use strict";
// src/modules/auth/services/auth.service.ts
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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const config_1 = require("@nestjs/config");
const tenant_entity_1 = require("../../tenants/entities/tenant.entity");
const users_service_1 = require("../../users/services/users.service");
const tenants_service_1 = require("../../tenants/services/tenants.service");
const user_account_service_1 = require("./user-account.service");
const organizations_service_1 = require("../../organizations/services/organizations.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, refreshTokenRepository, organizationRepository, tenantRepository, jwtService, configService, usersService, tenantsService, userAccountService, organizationsService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.organizationRepository = organizationRepository;
        this.tenantRepository = tenantRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.tenantsService = tenantsService;
        this.userAccountService = userAccountService;
        this.organizationsService = organizationsService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(loginDto) {
        const { email, password, organizationId } = loginDto;
        // Find user by email and organization
        const user = await this.usersService.findByEmail(email, organizationId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Verify password
        const isValidPassword = await this.usersService.validatePassword(user, password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Check if user is active
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        // Get tenant ID from user or request
        const tenantId = user.tenantId || loginDto.tenantId;
        if (!tenantId) {
            throw new common_1.BadRequestException('Tenant ID is required for authentication');
        }
        // Generate tokens with tenantId included
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            tenantId: tenantId // Include tenant ID in token
        }, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            tenantId: tenantId // Include tenant ID in token
        }, { expiresIn: '7d' });
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600 // 1 hour in seconds
        };
    }
    async register(registerDto) {
        // Delegate registration to UserAccountService
        const result = await this.userAccountService.register(registerDto);
        // Generate tokens after successful registration
        return this.login({
            email: result.user.email,
            password: registerDto.user.password,
            organizationId: result.user.organizationId
        });
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            // Use tenantId from payload or from user
            const tenantId = payload.tenantId || user.tenantId;
            if (!tenantId) {
                throw new common_1.BadRequestException('Tenant ID is required for authentication');
            }
            const accessToken = this.jwtService.sign({
                sub: user.id,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
                tenantId: tenantId // Include tenant ID in token
            }, { expiresIn: '1h' });
            const newRefreshToken = this.jwtService.sign({
                sub: user.id,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
                tenantId: tenantId // Include tenant ID in token
            }, { expiresIn: '7d' });
            return {
                accessToken,
                refreshToken: newRefreshToken,
                expiresIn: 3600 // 1 hour in seconds
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async logout(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            await this.refreshTokenRepository.delete({ userId: payload.sub });
        }
        catch (error) {
            this.logger.error(`Error during logout: ${error.message}`);
        }
    }
    async checkOrganizationAccess(userId, organizationId) {
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id = :userId', { userId })
            .getOne();
        if (!user) {
            return false;
        }
        return user.organizationId === organizationId;
    }
    async getUserPermissions(userId) {
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id = :userId', { userId })
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const permissions = [];
        permissions.push('user:read');
        if (user.role === role_enum_1.Role.SUPER_ADMIN) {
            permissions.push('user:create', 'user:update', 'user:delete');
            permissions.push('organization:read', 'organization:update');
            permissions.push('billing:read', 'billing:update');
        }
        else if (user.role === role_enum_1.Role.ADMIN) {
            permissions.push('user:create', 'user:update');
            permissions.push('organization:read');
            permissions.push('billing:read');
        }
        return permissions;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
    extractPlatform(userAgent) {
        if (userAgent.includes('Windows'))
            return 'Windows';
        if (userAgent.includes('Mac'))
            return 'Mac';
        if (userAgent.includes('Linux'))
            return 'Linux';
        if (userAgent.includes('Android'))
            return 'Android';
        if (userAgent.includes('iOS'))
            return 'iOS';
        return 'Unknown';
    }
    extractBrowser(userAgent) {
        if (userAgent.includes('Chrome'))
            return 'Chrome';
        if (userAgent.includes('Firefox'))
            return 'Firefox';
        if (userAgent.includes('Safari'))
            return 'Safari';
        if (userAgent.includes('Edge'))
            return 'Edge';
        if (userAgent.includes('MSIE') || userAgent.includes('Trident/'))
            return 'Internet Explorer';
        return 'Unknown';
    }
    async forgotPassword(email, tenantId) {
        try {
            // Verify tenant exists and is active
            const tenant = await this.tenantsService.findOne(tenantId);
            if (!tenant || !tenant.isActive) {
                throw new common_1.UnauthorizedException('Invalid or inactive tenant');
            }
            // Find user within the tenant
            const user = await this.usersService.findByEmail(email, tenantId);
            if (!user) {
                // Don't reveal if user exists or not
                return { message: 'If an account exists, password reset instructions have been sent' };
            }
            // Generate and send reset token
            await this.usersService.sendPasswordResetEmail(user);
            return { message: 'Password reset instructions sent to email' };
        }
        catch (error) {
            this.logger.error('Forgot password error:', error);
            throw error;
        }
    }
    async resetPassword(token, newPassword, tenantId) {
        try {
            // Verify tenant exists and is active
            const tenant = await this.tenantsService.findOne(tenantId);
            if (!tenant || !tenant.isActive) {
                throw new common_1.UnauthorizedException('Invalid or inactive tenant');
            }
            // Reset password
            await this.usersService.resetPassword(token, newPassword);
            return { message: 'Password reset successful' };
        }
        catch (error) {
            this.logger.error('Reset password error:', error);
            throw error;
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(3, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService,
        tenants_service_1.TenantsService,
        user_account_service_1.UserAccountService,
        organizations_service_1.OrganizationsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map