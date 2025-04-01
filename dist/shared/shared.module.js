var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushNotificationService } from './services/push-notification.service';
import { WebhookService } from './services/webhook.service';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    Global(),
    Module({
        imports: [ConfigModule],
        providers: [
            EmailService,
            SmsService,
            PushNotificationService,
            WebhookService,
        ],
        exports: [
            EmailService,
            SmsService,
            PushNotificationService,
            WebhookService,
        ],
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map