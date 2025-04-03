"use strict";
// src/modules/notifications/notifications.module.ts
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
exports.NotificationsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var config_1 = require("@nestjs/config");
var notifications_controller_1 = require("./controllers/notifications.controller");
var notifications_service_1 = require("./services/notifications.service");
var notification_scheduler_service_1 = require("./services/notification-scheduler.service");
var notification_entity_1 = require("./entities/notification.entity");
var notification_preference_entity_1 = require("./entities/notification-preference.entity");
var notification_template_entity_1 = require("./entities/notification-template.entity");
// Import email entities with correct paths
var email_template_entity_1 = require("./entities/email-template.entity"); // Look for this in notifications module
var email_log_entity_1 = require("./entities/email-log.entity"); // Look for this in notifications module
var email_queue_entity_1 = require("./entities/email-queue.entity");
// Import domain entities
var domain_entity_1 = require("../domain/entities/domain.entity");
var domain_verification_token_entity_1 = require("../domain/entities/domain-verification-token.entity");
var notification_listener_1 = require("./listeners/notification.listener");
var notification_schedule_listener_1 = require("./listeners/notification-schedule.listener");
var notification_delivery_listener_1 = require("./listeners/notification-delivery.listener");
var users_module_1 = require("../users/users.module");
var organizations_module_1 = require("../organizations/organizations.module");
var auth_module_1 = require("../auth/auth.module");
var email_service_1 = require("../../shared/services/email.service");
var sms_service_1 = require("../../shared/services/sms.service");
var push_notification_service_1 = require("../../shared/services/push-notification.service");
var webhook_service_1 = require("../../shared/services/webhook.service");
var whatsapp_services_1 = require("../whatsapp/services/whatsapp.services");
var notification_delivery_service_1 = require("./services/notification-delivery.service");
// Import services
var slack_service_1 = require("../integrations/slack/services/slack.service");
var domain_verification_service_1 = require("../domain/services/domain-verification.service");
var whatsapp_message_entity_1 = require("../whatsapp/entities/whatsapp-message.entity");
var whatsapp_template_entity_1 = require("../whatsapp/entities/whatsapp-template.entity");
var whatsapp_log_entity_1 = require("../whatsapp/entities/whatsapp-log.entity");
var NotificationsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    notification_entity_1.Notification,
                    notification_preference_entity_1.NotificationPreference,
                    notification_template_entity_1.NotificationTemplate,
                    email_template_entity_1.EmailTemplate,
                    email_log_entity_1.EmailLog,
                    email_queue_entity_1.EmailQueue,
                    domain_entity_1.Domain,
                    domain_verification_token_entity_1.DomainVerificationToken,
                    whatsapp_message_entity_1.WhatsAppMessage,
                    whatsapp_template_entity_1.WhatsappTemplate,
                    whatsapp_log_entity_1.WhatsappLog
                ]),
                event_emitter_1.EventEmitterModule.forRoot({
                    wildcard: true,
                    maxListeners: 20,
                    verboseMemoryLeak: true,
                }),
                config_1.ConfigModule,
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return organizations_module_1.OrganizationsModule; }),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; })
            ],
            controllers: [notifications_controller_1.NotificationsController],
            providers: [
                // Core services
                notifications_service_1.NotificationsService,
                notification_scheduler_service_1.NotificationSchedulerService,
                notification_delivery_service_1.NotificationDeliveryService,
                // Event listeners
                notification_listener_1.NotificationListener,
                notification_schedule_listener_1.NotificationScheduleListener,
                notification_delivery_listener_1.NotificationDeliveryListener,
                // Delivery channel services
                email_service_1.EmailService,
                sms_service_1.SmsService,
                push_notification_service_1.PushNotificationService,
                webhook_service_1.WebhookService,
                whatsapp_services_1.WhatsappService,
                slack_service_1.SlackService,
                // Add domain verification service
                domain_verification_service_1.DomainVerificationService
            ],
            exports: [
                notifications_service_1.NotificationsService,
                notification_delivery_service_1.NotificationDeliveryService
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationsModule = _classThis = /** @class */ (function () {
        function NotificationsModule_1() {
        }
        return NotificationsModule_1;
    }());
    __setFunctionName(_classThis, "NotificationsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsModule = _classThis;
}();
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map