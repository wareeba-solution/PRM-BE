import { User } from './user.entity';
export declare enum SessionStatus {
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    REVOKED = "REVOKED",
    LOGGED_OUT = "LOGGED_OUT"
}
export declare class UserSession {
    id: string;
    userId: string;
    user: User;
    organizationId: string;
    token: string;
    refreshToken: string;
    status: SessionStatus;
    expiresAt: Date;
    lastActivityAt: Date;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
    deviceType: string;
    browser: string;
    operatingSystem: string;
    location: string;
    metadata: Record<string, any>;
    isMobile: boolean;
    isRemembered: boolean;
    revokedAt: Date;
    revokedBy: string;
    revokedReason: string;
    tokenRotationCount: number;
    lastTokenRotation: Date;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Check if session is expired
     */
    isExpired(): boolean;
    /**
     * Check if session is active
     */
    isActive(): boolean;
    /**
     * Check if session can be extended
     */
    canBeExtended(): boolean;
    /**
     * Check if session requires rotation
     */
    requiresRotation(): boolean;
    /**
     * Extend session expiry
     */
    extend(duration: number): void;
    /**
     * Update last activity
     */
    updateActivity(): void;
    /**
     * Revoke session
     */
    revoke(revokedBy: string, reason?: string): void;
    /**
     * Mark session as logged out
     */
    logout(): void;
    /**
     * Check if session is from same IP
     */
    isSameIp(ip: string): boolean;
    /**
     * Check if session is from same device
     */
    isSameDevice(deviceId: string): boolean;
}
