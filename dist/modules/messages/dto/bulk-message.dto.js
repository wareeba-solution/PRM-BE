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
exports.BulkMessageDto = exports.AttachmentDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/dto/bulk-message.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var message_type_enum_1 = require("../enums/message-type.enum");
// Optionally define attachment info if your system supports attachments
var AttachmentDto = function () {
    var _a;
    var _filename_decorators;
    var _filename_initializers = [];
    var _filename_extraInitializers = [];
    var _contentType_decorators;
    var _contentType_initializers = [];
    var _contentType_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AttachmentDto() {
                this.filename = __runInitializers(this, _filename_initializers, void 0);
                this.contentType = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
                this.content = (__runInitializers(this, _contentType_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                __runInitializers(this, _content_extraInitializers);
            }
            AttachmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { filename: { required: true, type: function () { return String; } }, contentType: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } } };
            };
            return AttachmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _filename_decorators = [(0, swagger_1.ApiProperty)({ description: 'Attachment filename' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _contentType_decorators = [(0, swagger_1.ApiProperty)({ description: 'Attachment content type' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Attachment URL or content ID' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: function (obj) { return "filename" in obj; }, get: function (obj) { return obj.filename; }, set: function (obj, value) { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: function (obj) { return "contentType" in obj; }, get: function (obj) { return obj.contentType; }, set: function (obj, value) { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AttachmentDto = AttachmentDto;
var BulkMessageDto = function () {
    var _a;
    var _contactIds_decorators;
    var _contactIds_initializers = [];
    var _contactIds_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BulkMessageDto() {
                this.contactIds = __runInitializers(this, _contactIds_initializers, void 0);
                this.messageData = __runInitializers(this, _contactIds_extraInitializers);
                this.subject = __runInitializers(this, _subject_initializers, void 0);
                this.content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.templateId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
                this.variables = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
                this.attachments = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                this.scheduledFor = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
                // These fields will be set by the service
                this.organizationId = __runInitializers(this, _scheduledFor_extraInitializers);
            }
            BulkMessageDto._OPENAPI_METADATA_FACTORY = function () {
                return { contactIds: { required: true, type: function () { return [String]; }, format: "uuid" }, messageData: { required: true, type: function () { return require("./create-message.dto").CreateMessageDto; } }, subject: { required: false, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, type: { required: true, enum: require("../enums/message-type.enum").MessageType }, templateId: { required: false, type: function () { return String; }, format: "uuid" }, variables: { required: false, type: function () { return Object; } }, attachments: { required: false, type: function () { return [require("./bulk-message.dto").AttachmentDto]; } }, scheduledFor: { required: false, type: function () { return String; } }, organizationId: { required: false, type: function () { return String; } }, senderId: { required: false, type: function () { return String; } } };
            };
            return BulkMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _contactIds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Array of contact IDs to send messages to', type: [String] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _subject_decorators = [(0, swagger_1.ApiProperty)({ description: 'Message sender ID' }), (0, swagger_1.ApiProperty)({ description: 'Message subject (for email)', required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Message content body' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Type of message', enum: message_type_enum_1.MessageType }), (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType)];
            _templateId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Template ID to use', required: false }), (0, class_validator_1.IsUUID)('4'), (0, class_validator_1.IsOptional)()];
            _variables_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Template variables', required: false }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _attachments_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Message attachments', type: [AttachmentDto], required: false }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return AttachmentDto; }), (0, class_validator_1.IsOptional)()];
            _scheduledFor_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Schedule message for a later time', required: false }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _contactIds_decorators, { kind: "field", name: "contactIds", static: false, private: false, access: { has: function (obj) { return "contactIds" in obj; }, get: function (obj) { return obj.contactIds; }, set: function (obj, value) { obj.contactIds = value; } }, metadata: _metadata }, _contactIds_initializers, _contactIds_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
            __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BulkMessageDto = BulkMessageDto;
//# sourceMappingURL=bulk-message.dto.js.map