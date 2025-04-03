"use strict";
// src/app.module.ts
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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var throttler_1 = require("@nestjs/throttler");
var event_emitter_1 = require("@nestjs/event-emitter");
var schedule_1 = require("@nestjs/schedule");
var core_1 = require("@nestjs/core");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
// Feature Modules
var users_module_1 = require("./modules/users/users.module");
var auth_module_1 = require("./modules/auth/auth.module");
var organizations_module_1 = require("./modules/organizations/organizations.module");
var contacts_module_1 = require("./modules/contacts/contacts.module");
var appointments_module_1 = require("./modules/appointments/appointments.module");
var tickets_module_1 = require("./modules/tickets/tickets.module");
var messages_module_1 = require("./modules/messages/messages.module");
var notifications_module_1 = require("./modules/notifications/notifications.module");
var domain_module_1 = require("./modules/domain/domain.module");
// Configuration
var app_config_1 = require("./config/app.config");
var database_config_1 = require("./config/database.config");
var mail_config_1 = require("./config/mail.config");
var jwt_config_1 = require("./config/jwt.config");
// Custom filters, interceptors, and guards
var http_exception_filter_1 = require("./common/filters/http-exception.filter");
var transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
var throttler_2 = require("@nestjs/throttler");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                // Configuration
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [app_config_1.default, database_config_1.default, mail_config_1.default, jwt_config_1.default],
                }),
                // Database - simplified configuration
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('database.host', 'localhost'),
                        port: configService.get('database.port', 5432),
                        username: configService.get('database.username', 'postgres'),
                        password: configService.get('database.password', 'postgres'),
                        database: configService.get('database.name', 'prm_db'),
                        autoLoadEntities: true,
                        synchronize: configService.get('database.synchronize', false),
                        logging: ["error", "schema"], // Only log errors and schema-related queries
                    }); },
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
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                organizations_module_1.OrganizationsModule,
                contacts_module_1.ContactsModule,
                appointments_module_1.AppointmentsModule,
                tickets_module_1.TicketsModule,
                messages_module_1.MessagesModule,
                notifications_module_1.NotificationsModule,
                domain_module_1.DomainModule,
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
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map