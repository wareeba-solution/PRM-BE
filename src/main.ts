import './build-workarounds';
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

    // Initialize our custom Swagger service
    const swaggerService = new SwaggerService();

    app.enableCors({
      origin: configService.get('app.cors.origins'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: { target: false, value: false },
    }));

    // Set up Swagger
    swaggerService.setup(app);

    // Start server - modified for Render compatibility
    const port = process.env.PORT || configService.get('app.port') || 3000;
    await app.listen(port, '0.0.0.0'); // Bind to all interfaces, not just localhost

    logger.log(`Application is running on port: ${port}`);
    logger.log(`API documentation available at: /api-docs`);

    return app;
  } catch (error) {
    logger.error('Failed to initialize application:');
    logger.error(error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error('Critical error during application bootstrap:', err);
  process.exit(1);
});