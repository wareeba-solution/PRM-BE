import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import express from 'express';
import * as http from 'http';
import { SwaggerService } from './swagger/swagger.service';

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

    // *** IMPORTANT: Initialize Swagger BEFORE setting global prefix ***
    try {
      logger.log('Initializing Swagger documentation...');
      const swaggerService = new SwaggerService(); // Create instance directly
      swaggerService.setup(app);
      logger.log('Swagger documentation initialized successfully.');
    } catch (swaggerError) {
      logger.error('Failed to initialize Swagger documentation:', swaggerError);
      // Continue app startup even if Swagger fails
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
    console.log(`SWAGGER DOCS: http://localhost:${finalPort}/swagger`);
    console.log(`API DOCS: http://localhost:${finalPort}/api-docs`);
    console.log(`=============================================`);

    logger.log(`Application is running on port: ${finalPort}`);

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