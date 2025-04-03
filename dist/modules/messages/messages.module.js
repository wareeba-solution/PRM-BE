"use strict";
// src/modules/messages/messages.module.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var messages_controller_1 = require("./controllers/messages.controller");
var messages_service_1 = require("./services/messages.service");
var message_entity_1 = require("./entities/message.entity");
var message_template_entity_1 = require("./entities/message-template.entity");
var message_attachment_entity_1 = require("./entities/message-attachment.entity");
var template_category_entity_1 = require("./entities/template-category.entity");
var user_entity_1 = require("../users/entities/user.entity");
var contact_entity_1 = require("../contacts/entities/contact.entity");
var users_module_1 = require("../users/users.module");
var contacts_module_1 = require("../contacts/contacts.module");
var notifications_module_1 = require("../notifications/notifications.module");
var auth_module_1 = require("../auth/auth.module"); // Add this import
var message_event_handler_1 = require("./events/message-event.handler");
var message_delivery_listener_1 = require("./listeners/message-delivery.listener");
var message_queue_listener_1 = require("./listeners/message-queue.listener");
var error_handler_service_1 = require("./services/error-handler.service");
var message_delivery_service_1 = require("./services/message-delivery.service");
var message_scheduler_service_1 = require("./services/message-scheduler.service");
var template_service_1 = require("./services/template.service");
var message_repository_1 = require("./repositories/message.repository");
var MessagesModule = function () {
    var _classDecorators = [(0, common_1.Module)({
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
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return contacts_module_1.ContactsModule; }),
                (0, common_1.forwardRef)(function () { return notifications_module_1.NotificationsModule; }),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }) // Add this line
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
                message_repository_1.MessageRepository
            ],
            exports: [
                messages_service_1.MessagesService,
                message_delivery_service_1.MessageDeliveryService,
                template_service_1.TemplateService
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MessagesModule = _classThis = /** @class */ (function () {
        function MessagesModule_1() {
        }
        return MessagesModule_1;
    }());
    __setFunctionName(_classThis, "MessagesModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagesModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagesModule = _classThis;
}();
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map