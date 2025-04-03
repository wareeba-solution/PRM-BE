import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger/swagger.service';
import * as express from 'express';
import * as http from 'http';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  console.log('Starting application bootstrap process...');

  // Determine port early
  const port = process.env.PORT || 3000;
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
  tempServer.listen(port, '0.0.0.0', () => {
    console.log(`=============================================`);
    console.log(`TEMPORARY SERVER RUNNING ON PORT: ${port}`);
    console.log(`=============================================`);
  });

  try {
    // Continue with normal NestJS initialization
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Set global prefix if needed
    app.setGlobalPrefix('api');

    // Initialize our custom Swagger service
    const swaggerService = new SwaggerService();

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

    // Set up Swagger
    try {
      swaggerService.setup(app);
    } catch (swaggerError) {
      logger.warn('Failed to set up Swagger:', swaggerError);
    }

    // Final port confirmation
    const finalPort = (() => {
      const envPort = process.env.PORT;
      const configPort = configService.get('app.port');
      const defaultPort = 3000;

      const selectedPort = Number(envPort) || Number(configPort) || defaultPort;
      console.log(`Final port: ${selectedPort} (from env: ${envPort}, config: ${configPort}, default: ${defaultPort})`);
      return selectedPort;
    })();

    // Once NestJS is ready, close the temporary server and use NestJS instead
    console.log('NestJS initialization complete, closing temporary server...');
    await new Promise(resolve => {
      tempServer.close(() => {
        console.log('Temporary server closed.');
        resolve(null);
      });
    });

    // Start the NestJS server
    console.log(`Starting NestJS server on port ${finalPort}...`);
    const server = await app.listen(finalPort, '0.0.0.0');

    // Log port binding
    console.log(`=============================================`);
    console.log(`NESTJS SERVER RUNNING: http://0.0.0.0:${finalPort}`);
    console.log(`=============================================`);
    logger.log(`Application is running on port: ${finalPort}`);
    logger.log(`API documentation available at: /api-docs`);

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

// Add global error handler to prevent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Don't exit the process, just log the error
});

bootstrap().catch(err => {
  console.error('Unhandled error during bootstrap:', err);
  // Don't exit process on bootstrap errors to keep temp server running
});