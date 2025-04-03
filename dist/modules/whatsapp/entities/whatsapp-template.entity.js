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
exports.WhatsappTemplate = exports.WhatsappTemplateButtonType = exports.WhatsappTemplateHeaderType = exports.WhatsappTemplateComponentType = exports.WhatsappTemplateCategory = exports.WhatsappTemplateStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/whatsapp/entities/whatsapp-template.entity.ts
var typeorm_1 = require("typeorm");
var whatsapp_template_enums_1 = require("../enums/whatsapp-template.enums");
// Re-export the enums so they can be imported from this file
var whatsapp_template_enums_2 = require("../enums/whatsapp-template.enums");
Object.defineProperty(exports, "WhatsappTemplateStatus", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateStatus; } });
Object.defineProperty(exports, "WhatsappTemplateCategory", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateCategory; } });
Object.defineProperty(exports, "WhatsappTemplateComponentType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateComponentType; } });
Object.defineProperty(exports, "WhatsappTemplateHeaderType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateHeaderType; } });
Object.defineProperty(exports, "WhatsappTemplateButtonType", { enumerable: true, get: function () { return whatsapp_template_enums_2.WhatsappTemplateButtonType; } });
/**
 * Whatsapp template entity
 */
var WhatsappTemplate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('whatsapp_templates')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _language_decorators;
    var _language_initializers = [];
    var _language_extraInitializers = [];
    var _externalTemplateId_decorators;
    var _externalTemplateId_initializers = [];
    var _externalTemplateId_extraInitializers = [];
    var _components_decorators;
    var _components_initializers = [];
    var _components_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _submittedAt_decorators;
    var _submittedAt_initializers = [];
    var _submittedAt_extraInitializers = [];
    var _approvedAt_decorators;
    var _approvedAt_initializers = [];
    var _approvedAt_extraInitializers = [];
    var _rejectionReason_decorators;
    var _rejectionReason_initializers = [];
    var _rejectionReason_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _useCount_decorators;
    var _useCount_initializers = [];
    var _useCount_extraInitializers = [];
    var _lastUsedAt_decorators;
    var _lastUsedAt_initializers = [];
    var _lastUsedAt_extraInitializers = [];
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
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var WhatsappTemplate = _classThis = /** @class */ (function () {
        function WhatsappTemplate_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.name = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.category = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.status = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.language = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _language_initializers, void 0));
            this.externalTemplateId = (__runInitializers(this, _language_extraInitializers), __runInitializers(this, _externalTemplateId_initializers, void 0));
            this.components = (__runInitializers(this, _externalTemplateId_extraInitializers), __runInitializers(this, _components_initializers, void 0));
            this.isDefault = (__runInitializers(this, _components_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
            this.submittedAt = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _submittedAt_initializers, void 0));
            this.approvedAt = (__runInitializers(this, _submittedAt_extraInitializers), __runInitializers(this, _approvedAt_initializers, void 0));
            this.rejectionReason = (__runInitializers(this, _approvedAt_extraInitializers), __runInitializers(this, _rejectionReason_initializers, void 0));
            this.metadata = (__runInitializers(this, _rejectionReason_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.useCount = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _useCount_initializers, void 0));
            this.lastUsedAt = (__runInitializers(this, _useCount_extraInitializers), __runInitializers(this, _lastUsedAt_initializers, void 0));
            this.createdById = (__runInitializers(this, _lastUsedAt_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        /**
         * Get template variable placeholders
         * Extracts all {{variable}} patterns from components
         */
        WhatsappTemplate_1.prototype.getVariables = function () {
            var variables = new Set();
            var regex = /{{([^{}]+)}}/g;
            this.components.forEach(function (component) {
                if (component.text) {
                    var match = void 0;
                    while ((match = regex.exec(component.text)) !== null) {
                        variables.add(match[1].trim());
                    }
                }
                // Check button URLs for variables
                if (component.buttons) {
                    component.buttons.forEach(function (button) {
                        if (button.url) {
                            var match = void 0;
                            while ((match = regex.exec(button.url)) !== null) {
                                variables.add(match[1].trim());
                            }
                        }
                    });
                }
            });
            return Array.from(variables);
        };
        /**
         * Get the body text of the template
         */
        WhatsappTemplate_1.prototype.getBodyText = function () {
            var bodyComponent = this.components.find(function (c) {
                return c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY;
            });
            return (bodyComponent === null || bodyComponent === void 0 ? void 0 : bodyComponent.text) || null;
        };
        /**
         * Get the header text of the template
         */
        WhatsappTemplate_1.prototype.getHeaderText = function () {
            var headerComponent = this.components.find(function (c) {
                return c.type === whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER &&
                    c.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT;
            });
            return (headerComponent === null || headerComponent === void 0 ? void 0 : headerComponent.text) || null;
        };
        /**
         * Process template with variables
         */
        WhatsappTemplate_1.prototype.processTemplate = function (variables) {
            var _this = this;
            if (variables === void 0) { variables = {}; }
            var result = {
                body: ''
            };
            // Process each component
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var component = _a[_i];
                switch (component.type) {
                    case whatsapp_template_enums_1.WhatsappTemplateComponentType.BODY:
                        result.body = this.processText(component.text || '', variables);
                        break;
                    case whatsapp_template_enums_1.WhatsappTemplateComponentType.HEADER:
                        if (component.format === whatsapp_template_enums_1.WhatsappTemplateHeaderType.TEXT) {
                            result.header = this.processText(component.text || '', variables);
                        }
                        break;
                    case whatsapp_template_enums_1.WhatsappTemplateComponentType.FOOTER:
                        result.footer = this.processText(component.text || '', variables);
                        break;
                    case whatsapp_template_enums_1.WhatsappTemplateComponentType.BUTTONS:
                        if (component.buttons) {
                            result.buttons = component.buttons.map(function (button) {
                                var processedButton = __assign({}, button);
                                if (button.url) {
                                    processedButton.url = _this.processText(button.url, variables);
                                }
                                return processedButton;
                            });
                        }
                        break;
                }
            }
            return result;
        };
        /**
         * Process text by replacing variables
         */
        WhatsappTemplate_1.prototype.processText = function (text, variables) {
            var processed = text;
            for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                processed = processed.replace(regex, String(value !== null && value !== void 0 ? value : ''));
            }
            return processed;
        };
        WhatsappTemplate_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, description: { required: false, type: function () { return String; } }, category: { required: true, enum: require("../enums/whatsapp-template.enums").WhatsappTemplateCategory }, status: { required: true, enum: require("../enums/whatsapp-template.enums").WhatsappTemplateStatus }, language: { required: true, type: function () { return String; } }, externalTemplateId: { required: false, type: function () { return String; } }, components: { required: true, type: function () { return [Object]; } }, isDefault: { required: true, type: function () { return Boolean; } }, submittedAt: { required: false, type: function () { return Date; } }, approvedAt: { required: false, type: function () { return Date; } }, rejectionReason: { required: false, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } }, useCount: { required: true, type: function () { return Number; } }, lastUsedAt: { required: false, type: function () { return Date; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } } };
        };
        return WhatsappTemplate_1;
    }());
    __setFunctionName(_classThis, "WhatsappTemplate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _name_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _category_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: whatsapp_template_enums_1.WhatsappTemplateCategory,
                default: whatsapp_template_enums_1.WhatsappTemplateCategory.UTILITY
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: whatsapp_template_enums_1.WhatsappTemplateStatus,
                default: whatsapp_template_enums_1.WhatsappTemplateStatus.DRAFT
            }), (0, typeorm_1.Index)()];
        _language_decorators = [(0, typeorm_1.Column)({ default: 'en' })];
        _externalTemplateId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _components_decorators = [(0, typeorm_1.Column)({ type: 'jsonb' })];
        _isDefault_decorators = [(0, typeorm_1.Column)({ default: false })];
        _submittedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _approvedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _rejectionReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _useCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _lastUsedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: function (obj) { return "language" in obj; }, get: function (obj) { return obj.language; }, set: function (obj, value) { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
        __esDecorate(null, null, _externalTemplateId_decorators, { kind: "field", name: "externalTemplateId", static: false, private: false, access: { has: function (obj) { return "externalTemplateId" in obj; }, get: function (obj) { return obj.externalTemplateId; }, set: function (obj, value) { obj.externalTemplateId = value; } }, metadata: _metadata }, _externalTemplateId_initializers, _externalTemplateId_extraInitializers);
        __esDecorate(null, null, _components_decorators, { kind: "field", name: "components", static: false, private: false, access: { has: function (obj) { return "components" in obj; }, get: function (obj) { return obj.components; }, set: function (obj, value) { obj.components = value; } }, metadata: _metadata }, _components_initializers, _components_extraInitializers);
        __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
        __esDecorate(null, null, _submittedAt_decorators, { kind: "field", name: "submittedAt", static: false, private: false, access: { has: function (obj) { return "submittedAt" in obj; }, get: function (obj) { return obj.submittedAt; }, set: function (obj, value) { obj.submittedAt = value; } }, metadata: _metadata }, _submittedAt_initializers, _submittedAt_extraInitializers);
        __esDecorate(null, null, _approvedAt_decorators, { kind: "field", name: "approvedAt", static: false, private: false, access: { has: function (obj) { return "approvedAt" in obj; }, get: function (obj) { return obj.approvedAt; }, set: function (obj, value) { obj.approvedAt = value; } }, metadata: _metadata }, _approvedAt_initializers, _approvedAt_extraInitializers);
        __esDecorate(null, null, _rejectionReason_decorators, { kind: "field", name: "rejectionReason", static: false, private: false, access: { has: function (obj) { return "rejectionReason" in obj; }, get: function (obj) { return obj.rejectionReason; }, set: function (obj, value) { obj.rejectionReason = value; } }, metadata: _metadata }, _rejectionReason_initializers, _rejectionReason_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _useCount_decorators, { kind: "field", name: "useCount", static: false, private: false, access: { has: function (obj) { return "useCount" in obj; }, get: function (obj) { return obj.useCount; }, set: function (obj, value) { obj.useCount = value; } }, metadata: _metadata }, _useCount_initializers, _useCount_extraInitializers);
        __esDecorate(null, null, _lastUsedAt_decorators, { kind: "field", name: "lastUsedAt", static: false, private: false, access: { has: function (obj) { return "lastUsedAt" in obj; }, get: function (obj) { return obj.lastUsedAt; }, set: function (obj, value) { obj.lastUsedAt = value; } }, metadata: _metadata }, _lastUsedAt_initializers, _lastUsedAt_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WhatsappTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WhatsappTemplate = _classThis;
}();
exports.WhatsappTemplate = WhatsappTemplate;
//# sourceMappingURL=whatsapp-template.entity.js.map