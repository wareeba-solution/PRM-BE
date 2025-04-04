"use strict";
// // src/swagger/swagger.service.ts
// import { Logger } from '@nestjs/common';
// import { INestApplication } from '@nestjs/common';
// import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ManualOpenAPIObject } from './interfaces/manual-api.interface';
// import * as schemasModule from './schemas/index';
// import * as pathsModule from './paths/index';
// import { ConfigService } from '@nestjs/config';
//
// export class SwaggerService {
//     private readonly logger = new Logger('SwaggerService');
//
//     setup(app: INestApplication): void {
//         try {
//             // Get config service
//             const configService = app.get(ConfigService);
//             const isProduction = configService.get<string>('app.nodeEnv') === 'production';
//             const globalPrefix = 'api'; // Match the global prefix in main.ts
//
//             // Production-specific debugging
//             if (isProduction) {
//                 this.logger.log('=== PRODUCTION MODE ENABLED ===');
//                 this.logger.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
//                 this.logger.log('Production host:', process.env.HOST || 'not set');
//                 this.logger.log('Production port:', process.env.PORT || 'not set');
//                 this.logger.log('Base URL:', configService.get<string>('app.baseUrl', 'not configured'));
//
//                 // Fix for TypeScript error - use separate log statements
//                 const swaggerDisabled = configService.get<boolean>('app.disableSwagger') === true;
//                 this.logger.log('Swagger explicitly disabled?', swaggerDisabled ? 'Yes' : 'No');
//             }
//
//             // Correctly handle the config check
//             const swaggerDisabled = configService.get<boolean>('app.disableSwagger') === true;
//             if (isProduction && swaggerDisabled) {
//                 this.logger.log('Swagger documentation is disabled in production mode by configuration');
//                 return;
//             }
//
//             this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
//             this.logger.log(`Global API prefix: ${globalPrefix}`);
//             this.logger.log('Setting up Swagger documentation...');
//
//             const config = new DocumentBuilder()
//                 .setTitle('Patient Relationship Manager API')
//                 .setDescription('API Documentation for PRM')
//                 .setVersion('1.0')
//                 .addBearerAuth({
//                     type: 'http',
//                     scheme: 'bearer',
//                     bearerFormat: 'JWT',
//                     description: 'Enter JWT token',
//                 })
//                 .addTag('Auth', 'Authentication endpoints')
//                 .addTag('Users', 'User management endpoints')
//                 .addTag('Organizations', 'Organization management endpoints')
//                 .addTag('Contacts', 'Contact management endpoints')
//                 .addTag('Appointments', 'Appointment scheduling endpoints')
//                 .addTag('Tickets', 'Support ticket endpoints')
//                 .addTag('Messages', 'Messaging functionality endpoints')
//                 .addTag('Notifications', 'Notification management endpoints')
//                 .build();
//
//             // Safely get paths and schemas with enhanced debugging
//             let paths = {};
//             let schemas = {};
//
//             try {
//                 this.logger.log('Loading API paths...');
//                 paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
//                 const pathKeys = Object.keys(paths);
//                 this.logger.log(`Loaded ${pathKeys.length} API paths`);
//
//                 if (pathKeys.length > 0) {
//                     this.logger.log(`Path samples: ${pathKeys.slice(0, 5).join(', ')}${pathKeys.length > 5 ? '...' : ''}`);
//                 } else {
//                     this.logger.warn('No API paths were loaded!');
//                 }
//             } catch (pathError) {
//                 this.logger.error('Failed to load paths:', pathError);
//                 this.logger.error(pathError.stack);
//             }
//
//             try {
//                 this.logger.log('Loading API schemas...');
//                 schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
//                 const schemaKeys = Object.keys(schemas);
//                 this.logger.log(`Loaded ${schemaKeys.length} schemas`);
//
//                 if (schemaKeys.length > 0) {
//                     this.logger.log(`Schema samples: ${schemaKeys.slice(0, 5).join(', ')}${schemaKeys.length > 5 ? '...' : ''}`);
//                 } else {
//                     this.logger.warn('No schemas were loaded!');
//                 }
//             } catch (schemaError) {
//                 this.logger.error('Failed to load schemas:', schemaError);
//                 this.logger.error(schemaError.stack);
//             }
//
//             if (Object.keys(paths).length === 0) {
//                 this.logger.warn('WARNING: No paths loaded for Swagger documentation!');
//                 this.logger.warn('Check paths/index.ts and ensure getAllPaths() is properly implemented');
//             }
//
//             if (Object.keys(schemas).length === 0) {
//                 this.logger.warn('WARNING: No schemas loaded for Swagger documentation!');
//                 this.logger.warn('Check schemas/index.ts and ensure getAllSchemas() is properly implemented');
//             }
//
//             // Create a manual document
//             const document: ManualOpenAPIObject = {
//                 ...config,
//                 paths,
//                 components: {
//                     schemas,
//                     securitySchemes: {
//                         bearerAuth: {
//                             type: 'http',
//                             scheme: 'bearer',
//                             bearerFormat: 'JWT'
//                         }
//                     }
//                 }
//             };
//
//             // Check document serialization
//             try {
//                 JSON.stringify(document);
//                 this.logger.log('Document can be serialized correctly.');
//             } catch (err) {
//                 this.logger.warn('Document has circular references or cannot be serialized!', err.message);
//             }
//
//             // Create dedicated JSON endpoint
//             app.use('/swagger-json', (req, res) => {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(JSON.stringify(document));
//             });
//             this.logger.log('Swagger JSON endpoint created at /swagger-json');
//
//             // Setup Swagger routes
//             try {
//                 // Set up Swagger at various route combinations
//                 const swaggerRoutes = [
//                     'docs',                   // /docs
//                     'swagger',                // /swagger
//                     'api-docs',               // /api-docs
//                     `${globalPrefix}/docs`,    // /api/docs
//                     `${globalPrefix}/swagger`, // /api/swagger
//                     `${globalPrefix}/api-docs`  // /api/api-docs
//                 ];
//
//                 for (const route of swaggerRoutes) {
//                     try {
//                         this.logger.log(`Setting up Swagger at route: /${route}`);
//
//                         NestSwaggerModule.setup(route, app, document as any, {
//                             explorer: true,
//                             swaggerOptions: {
//                                 persistAuthorization: true,
//                                 docExpansion: 'none',
//                                 filter: true,
//                                 showExtensions: true,
//                                 deepLinking: true,
//                                 displayOperationId: true,
//                                 defaultModelsExpandDepth: 0,
//                                 defaultModelExpandDepth: 1,
//                                 // Use custom-defined JSON URL
//                                 url: '/swagger-json',
//                                 // Production-specific options
//                                 ...(isProduction ? {
//                                     layout: 'StandaloneLayout',
//                                     displayRequestDuration: true,
//                                     authAction: {
//                                         defaultSecurityScheme: 'bearerAuth'
//                                     }
//                                 } : {})
//                             },
//                             customSiteTitle: 'PRM API Documentation',
//                             customfavIcon: '/favicon.ico'
//                         });
//
//                         this.logger.log(`Swagger documentation setup successfully at /${route}`);
//                     } catch (routeError) {
//                         this.logger.error(`Failed to setup Swagger at /${route}:`, routeError);
//                         this.logger.error(routeError.stack);
//                     }
//                 }
//
//                 // Get server address if possible
//                 try {
//                     const serverInstance = app.getHttpServer();
//                     if (serverInstance && serverInstance.address) {
//                         const address = serverInstance.address();
//                         if (address && typeof address === 'object') {
//                             const host = address.address === '::' ? 'localhost' : address.address;
//                             const port = address.port;
//                             this.logger.log(`Swagger UI available at: http://${host}:${port}/swagger`);
//                         }
//                     }
//                 } catch (addrError) {
//                     this.logger.warn('Unable to determine server address');
//                 }
//
//                 this.logger.log('All Swagger routes setup complete');
//             } catch (swaggerSetupError) {
//                 this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
//                 this.logger.error(swaggerSetupError.stack);
//                 throw swaggerSetupError;
//             }
//         } catch (error) {
//             this.logger.error('Failed to set up Swagger:', error);
//             throw error;
//         }
//     }
// }
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
            const globalPrefix = 'api';
            this.logger.log('=== SWAGGER SETUP STARTED ===');
            this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
            this.logger.log(`Global API prefix: ${globalPrefix}`);
            // Create the OpenAPI document
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
            // Load paths and schemas
            let paths = {};
            let schemas = {};
            try {
                paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
                this.logger.log(`Loaded ${Object.keys(paths).length} API paths`);
            }
            catch (error) {
                this.logger.error('Failed to load API paths:', error.message);
            }
            try {
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
            }
            catch (error) {
                this.logger.error('Failed to load schemas:', error.message);
            }
            // Create the OpenAPI document
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
            // Set up a direct health check endpoint to verify routing works
            const expressApp = app.getHttpAdapter().getInstance();
            expressApp.get('/health-check', (req, res) => {
                res.json({ status: 'ok', timestamp: new Date().toISOString() });
            });
            this.logger.log('Health check endpoint created at /health-check');
            // Most important part: properly disable the global prefix for Swagger UI
            const options = {
                customSiteTitle: 'PRM API Documentation',
                swaggerOptions: { defaultModelsExpandDepth: 1 }
            };
            // Try setting up Swagger without internal redirects
            try {
                // Non-prefixed route
                swagger_1.SwaggerModule.setup('docs', app, document, options);
                this.logger.log('Swagger UI set up at /docs');
                // Create a redirect from api/docs to /docs
                expressApp.get('/api/docs', (req, res) => {
                    res.redirect('/docs');
                });
                this.logger.log('Created redirect from /api/docs to /docs');
            }
            catch (error) {
                this.logger.error('Failed to set up Swagger:', error);
            }
            this.logger.log('Swagger setup complete - try accessing http://localhost:{port}/docs');
        }
        catch (error) {
            this.logger.error('Swagger setup failed:', error);
        }
    }
}
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map