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
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { compare, hash } from 'bcrypt';
import { Organization, OrganizationStatus } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { UsersService } from '../../users/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
let AuthService = class AuthService {
    constructor(userRepository, refreshTokenRepository, organizationRepository, jwtService, usersService, configService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.organizationRepository = organizationRepository;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.configService = configService;
    }
    isTokenBlacklisted(token) {
        return false;
    }
    get requireEmailVerification() {
        var _a, _b;
        const requireVerification = (_b = (_a = this.configService) === null || _a === void 0 ? void 0 : _a.get('EMAIL_VERIFICATION_REQUIRED')) !== null && _b !== void 0 ? _b : true;
        return requireVerification;
    }
    async checkOrganizationAccess(userId, organizationId) {
        const user = await this.usersService.findById(userId);
        return (user === null || user === void 0 ? void 0 : user.organizationId) === organizationId;
    }
    async getUserPermissions(userId) {
        return ['permission1', 'permission2'];
    }
    async checkResourceOwnership(userId, resourceId, resourceType) {
        return true;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['organization'],
        });
        if (user && (await compare(password, user.password))) {
            const { password: _password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(loginDto, metadata) {
        var _a;
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const organization = await this.organizationRepository.findOne({
            where: { id: (_a = user.organization) === null || _a === void 0 ? void 0 : _a.id },
        });
        if (!organization) {
            throw new UnauthorizedException('Organization not found');
        }
        if (!organization.isSubscriptionActive) {
            throw new UnauthorizedException('Organization subscription is inactive');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            organizationId: organization.id,
            permissions: [],
            sessionId: uuidv4(),
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
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.user.email },
        });
        if (existingUser) {
            throw new UnauthorizedException('Email already registered');
        }
        const organization = new Organization();
        organization.name = registerDto.organization.name;
        organization.status = OrganizationStatus.ACTIVE;
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
        organization.slug = this.generateSlug(registerDto.organization.name);
        const savedOrganization = await this.organizationRepository.save(organization);
        const hashedPassword = await hash(registerDto.user.password, 10);
        const user = new User();
        user.firstName = registerDto.user.firstName;
        user.lastName = registerDto.user.lastName;
        user.email = registerDto.user.email;
        user.password = hashedPassword;
        user.role = registerDto.user.role || Role.ADMIN;
        user.organizationId = savedOrganization.id;
        user.createdById = savedOrganization.id;
        if (registerDto.user.phone) {
            user.phoneNumber = registerDto.user.phone;
        }
        const savedUser = await this.userRepository.save(user);
        savedOrganization.createdById = savedUser.id;
        await this.organizationRepository.save(savedOrganization);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            role: savedUser.role,
            organizationId: savedOrganization.id,
            permissions: [],
            sessionId: uuidv4(),
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.generateRefreshToken(savedUser.id, metadata);
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
            throw new UnauthorizedException('Invalid refresh token');
        }
        refreshToken.updateLastUsed();
        await this.refreshTokenRepository.save(refreshToken);
        const user = await this.userRepository.findOne({
            where: { id: refreshToken.userId }
        });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const payload = {
            sub: refreshToken.userId,
            email: user.email,
            role: user.role,
            organizationId: refreshToken.organizationId || user.organizationId,
            permissions: [],
            sessionId: uuidv4(),
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async generateRefreshToken(userId, metadata) {
        const tokenString = uuidv4();
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const token = new RefreshToken();
        token.userId = userId;
        token.organizationId = user.organizationId;
        token.token = tokenString;
        token.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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
    async sendPasswordResetEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return;
        }
    }
    async changePassword(token, newPassword) {
    }
    async confirmEmail(token) {
    }
    async sendVerificationEmail(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __param(1, InjectRepository(RefreshToken)),
    __param(2, InjectRepository(Organization)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        JwtService,
        UsersService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map