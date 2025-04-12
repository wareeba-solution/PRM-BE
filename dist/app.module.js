"use strict";
// // src/app.module.ts
//
// import * as dotenv from 'dotenv';
// import * as path from 'path';
//
// // Load environment variables based on NODE_ENV
// const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
// dotenv.config({ path: path.resolve(process.cwd(), envFile) });
//
// import { Module, forwardRef } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { ScheduleModule } from '@nestjs/schedule';
// import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { join } from 'path';
//
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
//
// // Feature Modules
// import { UsersModule } from './modules/users/users.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { OrganizationsModule } from './modules/organizations/organizations.module';
// import { ContactsModule } from './modules/contacts/contacts.module';
// import { AppointmentsModule } from './modules/appointments/appointments.module';
// import { TicketsModule } from './modules/tickets/tickets.module';
// import { MessagesModule } from './modules/messages/messages.module';
// import { NotificationsModule } from './modules/notifications/notifications.module';
// import { DomainModule } from './modules/domain/domain.module';
// import { SharedModule } from './shared/shared.module';
// import { TenantsModule } from './modules/tenants/tenants.module';
//
// // Configuration
// import appConfig from './config/app.config';
// import databaseConfig from './config/database.config';
// import mailConfig from './config/mail.config';
// import jwtConfig from './config/jwt.config';
//
// // Custom filters, interceptors, and guards
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { TransformInterceptor } from './common/interceptors/transform.interceptor';
// import { ThrottlerGuard } from '@nestjs/throttler';
// import { ThrottlerConfigService } from './config/throttler.config';
// import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
// import { EmailVerifiedGuard } from './modules/auth/guards/email-verified.guard';
//
// @Module({
//   imports: [
//     // Configuration Modules
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: envFile,
//       load: [appConfig, databaseConfig, mailConfig, jwtConfig],
//     }),
//
//     // Mailer Module
//     MailerModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (config: ConfigService) => ({
//         transport: {
//           host: config.get('mail.host'),
//           port: config.get('mail.port'),
//           secure: config.get('mail.secure'),
//           auth: {
//             user: config.get('mail.auth.user'),
//             pass: config.get('mail.auth.pass'),
//           },
//         },
//         defaults: {
//           from: config.get('mail.defaults.from'),
//         },
//         template: {
//           dir: join(__dirname, '..', 'templates', 'email'),
//           adapter: new HandlebarsAdapter(),
//           options: {
//             strict: true,
//           },
//         },
//       }),
//       inject: [ConfigService],
//     }),
//
//     // Database Module
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       url: process.env.DATABASE_URL,
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       schema: process.env.DB_SCHEMA || 'public',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       // Disable synchronize since we're handling schema creation manually
//       synchronize: false,
//       logging: ['error'],
//       ssl: process.env.DB_SSL === 'true' ? {
//         rejectUnauthorized: false
//       } : false
//     }),
//
//     // Rate Limiting
//     ThrottlerModule.forRoot({
//       throttlers: [
//         {
//           limit: 10,
//           ttl: 60000,
//         },
//       ],
//     }),
//
//     // Event Emitter
//     EventEmitterModule.forRoot({
//       wildcard: true,
//       delimiter: '.',
//       maxListeners: 20,
//       verboseMemoryLeak: true,
//     }),
//
//     // Task Scheduling
//     ScheduleModule.forRoot(),
//
//     // Feature Modules
//     SharedModule,
//     forwardRef(() => DomainModule),
//     forwardRef(() => NotificationsModule),
//     TenantsModule, // Import TenantsModule early as it provides middleware for other modules
//     UsersModule,
//     AuthModule,
//     OrganizationsModule,
//     ContactsModule,
//     AppointmentsModule,
//     TicketsModule,
//     MessagesModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: APP_FILTER,
//       useClass: HttpExceptionFilter,
//     },
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: TransformInterceptor,
//     },
//     {
//       provide: APP_GUARD,
//       useClass: ThrottlerGuard,
//     },
//     ThrottlerConfigService,
//   ],
// })
// export class AppModule {}
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const core_1 = require("@nestjs/core");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
// Feature Modules
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const organizations_module_1 = require("./modules/organizations/organizations.module");
const contacts_module_1 = require("./modules/contacts/contacts.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const tickets_module_1 = require("./modules/tickets/tickets.module");
const messages_module_1 = require("./modules/messages/messages.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const domain_module_1 = require("./modules/domain/domain.module");
const shared_module_1 = require("./shared/shared.module");
const tenants_module_1 = require("./modules/tenants/tenants.module");
// Configuration
const app_config_1 = __importDefault(require("./config/app.config"));
const database_config_1 = __importDefault(require("./config/database.config"));
const mail_config_1 = __importDefault(require("./config/mail.config"));
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
// Custom filters, interceptors, and guards
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const throttler_2 = require("@nestjs/throttler");
const throttler_config_1 = require("./config/throttler.config");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const email_verified_guard_1 = require("./modules/auth/guards/email-verified.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Configuration Modules
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: envFile,
                load: [app_config_1.default, database_config_1.default, mail_config_1.default, jwt_config_1.default],
            }),
            // Mailer Module
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('mail.host'),
                        port: config.get('mail.port'),
                        secure: config.get('mail.secure'),
                        auth: {
                            user: config.get('mail.auth.user'),
                            pass: config.get('mail.auth.pass'),
                        },
                    },
                    defaults: {
                        from: config.get('mail.defaults.from'),
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, '..', 'templates', 'email'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            // Database Module
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                schema: process.env.DB_SCHEMA || 'public',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                // Disable synchronize since we're handling schema creation manually
                synchronize: false,
                logging: ['error'],
                ssl: process.env.DB_SSL === 'true' ? {
                    rejectUnauthorized: false
                } : false
            }),
            // Rate Limiting
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        limit: 10,
                        ttl: 60000,
                    },
                ],
            }),
            // Event Emitter
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            // Task Scheduling
            schedule_1.ScheduleModule.forRoot(),
            // Feature Modules
            shared_module_1.SharedModule,
            (0, common_1.forwardRef)(() => domain_module_1.DomainModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            tenants_module_1.TenantsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            organizations_module_1.OrganizationsModule,
            contacts_module_1.ContactsModule,
            appointments_module_1.AppointmentsModule,
            tickets_module_1.TicketsModule,
            messages_module_1.MessagesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_2.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard, // Add global JWT authentication guard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: email_verified_guard_1.EmailVerifiedGuard, // Add global email verification guard
            },
            throttler_config_1.ThrottlerConfigService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map