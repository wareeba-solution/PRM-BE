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
exports.MessageAttachment = exports.AttachmentType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/entities/message-attachment.entity.ts
var typeorm_1 = require("typeorm");
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["IMAGE"] = "image";
    AttachmentType["DOCUMENT"] = "document";
    AttachmentType["AUDIO"] = "audio";
    AttachmentType["VIDEO"] = "video";
    AttachmentType["OTHER"] = "other";
})(AttachmentType || (exports.AttachmentType = AttachmentType = {}));
var MessageAttachment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('message_attachments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _mimeType_decorators;
    var _mimeType_initializers = [];
    var _mimeType_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _filePath_decorators;
    var _filePath_initializers = [];
    var _filePath_extraInitializers = [];
    var _publicUrl_decorators;
    var _publicUrl_initializers = [];
    var _publicUrl_extraInitializers = [];
    var _isUploaded_decorators;
    var _isUploaded_initializers = [];
    var _isUploaded_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _messageId_decorators;
    var _messageId_initializers = [];
    var _messageId_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var MessageAttachment = _classThis = /** @class */ (function () {
        function MessageAttachment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.fileName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
            this.fileSize = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
            this.mimeType = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
            this.type = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.filePath = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
            this.publicUrl = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _publicUrl_initializers, void 0));
            this.isUploaded = (__runInitializers(this, _publicUrl_extraInitializers), __runInitializers(this, _isUploaded_initializers, void 0));
            this.message = (__runInitializers(this, _isUploaded_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.messageId = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
            this.metadata = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        MessageAttachment_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, fileName: { required: true, type: function () { return String; } }, fileSize: { required: true, type: function () { return Number; } }, mimeType: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./message-attachment.entity").AttachmentType }, filePath: { required: true, type: function () { return String; } }, publicUrl: { required: true, type: function () { return String; } }, isUploaded: { required: true, type: function () { return Boolean; } }, message: { required: true, type: function () { return require("./message.entity").Message; } }, messageId: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return MessageAttachment_1;
    }());
    __setFunctionName(_classThis, "MessageAttachment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _fileName_decorators = [(0, typeorm_1.Column)()];
        _fileSize_decorators = [(0, typeorm_1.Column)()];
        _mimeType_decorators = [(0, typeorm_1.Column)()];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AttachmentType,
                default: AttachmentType.OTHER
            })];
        _filePath_decorators = [(0, typeorm_1.Column)()];
        _publicUrl_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _isUploaded_decorators = [(0, typeorm_1.Column)({ default: false })];
        _message_decorators = [(0, typeorm_1.ManyToOne)('Message', {
                onDelete: 'CASCADE'
            }), (0, typeorm_1.JoinColumn)({ name: 'message_id' })];
        _messageId_decorators = [(0, typeorm_1.Column)({ name: 'message_id' })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
        __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
        __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: function (obj) { return "mimeType" in obj; }, get: function (obj) { return obj.mimeType; }, set: function (obj, value) { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: function (obj) { return "filePath" in obj; }, get: function (obj) { return obj.filePath; }, set: function (obj, value) { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
        __esDecorate(null, null, _publicUrl_decorators, { kind: "field", name: "publicUrl", static: false, private: false, access: { has: function (obj) { return "publicUrl" in obj; }, get: function (obj) { return obj.publicUrl; }, set: function (obj, value) { obj.publicUrl = value; } }, metadata: _metadata }, _publicUrl_initializers, _publicUrl_extraInitializers);
        __esDecorate(null, null, _isUploaded_decorators, { kind: "field", name: "isUploaded", static: false, private: false, access: { has: function (obj) { return "isUploaded" in obj; }, get: function (obj) { return obj.isUploaded; }, set: function (obj, value) { obj.isUploaded = value; } }, metadata: _metadata }, _isUploaded_initializers, _isUploaded_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: function (obj) { return "messageId" in obj; }, get: function (obj) { return obj.messageId; }, set: function (obj, value) { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageAttachment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageAttachment = _classThis;
}();
exports.MessageAttachment = MessageAttachment;
//# sourceMappingURL=message-attachment.entity.js.map