"use strict";
// src/utils/crypto.util.ts
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
const crypto = __importStar(require("crypto"));
const bcrypt = __importStar(require("bcrypt"));
const util_1 = require("util");
const randomBytes = (0, util_1.promisify)(crypto.randomBytes);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-encryption-key-min-32-chars';
const IV_LENGTH = 16;
const SALT_ROUNDS = 12;
class CryptoUtil {
    /**
     * Hash a password using bcrypt
     */
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }
    /**
     * Compare a password with its hash
     */
    static async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    /**
     * Encrypt sensitive data
     */
    static encrypt(text) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    /**
     * Decrypt encrypted data
     */
    static decrypt(text) {
        const [ivHex, encryptedHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    /**
     * Generate a random token
     */
    static async generateToken(length = 32) {
        const bytes = await randomBytes(length);
        return bytes.toString('hex');
    }
    /**
     * Generate a secure random string
     */
    static async generateRandomString(length = 16) {
        const bytes = await randomBytes(Math.ceil(length / 2));
        return bytes.toString('hex').slice(0, length);
    }
    /**
     * Hash sensitive data for storage (one-way)
     */
    static async hashData(data) {
        return bcrypt.hash(data, SALT_ROUNDS);
    }
    /**
     * Generate a time-based token that expires
     */
    static generateTimedToken(data, expiryMinutes = 60) {
        const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
        const payload = `${data}:${expiryTime}`;
        return this.encrypt(payload);
    }
    /**
     * Verify a time-based token
     */
    static verifyTimedToken(token) {
        try {
            const decrypted = this.decrypt(token);
            const [data, expiryTime] = decrypted.split(':');
            const isValid = parseInt(expiryTime) > Date.now();
            return {
                isValid,
                data: isValid ? data : undefined
            };
        }
        catch (error) {
            return { isValid: false };
        }
    }
    /**
     * Hash data with SHA-256
     */
    static sha256(data) {
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }
    /**
     * Generate HMAC signature
     */
    static generateHmac(data, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');
    }
    /**
     * Verify HMAC signature
     */
    static verifyHmac(data, signature, secret) {
        const expectedSignature = this.generateHmac(data, secret);
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
    /**
     * Generate a cryptographically secure random number within a range
     */
    static getRandomNumber(min, max) {
        const range = max - min + 1;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const maxNum = Math.pow(256, bytesNeeded);
        const maxValidNum = maxNum - (maxNum % range);
        let randomNum;
        do {
            randomNum = parseInt(crypto.randomBytes(bytesNeeded).toString('hex'), 16);
        } while (randomNum >= maxValidNum);
        return min + (randomNum % range);
    }
}
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map