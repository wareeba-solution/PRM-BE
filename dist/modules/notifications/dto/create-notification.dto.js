"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationDto = exports.NotificationRecipient = exports.NotificationAction = exports.NotificationChannel = exports.NotificationPriority = exports.NotificationType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/dto/create-notification.dto.ts
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var NotificationType;
(function (NotificationType) {
    NotificationType["SYSTEM"] = "SYSTEM";
    NotificationType["APPOINTMENT"] = "APPOINTMENT";
    NotificationType["MESSAGE"] = "MESSAGE";
    NotificationType["TASK"] = "TASK";
    NotificationType["ALERT"] = "ALERT";
    NotificationType["REMINDER"] = "REMINDER";
    NotificationType["DOCUMENT"] = "DOCUMENT";
    NotificationType["TICKET_ESCALATED"] = "TICKET_ESCALATED";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "LOW";
    NotificationPriority["NORMAL"] = "NORMAL";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["URGENT"] = "URGENT";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["IN_APP"] = "IN_APP";
    NotificationChannel["EMAIL"] = "EMAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["PUSH"] = "PUSH";
    NotificationChannel["WEBHOOK"] = "WEBHOOK";
    NotificationChannel["SLACK"] = "SLACK";
    NotificationChannel["WHATSAPP"] = "WHATSAPP";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
var NotificationAction = function () {
    var _a;
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationAction() {
                this.label = __runInitializers(this, _label_initializers, void 0);
                this.url = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _url_initializers, void 0));
                this.method = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _method_initializers, void 0));
                this.data = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                __runInitializers(this, _data_extraInitializers);
            }
            NotificationAction._OPENAPI_METADATA_FACTORY = function () {
                return { label: { required: true, type: function () { return String; } }, url: { required: true, type: function () { return String; } }, method: { required: false, type: function () { return Object; } }, data: { required: false, type: function () { return Object; } } };
            };
            return NotificationAction;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _label_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _url_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _method_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _data_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NotificationAction = NotificationAction;
var NotificationRecipient = function () {
    var _a;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationRecipient() {
                this.userId = __runInitializers(this, _userId_initializers, void 0);
                this.role = __runInitializers(this, _userId_extraInitializers);
                this.channels = __runInitializers(this, _channels_initializers, void 0);
                this.metadata = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            NotificationRecipient._OPENAPI_METADATA_FACTORY = function () {
                return { userId: { required: true, type: function () { return String; }, format: "uuid" }, role: { required: true, type: function () { return String; } }, organizationId: { required: false, type: function () { return String; } }, channels: { required: false, enum: require("./create-notification.dto").NotificationChannel, isArray: true }, metadata: { required: false, type: function () { return Object; } } };
            };
            return NotificationRecipient;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsUUID)()];
            _channels_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(NotificationChannel, { each: true })];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NotificationRecipient = NotificationRecipient;
var CreateNotificationDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _recipients_decorators;
    var _recipients_initializers = [];
    var _recipients_extraInitializers = [];
    var _actions_decorators;
    var _actions_initializers = [];
    var _actions_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _requireConfirmation_decorators;
    var _requireConfirmation_initializers = [];
    var _requireConfirmation_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _groupId_decorators;
    var _groupId_initializers = [];
    var _groupId_extraInitializers = [];
    var _referenceId_decorators;
    var _referenceId_initializers = [];
    var _referenceId_extraInitializers = [];
    var _referenceType_decorators;
    var _referenceType_initializers = [];
    var _referenceType_extraInitializers = [];
    var _silent_decorators;
    var _silent_initializers = [];
    var _silent_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateNotificationDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.priority = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _priority_initializers, NotificationPriority.NORMAL));
                this.recipients = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _recipients_initializers, void 0));
                this.actions = (__runInitializers(this, _recipients_extraInitializers), __runInitializers(this, _actions_initializers, void 0));
                this.scheduledFor = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
                this.expiresAt = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
                this.requireConfirmation = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _requireConfirmation_initializers, void 0));
                this.data = (__runInitializers(this, _requireConfirmation_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                this.channels = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _channels_initializers, void 0));
                this.category = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.groupId = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _groupId_initializers, void 0));
                this.referenceId = (__runInitializers(this, _groupId_extraInitializers), __runInitializers(this, _referenceId_initializers, void 0));
                this.referenceType = (__runInitializers(this, _referenceId_extraInitializers), __runInitializers(this, _referenceType_initializers, void 0));
                this.silent = (__runInitializers(this, _referenceType_extraInitializers), __runInitializers(this, _silent_initializers, void 0));
                this.organizationId = (__runInitializers(this, _silent_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
                this.senderId = __runInitializers(this, _organizationId_extraInitializers);
            }
            CreateNotificationDto._OPENAPI_METADATA_FACTORY = function () {
                return { type: { required: true, enum: require("./create-notification.dto").NotificationType }, title: { required: true, type: function () { return String; }, maxLength: 200 }, content: { required: true, type: function () { return String; }, maxLength: 1000 }, priority: { required: false, default: NotificationPriority.NORMAL, enum: require("./create-notification.dto").NotificationPriority }, recipients: { required: true, type: function () { return [require("./create-notification.dto").NotificationRecipient]; } }, actions: { required: false, type: function () { return [require("./create-notification.dto").NotificationAction]; } }, scheduledFor: { required: false, type: function () { return String; } }, expiresAt: { required: false, type: function () { return String; } }, requireConfirmation: { required: false, type: function () { return Boolean; } }, data: { required: false, type: function () { return Object; } }, channels: { required: false, enum: require("./create-notification.dto").NotificationChannel, isArray: true }, category: { required: false, type: function () { return String; }, maxLength: 100 }, groupId: { required: false, type: function () { return String; }, maxLength: 100 }, referenceId: { required: false, type: function () { return String; }, format: "uuid" }, referenceType: { required: false, type: function () { return String; }, maxLength: 50 }, silent: { required: false, type: function () { return Boolean; } }, organizationId: { required: true, type: function () { return String; }, format: "uuid" }, senderId: { required: false, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateNotificationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: NotificationType }), (0, class_validator_1.IsEnum)(NotificationType)];
            _title_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(200)];
            _content_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(1000)];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: NotificationPriority }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(NotificationPriority)];
            _recipients_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return NotificationRecipient; })];
            _actions_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return NotificationAction; })];
            _scheduledFor_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsISO8601)()];
            _expiresAt_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsISO8601)()];
            _requireConfirmation_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _data_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _channels_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(NotificationChannel, { each: true })];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _groupId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _referenceId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _referenceType_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _silent_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _organizationId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _recipients_decorators, { kind: "field", name: "recipients", static: false, private: false, access: { has: function (obj) { return "recipients" in obj; }, get: function (obj) { return obj.recipients; }, set: function (obj, value) { obj.recipients = value; } }, metadata: _metadata }, _recipients_initializers, _recipients_extraInitializers);
            __esDecorate(null, null, _actions_decorators, { kind: "field", name: "actions", static: false, private: false, access: { has: function (obj) { return "actions" in obj; }, get: function (obj) { return obj.actions; }, set: function (obj, value) { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            __esDecorate(null, null, _requireConfirmation_decorators, { kind: "field", name: "requireConfirmation", static: false, private: false, access: { has: function (obj) { return "requireConfirmation" in obj; }, get: function (obj) { return obj.requireConfirmation; }, set: function (obj, value) { obj.requireConfirmation = value; } }, metadata: _metadata }, _requireConfirmation_initializers, _requireConfirmation_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
            __esDecorate(null, null, _referenceId_decorators, { kind: "field", name: "referenceId", static: false, private: false, access: { has: function (obj) { return "referenceId" in obj; }, get: function (obj) { return obj.referenceId; }, set: function (obj, value) { obj.referenceId = value; } }, metadata: _metadata }, _referenceId_initializers, _referenceId_extraInitializers);
            __esDecorate(null, null, _referenceType_decorators, { kind: "field", name: "referenceType", static: false, private: false, access: { has: function (obj) { return "referenceType" in obj; }, get: function (obj) { return obj.referenceType; }, set: function (obj, value) { obj.referenceType = value; } }, metadata: _metadata }, _referenceType_initializers, _referenceType_extraInitializers);
            __esDecorate(null, null, _silent_decorators, { kind: "field", name: "silent", static: false, private: false, access: { has: function (obj) { return "silent" in obj; }, get: function (obj) { return obj.silent; }, set: function (obj, value) { obj.silent = value; } }, metadata: _metadata }, _silent_initializers, _silent_extraInitializers);
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=create-notification.dto.js.map