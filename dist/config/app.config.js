"use strict";
// src/config/app.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigValidationSchema = void 0;
var config_1 = require("@nestjs/config");
var Joi = require("joi");
exports.appConfigValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    APP_NAME: Joi.string().default('Patient Relationship Manager'),
    APP_HOST: Joi.string().default('localhost'),
    APP_PORT: Joi.number().default(3000),
    API_PREFIX: Joi.string().default('api'),
    API_VERSION: Joi.string().default('v1'),
    FRONTEND_URL: Joi.string().required(),
    DOCS_ENABLED: Joi.boolean().default(true),
    RATE_LIMIT_TTL: Joi.number().default(60),
    RATE_LIMIT_MAX: Joi.number().default(100),
    CORS_ENABLED: Joi.boolean().default(true),
    CORS_ORIGINS: Joi.string().default('*'),
    LOG_LEVEL: Joi.string()
        .valid('error', 'warn', 'info', 'debug', 'verbose')
        .default('info'),
    LOG_CONSOLE: Joi.boolean().default(true),
    LOG_FILE: Joi.boolean().default(false),
});
exports.default = (0, config_1.registerAs)('app', function () {
    var _a;
    return ({
        nodeEnv: process.env.NODE_ENV || 'development',
        name: process.env.APP_NAME || 'Patient Relationship Manager',
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT || '3000', 10),
        apiPrefix: process.env.API_PREFIX || 'api',
        apiVersion: process.env.API_VERSION || 'v1',
        frontendUrl: process.env.FRONTEND_URL,
        docsEnabled: process.env.DOCS_ENABLED === 'true',
        rateLimiting: {
            ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
            limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
        },
        cors: {
            enabled: process.env.CORS_ENABLED === 'true',
            origins: ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['*'],
        },
        logging: {
            level: process.env.LOG_LEVEL || 'info',
            console: process.env.LOG_CONSOLE === 'true',
            file: process.env.LOG_FILE === 'true',
        },
    });
});
// Example .env file:
/*
NODE_ENV=development
APP_NAME=Patient Relationship Manager
APP_HOST=localhost
APP_PORT=3000
API_PREFIX=api
API_VERSION=v1
FRONTEND_URL=http://localhost:3001
DOCS_ENABLED=true
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
CORS_ENABLED=true
CORS_ORIGINS=http://localhost:3001,http://localhost:3002
LOG_LEVEL=debug
LOG_CONSOLE=true
LOG_FILE=true
*/
//# sourceMappingURL=app.config.js.map