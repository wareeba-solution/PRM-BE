import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
export const redisConfigValidationSchema = Joi.object({
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().allow('').optional(),
    REDIS_DB: Joi.number().default(0),
    REDIS_KEY_PREFIX: Joi.string().default('prm:'),
    REDIS_CONNECTION_TIMEOUT: Joi.number().default(10000),
    REDIS_MAX_RETRIES: Joi.number().default(10),
    REDIS_RETRY_MAX_DELAY: Joi.number().default(5000),
    REDIS_CACHE_TTL: Joi.number().default(3600),
    REDIS_CACHE_MAX: Joi.number().default(10000),
    REDIS_CLUSTER_ENABLED: Joi.boolean().default(false),
    REDIS_CLUSTER_NODES: Joi.string().when('REDIS_CLUSTER_ENABLED', {
        is: true,
        then: Joi.required(),
    }),
});
const redisConfig = registerAs('redis', () => {
    var _a;
    return ({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0', 10),
        keyPrefix: process.env.REDIS_KEY_PREFIX || 'prm:',
        connectTimeout: parseInt(process.env.REDIS_CONNECTION_TIMEOUT || '10000', 10),
        maxRetriesPerRequest: parseInt(process.env.REDIS_MAX_RETRIES || '10', 10),
        retryStrategy: {
            retries: parseInt(process.env.REDIS_MAX_RETRIES || '10', 10),
            maxDelay: parseInt(process.env.REDIS_RETRY_MAX_DELAY || '5000', 10),
        },
        cache: {
            cacheTtl: parseInt(process.env.REDIS_CACHE_TTL || '3600', 10),
            max: parseInt(process.env.REDIS_CACHE_MAX || '10000', 10),
        },
        cluster: {
            enabled: process.env.REDIS_CLUSTER_ENABLED === 'true',
            nodes: (_a = process.env.REDIS_CLUSTER_NODES) === null || _a === void 0 ? void 0 : _a.split(','),
        },
    });
});
export default redisConfig;
export const getRedisConfig = () => {
    return redisConfig();
};
export const getRedisOptions = () => {
    const config = getRedisConfig();
    return {
        host: config.host,
        port: config.port,
        password: config.password,
        db: config.db,
        keyPrefix: config.keyPrefix,
        retryStrategy: (times) => {
            if (times > config.retryStrategy.retries) {
                return null;
            }
            return Math.min(times * 1000, config.retryStrategy.maxDelay);
        },
        maxRetriesPerRequest: config.maxRetriesPerRequest,
        connectTimeout: config.connectTimeout,
    };
};
export const getCacheConfig = () => {
    const config = getRedisConfig();
    const redisOptions = getRedisOptions();
    return {
        store: 'redis',
        host: redisOptions.host || 'localhost',
        port: redisOptions.port || 6379,
        password: redisOptions.password,
        db: redisOptions.db || 0,
        keyPrefix: redisOptions.keyPrefix || '',
        max: config.cache.max,
        ttlSeconds: config.cache.cacheTtl,
    };
};
export const redisKeys = {
    userSession: (userId) => `session:${userId}`,
    refreshToken: (tokenId) => `refresh:${tokenId}`,
    userPermissions: (userId) => `permissions:${userId}`,
    rateLimit: (key) => `ratelimit:${key}`,
    cache: (key) => `cache:${key}`,
    lock: (key) => `lock:${key}`,
};
//# sourceMappingURL=redis.config.js.map