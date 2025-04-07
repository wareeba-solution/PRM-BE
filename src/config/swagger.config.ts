import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

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

/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
 */


/**
 * Sets up Swagger documentation for the application
 */
export function setupSwagger(app: INestApplication): void {
  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Create Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Patient Relationship Manager API')
    .setDescription('API documentation for the Patient Relationship Manager application')
    .setVersion('1.0')
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
        MergedRecordDto
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
      MergedRecordDto
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
      useGlobalPrefix: false,
      customSiteTitle: 'PRM API Documentation',
      explorer: true, // Enable explorer to make schemas more accessible
      swaggerOptions: {
        docExpansion: 'none', // Start with all sections collapsed
        filter: true,
        deepLinking: true,
        defaultModelsExpandDepth: 1, // Show schemas section by default
        displayRequestDuration: true,
        showExtensions: true,
        showCommonExtensions: true
      },
    });
    
    console.log('Swagger documentation setup successfully');
  } catch (error) {
    console.error('Error setting up Swagger documentation:', error.message);
  }
  
  console.log('ReDoc documentation setup successfully');
}
