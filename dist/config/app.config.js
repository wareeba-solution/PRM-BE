import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
export const appConfigValidationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    APP_NAME: Joi.string().default('Patient Relationship Manager'),
    APP_HOST: Joi.string().default('localhost'),
    APP_PORT: Joi.number().default(3000),
    API_PREFIX: Joi.string().default('api'),
    API_VERSION: Joi.string().default('v1'),
    FRONTEND_URL: Joi.string().required().messages({
        'any.required': 'FRONTEND_URL is required.',
    }),
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
    LOG_DIRECTORY: Joi.string().default('./logs'),
    REDIS_ENABLED: Joi.boolean().default(false),
});
export default registerAs('app', () => {
    var _a;
    const validatedConfig = appConfigValidationSchema.validate(process.env);
    if (validatedConfig.error) {
        throw new Error(`Config validation error: ${validatedConfig.error.message}`);
    }
    const config = validatedConfig.value;
    return {
        nodeEnv: config.NODE_ENV,
        name: config.APP_NAME,
        host: config.APP_HOST,
        port: parseInt(config.APP_PORT, 10),
        apiPrefix: config.API_PREFIX,
        apiVersion: config.API_VERSION,
        frontendUrl: config.FRONTEND_URL,
        docsEnabled: config.DOCS_ENABLED,
        rateLimiting: {
            ttl: parseInt(config.RATE_LIMIT_TTL, 10),
            limit: parseInt(config.RATE_LIMIT_MAX, 10),
        },
        cors: {
            enabled: config.CORS_ENABLED,
            origins: ((_a = config.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['*'],
        },
        logging: {
            level: config.LOG_LEVEL,
            console: config.LOG_CONSOLE,
            file: config.LOG_FILE,
            logDirectory: config.LOG_DIRECTORY,
        },
        redisEnabled: config.REDIS_ENABLED,
    };
});
//# sourceMappingURL=app.config.js.map