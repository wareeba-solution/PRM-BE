"use strict";
// src/modules/notifications/notifications.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("@nestjs/config");
const notifications_controller_1 = require("./controllers/notifications.controller");
const notifications_service_1 = require("./services/notifications.service");
const notification_scheduler_service_1 = require("./services/notification-scheduler.service");
const email_service_1 = require("./services/email.service");
const notification_entity_1 = require("./entities/notification.entity");
const notification_preference_entity_1 = require("./entities/notification-preference.entity");
const notification_template_entity_1 = require("./entities/notification-template.entity");
// Import email entities with correct paths
const email_template_entity_1 = require("../email/entities/email-template.entity");
const email_log_entity_1 = require("./entities/email-log.entity");
const email_queue_entity_1 = require("./entities/email-queue.entity");
const email_content_entity_1 = require("./entities/email-content.entity");
// Import domain entities
const domain_entity_1 = require("../domain/entities/domain.entity");
const domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
const notification_listener_1 = require("./listeners/notification.listener");
const notification_schedule_listener_1 = require("./listeners/notification-schedule.listener");
const notification_delivery_listener_1 = require("./listeners/notification-delivery.listener");
const users_module_1 = require("../users/users.module");
const organizations_module_1 = require("../organizations/organizations.module");
const auth_module_1 = require("../auth/auth.module");
const domain_module_1 = require("../domain/domain.module");
// Import shared services with forwardRef
const shared_module_1 = require("../../shared/shared.module");
const sms_service_1 = require("../../shared/services/sms.service");
const push_notification_service_1 = require("../../shared/services/push-notification.service");
const webhook_service_1 = require("../../shared/services/webhook.service");
const whatsapp_services_1 = require("../whatsapp/services/whatsapp.services");
const notification_delivery_service_1 = require("./services/notification-delivery.service");
// Import services
const slack_service_1 = require("../integrations/slack/services/slack.service");
const whatsapp_message_entity_1 = require("../whatsapp/entities/whatsapp-message.entity");
const whatsapp_template_entity_1 = require("../whatsapp/entities/whatsapp-template.entity");
const whatsapp_log_entity_1 = require("../whatsapp/entities/whatsapp-log.entity");
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                notification_entity_1.Notification,
                notification_preference_entity_1.NotificationPreference,
                notification_template_entity_1.NotificationTemplate,
                email_template_entity_1.EmailTemplate,
                email_log_entity_1.EmailLog,
                email_queue_entity_1.EmailQueue,
                email_content_entity_1.EmailContent,
                domain_entity_1.Domain,
                domain_verification_token_entity_1.DomainVerificationToken,
                whatsapp_message_entity_1.WhatsAppMessage,
                whatsapp_template_entity_1.WhatsappTemplate,
                whatsapp_log_entity_1.WhatsappLog
            ]),
            (0, common_1.forwardRef)(() => shared_module_1.SharedModule),
            (0, common_1.forwardRef)(() => domain_module_1.DomainModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => organizations_module_1.OrganizationsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [
            notifications_service_1.NotificationsService,
            notification_scheduler_service_1.NotificationSchedulerService,
            email_service_1.EmailService,
            notification_listener_1.NotificationListener,
            notification_schedule_listener_1.NotificationScheduleListener,
            notification_delivery_listener_1.NotificationDeliveryListener,
            notification_delivery_service_1.NotificationDeliveryService,
            sms_service_1.SmsService,
            push_notification_service_1.PushNotificationService,
            webhook_service_1.WebhookService,
            whatsapp_services_1.WhatsappService,
            slack_service_1.SlackService
        ],
        exports: [
            notifications_service_1.NotificationsService,
            notification_scheduler_service_1.NotificationSchedulerService,
            email_service_1.EmailService,
            notification_delivery_service_1.NotificationDeliveryService
        ]
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map