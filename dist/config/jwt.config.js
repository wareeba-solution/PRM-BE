"use strict";
// src/config/jwt.config.ts
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
exports.jwtModuleConfig = exports.jwtConfigValidationSchema = void 0;
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
exports.jwtConfigValidationSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXP: Joi.number().default(3600),
    JWT_ACCESS_TOKEN_ALG: Joi.string().default('HS256'),
    JWT_ACCESS_TOKEN_ISSUER: Joi.string().default('prm-api'),
    JWT_ACCESS_TOKEN_AUDIENCE: Joi.string().default('prm-client'),
    JWT_REFRESH_TOKEN_EXP: Joi.number().default(604800),
    JWT_REFRESH_TOKEN_ALG: Joi.string().default('HS256'),
    JWT_REFRESH_TOKEN_ISSUER: Joi.string().default('prm-api'),
    JWT_REFRESH_TOKEN_AUDIENCE: Joi.string().default('prm-client'),
    JWT_IGNORE_EXPIRATION: Joi.boolean().default(false),
    JWT_IGNORE_NOT_BEFORE: Joi.boolean().default(false),
});
exports.default = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    accessToken: {
        expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXP || '3600', 10),
        algorithm: process.env.JWT_ACCESS_TOKEN_ALG || 'HS256',
        issuer: process.env.JWT_ACCESS_TOKEN_ISSUER || 'prm-api',
        audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE || 'prm-client',
    },
    refreshToken: {
        expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXP || '604800', 10),
        algorithm: process.env.JWT_REFRESH_TOKEN_ALG || 'HS256',
        issuer: process.env.JWT_REFRESH_TOKEN_ISSUER || 'prm-api',
        audience: process.env.JWT_REFRESH_TOKEN_AUDIENCE || 'prm-client',
    },
    verifyOptions: {
        ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true',
        ignoreNotBefore: process.env.JWT_IGNORE_NOT_BEFORE === 'true',
    },
}));
// JWT Module async configuration
exports.jwtModuleConfig = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP || '1h',
        algorithm: process.env.JWT_ACCESS_TOKEN_ALG || 'HS256',
        issuer: process.env.JWT_ACCESS_TOKEN_ISSUER || 'prm-api',
        audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE || 'prm-client',
    },
    verifyOptions: {
        ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true',
        ignoreNotBefore: process.env.JWT_IGNORE_NOT_BEFORE === 'true',
    },
};
// Example .env file:
/*
JWT_SECRET=your-super-secret-key-here
JWT_ACCESS_TOKEN_EXP=3600
JWT_ACCESS_TOKEN_ALG=HS256
JWT_ACCESS_TOKEN_ISSUER=prm-api
JWT_ACCESS_TOKEN_AUDIENCE=prm-client
JWT_REFRESH_TOKEN_EXP=604800
JWT_REFRESH_TOKEN_ALG=HS256
JWT_REFRESH_TOKEN_ISSUER=prm-api
JWT_REFRESH_TOKEN_AUDIENCE=prm-client
JWT_IGNORE_EXPIRATION=false
JWT_IGNORE_NOT_BEFORE=false
*/ 
//# sourceMappingURL=jwt.config.js.map