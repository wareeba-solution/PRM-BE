"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsModule = void 0;
// src/modules/organizations/organizations.module.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const organizations_controller_1 = require("./controllers/organizations.controller");
const organizations_service_1 = require("./services/organizations.service");
const organization_entity_1 = require("./entities/organization.entity");
const organization_invitation_entity_1 = require("./entities/organization-invitation.entity");
const organization_audit_log_entity_1 = require("./entities/organization-audit-log.entity"); // Add this import
const user_entity_1 = require("../users/entities/user.entity");
const audit_log_entity_1 = require("../audit/entities/audit-log.entity");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
// Import organization-related listeners
const organization_billing_listener_1 = require("./listeners/organization-billing.listener");
const organization_audit_listener_1 = require("./listeners/organization-audit.listener");
// Import organization-related services
const organization_subscription_service_1 = require("./services/organization-subscription.service");
const organization_invitation_service_1 = require("./services/organization-invitation.service");
const organization_audit_service_1 = require("./services/organization-audit.service");
// Import organization-related guards
const organization_access_guard_1 = require("./guards/organization-access.guard");
const organization_role_guard_1 = require("./guards/organization-role.guard");
// Import required services from other modules
const domain_verification_service_1 = require("../domain/services/domain-verification.service");
const email_service_1 = require("../../shared/services/email.service");
const storage_service_1 = require("../storage/services/storage.service");
const domain_entity_1 = require("../domain/entities/domain.entity");
const domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
const email_template_entity_1 = require("../email/entities/email-template.entity");
const email_log_entity_1 = require("../notifications/entities/email-log.entity");
const email_queue_entity_1 = require("../notifications/entities/email-queue.entity");
const email_content_entity_1 = require("../notifications/entities/email-content.entity");
let OrganizationsModule = class OrganizationsModule {
};
OrganizationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                organization_entity_1.Organization,
                organization_invitation_entity_1.OrganizationInvitation,
                organization_audit_log_entity_1.OrganizationAuditLog,
                user_entity_1.User,
                audit_log_entity_1.AuditLog,
                domain_entity_1.Domain,
                domain_verification_token_entity_1.DomainVerificationToken,
                email_content_entity_1.EmailContent,
                email_template_entity_1.EmailTemplate,
                email_log_entity_1.EmailLog,
                email_queue_entity_1.EmailQueue
            ]),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
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
    })
], OrganizationsModule);
exports.OrganizationsModule = OrganizationsModule;
//# sourceMappingURL=organizations.module.js.map