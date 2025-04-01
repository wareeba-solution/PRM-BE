var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';
import { Organization } from './entities/organization.entity';
import { OrganizationInvitation } from './entities/organization-invitation.entity';
import { OrganizationAuditLog } from './entities/organization-audit-log.entity';
import { User } from '../users/entities/user.entity';
import { AuditLog } from '../audit/entities/audit-log.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { OrganizationBillingListener } from './listeners/organization-billing.listener';
import { OrganizationAuditListener } from './listeners/organization-audit.listener';
import { OrganizationSubscriptionService } from './services/organization-subscription.service';
import { OrganizationInvitationService } from './services/organization-invitation.service';
import { OrganizationAuditService } from './services/organization-audit.service';
import { OrganizationAccessGuard } from './guards/organization-access.guard';
import { OrganizationRoleGuard } from './guards/organization-role.guard';
import { DomainVerificationService } from '../domain/services/domain-verification.service';
import { EmailService } from '../../shared/services/email.service';
import { StorageService } from '../storage/services/storage.service';
import { Domain } from 'domain';
import { DomainVerificationToken } from '../domain/entities/domain-verification-token.entity';
import { EmailTemplate } from '../notifications/entities/email-template.entity';
import { EmailLog } from '../notifications/entities/email-log.entity';
import { EmailQueue } from '../notifications/entities/email-queue.entity';
let OrganizationsModule = class OrganizationsModule {
};
OrganizationsModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                Organization,
                OrganizationInvitation,
                OrganizationAuditLog,
                User,
                AuditLog,
                Domain,
                DomainVerificationService,
                DomainVerificationToken,
                EmailTemplate,
                EmailLog,
                EmailQueue,
                EmailService,
            ]),
            EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            forwardRef(() => UsersModule),
            forwardRef(() => AuthModule),
        ],
        controllers: [
            OrganizationsController
        ],
        providers: [
            OrganizationsService,
            OrganizationSubscriptionService,
            OrganizationInvitationService,
            OrganizationAuditService,
            OrganizationBillingListener,
            OrganizationAuditListener,
            OrganizationAccessGuard,
            OrganizationRoleGuard,
            DomainVerificationService,
            EmailService,
            StorageService,
        ],
        exports: [
            OrganizationsService,
            OrganizationSubscriptionService,
            OrganizationInvitationService,
            OrganizationAccessGuard,
            OrganizationRoleGuard,
        ]
    })
], OrganizationsModule);
export { OrganizationsModule };
//# sourceMappingURL=organizations.module.js.map