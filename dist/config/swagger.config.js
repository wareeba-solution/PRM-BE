"use strict";
// src/config/swagger.config.ts
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
exports.swaggerSecurityConfig = exports.swaggerCustomOptions = exports.createSwaggerDocument = exports.getSwaggerConfig = exports.swaggerConfigValidationSchema = void 0;
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfigValidationSchema = Joi.object({
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
const swaggerConfig = (0, config_1.registerAs)('swagger', () => ({
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
exports.default = swaggerConfig;
// Helper function to get config without accessing process.env directly
const getSwaggerConfig = () => {
    return swaggerConfig();
};
exports.getSwaggerConfig = getSwaggerConfig;
// Swagger document configuration
const createSwaggerDocument = () => {
    const config = (0, exports.getSwaggerConfig)();
    const builder = new swagger_1.DocumentBuilder()
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
    // Add tags
    config.tags.forEach((tag) => {
        builder.addTag(tag);
    });
    // Add servers
    config.servers.forEach((server) => {
        builder.addServer(server.url, server.description);
    });
    return builder.build();
};
exports.createSwaggerDocument = createSwaggerDocument;
// Swagger custom options
exports.swaggerCustomOptions = {
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
// Swagger security configuration
const swaggerSecurityConfig = (app) => {
    const config = (0, exports.getSwaggerConfig)();
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
exports.swaggerSecurityConfig = swaggerSecurityConfig;
// Example .env file:
/*
SWAGGER_ENABLED=true
SWAGGER_TITLE=Patient Relationship Manager API
SWAGGER_DESCRIPTION=API documentation for PRM system
SWAGGER_VERSION=1.0
SWAGGER_PATH=api-docs
SWAGGER_AUTH_ENABLED=true
SWAGGER_AUTH_USERNAME=admin
SWAGGER_AUTH_PASSWORD=admin123
*/ 
//# sourceMappingURL=swagger.config.js.map