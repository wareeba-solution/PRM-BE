export declare class LoginDto {
    email: string;
    password: string;
    rememberMe?: boolean;
    tenantId?: string;
    organizationId?: string;
    deviceId?: string;
    domain?: string;
    subdomain?: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: User information
 *         token:
 *           type: string
 *           description: JWT access token
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *         expiresIn:
 *           type: number
 *           description: Token expiration time in seconds
 *         tenantId:
 *           type: string
 *           description: ID of the tenant the user belongs to
 */
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        tenantId: string;
        organizationId: string;
        isEmailVerified: boolean;
        lastLoginAt?: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
    organization: {
        id: string;
        name: string;
        slug: string;
        status: string;
        subscriptionTier: string;
        isSubscriptionActive: boolean;
        logo?: string;
    };
    availableOrganizations?: Array<{
        id: string;
        name: string;
        slug: string;
        role: string;
    }>;
}
export interface LoginMetadata {
    userAgent: string;
    ip: string;
    deviceId?: string;
    lastLogin?: Date;
    loginAttempts?: number;
}
