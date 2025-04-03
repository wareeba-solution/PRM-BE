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
exports.AuditLog = exports.AuditLogStatus = exports.AuditLogSeverity = exports.AuditLogType = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var AuditLogType;
(function (AuditLogType) {
    AuditLogType["AUTHENTICATION"] = "authentication";
    AuditLogType["AUTHORIZATION"] = "authorization";
    AuditLogType["DATA_ACCESS"] = "data_access";
    AuditLogType["DATA_MODIFICATION"] = "data_modification";
    AuditLogType["SYSTEM"] = "system";
    AuditLogType["SECURITY"] = "security";
    AuditLogType["COMPLIANCE"] = "compliance";
    AuditLogType["BUSINESS"] = "business";
})(AuditLogType || (exports.AuditLogType = AuditLogType = {}));
var AuditLogSeverity;
(function (AuditLogSeverity) {
    AuditLogSeverity["INFO"] = "info";
    AuditLogSeverity["WARNING"] = "warning";
    AuditLogSeverity["ERROR"] = "error";
    AuditLogSeverity["CRITICAL"] = "critical";
})(AuditLogSeverity || (exports.AuditLogSeverity = AuditLogSeverity = {}));
var AuditLogStatus;
(function (AuditLogStatus) {
    AuditLogStatus["SUCCESS"] = "success";
    AuditLogStatus["FAILURE"] = "failure";
    AuditLogStatus["PENDING"] = "pending";
    AuditLogStatus["CANCELLED"] = "cancelled";
})(AuditLogStatus || (exports.AuditLogStatus = AuditLogStatus = {}));
var AuditLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('audit_logs'), (0, typeorm_1.Index)(['entityType', 'entityId']), (0, typeorm_1.Index)(['actorType', 'actorId']), (0, typeorm_1.Index)(['timestamp', 'type'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _severity_decorators;
    var _severity_initializers = [];
    var _severity_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _actorId_decorators;
    var _actorId_initializers = [];
    var _actorId_extraInitializers = [];
    var _actorType_decorators;
    var _actorType_initializers = [];
    var _actorType_extraInitializers = [];
    var _actor_decorators;
    var _actor_initializers = [];
    var _actor_extraInitializers = [];
    var _entityId_decorators;
    var _entityId_initializers = [];
    var _entityId_extraInitializers = [];
    var _entityType_decorators;
    var _entityType_initializers = [];
    var _entityType_extraInitializers = [];
    var _changes_decorators;
    var _changes_initializers = [];
    var _changes_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _requestId_decorators;
    var _requestId_initializers = [];
    var _requestId_extraInitializers = [];
    var _sessionId_decorators;
    var _sessionId_initializers = [];
    var _sessionId_extraInitializers = [];
    var _origin_decorators;
    var _origin_initializers = [];
    var _origin_extraInitializers = [];
    var _timestamp_decorators;
    var _timestamp_initializers = [];
    var _timestamp_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _securityContext_decorators;
    var _securityContext_initializers = [];
    var _securityContext_extraInitializers = [];
    var _complianceMetadata_decorators;
    var _complianceMetadata_initializers = [];
    var _complianceMetadata_extraInitializers = [];
    var _error_decorators;
    var _error_initializers = [];
    var _error_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _riskAssessment_decorators;
    var _riskAssessment_initializers = [];
    var _riskAssessment_extraInitializers = [];
    var _businessContext_decorators;
    var _businessContext_initializers = [];
    var _businessContext_extraInitializers = [];
    var _systemContext_decorators;
    var _systemContext_initializers = [];
    var _systemContext_extraInitializers = [];
    var _lastModified_decorators;
    var _lastModified_initializers = [];
    var _lastModified_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _archived_decorators;
    var _archived_initializers = [];
    var _archived_extraInitializers = [];
    var _archivedAt_decorators;
    var _archivedAt_initializers = [];
    var _archivedAt_extraInitializers = [];
    var _redacted_decorators;
    var _redacted_initializers = [];
    var _redacted_extraInitializers = [];
    var _redactedAt_decorators;
    var _redactedAt_initializers = [];
    var _redactedAt_extraInitializers = [];
    var _customMetadata_decorators;
    var _customMetadata_initializers = [];
    var _customMetadata_extraInitializers = [];
    var AuditLog = _classThis = /** @class */ (function () {
        function AuditLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.severity = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _severity_initializers, void 0));
            this.organizationId = __runInitializers(this, _severity_extraInitializers); // Add this line
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.action = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.description = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.metadata = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            // Actor information (who performed the action)
            this.actorId = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _actorId_initializers, void 0));
            this.actorType = (__runInitializers(this, _actorId_extraInitializers), __runInitializers(this, _actorType_initializers, void 0));
            this.actor = (__runInitializers(this, _actorType_extraInitializers), __runInitializers(this, _actor_initializers, void 0));
            // Entity information (what was affected)
            this.entityId = (__runInitializers(this, _actor_extraInitializers), __runInitializers(this, _entityId_initializers, void 0));
            this.entityType = (__runInitializers(this, _entityId_extraInitializers), __runInitializers(this, _entityType_initializers, void 0));
            this.changes = (__runInitializers(this, _entityType_extraInitializers), __runInitializers(this, _changes_initializers, void 0));
            // Context information
            this.ipAddress = (__runInitializers(this, _changes_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.requestId = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _requestId_initializers, void 0));
            this.sessionId = (__runInitializers(this, _requestId_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
            this.origin = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _origin_initializers, void 0));
            // Temporal information
            this.timestamp = (__runInitializers(this, _origin_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
            this.duration = (__runInitializers(this, _timestamp_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            // Location information (if applicable)
            this.location = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            // Security context
            this.securityContext = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _securityContext_initializers, void 0));
            // Compliance information
            this.complianceMetadata = (__runInitializers(this, _securityContext_extraInitializers), __runInitializers(this, _complianceMetadata_initializers, void 0));
            // Error information (if applicable)
            this.error = (__runInitializers(this, _complianceMetadata_extraInitializers), __runInitializers(this, _error_initializers, void 0));
            // Tags for better categorization and searching
            this.tags = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            // Risk assessment
            this.riskAssessment = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _riskAssessment_initializers, void 0));
            // Business context
            this.businessContext = (__runInitializers(this, _riskAssessment_extraInitializers), __runInitializers(this, _businessContext_initializers, void 0));
            // System information
            this.systemContext = (__runInitializers(this, _businessContext_extraInitializers), __runInitializers(this, _systemContext_initializers, void 0));
            // Temporal tracking
            this.lastModified = (__runInitializers(this, _systemContext_extraInitializers), __runInitializers(this, _lastModified_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _lastModified_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            // Retention policy
            this.archived = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _archived_initializers, void 0));
            this.archivedAt = (__runInitializers(this, _archived_extraInitializers), __runInitializers(this, _archivedAt_initializers, void 0));
            this.redacted = (__runInitializers(this, _archivedAt_extraInitializers), __runInitializers(this, _redacted_initializers, void 0));
            this.redactedAt = (__runInitializers(this, _redacted_extraInitializers), __runInitializers(this, _redactedAt_initializers, void 0));
            // Additional metadata for specific use cases
            this.customMetadata = (__runInitializers(this, _redactedAt_extraInitializers), __runInitializers(this, _customMetadata_initializers, void 0));
            __runInitializers(this, _customMetadata_extraInitializers);
        }
        AuditLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./audit-log.entity").AuditLogType }, severity: { required: true, enum: require("./audit-log.entity").AuditLogSeverity }, organizationId: { required: true, type: function () { return String; } }, status: { required: true, enum: require("./audit-log.entity").AuditLogStatus }, action: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, actorId: { required: true, type: function () { return String; } }, actorType: { required: true, type: function () { return String; } }, actor: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, entityId: { required: true, type: function () { return String; } }, entityType: { required: true, type: function () { return String; } }, changes: { required: true, type: function () { return ({ before: { required: true, type: function () { return Object; } }, after: { required: true, type: function () { return Object; } } }); } }, ipAddress: { required: true, type: function () { return String; } }, userAgent: { required: true, type: function () { return String; } }, requestId: { required: true, type: function () { return String; } }, sessionId: { required: true, type: function () { return String; } }, origin: { required: true, type: function () { return String; } }, timestamp: { required: true, type: function () { return Date; } }, duration: { required: true, type: function () { return Number; } }, location: { required: true, type: function () { return ({ country: { required: false, type: function () { return String; } }, region: { required: false, type: function () { return String; } }, city: { required: false, type: function () { return String; } }, coordinates: { required: false, type: function () { return ({ latitude: { required: true, type: function () { return Number; } }, longitude: { required: true, type: function () { return Number; } } }); } } }); } }, securityContext: { required: true, type: function () { return ({ permissions: { required: false, type: function () { return [String]; } }, roles: { required: false, type: function () { return [String]; } }, authenticationType: { required: false, type: function () { return String; } }, authenticationMethod: { required: false, type: function () { return String; } }, mfaUsed: { required: false, type: function () { return Boolean; } } }); } }, complianceMetadata: { required: true, type: function () { return ({ regulations: { required: false, type: function () { return [String]; } }, dataClassification: { required: false, type: function () { return String; } }, retentionPeriod: { required: false, type: function () { return Number; } }, piiInvolved: { required: false, type: function () { return Boolean; } }, dlpPolicies: { required: false, type: function () { return [String]; } } }); } }, error: { required: true, type: function () { return ({ code: { required: false, type: function () { return String; } }, message: { required: false, type: function () { return String; } }, stack: { required: false, type: function () { return String; } }, details: { required: false, type: function () { return Object; } } }); } }, tags: { required: true, type: function () { return [String]; } }, riskAssessment: { required: true, type: function () { return ({ level: { required: false, type: function () { return Object; } }, factors: { required: false, type: function () { return [String]; } }, score: { required: false, type: function () { return Number; } }, mitigations: { required: false, type: function () { return [String]; } } }); } }, businessContext: { required: true, type: function () { return ({ process: { required: false, type: function () { return String; } }, department: { required: false, type: function () { return String; } }, costCenter: { required: false, type: function () { return String; } }, projectId: { required: false, type: function () { return String; } } }); } }, systemContext: { required: true, type: function () { return ({ environment: { required: false, type: function () { return String; } }, version: { required: false, type: function () { return String; } }, component: { required: false, type: function () { return String; } }, hostname: { required: false, type: function () { return String; } } }); } }, lastModified: { required: true, type: function () { return Date; } }, expiresAt: { required: true, type: function () { return Date; } }, archived: { required: true, type: function () { return Boolean; } }, archivedAt: { required: true, type: function () { return Date; } }, redacted: { required: true, type: function () { return Boolean; } }, redactedAt: { required: true, type: function () { return Date; } }, customMetadata: { required: true, type: function () { return Object; } } };
        };
        return AuditLog_1;
    }());
    __setFunctionName(_classThis, "AuditLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AuditLogType,
                default: AuditLogType.SYSTEM
            }), (0, typeorm_1.Index)()];
        _severity_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AuditLogSeverity,
                default: AuditLogSeverity.INFO
            }), (0, typeorm_1.Index)()];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AuditLogStatus,
                default: AuditLogStatus.SUCCESS
            }), (0, typeorm_1.Index)()];
        _action_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _description_decorators = [(0, typeorm_1.Column)('text')];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _actorId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _actorType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _actor_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'actorId' })];
        _entityId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _entityType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _changes_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _requestId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _sessionId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _origin_decorators = [(0, typeorm_1.Column)('varchar', { nullable: true })];
        _timestamp_decorators = [(0, typeorm_1.CreateDateColumn)(), (0, typeorm_1.Index)()];
        _duration_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _location_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _securityContext_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _complianceMetadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _error_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)('text', { array: true, nullable: true }), (0, typeorm_1.Index)()];
        _riskAssessment_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _businessContext_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _systemContext_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _lastModified_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _expiresAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _archived_decorators = [(0, typeorm_1.Column)({ default: false }), (0, typeorm_1.Index)()];
        _archivedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _redacted_decorators = [(0, typeorm_1.Column)({ default: false }), (0, typeorm_1.Index)()];
        _redactedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _customMetadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _severity_decorators, { kind: "field", name: "severity", static: false, private: false, access: { has: function (obj) { return "severity" in obj; }, get: function (obj) { return obj.severity; }, set: function (obj, value) { obj.severity = value; } }, metadata: _metadata }, _severity_initializers, _severity_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _actorId_decorators, { kind: "field", name: "actorId", static: false, private: false, access: { has: function (obj) { return "actorId" in obj; }, get: function (obj) { return obj.actorId; }, set: function (obj, value) { obj.actorId = value; } }, metadata: _metadata }, _actorId_initializers, _actorId_extraInitializers);
        __esDecorate(null, null, _actorType_decorators, { kind: "field", name: "actorType", static: false, private: false, access: { has: function (obj) { return "actorType" in obj; }, get: function (obj) { return obj.actorType; }, set: function (obj, value) { obj.actorType = value; } }, metadata: _metadata }, _actorType_initializers, _actorType_extraInitializers);
        __esDecorate(null, null, _actor_decorators, { kind: "field", name: "actor", static: false, private: false, access: { has: function (obj) { return "actor" in obj; }, get: function (obj) { return obj.actor; }, set: function (obj, value) { obj.actor = value; } }, metadata: _metadata }, _actor_initializers, _actor_extraInitializers);
        __esDecorate(null, null, _entityId_decorators, { kind: "field", name: "entityId", static: false, private: false, access: { has: function (obj) { return "entityId" in obj; }, get: function (obj) { return obj.entityId; }, set: function (obj, value) { obj.entityId = value; } }, metadata: _metadata }, _entityId_initializers, _entityId_extraInitializers);
        __esDecorate(null, null, _entityType_decorators, { kind: "field", name: "entityType", static: false, private: false, access: { has: function (obj) { return "entityType" in obj; }, get: function (obj) { return obj.entityType; }, set: function (obj, value) { obj.entityType = value; } }, metadata: _metadata }, _entityType_initializers, _entityType_extraInitializers);
        __esDecorate(null, null, _changes_decorators, { kind: "field", name: "changes", static: false, private: false, access: { has: function (obj) { return "changes" in obj; }, get: function (obj) { return obj.changes; }, set: function (obj, value) { obj.changes = value; } }, metadata: _metadata }, _changes_initializers, _changes_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _requestId_decorators, { kind: "field", name: "requestId", static: false, private: false, access: { has: function (obj) { return "requestId" in obj; }, get: function (obj) { return obj.requestId; }, set: function (obj, value) { obj.requestId = value; } }, metadata: _metadata }, _requestId_initializers, _requestId_extraInitializers);
        __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: function (obj) { return "sessionId" in obj; }, get: function (obj) { return obj.sessionId; }, set: function (obj, value) { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
        __esDecorate(null, null, _origin_decorators, { kind: "field", name: "origin", static: false, private: false, access: { has: function (obj) { return "origin" in obj; }, get: function (obj) { return obj.origin; }, set: function (obj, value) { obj.origin = value; } }, metadata: _metadata }, _origin_initializers, _origin_extraInitializers);
        __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: function (obj) { return "timestamp" in obj; }, get: function (obj) { return obj.timestamp; }, set: function (obj, value) { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _securityContext_decorators, { kind: "field", name: "securityContext", static: false, private: false, access: { has: function (obj) { return "securityContext" in obj; }, get: function (obj) { return obj.securityContext; }, set: function (obj, value) { obj.securityContext = value; } }, metadata: _metadata }, _securityContext_initializers, _securityContext_extraInitializers);
        __esDecorate(null, null, _complianceMetadata_decorators, { kind: "field", name: "complianceMetadata", static: false, private: false, access: { has: function (obj) { return "complianceMetadata" in obj; }, get: function (obj) { return obj.complianceMetadata; }, set: function (obj, value) { obj.complianceMetadata = value; } }, metadata: _metadata }, _complianceMetadata_initializers, _complianceMetadata_extraInitializers);
        __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: function (obj) { return "error" in obj; }, get: function (obj) { return obj.error; }, set: function (obj, value) { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _riskAssessment_decorators, { kind: "field", name: "riskAssessment", static: false, private: false, access: { has: function (obj) { return "riskAssessment" in obj; }, get: function (obj) { return obj.riskAssessment; }, set: function (obj, value) { obj.riskAssessment = value; } }, metadata: _metadata }, _riskAssessment_initializers, _riskAssessment_extraInitializers);
        __esDecorate(null, null, _businessContext_decorators, { kind: "field", name: "businessContext", static: false, private: false, access: { has: function (obj) { return "businessContext" in obj; }, get: function (obj) { return obj.businessContext; }, set: function (obj, value) { obj.businessContext = value; } }, metadata: _metadata }, _businessContext_initializers, _businessContext_extraInitializers);
        __esDecorate(null, null, _systemContext_decorators, { kind: "field", name: "systemContext", static: false, private: false, access: { has: function (obj) { return "systemContext" in obj; }, get: function (obj) { return obj.systemContext; }, set: function (obj, value) { obj.systemContext = value; } }, metadata: _metadata }, _systemContext_initializers, _systemContext_extraInitializers);
        __esDecorate(null, null, _lastModified_decorators, { kind: "field", name: "lastModified", static: false, private: false, access: { has: function (obj) { return "lastModified" in obj; }, get: function (obj) { return obj.lastModified; }, set: function (obj, value) { obj.lastModified = value; } }, metadata: _metadata }, _lastModified_initializers, _lastModified_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _archived_decorators, { kind: "field", name: "archived", static: false, private: false, access: { has: function (obj) { return "archived" in obj; }, get: function (obj) { return obj.archived; }, set: function (obj, value) { obj.archived = value; } }, metadata: _metadata }, _archived_initializers, _archived_extraInitializers);
        __esDecorate(null, null, _archivedAt_decorators, { kind: "field", name: "archivedAt", static: false, private: false, access: { has: function (obj) { return "archivedAt" in obj; }, get: function (obj) { return obj.archivedAt; }, set: function (obj, value) { obj.archivedAt = value; } }, metadata: _metadata }, _archivedAt_initializers, _archivedAt_extraInitializers);
        __esDecorate(null, null, _redacted_decorators, { kind: "field", name: "redacted", static: false, private: false, access: { has: function (obj) { return "redacted" in obj; }, get: function (obj) { return obj.redacted; }, set: function (obj, value) { obj.redacted = value; } }, metadata: _metadata }, _redacted_initializers, _redacted_extraInitializers);
        __esDecorate(null, null, _redactedAt_decorators, { kind: "field", name: "redactedAt", static: false, private: false, access: { has: function (obj) { return "redactedAt" in obj; }, get: function (obj) { return obj.redactedAt; }, set: function (obj, value) { obj.redactedAt = value; } }, metadata: _metadata }, _redactedAt_initializers, _redactedAt_extraInitializers);
        __esDecorate(null, null, _customMetadata_decorators, { kind: "field", name: "customMetadata", static: false, private: false, access: { has: function (obj) { return "customMetadata" in obj; }, get: function (obj) { return obj.customMetadata; }, set: function (obj, value) { obj.customMetadata = value; } }, metadata: _metadata }, _customMetadata_initializers, _customMetadata_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditLog = _classThis;
}();
exports.AuditLog = AuditLog;
//# sourceMappingURL=audit-log.entity.js.map