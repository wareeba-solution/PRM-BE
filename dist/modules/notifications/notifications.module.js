var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationSchedulerService } from './services/notification-scheduler.service';
import { Notification as NotificationEntity } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { NotificationTemplate } from './entities/notification-template.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { EmailLog } from './entities/email-log.entity';
import { EmailQueue } from './entities/email-queue.entity';
import { Domain } from '../domain/entities/domain.entity';
import { DomainVerificationToken } from '../domain/entities/domain-verification-token.entity';
import { NotificationListener } from './listeners/notification.listener';
import { NotificationScheduleListener } from './listeners/notification-schedule.listener';
import { NotificationDeliveryListener } from './listeners/notification-delivery.listener';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from '../../shared/services/email.service';
import { SmsService } from '../../shared/services/sms.service';
import { PushNotificationService } from '../../shared/services/push-notification.service';
import { WebhookService } from '../../shared/services/webhook.service';
import { WhatsappService } from '../whatsapp/services/whatsapp.services';
import { NotificationDeliveryService } from './services/notification-delivery.service';
import { SlackService } from '../integrations/slack/services/slack.service';
import { DomainVerificationService } from '../domain/services/domain-verification.service';
import { WhatsAppMessage } from '../whatsapp/entities/whatsapp-message.entity';
import { WhatsappTemplate } from '../whatsapp/entities/whatsapp-template.entity';
import { WhatsappLog } from '../whatsapp/entities/whatsapp-log.entity';
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                NotificationEntity,
                NotificationPreference,
                NotificationTemplate,
                EmailTemplate,
                EmailLog,
                EmailQueue,
                Domain,
                DomainVerificationToken,
                WhatsAppMessage,
                WhatsappTemplate,
                WhatsappLog
            ]),
            EventEmitterModule.forRoot({
                wildcard: true,
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            ConfigModule,
            forwardRef(() => UsersModule),
            forwardRef(() => OrganizationsModule),
            forwardRef(() => AuthModule)
        ],
        controllers: [NotificationsController],
        providers: [
            NotificationsService,
            NotificationSchedulerService,
            NotificationDeliveryService,
            NotificationListener,
            NotificationScheduleListener,
            NotificationDeliveryListener,
            EmailService,
            SmsService,
            PushNotificationService,
            WebhookService,
            WhatsappService,
            SlackService,
            DomainVerificationService
        ],
        exports: [
            NotificationsService,
            NotificationDeliveryService
        ]
    })
], NotificationsModule);
export { NotificationsModule };
//# sourceMappingURL=notifications.module.js.map