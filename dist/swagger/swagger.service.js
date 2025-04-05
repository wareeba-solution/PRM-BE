"use strict";
//
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
//             const globalPrefix = 'api';
//
//             this.logger.log('=== SWAGGER SETUP STARTED ===');
//             this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
//             this.logger.log(`Global API prefix: ${globalPrefix}`);
//
//             // Create the OpenAPI document
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
//             // Load paths and schemas
//             let paths = {};
//             let schemas = {};
//
//             try {
//                 paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
//                 this.logger.log(`Loaded ${Object.keys(paths).length} API paths`);
//             } catch (error) {
//                 this.logger.error('Failed to load API paths:', error.message);
//             }
//
//             try {
//                 schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
//                 this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
//             } catch (error) {
//                 this.logger.error('Failed to load schemas:', error.message);
//             }
//
//             // Create the OpenAPI document
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
//             // Set up a direct health check endpoint to verify routing works
//             const expressApp = app.getHttpAdapter().getInstance();
//             expressApp.get('/health-check', (req, res) => {
//                 res.json({ status: 'ok', timestamp: new Date().toISOString() });
//             });
//             this.logger.log('Health check endpoint created at /health-check');
//
//             // Most important part: properly disable the global prefix for Swagger UI
//             const options = {
//                 customSiteTitle: 'PRM API Documentation',
//                 swaggerOptions: { defaultModelsExpandDepth: 1 }
//             };
//
//             // Try setting up Swagger without internal redirects
//             try {
//                 // Non-prefixed route
//                 NestSwaggerModule.setup('docs', app, document, options);
//                 this.logger.log('Swagger UI set up at /docs');
//
//                 // Create a redirect from api/docs to /docs
//                 expressApp.get('/api/docs', (req, res) => {
//                     res.redirect('/docs');
//                 });
//                 this.logger.log('Created redirect from /api/docs to /docs');
//             } catch (error) {
//                 this.logger.error('Failed to set up Swagger:', error);
//             }
//
//             this.logger.log('Swagger setup complete - try accessing http://localhost:{port}/docs');
//         } catch (error) {
//             this.logger.error('Swagger setup failed:', error);
//         }
//     }
// }
//
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
//             const globalPrefix = 'api';
//
//             // Render-specific logging
//             if (process.env.RENDER) {
//                 console.log('SWAGGER: Running in Render environment');
//                 console.log('SWAGGER: PORT =', process.env.PORT);
//                 console.log('SWAGGER: NODE_ENV =', process.env.NODE_ENV);
//                 console.log('SWAGGER: HOST =', process.env.HOST || 'not set');
//                 console.log('SWAGGER: RENDER_EXTERNAL_URL =', process.env.RENDER_EXTERNAL_URL || 'not set');
//             }
//
//             this.logger.log('=== SWAGGER SETUP STARTED ===');
//             this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
//             this.logger.log(`Global API prefix: ${globalPrefix}`);
//
//             // Create the OpenAPI document
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
//             // Load paths and schemas
//             let paths = {};
//             let schemas = {};
//
//             try {
//                 paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
//                 this.logger.log(`Loaded ${Object.keys(paths).length} API paths`);
//             } catch (error) {
//                 this.logger.error('Failed to load API paths:', error.message);
//             }
//
//             try {
//                 schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
//                 this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
//             } catch (error) {
//                 this.logger.error('Failed to load schemas:', error.message);
//             }
//
//             // Create the OpenAPI document
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
//             // Set up a direct health check endpoint to verify routing works
//             const expressApp = app.getHttpAdapter().getInstance();
//             expressApp.get('/health-check', (req, res) => {
//                 res.json({
//                     status: 'ok',
//                     timestamp: new Date().toISOString(),
//                     render: !!process.env.RENDER,
//                     version: '1.0'
//                 });
//             });
//             this.logger.log('Health check endpoint created at /health-check');
//
//             // Create a diagnostics endpoint for troubleshooting
//             expressApp.get('/api-diagnostics', (req, res) => {
//                 res.json({
//                     status: 'ok',
//                     timestamp: new Date().toISOString(),
//                     environment: {
//                         isRender: !!process.env.RENDER,
//                         nodeEnv: process.env.NODE_ENV,
//                         port: process.env.PORT,
//                         renderExternalUrl: process.env.RENDER_EXTERNAL_URL,
//                     },
//                     routes: {
//                         swagger: ['/docs', '/swagger', '/api-docs'],
//                         api: `/api`,
//                         health: ['/health-check', '/swagger-health']
//                     }
//                 });
//             });
//             this.logger.log('API diagnostics endpoint created at /api-diagnostics');
//
//             // Try multiple approaches to ensure Swagger works
//             const swaggerOptions = {
//                 explorer: true,
//                 customSiteTitle: 'PRM API Documentation',
//                 swaggerOptions: {
//                     defaultModelsExpandDepth: 1,
//                     persistAuthorization: true
//                 }
//             };
//
//             // Try to setup Swagger at multiple common paths
//             const swaggerPaths = ['docs', 'swagger', 'api-docs'];
//
//             for (const path of swaggerPaths) {
//                 try {
//                     this.logger.log(`Setting up Swagger at /${path}`);
//                     NestSwaggerModule.setup(path, app, document, swaggerOptions);
//                     this.logger.log(`Successfully set up Swagger at /${path}`);
//                 } catch (err) {
//                     this.logger.error(`Failed to setup Swagger at /${path}:`, err.message);
//                 }
//             }
//
//             // Create explicit redirects from prefixed to non-prefixed paths
//             for (const path of swaggerPaths) {
//                 try {
//                     const prefixedPath = `${globalPrefix}/${path}`;
//                     expressApp.get(`/${prefixedPath}`, (req, res) => {
//                         this.logger.log(`Redirecting from /${prefixedPath} to /${path}`);
//                         res.redirect(`/${path}`);
//                     });
//                     this.logger.log(`Created redirect from /${prefixedPath} to /${path}`);
//                 } catch (err) {
//                     this.logger.error(`Failed to create redirect for /${path}:`, err.message);
//                 }
//             }
//
//             // For Render: Create a root index page with links to all documentation
//             try {
//                 const renderDocPage = `
//                 <!DOCTYPE html>
//                 <html>
//                 <head>
//                     <title>PRM API Documentation</title>
//                     <style>
//                         body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
//                         h1 { color: #333; }
//                         ul { list-style-type: none; padding: 0; }
//                         li { margin-bottom: 10px; }
//                         a { color: #0066cc; text-decoration: none; }
//                         a:hover { text-decoration: underline; }
//                         .container { max-width: 800px; margin: 0 auto; }
//                         .card { border: 1px solid #ddd; border-radius: 4px; padding: 15px; margin-bottom: 20px; }
//                     </style>
//                 </head>
//                 <body>
//                     <div class="container">
//                         <h1>Patient Relationship Manager API</h1>
//                         <div class="card">
//                             <h2>API Documentation</h2>
//                             <ul>
//                                 <li><a href="/docs">Swagger UI Documentation (/docs)</a></li>
//                                 <li><a href="/swagger">Alternative Swagger UI (/swagger)</a></li>
//                                 <li><a href="/api-docs">OpenAPI Documentation (/api-docs)</a></li>
//                             </ul>
//                         </div>
//                         <div class="card">
//                             <h2>API Endpoints</h2>
//                             <ul>
//                                 <li><a href="/api">API Root (/api)</a></li>
//                                 <li><a href="/health-check">Health Check (/health-check)</a></li>
//                                 <li><a href="/api-diagnostics">API Diagnostics (/api-diagnostics)</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </body>
//                 </html>
//                 `;
//
//                 expressApp.get('/api-home', (req, res) => {
//                     res.setHeader('Content-Type', 'text/html');
//                     res.send(renderDocPage);
//                 });
//                 this.logger.log('API documentation home page created at /api-home');
//             } catch (err) {
//                 this.logger.error('Failed to create API documentation home page:', err.message);
//             }
//
//             this.logger.log('Swagger setup complete - try accessing /docs, /swagger, or /api-docs');
//         } catch (error) {
//             this.logger.error('Swagger setup failed:', error);
//         }
//     }
// }
// src/swagger/swagger.service.ts
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
//         // Immediately log that we're entering the setup method
//         console.log('SWAGGER_DEBUG: Starting Swagger setup process');
//
//         try {
//             // Render-specific environment check
//             if (process.env.RENDER) {
//                 console.log('SWAGGER_DEBUG: Running in Render environment');
//                 console.log('SWAGGER_DEBUG: PORT =', process.env.PORT);
//                 console.log('SWAGGER_DEBUG: NODE_ENV =', process.env.NODE_ENV);
//                 console.log('SWAGGER_DEBUG: RENDER_EXTERNAL_URL =', process.env.RENDER_EXTERNAL_URL);
//                 console.log('SWAGGER_DEBUG: IS_RENDER =', true);
//             }
//
//             // Get config service
//             const configService = app.get(ConfigService);
//             const isProduction = configService.get<string>('app.nodeEnv') === 'production';
//             const globalPrefix = 'api';
//
//             console.log(`SWAGGER_DEBUG: Environment: ${isProduction ? 'Production' : 'Development'}`);
//             console.log(`SWAGGER_DEBUG: Global API prefix: ${globalPrefix}`);
//
//             // Create the OpenAPI document
//             console.log('SWAGGER_DEBUG: Creating OpenAPI document');
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
//             console.log('SWAGGER_DEBUG: OpenAPI document created successfully');
//
//             // Load paths and schemas with more explicit error handling
//             let paths = {};
//             let schemas = {};
//
//             try {
//                 console.log('SWAGGER_DEBUG: Loading API paths');
//                 if (!pathsModule.getAllPaths) {
//                     console.log('SWAGGER_DEBUG: WARNING - getAllPaths function not found in pathsModule');
//                 }
//                 paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
//                 console.log(`SWAGGER_DEBUG: Loaded ${Object.keys(paths).length} API paths`);
//             } catch (error) {
//                 console.log('SWAGGER_DEBUG: Failed to load API paths:', error.message);
//                 console.log('SWAGGER_DEBUG: Setting empty paths object');
//                 paths = {};
//             }
//
//             try {
//                 console.log('SWAGGER_DEBUG: Loading API schemas');
//                 if (!schemasModule.getAllSchemas) {
//                     console.log('SWAGGER_DEBUG: WARNING - getAllSchemas function not found in schemasModule');
//                 }
//                 schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
//                 console.log(`SWAGGER_DEBUG: Loaded ${Object.keys(schemas).length} schemas`);
//             } catch (error) {
//                 console.log('SWAGGER_DEBUG: Failed to load schemas:', error.message);
//                 console.log('SWAGGER_DEBUG: Setting empty schemas object');
//                 schemas = {};
//             }
//
//             // Log debug info about paths and schemas
//             if (Object.keys(paths).length === 0) {
//                 console.log('SWAGGER_DEBUG: WARNING - No paths loaded for Swagger documentation!');
//             } else {
//                 console.log('SWAGGER_DEBUG: First few path keys:', Object.keys(paths).slice(0, 3));
//             }
//
//             if (Object.keys(schemas).length === 0) {
//                 console.log('SWAGGER_DEBUG: WARNING - No schemas loaded for Swagger documentation!');
//             } else {
//                 console.log('SWAGGER_DEBUG: First few schema keys:', Object.keys(schemas).slice(0, 3));
//             }
//
//             // Create the OpenAPI document
//             console.log('SWAGGER_DEBUG: Creating final OpenAPI document with paths and schemas');
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
//             // Setup direct Express routes
//             console.log('SWAGGER_DEBUG: Setting up direct Express routes');
//             try {
//                 const expressApp = app.getHttpAdapter().getInstance();
//
//                 // Route for direct health check and debugging
//                 expressApp.get('/api-debug', (req, res) => {
//                     res.json({
//                         status: 'ok',
//                         timestamp: new Date().toISOString(),
//                         environment: {
//                             isRender: !!process.env.RENDER,
//                             nodeEnv: process.env.NODE_ENV,
//                             port: process.env.PORT
//                         },
//                         stats: {
//                             pathCount: Object.keys(paths).length,
//                             schemaCount: Object.keys(schemas).length
//                         }
//                     });
//                 });
//                 console.log('SWAGGER_DEBUG: Created /api-debug endpoint');
//             } catch (error) {
//                 console.log('SWAGGER_DEBUG: Failed to set up direct Express routes:', error.message);
//             }
//
//             // Try multiple approaches for setting up Swagger
//             try {
//                 console.log('SWAGGER_DEBUG: Setting up Swagger documentation using NestSwaggerModule');
//
//                 // First try: Standard approach with multiple paths
//                 const swaggerPaths = ['swagger', 'docs', 'api-docs'];
//                 for (const path of swaggerPaths) {
//                     try {
//                         console.log(`SWAGGER_DEBUG: Setting up Swagger at /${path}`);
//                         NestSwaggerModule.setup(path, app, document, {
//                             useGlobalPrefix: false, // Don't use global prefix
//                             swaggerOptions: {
//                                 docExpansion: 'none',
//                                 filter: true,
//                                 showExtensions: true,
//                                 persistAuthorization: true
//                             },
//                             customSiteTitle: 'PRM API Documentation'
//                         });
//                         console.log(`SWAGGER_DEBUG: Swagger UI set up successfully at /${path}`);
//                     } catch (e) {
//                         console.log(`SWAGGER_DEBUG: Error setting up Swagger at /${path}:`, e.message);
//                     }
//                 }
//
//                 // Second try: Setup with global prefix explicitly included
//                 const prefixedPaths = [`${globalPrefix}/swagger`, `${globalPrefix}/docs`];
//                 for (const path of prefixedPaths) {
//                     try {
//                         console.log(`SWAGGER_DEBUG: Setting up Swagger at /${path}`);
//                         NestSwaggerModule.setup(path, app, document, {
//                             useGlobalPrefix: false, // Already included in path
//                             swaggerOptions: {
//                                 docExpansion: 'none',
//                                 filter: true,
//                                 showExtensions: true,
//                                 persistAuthorization: true
//                             },
//                             customSiteTitle: 'PRM API Documentation'
//                         });
//                         console.log(`SWAGGER_DEBUG: Swagger UI set up successfully at /${path}`);
//                     } catch (e) {
//                         console.log(`SWAGGER_DEBUG: Error setting up Swagger at /${path}:`, e.message);
//                     }
//                 }
//
//             } catch (error) {
//                 console.log('SWAGGER_DEBUG: Failed to set up Swagger:', error.message);
//                 console.log('SWAGGER_DEBUG: Error stack:', error.stack);
//             }
//
//             console.log('SWAGGER_DEBUG: Swagger setup process complete');
//         } catch (error) {
//             console.log('SWAGGER_DEBUG: Fatal error in Swagger setup:', error.message);
//             console.log('SWAGGER_DEBUG: Error stack:', error.stack);
//         }
//     }
// }
// src/swagger/swagger.service.ts
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemasModule = __importStar(require("./schemas/index"));
const pathsModule = __importStar(require("./paths/index"));
class SwaggerService {
    constructor() {
        this.logger = new common_1.Logger('SwaggerService');
    }
    setup(app) {
        console.log('SWAGGER: Starting setup process');
        try {
            // Render-specific checks
            console.log('SWAGGER: Environment variables:', {
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                RENDER: process.env.RENDER ? 'true' : 'false'
            });
            const expressApp = app.getHttpAdapter().getInstance();
            // Create a proper DocumentBuilder with all necessary configuration
            const document = new swagger_1.DocumentBuilder()
                .setTitle('Patient Relationship Manager API')
                .setDescription('API Documentation for PRM')
                .setVersion('1.0')
                .addBearerAuth() // This properly sets up the security scheme
                .build();
            // Try to load paths and schemas safely
            let paths = {};
            let schemas = {};
            try {
                paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
                console.log(`SWAGGER: Loaded ${Object.keys(paths).length} paths`);
            }
            catch (error) {
                console.error('SWAGGER: Failed to load paths:', error);
            }
            try {
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                console.log(`SWAGGER: Loaded ${Object.keys(schemas).length} schemas`);
            }
            catch (error) {
                console.error('SWAGGER: Failed to load schemas:', error);
            }
            // Add a simple health path if no paths were loaded
            if (Object.keys(paths).length === 0) {
                console.log('SWAGGER: No paths loaded, adding a simple health path');
                paths = {
                    '/api/health': {
                        get: {
                            summary: 'Health check endpoint',
                            responses: {
                                '200': {
                                    description: 'Service is healthy'
                                }
                            }
                        }
                    }
                };
            }
            // Create the final document
            const finalDocument = Object.assign(Object.assign({}, document), { paths: paths });
            if (Object.keys(schemas).length > 0) {
                finalDocument.components = Object.assign(Object.assign({}, finalDocument.components), { schemas: schemas });
            }
            // Add a direct JSON endpoint for the API spec
            expressApp.get('/swagger.json', (req, res) => {
                res.json(finalDocument);
                console.log('SWAGGER: Served /swagger.json');
            });
            // Add a simple HTML page that loads Swagger UI from CDN
            expressApp.get('/swagger-ui', (req, res) => {
                const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>API Documentation</title>
                    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.5.0/swagger-ui.css" />
                    <style>
                        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
                        body { margin: 0; background: #fafafa; }
                    </style>
                </head>
                <body>
                    <div id="swagger-ui"></div>
                    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
                    <script>
                        window.onload = function() {
                            window.ui = SwaggerUIBundle({
                                url: "/swagger.json",
                                dom_id: '#swagger-ui',
                                deepLinking: true,
                                presets: [
                                    SwaggerUIBundle.presets.apis
                                ],
                                layout: "BaseLayout"
                            });
                        }
                    </script>
                </body>
                </html>
                `;
                res.setHeader('Content-Type', 'text/html');
                res.send(html);
                console.log('SWAGGER: Served /swagger-ui');
            });
            console.log('SWAGGER: Added direct routes for /swagger.json and /swagger-ui');
            // Now try the standard NestJS setup with the properly typed document
            try {
                console.log('SWAGGER: Setting up via NestSwaggerModule');
                swagger_1.SwaggerModule.setup('api-docs', app, finalDocument);
                console.log('SWAGGER: Setup complete for /api-docs');
            }
            catch (error) {
                console.error('SWAGGER: Failed standard setup:', error);
            }
            console.log('SWAGGER: Setup process complete');
            console.log('SWAGGER: Try accessing:');
            console.log('SWAGGER: - /swagger-ui (Direct HTML)');
            console.log('SWAGGER: - /api-docs (NestJS Swagger)');
            console.log('SWAGGER: - /swagger.json (Raw OpenAPI spec)');
        }
        catch (error) {
            console.error('SWAGGER: Fatal error in setup:', error);
        }
    }
}
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map