import { Injectable, Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ManualOpenAPIObject } from './interfaces/manual-api.interface';
import * as schemasModule from './schemas/index';
import * as pathsModule from './paths/index';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerService {
  private readonly logger = new Logger(SwaggerService.name);

  setup(app: INestApplication): void {
    try {
      // Get config service
      const configService = app.get(ConfigService);
      const isProduction = configService.get('app.nodeEnv') === 'production';

      // Log environment details for debugging
      this.logger.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);

      // Optional: Force Swagger to be available in all environments
      this.logger.log('Setting up Swagger documentation...');

      const config = new DocumentBuilder()
          .setTitle('Patient Relationship Manager API')
          .setDescription('API Documentation for PRM')
          .setVersion('1.0')
          .addBearerAuth()
          .addTag('Auth', 'Authentication endpoints')
          .addTag('Users', 'User management endpoints')
          .addTag('Organizations', 'Organization management endpoints')
          .addTag('Contacts', 'Contact management endpoints')
          .addTag('Appointments', 'Appointment scheduling endpoints')
          .addTag('Tickets', 'Support ticket endpoints')
          .addTag('Messages', 'Messaging functionality endpoints')
          .addTag('Notifications', 'Notification management endpoints')
          .build();

      // Safely get paths and schemas
      let paths = {};
      let schemas = {};

      try {
        paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
        this.logger.log(`Loaded ${Object.keys(paths).length} API paths`);
      } catch (pathError) {
        this.logger.error('Failed to load paths:', pathError);
      }

      try {
        schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
        this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
      } catch (schemaError) {
        this.logger.error('Failed to load schemas:', schemaError);
      }

      // Create a manual document
      const document: ManualOpenAPIObject = {
        ...config,
        paths,
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      };

      // Setup Swagger with increased error handling
      try {
        // Use dynamic route for Swagger in production vs development
        const swaggerRoute = isProduction ? 'api-docs' : 'api-docs';

        NestSwaggerModule.setup(swaggerRoute, app, document as any, {
          swaggerOptions: {
            persistAuthorization: true,
            // Optional: Add basic authentication for production
            ...(isProduction ? {
              authAction: {
                defaultSecurityScheme: 'bearerAuth'
              }
            } : {})
          }
        });

        this.logger.log(`Swagger documentation setup at /${swaggerRoute} path`);
      } catch (swaggerSetupError) {
        this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
        // Rethrow to ensure it's not silently ignored
        throw swaggerSetupError;
      }
    } catch (error) {
      this.logger.error(`Critical error in Swagger setup: ${error.message}`);
      this.logger.error(error.stack);

      // Optional: You might want to rethrow or handle this differently
      throw error;
    }
  }
}