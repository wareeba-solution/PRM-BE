import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
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
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('organizations', 'Organization management endpoints')
    .addTag('departments', 'Department management endpoints')
    .addTag('tickets', 'Ticket management endpoints')
    .addTag('messages', 'Message management endpoints')
    .addTag('appointments', 'Appointment management endpoints')
    .addTag('notifications', 'Notification management endpoints')
    .build();

  // Create the Swagger document with safe options to avoid circular dependency issues
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: false, // Prevent deep scanning which can cause circular dependency issues
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

  // Create the redoc HTML file
  const redocHtmlPath = path.join(publicDir, 'redoc.html');
  const redocHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Patient Relationship Manager API Documentation</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
      }
      
      .header {
        background-color: #2d3748;
        color: white;
        padding: 20px;
        text-align: center;
      }
      
      .header h1 {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
      }
      
      .header p {
        margin: 10px 0 0;
        opacity: 0.8;
      }
      
      redoc {
        display: block;
        height: calc(100vh - 80px);
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Patient Relationship Manager API</h1>
      <p>Interactive API documentation powered by ReDoc</p>
    </div>
    <redoc spec-url="/docs-json"></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
  </body>
</html>`;
  fs.writeFileSync(redocHtmlPath, redocHtml);

  // Setup ReDoc with NestJS
  SwaggerModule.setup('docs', app, filteredDocument, {
    useGlobalPrefix: false,
    customSiteTitle: 'PRM API Documentation',
  });
  
  // Expose the OpenAPI JSON at /docs-json
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/docs-json', (req, res) => {
    res.json(filteredDocument);
  });
  
  // Serve the ReDoc HTML file
  httpAdapter.get('/docs', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'redoc.html'));
  });
  
  console.log('ReDoc documentation setup successfully');
}
