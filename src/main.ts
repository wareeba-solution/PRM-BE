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
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

    // Log database connection details
    console.log('Database connection details:');
    if (process.env.DATABASE_URL) {
      try {
        const url = new URL(process.env.DATABASE_URL);
        console.log(`Database URL: ${url.protocol}//${url.username}:****@${url.hostname}:${url.port}${url.pathname}`);
        console.log(`Database SSL: ${process.env.DB_SSL === 'true' ? 'Enabled' : 'Disabled'}`);
      } catch (error) {
        console.error('Error parsing DATABASE_URL:', error.message);
        console.log('Using individual connection parameters instead');
        console.log(`Host: ${process.env.DB_HOST}`);
        console.log(`Port: ${process.env.DB_PORT}`);
        console.log(`Username: ${process.env.DB_USERNAME}`);
        console.log(`Database: ${process.env.DB_NAME}`);
      }
    } else {
      console.log(`Host: ${process.env.DB_HOST}`);
      console.log(`Port: ${process.env.DB_PORT}`);
      console.log(`Username: ${process.env.DB_USERNAME}`);
      console.log(`Database: ${process.env.DB_NAME}`);
    }

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