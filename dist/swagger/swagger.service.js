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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var SwaggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemasModule = __importStar(require("./schemas/index"));
const pathsModule = __importStar(require("./paths/index"));
const config_1 = require("@nestjs/config");
let SwaggerService = SwaggerService_1 = class SwaggerService {
    constructor() {
        this.logger = new common_1.Logger(SwaggerService_1.name);
    }
    setup(app) {
        try {
            // Get config service
            const configService = app.get(config_1.ConfigService);
            const isProduction = configService.get('app.nodeEnv') === 'production';
            // Log environment details for debugging
            this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
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
                paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
                const pathKeys = Object.keys(paths);
                this.logger.log(`Loaded ${pathKeys.length} API paths`);
                // Enhanced debugging: log specific paths
                if (pathKeys.length > 0) {
                    this.logger.log(`Path keys: ${pathKeys.join(', ')}`);
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
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                const schemaKeys = Object.keys(schemas);
                this.logger.log(`Loaded ${schemaKeys.length} schemas`);
                // Enhanced debugging: log specific schemas
                if (schemaKeys.length > 0) {
                    this.logger.log(`Schema keys: ${schemaKeys.slice(0, 10).join(', ')}${schemaKeys.length > 10 ? '...' : ''}`);
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
            // Setup Swagger with increased error handling
            try {
                // Set up Swagger at the correct paths
                const swaggerRoutes = ['api-docs', 'swagger'];
                for (const route of swaggerRoutes) {
                    try {
                        swagger_1.SwaggerModule.setup(route, app, document, {
                            swaggerOptions: Object.assign({ persistAuthorization: true, docExpansion: 'none', filter: true, showExtensions: true }, (isProduction ? {
                                authAction: {
                                    defaultSecurityScheme: 'bearerAuth'
                                }
                            } : {}))
                        });
                        this.logger.log(`Swagger documentation setup successfully at /${route}`);
                        this.logger.log(`Access Swagger UI at: http://localhost:${app.getHttpServer().address().port}/${route}`);
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
};
SwaggerService = SwaggerService_1 = __decorate([
    (0, common_1.Injectable)()
], SwaggerService);
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map