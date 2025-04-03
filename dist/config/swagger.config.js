"use strict";
// src/config/swagger.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSecurityConfig = exports.swaggerCustomOptions = exports.createSwaggerDocument = exports.getSwaggerConfig = exports.swaggerConfigValidationSchema = void 0;
var config_1 = require("@nestjs/config");
var Joi = require("joi");
var swagger_1 = require("@nestjs/swagger");
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
var swaggerConfig = (0, config_1.registerAs)('swagger', function () { return ({
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
}); });
exports.default = swaggerConfig;
// Helper function to get config without accessing process.env directly
var getSwaggerConfig = function () {
    return swaggerConfig();
};
exports.getSwaggerConfig = getSwaggerConfig;
// Swagger document configuration
var createSwaggerDocument = function () {
    var config = (0, exports.getSwaggerConfig)();
    var builder = new swagger_1.DocumentBuilder()
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
    config.tags.forEach(function (tag) {
        builder.addTag(tag);
    });
    // Add servers
    config.servers.forEach(function (server) {
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
    customCss: "\n        .swagger-ui .topbar { display: none }\n        .swagger-ui .information-container { padding: 20px }\n        .swagger-ui .scheme-container { padding: 20px }\n        .swagger-ui .opblock-tag { padding: 10px }\n    ",
};
// Swagger security configuration
var swaggerSecurityConfig = function (app) {
    var config = (0, exports.getSwaggerConfig)();
    if (config.auth.enabled) {
        app.use("/".concat(config.path), function (req, res, next) {
            var auth = req.headers.authorization;
            if (!auth || auth.split(' ')[0] !== 'Basic') {
                res.setHeader('WWW-Authenticate', 'Basic');
                res.status(401).send('Authentication required');
                return;
            }
            var credentials = Buffer.from(auth.split(' ')[1], 'base64')
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