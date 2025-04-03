// src/config/app.config.ts

import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
    nodeEnv: string;
    name: string;
    host: string;
    port: number;
    apiPrefix: string;
    apiVersion: string;
    frontendUrl: string;
    docsEnabled: boolean;
    rateLimiting: {
        ttl: number;
        limit: number;
    };
    cors: {
        enabled: boolean;
        origins: string[];
    };
    logging: {
        level: string;
        console: boolean;
        file: boolean;
    };
}

export const appConfigValidationSchema = Joi.object({
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

export default registerAs('app', (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'Patient Relationship Manager',
    host: process.env.APP_HOST || 'localhost',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
    frontendUrl: process.env.FRONTEND_URL!,
    // Enable docs by default in non-production environments or if explicitly enabled
    docsEnabled: process.env.DOCS_ENABLED === 'true' || (process.env.NODE_ENV !== 'production'),
    rateLimiting: {
        ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
        limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
    cors: {
        enabled: process.env.CORS_ENABLED !== 'false', // Enable by default
        origins: process.env.CORS_ORIGINS?.split(',') || ['*'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_CONSOLE !== 'false', // Enable by default
        file: process.env.LOG_FILE === 'true',
    },
}));