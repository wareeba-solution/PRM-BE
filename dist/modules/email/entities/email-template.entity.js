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
exports.EmailTemplate = exports.EmailTemplateType = exports.EmailTemplateStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/email/entities/email-template.entity.ts
var typeorm_1 = require("typeorm");
/**
 * Email template status enum
 */
var EmailTemplateStatus;
(function (EmailTemplateStatus) {
    EmailTemplateStatus["DRAFT"] = "draft";
    EmailTemplateStatus["ACTIVE"] = "active";
    EmailTemplateStatus["INACTIVE"] = "inactive";
    EmailTemplateStatus["ARCHIVED"] = "archived";
})(EmailTemplateStatus || (exports.EmailTemplateStatus = EmailTemplateStatus = {}));
/**
 * Email template type enum
 */
var EmailTemplateType;
(function (EmailTemplateType) {
    EmailTemplateType["TRANSACTIONAL"] = "transactional";
    EmailTemplateType["MARKETING"] = "marketing";
    EmailTemplateType["NOTIFICATION"] = "notification";
    EmailTemplateType["REPORT"] = "report";
    EmailTemplateType["GENERAL"] = "general";
})(EmailTemplateType || (exports.EmailTemplateType = EmailTemplateType = {}));
/**
 * Email template entity
 */
var EmailTemplate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('email_templates')];
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
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _plainTextContent_decorators;
    var _plainTextContent_initializers = [];
    var _plainTextContent_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _language_decorators;
    var _language_initializers = [];
    var _language_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _previewText_decorators;
    var _previewText_initializers = [];
    var _previewText_extraInitializers = [];
    var _fromEmail_decorators;
    var _fromEmail_initializers = [];
    var _fromEmail_extraInitializers = [];
    var _fromName_decorators;
    var _fromName_initializers = [];
    var _fromName_extraInitializers = [];
    var _replyToEmail_decorators;
    var _replyToEmail_initializers = [];
    var _replyToEmail_extraInitializers = [];
    var _headerImageUrl_decorators;
    var _headerImageUrl_initializers = [];
    var _headerImageUrl_extraInitializers = [];
    var _footerContent_decorators;
    var _footerContent_initializers = [];
    var _footerContent_extraInitializers = [];
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
    var _lastUsedAt_decorators;
    var _lastUsedAt_initializers = [];
    var _lastUsedAt_extraInitializers = [];
    var _useCount_decorators;
    var _useCount_initializers = [];
    var _useCount_extraInitializers = [];
    var EmailTemplate = _classThis = /** @class */ (function () {
        function EmailTemplate_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.name = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.type = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.subject = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
            this.content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.plainTextContent = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _plainTextContent_initializers, void 0));
            this.isDefault = (__runInitializers(this, _plainTextContent_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
            this.category = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.language = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _language_initializers, void 0));
            this.variables = (__runInitializers(this, _language_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
            this.metadata = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.previewText = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _previewText_initializers, void 0));
            this.fromEmail = (__runInitializers(this, _previewText_extraInitializers), __runInitializers(this, _fromEmail_initializers, void 0));
            this.fromName = (__runInitializers(this, _fromEmail_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
            this.replyToEmail = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _replyToEmail_initializers, void 0));
            this.headerImageUrl = (__runInitializers(this, _replyToEmail_extraInitializers), __runInitializers(this, _headerImageUrl_initializers, void 0));
            this.footerContent = (__runInitializers(this, _headerImageUrl_extraInitializers), __runInitializers(this, _footerContent_initializers, void 0));
            this.createdById = (__runInitializers(this, _footerContent_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            this.lastUsedAt = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _lastUsedAt_initializers, void 0));
            this.useCount = (__runInitializers(this, _lastUsedAt_extraInitializers), __runInitializers(this, _useCount_initializers, void 0));
            __runInitializers(this, _useCount_extraInitializers);
        }
        /**
         * Processes template content by replacing variable placeholders with values
         * @param variables The values to replace placeholders with
         * @returns Processed email content
         */
        EmailTemplate_1.prototype.processContent = function (variables) {
            if (!variables)
                return this.content;
            var processedContent = this.content;
            for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                processedContent = processedContent.replace(regex, String(value !== null && value !== void 0 ? value : ''));
            }
            return processedContent;
        };
        /**
         * Processes email subject by replacing variable placeholders with values
         * @param variables The values to replace placeholders with
         * @returns Processed email subject
         */
        EmailTemplate_1.prototype.processSubject = function (variables) {
            if (!variables)
                return this.subject;
            var processedSubject = this.subject;
            for (var _i = 0, _a = Object.entries(variables); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var regex = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');
                processedSubject = processedSubject.replace(regex, String(value !== null && value !== void 0 ? value : ''));
            }
            return processedSubject;
        };
        EmailTemplate_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, description: { required: false, type: function () { return String; } }, type: { required: true, enum: require("./email-template.entity").EmailTemplateType }, status: { required: true, enum: require("./email-template.entity").EmailTemplateStatus }, subject: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, plainTextContent: { required: false, type: function () { return String; } }, isDefault: { required: true, type: function () { return Boolean; } }, category: { required: false, type: function () { return String; } }, language: { required: false, type: function () { return String; } }, variables: { required: false, type: function () { return Object; } }, metadata: { required: false, type: function () { return Object; } }, previewText: { required: false, type: function () { return String; } }, fromEmail: { required: false, type: function () { return String; } }, fromName: { required: false, type: function () { return String; } }, replyToEmail: { required: false, type: function () { return String; } }, headerImageUrl: { required: false, type: function () { return String; } }, footerContent: { required: false, type: function () { return String; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, lastUsedAt: { required: false, type: function () { return Date; } }, useCount: { required: true, type: function () { return Number; } } };
        };
        return EmailTemplate_1;
    }());
    __setFunctionName(_classThis, "EmailTemplate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _name_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: EmailTemplateType, default: EmailTemplateType.GENERAL })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: EmailTemplateStatus, default: EmailTemplateStatus.DRAFT })];
        _subject_decorators = [(0, typeorm_1.Column)()];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _plainTextContent_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'text' })];
        _isDefault_decorators = [(0, typeorm_1.Column)({ default: false })];
        _category_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _language_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _variables_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _metadata_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _previewText_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _fromEmail_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _fromName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _replyToEmail_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _headerImageUrl_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _footerContent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _lastUsedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _useCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _plainTextContent_decorators, { kind: "field", name: "plainTextContent", static: false, private: false, access: { has: function (obj) { return "plainTextContent" in obj; }, get: function (obj) { return obj.plainTextContent; }, set: function (obj, value) { obj.plainTextContent = value; } }, metadata: _metadata }, _plainTextContent_initializers, _plainTextContent_extraInitializers);
        __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: function (obj) { return "language" in obj; }, get: function (obj) { return obj.language; }, set: function (obj, value) { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
        __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _previewText_decorators, { kind: "field", name: "previewText", static: false, private: false, access: { has: function (obj) { return "previewText" in obj; }, get: function (obj) { return obj.previewText; }, set: function (obj, value) { obj.previewText = value; } }, metadata: _metadata }, _previewText_initializers, _previewText_extraInitializers);
        __esDecorate(null, null, _fromEmail_decorators, { kind: "field", name: "fromEmail", static: false, private: false, access: { has: function (obj) { return "fromEmail" in obj; }, get: function (obj) { return obj.fromEmail; }, set: function (obj, value) { obj.fromEmail = value; } }, metadata: _metadata }, _fromEmail_initializers, _fromEmail_extraInitializers);
        __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: function (obj) { return "fromName" in obj; }, get: function (obj) { return obj.fromName; }, set: function (obj, value) { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
        __esDecorate(null, null, _replyToEmail_decorators, { kind: "field", name: "replyToEmail", static: false, private: false, access: { has: function (obj) { return "replyToEmail" in obj; }, get: function (obj) { return obj.replyToEmail; }, set: function (obj, value) { obj.replyToEmail = value; } }, metadata: _metadata }, _replyToEmail_initializers, _replyToEmail_extraInitializers);
        __esDecorate(null, null, _headerImageUrl_decorators, { kind: "field", name: "headerImageUrl", static: false, private: false, access: { has: function (obj) { return "headerImageUrl" in obj; }, get: function (obj) { return obj.headerImageUrl; }, set: function (obj, value) { obj.headerImageUrl = value; } }, metadata: _metadata }, _headerImageUrl_initializers, _headerImageUrl_extraInitializers);
        __esDecorate(null, null, _footerContent_decorators, { kind: "field", name: "footerContent", static: false, private: false, access: { has: function (obj) { return "footerContent" in obj; }, get: function (obj) { return obj.footerContent; }, set: function (obj, value) { obj.footerContent = value; } }, metadata: _metadata }, _footerContent_initializers, _footerContent_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _lastUsedAt_decorators, { kind: "field", name: "lastUsedAt", static: false, private: false, access: { has: function (obj) { return "lastUsedAt" in obj; }, get: function (obj) { return obj.lastUsedAt; }, set: function (obj, value) { obj.lastUsedAt = value; } }, metadata: _metadata }, _lastUsedAt_initializers, _lastUsedAt_extraInitializers);
        __esDecorate(null, null, _useCount_decorators, { kind: "field", name: "useCount", static: false, private: false, access: { has: function (obj) { return "useCount" in obj; }, get: function (obj) { return obj.useCount; }, set: function (obj, value) { obj.useCount = value; } }, metadata: _metadata }, _useCount_initializers, _useCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailTemplate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailTemplate = _classThis;
}();
exports.EmailTemplate = EmailTemplate;
//# sourceMappingURL=email-template.entity.js.map