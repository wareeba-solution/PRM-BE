"use strict";
// src/modules/users/users.module.ts
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
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var users_controller_1 = require("./controllers/users.controller");
var users_service_1 = require("./services/users.service");
var user_activity_service_1 = require("./services/user-activity.service");
var user_entity_1 = require("./entities/user.entity");
var user_activity_entity_1 = require("./entities/user-activity.entity");
var user_session_entity_1 = require("./entities/user-session.entity");
var user_listener_1 = require("./listeners/user.listener");
var user_activity_listener_1 = require("./listeners/user-activity.listener");
var notifications_module_1 = require("../notifications/notifications.module");
var organizations_module_1 = require("../organizations/organizations.module");
var auth_module_1 = require("../auth/auth.module");
var email_service_1 = require("@/shared/services/email.service");
var audit_service_1 = require("@/shared/services/audit.service");
var domain_verification_service_1 = require("../domain/services/domain-verification.service");
var email_template_service_1 = require("../email/services/email-template.service");
var email_template_entity_1 = require("../notifications/entities/email-template.entity");
var email_log_entity_1 = require("../notifications/entities/email-log.entity");
var email_queue_entity_1 = require("../notifications/entities/email-queue.entity");
var domain_entity_1 = require("../domain/entities/domain.entity");
var domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
var audit_log_entity_1 = require("../audit/entities/audit-log.entity");
var UsersModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    user_entity_1.User,
                    user_activity_entity_1.UserActivity,
                    user_session_entity_1.UserSession,
                    email_template_entity_1.EmailTemplate,
                    audit_log_entity_1.AuditLog,
                    email_log_entity_1.EmailLog,
                    email_queue_entity_1.EmailQueue,
                    domain_entity_1.Domain,
                    domain_verification_service_1.DomainVerificationService,
                    domain_verification_token_entity_1.DomainVerificationToken
                ]),
                event_emitter_1.EventEmitterModule.forRoot({
                    wildcard: true,
                    maxListeners: 20,
                    verboseMemoryLeak: true,
                }),
                (0, common_1.forwardRef)(function () { return notifications_module_1.NotificationsModule; }),
                (0, common_1.forwardRef)(function () { return organizations_module_1.OrganizationsModule; }),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; })
            ],
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                user_activity_service_1.UserActivityService,
                user_listener_1.UserEventListener,
                user_activity_listener_1.UserActivityListener,
                email_service_1.EmailService,
                audit_service_1.AuditService,
                domain_verification_service_1.DomainVerificationService,
                email_template_service_1.EmailTemplateService,
            ],
            exports: [users_service_1.UsersService]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersModule = _classThis = /** @class */ (function () {
        function UsersModule_1() {
        }
        return UsersModule_1;
    }());
    __setFunctionName(_classThis, "UsersModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersModule = _classThis;
}();
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map