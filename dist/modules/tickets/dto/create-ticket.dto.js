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
exports.CreateTicketDto = exports.TicketAttachment = exports.TicketSource = exports.TicketStatus = exports.TicketPriority = exports.TicketType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/tickets/dto/create-ticket.dto.ts
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var TicketType;
(function (TicketType) {
    TicketType["GENERAL"] = "GENERAL";
    TicketType["TECHNICAL"] = "TECHNICAL";
    TicketType["BILLING"] = "BILLING";
    TicketType["MEDICAL"] = "MEDICAL";
    TicketType["APPOINTMENT"] = "APPOINTMENT";
    TicketType["ACCESS"] = "ACCESS";
    TicketType["COMPLAINT"] = "COMPLAINT";
    TicketType["FEEDBACK"] = "FEEDBACK";
})(TicketType || (exports.TicketType = TicketType = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "LOW";
    TicketPriority["NORMAL"] = "NORMAL";
    TicketPriority["HIGH"] = "HIGH";
    TicketPriority["URGENT"] = "URGENT";
})(TicketPriority || (exports.TicketPriority = TicketPriority = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["PENDING"] = "PENDING";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
    TicketStatus["ESCALATED"] = "ESCALATED";
    TicketStatus["REOPENED"] = "REOPENED";
    TicketStatus["DELETED"] = "DELETED";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var TicketSource;
(function (TicketSource) {
    TicketSource["WEB"] = "WEB";
    TicketSource["MOBILE"] = "MOBILE";
    TicketSource["EMAIL"] = "EMAIL";
    TicketSource["PHONE"] = "PHONE";
    TicketSource["CHAT"] = "CHAT";
    TicketSource["SYSTEM"] = "SYSTEM";
})(TicketSource || (exports.TicketSource = TicketSource = {}));
var TicketAttachment = function () {
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
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TicketAttachment() {
                this.fileName = __runInitializers(this, _fileName_initializers, void 0);
                this.fileType = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
                this.fileUrl = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0));
                this.fileSize = (__runInitializers(this, _fileUrl_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
                this.description = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                __runInitializers(this, _description_extraInitializers);
            }
            TicketAttachment._OPENAPI_METADATA_FACTORY = function () {
                return { fileName: { required: true, type: function () { return String; }, maxLength: 255 }, fileType: { required: true, type: function () { return String; }, maxLength: 50 }, fileUrl: { required: true, type: function () { return String; } }, fileSize: { required: false, type: function () { return String; } }, description: { required: false, type: function () { return String; }, maxLength: 500 } };
            };
            return TicketAttachment;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fileName_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _fileType_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _fileUrl_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _fileSize_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: function (obj) { return "fileType" in obj; }, get: function (obj) { return obj.fileType; }, set: function (obj, value) { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: function (obj) { return "fileUrl" in obj; }, get: function (obj) { return obj.fileUrl; }, set: function (obj, value) { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TicketAttachment = TicketAttachment;
var CreateTicketDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _source_decorators;
    var _source_initializers = [];
    var _source_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _assigneeId_decorators;
    var _assigneeId_initializers = [];
    var _assigneeId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _subCategory_decorators;
    var _subCategory_initializers = [];
    var _subCategory_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _referenceNumber_decorators;
    var _referenceNumber_initializers = [];
    var _referenceNumber_extraInitializers = [];
    var _relatedTicketId_decorators;
    var _relatedTicketId_initializers = [];
    var _relatedTicketId_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _isPrivate_decorators;
    var _isPrivate_initializers = [];
    var _isPrivate_extraInitializers = [];
    var _internalNotes_decorators;
    var _internalNotes_initializers = [];
    var _internalNotes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateTicketDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.type = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.priority = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _priority_initializers, TicketPriority.NORMAL));
                this.source = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _source_initializers, TicketSource.WEB));
                this.contactId = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
                this.departmentId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _departmentId_initializers, void 0));
                this.assigneeId = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _assigneeId_initializers, void 0));
                this.category = (__runInitializers(this, _assigneeId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.subCategory = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _subCategory_initializers, void 0));
                this.attachments = (__runInitializers(this, _subCategory_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                this.tags = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.referenceNumber = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _referenceNumber_initializers, void 0));
                this.relatedTicketId = (__runInitializers(this, _referenceNumber_extraInitializers), __runInitializers(this, _relatedTicketId_initializers, void 0));
                this.customFields = (__runInitializers(this, _relatedTicketId_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
                this.isPrivate = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
                this.internalNotes = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _internalNotes_initializers, void 0));
                __runInitializers(this, _internalNotes_extraInitializers);
            }
            CreateTicketDto._OPENAPI_METADATA_FACTORY = function () {
                return { title: { required: true, type: function () { return String; }, minLength: 5, maxLength: 200 }, description: { required: true, type: function () { return String; }, minLength: 10, maxLength: 5000 }, type: { required: true, enum: require("./create-ticket.dto").TicketType }, priority: { required: false, default: TicketPriority.NORMAL, enum: require("./create-ticket.dto").TicketPriority }, source: { required: false, default: TicketSource.WEB, enum: require("./create-ticket.dto").TicketSource }, contactId: { required: false, type: function () { return String; }, format: "uuid" }, departmentId: { required: false, type: function () { return String; }, format: "uuid" }, assigneeId: { required: false, type: function () { return String; }, format: "uuid" }, category: { required: false, type: function () { return String; }, maxLength: 100 }, subCategory: { required: false, type: function () { return String; }, maxLength: 100 }, attachments: { required: false, type: function () { return [require("./create-ticket.dto").TicketAttachment]; } }, tags: { required: false, type: function () { return [String]; } }, referenceNumber: { required: false, type: function () { return String; }, maxLength: 100 }, relatedTicketId: { required: false, type: function () { return String; }, format: "uuid" }, isPrivate: { required: false, type: function () { return Boolean; } }, internalNotes: { required: false, type: function () { return String; }, maxLength: 1000 } };
            };
            return CreateTicketDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(5), (0, class_validator_1.MaxLength)(200)];
            _description_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10), (0, class_validator_1.MaxLength)(5000)];
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: TicketType }), (0, class_validator_1.IsEnum)(TicketType)];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: TicketPriority }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(TicketPriority)];
            _source_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: TicketSource }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(TicketSource)];
            _contactId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _departmentId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _assigneeId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _subCategory_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _attachments_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [TicketAttachment] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return TicketAttachment; })];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _referenceNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _relatedTicketId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _customFields_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _isPrivate_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _internalNotes_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
            __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
            __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
            __esDecorate(null, null, _assigneeId_decorators, { kind: "field", name: "assigneeId", static: false, private: false, access: { has: function (obj) { return "assigneeId" in obj; }, get: function (obj) { return obj.assigneeId; }, set: function (obj, value) { obj.assigneeId = value; } }, metadata: _metadata }, _assigneeId_initializers, _assigneeId_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _subCategory_decorators, { kind: "field", name: "subCategory", static: false, private: false, access: { has: function (obj) { return "subCategory" in obj; }, get: function (obj) { return obj.subCategory; }, set: function (obj, value) { obj.subCategory = value; } }, metadata: _metadata }, _subCategory_initializers, _subCategory_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _referenceNumber_decorators, { kind: "field", name: "referenceNumber", static: false, private: false, access: { has: function (obj) { return "referenceNumber" in obj; }, get: function (obj) { return obj.referenceNumber; }, set: function (obj, value) { obj.referenceNumber = value; } }, metadata: _metadata }, _referenceNumber_initializers, _referenceNumber_extraInitializers);
            __esDecorate(null, null, _relatedTicketId_decorators, { kind: "field", name: "relatedTicketId", static: false, private: false, access: { has: function (obj) { return "relatedTicketId" in obj; }, get: function (obj) { return obj.relatedTicketId; }, set: function (obj, value) { obj.relatedTicketId = value; } }, metadata: _metadata }, _relatedTicketId_initializers, _relatedTicketId_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: function (obj) { return "isPrivate" in obj; }, get: function (obj) { return obj.isPrivate; }, set: function (obj, value) { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
            __esDecorate(null, null, _internalNotes_decorators, { kind: "field", name: "internalNotes", static: false, private: false, access: { has: function (obj) { return "internalNotes" in obj; }, get: function (obj) { return obj.internalNotes; }, set: function (obj, value) { obj.internalNotes = value; } }, metadata: _metadata }, _internalNotes_initializers, _internalNotes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateTicketDto = CreateTicketDto;
//# sourceMappingURL=create-ticket.dto.js.map