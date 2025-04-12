"use strict";
// src/modules/auth/auth.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const user_account_service_1 = require("./services/user-account.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const user_entity_1 = require("../users/entities/user.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const user_settings_entity_1 = require("../users/entities/user-settings.entity");
const user_verification_entity_1 = require("../users/entities/user-verification.entity");
const users_module_1 = require("../users/users.module");
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const tenants_module_1 = require("../tenants/tenants.module");
const organizations_module_1 = require("../organizations/organizations.module");
const domain_module_1 = require("../domain/domain.module");
const email_module_1 = require("../email/email.module");
const notifications_module_1 = require("../notifications/notifications.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, refresh_token_entity_1.RefreshToken, organization_entity_1.Organization, user_settings_entity_1.UserSettings, user_verification_entity_1.UserVerification, tenant_entity_1.Tenant]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                property: 'user',
                session: false,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const secret = configService.get('JWT_SECRET');
                    if (!secret) {
                        const logger = new common_1.Logger('AuthModule');
                        logger.error('JWT_SECRET environment variable is not set');
                        throw new Error('JWT_SECRET environment variable is not set');
                    }
                    // Using a very long expiration time for debugging purposes
                    return {
                        secret,
                        signOptions: {
                            expiresIn: '30d', // Set to 30 days for debugging
                        }
                    };
                },
                inject: [config_1.ConfigService],
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => tenants_module_1.TenantsModule),
            (0, common_1.forwardRef)(() => organizations_module_1.OrganizationsModule),
            (0, common_1.forwardRef)(() => domain_module_1.DomainModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            user_account_service_1.UserAccountService,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [auth_service_1.AuthService, user_account_service_1.UserAccountService, jwt_strategy_1.JwtStrategy, jwt_1.JwtModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map