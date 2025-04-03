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
exports.SmsTemplate = exports.SmsTemplateType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/sms/entities/sms-template.entity.ts
var typeorm_1 = require("typeorm");
/**
 * SMS template types for different scenarios
 */
var SmsTemplateType;
(function (SmsTemplateType) {
    SmsTemplateType["APPOINTMENT_REMINDER"] = "appointment_reminder";
    SmsTemplateType["APPOINTMENT_CONFIRMATION"] = "appointment_confirmation";
    SmsTemplateType["APPOINTMENT_CANCELLATION"] = "appointment_cancellation";
    SmsTemplateType["APPOINTMENT_RESCHEDULED"] = "appointment_rescheduled";
    SmsTemplateType["APPOINTMENT_FOLLOWUP"] = "appointment_followup";
    SmsTemplateType["GENERAL_NOTIFICATION"] = "general_notification";
    SmsTemplateType["CUSTOM"] = "custom";
})(SmsTemplateType || (exports.SmsTemplateType = SmsTemplateType = {}));
var SmsTemplate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('sms_templates')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _sampleVariables_decorators;
    var _sampleVariables_initializers = [];
    var _sampleVariables_extraInitializers = [];
    var _maxLength_decorators;
    var _maxLength_initializers = [];
    var _maxLength_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var SmsTemplate = _classThis = /** @class */ (function () {
        function SmsTemplate_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.type = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.content = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.description = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.isDefault = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
            this.isActive = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.organizationId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.createdById = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            /**
             * Sample variables that can be used in this template
             * Stored as a JSON object { variableName: description }
             */
            this.sampleVariables = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _sampleVariables_initializers, void 0));
            /**
             * The maximum allowed length for SMS (for reference)
             */
            this.maxLength = (__runInitializers(this, _sampleVariables_extraInitializers), __runInitializers(this, _maxLength_initializers, void 0));
            /**
             * Optional metadata for additional properties
             */
            this.metadata = (__runInitializers(this, _maxLength_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            __runInitializers(this, _metadata_extraInitializers);
        }
        SmsTemplate_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./sms-template.entity").SmsTemplateType }, content: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, isDefault: { required: true, type: function () { return Boolean; } }, isActive: { required: true, type: function () { return Boolean; } }, organizationId: { required: true, type: function () { return String; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, sampleVariables: { required: true, type: function () { return Object; }, description: "Sample variables that can be used in this template\nStored as a JSON object { variableName: description }" }, maxLength: { required: true, type: function () { return Number; }, description: "The maximum allowed length for SMS (for reference)" }, metadata: { required: true, type: function () { return Object; }, description: "Optional metadata for additional properties" } };
        };
        return SmsTemplate_1;
    }());
    __setFunctionName(_classThis, "SmsTemplate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: SmsTemplateType,
                default: SmsTemplateType.CUSTOM
            })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _description_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 255 })];
        _isDefault_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _sampleVariables_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _maxLength_decorators = [(0, typeorm_1.Column)({ default: 160 })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _sampleVariables_decorators, { kind: "field", name: "sampleVariables", static: false, private: false, access: { has: function (obj) { return "sampleVariables" in obj; }, get: function (obj) { return obj.sampleVariables; }, set: function (obj, value) { obj.sampleVariables = value; } }, metadata: _metadata }, _sampleVariables_initializers, _sampleVariables_extraInitializers);
        __esDecorate(null, null, _maxLength_decorators, { kind: "field", name: "maxLength", static: false, private: false, access: { has: function (obj) { return "maxLength" in obj; }, get: function (obj) { return obj.maxLength; }, set: function (obj, value) { obj.maxLength = value; } }, metadata: _metadata }, _maxLength_initializers, _maxLength_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmsTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmsTemplate = _classThis;
}();
exports.SmsTemplate = SmsTemplate;
//# sourceMappingURL=sms-template.entity.js.map