// src/modules/notifications/notifications.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationSchedulerService } from './services/notification-scheduler.service';
import { EmailService } from './services/email.service';

import { Notification as NotificationEntity } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { NotificationTemplate } from './entities/notification-template.entity';

// Import email entities with correct paths
import { EmailTemplate } from '../email/entities/email-template.entity';
import { EmailLog } from './entities/email-log.entity';
import { EmailQueue } from './entities/email-queue.entity';
import { EmailContent } from './entities/email-content.entity';

// Import domain entities
import { Domain } from '../domain/entities/domain.entity';
import { DomainVerificationToken } from '../domain/entities/domain-verification-token.entity';

import { NotificationListener } from './listeners/notification.listener';
import { NotificationScheduleListener } from './listeners/notification-schedule.listener';
import { NotificationDeliveryListener } from './listeners/notification-delivery.listener';

import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AuthModule } from '../auth/auth.module';
import { DomainModule } from '../domain/domain.module';

// Import shared services with forwardRef
import { SharedModule } from '../../shared/shared.module';
import { SmsService } from '../../shared/services/sms.service';
import { PushNotificationService } from '../../shared/services/push-notification.service';
import { WebhookService } from '../../shared/services/webhook.service';
import { WhatsappService } from '../whatsapp/services/whatsapp.services';
import { NotificationDeliveryService } from './services/notification-delivery.service';

// Import services
import { SlackService } from '../integrations/slack/services/slack.service';
import { WhatsAppMessage } from '../whatsapp/entities/whatsapp-message.entity';
import { WhatsappTemplate } from '../whatsapp/entities/whatsapp-template.entity';
import { WhatsappLog } from '../whatsapp/entities/whatsapp-log.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NotificationEntity,
            NotificationPreference,
            NotificationTemplate,
            EmailTemplate,
            EmailLog,
            EmailQueue,
            EmailContent,
            Domain,
            DomainVerificationToken,
            WhatsAppMessage,
            WhatsappTemplate,
            WhatsappLog
        ]),
        forwardRef(() => SharedModule),
        forwardRef(() => DomainModule),
        forwardRef(() => UsersModule),
        forwardRef(() => OrganizationsModule),
        forwardRef(() => AuthModule),
        EventEmitterModule.forRoot(),
        ConfigModule
    ],
    controllers: [NotificationsController],
    providers: [
        NotificationsService,
        NotificationSchedulerService,
        EmailService,
        NotificationListener,
        NotificationScheduleListener,
        NotificationDeliveryListener,
        NotificationDeliveryService,
        SmsService,
        PushNotificationService,
        WebhookService,
        WhatsappService,
        SlackService
    ],
    exports: [
        NotificationsService,
        NotificationSchedulerService,
        EmailService,
        NotificationDeliveryService
    ]
})
export class NotificationsModule {}