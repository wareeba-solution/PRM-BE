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
const user_settings_entity_1 = require("../../users/entities/user-settings.entity");
let AuthService = class AuthService {
    constructor(userRepository, refreshTokenRepository, organizationRepository, jwtService, usersService, configService, userSettingsRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.organizationRepository = organizationRepository;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.configService = configService;
        this.userSettingsRepository = userSettingsRepository;
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
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Verify organization subscription status
        const organization = await this.organizationRepository.findOne({
            where: { id: user.organizationId },
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
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        // Create organization
        const organization = new organization_entity_1.Organization();
        organization.name = registerDto.organization.name;
        organization.slug = this.generateSlug(registerDto.organization.name);
        organization.status = organization_entity_1.OrganizationStatus.ACTIVE;
        organization.isSubscriptionActive = true;
        organization.subscriptionTier = organization_entity_1.SubscriptionTier.FREE;
        organization.subscriptionExpiresAt = new Date();
        organization.subscriptionExpiresAt.setFullYear(organization.subscriptionExpiresAt.getFullYear() + 1);
        const savedOrganization = await this.organizationRepository.save(organization);
        // Create user
        const user = new user_entity_1.User();
        user.email = registerDto.user.email;
        user.password = await (0, bcrypt_1.hash)(registerDto.user.password, 10);
        user.firstName = registerDto.user.firstName;
        user.lastName = registerDto.user.lastName;
        user.role = registerDto.user.role || role_enum_1.Role.ADMIN;
        user.organizationId = savedOrganization.id;
        user.isActive = true;
        user.isEmailVerified = false;
        user.lastLoginAt = new Date();
        // System created
        const savedUser = await this.userRepository.save(user);
        // Create user settings
        const settings = new user_settings_entity_1.UserSettings();
        settings.userId = savedUser.id;
        settings.phone = registerDto.user.phone;
        settings.notificationPreferences = {
            email: true,
            sms: !!registerDto.user.phone,
            inApp: true,
            push: false
        };
        settings.metadata = {
            platform: this.extractPlatform(metadata.userAgent),
            browser: this.extractBrowser(metadata.userAgent),
            lastLoginIp: metadata.ip,
            lastUsed: new Date()
        };
        await this.userSettingsRepository.save(settings);
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
        return {
            accessToken,
            refreshToken: refreshToken.token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                role: savedUser.role,
                organizationId: savedOrganization.id,
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
        const refreshToken = new refresh_token_entity_1.RefreshToken();
        refreshToken.userId = userId;
        refreshToken.token = (0, uuid_1.v4)();
        refreshToken.expiresAt = new Date();
        refreshToken.expiresAt.setDate(refreshToken.expiresAt.getDate() + 7); // 7 days
        refreshToken.userAgent = metadata.userAgent;
        refreshToken.ipAddress = metadata.ip;
        refreshToken.isRevoked = false;
        refreshToken.createdAt = new Date();
        refreshToken.updatedAt = new Date();
        return this.refreshTokenRepository.save(refreshToken);
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
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    extractPlatform(userAgent) {
        if (userAgent.includes('Windows'))
            return 'windows';
        if (userAgent.includes('Mac'))
            return 'mac';
        if (userAgent.includes('Linux'))
            return 'linux';
        if (userAgent.includes('Android'))
            return 'android';
        if (userAgent.includes('iOS'))
            return 'ios';
        return 'unknown';
    }
    extractBrowser(userAgent) {
        if (userAgent.includes('Chrome'))
            return 'chrome';
        if (userAgent.includes('Firefox'))
            return 'firefox';
        if (userAgent.includes('Safari'))
            return 'safari';
        if (userAgent.includes('Edge'))
            return 'edge';
        if (userAgent.includes('Opera'))
            return 'opera';
        return 'unknown';
    }
    // Password reset methods
    async sendPasswordResetEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // Don't reveal that the user doesn't exist
            return;
        }
        // Generate reset token
        const resetToken = (0, uuid_1.v4)();
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // 1 hour expiry
        // Save reset token to user
        user.passwordResetToken = resetToken;
        user.passwordResetExpiresAt = resetTokenExpiry;
        await this.userRepository.save(user);
        // Send email with reset link
        // This would typically use a mail service
        console.log(`Password reset link: https://your-app.com/reset-password?token=${resetToken}`);
    }
    async changePassword(token, newPassword) {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: token },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
        if (user.passwordResetExpiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Reset token has expired');
        }
        // Update password
        user.password = await (0, bcrypt_1.hash)(newPassword, 10);
        user.passwordResetToken = null;
        user.passwordResetExpiresAt = null;
        await this.userRepository.save(user);
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
    __param(6, (0, typeorm_1.InjectRepository)(user_settings_entity_1.UserSettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map