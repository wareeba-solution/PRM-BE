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
exports.DomainVerificationToken = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
var domain_verification_method_enum_1 = require("../enums/domain-verification-method.enum");
var DomainVerificationToken = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('domain_verification_tokens'), (0, typeorm_1.Index)(['domainId', 'token']), (0, typeorm_1.Index)(['domainId', 'status'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _domainId_decorators;
    var _domainId_initializers = [];
    var _domainId_extraInitializers = [];
    var _domain_decorators;
    var _domain_initializers = [];
    var _domain_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _verificationRecord_decorators;
    var _verificationRecord_initializers = [];
    var _verificationRecord_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _verifiedAt_decorators;
    var _verifiedAt_initializers = [];
    var _verifiedAt_extraInitializers = [];
    var _attempts_decorators;
    var _attempts_initializers = [];
    var _attempts_extraInitializers = [];
    var _lastAttemptAt_decorators;
    var _lastAttemptAt_initializers = [];
    var _lastAttemptAt_extraInitializers = [];
    var _verificationResults_decorators;
    var _verificationResults_initializers = [];
    var _verificationResults_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _isRevoked_decorators;
    var _isRevoked_initializers = [];
    var _isRevoked_extraInitializers = [];
    var _revokedAt_decorators;
    var _revokedAt_initializers = [];
    var _revokedAt_extraInitializers = [];
    var _revokedBy_decorators;
    var _revokedBy_initializers = [];
    var _revokedBy_extraInitializers = [];
    var _revokeReason_decorators;
    var _revokeReason_initializers = [];
    var _revokeReason_extraInitializers = [];
    var _retryPolicy_decorators;
    var _retryPolicy_initializers = [];
    var _retryPolicy_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _validationRules_decorators;
    var _validationRules_initializers = [];
    var _validationRules_extraInitializers = [];
    var _alternativeTokens_decorators;
    var _alternativeTokens_initializers = [];
    var _alternativeTokens_extraInitializers = [];
    var _customValidation_decorators;
    var _customValidation_initializers = [];
    var _customValidation_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _history_decorators;
    var _history_initializers = [];
    var _history_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var DomainVerificationToken = _classThis = /** @class */ (function () {
        function DomainVerificationToken_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.domainId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _domainId_initializers, void 0));
            this.domain = (__runInitializers(this, _domainId_extraInitializers), __runInitializers(this, _domain_initializers, void 0));
            this.token = (__runInitializers(this, _domain_extraInitializers), __runInitializers(this, _token_initializers, void 0));
            this.method = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _method_initializers, void 0));
            this.status = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.verificationRecord = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _verificationRecord_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _verificationRecord_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.verifiedAt = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _verifiedAt_initializers, void 0));
            this.attempts = (__runInitializers(this, _verifiedAt_extraInitializers), __runInitializers(this, _attempts_initializers, void 0));
            this.lastAttemptAt = (__runInitializers(this, _attempts_extraInitializers), __runInitializers(this, _lastAttemptAt_initializers, void 0));
            this.verificationResults = (__runInitializers(this, _lastAttemptAt_extraInitializers), __runInitializers(this, _verificationResults_initializers, void 0));
            this.metadata = (__runInitializers(this, _verificationResults_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.isRevoked = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _isRevoked_initializers, void 0));
            this.revokedAt = (__runInitializers(this, _isRevoked_extraInitializers), __runInitializers(this, _revokedAt_initializers, void 0));
            this.revokedBy = (__runInitializers(this, _revokedAt_extraInitializers), __runInitializers(this, _revokedBy_initializers, void 0));
            this.revokeReason = (__runInitializers(this, _revokedBy_extraInitializers), __runInitializers(this, _revokeReason_initializers, void 0));
            this.retryPolicy = (__runInitializers(this, _revokeReason_extraInitializers), __runInitializers(this, _retryPolicy_initializers, void 0));
            this.isActive = (__runInitializers(this, _retryPolicy_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.validationRules = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _validationRules_initializers, void 0));
            this.alternativeTokens = (__runInitializers(this, _validationRules_extraInitializers), __runInitializers(this, _alternativeTokens_initializers, void 0));
            this.customValidation = (__runInitializers(this, _alternativeTokens_extraInitializers), __runInitializers(this, _customValidation_initializers, void 0));
            this.createdAt = (__runInitializers(this, _customValidation_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.createdBy = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.history = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _history_initializers, void 0));
            this.notes = (__runInitializers(this, _history_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            __runInitializers(this, _notes_extraInitializers);
        }
        DomainVerificationToken_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, domainId: { required: true, type: function () { return String; } }, domain: { required: true, type: function () { return require("./domain.entity").Domain; } }, token: { required: true, type: function () { return String; } }, method: { required: true, enum: require("../enums/domain-verification-method.enum").DomainVerificationMethod }, status: { required: true, enum: require("../enums/domain-verification-status.enum").DomainVerificationStatus }, verificationRecord: { required: true, type: function () { return ({ type: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, value: { required: true, type: function () { return String; } }, ttl: { required: false, type: function () { return Number; } } }); } }, expiresAt: { required: true, type: function () { return Date; } }, verifiedAt: { required: false, type: function () { return Date; } }, attempts: { required: true, type: function () { return Number; } }, lastAttemptAt: { required: false, type: function () { return Date; } }, verificationResults: { required: false }, metadata: { required: false, type: function () { return ({ generatedBy: { required: false, type: function () { return String; } }, source: { required: false, type: function () { return String; } }, clientIp: { required: false, type: function () { return String; } }, userAgent: { required: false, type: function () { return String; } } }); } }, isRevoked: { required: true, type: function () { return Boolean; } }, revokedAt: { required: false, type: function () { return Date; } }, revokedBy: { required: false, type: function () { return String; } }, revokeReason: { required: false, type: function () { return String; } }, retryPolicy: { required: false, type: function () { return ({ maxAttempts: { required: true, type: function () { return Number; } }, backoffPeriod: { required: true, type: function () { return Number; } }, timeoutPeriod: { required: true, type: function () { return Number; } } }); } }, isActive: { required: true, type: function () { return Boolean; } }, validationRules: { required: false, type: function () { return ({ requiredRecords: { required: false, type: function () { return [String]; } }, propagationTime: { required: false, type: function () { return Number; } }, requiredNameservers: { required: false, type: function () { return [String]; } } }); } }, alternativeTokens: { required: false, type: function () { return [String]; } }, customValidation: { required: false, type: function () { return ({ type: { required: true, type: function () { return String; } }, config: { required: true, type: function () { return Object; } }, results: { required: false, type: function () { return Object; } } }); } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, createdBy: { required: false, type: function () { return String; } }, updatedBy: { required: false, type: function () { return String; } }, history: { required: false }, notes: { required: false, type: function () { return String; } } };
        };
        return DomainVerificationToken_1;
    }());
    __setFunctionName(_classThis, "DomainVerificationToken");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _domainId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
        _domain_decorators = [(0, typeorm_1.ManyToOne)('Domain', { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'domainId' })];
        _token_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _method_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: domain_verification_method_enum_1.DomainVerificationMethod
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: domain_verification_status_enum_1.DomainVerificationStatus,
                default: domain_verification_status_enum_1.DomainVerificationStatus.PENDING
            }), (0, typeorm_1.Index)()];
        _verificationRecord_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _expiresAt_decorators = [(0, typeorm_1.Column)()];
        _verifiedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _attempts_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
        _lastAttemptAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _verificationResults_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isRevoked_decorators = [(0, typeorm_1.Column)('boolean', { default: false })];
        _revokedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _revokedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _revokeReason_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _retryPolicy_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isActive_decorators = [(0, typeorm_1.Column)('boolean', { default: true })];
        _validationRules_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _alternativeTokens_decorators = [(0, typeorm_1.Column)('text', { array: true, nullable: true })];
        _customValidation_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _createdBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _updatedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _history_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _domainId_decorators, { kind: "field", name: "domainId", static: false, private: false, access: { has: function (obj) { return "domainId" in obj; }, get: function (obj) { return obj.domainId; }, set: function (obj, value) { obj.domainId = value; } }, metadata: _metadata }, _domainId_initializers, _domainId_extraInitializers);
        __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: function (obj) { return "domain" in obj; }, get: function (obj) { return obj.domain; }, set: function (obj, value) { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _verificationRecord_decorators, { kind: "field", name: "verificationRecord", static: false, private: false, access: { has: function (obj) { return "verificationRecord" in obj; }, get: function (obj) { return obj.verificationRecord; }, set: function (obj, value) { obj.verificationRecord = value; } }, metadata: _metadata }, _verificationRecord_initializers, _verificationRecord_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _verifiedAt_decorators, { kind: "field", name: "verifiedAt", static: false, private: false, access: { has: function (obj) { return "verifiedAt" in obj; }, get: function (obj) { return obj.verifiedAt; }, set: function (obj, value) { obj.verifiedAt = value; } }, metadata: _metadata }, _verifiedAt_initializers, _verifiedAt_extraInitializers);
        __esDecorate(null, null, _attempts_decorators, { kind: "field", name: "attempts", static: false, private: false, access: { has: function (obj) { return "attempts" in obj; }, get: function (obj) { return obj.attempts; }, set: function (obj, value) { obj.attempts = value; } }, metadata: _metadata }, _attempts_initializers, _attempts_extraInitializers);
        __esDecorate(null, null, _lastAttemptAt_decorators, { kind: "field", name: "lastAttemptAt", static: false, private: false, access: { has: function (obj) { return "lastAttemptAt" in obj; }, get: function (obj) { return obj.lastAttemptAt; }, set: function (obj, value) { obj.lastAttemptAt = value; } }, metadata: _metadata }, _lastAttemptAt_initializers, _lastAttemptAt_extraInitializers);
        __esDecorate(null, null, _verificationResults_decorators, { kind: "field", name: "verificationResults", static: false, private: false, access: { has: function (obj) { return "verificationResults" in obj; }, get: function (obj) { return obj.verificationResults; }, set: function (obj, value) { obj.verificationResults = value; } }, metadata: _metadata }, _verificationResults_initializers, _verificationResults_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _isRevoked_decorators, { kind: "field", name: "isRevoked", static: false, private: false, access: { has: function (obj) { return "isRevoked" in obj; }, get: function (obj) { return obj.isRevoked; }, set: function (obj, value) { obj.isRevoked = value; } }, metadata: _metadata }, _isRevoked_initializers, _isRevoked_extraInitializers);
        __esDecorate(null, null, _revokedAt_decorators, { kind: "field", name: "revokedAt", static: false, private: false, access: { has: function (obj) { return "revokedAt" in obj; }, get: function (obj) { return obj.revokedAt; }, set: function (obj, value) { obj.revokedAt = value; } }, metadata: _metadata }, _revokedAt_initializers, _revokedAt_extraInitializers);
        __esDecorate(null, null, _revokedBy_decorators, { kind: "field", name: "revokedBy", static: false, private: false, access: { has: function (obj) { return "revokedBy" in obj; }, get: function (obj) { return obj.revokedBy; }, set: function (obj, value) { obj.revokedBy = value; } }, metadata: _metadata }, _revokedBy_initializers, _revokedBy_extraInitializers);
        __esDecorate(null, null, _revokeReason_decorators, { kind: "field", name: "revokeReason", static: false, private: false, access: { has: function (obj) { return "revokeReason" in obj; }, get: function (obj) { return obj.revokeReason; }, set: function (obj, value) { obj.revokeReason = value; } }, metadata: _metadata }, _revokeReason_initializers, _revokeReason_extraInitializers);
        __esDecorate(null, null, _retryPolicy_decorators, { kind: "field", name: "retryPolicy", static: false, private: false, access: { has: function (obj) { return "retryPolicy" in obj; }, get: function (obj) { return obj.retryPolicy; }, set: function (obj, value) { obj.retryPolicy = value; } }, metadata: _metadata }, _retryPolicy_initializers, _retryPolicy_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _validationRules_decorators, { kind: "field", name: "validationRules", static: false, private: false, access: { has: function (obj) { return "validationRules" in obj; }, get: function (obj) { return obj.validationRules; }, set: function (obj, value) { obj.validationRules = value; } }, metadata: _metadata }, _validationRules_initializers, _validationRules_extraInitializers);
        __esDecorate(null, null, _alternativeTokens_decorators, { kind: "field", name: "alternativeTokens", static: false, private: false, access: { has: function (obj) { return "alternativeTokens" in obj; }, get: function (obj) { return obj.alternativeTokens; }, set: function (obj, value) { obj.alternativeTokens = value; } }, metadata: _metadata }, _alternativeTokens_initializers, _alternativeTokens_extraInitializers);
        __esDecorate(null, null, _customValidation_decorators, { kind: "field", name: "customValidation", static: false, private: false, access: { has: function (obj) { return "customValidation" in obj; }, get: function (obj) { return obj.customValidation; }, set: function (obj, value) { obj.customValidation = value; } }, metadata: _metadata }, _customValidation_initializers, _customValidation_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _history_decorators, { kind: "field", name: "history", static: false, private: false, access: { has: function (obj) { return "history" in obj; }, get: function (obj) { return obj.history; }, set: function (obj, value) { obj.history = value; } }, metadata: _metadata }, _history_initializers, _history_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomainVerificationToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomainVerificationToken = _classThis;
}();
exports.DomainVerificationToken = DomainVerificationToken;
//# sourceMappingURL=domain-verification-token.entity.js.map