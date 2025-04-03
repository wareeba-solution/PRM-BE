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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var schemasModule = require("./schemas/index");
var pathsModule = require("./paths/index");
var config_1 = require("@nestjs/config");
var SwaggerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SwaggerService = _classThis = /** @class */ (function () {
        function SwaggerService_1() {
            this.logger = new common_1.Logger(SwaggerService.name);
        }
        SwaggerService_1.prototype.setup = function (app) {
            try {
                // Get config service
                var configService = app.get(config_1.ConfigService);
                var isProduction = configService.get('app.nodeEnv') === 'production';
                var docsEnabled = configService.get('app.docsEnabled');
                // Skip Swagger setup in production unless explicitly enabled
                if (isProduction && !docsEnabled) {
                    this.logger.log('Swagger documentation disabled in production');
                    return;
                }
                this.logger.log('Setting up manual Swagger documentation...');
                var config = new swagger_1.DocumentBuilder()
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
                var paths = {};
                var schemas = {};
                try {
                    paths = pathsModule.getAllPaths ? pathsModule.getAllPaths() : {};
                    this.logger.log("Loaded ".concat(Object.keys(paths).length, " API paths"));
                }
                catch (pathError) {
                    this.logger.error('Failed to load paths:', pathError);
                }
                try {
                    schemas = schemasModule.getAllSchemas ? schemasModule.getAllSchemas() : {};
                    this.logger.log("Loaded ".concat(Object.keys(schemas).length, " schemas"));
                }
                catch (schemaError) {
                    this.logger.error('Failed to load schemas:', schemaError);
                }
                // Create a manual document
                var document_1 = __assign(__assign({}, config), { paths: paths, components: {
                        schemas: schemas,
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
                    swagger_1.SwaggerModule.setup('api-docs', app, document_1);
                    this.logger.log('Manual Swagger documentation setup at /api-docs path');
                }
                catch (swaggerSetupError) {
                    this.logger.error('Failed to setup Swagger module:', swaggerSetupError);
                }
            }
            catch (error) {
                this.logger.error("Critical error in Swagger setup: ".concat(error.message));
                this.logger.error(error.stack);
            }
        };
        return SwaggerService_1;
    }());
    __setFunctionName(_classThis, "SwaggerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SwaggerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SwaggerService = _classThis;
}();
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map