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
exports.MessageTemplateDto = exports.TemplateVariablesDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/messages/dto/message-template.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var message_type_enum_1 = require("../enums/message-type.enum");
// This class represents variables that can be used in templates
var TemplateVariablesDto = function () {
    var _a;
    var _contact_decorators;
    var _contact_initializers = [];
    var _contact_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _custom_decorators;
    var _custom_initializers = [];
    var _custom_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TemplateVariablesDto() {
                this.contact = __runInitializers(this, _contact_initializers, void 0);
                this.organization = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
                this.custom = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _custom_initializers, void 0));
                __runInitializers(this, _custom_extraInitializers);
            }
            TemplateVariablesDto._OPENAPI_METADATA_FACTORY = function () {
                return { contact: { required: false, type: function () { return Object; } }, organization: { required: false, type: function () { return Object; } }, custom: { required: false, type: function () { return Object; } } };
            };
            return TemplateVariablesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _contact_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Contact variables' }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _organization_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Organization variables' }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _custom_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom variables' }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
            __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
            __esDecorate(null, null, _custom_decorators, { kind: "field", name: "custom", static: false, private: false, access: { has: function (obj) { return "custom" in obj; }, get: function (obj) { return obj.custom; }, set: function (obj, value) { obj.custom = value; } }, metadata: _metadata }, _custom_initializers, _custom_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TemplateVariablesDto = TemplateVariablesDto;
var MessageTemplateDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MessageTemplateDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.type = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.subject = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
                this.content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.variables = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
                this.isDefault = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
                this.category = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                // These fields will be set by the service
                this.organizationId = __runInitializers(this, _category_extraInitializers);
            }
            MessageTemplateDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; } }, description: { required: false, type: function () { return String; } }, type: { required: true, enum: require("../enums/message-type.enum").MessageType }, subject: { required: false, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, variables: { required: false, type: function () { return require("./message-template.dto").TemplateVariablesDto; } }, isDefault: { required: false, type: function () { return Boolean; } }, category: { required: false, type: function () { return String; } }, organizationId: { required: false, type: function () { return String; } }, createdBy: { required: false, type: function () { return String; } } };
            };
            return MessageTemplateDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template name' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template description' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Message type', enum: message_type_enum_1.MessageType }), (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType)];
            _subject_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template subject (for email)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Template content' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _variables_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Template variables' }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return TemplateVariablesDto; }), (0, class_validator_1.IsOptional)()];
            _isDefault_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Is this a default template?' }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category or tag for the template' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
            __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageTemplateDto = MessageTemplateDto;
//# sourceMappingURL=message-template.dto.js.map