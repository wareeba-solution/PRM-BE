"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.WhatsappLog = exports.WhatsappMediaType = exports.WhatsappMessageType = exports.WhatsappMessageStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/whatsapp/entities/whatsapp-log.entity.ts
var typeorm_1 = require("typeorm");
var whatsapp_template_entity_1 = require("./whatsapp-template.entity");
/**
 * WhatsApp message status enum
 */
var WhatsappMessageStatus;
(function (WhatsappMessageStatus) {
    WhatsappMessageStatus["QUEUED"] = "queued";
    WhatsappMessageStatus["SENDING"] = "sending";
    WhatsappMessageStatus["SENT"] = "sent";
    WhatsappMessageStatus["DELIVERED"] = "delivered";
    WhatsappMessageStatus["READ"] = "read";
    WhatsappMessageStatus["FAILED"] = "failed";
    WhatsappMessageStatus["REJECTED"] = "rejected";
    WhatsappMessageStatus["CANCELED"] = "canceled";
    WhatsappMessageStatus["EXPIRED"] = "expired";
})(WhatsappMessageStatus || (exports.WhatsappMessageStatus = WhatsappMessageStatus = {}));
/**
 * WhatsApp message type enum
 */
var WhatsappMessageType;
(function (WhatsappMessageType) {
    WhatsappMessageType["TEXT"] = "text";
    WhatsappMessageType["TEMPLATE"] = "template";
    WhatsappMessageType["IMAGE"] = "image";
    WhatsappMessageType["DOCUMENT"] = "document";
    WhatsappMessageType["AUDIO"] = "audio";
    WhatsappMessageType["VIDEO"] = "video";
    WhatsappMessageType["STICKER"] = "sticker";
    WhatsappMessageType["LOCATION"] = "location";
    WhatsappMessageType["CONTACT"] = "contact";
    WhatsappMessageType["INTERACTIVE"] = "interactive";
    WhatsappMessageType["REACTION"] = "reaction";
    WhatsappMessageType["BUTTON"] = "button";
})(WhatsappMessageType || (exports.WhatsappMessageType = WhatsappMessageType = {}));
/**
 * WhatsApp media type enum
 */
var WhatsappMediaType;
(function (WhatsappMediaType) {
    WhatsappMediaType["IMAGE"] = "image";
    WhatsappMediaType["DOCUMENT"] = "document";
    WhatsappMediaType["AUDIO"] = "audio";
    WhatsappMediaType["VIDEO"] = "video";
    WhatsappMediaType["STICKER"] = "sticker";
})(WhatsappMediaType || (exports.WhatsappMediaType = WhatsappMediaType = {}));
/**
 * WhatsApp log entity
 */
var WhatsappLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('whatsapp_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _messageType_decorators;
    var _messageType_initializers = [];
    var _messageType_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _template_decorators;
    var _template_initializers = [];
    var _template_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _toName_decorators;
    var _toName_initializers = [];
    var _toName_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _messageId_decorators;
    var _messageId_initializers = [];
    var _messageId_extraInitializers = [];
    var _conversationId_decorators;
    var _conversationId_initializers = [];
    var _conversationId_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _components_decorators;
    var _components_initializers = [];
    var _components_extraInitializers = [];
    var _mediaData_decorators;
    var _mediaData_initializers = [];
    var _mediaData_extraInitializers = [];
    var _deliveryDetails_decorators;
    var _deliveryDetails_initializers = [];
    var _deliveryDetails_extraInitializers = [];
    var _recipientId_decorators;
    var _recipientId_initializers = [];
    var _recipientId_extraInitializers = [];
    var _senderId_decorators;
    var _senderId_initializers = [];
    var _senderId_extraInitializers = [];
    var _referenceId_decorators;
    var _referenceId_initializers = [];
    var _referenceId_extraInitializers = [];
    var _referenceType_decorators;
    var _referenceType_initializers = [];
    var _referenceType_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _isAutomated_decorators;
    var _isAutomated_initializers = [];
    var _isAutomated_extraInitializers = [];
    var _buttons_decorators;
    var _buttons_initializers = [];
    var _buttons_extraInitializers = [];
    var _contextInfo_decorators;
    var _contextInfo_initializers = [];
    var _contextInfo_extraInitializers = [];
    var _externalBusinessId_decorators;
    var _externalBusinessId_initializers = [];
    var _externalBusinessId_extraInitializers = [];
    var WhatsappLog = _classThis = /** @class */ (function () {
        function WhatsappLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.messageType = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _messageType_initializers, void 0));
            this.templateId = (__runInitializers(this, _messageType_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
            this.template = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            this.to = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            this.toName = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _toName_initializers, void 0));
            this.from = (__runInitializers(this, _toName_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.content = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.status = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.messageId = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
            this.conversationId = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _conversationId_initializers, void 0));
            this.metadata = (__runInitializers(this, _conversationId_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.variables = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
            this.components = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _components_initializers, void 0));
            this.mediaData = (__runInitializers(this, _components_extraInitializers), __runInitializers(this, _mediaData_initializers, void 0));
            this.deliveryDetails = (__runInitializers(this, _mediaData_extraInitializers), __runInitializers(this, _deliveryDetails_initializers, void 0));
            this.recipientId = (__runInitializers(this, _deliveryDetails_extraInitializers), __runInitializers(this, _recipientId_initializers, void 0));
            this.senderId = (__runInitializers(this, _recipientId_extraInitializers), __runInitializers(this, _senderId_initializers, void 0));
            this.referenceId = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _referenceId_initializers, void 0));
            this.referenceType = (__runInitializers(this, _referenceId_extraInitializers), __runInitializers(this, _referenceType_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _referenceType_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.createdById = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.isAutomated = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _isAutomated_initializers, void 0));
            this.buttons = (__runInitializers(this, _isAutomated_extraInitializers), __runInitializers(this, _buttons_initializers, void 0));
            this.contextInfo = (__runInitializers(this, _buttons_extraInitializers), __runInitializers(this, _contextInfo_initializers, void 0));
            this.externalBusinessId = (__runInitializers(this, _contextInfo_extraInitializers), __runInitializers(this, _externalBusinessId_initializers, void 0));
            __runInitializers(this, _externalBusinessId_extraInitializers);
        }
        /**
         * Checks if the message is in a final status
         */
        WhatsappLog_1.prototype.isInFinalStatus = function () {
            return [
                WhatsappMessageStatus.SENT,
                WhatsappMessageStatus.DELIVERED,
                WhatsappMessageStatus.READ,
                WhatsappMessageStatus.FAILED,
                WhatsappMessageStatus.REJECTED,
                WhatsappMessageStatus.CANCELED,
                WhatsappMessageStatus.EXPIRED
            ].includes(this.status);
        };
        /**
         * Checks if the message was successfully delivered
         */
        WhatsappLog_1.prototype.isSuccessful = function () {
            return [
                WhatsappMessageStatus.SENT,
                WhatsappMessageStatus.DELIVERED,
                WhatsappMessageStatus.READ
            ].includes(this.status);
        };
        /**
         * Updates the status of the WhatsApp message
         */
        WhatsappLog_1.prototype.updateStatus = function (status, details) {
            // Don't update if already in a final status and trying to move to an earlier status
            if (this.isInFinalStatus() &&
                status !== WhatsappMessageStatus.READ &&
                status !== WhatsappMessageStatus.DELIVERED) {
                return;
            }
            this.status = status;
            // Initialize delivery details if not present
            if (!this.deliveryDetails) {
                this.deliveryDetails = {};
            }
            // Update delivery details based on status and provided details
            if (details) {
                this.deliveryDetails = __assign(__assign({}, this.deliveryDetails), details);
            }
            // Set timestamp based on status
            if (status === WhatsappMessageStatus.SENDING) {
                this.deliveryDetails.lastAttemptAt = new Date();
                this.deliveryDetails.attemptCount = (this.deliveryDetails.attemptCount || 0) + 1;
            }
            else if (status === WhatsappMessageStatus.DELIVERED) {
                this.deliveryDetails.deliveredAt = new Date();
            }
            else if (status === WhatsappMessageStatus.READ) {
                this.deliveryDetails.readAt = new Date();
            }
        };
        /**
         * Get formatted content for display or logs
         */
        WhatsappLog_1.prototype.getFormattedContent = function () {
            var _a;
            if (this.messageType === WhatsappMessageType.TEXT) {
                return this.content || '';
            }
            else if (this.messageType === WhatsappMessageType.TEMPLATE) {
                var templateName = ((_a = this.template) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown Template';
                return "Template: ".concat(templateName);
            }
            else if (this.mediaData) {
                var caption = this.mediaData.caption ? " - ".concat(this.mediaData.caption) : '';
                return "".concat(this.mediaData.type).concat(caption);
            }
            return "".concat(this.messageType, " message");
        };
        /**
         * Get the cost of the message if available
         */
        WhatsappLog_1.prototype.getCost = function () {
            var _a, _b, _c;
            if (((_a = this.deliveryDetails) === null || _a === void 0 ? void 0 : _a.cost) && ((_b = this.deliveryDetails) === null || _b === void 0 ? void 0 : _b.currency)) {
                return {
                    amount: this.deliveryDetails.cost,
                    currency: this.deliveryDetails.currency
                };
            }
            else if ((_c = this.deliveryDetails) === null || _c === void 0 ? void 0 : _c.pricing) {
                return {
                    amount: this.deliveryDetails.pricing.cost,
                    currency: this.deliveryDetails.pricing.currency
                };
            }
            return null;
        };
        WhatsappLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, messageType: { required: true, enum: require("./whatsapp-log.entity").WhatsappMessageType }, templateId: { required: false, type: function () { return String; } }, template: { required: false, type: function () { return require("./whatsapp-template.entity").WhatsappTemplate; } }, to: { required: true, type: function () { return String; } }, toName: { required: false, type: function () { return String; } }, from: { required: true, type: function () { return String; } }, content: { required: false, type: function () { return String; } }, status: { required: true, enum: require("./whatsapp-log.entity").WhatsappMessageStatus }, messageId: { required: false, type: function () { return String; } }, conversationId: { required: false, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } }, variables: { required: false, type: function () { return Object; } }, components: { required: false }, mediaData: { required: false, type: function () { return ({ type: { required: true, enum: require("./whatsapp-log.entity").WhatsappMediaType }, id: { required: false, type: function () { return String; } }, url: { required: false, type: function () { return String; } }, caption: { required: false, type: function () { return String; } }, filename: { required: false, type: function () { return String; } }, mimeType: { required: false, type: function () { return String; } }, size: { required: false, type: function () { return Number; } } }); } }, deliveryDetails: { required: false, type: function () { return ({ provider: { required: false, type: function () { return String; } }, attemptCount: { required: false, type: function () { return Number; } }, lastAttemptAt: { required: false, type: function () { return Date; } }, deliveredAt: { required: false, type: function () { return Date; } }, readAt: { required: false, type: function () { return Date; } }, error: { required: false, type: function () { return String; } }, errorCode: { required: false, type: function () { return String; } }, errorDetails: { required: false, type: function () { return Object; } }, receivedAt: { required: false, type: function () { return Date; } }, cost: { required: false, type: function () { return Number; } }, currency: { required: false, type: function () { return String; } }, wamid: { required: false, type: function () { return String; } }, phoneType: { required: false, type: function () { return String; } }, phoneModel: { required: false, type: function () { return String; } }, pricing: { required: false, type: function () { return ({ pricing_model: { required: true, type: function () { return String; } }, category: { required: true, type: function () { return String; } }, cost: { required: true, type: function () { return Number; } }, currency: { required: true, type: function () { return String; } } }); } } }); } }, recipientId: { required: false, type: function () { return String; } }, senderId: { required: false, type: function () { return String; } }, referenceId: { required: false, type: function () { return String; } }, referenceType: { required: false, type: function () { return String; } }, scheduledFor: { required: false, type: function () { return Date; } }, createdById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, isAutomated: { required: true, type: function () { return Boolean; } }, buttons: { required: false }, contextInfo: { required: false, type: function () { return ({ messageId: { required: false, type: function () { return String; } }, forwarded: { required: false, type: function () { return Boolean; } }, frequentlyForwarded: { required: false, type: function () { return Boolean; } }, fromGroup: { required: false, type: function () { return Boolean; } }, groupId: { required: false, type: function () { return String; } }, groupName: { required: false, type: function () { return String; } }, quotedMessageId: { required: false, type: function () { return String; } }, quotedMessageText: { required: false, type: function () { return String; } }, quotedMessageSender: { required: false, type: function () { return String; } }, mentionedContacts: { required: false, type: function () { return [String]; } } }); } }, externalBusinessId: { required: false, type: function () { return String; } } };
        };
        return WhatsappLog_1;
    }());
    __setFunctionName(_classThis, "WhatsappLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _messageType_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: WhatsappMessageType }), (0, typeorm_1.Index)()];
        _templateId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _template_decorators = [(0, typeorm_1.ManyToOne)(function () { return whatsapp_template_entity_1.WhatsappTemplate; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'templateId' })];
        _to_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _toName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _from_decorators = [(0, typeorm_1.Column)()];
        _content_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'text' })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: WhatsappMessageStatus, default: WhatsappMessageStatus.QUEUED }), (0, typeorm_1.Index)()];
        _messageId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _conversationId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _metadata_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _variables_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _components_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _mediaData_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _deliveryDetails_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _recipientId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _senderId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _referenceId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _referenceType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _isAutomated_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'boolean', default: false })];
        _buttons_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _contextInfo_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _externalBusinessId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _messageType_decorators, { kind: "field", name: "messageType", static: false, private: false, access: { has: function (obj) { return "messageType" in obj; }, get: function (obj) { return obj.messageType; }, set: function (obj, value) { obj.messageType = value; } }, metadata: _metadata }, _messageType_initializers, _messageType_extraInitializers);
        __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: function (obj) { return "template" in obj; }, get: function (obj) { return obj.template; }, set: function (obj, value) { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, null, _toName_decorators, { kind: "field", name: "toName", static: false, private: false, access: { has: function (obj) { return "toName" in obj; }, get: function (obj) { return obj.toName; }, set: function (obj, value) { obj.toName = value; } }, metadata: _metadata }, _toName_initializers, _toName_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: function (obj) { return "messageId" in obj; }, get: function (obj) { return obj.messageId; }, set: function (obj, value) { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
        __esDecorate(null, null, _conversationId_decorators, { kind: "field", name: "conversationId", static: false, private: false, access: { has: function (obj) { return "conversationId" in obj; }, get: function (obj) { return obj.conversationId; }, set: function (obj, value) { obj.conversationId = value; } }, metadata: _metadata }, _conversationId_initializers, _conversationId_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
        __esDecorate(null, null, _components_decorators, { kind: "field", name: "components", static: false, private: false, access: { has: function (obj) { return "components" in obj; }, get: function (obj) { return obj.components; }, set: function (obj, value) { obj.components = value; } }, metadata: _metadata }, _components_initializers, _components_extraInitializers);
        __esDecorate(null, null, _mediaData_decorators, { kind: "field", name: "mediaData", static: false, private: false, access: { has: function (obj) { return "mediaData" in obj; }, get: function (obj) { return obj.mediaData; }, set: function (obj, value) { obj.mediaData = value; } }, metadata: _metadata }, _mediaData_initializers, _mediaData_extraInitializers);
        __esDecorate(null, null, _deliveryDetails_decorators, { kind: "field", name: "deliveryDetails", static: false, private: false, access: { has: function (obj) { return "deliveryDetails" in obj; }, get: function (obj) { return obj.deliveryDetails; }, set: function (obj, value) { obj.deliveryDetails = value; } }, metadata: _metadata }, _deliveryDetails_initializers, _deliveryDetails_extraInitializers);
        __esDecorate(null, null, _recipientId_decorators, { kind: "field", name: "recipientId", static: false, private: false, access: { has: function (obj) { return "recipientId" in obj; }, get: function (obj) { return obj.recipientId; }, set: function (obj, value) { obj.recipientId = value; } }, metadata: _metadata }, _recipientId_initializers, _recipientId_extraInitializers);
        __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: function (obj) { return "senderId" in obj; }, get: function (obj) { return obj.senderId; }, set: function (obj, value) { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
        __esDecorate(null, null, _referenceId_decorators, { kind: "field", name: "referenceId", static: false, private: false, access: { has: function (obj) { return "referenceId" in obj; }, get: function (obj) { return obj.referenceId; }, set: function (obj, value) { obj.referenceId = value; } }, metadata: _metadata }, _referenceId_initializers, _referenceId_extraInitializers);
        __esDecorate(null, null, _referenceType_decorators, { kind: "field", name: "referenceType", static: false, private: false, access: { has: function (obj) { return "referenceType" in obj; }, get: function (obj) { return obj.referenceType; }, set: function (obj, value) { obj.referenceType = value; } }, metadata: _metadata }, _referenceType_initializers, _referenceType_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _isAutomated_decorators, { kind: "field", name: "isAutomated", static: false, private: false, access: { has: function (obj) { return "isAutomated" in obj; }, get: function (obj) { return obj.isAutomated; }, set: function (obj, value) { obj.isAutomated = value; } }, metadata: _metadata }, _isAutomated_initializers, _isAutomated_extraInitializers);
        __esDecorate(null, null, _buttons_decorators, { kind: "field", name: "buttons", static: false, private: false, access: { has: function (obj) { return "buttons" in obj; }, get: function (obj) { return obj.buttons; }, set: function (obj, value) { obj.buttons = value; } }, metadata: _metadata }, _buttons_initializers, _buttons_extraInitializers);
        __esDecorate(null, null, _contextInfo_decorators, { kind: "field", name: "contextInfo", static: false, private: false, access: { has: function (obj) { return "contextInfo" in obj; }, get: function (obj) { return obj.contextInfo; }, set: function (obj, value) { obj.contextInfo = value; } }, metadata: _metadata }, _contextInfo_initializers, _contextInfo_extraInitializers);
        __esDecorate(null, null, _externalBusinessId_decorators, { kind: "field", name: "externalBusinessId", static: false, private: false, access: { has: function (obj) { return "externalBusinessId" in obj; }, get: function (obj) { return obj.externalBusinessId; }, set: function (obj, value) { obj.externalBusinessId = value; } }, metadata: _metadata }, _externalBusinessId_initializers, _externalBusinessId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WhatsappLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WhatsappLog = _classThis;
}();
exports.WhatsappLog = WhatsappLog;
//# sourceMappingURL=whatsapp-log.entity.js.map