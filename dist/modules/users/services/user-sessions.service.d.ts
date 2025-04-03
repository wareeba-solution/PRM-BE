import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserSession } from '../entities/user-session.entity';
import { User } from '../entities/user.entity';
export declare class UserSessionsService {
    private readonly sessionRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private readonly parser;
    constructor(sessionRepository: Repository<UserSession>, jwtService: JwtService, configService: ConfigService);
    /**
     * Create new user session
     */
    createSession(user: User, token: string, request: Request, options?: {
        isRemembered?: boolean;
        deviceId?: string;
        metadata?: Record<string, any>;
    }): Promise<UserSession>;
    /**
     * Validate session
     */
    validateSession(token: string): Promise<UserSession | null>;
    /**
     * Update session last activity
     */
    updateLastActivity(sessionId: string): Promise<void>;
    /**
     * Get active sessions for user
     */
    getUserActiveSessions(userId: string): Promise<UserSession[]>;
    /**
     * Revoke session
     */
    revokeSession(sessionId: string, revokedBy: string, reason?: string): Promise<void>;
    /**
     * Revoke all user sessions
     */
    revokeAllUserSessions(userId: string, revokedBy: string, reason?: string): Promise<void>;
    /**
     * Extend session
     */
    extendSession(sessionId: string): Promise<void>;
    /**
     * Clean up expired sessions
     */
    cleanupExpiredSessions(): Promise<number>;
    /**
     * Parse user agent string
     */
    private parseUserAgent;
    /**
     * Expire session
     */
    private expireSession;
}
