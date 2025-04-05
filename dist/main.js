"use strict";
// import 'module-alias/register';
// import 'reflect-metadata';
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AppModule } from './app.module';
// import express from 'express';
// import * as http from 'http';
// import { SwaggerService } from './swagger/swagger.service';
// import { ExpressAdapter } from '@nestjs/platform-express';
//
// async function bootstrap() {
//   const logger = new Logger('Bootstrap');
//   console.log('Starting application bootstrap process...');
//
//   // Determine port early
//   const port = parseInt(process.env.PORT || '3000', 10);
//   console.log(`Using port: ${port}`);
//
//   // Create a simple Express app that binds to the port immediately
//   const tempApp = express();
//   tempApp.get('/', (req, res) => {
//     res.json({ status: 'Starting', message: 'Application is initializing...' });
//   });
//   tempApp.get('/health', (req, res) => {
//     res.json({ status: 'ok' });
//   });
//
//   // Start the temporary server immediately
//   const tempServer = http.createServer(tempApp);
//   tempServer.listen(port, () => {
//     console.log(`=============================================`);
//     console.log(`TEMPORARY SERVER RUNNING ON PORT: ${port}`);
//     console.log(`=============================================`);
//   });
//
//   try {
//     // Create a shared Express instance for better control
//     const server = express();
//
//     // Add root route handler to the shared Express instance
//     server.get('/', (req, res) => {
//       res.json({
//         name: 'Patient Relationship Manager API',
//         version: '1.0',
//         documentation: '/docs',
//         status: 'running',
//         timestamp: new Date().toISOString()
//       });
//     });
//
//     // Continue with normal NestJS initialization using the Express instance
//     const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
//     const configService = app.get(ConfigService);
//
//     // Configure CORS with more robust handling
//     app.enableCors({
//       origin: configService.get('app.cors.origins', '*'),
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//       allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//       credentials: true,
//     });
//
//     // Global validation pipe with enhanced configuration
//     app.useGlobalPipes(new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//       validationError: {
//         target: false,
//         value: false
//       },
//     }));
//
//     // Add direct Express routes for diagnostics
//     server.get('/health-check', (req, res) => {
//       res.json({ status: 'ok', time: new Date().toISOString() });
//     });
//
//     server.get('/swagger-health', (req, res) => {
//       res.json({ status: 'ok', time: new Date().toISOString() });
//     });
//
//     logger.log('Direct health check endpoints created');
//
//     // *** IMPORTANT: Initialize Swagger BEFORE setting global prefix ***
//     try {
//       logger.log('Initializing Swagger documentation...');
//       const swaggerService = new SwaggerService();
//       swaggerService.setup(app);
//       logger.log('Swagger documentation initialized successfully.');
//     } catch (swaggerError) {
//       logger.error('Failed to initialize Swagger documentation:', swaggerError);
//       logger.error(swaggerError.stack);
//     }
//
//     // Set global prefix AFTER Swagger setup
//     app.setGlobalPrefix('api');
//     logger.log('Global API prefix set to: /api');
//
//     // Add global middleware to handle trailing slashes
//     app.use((req, res, next) => {
//       if (req.path.length > 1 && req.path.endsWith('/')) {
//         const query = req.url.slice(req.path.length);
//         res.redirect(301, req.path.slice(0, -1) + query);
//       } else {
//         next();
//       }
//     });
//
//     // Initialize NestJS (important to do this after all setup is complete)
//     await app.init();
//     logger.log('NestJS application initialized');
//
//     // Get final port
//     const finalPort = (() => {
//       const envPort = process.env.PORT;
//       const configPort = configService.get('app.port');
//       const defaultPort = 3000;
//
//       const selectedPort = Number(envPort) || Number(configPort) || defaultPort;
//       console.log(`Final port: ${selectedPort} (from env: ${envPort}, config: ${configPort}, default: ${defaultPort})`);
//       return selectedPort;
//     })();
//
//     // Close temporary server
//     console.log('NestJS initialization complete, closing temporary server...');
//     await new Promise<void>(resolve => {
//       tempServer.close(() => {
//         console.log('Temporary server closed.');
//         resolve();
//       });
//     });
//
//     // Start the NestJS server using the shared Express instance
//     console.log(`Starting NestJS server on port ${finalPort}...`);
//     const httpServer = http.createServer(server);
//     await new Promise<void>(resolve => {
//       httpServer.listen(finalPort, () => {
//         console.log('Server started');
//         resolve();
//       });
//     });
//
//     console.log(`=============================================`);
//     console.log(`NESTJS SERVER RUNNING: http://localhost:${finalPort}`);
//     console.log(`ROOT: http://localhost:${finalPort}/`);
//     console.log(`API: http://localhost:${finalPort}/api`);
//     console.log(`SWAGGER DOCS: http://localhost:${finalPort}/docs`);
//     console.log(`HEALTH CHECK: http://localhost:${finalPort}/health-check`);
//     console.log(`=============================================`);
//
//     logger.log(`Application is running on port: ${finalPort}`);
//
//     // Set server timeout
//     httpServer.setTimeout(30000); // 30 seconds
//
//     // Graceful shutdown handling
//     process.on('SIGTERM', async () => {
//       logger.log('SIGTERM received, shutting down gracefully');
//       try {
//         await app.close();
//         httpServer.close();
//         process.exit(0);
//       } catch (error) {
//         logger.error('Error during graceful shutdown', error);
//         process.exit(1);
//       }
//     });
//
//     return { app, server: httpServer };
//   } catch (error) {
//     logger.error('Failed to initialize NestJS application:', error);
//
//     // Log additional context for debugging
//     if (error instanceof Error) {
//       logger.error(`Error name: ${error.name}`);
//       logger.error(`Error message: ${error.message}`);
//       logger.error(`Error stack: ${error.stack}`);
//     }
//
//     // Don't exit - keep the temporary server running so Render detects a bound port
//     console.log('Keeping temporary server running despite NestJS initialization error');
//     return null;
//   }
// }
//
// // Global error handlers
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Promise Rejection:', reason);
// });
//
// bootstrap().catch(err => {
//   console.error('Unhandled error during bootstrap:', err);
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const express_1 = __importDefault(require("express"));
const swagger_service_1 = require("./swagger/swagger.service");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    console.log('Starting application bootstrap process...');
    try {
        // Create a single Express instance we'll use throughout
        const server = (0, express_1.default)();
        // Get port from environment (Render will provide this)
        const port = parseInt(process.env.PORT || '3000', 10);
        console.log(`Using port: ${port}`);
        // Create NestJS app with our Express instance
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        console.log('NestJS application created');
        const configService = app.get(config_1.ConfigService);
        // Configure CORS
        app.enableCors({
            origin: configService.get('app.cors.origins', '*'),
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials: true,
        });
        // Global validation pipe
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            validationError: {
                target: false,
                value: false
            },
        }));
        // Add root route and diagnostic routes directly to Express
        server.get('/', (req, res) => {
            res.json({
                name: 'Patient Relationship Manager API',
                version: '1.0',
                documentation: '/docs',
                status: 'running',
                timestamp: new Date().toISOString()
            });
        });
        server.get('/health', (req, res) => {
            res.json({ status: 'ok' });
        });
        server.get('/health-check', (req, res) => {
            res.json({ status: 'ok', time: new Date().toISOString() });
        });
        server.get('/api-debug', (req, res) => {
            res.json({
                status: 'ok',
                environment: process.env.NODE_ENV || 'development',
                isRender: !!process.env.RENDER,
                port: port,
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            });
        });
        logger.log('Direct routes configured');
        // Initialize Swagger BEFORE setting global prefix
        try {
            logger.log('Initializing Swagger documentation...');
            const swaggerService = new swagger_service_1.SwaggerService();
            swaggerService.setup(app);
            logger.log('Swagger documentation initialized successfully');
        }
        catch (swaggerError) {
            logger.error('Failed to initialize Swagger documentation:', swaggerError);
        }
        // Set global prefix AFTER Swagger setup
        app.setGlobalPrefix('api');
        logger.log('Global API prefix set to: /api');
        // Add global middleware to handle trailing slashes
        app.use((req, res, next) => {
            if (req.path.length > 1 && req.path.endsWith('/')) {
                const query = req.url.slice(req.path.length);
                res.redirect(301, req.path.slice(0, -1) + query);
            }
            else {
                next();
            }
        });
        // Initialize the NestJS application
        await app.init();
        logger.log('NestJS application initialized');
        // Start listening on the port
        await app.listen(port);
        logger.log(`Application is running on port: ${port}`);
        console.log(`=============================================`);
        console.log(`NESTJS SERVER RUNNING ON PORT: ${port}`);
        console.log(`ROOT: http://localhost:${port}/`);
        console.log(`API: http://localhost:${port}/api`);
        console.log(`SWAGGER DOCS: http://localhost:${port}/docs`);
        console.log(`HEALTH CHECK: http://localhost:${port}/health-check`);
        console.log(`DEBUG: http://localhost:${port}/api-debug`);
        console.log(`=============================================`);
        return app;
    }
    catch (error) {
        logger.error('Failed to initialize application:', error);
        // Log additional context for debugging
        if (error instanceof Error) {
            logger.error(`Error name: ${error.name}`);
            logger.error(`Error message: ${error.message}`);
            logger.error(`Error stack: ${error.stack}`);
        }
        // Re-throw to allow start.js to create fallback server
        throw error;
    }
}
// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});
bootstrap().catch(err => {
    console.error('Unhandled error during bootstrap:', err);
});
//# sourceMappingURL=main.js.map