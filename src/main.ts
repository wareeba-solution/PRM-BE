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

  // Determine port early
  const port = parseInt(process.env.PORT || '3000', 10);
  console.log(`Using port: ${port}`);

  // Create a simple Express app that binds to the port immediately
  const tempApp = express();
  tempApp.get('/', (req, res) => {
    res.json({ status: 'Starting', message: 'Application is initializing...' });
  });
  tempApp.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Start the temporary server immediately
  const tempServer = http.createServer(tempApp);
  tempServer.listen(port, () => {
    console.log(`=============================================`);
    console.log(`TEMPORARY SERVER RUNNING ON PORT: ${port}`);
    console.log(`=============================================`);
  });

  try {
    // Create a shared Express instance for better control
    const server = express();

    // Add root route handler to the shared Express instance
    server.get('/', (req, res) => {
      res.json({
        name: 'Patient Relationship Manager API',
        version: '1.0',
        documentation: '/docs',
        status: 'running',
        timestamp: new Date().toISOString()
      });
    });

    // Continue with normal NestJS initialization using the Express instance
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    const configService = app.get(ConfigService);

    // Configure CORS with more robust handling
    app.enableCors({
      origin: configService.get('app.cors.origins', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    });

    // Global validation pipe with enhanced configuration
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

    // Add direct Express routes for diagnostics
    server.get('/health-check', (req, res) => {
      res.json({ status: 'ok', time: new Date().toISOString() });
    });

    server.get('/swagger-health', (req, res) => {
      res.json({ status: 'ok', time: new Date().toISOString() });
    });

    // Add a server debug endpoint
    server.get('/server-debug', (req, res) => {
      res.json({
        mainServer: 'running',
        serverType: 'main',
        timestamp: new Date().toISOString()
      });
    });

    logger.log('Direct health check endpoints created');

    // *** IMPORTANT: Initialize Swagger BEFORE setting global prefix ***
    try {
      logger.log('Initializing Swagger documentation...');
      const swaggerService = new SwaggerService();
      swaggerService.setup(app);
      logger.log('Swagger documentation initialized successfully.');
    } catch (swaggerError) {
      logger.error('Failed to initialize Swagger documentation:', swaggerError);
      logger.error(swaggerError.stack);
    }

    // Set global prefix AFTER Swagger setup
    app.setGlobalPrefix('api');
    logger.log('Global API prefix set to: /api');

    // Add global middleware to handle trailing slashes
    app.use((req, res, next) => {
      if (req.path.length > 1 && req.path.endsWith('/')) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        next();
      }
    });

    // Initialize NestJS (important to do this after all setup is complete)
    await app.init();
    logger.log('NestJS application initialized');

    // Important: Close temporary server BEFORE starting the main server
    console.log('NestJS initialization complete, closing temporary server...');
    try {
      await new Promise<void>((resolve, reject) => {
        tempServer.close((err) => {
          if (err) {
            console.error('Error closing temporary server:', err);
            // Still resolve even on error - we need to continue
            resolve();
          } else {
            console.log('Temporary server closed successfully.');
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Exception while closing temporary server:', error);
      // Continue anyway - we need to start the main server
    }

    // Get final port (which should be the same as the initial port)
    const finalPort = port;
    console.log(`Using port for main server: ${finalPort}`);

    // Start the NestJS server using the shared Express instance
    console.log(`Starting NestJS server on port ${finalPort}...`);
    const httpServer = http.createServer(server);

    try {
      await new Promise<void>((resolve, reject) => {
        httpServer.listen(finalPort, () => {
          console.log(`Main server started on port ${finalPort}`);
          resolve();
        });

        // Add error handler for the listen operation with proper typing
        httpServer.on('error', (err: NodeJS.ErrnoException) => {
          if (err.code === 'EADDRINUSE') {
            console.error(`Port ${finalPort} is already in use! This may be because the temporary server wasn't closed properly.`);
          } else {
            console.error('Server error:', err);
          }
          reject(err);
        });
      });

      console.log(`=============================================`);
      console.log(`NESTJS SERVER RUNNING: http://localhost:${finalPort}`);
      console.log(`ROOT: http://localhost:${finalPort}/`);
      console.log(`API: http://localhost:${finalPort}/api`);
      console.log(`SWAGGER DOCS: http://localhost:${finalPort}/docs`);
      console.log(`HEALTH CHECK: http://localhost:${finalPort}/health-check`);
      console.log(`SERVER DEBUG: http://localhost:${finalPort}/server-debug`);
      console.log(`=============================================`);

      logger.log(`Application is running on port: ${finalPort}`);

      // Set server timeout
      httpServer.setTimeout(30000); // 30 seconds

      // Graceful shutdown handling
      process.on('SIGTERM', async () => {
        logger.log('SIGTERM received, shutting down gracefully');
        try {
          await app.close();
          httpServer.close();
          process.exit(0);
        } catch (error) {
          logger.error('Error during graceful shutdown', error);
          process.exit(1);
        }
      });

      return { app, server: httpServer };
    } catch (serverError) {
      console.error('Failed to start main server:', serverError);
      throw serverError;
    }
  } catch (error) {
    logger.error('Failed to initialize NestJS application:', error);

    // Log additional context for debugging
    if (error instanceof Error) {
      logger.error(`Error name: ${error.name}`);
      logger.error(`Error message: ${error.message}`);
      logger.error(`Error stack: ${error.stack}`);
    }

    // Don't exit - keep the temporary server running so Render detects a bound port
    console.log('Keeping temporary server running despite NestJS initialization error');

    // Update the root route of the temporary server to show error info
    tempApp.get('/', (req, res) => {
      res.json({
        status: 'Error',
        message: 'Application initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        serverType: 'temporary'
      });
    });

    return null;
  }
}

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

bootstrap().catch(err => {
  console.error('Unhandled error during bootstrap:', err);
});