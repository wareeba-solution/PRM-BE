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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMessage = exports.MessageDirection = exports.MessageStatus = exports.MessageType = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "TEXT";
    MessageType["IMAGE"] = "IMAGE";
    MessageType["VIDEO"] = "VIDEO";
    MessageType["DOCUMENT"] = "DOCUMENT";
    MessageType["AUDIO"] = "AUDIO";
    MessageType["LOCATION"] = "LOCATION";
    MessageType["CONTACT"] = "CONTACT";
    MessageType["TEMPLATE"] = "TEMPLATE";
    MessageType["INTERACTIVE"] = "INTERACTIVE";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["READ"] = "READ";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["UNKNOWN"] = "UNKNOWN";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["INBOUND"] = "INBOUND";
    MessageDirection["OUTBOUND"] = "OUTBOUND";
})(MessageDirection || (exports.MessageDirection = MessageDirection = {}));
var WhatsAppMessage = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('whatsapp_messages'), (0, typeorm_1.Index)(['organizationId', 'createdAt']), (0, typeorm_1.Index)(['recipientPhone', 'createdAt'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _recipientPhone_decorators;
    var _recipientPhone_initializers = [];
    var _recipientPhone_extraInitializers = [];
    var _recipientName_decorators;
    var _recipientName_initializers = [];
    var _recipientName_extraInitializers = [];
    var _direction_decorators;
    var _direction_initializers = [];
    var _direction_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _templateName_decorators;
    var _templateName_initializers = [];
    var _templateName_extraInitializers = [];
    var _templateData_decorators;
    var _templateData_initializers = [];
    var _templateData_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _whatsappMessageId_decorators;
    var _whatsappMessageId_initializers = [];
    var _whatsappMessageId_extraInitializers = [];
    var _errorCode_decorators;
    var _errorCode_initializers = [];
    var _errorCode_extraInitializers = [];
    var _errorMessage_decorators;
    var _errorMessage_initializers = [];
    var _errorMessage_extraInitializers = [];
    var _retryCount_decorators;
    var _retryCount_initializers = [];
    var _retryCount_extraInitializers = [];
    var _lastRetryAt_decorators;
    var _lastRetryAt_initializers = [];
    var _lastRetryAt_extraInitializers = [];
    var _sentAt_decorators;
    var _sentAt_initializers = [];
    var _sentAt_extraInitializers = [];
    var _queuedAt_decorators;
    var _queuedAt_initializers = [];
    var _queuedAt_extraInitializers = [];
    var _deliveredAt_decorators;
    var _deliveredAt_initializers = [];
    var _deliveredAt_extraInitializers = [];
    var _readAt_decorators;
    var _readAt_initializers = [];
    var _readAt_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _locationData_decorators;
    var _locationData_initializers = [];
    var _locationData_extraInitializers = [];
    var _contactData_decorators;
    var _contactData_initializers = [];
    var _contactData_extraInitializers = [];
    var _interactiveData_decorators;
    var _interactiveData_initializers = [];
    var _interactiveData_extraInitializers = [];
    var _isScheduled_decorators;
    var _isScheduled_initializers = [];
    var _isScheduled_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _isTemplate_decorators;
    var _isTemplate_initializers = [];
    var _isTemplate_extraInitializers = [];
    var _requiresUserReply_decorators;
    var _requiresUserReply_initializers = [];
    var _requiresUserReply_extraInitializers = [];
    var _replyTimeoutHours_decorators;
    var _replyTimeoutHours_initializers = [];
    var _replyTimeoutHours_extraInitializers = [];
    var _replyDeadline_decorators;
    var _replyDeadline_initializers = [];
    var _replyDeadline_extraInitializers = [];
    var _isAutomatedReply_decorators;
    var _isAutomatedReply_initializers = [];
    var _isAutomatedReply_extraInitializers = [];
    var _automationTriggerId_decorators;
    var _automationTriggerId_initializers = [];
    var _automationTriggerId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var WhatsAppMessage = _classThis = /** @class */ (function () {
        function WhatsAppMessage_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.from = __runInitializers(this, _id_extraInitializers);
            this.content = __runInitializers(this, _content_initializers, void 0);
            this.receivedAt = __runInitializers(this, _content_extraInitializers);
            // status property removed to avoid duplication
            this.organizationId = __runInitializers(this, _organizationId_initializers, void 0);
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.userId = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.recipientPhone = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _recipientPhone_initializers, void 0));
            this.recipientName = (__runInitializers(this, _recipientPhone_extraInitializers), __runInitializers(this, _recipientName_initializers, void 0));
            this.direction = (__runInitializers(this, _recipientName_extraInitializers), __runInitializers(this, _direction_initializers, void 0));
            this.type = (__runInitializers(this, _direction_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            // content property removed to avoid duplication
            this.metadata = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.templateName = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _templateName_initializers, void 0));
            this.templateData = (__runInitializers(this, _templateName_extraInitializers), __runInitializers(this, _templateData_initializers, void 0));
            this.status = (__runInitializers(this, _templateData_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.whatsappMessageId = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _whatsappMessageId_initializers, void 0));
            this.errorCode = (__runInitializers(this, _whatsappMessageId_extraInitializers), __runInitializers(this, _errorCode_initializers, void 0));
            this.errorMessage = (__runInitializers(this, _errorCode_extraInitializers), __runInitializers(this, _errorMessage_initializers, void 0));
            this.retryCount = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _retryCount_initializers, void 0));
            this.lastRetryAt = (__runInitializers(this, _retryCount_extraInitializers), __runInitializers(this, _lastRetryAt_initializers, void 0));
            this.sentAt = (__runInitializers(this, _lastRetryAt_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
            this.queuedAt = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _queuedAt_initializers, void 0));
            this.deliveredAt = (__runInitializers(this, _queuedAt_extraInitializers), __runInitializers(this, _deliveredAt_initializers, void 0));
            this.readAt = (__runInitializers(this, _deliveredAt_extraInitializers), __runInitializers(this, _readAt_initializers, void 0));
            this.failedAt = __runInitializers(this, _readAt_extraInitializers);
            this.attachments = __runInitializers(this, _attachments_initializers, void 0);
            this.locationData = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _locationData_initializers, void 0));
            this.contactData = (__runInitializers(this, _locationData_extraInitializers), __runInitializers(this, _contactData_initializers, void 0));
            this.interactiveData = (__runInitializers(this, _contactData_extraInitializers), __runInitializers(this, _interactiveData_initializers, void 0));
            this.isScheduled = (__runInitializers(this, _interactiveData_extraInitializers), __runInitializers(this, _isScheduled_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _isScheduled_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.isTemplate = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _isTemplate_initializers, void 0));
            this.requiresUserReply = (__runInitializers(this, _isTemplate_extraInitializers), __runInitializers(this, _requiresUserReply_initializers, void 0));
            this.replyTimeoutHours = (__runInitializers(this, _requiresUserReply_extraInitializers), __runInitializers(this, _replyTimeoutHours_initializers, void 0));
            this.replyDeadline = (__runInitializers(this, _replyTimeoutHours_extraInitializers), __runInitializers(this, _replyDeadline_initializers, void 0));
            this.isAutomatedReply = (__runInitializers(this, _replyDeadline_extraInitializers), __runInitializers(this, _isAutomatedReply_initializers, void 0));
            this.automationTriggerId = (__runInitializers(this, _isAutomatedReply_extraInitializers), __runInitializers(this, _automationTriggerId_initializers, void 0));
            this.createdAt = (__runInitializers(this, _automationTriggerId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        /**
         * Check if message can be retried
         */
        WhatsAppMessage_1.prototype.canRetry = function () {
            return (this.status === MessageStatus.FAILED &&
                this.retryCount < 3 &&
                !this.isExpired());
        };
        /**
         * Check if message is expired
         */
        WhatsAppMessage_1.prototype.isExpired = function () {
            if (this.isScheduled && this.scheduledFor) {
                return this.scheduledFor < new Date();
            }
            if (this.requiresUserReply && this.replyDeadline) {
                return this.replyDeadline < new Date();
            }
            return false;
        };
        /**
         * Check if message needs to be sent now
         */
        WhatsAppMessage_1.prototype.shouldSendNow = function () {
            if (!this.isScheduled) {
                return true;
            }
            if (!this.scheduledFor) {
                return true;
            }
            return this.scheduledFor <= new Date();
        };
        /**
         * Update message status
         */
        WhatsAppMessage_1.prototype.updateStatus = function (status) {
            this.status = status;
            switch (status) {
                case MessageStatus.SENT:
                    this.sentAt = new Date();
                    break;
                case MessageStatus.DELIVERED:
                    this.deliveredAt = new Date();
                    break;
                case MessageStatus.READ:
                    this.readAt = new Date();
                    break;
                case MessageStatus.FAILED:
                    this.failedAt = new Date();
                    break;
            }
        };
        /**
         * Handle retry attempt
         */
        WhatsAppMessage_1.prototype.retry = function () {
            if (!this.canRetry()) {
                throw new Error('Message cannot be retried');
            }
            this.retryCount += 1;
            this.lastRetryAt = new Date();
            this.status = MessageStatus.QUEUED;
            this.errorCode = null;
            this.errorMessage = null;
        };
        WhatsAppMessage_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, from: { required: true, type: function () { return String; } }, to: { required: true, type: function () { return String; } }, messageType: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, receivedAt: { required: false, type: function () { return Date; } }, lastError: { required: false, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, userId: { required: true, type: function () { return String; } }, user: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, recipientPhone: { required: true, type: function () { return String; } }, recipientName: { required: true, type: function () { return String; } }, direction: { required: true, enum: require("./whatsapp-message.entity").MessageDirection }, type: { required: true, enum: require("./whatsapp-message.entity").MessageType }, metadata: { required: false, type: function () { return Object; } }, templateName: { required: true, type: function () { return String; } }, templateData: { required: true, type: function () { return Object; } }, status: { required: true, enum: require("./whatsapp-message.entity").MessageStatus }, whatsappMessageId: { required: true, type: function () { return String; } }, errorCode: { required: true, type: function () { return String; }, nullable: true }, errorMessage: { required: true, type: function () { return String; }, nullable: true }, retryCount: { required: true, type: function () { return Number; } }, lastRetryAt: { required: true, type: function () { return Date; } }, sentAt: { required: false, type: function () { return Date; } }, queuedAt: { required: true, type: function () { return Date; } }, deliveredAt: { required: true, type: function () { return Date; }, nullable: true }, readAt: { required: true, type: function () { return Date; }, nullable: true }, failedAt: { required: true, type: function () { return Date; } }, attachments: { required: true }, locationData: { required: true, type: function () { return ({ latitude: { required: true, type: function () { return Number; } }, longitude: { required: true, type: function () { return Number; } }, name: { required: false, type: function () { return String; } }, address: { required: false, type: function () { return String; } } }); } }, contactData: { required: true }, interactiveData: { required: true, type: function () { return ({ type: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, body: { required: true, type: function () { return String; } }, buttons: { required: false, type: function () { return [Object]; } }, selectedOption: { required: false, type: function () { return String; } } }); } }, isScheduled: { required: true, type: function () { return Boolean; } }, scheduledFor: { required: true, type: function () { return Date; } }, isTemplate: { required: true, type: function () { return Boolean; } }, requiresUserReply: { required: true, type: function () { return Boolean; } }, replyTimeoutHours: { required: true, type: function () { return Number; } }, replyDeadline: { required: true, type: function () { return Date; } }, isAutomatedReply: { required: true, type: function () { return Boolean; } }, automationTriggerId: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return WhatsAppMessage_1;
    }());
    __setFunctionName(_classThis, "WhatsAppMessage");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _content_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid')];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _userId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _recipientPhone_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _recipientName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _direction_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MessageDirection,
                default: MessageDirection.OUTBOUND
            })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MessageType,
                default: MessageType.TEXT
            })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _templateName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _templateData_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MessageStatus,
                default: MessageStatus.QUEUED
            })];
        _whatsappMessageId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _errorCode_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _errorMessage_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _retryCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _lastRetryAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _sentAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _queuedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _deliveredAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _readAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _attachments_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _locationData_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _contactData_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _interactiveData_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isScheduled_decorators = [(0, typeorm_1.Column)({ default: false })];
        _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _isTemplate_decorators = [(0, typeorm_1.Column)({ default: false })];
        _requiresUserReply_decorators = [(0, typeorm_1.Column)({ default: false })];
        _replyTimeoutHours_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _replyDeadline_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isAutomatedReply_decorators = [(0, typeorm_1.Column)({ default: false })];
        _automationTriggerId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _recipientPhone_decorators, { kind: "field", name: "recipientPhone", static: false, private: false, access: { has: function (obj) { return "recipientPhone" in obj; }, get: function (obj) { return obj.recipientPhone; }, set: function (obj, value) { obj.recipientPhone = value; } }, metadata: _metadata }, _recipientPhone_initializers, _recipientPhone_extraInitializers);
        __esDecorate(null, null, _recipientName_decorators, { kind: "field", name: "recipientName", static: false, private: false, access: { has: function (obj) { return "recipientName" in obj; }, get: function (obj) { return obj.recipientName; }, set: function (obj, value) { obj.recipientName = value; } }, metadata: _metadata }, _recipientName_initializers, _recipientName_extraInitializers);
        __esDecorate(null, null, _direction_decorators, { kind: "field", name: "direction", static: false, private: false, access: { has: function (obj) { return "direction" in obj; }, get: function (obj) { return obj.direction; }, set: function (obj, value) { obj.direction = value; } }, metadata: _metadata }, _direction_initializers, _direction_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _templateName_decorators, { kind: "field", name: "templateName", static: false, private: false, access: { has: function (obj) { return "templateName" in obj; }, get: function (obj) { return obj.templateName; }, set: function (obj, value) { obj.templateName = value; } }, metadata: _metadata }, _templateName_initializers, _templateName_extraInitializers);
        __esDecorate(null, null, _templateData_decorators, { kind: "field", name: "templateData", static: false, private: false, access: { has: function (obj) { return "templateData" in obj; }, get: function (obj) { return obj.templateData; }, set: function (obj, value) { obj.templateData = value; } }, metadata: _metadata }, _templateData_initializers, _templateData_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _whatsappMessageId_decorators, { kind: "field", name: "whatsappMessageId", static: false, private: false, access: { has: function (obj) { return "whatsappMessageId" in obj; }, get: function (obj) { return obj.whatsappMessageId; }, set: function (obj, value) { obj.whatsappMessageId = value; } }, metadata: _metadata }, _whatsappMessageId_initializers, _whatsappMessageId_extraInitializers);
        __esDecorate(null, null, _errorCode_decorators, { kind: "field", name: "errorCode", static: false, private: false, access: { has: function (obj) { return "errorCode" in obj; }, get: function (obj) { return obj.errorCode; }, set: function (obj, value) { obj.errorCode = value; } }, metadata: _metadata }, _errorCode_initializers, _errorCode_extraInitializers);
        __esDecorate(null, null, _errorMessage_decorators, { kind: "field", name: "errorMessage", static: false, private: false, access: { has: function (obj) { return "errorMessage" in obj; }, get: function (obj) { return obj.errorMessage; }, set: function (obj, value) { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
        __esDecorate(null, null, _retryCount_decorators, { kind: "field", name: "retryCount", static: false, private: false, access: { has: function (obj) { return "retryCount" in obj; }, get: function (obj) { return obj.retryCount; }, set: function (obj, value) { obj.retryCount = value; } }, metadata: _metadata }, _retryCount_initializers, _retryCount_extraInitializers);
        __esDecorate(null, null, _lastRetryAt_decorators, { kind: "field", name: "lastRetryAt", static: false, private: false, access: { has: function (obj) { return "lastRetryAt" in obj; }, get: function (obj) { return obj.lastRetryAt; }, set: function (obj, value) { obj.lastRetryAt = value; } }, metadata: _metadata }, _lastRetryAt_initializers, _lastRetryAt_extraInitializers);
        __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: function (obj) { return "sentAt" in obj; }, get: function (obj) { return obj.sentAt; }, set: function (obj, value) { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
        __esDecorate(null, null, _queuedAt_decorators, { kind: "field", name: "queuedAt", static: false, private: false, access: { has: function (obj) { return "queuedAt" in obj; }, get: function (obj) { return obj.queuedAt; }, set: function (obj, value) { obj.queuedAt = value; } }, metadata: _metadata }, _queuedAt_initializers, _queuedAt_extraInitializers);
        __esDecorate(null, null, _deliveredAt_decorators, { kind: "field", name: "deliveredAt", static: false, private: false, access: { has: function (obj) { return "deliveredAt" in obj; }, get: function (obj) { return obj.deliveredAt; }, set: function (obj, value) { obj.deliveredAt = value; } }, metadata: _metadata }, _deliveredAt_initializers, _deliveredAt_extraInitializers);
        __esDecorate(null, null, _readAt_decorators, { kind: "field", name: "readAt", static: false, private: false, access: { has: function (obj) { return "readAt" in obj; }, get: function (obj) { return obj.readAt; }, set: function (obj, value) { obj.readAt = value; } }, metadata: _metadata }, _readAt_initializers, _readAt_extraInitializers);
        __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
        __esDecorate(null, null, _locationData_decorators, { kind: "field", name: "locationData", static: false, private: false, access: { has: function (obj) { return "locationData" in obj; }, get: function (obj) { return obj.locationData; }, set: function (obj, value) { obj.locationData = value; } }, metadata: _metadata }, _locationData_initializers, _locationData_extraInitializers);
        __esDecorate(null, null, _contactData_decorators, { kind: "field", name: "contactData", static: false, private: false, access: { has: function (obj) { return "contactData" in obj; }, get: function (obj) { return obj.contactData; }, set: function (obj, value) { obj.contactData = value; } }, metadata: _metadata }, _contactData_initializers, _contactData_extraInitializers);
        __esDecorate(null, null, _interactiveData_decorators, { kind: "field", name: "interactiveData", static: false, private: false, access: { has: function (obj) { return "interactiveData" in obj; }, get: function (obj) { return obj.interactiveData; }, set: function (obj, value) { obj.interactiveData = value; } }, metadata: _metadata }, _interactiveData_initializers, _interactiveData_extraInitializers);
        __esDecorate(null, null, _isScheduled_decorators, { kind: "field", name: "isScheduled", static: false, private: false, access: { has: function (obj) { return "isScheduled" in obj; }, get: function (obj) { return obj.isScheduled; }, set: function (obj, value) { obj.isScheduled = value; } }, metadata: _metadata }, _isScheduled_initializers, _isScheduled_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _isTemplate_decorators, { kind: "field", name: "isTemplate", static: false, private: false, access: { has: function (obj) { return "isTemplate" in obj; }, get: function (obj) { return obj.isTemplate; }, set: function (obj, value) { obj.isTemplate = value; } }, metadata: _metadata }, _isTemplate_initializers, _isTemplate_extraInitializers);
        __esDecorate(null, null, _requiresUserReply_decorators, { kind: "field", name: "requiresUserReply", static: false, private: false, access: { has: function (obj) { return "requiresUserReply" in obj; }, get: function (obj) { return obj.requiresUserReply; }, set: function (obj, value) { obj.requiresUserReply = value; } }, metadata: _metadata }, _requiresUserReply_initializers, _requiresUserReply_extraInitializers);
        __esDecorate(null, null, _replyTimeoutHours_decorators, { kind: "field", name: "replyTimeoutHours", static: false, private: false, access: { has: function (obj) { return "replyTimeoutHours" in obj; }, get: function (obj) { return obj.replyTimeoutHours; }, set: function (obj, value) { obj.replyTimeoutHours = value; } }, metadata: _metadata }, _replyTimeoutHours_initializers, _replyTimeoutHours_extraInitializers);
        __esDecorate(null, null, _replyDeadline_decorators, { kind: "field", name: "replyDeadline", static: false, private: false, access: { has: function (obj) { return "replyDeadline" in obj; }, get: function (obj) { return obj.replyDeadline; }, set: function (obj, value) { obj.replyDeadline = value; } }, metadata: _metadata }, _replyDeadline_initializers, _replyDeadline_extraInitializers);
        __esDecorate(null, null, _isAutomatedReply_decorators, { kind: "field", name: "isAutomatedReply", static: false, private: false, access: { has: function (obj) { return "isAutomatedReply" in obj; }, get: function (obj) { return obj.isAutomatedReply; }, set: function (obj, value) { obj.isAutomatedReply = value; } }, metadata: _metadata }, _isAutomatedReply_initializers, _isAutomatedReply_extraInitializers);
        __esDecorate(null, null, _automationTriggerId_decorators, { kind: "field", name: "automationTriggerId", static: false, private: false, access: { has: function (obj) { return "automationTriggerId" in obj; }, get: function (obj) { return obj.automationTriggerId; }, set: function (obj, value) { obj.automationTriggerId = value; } }, metadata: _metadata }, _automationTriggerId_initializers, _automationTriggerId_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WhatsAppMessage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WhatsAppMessage = _classThis;
}();
exports.WhatsAppMessage = WhatsAppMessage;
//# sourceMappingURL=whatsapp-message.entity.js.map