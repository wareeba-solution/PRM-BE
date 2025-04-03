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
exports.NotificationTemplate = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var NotificationTemplate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('notification_templates')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _channels_decorators;
    var _channels_initializers = [];
    var _channels_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _channelSpecificContent_decorators;
    var _channelSpecificContent_initializers = [];
    var _channelSpecificContent_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _lastUsedAt_decorators;
    var _lastUsedAt_initializers = [];
    var _lastUsedAt_extraInitializers = [];
    var _useCount_decorators;
    var _useCount_initializers = [];
    var _useCount_extraInitializers = [];
    var NotificationTemplate = _classThis = /** @class */ (function () {
        function NotificationTemplate_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.subject = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
            this.content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.metadata = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.channels = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _channels_initializers, void 0));
            this.isActive = (__runInitializers(this, _channels_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.organizationId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.variables = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
            this.channelSpecificContent = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _channelSpecificContent_initializers, void 0));
            this.createdAt = (__runInitializers(this, _channelSpecificContent_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.lastUsedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _lastUsedAt_initializers, void 0));
            this.useCount = (__runInitializers(this, _lastUsedAt_extraInitializers), __runInitializers(this, _useCount_initializers, void 0));
            __runInitializers(this, _useCount_extraInitializers);
        }
        NotificationTemplate_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, subject: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, channels: { required: true, type: function () { return [String]; } }, isActive: { required: true, type: function () { return Boolean; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, variables: { required: true }, channelSpecificContent: { required: true, type: function () { return ({ email: { required: false, type: function () { return ({ htmlTemplate: { required: false, type: function () { return String; } }, plainTextTemplate: { required: false, type: function () { return String; } } }); } }, sms: { required: false, type: function () { return ({ template: { required: true, type: function () { return String; } } }); } }, push: { required: false, type: function () { return ({ title: { required: true, type: function () { return String; } }, body: { required: true, type: function () { return String; } } }); } }, webhook: { required: false, type: function () { return ({ payload: { required: true, type: function () { return Object; } } }); } } }); } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, lastUsedAt: { required: true, type: function () { return Date; } }, useCount: { required: true, type: function () { return Number; } } };
        };
        return NotificationTemplate_1;
    }());
    __setFunctionName(_classThis, "NotificationTemplate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)()];
        _subject_decorators = [(0, typeorm_1.Column)()];
        _content_decorators = [(0, typeorm_1.Column)('text')];
        _metadata_decorators = [(0, typeorm_1.Column)('json', { nullable: true })];
        _channels_decorators = [(0, swagger_1.ApiProperty)({
                type: 'array',
                items: { type: 'string' },
                description: 'Supported notification channels'
            }), (0, typeorm_1.Column)('simple-array')];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid')];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _variables_decorators = [(0, swagger_1.ApiProperty)({
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        type: { type: 'string', enum: ['string', 'number', 'boolean', 'date'] },
                        required: { type: 'boolean' },
                        defaultValue: { type: 'string', nullable: true }
                    },
                    additionalProperties: false
                },
                nullable: true
            }), (0, typeorm_1.Column)('json', { nullable: true })];
        _channelSpecificContent_decorators = [(0, swagger_1.ApiProperty)({
                type: 'object',
                properties: {
                    email: {
                        type: 'object',
                        properties: {
                            htmlTemplate: { type: 'string' },
                            plainTextTemplate: { type: 'string' }
                        },
                        additionalProperties: true
                    },
                    sms: {
                        type: 'object',
                        properties: {
                            template: { type: 'string' }
                        },
                        additionalProperties: true
                    },
                    push: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            body: { type: 'string' }
                        },
                        additionalProperties: true
                    },
                    webhook: {
                        type: 'object',
                        properties: {
                            payload: {
                                type: 'object',
                                additionalProperties: true
                            }
                        },
                        additionalProperties: true
                    }
                },
                additionalProperties: true,
                nullable: true
            }), (0, typeorm_1.Column)('json', { nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _lastUsedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _useCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _channels_decorators, { kind: "field", name: "channels", static: false, private: false, access: { has: function (obj) { return "channels" in obj; }, get: function (obj) { return obj.channels; }, set: function (obj, value) { obj.channels = value; } }, metadata: _metadata }, _channels_initializers, _channels_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
        __esDecorate(null, null, _channelSpecificContent_decorators, { kind: "field", name: "channelSpecificContent", static: false, private: false, access: { has: function (obj) { return "channelSpecificContent" in obj; }, get: function (obj) { return obj.channelSpecificContent; }, set: function (obj, value) { obj.channelSpecificContent = value; } }, metadata: _metadata }, _channelSpecificContent_initializers, _channelSpecificContent_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _lastUsedAt_decorators, { kind: "field", name: "lastUsedAt", static: false, private: false, access: { has: function (obj) { return "lastUsedAt" in obj; }, get: function (obj) { return obj.lastUsedAt; }, set: function (obj, value) { obj.lastUsedAt = value; } }, metadata: _metadata }, _lastUsedAt_initializers, _lastUsedAt_extraInitializers);
        __esDecorate(null, null, _useCount_decorators, { kind: "field", name: "useCount", static: false, private: false, access: { has: function (obj) { return "useCount" in obj; }, get: function (obj) { return obj.useCount; }, set: function (obj, value) { obj.useCount = value; } }, metadata: _metadata }, _useCount_initializers, _useCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationTemplate = _classThis;
}();
exports.NotificationTemplate = NotificationTemplate;
//# sourceMappingURL=notification-template.entity.js.map