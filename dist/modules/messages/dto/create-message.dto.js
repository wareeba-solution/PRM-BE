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
exports.CreateMessageDto = exports.EmailOptions = exports.Attachment = exports.MessageStatus = exports.MessagePriority = exports.MessageType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/dto/create-message.dto.ts
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var MessageType;
(function (MessageType) {
    MessageType["SMS"] = "SMS";
    MessageType["EMAIL"] = "EMAIL";
    MessageType["WHATSAPP"] = "WHATSAPP";
    MessageType["INTERNAL_NOTE"] = "INTERNAL_NOTE";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessagePriority;
(function (MessagePriority) {
    MessagePriority["LOW"] = "LOW";
    MessagePriority["NORMAL"] = "NORMAL";
    MessagePriority["HIGH"] = "HIGH";
    MessagePriority["URGENT"] = "URGENT";
})(MessagePriority || (exports.MessagePriority = MessagePriority = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["DRAFT"] = "DRAFT";
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENDING"] = "SENDING";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["SCHEDULED"] = "SCHEDULED";
    MessageStatus["DELIVERING"] = "DELIVERING";
    MessageStatus["PENDING"] = "PENDING";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var Attachment = function () {
    var _a;
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileType_decorators;
    var _fileType_initializers = [];
    var _fileType_extraInitializers = [];
    var _fileUrl_decorators;
    var _fileUrl_initializers = [];
    var _fileUrl_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    return _a = /** @class */ (function () {
            function Attachment() {
                this.fileName = __runInitializers(this, _fileName_initializers, void 0);
                this.fileType = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
                this.fileUrl = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0));
                this.fileSize = (__runInitializers(this, _fileUrl_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
                __runInitializers(this, _fileSize_extraInitializers);
            }
            Attachment._OPENAPI_METADATA_FACTORY = function () {
                return { fileName: { required: true, type: function () { return String; } }, fileType: { required: true, type: function () { return String; } }, fileUrl: { required: true, type: function () { return String; } }, fileSize: { required: false, type: function () { return String; } } };
            };
            return Attachment;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fileName_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _fileType_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _fileUrl_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _fileSize_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: function (obj) { return "fileType" in obj; }, get: function (obj) { return obj.fileType; }, set: function (obj, value) { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: function (obj) { return "fileUrl" in obj; }, get: function (obj) { return obj.fileUrl; }, set: function (obj, value) { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.Attachment = Attachment;
var EmailOptions = function () {
    var _a;
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _cc_decorators;
    var _cc_initializers = [];
    var _cc_extraInitializers = [];
    var _bcc_decorators;
    var _bcc_initializers = [];
    var _bcc_extraInitializers = [];
    var _trackOpens_decorators;
    var _trackOpens_initializers = [];
    var _trackOpens_extraInitializers = [];
    var _trackClicks_decorators;
    var _trackClicks_initializers = [];
    var _trackClicks_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EmailOptions() {
                this.subject = __runInitializers(this, _subject_initializers, void 0);
                this.cc = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _cc_initializers, void 0));
                this.bcc = (__runInitializers(this, _cc_extraInitializers), __runInitializers(this, _bcc_initializers, void 0));
                this.trackOpens = (__runInitializers(this, _bcc_extraInitializers), __runInitializers(this, _trackOpens_initializers, void 0));
                this.trackClicks = (__runInitializers(this, _trackOpens_extraInitializers), __runInitializers(this, _trackClicks_initializers, void 0));
                __runInitializers(this, _trackClicks_extraInitializers);
            }
            EmailOptions._OPENAPI_METADATA_FACTORY = function () {
                return { subject: { required: true, type: function () { return String; } }, cc: { required: false, type: function () { return String; } }, bcc: { required: false, type: function () { return String; } }, trackOpens: { required: false, type: function () { return Boolean; } }, trackClicks: { required: false, type: function () { return Boolean; } } };
            };
            return EmailOptions;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subject_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _cc_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _bcc_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _trackOpens_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _trackClicks_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _cc_decorators, { kind: "field", name: "cc", static: false, private: false, access: { has: function (obj) { return "cc" in obj; }, get: function (obj) { return obj.cc; }, set: function (obj, value) { obj.cc = value; } }, metadata: _metadata }, _cc_initializers, _cc_extraInitializers);
            __esDecorate(null, null, _bcc_decorators, { kind: "field", name: "bcc", static: false, private: false, access: { has: function (obj) { return "bcc" in obj; }, get: function (obj) { return obj.bcc; }, set: function (obj, value) { obj.bcc = value; } }, metadata: _metadata }, _bcc_initializers, _bcc_extraInitializers);
            __esDecorate(null, null, _trackOpens_decorators, { kind: "field", name: "trackOpens", static: false, private: false, access: { has: function (obj) { return "trackOpens" in obj; }, get: function (obj) { return obj.trackOpens; }, set: function (obj, value) { obj.trackOpens = value; } }, metadata: _metadata }, _trackOpens_initializers, _trackOpens_extraInitializers);
            __esDecorate(null, null, _trackClicks_decorators, { kind: "field", name: "trackClicks", static: false, private: false, access: { has: function (obj) { return "trackClicks" in obj; }, get: function (obj) { return obj.trackClicks; }, set: function (obj, value) { obj.trackClicks = value; } }, metadata: _metadata }, _trackClicks_initializers, _trackClicks_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.EmailOptions = EmailOptions;
var CreateMessageDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _emailOptions_decorators;
    var _emailOptions_initializers = [];
    var _emailOptions_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _requireConfirmation_decorators;
    var _requireConfirmation_initializers = [];
    var _requireConfirmation_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _externalId_decorators;
    var _externalId_initializers = [];
    var _externalId_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateMessageDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.contactId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
                this.content = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.priority = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _priority_initializers, MessagePriority.NORMAL));
                this.status = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _status_initializers, MessageStatus.QUEUED));
                this.scheduledFor = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
                this.emailOptions = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _emailOptions_initializers, void 0));
                this.attachments = (__runInitializers(this, _emailOptions_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                this.templateId = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
                this.requireConfirmation = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _requireConfirmation_initializers, void 0));
                this.notes = (__runInitializers(this, _requireConfirmation_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.externalId = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _externalId_initializers, void 0));
                this.subject = (__runInitializers(this, _externalId_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
                this.metadata = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateMessageDto._OPENAPI_METADATA_FACTORY = function () {
                return { type: { required: true, enum: require("./create-message.dto").MessageType }, contactId: { required: true, type: function () { return String; }, format: "uuid" }, content: { required: true, type: function () { return String; }, maxLength: 5000 }, priority: { required: false, default: MessagePriority.NORMAL, enum: require("./create-message.dto").MessagePriority }, status: { required: false, default: MessageStatus.QUEUED, enum: require("./create-message.dto").MessageStatus }, scheduledFor: { required: false, type: function () { return String; } }, emailOptions: { required: false, type: function () { return require("./create-message.dto").EmailOptions; } }, attachments: { required: false, type: function () { return [require("./create-message.dto").Attachment]; } }, templateId: { required: false, type: function () { return String; } }, requireConfirmation: { required: false, type: function () { return Boolean; } }, notes: { required: false, type: function () { return String; }, maxLength: 500 }, externalId: { required: false, type: function () { return String; } }, subject: { required: false, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: MessageType }), (0, class_validator_1.IsEnum)(MessageType)];
            _contactId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsUUID)()];
            _content_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(5000)];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: MessagePriority }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(MessagePriority)];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: MessageStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(MessageStatus)];
            _scheduledFor_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsISO8601)()];
            _emailOptions_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return EmailOptions; })];
            _attachments_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [Attachment] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return Attachment; })];
            _templateId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _requireConfirmation_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _externalId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _subject_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            __esDecorate(null, null, _emailOptions_decorators, { kind: "field", name: "emailOptions", static: false, private: false, access: { has: function (obj) { return "emailOptions" in obj; }, get: function (obj) { return obj.emailOptions; }, set: function (obj, value) { obj.emailOptions = value; } }, metadata: _metadata }, _emailOptions_initializers, _emailOptions_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
            __esDecorate(null, null, _requireConfirmation_decorators, { kind: "field", name: "requireConfirmation", static: false, private: false, access: { has: function (obj) { return "requireConfirmation" in obj; }, get: function (obj) { return obj.requireConfirmation; }, set: function (obj, value) { obj.requireConfirmation = value; } }, metadata: _metadata }, _requireConfirmation_initializers, _requireConfirmation_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _externalId_decorators, { kind: "field", name: "externalId", static: false, private: false, access: { has: function (obj) { return "externalId" in obj; }, get: function (obj) { return obj.externalId; }, set: function (obj, value) { obj.externalId = value; } }, metadata: _metadata }, _externalId_initializers, _externalId_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map