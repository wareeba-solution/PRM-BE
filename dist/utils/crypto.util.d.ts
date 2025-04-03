export declare class CryptoUtil {
    /**
     * Hash a password using bcrypt
     */
    static hashPassword(password: string): Promise<string>;
    /**
     * Compare a password with its hash
     */
    static comparePassword(password: string, hash: string): Promise<boolean>;
    /**
     * Encrypt sensitive data
     */
    static encrypt(text: string): string;
    /**
     * Decrypt encrypted data
     */
    static decrypt(text: string): string;
    /**
     * Generate a random token
     */
    static generateToken(length?: number): Promise<string>;
    /**
     * Generate a secure random string
     */
    static generateRandomString(length?: number): Promise<string>;
    /**
     * Hash sensitive data for storage (one-way)
     */
    static hashData(data: string): Promise<string>;
    /**
     * Generate a time-based token that expires
     */
    static generateTimedToken(data: string, expiryMinutes?: number): string;
    /**
     * Verify a time-based token
     */
    static verifyTimedToken(token: string): {
        isValid: boolean;
        data?: string;
    };
    /**
     * Hash data with SHA-256
     */
    static sha256(data: string): string;
    /**
     * Generate HMAC signature
     */
    static generateHmac(data: string, secret: string): string;
    /**
     * Verify HMAC signature
     */
    static verifyHmac(data: string, signature: string, secret: string): boolean;
    /**
     * Generate a cryptographically secure random number within a range
     */
    static getRandomNumber(min: number, max: number): number;
}
