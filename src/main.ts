import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pathsModule from './swagger/paths/index';
import * as schemasModule from './swagger/schemas/index';

import express from 'express';
import * as http from 'http';

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
    // Continue with normal NestJS initialization
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Set global prefix with exclusions for Swagger
    app.setGlobalPrefix('api', {
      exclude: [
        'api-docs',
        'api-docs-json',
        'swagger',
        'swagger-ui',
        'swagger-ui-express',
        'swagger-fallback',
        'api-docs/(.*)',
        'swagger/(.*)'
      ],
    });

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

    // Get final port
    const finalPort = (() => {
      const envPort = process.env.PORT;
      const configPort = configService.get('app.port');
      const defaultPort = 3000;

      const selectedPort = Number(envPort) || Number(configPort) || defaultPort;
      console.log(`Final port: ${selectedPort} (from env: ${envPort}, config: ${configPort}, default: ${defaultPort})`);
      return selectedPort;
    })();

    // Close temporary server
    console.log('NestJS initialization complete, closing temporary server...');
    await new Promise<void>(resolve => {
      tempServer.close(() => {
        console.log('Temporary server closed.');
        resolve();
      });
    });

    // Start the NestJS server
    console.log(`Starting NestJS server on port ${finalPort}...`);
    const server = await app.listen(finalPort);

    console.log(`=============================================`);
    console.log(`NESTJS SERVER RUNNING: http://localhost:${finalPort}`);
    console.log(`=============================================`);

    // Create a manual OpenAPI document to avoid circular dependencies
    try {
      // Set up config
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

      // Create an empty document structure first (without scanning entities)
      const document = {
        openapi: '3.0.0',
        info: config.info,
        tags: config.tags || [],
        paths: {},
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          },
          schemas: {}
        }
      };

      // Load custom paths directly
      try {
        if (pathsModule.getAllPaths) {
          const customPaths = pathsModule.getAllPaths();
          const pathKeys = Object.keys(customPaths);

          if (pathKeys.length > 0) {
            logger.log(`Adding ${pathKeys.length} custom API paths`);
            // Add paths directly to our document
            document.paths = customPaths as any;
            logger.log(`Custom paths added: ${pathKeys.slice(0, 5).join(', ')}${pathKeys.length > 5 ? '...' : ''}`);
          } else {
            logger.warn('No API paths were loaded from path files');
          }
        } else {
          logger.warn('getAllPaths function not found in paths module');
        }
      } catch (pathError) {
        logger.error('Failed to load custom API paths:', pathError);
        logger.error(pathError.stack);
      }

      // Load custom schemas directly
      try {
        if (schemasModule.getAllSchemas) {
          const customSchemas = schemasModule.getAllSchemas();
          const schemaKeys = Object.keys(customSchemas);

          if (schemaKeys.length > 0) {
            logger.log(`Adding ${schemaKeys.length} custom schemas`);
            // Add schemas directly to our document
            document.components.schemas = customSchemas as any;
            logger.log(`Custom schemas added: ${schemaKeys.slice(0, 5).join(', ')}${schemaKeys.length > 5 ? '...' : ''}`);
          } else {
            logger.warn('No schemas were loaded from schema files');
          }
        } else {
          logger.warn('getAllSchemas function not found in schemas module');
        }
      } catch (schemaError) {
        logger.error('Failed to load custom schemas:', schemaError);
        logger.error(schemaError.stack);
      }

      // Set up Swagger at both paths
      SwaggerModule.setup('api-docs', app, document as any, {
        swaggerOptions: {
          persistAuthorization: true,
          docExpansion: 'none',
          filter: true,
          showExtensions: true,
        }
      });

      SwaggerModule.setup('swagger', app, document as any, {
        swaggerOptions: {
          persistAuthorization: true,
          docExpansion: 'none',
          filter: true,
          showExtensions: true,
        }
      });

      // Add endpoint to serve OpenAPI JSON
      app.use('/api-docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
      });

      logger.log('Swagger documentation set up at /api-docs and /swagger');
    } catch (swaggerError) {
      logger.error('Failed to set up Swagger:', swaggerError);
      logger.error(swaggerError.stack);

      // Set up fallback documentation endpoint
      app.use('/swagger-fallback', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>API Documentation - Fallback</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #1976D2; }
                .endpoint { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                .method { font-weight: bold; color: #1976D2; }
                .path { font-family: monospace; }
              </style>
            </head>
            <body>
              <h1>PRM API Documentation</h1>
              <p>Swagger UI failed to load due to circular dependencies. Here's a basic API reference:</p>
              
              <div class="endpoint">
                <p><span class="method">POST</span> <span class="path">/api/auth/login</span></p>
                <p>User login with email/password</p>
              </div>
              
              <div class="endpoint">
                <p><span class="method">POST</span> <span class="path">/api/auth/register</span></p>
                <p>Register new user/organization</p>
              </div>
              
              <p>For complete API documentation, please fix circular dependencies in your entity models.</p>
            </body>
          </html>
        `);
      });
      logger.log('Fallback API documentation available at /swagger-fallback');
    }

    logger.log(`Application is running on port: ${finalPort}`);
    logger.log(`API documentation available at: /api-docs and /swagger`);

    // Set server timeout
    server.setTimeout(30000); // 30 seconds

    // Graceful shutdown handling
    process.on('SIGTERM', async () => {
      logger.log('SIGTERM received, shutting down gracefully');
      try {
        await app.close();
        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown', error);
        process.exit(1);
      }
    });

    return app;
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