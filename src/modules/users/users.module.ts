// src/modules/users/users.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailContent } from '../notifications/entities/email-content.entity';


import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserActivityService } from './services/user-activity.service';

import { User } from './entities/user.entity';
import { UserActivity } from './entities/user-activity.entity';
import { UserSession } from './entities/user-session.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserVerification } from './entities/user-verification.entity';
import { UserSettings } from './entities/user-settings.entity';
import { EmailTemplate } from '../email/entities/email-template.entity';
import { EmailLog } from '../notifications/entities/email-log.entity';
import { EmailQueue } from '../notifications/entities/email-queue.entity';
import { Domain } from '../domain/entities/domain.entity';
import { DomainVerificationToken } from '../domain/entities/domain-verification-token.entity';
import { AuditLog } from '../audit/entities/audit-log.entity';

import { UserEventListener } from './listeners/user.listener';
import { UserActivityListener } from './listeners/user-activity.listener';

import { NotificationsModule } from '../notifications/notifications.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from '@/shared/services/email.service';
import { AuditService } from '@/shared/services/audit.service';
import { DomainVerificationService } from '../domain/services/domain-verification.service';
import { EmailTemplateService } from '../email/services/email-template.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserActivity,
            UserSession,
            UserProfile,
            UserVerification,
            UserSettings,
            EmailTemplate,
            EmailLog,
            EmailQueue,
            Domain,
            DomainVerificationToken,
            AuditLog,
            EmailContent
        ]),
        EventEmitterModule.forRoot(),

        forwardRef(() => NotificationsModule),
        forwardRef(() => OrganizationsModule),
        forwardRef(() => AuthModule)

    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UserActivityService,
        UserEventListener,
        UserActivityListener,
        EmailService,
        AuditService,
        DomainVerificationService,
        EmailTemplateService,
    ],
    exports: [UsersService, UserActivityService]
})
export class UsersModule {}