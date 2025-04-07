// src/shared/shared.module.ts

import { Module, Global, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushNotificationService } from './services/push-notification.service';
import { WebhookService } from './services/webhook.service';

// Import entities with forwardRef to avoid circular dependencies
import { EmailTemplate } from '../modules/email/entities/email-template.entity';
import { EmailLog } from '../modules/notifications/entities/email-log.entity';
import { EmailQueue } from '../modules/notifications/entities/email-queue.entity';
import { EmailContent } from '../modules/notifications/entities/email-content.entity';
import { Notification } from '../modules/notifications/entities/notification.entity';

// Import domain module with forwardRef
import { DomainModule } from '../modules/domain/domain.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    forwardRef(() => DomainModule),
    TypeOrmModule.forFeature([
      EmailTemplate,
      EmailLog,
      EmailQueue,
      EmailContent, // Added EmailContent entity
      Notification
    ])
  ],
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
export class SharedModule {}