"use strict";
// src/utils/crypto.util.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
var crypto = require("crypto");
var bcrypt = require("bcrypt");
var util_1 = require("util");
var randomBytes = (0, util_1.promisify)(crypto.randomBytes);
var ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-encryption-key-min-32-chars';
var IV_LENGTH = 16;
var SALT_ROUNDS = 12;
var CryptoUtil = /** @class */ (function () {
    function CryptoUtil() {
    }
    /**
     * Hash a password using bcrypt
     */
    CryptoUtil.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(password, SALT_ROUNDS)];
            });
        });
    };
    /**
     * Compare a password with its hash
     */
    CryptoUtil.comparePassword = function (password, hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.compare(password, hash)];
            });
        });
    };
    /**
     * Encrypt sensitive data
     */
    CryptoUtil.encrypt = function (text) {
        var iv = crypto.randomBytes(IV_LENGTH);
        var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        var encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return "".concat(iv.toString('hex'), ":").concat(encrypted.toString('hex'));
    };
    /**
     * Decrypt encrypted data
     */
    CryptoUtil.decrypt = function (text) {
        var _a = text.split(':'), ivHex = _a[0], encryptedHex = _a[1];
        var iv = Buffer.from(ivHex, 'hex');
        var encrypted = Buffer.from(encryptedHex, 'hex');
        var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        var decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
    /**
     * Generate a random token
     */
    CryptoUtil.generateToken = function () {
        return __awaiter(this, arguments, void 0, function (length) {
            var bytes;
            if (length === void 0) { length = 32; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, randomBytes(length)];
                    case 1:
                        bytes = _a.sent();
                        return [2 /*return*/, bytes.toString('hex')];
                }
            });
        });
    };
    /**
     * Generate a secure random string
     */
    CryptoUtil.generateRandomString = function () {
        return __awaiter(this, arguments, void 0, function (length) {
            var bytes;
            if (length === void 0) { length = 16; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, randomBytes(Math.ceil(length / 2))];
                    case 1:
                        bytes = _a.sent();
                        return [2 /*return*/, bytes.toString('hex').slice(0, length)];
                }
            });
        });
    };
    /**
     * Hash sensitive data for storage (one-way)
     */
    CryptoUtil.hashData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(data, SALT_ROUNDS)];
            });
        });
    };
    /**
     * Generate a time-based token that expires
     */
    CryptoUtil.generateTimedToken = function (data, expiryMinutes) {
        if (expiryMinutes === void 0) { expiryMinutes = 60; }
        var expiryTime = Date.now() + expiryMinutes * 60 * 1000;
        var payload = "".concat(data, ":").concat(expiryTime);
        return this.encrypt(payload);
    };
    /**
     * Verify a time-based token
     */
    CryptoUtil.verifyTimedToken = function (token) {
        try {
            var decrypted = this.decrypt(token);
            var _a = decrypted.split(':'), data = _a[0], expiryTime = _a[1];
            var isValid = parseInt(expiryTime) > Date.now();
            return {
                isValid: isValid,
                data: isValid ? data : undefined
            };
        }
        catch (error) {
            return { isValid: false };
        }
    };
    /**
     * Hash data with SHA-256
     */
    CryptoUtil.sha256 = function (data) {
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    };
    /**
     * Generate HMAC signature
     */
    CryptoUtil.generateHmac = function (data, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');
    };
    /**
     * Verify HMAC signature
     */
    CryptoUtil.verifyHmac = function (data, signature, secret) {
        var expectedSignature = this.generateHmac(data, secret);
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    };
    /**
     * Generate a cryptographically secure random number within a range
     */
    CryptoUtil.getRandomNumber = function (min, max) {
        var range = max - min + 1;
        var bytesNeeded = Math.ceil(Math.log2(range) / 8);
        var maxNum = Math.pow(256, bytesNeeded);
        var maxValidNum = maxNum - (maxNum % range);
        var randomNum;
        do {
            randomNum = parseInt(crypto.randomBytes(bytesNeeded).toString('hex'), 16);
        } while (randomNum >= maxValidNum);
        return min + (randomNum % range);
    };
    return CryptoUtil;
}());
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map