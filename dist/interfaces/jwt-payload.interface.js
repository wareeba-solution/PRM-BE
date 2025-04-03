"use strict";
// src/interfaces/jwt-payload.interface.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Example usage of interfaces:
/*
// Creating a JWT payload
const createJwtPayload = (user: User, sessionId: string): JwtPayload => ({
    sub: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
    permissions: user.permissions,
    sessionId,
    deviceId: generateDeviceId(),
});

// Creating a refresh token payload
const createRefreshTokenPayload = (
    userId: string,
    sessionId: string
): RefreshTokenPayload => ({
    jti: generateUuid(),
    sub: userId,
    sessionId,
    deviceId: generateDeviceId(),
});

// Token verification result
interface TokenVerificationResult {
    isValid: boolean;
    decoded?: DecodedToken;
    error?: string;
}
*/ 
//# sourceMappingURL=jwt-payload.interface.js.map