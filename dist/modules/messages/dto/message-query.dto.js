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
exports.MessageQueryDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/dto/message-query.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var message_status_enum_1 = require("../enums/message-status.enum");
var message_type_enum_1 = require("../enums/message-type.enum");
var MessageQueryDto = function () {
    var _a;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _senderId_decorators;
    var _senderId_initializers = [];
    var _senderId_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _isRead_decorators;
    var _isRead_initializers = [];
    var _isRead_extraInitializers = [];
    var _fromDate_decorators;
    var _fromDate_initializers = [];
    var _fromDate_extraInitializers = [];
    var _toDate_decorators;
    var _toDate_initializers = [];
    var _toDate_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MessageQueryDto() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.startDate = __runInitializers(this, _status_extraInitializers);
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.contactId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
                this.senderId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _senderId_initializers, void 0));
                this.search = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.isRead = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _isRead_initializers, void 0));
                this.fromDate = (__runInitializers(this, _isRead_extraInitializers), __runInitializers(this, _fromDate_initializers, void 0));
                this.toDate = (__runInitializers(this, _fromDate_extraInitializers), __runInitializers(this, _toDate_initializers, void 0));
                this.page = (__runInitializers(this, _toDate_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                // This is for internal use only, not exposed in API docs
                this.organizationId = __runInitializers(this, _limit_extraInitializers);
            }
            MessageQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { status: { required: false, enum: require("../enums/message-status.enum").MessageStatus }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, type: { required: false, enum: require("../enums/message-type.enum").MessageType }, contactId: { required: false, type: function () { return String; }, format: "uuid" }, senderId: { required: false, type: function () { return String; }, format: "uuid" }, search: { required: false, type: function () { return String; } }, isRead: { required: false, type: function () { return Boolean; } }, fromDate: { required: false, type: function () { return Date; } }, toDate: { required: false, type: function () { return Date; } }, page: { required: false, type: function () { return Number; }, default: 1, minimum: 1 }, limit: { required: false, type: function () { return Number; }, default: 10, minimum: 1, maximum: 100 }, organizationId: { required: false, type: function () { return String; } } };
            };
            return MessageQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by message status' }), (0, class_validator_1.IsEnum)(message_status_enum_1.MessageStatus, { each: true }), (0, class_validator_1.IsOptional)()];
            _type_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by message type' }), (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType, { each: true }), (0, class_validator_1.IsOptional)()];
            _contactId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by contact ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _senderId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by sender ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Search messages by content' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isRead_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by read status' }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _fromDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter messages from date', type: Date }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)(), (0, class_validator_1.IsOptional)()];
            _toDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter messages to date', type: Date }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)(), (0, class_validator_1.IsOptional)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number for pagination', default: 1 }), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.IsOptional)()];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Items per page for pagination', default: 10 }), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
            __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: function (obj) { return "senderId" in obj; }, get: function (obj) { return obj.senderId; }, set: function (obj, value) { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _isRead_decorators, { kind: "field", name: "isRead", static: false, private: false, access: { has: function (obj) { return "isRead" in obj; }, get: function (obj) { return obj.isRead; }, set: function (obj, value) { obj.isRead = value; } }, metadata: _metadata }, _isRead_initializers, _isRead_extraInitializers);
            __esDecorate(null, null, _fromDate_decorators, { kind: "field", name: "fromDate", static: false, private: false, access: { has: function (obj) { return "fromDate" in obj; }, get: function (obj) { return obj.fromDate; }, set: function (obj, value) { obj.fromDate = value; } }, metadata: _metadata }, _fromDate_initializers, _fromDate_extraInitializers);
            __esDecorate(null, null, _toDate_decorators, { kind: "field", name: "toDate", static: false, private: false, access: { has: function (obj) { return "toDate" in obj; }, get: function (obj) { return obj.toDate; }, set: function (obj, value) { obj.toDate = value; } }, metadata: _metadata }, _toDate_initializers, _toDate_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageQueryDto = MessageQueryDto;
//# sourceMappingURL=message-query.dto.js.map