var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DomainModule } from './modules/domain/domain.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import mailConfig from './config/mail.config';
import jwtConfig from './config/jwt.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                load: [appConfig, databaseConfig, redisConfig, mailConfig, jwtConfig],
            }),
            TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host', 'localhost'),
                    port: configService.get('database.port', 5432),
                    username: configService.get('database.username', 'postgres'),
                    password: configService.get('database.password', 'postgres'),
                    database: configService.get('database.name', 'prm_db'),
                    autoLoadEntities: true,
                    synchronize: configService.get('database.synchronize', false),
                    logging: ["error", "schema"],
                }),
            }),
            ThrottlerModule.forRoot({
                throttlers: [
                    {
                        limit: 10,
                        ttl: 60000,
                    },
                ],
            }),
            EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            ScheduleModule.forRoot(),
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map