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
const email_service_1 = require("./services/email.service");
const sms_service_1 = require("./services/sms.service");
const push_notification_service_1 = require("./services/push-notification.service");
const webhook_service_1 = require("./services/webhook.service");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
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