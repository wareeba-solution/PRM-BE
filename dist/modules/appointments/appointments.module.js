var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../auth/controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UsersModule } from '../users/users.module';
export var AppointmentEventTypes;
(function (AppointmentEventTypes) {
    AppointmentEventTypes["CREATED"] = "appointment.created";
    AppointmentEventTypes["UPDATED"] = "appointment.updated";
    AppointmentEventTypes["CANCELLED"] = "appointment.cancelled";
    AppointmentEventTypes["COMPLETED"] = "appointment.completed";
    AppointmentEventTypes["RESCHEDULED"] = "appointment.rescheduled";
})(AppointmentEventTypes || (AppointmentEventTypes = {}));
let AppointmentsModule = class AppointmentsModule {
};
AppointmentsModule = __decorate([
    Module({
        imports: [
            ConfigModule,
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION', '1h'),
                    },
                }),
            }),
            TypeOrmModule.forFeature([User, RefreshToken, Organization]),
            UsersModule,
        ],
        controllers: [AuthController],
        providers: [
            AuthService,
            JwtStrategy,
            JwtAuthGuard,
        ],
        exports: [
            AuthService,
            JwtAuthGuard,
            PassportModule,
        ],
    })
], AppointmentsModule);
export { AppointmentsModule };
//# sourceMappingURL=appointments.module.js.map