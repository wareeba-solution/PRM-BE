import 'module-alias/register';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
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

    // Determine port with multiple fallback mechanisms
    const port = (() => {
      const envPort = process.env.PORT;
      const configPort = configService.get('app.port');
      const defaultPort = 3000;

      return Number(envPort) || Number(configPort) || defaultPort;
    })();

    // Enhanced listening with timeout and error handling
    const server = await app.listen(port, '0.0.0.0', () => {
      logger.log(`Application is running on port: ${port}`);
      logger.log(`API documentation available at: /api-docs`);
    });

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
    logger.error('Failed to initialize application:', error);

    // Log additional context for debugging
    if (error instanceof Error) {
      logger.error(`Error name: ${error.name}`);
      logger.error(`Error message: ${error.message}`);
      logger.error(`Error stack: ${error.stack}`);
    }

    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error('Unhandled error during bootstrap:', err);
  process.exit(1);
});