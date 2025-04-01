var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { Message } from './entities/message.entity';
import { MessageTemplate } from './entities/message-template.entity';
import { MessageAttachment } from './entities/message-attachment.entity';
import { TemplateCategory } from './entities/template-category.entity';
import { User } from '../users/entities/user.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuthModule } from '../auth/auth.module';
import { MessageEventHandler } from './events/message-event.handler';
import { MessageDeliveryListener } from './listeners/message-delivery.listener';
import { MessageQueueListener } from './listeners/message-queue.listener';
import { ErrorHandlerService } from './services/error-handler.service';
import { MessageDeliveryService } from './services/message-delivery.service';
import { MessageSchedulerService } from './services/message-scheduler.service';
import { TemplateService } from './services/template.service';
import { MessageRepository } from './repositories/message.repository';
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                Message,
                MessageTemplate,
                MessageAttachment,
                TemplateCategory,
                User,
                Contact
            ]),
            EventEmitterModule.forRoot({
                wildcard: true,
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            forwardRef(() => UsersModule),
            forwardRef(() => ContactsModule),
            forwardRef(() => NotificationsModule),
            forwardRef(() => AuthModule)
        ],
        controllers: [
            MessagesController
        ],
        providers: [
            MessagesService,
            ErrorHandlerService,
            MessageDeliveryService,
            MessageSchedulerService,
            TemplateService,
            MessageEventHandler,
            MessageDeliveryListener,
            MessageQueueListener,
            MessageRepository
        ],
        exports: [
            MessagesService,
            MessageDeliveryService,
            TemplateService
        ]
    })
], MessagesModule);
export { MessagesModule };
//# sourceMappingURL=messages.module.js.map