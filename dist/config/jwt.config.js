import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
export const jwtConfigValidationSchema = Joi.object({
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
export default registerAs('jwt', () => ({
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
export const jwtModuleConfig = {
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
//# sourceMappingURL=jwt.config.js.map