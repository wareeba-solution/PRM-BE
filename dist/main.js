"use strict";
// // import './build-workarounds';
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AppModule } from './app.module';
// import { SwaggerService } from './swagger/swagger.service';
//
// async function bootstrap() {
//   const logger = new Logger('Bootstrap');
//
//   try {
//     const app = await NestFactory.create(AppModule);
//     const configService = app.get(ConfigService);
//
//     // Initialize our custom Swagger service
//     const swaggerService = new SwaggerService();
//
//     app.enableCors({
//       origin: configService.get('app.cors.origins'),
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//       allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//       credentials: true,
//     });
//
//     app.useGlobalPipes(new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//       validationError: { target: false, value: false },
//     }));
//
//     // Set up Swagger
//     swaggerService.setup(app);
//
//     // Start server - modified for Render compatibility
//     const port = process.env.PORT || configService.get('app.port') || 3000;
//     await app.listen(port, '0.0.0.0'); // Bind to all interfaces, not just localhost
//
//     logger.log(`Application is running on port: ${port}`);
//     logger.log(`API documentation available at: /api-docs`);
//
//     return app;
//   } catch (error) {
//     logger.error('Failed to initialize application:');
//     logger.error(error);
//     process.exit(1);
//   }
// }
//
// bootstrap().catch(err => {
//   console.error('Critical error during application bootstrap:', err);
//   process.exit(1);
// });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_module_1 = require("./app.module");
var swagger_service_1 = require("./swagger/swagger.service");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var logger, app, configService, swaggerService, port, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = new common_1.Logger('Bootstrap');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 2:
                    app = _a.sent();
                    configService = app.get(config_1.ConfigService);
                    swaggerService = new swagger_service_1.SwaggerService();
                    app.enableCors({
                        origin: configService.get('app.cors.origins'),
                        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                        credentials: true,
                    });
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true,
                        transform: true,
                        forbidNonWhitelisted: true,
                        transformOptions: {
                            enableImplicitConversion: true,
                        },
                        validationError: { target: false, value: false },
                    }));
                    // Set up Swagger
                    swaggerService.setup(app);
                    port = process.env.PORT || configService.get('app.port') || 3000;
                    return [4 /*yield*/, app.listen(port, '0.0.0.0')];
                case 3:
                    _a.sent(); // Bind to all interfaces, not just localhost
                    logger.log("Application is running on port: ".concat(port));
                    logger.log("API documentation available at: /api-docs");
                    return [2 /*return*/, app];
                case 4:
                    error_1 = _a.sent();
                    logger.error('Failed to initialize application:');
                    logger.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
bootstrap().catch(function (err) {
    console.error('Critical error during application bootstrap:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map