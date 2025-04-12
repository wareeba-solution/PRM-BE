// import 'module-alias/register';
// import 'reflect-metadata';
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AppModule } from './app.module';
// import express from 'express';
// import * as http from 'http';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as dotenv from 'dotenv';
// import * as path from 'path';
// import { User } from './modules/users/entities/user.entity';
// import { Organization } from './modules/organizations/entities/organization.entity';
// import { Department } from './modules/departments/entities/department.entity';
// import { Ticket } from './modules/tickets/entities/ticket.entity';
// import { Message } from './modules/messages/entities/message.entity';
// import { Appointment } from './modules/appointments/entities/appointment.entity';
// import { Notification } from './modules/notifications/entities/notification.entity';
// import { Role } from './modules/users/enums/role.enum';
// import { setupSwagger } from './config/swagger.config';
//
// async function bootstrap() {
//   try {
//     // Load environment variables based on NODE_ENV
//     const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
//     dotenv.config({ path: path.resolve(process.cwd(), envFile) });
//
//     const logger = new Logger('Bootstrap');
//     console.log('Starting application bootstrap process...');
//
//     // Create Express app
//     const expressApp = express();
//     expressApp.use(express.json());
//     expressApp.use(express.urlencoded({ extended: true }));
//
//     // Serve static files from the public directory
//     expressApp.use(express.static(path.join(process.cwd(), 'public')));
//
//     // Define API module prefixes for reference (not for redirection)
//     const apiModulePrefixes = [
//       '/auth/',
//       '/tenant-onboarding/',
//       '/users/',
//       '/organizations/',
//       '/departments/',
//       '/patients/',
//       '/notifications/',
//       '/messages/',
//       '/tenants/'
//     ];
//
//     // Get port from environment or use default
//     const port = parseInt(process.env.PORT || '3000', 10);
//     logger.log(`Starting application on port ${port}`);
//     logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//     logger.log(`Using environment file: ${envFile}`);
//
//     // Create HTTP server with this Express app and start listening immediately
//     const server = http.createServer(expressApp);
//     server.listen(port, '0.0.0.0', () => {
//       console.log(`SERVER LISTENING ON PORT ${port} - RENDER SHOULD DETECT THIS`);
//     });
//
//     // Now continue with NestJS initialization
//     const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
//     console.log('NestJS application created');
//
//     // Get ConfigService using app.get()
//     const configService = app.get(ConfigService);
//
//     // Enable API versioning
//     // app.enableVersioning({
//     //   type: VersioningType.URI,
//     //   prefix: 'v',
//     //   defaultVersion: '1'
//     // });
//     logger.log('API versioning enabled with URI type, prefix "v" and default version "1"');
//
//     // Configure CORS
//     app.enableCors({
//       origin: process.env.CORS_ORIGINS?.split(',') || '*',
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//       credentials: true,
//       allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-Tenant-ID'],
//       exposedHeaders: ['Content-Range', 'X-Content-Range'],
//       maxAge: 3600
//     });
//
//     // Global validation pipe
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
//     // Override the root route with a more detailed one
//     expressApp.get('/', (req, res) => {
//       res.json({
//         name: 'Patient Relationship Manager API',
//         version: '1.0',
//         documentation: {
//           swagger: '/docs',
//           redoc: '/redoc'
//         },
//         status: 'running',
//         timestamp: new Date().toISOString()
//       });
//     });
//
//     // Add diagnostic routes
//     expressApp.get('/health-check', (req, res) => {
//       res.json({ status: 'ok', time: new Date().toISOString() });
//     });
//
//     expressApp.get('/api-debug', (req, res) => {
//       res.json({
//         status: 'ok',
//         environment: process.env.NODE_ENV || 'development',
//         isRender: !!process.env.RENDER,
//         port: port,
//         uptime: process.uptime(),
//         timestamp: new Date().toISOString()
//       });
//     });
//
//     // Add a fallback for favicon.ico
//     expressApp.get('/favicon.ico', (req, res) => {
//       res.status(204).send(); // No Content
//     });
//
//     // Setup Swagger and ReDoc documentation before setting global prefix
//     try {
//       setupSwagger(app);
//       console.log('Swagger and ReDoc documentation setup successfully');
//     } catch (error) {
//       console.error('Failed to setup Swagger documentation:', error.message);
//       console.log('API will continue to function without documentation');
//     }
//
//     // Set global prefix for all API routes
//     const apiPrefix = process.env.API_PREFIX || 'api';
//     app.setGlobalPrefix(apiPrefix, {
//       exclude: ['docs', 'swagger-ui', 'health-check', 'api-debug', '/']
//     });
//     logger.log(`Global API prefix set to: ${apiPrefix}`);
//
//     // Initialize the application after setting global prefix
//     // This ensures all routes are properly registered with the prefix
//     await app.init();
//     logger.log('NestJS application initialized');
//
//     // Log database connection details
//     console.log('Database connection details:');
//     if (process.env.DATABASE_URL) {
//       const dbUrl = new URL(process.env.DATABASE_URL);
//       console.log(`Host: ${dbUrl.hostname}`);
//       console.log(`Port: ${dbUrl.port}`);
//       console.log(`Username: ${dbUrl.username}`);
//       console.log(`Database: ${dbUrl.pathname.substring(1)}`);
//     } else {
//       console.log(`Host: ${process.env.DB_HOST}`);
//       console.log(`Port: ${process.env.DB_PORT}`);
//       console.log(`Username: ${process.env.DB_USERNAME}`);
//       console.log(`Database: ${process.env.DB_NAME}`);
//     }
//
//     // Debugging: Log all registered routes
//     const serverInstance = app.getHttpServer();
//     const router = serverInstance._events.request._router;
//     console.log('Registered routes:', router.stack.map((layer: any) => layer.route?.path).filter(Boolean));
//
//     logger.log('NestJS application initialized and ready');
//
//     console.log(`=============================================`);
//     console.log(`NESTJS SERVER RUNNING ON PORT: ${port}`);
//     console.log(`ROOT: /`);
//     console.log(`API: /api`);
//     console.log(`VERSIONED API: /api/v1`);
//     console.log(`API DOCS: /docs`);
//     console.log(`HEALTH CHECK: /health-check`);
//     console.log(`DEBUG: /api-debug`);
//     console.log(`=============================================`);
//
//     // Try different ports if the default one is in use
//     const basePort = parseInt(process.env.PORT || '3000', 10);
//     let currentPort = basePort;
//     let nestServer;
//
//     while (currentPort < basePort + 10) { // Try up to 10 different ports
//       try {
//         nestServer = await app.listen(currentPort);
//         console.log(`SERVER LISTENING ON PORT ${currentPort} - RENDER SHOULD DETECT THIS`);
//         break;
//       } catch (error) {
//         if (error.code === 'EADDRINUSE') {
//           console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}...`);
//           currentPort++;
//         } else {
//           throw error;
//         }
//       }
//     }
//
//     if (!nestServer) {
//       throw new Error('Could not find an available port');
//     }
//
//     // Log startup information
//     console.log(`Application is running on: ${await app.getUrl()}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//     console.log(`Using environment file: ${envFile}`);
//
//     // Log API Documentation URL
//     console.log('API Documentation available at:');
//     console.log(`- API Documentation: ${await app.getUrl()}/docs`);
//
//     return { app, server: nestServer };
//   } catch (error) {
//     console.error('Failed to start application:', error);
//     process.exit(1);
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



import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import express from 'express';
import * as http from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from './modules/users/entities/user.entity';
import { Organization } from './modules/organizations/entities/organization.entity';
import { Department } from './modules/departments/entities/department.entity';
import { Ticket } from './modules/tickets/entities/ticket.entity';
import { Message } from './modules/messages/entities/message.entity';
import { Appointment } from './modules/appointments/entities/appointment.entity';
import { Notification } from './modules/notifications/entities/notification.entity';
import { Role } from './modules/users/enums/role.enum';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  try {
    // Load environment variables based on NODE_ENV
    const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
    dotenv.config({ path: path.resolve(process.cwd(), envFile) });

    const logger = new Logger('Bootstrap');
    console.log('Starting application bootstrap process...');

    // Create Express app
    const expressApp = express();
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));

    // Serve static files from the public directory
    expressApp.use(express.static(path.join(process.cwd(), 'public')));

    // Define API module prefixes for reference (not for redirection)
    const apiModulePrefixes = [
      '/auth/',
      '/tenant-onboarding/',
      '/users/',
      '/organizations/',
      '/departments/',
      '/patients/',
      '/notifications/',
      '/messages/',
      '/tenants/'
    ];

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
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    console.log('NestJS application created');

    // Get ConfigService using app.get()
    const configService = app.get(ConfigService);

    // API versioning is now handled through the global prefix and Swagger config
    // We no longer use NestJS built-in versioning to avoid duplication
    logger.log('API versioning is handled through global prefix');

    // Configure CORS
    app.enableCors({
      origin: process.env.CORS_ORIGINS?.split(',') || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-Tenant-ID'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      maxAge: 3600
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
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
          swagger: '/docs',
          redoc: '/redoc'
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
      setupSwagger(app);
      console.log('Swagger and ReDoc documentation setup successfully');
    } catch (error) {
      console.error('Failed to setup Swagger documentation:', error.message);
      console.log('API will continue to function without documentation');
    }

    // Set global prefix for all API routes
    const apiPrefix = process.env.API_PREFIX || 'api';
    app.setGlobalPrefix(apiPrefix, {
      exclude: ['docs', 'swagger-ui', 'health-check', 'api-debug', '/']
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
    } else {
      console.log(`Host: ${process.env.DB_HOST}`);
      console.log(`Port: ${process.env.DB_PORT}`);
      console.log(`Username: ${process.env.DB_USERNAME}`);
      console.log(`Database: ${process.env.DB_NAME}`);
    }

    // Debugging: Log all registered routes
    const serverInstance = app.getHttpServer();
    const router = serverInstance._events.request._router;
    console.log('Registered routes:', router.stack.map((layer: any) => layer.route?.path).filter(Boolean));

    logger.log('NestJS application initialized and ready');

    console.log(`=============================================`);
    console.log(`NESTJS SERVER RUNNING ON PORT: ${port}`);
    console.log(`ROOT: /`);
    console.log(`API: /api`);
    console.log(`VERSIONED API: /api/v1`);
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
      } catch (error) {
        if (error.code === 'EADDRINUSE') {
          console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}...`);
          currentPort++;
        } else {
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

    // Log API Documentation URL
    console.log('API Documentation available at:');
    console.log(`- API Documentation: ${await app.getUrl()}/docs`);

    return { app, server: nestServer };
  } catch (error) {
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