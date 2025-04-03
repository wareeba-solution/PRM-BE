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
exports.BulkSendNotificationDto = exports.SendNotificationDto = exports.NotificationPriority = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var notification_type_enum_1 = require("../enums/notification-type.enum");
/**
 * Enum for notification priorities
 */
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["LOW"] = "LOW";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
/**
 * DTO for notification data
 */
var NotificationDataDto = function () {
    var _a;
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _previousDepartmentId_decorators;
    var _previousDepartmentId_initializers = [];
    var _previousDepartmentId_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _additionalData_decorators;
    var _additionalData_initializers = [];
    var _additionalData_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NotificationDataDto() {
                this.departmentId = __runInitializers(this, _departmentId_initializers, void 0);
                this.previousDepartmentId = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _previousDepartmentId_initializers, void 0));
                this.ticketId = (__runInitializers(this, _previousDepartmentId_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
                this.organizationId = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
                this.additionalData = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _additionalData_initializers, void 0));
                __runInitializers(this, _additionalData_extraInitializers);
            }
            NotificationDataDto._OPENAPI_METADATA_FACTORY = function () {
                return { departmentId: { required: false, type: function () { return String; }, format: "uuid" }, previousDepartmentId: { required: false, type: function () { return String; }, format: "uuid" }, ticketId: { required: false, type: function () { return String; }, format: "uuid" }, organizationId: { required: false, type: function () { return String; }, format: "uuid" }, additionalData: { required: false, type: function () { return Object; } } };
            };
            return NotificationDataDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _departmentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Department ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _previousDepartmentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Previous department ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _ticketId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Ticket ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _organizationId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Organization ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _additionalData_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Any additional custom data',
                    type: 'object',
                    additionalProperties: true
                }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
            __esDecorate(null, null, _previousDepartmentId_decorators, { kind: "field", name: "previousDepartmentId", static: false, private: false, access: { has: function (obj) { return "previousDepartmentId" in obj; }, get: function (obj) { return obj.previousDepartmentId; }, set: function (obj, value) { obj.previousDepartmentId = value; } }, metadata: _metadata }, _previousDepartmentId_initializers, _previousDepartmentId_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            __esDecorate(null, null, _additionalData_decorators, { kind: "field", name: "additionalData", static: false, private: false, access: { has: function (obj) { return "additionalData" in obj; }, get: function (obj) { return obj.additionalData; }, set: function (obj, value) { obj.additionalData = value; } }, metadata: _metadata }, _additionalData_initializers, _additionalData_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
/**
 * DTO for sending a notification
 */
var SendNotificationDto = function () {
    var _a;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _sendImmediately_decorators;
    var _sendImmediately_initializers = [];
    var _sendImmediately_extraInitializers = [];
    var _persist_decorators;
    var _persist_initializers = [];
    var _persist_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendNotificationDto() {
                this.userId = __runInitializers(this, _userId_initializers, void 0);
                this.type = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.priority = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.organizationId = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
                this.data = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                this.sendImmediately = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _sendImmediately_initializers, void 0));
                this.persist = (__runInitializers(this, _sendImmediately_extraInitializers), __runInitializers(this, _persist_initializers, void 0));
                this.scheduledFor = (__runInitializers(this, _persist_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
                __runInitializers(this, _scheduledFor_extraInitializers);
            }
            SendNotificationDto._OPENAPI_METADATA_FACTORY = function () {
                return { userId: { required: true, type: function () { return String; }, format: "uuid" }, type: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, message: { required: true, type: function () { return String; } }, priority: { required: false, type: function () { return Object; } }, organizationId: { required: false, type: function () { return String; }, format: "uuid" }, data: { required: false, type: function () { return Object; } }, sendImmediately: { required: false, type: function () { return Boolean; } }, persist: { required: false, type: function () { return Boolean; } }, scheduledFor: { required: false, type: function () { return Date; } } };
            };
            return SendNotificationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID to receive the notification' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: notification_type_enum_1.NotificationType,
                    example: notification_type_enum_1.NotificationType.SYSTEM_ANNOUNCEMENT
                }), (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType), (0, class_validator_1.IsNotEmpty)()];
            _title_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification title' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification message' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Notification priority',
                    enum: NotificationPriority,
                    default: NotificationPriority.MEDIUM
                }), (0, class_validator_1.IsEnum)(NotificationPriority), (0, class_validator_1.IsOptional)()];
            _organizationId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization ID that this notification is related to'
                }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _data_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional structured data for the notification',
                    type: 'object',
                    additionalProperties: true
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return NotificationDataDto; }), (0, class_validator_1.IsOptional)()];
            _sendImmediately_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to send the notification immediately',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _persist_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the notification should be persisted in the database',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _scheduledFor_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Scheduled time to deliver the notification (if not sending immediately)'
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _sendImmediately_decorators, { kind: "field", name: "sendImmediately", static: false, private: false, access: { has: function (obj) { return "sendImmediately" in obj; }, get: function (obj) { return obj.sendImmediately; }, set: function (obj, value) { obj.sendImmediately = value; } }, metadata: _metadata }, _sendImmediately_initializers, _sendImmediately_extraInitializers);
            __esDecorate(null, null, _persist_decorators, { kind: "field", name: "persist", static: false, private: false, access: { has: function (obj) { return "persist" in obj; }, get: function (obj) { return obj.persist; }, set: function (obj, value) { obj.persist = value; } }, metadata: _metadata }, _persist_initializers, _persist_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendNotificationDto = SendNotificationDto;
/**
 * DTO for bulk sending notifications to multiple users
 */
var BulkSendNotificationDto = function () {
    var _a;
    var _userIds_decorators;
    var _userIds_initializers = [];
    var _userIds_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _sendImmediately_decorators;
    var _sendImmediately_initializers = [];
    var _sendImmediately_extraInitializers = [];
    var _persist_decorators;
    var _persist_initializers = [];
    var _persist_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BulkSendNotificationDto() {
                this.userIds = __runInitializers(this, _userIds_initializers, void 0);
                this.type = (__runInitializers(this, _userIds_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.priority = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.organizationId = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
                this.data = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                this.sendImmediately = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _sendImmediately_initializers, void 0));
                this.persist = (__runInitializers(this, _sendImmediately_extraInitializers), __runInitializers(this, _persist_initializers, void 0));
                this.scheduledFor = (__runInitializers(this, _persist_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
                __runInitializers(this, _scheduledFor_extraInitializers);
            }
            BulkSendNotificationDto._OPENAPI_METADATA_FACTORY = function () {
                return { userIds: { required: true, type: function () { return [String]; }, format: "uuid" }, type: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, message: { required: true, type: function () { return String; } }, priority: { required: false, type: function () { return Object; } }, organizationId: { required: false, type: function () { return String; }, format: "uuid" }, data: { required: false, type: function () { return Object; } }, sendImmediately: { required: false, type: function () { return Boolean; } }, persist: { required: false, type: function () { return Boolean; } }, scheduledFor: { required: false, type: function () { return Date; } } };
            };
            return BulkSendNotificationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of user IDs to receive the notification',
                    isArray: true,
                    type: String
                }), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: notification_type_enum_1.NotificationType,
                    example: notification_type_enum_1.NotificationType.SYSTEM_ANNOUNCEMENT
                }), (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType), (0, class_validator_1.IsNotEmpty)()];
            _title_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification title' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification message' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Notification priority',
                    enum: NotificationPriority,
                    default: NotificationPriority.MEDIUM
                }), (0, class_validator_1.IsEnum)(NotificationPriority), (0, class_validator_1.IsOptional)()];
            _organizationId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization ID that this notification is related to'
                }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _data_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional structured data for the notification',
                    type: 'object',
                    additionalProperties: true
                }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return NotificationDataDto; }), (0, class_validator_1.IsOptional)()];
            _sendImmediately_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to send the notification immediately',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _persist_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the notification should be persisted in the database',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _scheduledFor_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Scheduled time to deliver the notification (if not sending immediately)'
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _userIds_decorators, { kind: "field", name: "userIds", static: false, private: false, access: { has: function (obj) { return "userIds" in obj; }, get: function (obj) { return obj.userIds; }, set: function (obj, value) { obj.userIds = value; } }, metadata: _metadata }, _userIds_initializers, _userIds_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _sendImmediately_decorators, { kind: "field", name: "sendImmediately", static: false, private: false, access: { has: function (obj) { return "sendImmediately" in obj; }, get: function (obj) { return obj.sendImmediately; }, set: function (obj, value) { obj.sendImmediately = value; } }, metadata: _metadata }, _sendImmediately_initializers, _sendImmediately_extraInitializers);
            __esDecorate(null, null, _persist_decorators, { kind: "field", name: "persist", static: false, private: false, access: { has: function (obj) { return "persist" in obj; }, get: function (obj) { return obj.persist; }, set: function (obj, value) { obj.persist = value; } }, metadata: _metadata }, _persist_initializers, _persist_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BulkSendNotificationDto = BulkSendNotificationDto;
//# sourceMappingURL=send-notification.dto.js.map