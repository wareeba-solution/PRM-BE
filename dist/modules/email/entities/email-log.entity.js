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
exports.EmailLog = exports.EmailStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/email/entities/email-log.entity.ts
var typeorm_1 = require("typeorm");
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENDING"] = "SENDING";
    EmailStatus["SUCCESS"] = "SUCCESS";
    EmailStatus["FAILED"] = "FAILED";
    EmailStatus["BOUNCED"] = "BOUNCED";
})(EmailStatus || (exports.EmailStatus = EmailStatus = {}));
var EmailLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('email_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _jobId_decorators;
    var _jobId_initializers = [];
    var _jobId_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _cc_decorators;
    var _cc_initializers = [];
    var _cc_extraInitializers = [];
    var _bcc_decorators;
    var _bcc_initializers = [];
    var _bcc_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _template_decorators;
    var _template_initializers = [];
    var _template_extraInitializers = [];
    var _context_decorators;
    var _context_initializers = [];
    var _context_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _error_decorators;
    var _error_initializers = [];
    var _error_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _sentAt_decorators;
    var _sentAt_initializers = [];
    var _sentAt_extraInitializers = [];
    var EmailLog = _classThis = /** @class */ (function () {
        function EmailLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.jobId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _jobId_initializers, void 0));
            this.to = (__runInitializers(this, _jobId_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            this.cc = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _cc_initializers, void 0));
            this.bcc = (__runInitializers(this, _cc_extraInitializers), __runInitializers(this, _bcc_initializers, void 0));
            this.subject = (__runInitializers(this, _bcc_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
            this.template = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            this.context = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            this.status = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.error = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _error_initializers, void 0));
            this.organizationId = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.userId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.createdAt = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.sentAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
            __runInitializers(this, _sentAt_extraInitializers);
        }
        EmailLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, jobId: { required: false, type: function () { return String; } }, to: { required: true, type: function () { return String; } }, cc: { required: false, type: function () { return String; } }, bcc: { required: false, type: function () { return String; } }, subject: { required: true, type: function () { return String; } }, template: { required: true, type: function () { return String; } }, context: { required: false, type: function () { return Object; } }, status: { required: true, type: function () { return String; } }, error: { required: false, type: function () { return String; } }, organizationId: { required: false, type: function () { return String; } }, userId: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, sentAt: { required: false, type: function () { return Date; } } };
        };
        return EmailLog_1;
    }());
    __setFunctionName(_classThis, "EmailLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _jobId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _to_decorators = [(0, typeorm_1.Column)()];
        _cc_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _bcc_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _subject_decorators = [(0, typeorm_1.Column)()];
        _template_decorators = [(0, typeorm_1.Column)()];
        _context_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: EmailStatus,
                default: EmailStatus.QUEUED
            })];
        _error_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _userId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)(), (0, typeorm_1.Index)()];
        _sentAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _jobId_decorators, { kind: "field", name: "jobId", static: false, private: false, access: { has: function (obj) { return "jobId" in obj; }, get: function (obj) { return obj.jobId; }, set: function (obj, value) { obj.jobId = value; } }, metadata: _metadata }, _jobId_initializers, _jobId_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, null, _cc_decorators, { kind: "field", name: "cc", static: false, private: false, access: { has: function (obj) { return "cc" in obj; }, get: function (obj) { return obj.cc; }, set: function (obj, value) { obj.cc = value; } }, metadata: _metadata }, _cc_initializers, _cc_extraInitializers);
        __esDecorate(null, null, _bcc_decorators, { kind: "field", name: "bcc", static: false, private: false, access: { has: function (obj) { return "bcc" in obj; }, get: function (obj) { return obj.bcc; }, set: function (obj, value) { obj.bcc = value; } }, metadata: _metadata }, _bcc_initializers, _bcc_extraInitializers);
        __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: function (obj) { return "template" in obj; }, get: function (obj) { return obj.template; }, set: function (obj, value) { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _context_decorators, { kind: "field", name: "context", static: false, private: false, access: { has: function (obj) { return "context" in obj; }, get: function (obj) { return obj.context; }, set: function (obj, value) { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: function (obj) { return "error" in obj; }, get: function (obj) { return obj.error; }, set: function (obj, value) { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: function (obj) { return "sentAt" in obj; }, get: function (obj) { return obj.sentAt; }, set: function (obj, value) { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailLog = _classThis;
}();
exports.EmailLog = EmailLog;
//# sourceMappingURL=email-log.entity.js.map