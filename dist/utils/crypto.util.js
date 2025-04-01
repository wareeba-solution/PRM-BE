import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-encryption-key-min-32-chars';
const IV_LENGTH = 16;
const SALT_ROUNDS = 12;
export class CryptoUtil {
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }
    static async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
    static encrypt(text) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    static decrypt(text) {
        const [ivHex, encryptedHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    static async generateToken(length = 32) {
        const bytes = await randomBytes(length);
        return bytes.toString('hex');
    }
    static async generateRandomString(length = 16) {
        const bytes = await randomBytes(Math.ceil(length / 2));
        return bytes.toString('hex').slice(0, length);
    }
    static async hashData(data) {
        return bcrypt.hash(data, SALT_ROUNDS);
    }
    static generateTimedToken(data, expiryMinutes = 60) {
        const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
        const payload = `${data}:${expiryTime}`;
        return this.encrypt(payload);
    }
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
    static sha256(data) {
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }
    static generateHmac(data, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');
    }
    static verifyHmac(data, signature, secret) {
        const expectedSignature = this.generateHmac(data, secret);
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
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
//# sourceMappingURL=crypto.util.js.map