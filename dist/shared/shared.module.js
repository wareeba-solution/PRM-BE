"use strict";
// src/shared/shared.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const email_service_1 = require("./services/email.service");
const sms_service_1 = require("./services/sms.service");
const push_notification_service_1 = require("./services/push-notification.service");
const webhook_service_1 = require("./services/webhook.service");
// Import entities with forwardRef to avoid circular dependencies
const email_template_entity_1 = require("../modules/email/entities/email-template.entity");
const email_log_entity_1 = require("../modules/notifications/entities/email-log.entity");
const email_queue_entity_1 = require("../modules/notifications/entities/email-queue.entity");
const email_content_entity_1 = require("../modules/notifications/entities/email-content.entity");
const notification_entity_1 = require("../modules/notifications/entities/notification.entity");
// Import domain module with forwardRef
const domain_module_1 = require("../modules/domain/domain.module");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            (0, common_1.forwardRef)(() => domain_module_1.DomainModule),
            typeorm_1.TypeOrmModule.forFeature([
                email_template_entity_1.EmailTemplate,
                email_log_entity_1.EmailLog,
                email_queue_entity_1.EmailQueue,
                email_content_entity_1.EmailContent,
                notification_entity_1.Notification
            ])
        ],
        providers: [
            email_service_1.EmailService,
            sms_service_1.SmsService,
            push_notification_service_1.PushNotificationService,
            webhook_service_1.WebhookService,
        ],
        exports: [
            email_service_1.EmailService,
            sms_service_1.SmsService,
            push_notification_service_1.PushNotificationService,
            webhook_service_1.WebhookService,
        ],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map