"use strict";
// src/modules/messages/messages.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const messages_controller_1 = require("./controllers/messages.controller");
const messages_service_1 = require("./services/messages.service");
const message_entity_1 = require("./entities/message.entity");
const message_template_entity_1 = require("./entities/message-template.entity");
const message_attachment_entity_1 = require("./entities/message-attachment.entity");
const template_category_entity_1 = require("./entities/template-category.entity");
const user_entity_1 = require("../users/entities/user.entity");
const contact_entity_1 = require("../contacts/entities/contact.entity");
const users_module_1 = require("../users/users.module");
const contacts_module_1 = require("../contacts/contacts.module");
const notifications_module_1 = require("../notifications/notifications.module");
const auth_module_1 = require("../auth/auth.module"); // Add this import
const message_event_handler_1 = require("./events/message-event.handler");
const message_delivery_listener_1 = require("./listeners/message-delivery.listener");
const message_queue_listener_1 = require("./listeners/message-queue.listener");
const error_handler_service_1 = require("./services/error-handler.service");
const message_delivery_service_1 = require("./services/message-delivery.service");
const message_scheduler_service_1 = require("./services/message-scheduler.service");
const template_service_1 = require("./services/template.service");
const message_repository_1 = require("./repositories/message.repository");
const message_template_service_1 = require("./services/message-template.service");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                message_entity_1.Message,
                message_template_entity_1.MessageTemplate,
                message_attachment_entity_1.MessageAttachment,
                template_category_entity_1.TemplateCategory,
                user_entity_1.User,
                contact_entity_1.Contact
            ]),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                maxListeners: 20,
                verboseMemoryLeak: true,
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => contacts_module_1.ContactsModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule) // Add this line
        ],
        controllers: [
            messages_controller_1.MessagesController
        ],
        providers: [
            messages_service_1.MessagesService,
            error_handler_service_1.ErrorHandlerService,
            message_delivery_service_1.MessageDeliveryService,
            message_scheduler_service_1.MessageSchedulerService,
            template_service_1.TemplateService,
            message_event_handler_1.MessageEventHandler,
            message_delivery_listener_1.MessageDeliveryListener,
            message_queue_listener_1.MessageQueueListener,
            message_repository_1.MessageRepository,
            message_template_service_1.MessageTemplateService
        ],
        exports: [
            messages_service_1.MessagesService,
            message_delivery_service_1.MessageDeliveryService,
            template_service_1.TemplateService,
            message_template_service_1.MessageTemplateService
        ]
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map