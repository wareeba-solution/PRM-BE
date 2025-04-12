import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

// Import all DTOs for Swagger documentation
import {
  BaseDto,
  UserDto,
  OrganizationDto,
  TicketDto,
  ContactDto,
  ContactRelationshipDto,
  AppointmentDto,
  NotificationDto,
  MessageDto,
  DepartmentDto,
  DocumentDto,
  MedicalHistoryDto,
  MergedRecordDto
} from './swagger-dto';

// Import new DTOs
import {
  RegisterDto,
  RegisterUserDto,
  RegisterOrganizationDto,
  VerifyEmailDto,
  ResetPasswordDto
} from './swagger-dto/auth/user-account.dto';

/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
 */

/**
 * Sets up Swagger documentation for the application
 */
export function setupSwagger(app: INestApplication): void {
  // Use app.get() to retrieve ConfigService for configuration
  const configService = app.get(ConfigService);
  const appVersion = configService.get('APP_VERSION', '1.0');
  const apiEnv = configService.get('NODE_ENV', 'development');

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Create Swagger document configuration
  const config = new DocumentBuilder()
      .setTitle('Patient Relationship Manager API')
      .setDescription(`API documentation for the Patient Relationship Manager application (${apiEnv})`)
      .setVersion(appVersion)
      .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth',
      )
      // IMPORTANT: Set server URL to just /api to avoid duplicating version prefix
      .addApiKey({ type: 'apiKey', name: 'X-Tenant-ID', in: 'header' }, 'tenant-id')
      .addServer('/api', 'API Base')
      .addTag('Authentication', 'Authentication and user management endpoints')
      .addTag('Tenants', 'Tenant management endpoints')
      .addTag('Organizations', 'Organization management endpoints')
      .build();

  try {
    // Create the Swagger document with safe options to avoid circular dependency issues
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: false, // Prevent deep scanning which can cause circular dependency issues
      extraModels: [
        BaseDto,
        UserDto,
        OrganizationDto,
        TicketDto,
        ContactDto,
        ContactRelationshipDto,
        AppointmentDto,
        NotificationDto,
        MessageDto,
        DepartmentDto,
        DocumentDto,
        MedicalHistoryDto,
        MergedRecordDto,
        // Add new DTOs
        RegisterDto,
        RegisterUserDto,
        RegisterOrganizationDto,
        VerifyEmailDto,
        ResetPasswordDto
      ]
    });

    // Manually add schemas if they're not being detected automatically
    if (!document.components) {
      document.components = {};
    }

    if (!document.components.schemas) {
      document.components.schemas = {};
    }

    // Add DTOs to schemas explicitly
    const schemaMap = {
      BaseDto,
      UserDto,
      OrganizationDto,
      TicketDto,
      ContactDto,
      ContactRelationshipDto,
      AppointmentDto,
      NotificationDto,
      MessageDto,
      DepartmentDto,
      DocumentDto,
      MedicalHistoryDto,
      MergedRecordDto,
      // Add new DTOs
      RegisterDto,
      RegisterUserDto,
      RegisterOrganizationDto,
      VerifyEmailDto,
      ResetPasswordDto
    };

    // Add each DTO to the schemas
    Object.entries(schemaMap).forEach(([key, value]) => {
      if (!document.components.schemas[key]) {
        // Create a schema object with the correct type
        const schemaObject: any = {
          type: 'object',
          properties: {}
        };

        // Extract properties from class metadata
        const prototype = value.prototype;
        if (prototype) {
          const properties = Reflect.getMetadata('swagger/apiProperties', prototype) || {};
          schemaObject.properties = properties;
        }

        // Add the schema to the document
        document.components.schemas[key] = schemaObject;
      }
    });

    // Filter out undefined models which can cause errors
    const filteredDocument = {
      ...document,
      components: {
        ...document.components,
        schemas: Object.entries(document.components?.schemas || {})
            .filter(([_, schema]) => schema !== undefined)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      },
    };

    // Log available schemas for debugging
    console.log('Available schemas:', Object.keys(filteredDocument.components?.schemas || {}).length);

    // Setup Swagger with NestJS using the default setup
    SwaggerModule.setup('docs', app, filteredDocument, {
      useGlobalPrefix: true, // Changed to true to respect the global API prefix
      customSiteTitle: `PRM API Documentation - ${apiEnv.toUpperCase()}`,
      explorer: true, // Enable explorer to make schemas more accessible
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none', // Start with all sections collapsed
        filter: true,
        deepLinking: true,
        defaultModelsExpandDepth: 1, // Show schemas section by default
        displayRequestDuration: true,
        showExtensions: true,
        showCommonExtensions: true,
        // Add options for versioning - adjusted to use the correct paths
        urls: [
          {
            url: '/docs-json',
            name: 'API'
          }
        ]
      },
    });

    // Document API versioning in the Swagger UI - using app endpoints with app.get
    app.getHttpAdapter().get('/api-version', (req, res) => {
      res.json({
        appName: 'Patient Relationship Manager API',
        version: appVersion,
        environment: apiEnv,
        baseUrl: '/api',
        documentation: '/docs'
      });
    });

    console.log('Swagger documentation setup successfully');
  } catch (error) {
    console.error('Error setting up Swagger documentation:', error.message);
    console.error('Error details:', error.stack);

    try {
      // Fallback to a simpler Swagger setup if the main one fails
      const fallbackDocument = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, fallbackDocument);
      console.log('Fallback Swagger documentation set up at /api-docs');
    } catch (fallbackError) {
      console.error('Even fallback Swagger setup failed:', fallbackError.message);
    }
  }

  // Setup ReDoc as an alternative API documentation UI
  try {
    // We could use app.get() here to get custom ReDoc options from a service if needed
    SwaggerModule.setup('redoc', app, SwaggerModule.createDocument(app, config), {
      useGlobalPrefix: true,
      customSiteTitle: 'PRM API Documentation (ReDoc)',
    });
    console.log('ReDoc documentation setup successfully at /redoc');
  } catch (redocError) {
    console.error('Error setting up ReDoc:', redocError.message);
  }
}