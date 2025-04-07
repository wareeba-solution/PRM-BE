"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
 */
function setupSwagger(app) {
    var _a;
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    // Create Swagger document configuration
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Patient Relationship Manager API')
        .setDescription('API documentation for the Patient Relationship Manager application')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
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
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        deepScanRoutes: false, // Prevent deep scanning which can cause circular dependency issues
    });
    // Filter out undefined models which can cause errors
    const filteredDocument = Object.assign(Object.assign({}, document), { components: Object.assign(Object.assign({}, document.components), { schemas: Object.entries(((_a = document.components) === null || _a === void 0 ? void 0 : _a.schemas) || {})
                .filter(([_, schema]) => schema !== undefined)
                .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {}) }) });
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
    swagger_1.SwaggerModule.setup('docs', app, filteredDocument, {
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
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map