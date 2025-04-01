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
var UserSessionsService_1;
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserSession, SessionStatus } from '../entities/user-session.entity';
import * as UAParser from 'ua-parser-js';
let UserSessionsService = UserSessionsService_1 = class UserSessionsService {
    constructor(sessionRepository, jwtService, configService) {
        this.sessionRepository = sessionRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new Logger(UserSessionsService_1.name);
        this.parser = new UAParser.UAParser();
    }
    async createSession(user, token, request, options = {}) {
        try {
            const deviceInfo = this.parseUserAgent(request.headers['user-agent']);
            const payload = this.jwtService.decode(token);
            const expiresAt = new Date(payload['exp'] * 1000);
            const session = this.sessionRepository.create({
                userId: user.id,
                organizationId: user.organizationId,
                token,
                status: SessionStatus.ACTIVE,
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
    async validateSession(token) {
        try {
            const session = await this.sessionRepository.findOne({
                where: { token }
            });
            if (!session) {
                return null;
            }
            if (session.status !== SessionStatus.ACTIVE) {
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
    async updateLastActivity(sessionId) {
        await this.sessionRepository.update(sessionId, {
            lastActivityAt: new Date()
        });
    }
    async getUserActiveSessions(userId) {
        return this.sessionRepository.find({
            where: {
                userId,
                status: SessionStatus.ACTIVE,
                expiresAt: LessThan(new Date())
            },
            order: {
                lastActivityAt: 'DESC'
            }
        });
    }
    async revokeSession(sessionId, revokedBy, reason) {
        const session = await this.sessionRepository.findOne({
            where: { id: sessionId }
        });
        if (!session) {
            throw new UnauthorizedException('Session not found');
        }
        if (session.status !== SessionStatus.ACTIVE) {
            throw new UnauthorizedException('Session is not active');
        }
        session.revoke(revokedBy, reason);
        await this.sessionRepository.save(session);
    }
    async revokeAllUserSessions(userId, revokedBy, reason) {
        const sessions = await this.getUserActiveSessions(userId);
        for (const session of sessions) {
            session.revoke(revokedBy, reason);
        }
        await this.sessionRepository.save(sessions);
    }
    async extendSession(sessionId) {
        const session = await this.sessionRepository.findOne({
            where: { id: sessionId }
        });
        if (!session) {
            throw new UnauthorizedException('Session not found');
        }
        if (!session.canBeExtended()) {
            throw new UnauthorizedException('Session cannot be extended');
        }
        const extensionDuration = 24 * 60 * 60 * 1000;
        session.extend(extensionDuration);
        await this.sessionRepository.save(session);
    }
    async cleanupExpiredSessions() {
        try {
            const result = await this.sessionRepository
                .createQueryBuilder()
                .update()
                .set({ status: SessionStatus.EXPIRED })
                .where('status = :status', { status: SessionStatus.ACTIVE })
                .andWhere('expiresAt <= :now', { now: new Date() })
                .execute();
            return result.affected || 0;
        }
        catch (error) {
            this.logger.error('Error cleaning up expired sessions:', error);
            return 0;
        }
    }
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
    async expireSession(sessionId) {
        await this.sessionRepository.update(sessionId, {
            status: SessionStatus.EXPIRED
        });
    }
};
UserSessionsService = UserSessionsService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(UserSession)),
    __metadata("design:paramtypes", [Repository,
        JwtService,
        ConfigService])
], UserSessionsService);
export { UserSessionsService };
//# sourceMappingURL=user-sessions.service.js.map