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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
const bcrypt_1 = require("bcrypt");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const users_service_1 = require("../../users/services/users.service");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, refreshTokenRepository, organizationRepository, jwtService, usersService, configService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.organizationRepository = organizationRepository;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.configService = configService;
    }
    /**
     * Checks if a token has been blacklisted
     * @param token The JWT token to check
     * @returns boolean True if the token is blacklisted, false otherwise
     */
    isTokenBlacklisted(token) {
        // In a real implementation, you would:
        // 1. Either check a cache (Redis) or database table for blacklisted tokens
        // 2. Or verify against a token revocation list
        // For now, return false as a placeholder
        // You can implement token blacklisting using the refresh token repository
        // by checking if there's a revoked token matching this one
        // Example implementation (uncomment and adapt when you have the proper setup):
        /*
        try {
          const decodedToken = this.jwtService.decode(token) as JwtPayload;
          if (!decodedToken || !decodedToken.sessionId) {
            return false;
          }
          
          // Check if a refresh token with this session ID has been revoked
          const revokedToken = this.refreshTokenRepository.findOne({
            where: {
              sessionId: decodedToken.sessionId,
              isRevoked: true
            }
          });
          
          return !!revokedToken;
        } catch (error) {
          // If we can't decode the token, assume it's not blacklisted
          return false;
        }
        */
        return false;
    }
    /**
     * Determines if email verification is required
     * @returns boolean True if email verification is required, false otherwise
     */
    get requireEmailVerification() {
        var _a, _b;
        // Read this from your application config
        // You might want different settings for different environments
        const requireVerification = (_b = (_a = this.configService) === null || _a === void 0 ? void 0 : _a.get('EMAIL_VERIFICATION_REQUIRED')) !== null && _b !== void 0 ? _b : true;
        return requireVerification;
    }
    async checkOrganizationAccess(userId, organizationId) {
        // Check if the user has access to the organization
        const user = await this.usersService.findById(userId);
        return (user === null || user === void 0 ? void 0 : user.organizationId) === organizationId;
    }
    async getUserPermissions(userId) {
        // Implement the logic to get user permissions
        // This is a placeholder implementation
        return ['permission1', 'permission2'];
    }
    async checkResourceOwnership(userId, resourceId, resourceType) {
        // Implement the logic to check resource ownership
        // For example, query the database to verify ownership
        return true; // or false based on the check
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['organization'],
        });
        if (user && (await (0, bcrypt_1.compare)(password, user.password))) {
            // Use destructuring to exclude the password field
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(loginDto, metadata) {
        var _a;
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Verify organization subscription status
        const organization = await this.organizationRepository.findOne({
            where: { id: (_a = user.organization) === null || _a === void 0 ? void 0 : _a.id },
        });
        if (!organization) {
            throw new common_1.UnauthorizedException('Organization not found');
        }
        if (!organization.isSubscriptionActive) {
            throw new common_1.UnauthorizedException('Organization subscription is inactive');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            organizationId: organization.id,
            permissions: [],
            sessionId: (0, uuid_1.v4)(),
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.generateRefreshToken(user.id, metadata);
        return {
            accessToken,
            refreshToken: refreshToken.token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                organizationId: organization.id,
            },
        };
    }
    async register(registerDto, metadata) {
        // Check if user with the same email already exists
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.user.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('Email already registered');
        }
        // Create organization first
        const organization = new organization_entity_1.Organization();
        organization.name = registerDto.organization.name;
        organization.status = organization_entity_1.OrganizationStatus.ACTIVE;
        organization.isSubscriptionActive = true;
        if (registerDto.organization.website) {
            organization.website = registerDto.organization.website;
        }
        if (registerDto.organization.phone) {
            organization.contactInfo = {
                phone: registerDto.organization.phone
            };
        }
        if (registerDto.organization.address) {
            organization.contactInfo = Object.assign(Object.assign({}, organization.contactInfo), { address: {
                    street: registerDto.organization.address.street,
                    city: registerDto.organization.address.city,
                    state: registerDto.organization.address.state,
                    postalCode: registerDto.organization.address.postalCode,
                    country: registerDto.organization.address.country,
                } });
        }
        // Generate a slug from the organization name
        organization.slug = this.generateSlug(registerDto.organization.name);
        const savedOrganization = await this.organizationRepository.save(organization);
        // Hash the password
        const hashedPassword = await (0, bcrypt_1.hash)(registerDto.user.password, 10);
        // Create the user
        const user = new user_entity_1.User();
        user.firstName = registerDto.user.firstName;
        user.lastName = registerDto.user.lastName;
        user.email = registerDto.user.email;
        user.password = hashedPassword;
        user.role = registerDto.user.role || role_enum_1.Role.ADMIN; // Default role for first user
        user.organizationId = savedOrganization.id;
        user.createdById = savedOrganization.id; // Temporary, will be updated later
        if (registerDto.user.phone) {
            user.phoneNumber = registerDto.user.phone;
        }
        const savedUser = await this.userRepository.save(user);
        // Update the organization's createdById to point to the user
        savedOrganization.createdById = savedUser.id;
        await this.organizationRepository.save(savedOrganization);
        // Generate tokens
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
            organizationId: savedOrganization.id,
            permissions: [],
            sessionId: (0, uuid_1.v4)(),
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.generateRefreshToken(savedUser.id, metadata);
        // Return response without exposing password
        return {
            accessToken,
            refreshToken: refreshToken.token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role,
                organizationId: savedOrganization.id,
            },
            organization: {
                id: savedOrganization.id,
                name: savedOrganization.name,
                status: savedOrganization.status,
            },
        };
    }
    async refreshToken(token) {
        const refreshToken = await this.refreshTokenRepository.findOne({
            where: { token },
            relations: ['user'],
        });
        if (!refreshToken || refreshToken.isExpired() || refreshToken.isRevoked) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        // Update last used timestamp
        refreshToken.updateLastUsed();
        await this.refreshTokenRepository.save(refreshToken);
        const user = await this.userRepository.findOne({
            where: { id: refreshToken.userId }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const payload = {
            sub: refreshToken.userId,
            email: user.email,
            role: user.role,
            organizationId: refreshToken.organizationId || user.organizationId,
            permissions: [],
            sessionId: (0, uuid_1.v4)(),
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async generateRefreshToken(userId, metadata) {
        // Create a unique token string
        const tokenString = (0, uuid_1.v4)();
        // Get the user to access the organization ID
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        // Create the refresh token entity
        const token = new refresh_token_entity_1.RefreshToken();
        token.userId = userId;
        token.organizationId = user.organizationId;
        token.token = tokenString;
        token.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        token.userAgent = metadata.userAgent;
        token.ipAddress = metadata.ip;
        token.metadata = {
            platform: this.extractPlatform(metadata.userAgent),
            browser: this.extractBrowser(metadata.userAgent),
            lastUsed: new Date(),
        };
        return this.refreshTokenRepository.save(token);
    }
    async logout(userId) {
        await this.refreshTokenRepository.update({ userId }, { isRevoked: true, revokedAt: new Date(), revokedReason: 'User logout' });
        return { message: 'Logged out successfully' };
    }
    async validateOrganizationAccess(userId, organizationId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['organization'],
        });
        return (user === null || user === void 0 ? void 0 : user.organizationId) === organizationId;
    }
    // Helper methods
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 50) + '-' + Math.floor(Math.random() * 10000);
    }
    extractPlatform(userAgent) {
        if (userAgent.includes('Windows'))
            return 'Windows';
        if (userAgent.includes('Mac'))
            return 'Mac';
        if (userAgent.includes('iPhone') || userAgent.includes('iPad'))
            return 'iOS';
        if (userAgent.includes('Android'))
            return 'Android';
        if (userAgent.includes('Linux'))
            return 'Linux';
        return 'Unknown';
    }
    extractBrowser(userAgent) {
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg'))
            return 'Chrome';
        if (userAgent.includes('Firefox'))
            return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
            return 'Safari';
        if (userAgent.includes('Edg'))
            return 'Edge';
        if (userAgent.includes('Opera') || userAgent.includes('OPR'))
            return 'Opera';
        return 'Unknown';
    }
    // Password reset methods
    async sendPasswordResetEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // Don't reveal if user exists for security
            return;
        }
        // Generate reset token, save it, and send email logic would go here
        // This is a placeholder implementation
    }
    async changePassword(token, newPassword) {
        // Validate token and update password logic would go here
        // This is a placeholder implementation
    }
    // Email verification methods
    async confirmEmail(token) {
        // Validate token and confirm email logic would go here
        // This is a placeholder implementation
    }
    async sendVerificationEmail(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        // Generate verification token, save it, and send email logic would go here
        // This is a placeholder implementation
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(2, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map