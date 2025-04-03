"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = exports.Notification = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/entities/notification.entity.ts
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var create_notification_dto_1 = require("../dto/create-notification.dto");
Object.defineProperty(exports, "NotificationChannel", { enumerable: true, get: function () { return create_notification_dto_1.NotificationChannel; } });
var update_notification_dto_1 = require("../dto/update-notification.dto");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var Notification = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('notifications'), (0, typeorm_1.Index)(['organizationId', 'userId']), (0, typeorm_1.Index)(['organizationId', 'type']), (0, typeorm_1.Index)(['organizationId', 'status']), (0, typeorm_1.Index)(['organizationId', 'scheduledFor'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _retryCount_decorators;
    var _retryCount_initializers = [];
    var _retryCount_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _readAt_decorators;
    var _readAt_initializers = [];
    var _readAt_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _senderId_decorators;
    var _senderId_initializers = [];
    var _senderId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
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
    var _read_decorators;
    var _read_initializers = [];
    var _read_extraInitializers = [];
    var _deliveredAt_decorators;
    var _deliveredAt_initializers = [];
    var _deliveredAt_extraInitializers = [];
    var _deliveryDetails_decorators;
    var _deliveryDetails_initializers = [];
    var _deliveryDetails_extraInitializers = [];
    var _recipientDetails_decorators;
    var _recipientDetails_initializers = [];
    var _recipientDetails_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _get_isRead_decorators;
    var _get_isExpired_decorators;
    var _get_isScheduled_decorators;
    var _get_isDelivered_decorators;
    var _get_requiresAction_decorators;
    var _get_failedChannels_decorators;
    var Notification = _classThis = /** @class */ (function () {
        function Notification_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.retryCount = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _retryCount_initializers, void 0));
            this.type = (__runInitializers(this, _retryCount_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.content = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.metadata = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.status = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.readAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _readAt_initializers, void 0));
            this.organizationId = (__runInitializers(this, _readAt_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.senderId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _senderId_initializers, void 0));
            this.title = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.priority = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.actions = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _actions_initializers, void 0));
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
            this.read = (__runInitializers(this, _silent_extraInitializers), __runInitializers(this, _read_initializers, void 0));
            this.deliveredAt = (__runInitializers(this, _read_extraInitializers), __runInitializers(this, _deliveredAt_initializers, void 0));
            this.deliveryDetails = (__runInitializers(this, _deliveredAt_extraInitializers), __runInitializers(this, _deliveryDetails_initializers, void 0));
            this.recipientDetails = (__runInitializers(this, _deliveryDetails_extraInitializers), __runInitializers(this, _recipientDetails_initializers, void 0));
            this.updatedById = (__runInitializers(this, _recipientDetails_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.user = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.sender = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            __runInitializers(this, _updatedBy_extraInitializers);
        }
        Object.defineProperty(Notification_1.prototype, "isRead", {
            // Virtual properties
            get: function () {
                return this.read;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Notification_1.prototype, "isExpired", {
            get: function () {
                return this.expiresAt ? new Date() > this.expiresAt : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Notification_1.prototype, "isScheduled", {
            get: function () {
                return this.scheduledFor ? new Date() < this.scheduledFor : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Notification_1.prototype, "isDelivered", {
            get: function () {
                return !!this.deliveredAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Notification_1.prototype, "requiresAction", {
            get: function () {
                return this.requireConfirmation && !this.read;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Notification_1.prototype, "failedChannels", {
            get: function () {
                var _a;
                if (!((_a = this.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels))
                    return [];
                return this.deliveryDetails.channels
                    .filter(function (c) { return c.status === 'FAILED'; })
                    .map(function (c) { return c.channel; });
            },
            enumerable: false,
            configurable: true
        });
        Notification_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, retryCount: { required: true, type: function () { return Number; } }, type: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } }, status: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, readAt: { required: false, type: function () { return Date; } }, organizationId: { required: true, type: function () { return String; } }, senderId: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, priority: { required: true, enum: require("../dto/create-notification.dto").NotificationPriority }, actions: { required: false }, scheduledFor: { required: false, type: function () { return Date; } }, expiresAt: { required: false, type: function () { return Date; } }, requireConfirmation: { required: true, type: function () { return Boolean; } }, data: { required: false, type: function () { return Object; } }, channels: { required: true, enum: require("../dto/create-notification.dto").NotificationChannel, isArray: true }, category: { required: false, type: function () { return String; } }, groupId: { required: false, type: function () { return String; } }, referenceId: { required: false, type: function () { return String; } }, referenceType: { required: false, type: function () { return String; } }, silent: { required: true, type: function () { return Boolean; } }, read: { required: true, type: function () { return Boolean; } }, deliveredAt: { required: false, type: function () { return Date; } }, deliveryDetails: { required: false, type: function () { return ({ attempts: { required: true, type: function () { return Number; } }, lastAttempt: { required: true, type: function () { return Date; } }, channels: { required: true }, error: { required: false, type: function () { return String; } }, timeoutAt: { required: false, type: function () { return Date; } } }); } }, recipientDetails: { required: false, type: function () { return ({ slackUserId: { required: true, type: function () { return Object; } }, email: { required: false, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, deviceTokens: { required: false, type: function () { return [String]; } }, webhookUrl: { required: false, type: function () { return String; } } }); } }, updatedById: { required: false, type: function () { return String; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, user: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, sender: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: false, type: function () { return require("../../users/entities/user.entity").User; } } };
        };
        return Notification_1;
    }());
    __setFunctionName(_classThis, "Notification");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _retryCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _type_decorators = [(0, typeorm_1.Column)()];
        _content_decorators = [(0, typeorm_1.Column)()];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _readAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _senderId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)(), (0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _title_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'enum', enum: create_notification_dto_1.NotificationType }), (0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ length: 200 })];
        _priority_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'text' }), (0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: create_notification_dto_1.NotificationPriority,
                default: create_notification_dto_1.NotificationPriority.NORMAL,
            })];
        _actions_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({
                type: 'enum',
                enum: update_notification_dto_1.NotificationStatus,
                default: update_notification_dto_1.NotificationStatus.PENDING,
            }), (0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _scheduledFor_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _expiresAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _requireConfirmation_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _data_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _channels_decorators = [(0, swagger_1.ApiProperty)({
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
                },
                description: 'Notification delivery channels'
            }), (0, typeorm_1.Column)({ type: 'enum', enum: create_notification_dto_1.NotificationChannel, array: true })];
        _category_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ length: 100, nullable: true })];
        _groupId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ length: 100, nullable: true })];
        _referenceId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _referenceType_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ length: 50, nullable: true })];
        _silent_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _read_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: false })];
        _deliveredAt_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }), (0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _deliveryDetails_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                nullable: true,
                properties: {
                    attempts: { type: 'number' },
                    lastAttempt: { type: 'string', format: 'date-time' },
                    channels: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                channel: { type: 'string', enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK'] },
                                status: { type: 'string', enum: ['SUCCESS', 'FAILED'] },
                                sentAt: { type: 'string', format: 'date-time' },
                                error: { type: 'string' }
                            }
                        }
                    },
                    error: { type: 'string' },
                    timeoutAt: { type: 'string', format: 'date-time' }
                }
            }), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _recipientDetails_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _user_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _sender_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'senderId' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)('User', { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _get_isRead_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isExpired_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isScheduled_decorators = [(0, swagger_1.ApiProperty)()];
        _get_isDelivered_decorators = [(0, swagger_1.ApiProperty)()];
        _get_requiresAction_decorators = [(0, swagger_1.ApiProperty)()];
        _get_failedChannels_decorators = [(0, swagger_1.ApiProperty)()];
        __esDecorate(_classThis, null, _get_isRead_decorators, { kind: "getter", name: "isRead", static: false, private: false, access: { has: function (obj) { return "isRead" in obj; }, get: function (obj) { return obj.isRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isExpired_decorators, { kind: "getter", name: "isExpired", static: false, private: false, access: { has: function (obj) { return "isExpired" in obj; }, get: function (obj) { return obj.isExpired; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isScheduled_decorators, { kind: "getter", name: "isScheduled", static: false, private: false, access: { has: function (obj) { return "isScheduled" in obj; }, get: function (obj) { return obj.isScheduled; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isDelivered_decorators, { kind: "getter", name: "isDelivered", static: false, private: false, access: { has: function (obj) { return "isDelivered" in obj; }, get: function (obj) { return obj.isDelivered; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_requiresAction_decorators, { kind: "getter", name: "requiresAction", static: false, private: false, access: { has: function (obj) { return "requiresAction" in obj; }, get: function (obj) { return obj.requiresAction; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_failedChannels_decorators, { kind: "getter", name: "failedChannels", static: false, private: false, access: { has: function (obj) { return "failedChannels" in obj; }, get: function (obj) { return obj.failedChannels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _retryCount_decorators, { kind: "field", name: "retryCount", static: false, private: false, access: { has: function (obj) { return "retryCount" in obj; }, get: function (obj) { return obj.retryCount; }, set: function (obj, value) { obj.retryCount = value; } }, metadata: _metadata }, _retryCount_initializers, _retryCount_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _readAt_decorators, { kind: "field", name: "readAt", static: false, private: false, access: { has: function (obj) { return "readAt" in obj; }, get: function (obj) { return obj.readAt; }, set: function (obj, value) { obj.readAt = value; } }, metadata: _metadata }, _readAt_initializers, _readAt_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: function (obj) { return "senderId" in obj; }, get: function (obj) { return obj.senderId; }, set: function (obj, value) { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
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
        __esDecorate(null, null, _read_decorators, { kind: "field", name: "read", static: false, private: false, access: { has: function (obj) { return "read" in obj; }, get: function (obj) { return obj.read; }, set: function (obj, value) { obj.read = value; } }, metadata: _metadata }, _read_initializers, _read_extraInitializers);
        __esDecorate(null, null, _deliveredAt_decorators, { kind: "field", name: "deliveredAt", static: false, private: false, access: { has: function (obj) { return "deliveredAt" in obj; }, get: function (obj) { return obj.deliveredAt; }, set: function (obj, value) { obj.deliveredAt = value; } }, metadata: _metadata }, _deliveredAt_initializers, _deliveredAt_extraInitializers);
        __esDecorate(null, null, _deliveryDetails_decorators, { kind: "field", name: "deliveryDetails", static: false, private: false, access: { has: function (obj) { return "deliveryDetails" in obj; }, get: function (obj) { return obj.deliveryDetails; }, set: function (obj, value) { obj.deliveryDetails = value; } }, metadata: _metadata }, _deliveryDetails_initializers, _deliveryDetails_extraInitializers);
        __esDecorate(null, null, _recipientDetails_decorators, { kind: "field", name: "recipientDetails", static: false, private: false, access: { has: function (obj) { return "recipientDetails" in obj; }, get: function (obj) { return obj.recipientDetails; }, set: function (obj, value) { obj.recipientDetails = value; } }, metadata: _metadata }, _recipientDetails_initializers, _recipientDetails_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Notification = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Notification = _classThis;
}();
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map