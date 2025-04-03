"use strict";
// src/modules/auth/auth.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = exports.AppointmentEventTypes = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("../auth/controllers/auth.controller");
const auth_service_1 = require("../auth/services/auth.service");
const jwt_strategy_1 = require("../auth/strategies/jwt.strategy");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const refresh_token_entity_1 = require("../auth/entities/refresh-token.entity");
const user_entity_1 = require("../users/entities/user.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const users_module_1 = require("../users/users.module");
var AppointmentEventTypes;
(function (AppointmentEventTypes) {
    AppointmentEventTypes["CREATED"] = "appointment.created";
    AppointmentEventTypes["UPDATED"] = "appointment.updated";
    AppointmentEventTypes["CANCELLED"] = "appointment.cancelled";
    AppointmentEventTypes["COMPLETED"] = "appointment.completed";
    AppointmentEventTypes["RESCHEDULED"] = "appointment.rescheduled";
})(AppointmentEventTypes = exports.AppointmentEventTypes || (exports.AppointmentEventTypes = {}));
let AppointmentsModule = class AppointmentsModule {
};
AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION', '1h'),
                    },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, refresh_token_entity_1.RefreshToken, organization_entity_1.Organization]),
            users_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_auth_guard_1.JwtAuthGuard,
            passport_1.PassportModule,
        ],
    })
], AppointmentsModule);
exports.AppointmentsModule = AppointmentsModule;
//# sourceMappingURL=appointments.module.js.map