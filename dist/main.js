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
const http = __importStar(require("http"));
const swagger_service_1 = require("./swagger/swagger.service");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    console.log('Starting application bootstrap process...');
    // CRITICAL: Get port from environment - Render requires this
    const port = parseInt(process.env.PORT || '3000', 10);
    console.log(`RENDER PORT: ${port}`);
    // Create a basic Express app and IMMEDIATELY start listening
    // This is crucial for Render to detect that port is in use
    const expressApp = (0, express_1.default)();
    // Basic health check route
    expressApp.get('/', (req, res) => {
        res.json({ status: 'ok', message: 'Service is running' });
    });
    // Create HTTP server with this Express app and start listening immediately
    const server = http.createServer(expressApp);
    server.listen(port, '0.0.0.0', () => {
        console.log(`SERVER LISTENING ON PORT ${port} - RENDER SHOULD DETECT THIS`);
    });
    try {
        // Now continue with NestJS initialization
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
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
        // Override the root route with a more detailed one
        expressApp.get('/', (req, res) => {
            res.json({
                name: 'Patient Relationship Manager API',
                version: '1.0',
                documentation: '/docs',
                status: 'running',
                timestamp: new Date().toISOString()
            });
        });
        // Add diagnostic routes
        expressApp.get('/health-check', (req, res) => {
            res.json({ status: 'ok', time: new Date().toISOString() });
        });
        expressApp.get('/api-debug', (req, res) => {
            res.json({
                status: 'ok',
                environment: process.env.NODE_ENV || 'development',
                isRender: !!process.env.RENDER,
                port: port,
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            });
        });
        // Log database connection details
        console.log('Database connection details:');
        if (process.env.DATABASE_URL) {
            const url = new URL(process.env.DATABASE_URL);
            console.log(`Database URL: ${url.protocol}//${url.username}:****@${url.hostname}:${url.port}${url.pathname}`);
        }
        else {
            console.log(`Host: ${process.env.DB_HOST}`);
            console.log(`Port: ${process.env.DB_PORT}`);
            console.log(`Username: ${process.env.DB_USERNAME}`);
            console.log(`Database: ${process.env.DB_NAME}`);
        }
        console.log(`SSL: ${process.env.DB_SSL}`);
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
        // Initialize the NestJS application
        await app.init();
        logger.log('NestJS application initialized and ready');
        console.log(`=============================================`);
        console.log(`NESTJS SERVER RUNNING ON PORT: ${port}`);
        console.log(`ROOT: /`);
        console.log(`API: /api`);
        console.log(`SWAGGER DOCS: /docs`);
        console.log(`HEALTH CHECK: /health-check`);
        console.log(`DEBUG: /api-debug`);
        console.log(`=============================================`);
        // Don't call app.listen() as we're already listening with the HTTP server
        return { app, server };
    }
    catch (error) {
        logger.error('Failed to initialize application:', error);
        // Even if initialization fails, keep the server running
        // so Render can detect that we're binding to the port
        // Log additional context for debugging
        if (error instanceof Error) {
            logger.error(`Error name: ${error.name}`);
            logger.error(`Error message: ${error.message}`);
            logger.error(`Error stack: ${error.stack}`);
        }
        return { server };
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