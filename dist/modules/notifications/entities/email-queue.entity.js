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
exports.EmailQueue = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var email_status_enum_1 = require("../enums/email-status.enum");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var email_template_entity_1 = require("./email-template.entity");
var EmailQueue = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('email_queue')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _attempts_decorators;
    var _attempts_initializers = [];
    var _attempts_extraInitializers = [];
    var _maxAttempts_decorators;
    var _maxAttempts_initializers = [];
    var _maxAttempts_extraInitializers = [];
    var _lastError_decorators;
    var _lastError_initializers = [];
    var _lastError_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _sentAt_decorators;
    var _sentAt_initializers = [];
    var _sentAt_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _template_decorators;
    var _template_initializers = [];
    var _template_extraInitializers = [];
    var _recipient_decorators;
    var _recipient_initializers = [];
    var _recipient_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _htmlContent_decorators;
    var _htmlContent_initializers = [];
    var _htmlContent_extraInitializers = [];
    var _textContent_decorators;
    var _textContent_initializers = [];
    var _textContent_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _processedAt_decorators;
    var _processedAt_initializers = [];
    var _processedAt_extraInitializers = [];
    var EmailQueue = _classThis = /** @class */ (function () {
        function EmailQueue_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.priority = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.attempts = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _attempts_initializers, void 0));
            this.maxAttempts = (__runInitializers(this, _attempts_extraInitializers), __runInitializers(this, _maxAttempts_initializers, void 0));
            this.lastError = (__runInitializers(this, _maxAttempts_extraInitializers), __runInitializers(this, _lastError_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastError_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.sentAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
            this.data = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _data_initializers, void 0));
            this.organizationId = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.templateId = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
            this.template = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            this.recipient = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _recipient_initializers, void 0));
            this.subject = (__runInitializers(this, _recipient_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
            this.htmlContent = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _htmlContent_initializers, void 0));
            this.textContent = (__runInitializers(this, _htmlContent_extraInitializers), __runInitializers(this, _textContent_initializers, void 0));
            this.variables = (__runInitializers(this, _textContent_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
            this.metadata = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.status = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.processedAt = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _processedAt_initializers, void 0));
            __runInitializers(this, _processedAt_extraInitializers);
        }
        EmailQueue_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, priority: { required: true, type: function () { return Number; } }, attempts: { required: true, type: function () { return Number; } }, maxAttempts: { required: true, type: function () { return Number; } }, lastError: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, sentAt: { required: true, type: function () { return Date; } }, data: { required: true, type: function () { return Object; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, templateId: { required: true, type: function () { return String; } }, template: { required: true, type: function () { return require("./email-template.entity").EmailTemplate; } }, recipient: { required: true, type: function () { return String; } }, subject: { required: true, type: function () { return String; } }, htmlContent: { required: true, type: function () { return String; } }, textContent: { required: true, type: function () { return String; } }, variables: { required: true, type: function () { return Object; } }, metadata: { required: true, type: function () { return Object; } }, status: { required: true, enum: require("../enums/email-status.enum").EmailStatus }, scheduledFor: { required: true, type: function () { return Date; } }, processedAt: { required: true, type: function () { return Date; } } };
        };
        return EmailQueue_1;
    }());
    __setFunctionName(_classThis, "EmailQueue");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _priority_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Column)()];
        _attempts_decorators = [(0, typeorm_1.Column)()];
        _maxAttempts_decorators = [(0, typeorm_1.Column)()];
        _lastError_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _sentAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _data_decorators = [(0, typeorm_1.Column)('json')];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid')];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _templateId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _template_decorators = [(0, typeorm_1.ManyToOne)(function () { return email_template_entity_1.EmailTemplate; }), (0, typeorm_1.JoinColumn)({ name: 'templateId' })];
        _recipient_decorators = [(0, typeorm_1.Column)()];
        _subject_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _htmlContent_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _textContent_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _variables_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: email_status_enum_1.EmailStatus,
                default: email_status_enum_1.EmailStatus.PENDING
            })];
        _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _processedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _attempts_decorators, { kind: "field", name: "attempts", static: false, private: false, access: { has: function (obj) { return "attempts" in obj; }, get: function (obj) { return obj.attempts; }, set: function (obj, value) { obj.attempts = value; } }, metadata: _metadata }, _attempts_initializers, _attempts_extraInitializers);
        __esDecorate(null, null, _maxAttempts_decorators, { kind: "field", name: "maxAttempts", static: false, private: false, access: { has: function (obj) { return "maxAttempts" in obj; }, get: function (obj) { return obj.maxAttempts; }, set: function (obj, value) { obj.maxAttempts = value; } }, metadata: _metadata }, _maxAttempts_initializers, _maxAttempts_extraInitializers);
        __esDecorate(null, null, _lastError_decorators, { kind: "field", name: "lastError", static: false, private: false, access: { has: function (obj) { return "lastError" in obj; }, get: function (obj) { return obj.lastError; }, set: function (obj, value) { obj.lastError = value; } }, metadata: _metadata }, _lastError_initializers, _lastError_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: function (obj) { return "sentAt" in obj; }, get: function (obj) { return obj.sentAt; }, set: function (obj, value) { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
        __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: function (obj) { return "template" in obj; }, get: function (obj) { return obj.template; }, set: function (obj, value) { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _recipient_decorators, { kind: "field", name: "recipient", static: false, private: false, access: { has: function (obj) { return "recipient" in obj; }, get: function (obj) { return obj.recipient; }, set: function (obj, value) { obj.recipient = value; } }, metadata: _metadata }, _recipient_initializers, _recipient_extraInitializers);
        __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
        __esDecorate(null, null, _htmlContent_decorators, { kind: "field", name: "htmlContent", static: false, private: false, access: { has: function (obj) { return "htmlContent" in obj; }, get: function (obj) { return obj.htmlContent; }, set: function (obj, value) { obj.htmlContent = value; } }, metadata: _metadata }, _htmlContent_initializers, _htmlContent_extraInitializers);
        __esDecorate(null, null, _textContent_decorators, { kind: "field", name: "textContent", static: false, private: false, access: { has: function (obj) { return "textContent" in obj; }, get: function (obj) { return obj.textContent; }, set: function (obj, value) { obj.textContent = value; } }, metadata: _metadata }, _textContent_initializers, _textContent_extraInitializers);
        __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _processedAt_decorators, { kind: "field", name: "processedAt", static: false, private: false, access: { has: function (obj) { return "processedAt" in obj; }, get: function (obj) { return obj.processedAt; }, set: function (obj, value) { obj.processedAt = value; } }, metadata: _metadata }, _processedAt_initializers, _processedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailQueue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailQueue = _classThis;
}();
exports.EmailQueue = EmailQueue;
//# sourceMappingURL=email-queue.entity.js.map