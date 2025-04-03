"use strict";
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
exports.OrganizationsModule = void 0;
// src/modules/organizations/organizations.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var organizations_controller_1 = require("./controllers/organizations.controller");
var organizations_service_1 = require("./services/organizations.service");
var organization_entity_1 = require("./entities/organization.entity");
var organization_invitation_entity_1 = require("./entities/organization-invitation.entity");
var organization_audit_log_entity_1 = require("./entities/organization-audit-log.entity"); // Add this import
var user_entity_1 = require("../users/entities/user.entity");
var audit_log_entity_1 = require("../audit/entities/audit-log.entity");
var users_module_1 = require("../users/users.module");
var auth_module_1 = require("../auth/auth.module");
// Import organization-related listeners
var organization_billing_listener_1 = require("./listeners/organization-billing.listener");
var organization_audit_listener_1 = require("./listeners/organization-audit.listener");
// Import organization-related services
var organization_subscription_service_1 = require("./services/organization-subscription.service");
var organization_invitation_service_1 = require("./services/organization-invitation.service");
var organization_audit_service_1 = require("./services/organization-audit.service");
// Import organization-related guards
var organization_access_guard_1 = require("./guards/organization-access.guard");
var organization_role_guard_1 = require("./guards/organization-role.guard");
// Import required services from other modules
var domain_verification_service_1 = require("../domain/services/domain-verification.service");
var email_service_1 = require("../../shared/services/email.service");
var storage_service_1 = require("../storage/services/storage.service");
var domain_1 = require("domain");
var domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
var email_template_entity_1 = require("../notifications/entities/email-template.entity");
var email_log_entity_1 = require("../notifications/entities/email-log.entity");
var email_queue_entity_1 = require("../notifications/entities/email-queue.entity");
var OrganizationsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    organization_entity_1.Organization,
                    organization_invitation_entity_1.OrganizationInvitation,
                    organization_audit_log_entity_1.OrganizationAuditLog, // Add this entity
                    user_entity_1.User,
                    audit_log_entity_1.AuditLog,
                    domain_1.Domain,
                    domain_verification_service_1.DomainVerificationService,
                    domain_verification_token_entity_1.DomainVerificationToken,
                    email_template_entity_1.EmailTemplate,
                    email_log_entity_1.EmailLog,
                    email_queue_entity_1.EmailQueue,
                    email_service_1.EmailService,
                ]),
                event_emitter_1.EventEmitterModule.forRoot({
                    wildcard: true,
                    delimiter: '.',
                    maxListeners: 20,
                    verboseMemoryLeak: true,
                }),
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }),
            ],
            controllers: [
                organizations_controller_1.OrganizationsController
            ],
            providers: [
                // Core services
                organizations_service_1.OrganizationsService,
                organization_subscription_service_1.OrganizationSubscriptionService,
                organization_invitation_service_1.OrganizationInvitationService,
                organization_audit_service_1.OrganizationAuditService,
                // Event listeners
                organization_billing_listener_1.OrganizationBillingListener,
                organization_audit_listener_1.OrganizationAuditListener,
                // Guards
                organization_access_guard_1.OrganizationAccessGuard,
                organization_role_guard_1.OrganizationRoleGuard,
                // Services from other modules that are required by OrganizationsService
                domain_verification_service_1.DomainVerificationService,
                email_service_1.EmailService,
                storage_service_1.StorageService,
            ],
            exports: [
                // Export services that other modules might need
                organizations_service_1.OrganizationsService,
                organization_subscription_service_1.OrganizationSubscriptionService,
                organization_invitation_service_1.OrganizationInvitationService,
                // Export guards for reuse
                organization_access_guard_1.OrganizationAccessGuard,
                organization_role_guard_1.OrganizationRoleGuard,
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationsModule = _classThis = /** @class */ (function () {
        function OrganizationsModule_1() {
        }
        return OrganizationsModule_1;
    }());
    __setFunctionName(_classThis, "OrganizationsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationsModule = _classThis;
}();
exports.OrganizationsModule = OrganizationsModule;
//# sourceMappingURL=organizations.module.js.map