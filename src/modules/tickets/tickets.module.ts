// src/modules/tickets/tickets.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { TicketsController } from './controllers/tickets.controller';
import { TicketsService } from './services/tickets.service';
import { TicketActivityService } from './services/ticket-activity.service';
import { TicketEscalationService } from './services/ticket-escalation.service';
import { TicketPriorityService } from './services/ticket-priority.service';

import { Ticket } from './entities/ticket.entity';
import { TicketComment } from './entities/ticket-comment.entity';
import { TicketAttachment } from './entities/ticket-attachment.entity';
import { TicketActivity } from './entities/ticket-activity.entity';
import { TicketPriority } from './entities/ticket-priority.entity';
import { User } from '../users/entities/user.entity';

import { TicketListener } from './listeners/ticket.listener';
import { TicketAssignmentListener } from './listeners/ticket-assignment.listener';
import { TicketEscalationListener } from './listeners/ticket-escalation.listener';

import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { AuthModule } from '../auth/auth.module';
import { DepartmentsModule } from '../departments/departments.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Ticket,
            TicketComment,
            TicketAttachment,
            TicketActivity,
            TicketPriority,
            User
        ]),
        EventEmitterModule.forRoot({
            wildcard: true,
            maxListeners: 20,
            verboseMemoryLeak: true,
        }),
        forwardRef(() => UsersModule),
        forwardRef(() => NotificationsModule),
        forwardRef(() => OrganizationsModule),
        forwardRef(() => AuthModule),
        DepartmentsModule,
        MessagesModule
    ],
    controllers: [
        TicketsController
    ],
    providers: [
        TicketsService,
        TicketActivityService,
        TicketEscalationService,
        TicketPriorityService,
        TicketListener,
        TicketAssignmentListener,
        TicketEscalationListener
    ],
    exports: [
        TicketsService,
        TicketActivityService,
        TicketPriorityService
    ]
})
export class TicketsModule {}