// src/app.module.ts

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

import { Module, forwardRef, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Feature Modules
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DomainModule } from './modules/domain/domain.module';
import { SharedModule } from './shared/shared.module';
import { TenantsModule } from './modules/tenants/tenants.module';

// Configuration
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import mailConfig from './config/mail.config';
import jwtConfig from './config/jwt.config';

// Custom filters, interceptors, and guards
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerConfigService } from './config/throttler.config';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { EmailVerifiedGuard } from './modules/auth/guards/email-verified.guard';
import { OrganizationMiddleware } from './common/middleware/organization.middleware';
import { Organization } from './modules/organizations/entities/organization.entity';


@Module({
  imports: [
    // Configuration Modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFile,
      load: [appConfig, databaseConfig, mailConfig, jwtConfig],
    }),

    // Mailer Module
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
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
          dir: join(__dirname, '..', 'templates', 'email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    // Database Module
    TypeOrmModule.forRoot({
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

    // Register Organization entity for middleware
    TypeOrmModule.forFeature([Organization]),

    // Rate Limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60000,
        },
      ],
    }),

    // Event Emitter
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      maxListeners: 20,
      verboseMemoryLeak: true,
    }),

    // Task Scheduling
    ScheduleModule.forRoot(),

    // Feature Modules
    SharedModule,
    forwardRef(() => DomainModule),
    forwardRef(() => NotificationsModule),
    TenantsModule, // Import TenantsModule early as it provides middleware for other modules
    UsersModule,
    AuthModule,
    OrganizationsModule,
    ContactsModule,
    AppointmentsModule,
    TicketsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Remove global guards temporarily for debugging
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: EmailVerifiedGuard,
    // },
    ThrottlerConfigService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(OrganizationMiddleware)
        .forRoutes('*'); // Apply to all routes
  }
}