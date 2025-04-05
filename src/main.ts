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



import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import express from 'express';
import * as http from 'http';
import { SwaggerService } from './swagger/swagger.service';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  console.log('Starting application bootstrap process...');

  // CRITICAL: Get port from environment - Render requires this
  const port = parseInt(process.env.PORT || '3000', 10);
  console.log(`RENDER PORT: ${port}`);

  // Create a basic Express app and IMMEDIATELY start listening
  // This is crucial for Render to detect that port is in use
  const expressApp = express();

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
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    console.log('NestJS application created');

    const configService = app.get(ConfigService);

    // Configure CORS
    app.enableCors({
      origin: configService.get('app.cors.origins', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
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

    // Initialize Swagger BEFORE setting global prefix
    try {
      logger.log('Initializing Swagger documentation...');
      const swaggerService = new SwaggerService();
      swaggerService.setup(app);
      logger.log('Swagger documentation initialized successfully');
    } catch (swaggerError) {
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
  } catch (error) {
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