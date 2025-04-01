import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfigValidationSchema = Joi.object({
    SWAGGER_ENABLED: Joi.boolean().default(true),
    SWAGGER_TITLE: Joi.string().default('Patient Relationship Manager API'),
    SWAGGER_DESCRIPTION: Joi.string().default('API documentation for PRM system'),
    SWAGGER_VERSION: Joi.string().default('1.0'),
    SWAGGER_PATH: Joi.string().default('api-docs'),
    SWAGGER_AUTH_ENABLED: Joi.boolean().default(true),
    SWAGGER_AUTH_USERNAME: Joi.string().when('SWAGGER_AUTH_ENABLED', {
        is: true,
        then: Joi.required(),
    }),
    SWAGGER_AUTH_PASSWORD: Joi.string().when('SWAGGER_AUTH_ENABLED', {
        is: true,
        then: Joi.required(),
    }),
});
const swaggerConfig = registerAs('swagger', () => ({
    enabled: process.env.SWAGGER_ENABLED === 'true',
    title: process.env.SWAGGER_TITLE || 'Patient Relationship Manager API',
    description: process.env.SWAGGER_DESCRIPTION || 'API documentation for PRM system',
    version: process.env.SWAGGER_VERSION || '1.0',
    path: process.env.SWAGGER_PATH || 'api-docs',
    auth: {
        enabled: process.env.SWAGGER_AUTH_ENABLED === 'true',
        username: process.env.SWAGGER_AUTH_USERNAME,
        password: process.env.SWAGGER_AUTH_PASSWORD,
    },
    tags: [
        'Auth',
        'Users',
        'Organizations',
        'Contacts',
        'Appointments',
        'Tickets',
        'Messages',
        'Notifications',
    ],
    servers: [
        {
            url: process.env.API_URL || 'http://localhost:3000',
            description: 'Development server',
        },
    ],
}));
export default swaggerConfig;
export const getSwaggerConfig = () => {
    return swaggerConfig();
};
export const createSwaggerDocument = () => {
    const config = getSwaggerConfig();
    const builder = new DocumentBuilder()
        .setTitle(config.title)
        .setDescription(config.description)
        .setVersion(config.version)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth');
    config.tags.forEach((tag) => {
        builder.addTag(tag);
    });
    config.servers.forEach((server) => {
        builder.addServer(server.url, server.description);
    });
    return builder.build();
};
export const swaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: true,
        displayRequestDuration: true,
        tryItOutEnabled: true,
    },
    customSiteTitle: 'PRM API Documentation',
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .information-container { padding: 20px }
        .swagger-ui .scheme-container { padding: 20px }
        .swagger-ui .opblock-tag { padding: 10px }
    `,
};
export const swaggerSecurityConfig = (app) => {
    const config = getSwaggerConfig();
    if (config.auth.enabled) {
        app.use(`/${config.path}`, (req, res, next) => {
            const auth = req.headers.authorization;
            if (!auth || auth.split(' ')[0] !== 'Basic') {
                res.setHeader('WWW-Authenticate', 'Basic');
                res.status(401).send('Authentication required');
                return;
            }
            const credentials = Buffer.from(auth.split(' ')[1], 'base64')
                .toString()
                .split(':');
            if (credentials[0] === config.auth.username &&
                credentials[1] === config.auth.password) {
                next();
            }
            else {
                res.setHeader('WWW-Authenticate', 'Basic');
                res.status(401).send('Invalid credentials');
            }
        });
    }
};
//# sourceMappingURL=swagger.config.js.map