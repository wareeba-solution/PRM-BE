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




// src/swagger/swagger.service.ts
import { Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ManualOpenAPIObject } from './interfaces/manual-api.interface';
import * as schemasModule from './schemas/index';
import * as pathsModule from './paths/index';
import { ConfigService } from '@nestjs/config';

export class SwaggerService {
    private readonly logger = new Logger('SwaggerService');

    setup(app: INestApplication): void {
        try {
            // Get config service
            const configService = app.get(ConfigService);
            const isProduction = configService.get<string>('app.nodeEnv') === 'production';
            const globalPrefix = 'api';

            // Render-specific logging
            if (process.env.RENDER) {
                console.log('SWAGGER: Running in Render environment');
                console.log('SWAGGER: PORT =', process.env.PORT);
                console.log('SWAGGER: NODE_ENV =', process.env.NODE_ENV);
                console.log('SWAGGER: HOST =', process.env.HOST || 'not set');
                console.log('SWAGGER: RENDER_EXTERNAL_URL =', process.env.RENDER_EXTERNAL_URL || 'not set');
            }

            this.logger.log('=== SWAGGER SETUP STARTED ===');
            this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
            this.logger.log(`Global API prefix: ${globalPrefix}`);

            // Create the OpenAPI document
            const config = new DocumentBuilder()
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
            } catch (error) {
                this.logger.error('Failed to load API paths:', error.message);
            }

            try {
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
            } catch (error) {
                this.logger.error('Failed to load schemas:', error.message);
            }

            // Create the OpenAPI document
            const document: ManualOpenAPIObject = {
                ...config,
                paths,
                components: {
                    schemas,
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                }
            };

            // Set up a direct health check endpoint to verify routing works
            const expressApp = app.getHttpAdapter().getInstance();
            expressApp.get('/health-check', (req, res) => {
                res.json({
                    status: 'ok',
                    timestamp: new Date().toISOString(),
                    render: !!process.env.RENDER,
                    version: '1.0'
                });
            });
            this.logger.log('Health check endpoint created at /health-check');

            // Create a diagnostics endpoint for troubleshooting
            expressApp.get('/api-diagnostics', (req, res) => {
                res.json({
                    status: 'ok',
                    timestamp: new Date().toISOString(),
                    environment: {
                        isRender: !!process.env.RENDER,
                        nodeEnv: process.env.NODE_ENV,
                        port: process.env.PORT,
                        renderExternalUrl: process.env.RENDER_EXTERNAL_URL,
                    },
                    routes: {
                        swagger: ['/docs', '/swagger', '/api-docs'],
                        api: `/api`,
                        health: ['/health-check', '/swagger-health']
                    }
                });
            });
            this.logger.log('API diagnostics endpoint created at /api-diagnostics');

            // Try multiple approaches to ensure Swagger works
            const swaggerOptions = {
                explorer: true,
                customSiteTitle: 'PRM API Documentation',
                swaggerOptions: {
                    defaultModelsExpandDepth: 1,
                    persistAuthorization: true
                }
            };

            // Try to setup Swagger at multiple common paths
            const swaggerPaths = ['docs', 'swagger', 'api-docs'];

            for (const path of swaggerPaths) {
                try {
                    this.logger.log(`Setting up Swagger at /${path}`);
                    NestSwaggerModule.setup(path, app, document, swaggerOptions);
                    this.logger.log(`Successfully set up Swagger at /${path}`);
                } catch (err) {
                    this.logger.error(`Failed to setup Swagger at /${path}:`, err.message);
                }
            }

            // Create explicit redirects from prefixed to non-prefixed paths
            for (const path of swaggerPaths) {
                try {
                    const prefixedPath = `${globalPrefix}/${path}`;
                    expressApp.get(`/${prefixedPath}`, (req, res) => {
                        this.logger.log(`Redirecting from /${prefixedPath} to /${path}`);
                        res.redirect(`/${path}`);
                    });
                    this.logger.log(`Created redirect from /${prefixedPath} to /${path}`);
                } catch (err) {
                    this.logger.error(`Failed to create redirect for /${path}:`, err.message);
                }
            }

            // For Render: Create a root index page with links to all documentation
            try {
                const renderDocPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>PRM API Documentation</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
                        h1 { color: #333; }
                        ul { list-style-type: none; padding: 0; }
                        li { margin-bottom: 10px; }
                        a { color: #0066cc; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                        .container { max-width: 800px; margin: 0 auto; }
                        .card { border: 1px solid #ddd; border-radius: 4px; padding: 15px; margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Patient Relationship Manager API</h1>
                        <div class="card">
                            <h2>API Documentation</h2>
                            <ul>
                                <li><a href="/docs">Swagger UI Documentation (/docs)</a></li>
                                <li><a href="/swagger">Alternative Swagger UI (/swagger)</a></li>
                                <li><a href="/api-docs">OpenAPI Documentation (/api-docs)</a></li>
                            </ul>
                        </div>
                        <div class="card">
                            <h2>API Endpoints</h2>
                            <ul>
                                <li><a href="/api">API Root (/api)</a></li>
                                <li><a href="/health-check">Health Check (/health-check)</a></li>
                                <li><a href="/api-diagnostics">API Diagnostics (/api-diagnostics)</a></li>
                            </ul>
                        </div>
                    </div>
                </body>
                </html>
                `;

                expressApp.get('/api-home', (req, res) => {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(renderDocPage);
                });
                this.logger.log('API documentation home page created at /api-home');
            } catch (err) {
                this.logger.error('Failed to create API documentation home page:', err.message);
            }

            this.logger.log('Swagger setup complete - try accessing /docs, /swagger, or /api-docs');
        } catch (error) {
            this.logger.error('Swagger setup failed:', error);
        }
    }
}
