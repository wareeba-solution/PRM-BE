"use strict";
// src/modules/users/users.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const email_content_entity_1 = require("../notifications/entities/email-content.entity");
const users_controller_1 = require("./controllers/users.controller");
const users_service_1 = require("./services/users.service");
const user_activity_service_1 = require("./services/user-activity.service");
const user_entity_1 = require("./entities/user.entity");
const user_activity_entity_1 = require("./entities/user-activity.entity");
const user_session_entity_1 = require("./entities/user-session.entity");
const user_profile_entity_1 = require("./entities/user-profile.entity");
const user_verification_entity_1 = require("./entities/user-verification.entity");
const user_settings_entity_1 = require("./entities/user-settings.entity");
const email_template_entity_1 = require("../email/entities/email-template.entity");
const email_log_entity_1 = require("../notifications/entities/email-log.entity");
const email_queue_entity_1 = require("../notifications/entities/email-queue.entity");
const domain_entity_1 = require("../domain/entities/domain.entity");
const domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
const audit_log_entity_1 = require("../audit/entities/audit-log.entity");
const user_listener_1 = require("./listeners/user.listener");
const user_activity_listener_1 = require("./listeners/user-activity.listener");
const notifications_module_1 = require("../notifications/notifications.module");
const organizations_module_1 = require("../organizations/organizations.module");
const auth_module_1 = require("../auth/auth.module");
const email_service_1 = require("../../shared/services/email.service");
const audit_service_1 = require("../../shared/services/audit.service");
const domain_verification_service_1 = require("../domain/services/domain-verification.service");
const email_template_service_1 = require("../email/services/email-template.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                user_activity_entity_1.UserActivity,
                user_session_entity_1.UserSession,
                user_profile_entity_1.UserProfile,
                user_verification_entity_1.UserVerification,
                user_settings_entity_1.UserSettings,
                email_template_entity_1.EmailTemplate,
                email_log_entity_1.EmailLog,
                email_queue_entity_1.EmailQueue,
                domain_entity_1.Domain,
                domain_verification_token_entity_1.DomainVerificationToken,
                audit_log_entity_1.AuditLog,
                email_content_entity_1.EmailContent
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            (0, common_1.forwardRef)(() => organizations_module_1.OrganizationsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
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
        exports: [users_service_1.UsersService, user_activity_service_1.UserActivityService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map