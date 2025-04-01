var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SwaggerService_1;
import { Injectable, Logger } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getAllSchemas } from './schemas';
import { getAllPaths } from './paths';
import { ConfigService } from '@nestjs/config';
let SwaggerService = SwaggerService_1 = class SwaggerService {
    constructor() {
        this.logger = new Logger(SwaggerService_1.name);
    }
    setup(app) {
        try {
            const configService = app.get(ConfigService);
            const isProduction = configService.get('app.nodeEnv') === 'production';
            const docsEnabled = configService.get('app.docsEnabled');
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
            const document = Object.assign(Object.assign({}, config), { paths: getAllPaths(), components: {
                    schemas: getAllSchemas(),
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                } });
            NestSwaggerModule.setup('api-docs', app, document);
            this.logger.log('Manual Swagger documentation setup at /api-docs path');
        }
        catch (error) {
            this.logger.error(`Failed to set up Swagger: ${error.message}`);
            this.logger.error(error.stack);
        }
    }
};
SwaggerService = SwaggerService_1 = __decorate([
    Injectable()
], SwaggerService);
export { SwaggerService };
//# sourceMappingURL=swagger.service.js.map