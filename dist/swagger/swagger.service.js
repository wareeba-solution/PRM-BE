"use strict";
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
exports.SwaggerService = void 0;
// src/swagger/swagger.service.ts
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemasModule = __importStar(require("./schemas/index"));
const pathsModule = __importStar(require("./paths/index"));
const config_1 = require("@nestjs/config");
class SwaggerService {
    constructor() {
        this.logger = new common_1.Logger('SwaggerService');
    }
    setup(app) {
        try {
            // Get config service
            const configService = app.get(config_1.ConfigService);
            const isProduction = configService.get('app.nodeEnv') === 'production';
            const globalPrefix = 'api'; // Match the global prefix in main.ts
            // Log environment details for debugging
            this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
            this.logger.log(`Global API prefix: ${globalPrefix}`);
            this.logger.log('Setting up Swagger documentation...');
            const config = new swagger_1.DocumentBuilder()
                .setTitle('Patient Relationship Manager API')
                .setDescription('API Documentation for PRM')
                .setVersion('1.0')
                .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token',
            })
                .addTag('Auth', 'Authentication endpoints')
                .addTag('Users', 'User management endpoints')
                .addTag('Organizations', 'Organization management endpoints')
                .addTag('Contacts', 'Contact management endpoints')
                .addTag('Appointments', 'Appointment scheduling endpoints')
                .addTag('Tickets', 'Support ticket endpoints')
                .addTag('Messages', 'Messaging functionality endpoints')
                .addTag('Notifications', 'Notification management endpoints')
                .build();
            // Safely get paths and schemas with enhanced debugging
            let paths = {};
            let schemas = {};
            try {
                this.logger.log('Loading API paths...');
                paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
                const pathKeys = Object.keys(paths);
                this.logger.log(`Loaded ${pathKeys.length} API paths`);
                // Enhanced debugging: log specific paths
                if (pathKeys.length > 0) {
                    this.logger.log(`Path samples: ${pathKeys.slice(0, 5).join(', ')}${pathKeys.length > 5 ? '...' : ''}`);
                }
                else {
                    this.logger.warn('No API paths were loaded!');
                }
            }
            catch (pathError) {
                this.logger.error('Failed to load paths:', pathError);
                this.logger.error(pathError.stack);
            }
            try {
                this.logger.log('Loading API schemas...');
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                const schemaKeys = Object.keys(schemas);
                this.logger.log(`Loaded ${schemaKeys.length} schemas`);
                // Enhanced debugging: log specific schemas
                if (schemaKeys.length > 0) {
                    this.logger.log(`Schema samples: ${schemaKeys.slice(0, 5).join(', ')}${schemaKeys.length > 5 ? '...' : ''}`);
                }
                else {
                    this.logger.warn('No schemas were loaded!');
                }
            }
            catch (schemaError) {
                this.logger.error('Failed to load schemas:', schemaError);
                this.logger.error(schemaError.stack);
            }
            // Log additional debug information
            if (Object.keys(paths).length === 0) {
                this.logger.warn('WARNING: No paths loaded for Swagger documentation!');
                this.logger.warn('Check paths/index.ts and ensure getAllPaths() is properly implemented');
            }
            if (Object.keys(schemas).length === 0) {
                this.logger.warn('WARNING: No schemas loaded for Swagger documentation!');
                this.logger.warn('Check schemas/index.ts and ensure getAllSchemas() is properly implemented');
            }
            // Create a manual document
            const document = Object.assign(Object.assign({}, config), { paths, components: {
                    schemas,
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                } });
            // Try to serialize the document to check for circular references
            try {
                JSON.stringify(document);
                this.logger.log('Document can be serialized correctly.');
            }
            catch (err) {
                this.logger.warn('Document has circular references or cannot be serialized!', err.message);
            }
            // Setup Swagger with increased error handling
            try {
                // Set up Swagger at routes both with and without global prefix
                const swaggerRoutes = [
                    'swagger',
                    'api-docs',
                    `${globalPrefix}/swagger`,
                    `${globalPrefix}/api-docs` // /api/api-docs
                ];
                for (const route of swaggerRoutes) {
                    try {
                        this.logger.log(`Setting up Swagger at route: /${route}`);
                        swagger_1.SwaggerModule.setup(route, app, document, {
                            swaggerOptions: Object.assign({ persistAuthorization: true, docExpansion: 'none', filter: true, showExtensions: true }, (isProduction ? {
                                authAction: {
                                    defaultSecurityScheme: 'bearerAuth'
                                }
                            } : {})),
                            customSiteTitle: 'PRM API Documentation'
                        });
                        this.logger.log(`Swagger documentation setup successfully at /${route}`);
                    }
                    catch (routeError) {
                        this.logger.error(`Failed to setup Swagger at /${route}:`, routeError);
                        this.logger.error(routeError.stack);
                    }
                }
            }
            catch (swaggerSetupError) {
                this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
                this.logger.error(swaggerSetupError.stack);
                throw swaggerSetupError;
            }
        }
        catch (error) {
            this.logger.error('Failed to set up Swagger:', error);
            throw error;
        }
    }
}
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map