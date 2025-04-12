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
const config_1 = require("@nestjs/config");
// Import all DTOs for Swagger documentation
const swagger_dto_1 = require("./swagger-dto");
// Import new DTOs
const user_account_dto_1 = require("./swagger-dto/auth/user-account.dto");
/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
 */
/**
 * Sets up Swagger documentation for the application
 */
function setupSwagger(app) {
    var _a, _b;
    // Use app.get() to retrieve ConfigService for configuration
    const configService = app.get(config_1.ConfigService);
    const appVersion = configService.get('APP_VERSION', '1.0');
    const apiEnv = configService.get('NODE_ENV', 'development');
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    // Create Swagger document configuration
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Patient Relationship Manager API')
        .setDescription(`API documentation for the Patient Relationship Manager application (${apiEnv})`)
        .setVersion(appVersion)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        // IMPORTANT: Set server URL to just /api to avoid duplicating version prefix
        .addApiKey({ type: 'apiKey', name: 'X-Tenant-ID', in: 'header' }, 'tenant-id')
        .addServer('/api', 'API Base')
        .addTag('Authentication', 'Authentication and user management endpoints')
        .addTag('Tenants', 'Tenant management endpoints')
        .addTag('Organizations', 'Organization management endpoints')
        .build();
    try {
        // Create the Swagger document with safe options to avoid circular dependency issues
        const document = swagger_1.SwaggerModule.createDocument(app, config, {
            deepScanRoutes: false,
            extraModels: [
                swagger_dto_1.BaseDto,
                swagger_dto_1.UserDto,
                swagger_dto_1.OrganizationDto,
                swagger_dto_1.TicketDto,
                swagger_dto_1.ContactDto,
                swagger_dto_1.ContactRelationshipDto,
                swagger_dto_1.AppointmentDto,
                swagger_dto_1.NotificationDto,
                swagger_dto_1.MessageDto,
                swagger_dto_1.DepartmentDto,
                swagger_dto_1.DocumentDto,
                swagger_dto_1.MedicalHistoryDto,
                swagger_dto_1.MergedRecordDto,
                // Add new DTOs
                user_account_dto_1.RegisterDto,
                user_account_dto_1.RegisterUserDto,
                user_account_dto_1.RegisterOrganizationDto,
                user_account_dto_1.VerifyEmailDto,
                user_account_dto_1.ResetPasswordDto
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
            BaseDto: swagger_dto_1.BaseDto,
            UserDto: swagger_dto_1.UserDto,
            OrganizationDto: swagger_dto_1.OrganizationDto,
            TicketDto: swagger_dto_1.TicketDto,
            ContactDto: swagger_dto_1.ContactDto,
            ContactRelationshipDto: swagger_dto_1.ContactRelationshipDto,
            AppointmentDto: swagger_dto_1.AppointmentDto,
            NotificationDto: swagger_dto_1.NotificationDto,
            MessageDto: swagger_dto_1.MessageDto,
            DepartmentDto: swagger_dto_1.DepartmentDto,
            DocumentDto: swagger_dto_1.DocumentDto,
            MedicalHistoryDto: swagger_dto_1.MedicalHistoryDto,
            MergedRecordDto: swagger_dto_1.MergedRecordDto,
            // Add new DTOs
            RegisterDto: user_account_dto_1.RegisterDto,
            RegisterUserDto: user_account_dto_1.RegisterUserDto,
            RegisterOrganizationDto: user_account_dto_1.RegisterOrganizationDto,
            VerifyEmailDto: user_account_dto_1.VerifyEmailDto,
            ResetPasswordDto: user_account_dto_1.ResetPasswordDto
        };
        // Add each DTO to the schemas
        Object.entries(schemaMap).forEach(([key, value]) => {
            if (!document.components.schemas[key]) {
                // Create a schema object with the correct type
                const schemaObject = {
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
        const filteredDocument = Object.assign(Object.assign({}, document), { components: Object.assign(Object.assign({}, document.components), { schemas: Object.entries(((_a = document.components) === null || _a === void 0 ? void 0 : _a.schemas) || {})
                    .filter(([_, schema]) => schema !== undefined)
                    .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {}) }) });
        // Log available schemas for debugging
        console.log('Available schemas:', Object.keys(((_b = filteredDocument.components) === null || _b === void 0 ? void 0 : _b.schemas) || {}).length);
        // Setup Swagger with NestJS using the default setup
        swagger_1.SwaggerModule.setup('docs', app, filteredDocument, {
            useGlobalPrefix: true,
            customSiteTitle: `PRM API Documentation - ${apiEnv.toUpperCase()}`,
            explorer: true,
            swaggerOptions: {
                persistAuthorization: true,
                docExpansion: 'none',
                filter: true,
                deepLinking: true,
                defaultModelsExpandDepth: 1,
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
    }
    catch (error) {
        console.error('Error setting up Swagger documentation:', error.message);
        console.error('Error details:', error.stack);
        try {
            // Fallback to a simpler Swagger setup if the main one fails
            const fallbackDocument = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup('api-docs', app, fallbackDocument);
            console.log('Fallback Swagger documentation set up at /api-docs');
        }
        catch (fallbackError) {
            console.error('Even fallback Swagger setup failed:', fallbackError.message);
        }
    }
    // Setup ReDoc as an alternative API documentation UI
    try {
        // We could use app.get() here to get custom ReDoc options from a service if needed
        swagger_1.SwaggerModule.setup('redoc', app, swagger_1.SwaggerModule.createDocument(app, config), {
            useGlobalPrefix: true,
            customSiteTitle: 'PRM API Documentation (ReDoc)',
        });
        console.log('ReDoc documentation setup successfully at /redoc');
    }
    catch (redocError) {
        console.error('Error setting up ReDoc:', redocError.message);
    }
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map