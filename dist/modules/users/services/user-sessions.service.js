"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserSessionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_session_entity_1 = require("../entities/user-session.entity");
const UAParser = __importStar(require("ua-parser-js"));
let UserSessionsService = UserSessionsService_1 = class UserSessionsService {
    constructor(sessionRepository, jwtService, configService) {
        this.sessionRepository = sessionRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(UserSessionsService_1.name);
        this.parser = new UAParser.UAParser();
    }
    /**
     * Create new user session
     */
    async createSession(user, token, request, options = {}) {
        try {
            // Parse user agent info
            const deviceInfo = this.parseUserAgent(request.headers['user-agent']);
            // Get token expiration from payload
            const payload = this.jwtService.decode(token);
            const expiresAt = new Date(payload['exp'] * 1000);
            const session = this.sessionRepository.create({
                userId: user.id,
                organizationId: user.organizationId,
                token,
                status: user_session_entity_1.SessionStatus.ACTIVE,
                expiresAt,
                ipAddress: request.ip,
                userAgent: request.headers['user-agent'],
                deviceId: options.deviceId,
                deviceType: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                operatingSystem: deviceInfo.os,
                isMobile: deviceInfo.isMobile,
                isRemembered: options.isRemembered || false,
                metadata: options.metadata,
                lastActivityAt: new Date(),
            });
            return this.sessionRepository.save(session);
        }
        catch (error) {
            this.logger.error('Error creating session:', error);
            throw error;
        }
    }
    /**
     * Validate session
     */
    async validateSession(token) {
        try {
            const session = await this.sessionRepository.findOne({
                where: { token }
            });
            if (!session) {
                return null;
            }
            if (session.status !== user_session_entity_1.SessionStatus.ACTIVE) {
                return null;
            }
            if (session.isExpired()) {
                await this.expireSession(session.id);
                return null;
            }
            return session;
        }
        catch (error) {
            this.logger.error('Error validating session:', error);
            return null;
        }
    }
    /**
     * Update session last activity
     */
    async updateLastActivity(sessionId) {
        await this.sessionRepository.update(sessionId, {
            lastActivityAt: new Date()
        });
    }
    /**
     * Get active sessions for user
     */
    async getUserActiveSessions(userId) {
        return this.sessionRepository.find({
            where: {
                userId,
                status: user_session_entity_1.SessionStatus.ACTIVE,
                expiresAt: (0, typeorm_2.LessThan)(new Date())
            },
            order: {
                lastActivityAt: 'DESC'
            }
        });
    }
    /**
     * Revoke session
     */
    async revokeSession(sessionId, revokedBy, reason) {
        const session = await this.sessionRepository.findOne({
            where: { id: sessionId }
        });
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        if (session.status !== user_session_entity_1.SessionStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Session is not active');
        }
        session.revoke(revokedBy, reason);
        await this.sessionRepository.save(session);
    }
    /**
     * Revoke all user sessions
     */
    async revokeAllUserSessions(userId, revokedBy, reason) {
        const sessions = await this.getUserActiveSessions(userId);
        for (const session of sessions) {
            session.revoke(revokedBy, reason);
        }
        await this.sessionRepository.save(sessions);
    }
    /**
     * Extend session
     */
    async extendSession(sessionId) {
        const session = await this.sessionRepository.findOne({
            where: { id: sessionId }
        });
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        if (!session.canBeExtended()) {
            throw new common_1.UnauthorizedException('Session cannot be extended');
        }
        // Extend for 24 hours
        const extensionDuration = 24 * 60 * 60 * 1000;
        session.extend(extensionDuration);
        await this.sessionRepository.save(session);
    }
    /**
     * Clean up expired sessions
     */
    async cleanupExpiredSessions() {
        try {
            const result = await this.sessionRepository
                .createQueryBuilder()
                .update()
                .set({ status: user_session_entity_1.SessionStatus.EXPIRED })
                .where('status = :status', { status: user_session_entity_1.SessionStatus.ACTIVE })
                .andWhere('expiresAt <= :now', { now: new Date() })
                .execute();
            return result.affected || 0;
        }
        catch (error) {
            this.logger.error('Error cleaning up expired sessions:', error);
            return 0;
        }
    }
    /**
     * Parse user agent string
     */
    parseUserAgent(userAgent) {
        if (!userAgent) {
            return {
                browser: 'unknown',
                os: 'unknown',
                deviceType: 'unknown',
                isMobile: false
            };
        }
        this.parser.setUA(userAgent);
        const result = this.parser.getResult();
        return {
            browser: `${result.browser.name || ''} ${result.browser.version || ''}`.trim() || 'unknown',
            os: `${result.os.name || ''} ${result.os.version || ''}`.trim() || 'unknown',
            deviceType: result.device.type || 'desktop',
            isMobile: result.device.type === 'mobile' || result.device.type === 'tablet'
        };
    }
    /**
     * Expire session
     */
    async expireSession(sessionId) {
        await this.sessionRepository.update(sessionId, {
            status: user_session_entity_1.SessionStatus.EXPIRED
        });
    }
};
UserSessionsService = UserSessionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_session_entity_1.UserSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserSessionsService);
exports.UserSessionsService = UserSessionsService;
//# sourceMappingURL=user-sessions.service.js.map