"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var SwaggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemasModule = __importStar(require("./schemas/index"));
const pathsModule = __importStar(require("./paths/index"));
const config_1 = require("@nestjs/config");
let SwaggerService = SwaggerService_1 = class SwaggerService {
    constructor() {
        this.logger = new common_1.Logger(SwaggerService_1.name);
    }
    setup(app) {
        try {
            // Get config service
            const configService = app.get(config_1.ConfigService);
            const isProduction = configService.get('app.nodeEnv') === 'production';
            const docsEnabled = configService.get('app.docsEnabled');
            // Skip Swagger setup in production unless explicitly enabled
            if (isProduction && !docsEnabled) {
                this.logger.log('Swagger documentation disabled in production');
                return;
            }
            this.logger.log('Setting up manual Swagger documentation...');
            const config = new swagger_1.DocumentBuilder()
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
            }
            catch (pathError) {
                this.logger.error('Failed to load paths:', pathError);
            }
            try {
                schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                this.logger.log(`Loaded ${Object.keys(schemas).length} schemas`);
            }
            catch (schemaError) {
                this.logger.error('Failed to load schemas:', schemaError);
            }
            // Create a manual document
            const document = Object.assign(Object.assign({}, config), { paths, components: {
                    schemas,
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                } });
            // Additional error handling for Swagger setup
            try {
                swagger_1.SwaggerModule.setup('api-docs', app, document);
                this.logger.log('Manual Swagger documentation setup at /api-docs path');
            }
            catch (swaggerSetupError) {
                this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
            }
        }
        catch (error) {
            this.logger.error(`Critical error in Swagger setup: ${error.message}`);
            this.logger.error(error.stack);
        }
    }
};
SwaggerService = SwaggerService_1 = __decorate([
    (0, common_1.Injectable)()
], SwaggerService);
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map