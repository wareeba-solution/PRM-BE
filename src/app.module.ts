// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SwaggerModule } from '@nestjs/swagger';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';

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

// TypeORM Async Configuration
TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Use the full connection URL from Render
  autoLoadEntities: true,
  synchronize: false, // Always false in production
  logging: ['error', 'schema'],
  ssl: {
    rejectUnauthorized: false // Typically needed for cloud databases
  }
})

@Module({
  imports: [
    // Configuration Modules
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, mailConfig, jwtConfig],
    }),

    // Swagger Module
    SwaggerModule,

    // Database Module
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

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
    UsersModule,
    AuthModule,
    OrganizationsModule,
    ContactsModule,
    AppointmentsModule,
    TicketsModule,
    MessagesModule,
    NotificationsModule,
    DomainModule,
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
  ],
})
export class AppModule {}