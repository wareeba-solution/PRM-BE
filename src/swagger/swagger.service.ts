// import { Injectable, Logger } from '@nestjs/common';
// import { INestApplication } from '@nestjs/common';
// import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ManualOpenAPIObject } from './interfaces/manual-api.interface';
// import { getAllSchemas } from './schemas';
// import { getAllPaths } from './paths';
// import { ConfigService } from '@nestjs/config';
//
// @Injectable()
// export class SwaggerService {
//   private readonly logger = new Logger(SwaggerService.name);
//
//   setup(app: INestApplication): void {
//     try {
//       // Get config service
//       const configService = app.get(ConfigService);
//       const isProduction = configService.get('app.nodeEnv') === 'production';
//       const docsEnabled = configService.get('app.docsEnabled');
//
//       // Skip Swagger setup in production unless explicitly enabled
//       if (isProduction && !docsEnabled) {
//         this.logger.log('Swagger documentation disabled in production');
//         return;
//       }
//
//       this.logger.log('Setting up manual Swagger documentation...');
//
//       const config = new DocumentBuilder()
//         .setTitle('Patient Relationship Manager API')
//         .setDescription('API Documentation for PRM')
//         .setVersion('1.0')
//         .addBearerAuth()
//         .addTag('Auth', 'Authentication endpoints')
//         .addTag('Users', 'User management endpoints')
//         .addTag('Organizations', 'Organization management endpoints')
//         .addTag('Contacts', 'Contact management endpoints')
//         .addTag('Appointments', 'Appointment scheduling endpoints')
//         .addTag('Tickets', 'Support ticket endpoints')
//         .addTag('Messages', 'Messaging functionality endpoints')
//         .addTag('Notifications', 'Notification management endpoints')
//         .build();
//
//       // Create a manual document
//       const document: ManualOpenAPIObject = {
//         ...config,
//         paths: getAllPaths(),
//         components: {
//           schemas: getAllSchemas(),
//           securitySchemes: {
//             bearerAuth: {
//               type: 'http',
//               scheme: 'bearer',
//               bearerFormat: 'JWT'
//             }
//           }
//         }
//       };
//
//       NestSwaggerModule.setup('api-docs', app, document as any);
//       this.logger.log('Manual Swagger documentation setup at /api-docs path');
//     } catch (error) {
//       this.logger.error(`Failed to set up Swagger: ${error.message}`);
//       this.logger.error(error.stack);
//     }
//   }
// }



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
      const docsEnabled = configService.get('app.docsEnabled');

      // Skip Swagger setup in production unless explicitly enabled
      if (isProduction && !docsEnabled) {
        this.logger.log('Swagger documentation disabled in production');
        return;
      }

      this.logger.log('Setting up manual Swagger documentation...');

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

      // Additional error handling for Swagger setup
      try {
        NestSwaggerModule.setup('api-docs', app, document as any);
        this.logger.log('Manual Swagger documentation setup at /api-docs path');
      } catch (swaggerSetupError) {
        this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
      }
    } catch (error) {
      this.logger.error(`Critical error in Swagger setup: ${error.message}`);
      this.logger.error(error.stack);
    }
  }
}