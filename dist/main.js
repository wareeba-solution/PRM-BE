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
const platform_express_1 = require("@nestjs/platform-express");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    var _a;
    try {
        // Load environment variables based on NODE_ENV
        const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
        const logger = new common_1.Logger('Bootstrap');
        console.log('Starting application bootstrap process...');
        // Create Express app
        const expressApp = (0, express_1.default)();
        expressApp.use(express_1.default.json());
        expressApp.use(express_1.default.urlencoded({ extended: true }));
        // Serve static files from the public directory
        expressApp.use(express_1.default.static(path.join(process.cwd(), 'public')));
        // Get port from environment or use default
        const port = parseInt(process.env.PORT || '3000', 10);
        logger.log(`Starting application on port ${port}`);
        logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        logger.log(`Using environment file: ${envFile}`);
        // Create HTTP server with this Express app and start listening immediately
        const server = http.createServer(expressApp);
        server.listen(port, '0.0.0.0', () => {
            console.log(`SERVER LISTENING ON PORT ${port} - RENDER SHOULD DETECT THIS`);
        });
        // Now continue with NestJS initialization
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        console.log('NestJS application created');
        const configService = app.get(config_1.ConfigService);
        // Configure CORS
        app.enableCors({
            origin: ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            maxAge: 3600
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
                documentation: {
                    swagger: '/api-docs',
                    redoc: '/docs'
                },
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
        // Add a fallback for favicon.ico
        expressApp.get('/favicon.ico', (req, res) => {
            res.status(204).send(); // No Content
        });
        // Setup Swagger and ReDoc documentation before setting global prefix
        try {
            (0, swagger_config_1.setupSwagger)(app);
            console.log('Swagger and ReDoc documentation setup successfully');
        }
        catch (error) {
            console.error('Failed to setup Swagger documentation:', error.message);
            console.log('API will continue to function without documentation');
        }
        // Set global prefix for all API routes
        const apiPrefix = process.env.API_PREFIX || 'api';
        app.setGlobalPrefix(apiPrefix, {
            exclude: ['docs', 'docs-json', 'health-check', 'api-debug', '/']
        });
        logger.log(`Global API prefix set to: ${apiPrefix}`);
        // Initialize the application after setting global prefix
        // This ensures all routes are properly registered with the prefix
        await app.init();
        logger.log('NestJS application initialized');
        // Log database connection details
        console.log('Database connection details:');
        if (process.env.DATABASE_URL) {
            const dbUrl = new URL(process.env.DATABASE_URL);
            console.log(`Host: ${dbUrl.hostname}`);
            console.log(`Port: ${dbUrl.port}`);
            console.log(`Username: ${dbUrl.username}`);
            console.log(`Database: ${dbUrl.pathname.substring(1)}`);
        }
        else {
            console.log(`Host: ${process.env.DB_HOST}`);
            console.log(`Port: ${process.env.DB_PORT}`);
            console.log(`Username: ${process.env.DB_USERNAME}`);
            console.log(`Database: ${process.env.DB_NAME}`);
        }
        // Debugging: Log all registered routes
        const serverInstance = app.getHttpServer();
        const router = serverInstance._events.request._router;
        console.log('Registered routes:', router.stack.map((layer) => { var _a; return (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path; }).filter(Boolean));
        logger.log('NestJS application initialized and ready');
        console.log(`=============================================`);
        console.log(`NESTJS SERVER RUNNING ON PORT: ${port}`);
        console.log(`ROOT: /`);
        console.log(`API: /api`);
        console.log(`API DOCS: /docs`);
        console.log(`HEALTH CHECK: /health-check`);
        console.log(`DEBUG: /api-debug`);
        console.log(`=============================================`);
        // Try different ports if the default one is in use
        const basePort = parseInt(process.env.PORT || '3000', 10);
        let currentPort = basePort;
        let nestServer;
        while (currentPort < basePort + 10) { // Try up to 10 different ports
            try {
                nestServer = await app.listen(currentPort);
                console.log(`SERVER LISTENING ON PORT ${currentPort} - RENDER SHOULD DETECT THIS`);
                break;
            }
            catch (error) {
                if (error.code === 'EADDRINUSE') {
                    console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}...`);
                    currentPort++;
                }
                else {
                    throw error;
                }
            }
        }
        if (!nestServer) {
            throw new Error('Could not find an available port');
        }
        // Log startup information
        console.log(`Application is running on: ${await app.getUrl()}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Using environment file: ${envFile}`);
        // Log database connection details
        console.log('Database connection details:');
        if (process.env.DATABASE_URL) {
            const dbUrl = new URL(process.env.DATABASE_URL);
            console.log(`Host: ${dbUrl.hostname}`);
            console.log(`Port: ${dbUrl.port}`);
            console.log(`Username: ${dbUrl.username}`);
            console.log(`Database: ${dbUrl.pathname.substring(1)}`);
        }
        else {
            console.log(`Host: ${process.env.DB_HOST}`);
            console.log(`Port: ${process.env.DB_PORT}`);
            console.log(`Username: ${process.env.DB_USERNAME}`);
            console.log(`Database: ${process.env.DB_NAME}`);
        }
        // Log API Documentation URL
        console.log('API Documentation available at:');
        console.log(`- ReDoc UI: ${await app.getUrl()}/docs`);
        return { app, server: nestServer };
    }
    catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
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