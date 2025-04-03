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
exports.Domain = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
var domain_status_enum_1 = require("../enums/domain-status.enum");
var Domain = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('domains')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _verificationStatus_decorators;
    var _verificationStatus_initializers = [];
    var _verificationStatus_extraInitializers = [];
    var _verificationTokens_decorators;
    var _verificationTokens_initializers = [];
    var _verificationTokens_extraInitializers = [];
    var _dnsRecords_decorators;
    var _dnsRecords_initializers = [];
    var _dnsRecords_extraInitializers = [];
    var _verifiedAt_decorators;
    var _verifiedAt_initializers = [];
    var _verifiedAt_extraInitializers = [];
    var _verificationDetails_decorators;
    var _verificationDetails_initializers = [];
    var _verificationDetails_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    var _isPrimary_decorators;
    var _isPrimary_initializers = [];
    var _isPrimary_extraInitializers = [];
    var _dnsConfiguration_decorators;
    var _dnsConfiguration_initializers = [];
    var _dnsConfiguration_extraInitializers = [];
    var _settings_decorators;
    var _settings_initializers = [];
    var _settings_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _renewalDate_decorators;
    var _renewalDate_initializers = [];
    var _renewalDate_extraInitializers = [];
    var _isExpired_decorators;
    var _isExpired_initializers = [];
    var _isExpired_extraInitializers = [];
    var _isLocked_decorators;
    var _isLocked_initializers = [];
    var _isLocked_extraInitializers = [];
    var _registrarInfo_decorators;
    var _registrarInfo_initializers = [];
    var _registrarInfo_extraInitializers = [];
    var _sslCertificate_decorators;
    var _sslCertificate_initializers = [];
    var _sslCertificate_extraInitializers = [];
    var _monitoring_decorators;
    var _monitoring_initializers = [];
    var _monitoring_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _usage_decorators;
    var _usage_initializers = [];
    var _usage_extraInitializers = [];
    var _securitySettings_decorators;
    var _securitySettings_initializers = [];
    var _securitySettings_extraInitializers = [];
    var _compliance_decorators;
    var _compliance_initializers = [];
    var _compliance_extraInitializers = [];
    var _analytics_decorators;
    var _analytics_initializers = [];
    var _analytics_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
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
    var _isDeleted_decorators;
    var _isDeleted_initializers = [];
    var _isDeleted_extraInitializers = [];
    var _deletedBy_decorators;
    var _deletedBy_initializers = [];
    var _deletedBy_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _history_decorators;
    var _history_initializers = [];
    var _history_extraInitializers = [];
    var Domain = _classThis = /** @class */ (function () {
        function Domain_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.organizationId = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.status = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.verificationStatus = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _verificationStatus_initializers, void 0));
            // Use string literal to break circular dependency
            this.verificationTokens = (__runInitializers(this, _verificationStatus_extraInitializers), __runInitializers(this, _verificationTokens_initializers, void 0)); // Use any[] instead of specific type
            this.dnsRecords = (__runInitializers(this, _verificationTokens_extraInitializers), __runInitializers(this, _dnsRecords_initializers, void 0));
            this.verifiedAt = (__runInitializers(this, _dnsRecords_extraInitializers), __runInitializers(this, _verifiedAt_initializers, void 0));
            this.verificationDetails = (__runInitializers(this, _verifiedAt_extraInitializers), __runInitializers(this, _verificationDetails_initializers, void 0));
            this.isDefault = (__runInitializers(this, _verificationDetails_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
            this.isPrimary = (__runInitializers(this, _isDefault_extraInitializers), __runInitializers(this, _isPrimary_initializers, void 0));
            this.dnsConfiguration = (__runInitializers(this, _isPrimary_extraInitializers), __runInitializers(this, _dnsConfiguration_initializers, void 0));
            this.settings = (__runInitializers(this, _dnsConfiguration_extraInitializers), __runInitializers(this, _settings_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _settings_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.renewalDate = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _renewalDate_initializers, void 0));
            this.isExpired = (__runInitializers(this, _renewalDate_extraInitializers), __runInitializers(this, _isExpired_initializers, void 0));
            this.isLocked = (__runInitializers(this, _isExpired_extraInitializers), __runInitializers(this, _isLocked_initializers, void 0));
            this.registrarInfo = (__runInitializers(this, _isLocked_extraInitializers), __runInitializers(this, _registrarInfo_initializers, void 0));
            this.sslCertificate = (__runInitializers(this, _registrarInfo_extraInitializers), __runInitializers(this, _sslCertificate_initializers, void 0));
            this.monitoring = (__runInitializers(this, _sslCertificate_extraInitializers), __runInitializers(this, _monitoring_initializers, void 0));
            this.tags = (__runInitializers(this, _monitoring_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.usage = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _usage_initializers, void 0));
            this.securitySettings = (__runInitializers(this, _usage_extraInitializers), __runInitializers(this, _securitySettings_initializers, void 0));
            this.compliance = (__runInitializers(this, _securitySettings_extraInitializers), __runInitializers(this, _compliance_initializers, void 0));
            this.analytics = (__runInitializers(this, _compliance_extraInitializers), __runInitializers(this, _analytics_initializers, void 0));
            this.notes = (__runInitializers(this, _analytics_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.createdAt = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.createdBy = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.isDeleted = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _isDeleted_initializers, void 0));
            this.deletedBy = (__runInitializers(this, _isDeleted_extraInitializers), __runInitializers(this, _deletedBy_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _deletedBy_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            this.history = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _history_initializers, void 0));
            __runInitializers(this, _history_extraInitializers);
        }
        Domain_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, status: { required: true, enum: require("../enums/domain-status.enum").DomainStatus }, verificationStatus: { required: true, enum: require("../enums/domain-verification-status.enum").DomainVerificationStatus }, verificationTokens: { required: true, type: function () { return [Object]; } }, dnsRecords: { required: true, type: function () { return [Object]; } }, verifiedAt: { required: false, type: function () { return Date; } }, verificationDetails: { required: false, type: function () { return ({ method: { required: true, type: function () { return String; } }, value: { required: true, type: function () { return String; } }, checkedAt: { required: true, type: function () { return Date; } }, attempts: { required: true, type: function () { return Number; } }, lastAttemptAt: { required: false, type: function () { return Date; } }, error: { required: false, type: function () { return String; } } }); } }, isDefault: { required: true, type: function () { return Boolean; } }, isPrimary: { required: true, type: function () { return Boolean; } }, dnsConfiguration: { required: false, type: function () { return ({ mx: { required: false, type: function () { return ({ records: { required: true, type: function () { return [String]; } }, verified: { required: true, type: function () { return Boolean; } }, lastChecked: { required: false, type: function () { return Date; } } }); } }, spf: { required: false, type: function () { return ({ record: { required: true, type: function () { return String; } }, verified: { required: true, type: function () { return Boolean; } }, lastChecked: { required: false, type: function () { return Date; } } }); } }, dkim: { required: false, type: function () { return ({ selector: { required: true, type: function () { return String; } }, publicKey: { required: true, type: function () { return String; } }, verified: { required: true, type: function () { return Boolean; } }, lastChecked: { required: false, type: function () { return Date; } } }); } }, dmarc: { required: false, type: function () { return ({ record: { required: true, type: function () { return String; } }, verified: { required: true, type: function () { return Boolean; } }, lastChecked: { required: false, type: function () { return Date; } } }); } } }); } }, settings: { required: false, type: function () { return ({ customNameservers: { required: false, type: function () { return [String]; } }, autoRenew: { required: false, type: function () { return Boolean; } }, lockEnabled: { required: false, type: function () { return Boolean; } }, privacyEnabled: { required: false, type: function () { return Boolean; } }, emailForwarding: { required: false, type: function () { return ({ enabled: { required: true, type: function () { return Boolean; } }, rules: { required: false } }); } } }); } }, expiresAt: { required: false, type: function () { return Date; } }, renewalDate: { required: false, type: function () { return Date; } }, isExpired: { required: true, type: function () { return Boolean; } }, isLocked: { required: true, type: function () { return Boolean; } }, registrarInfo: { required: false, type: function () { return ({ registrar: { required: true, type: function () { return String; } }, registrarId: { required: false, type: function () { return String; } }, whoisServer: { required: false, type: function () { return String; } }, referralUrl: { required: false, type: function () { return String; } }, createdDate: { required: false, type: function () { return Date; } }, updatedDate: { required: false, type: function () { return Date; } }, registrantContact: { required: false, type: function () { return ({ name: { required: false, type: function () { return String; } }, organization: { required: false, type: function () { return String; } }, email: { required: false, type: function () { return String; } }, phone: { required: false, type: function () { return String; } } }); } } }); } }, sslCertificate: { required: false, type: function () { return ({ provider: { required: false, type: function () { return String; } }, issuer: { required: false, type: function () { return String; } }, validFrom: { required: false, type: function () { return Date; } }, validTo: { required: false, type: function () { return Date; } }, type: { required: false, type: function () { return String; } }, status: { required: false, type: function () { return String; } }, autoRenew: { required: false, type: function () { return Boolean; } }, lastRenewal: { required: false, type: function () { return Date; } } }); } }, monitoring: { required: false, type: function () { return ({ enabled: { required: true, type: function () { return Boolean; } }, lastCheck: { required: false, type: function () { return Date; } }, status: { required: false, type: function () { return String; } }, uptime: { required: false, type: function () { return Number; } }, alerts: { required: false, type: function () { return ({ email: { required: false, type: function () { return [String]; } }, webhook: { required: false, type: function () { return [String]; } } }); } } }); } }, tags: { required: false, type: function () { return [String]; } }, usage: { required: false, type: function () { return ({ emailEnabled: { required: false, type: function () { return Boolean; } }, webEnabled: { required: false, type: function () { return Boolean; } }, services: { required: false, type: function () { return [String]; } } }); } }, securitySettings: { required: false, type: function () { return ({ transferLock: { required: false, type: function () { return Boolean; } }, registrarLock: { required: false, type: function () { return Boolean; } }, dnssec: { required: false, type: function () { return ({ enabled: { required: true, type: function () { return Boolean; } }, keys: { required: false, type: function () { return [String]; } } }); } }, twoFactorAuth: { required: false, type: function () { return Boolean; } } }); } }, compliance: { required: false, type: function () { return ({ gdpr: { required: false, type: function () { return ({ compliant: { required: true, type: function () { return Boolean; } }, lastCheck: { required: false, type: function () { return Date; } }, issues: { required: false, type: function () { return [String]; } } }); } }, privacyShield: { required: false, type: function () { return Boolean; } }, industryStandards: { required: false, type: function () { return [String]; } } }); } }, analytics: { required: false, type: function () { return ({ lastUpdated: { required: false, type: function () { return Date; } }, metrics: { required: false, type: function () { return ({ emailVolume: { required: false, type: function () { return Number; } }, webTraffic: { required: false, type: function () { return Number; } }, bounceRate: { required: false, type: function () { return Number; } } }); } } }); } }, notes: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, createdBy: { required: false, type: function () { return String; } }, updatedBy: { required: false, type: function () { return String; } }, isDeleted: { required: true, type: function () { return Boolean; } }, deletedBy: { required: false, type: function () { return String; } }, deletedAt: { required: false, type: function () { return Date; } }, history: { required: false } };
        };
        return Domain_1;
    }());
    __setFunctionName(_classThis, "Domain");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)({ unique: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: domain_status_enum_1.DomainStatus,
                default: domain_status_enum_1.DomainStatus.PENDING
            }), (0, typeorm_1.Index)()];
        _verificationStatus_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: domain_verification_status_enum_1.DomainVerificationStatus,
                default: domain_verification_status_enum_1.DomainVerificationStatus.PENDING
            }), (0, typeorm_1.Index)()];
        _verificationTokens_decorators = [(0, typeorm_1.OneToMany)('DomainVerificationToken', 'domain')];
        _dnsRecords_decorators = [(0, typeorm_1.OneToMany)('DnsRecord', 'domain')];
        _verifiedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _verificationDetails_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isDefault_decorators = [(0, typeorm_1.Column)('boolean', { default: true })];
        _isPrimary_decorators = [(0, typeorm_1.Column)('boolean', { default: false })];
        _dnsConfiguration_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _settings_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _expiresAt_decorators = [(0, typeorm_1.Column)('date', { nullable: true })];
        _renewalDate_decorators = [(0, typeorm_1.Column)('date', { nullable: true })];
        _isExpired_decorators = [(0, typeorm_1.Column)('boolean', { default: false }), (0, typeorm_1.Index)()];
        _isLocked_decorators = [(0, typeorm_1.Column)('boolean', { default: false }), (0, typeorm_1.Index)()];
        _registrarInfo_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _sslCertificate_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _monitoring_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)('text', { array: true, nullable: true }), (0, typeorm_1.Index)()];
        _usage_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _securitySettings_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _compliance_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _analytics_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _createdBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _updatedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _isDeleted_decorators = [(0, typeorm_1.Column)('boolean', { default: false }), (0, typeorm_1.Index)()];
        _deletedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _deletedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _history_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _verificationStatus_decorators, { kind: "field", name: "verificationStatus", static: false, private: false, access: { has: function (obj) { return "verificationStatus" in obj; }, get: function (obj) { return obj.verificationStatus; }, set: function (obj, value) { obj.verificationStatus = value; } }, metadata: _metadata }, _verificationStatus_initializers, _verificationStatus_extraInitializers);
        __esDecorate(null, null, _verificationTokens_decorators, { kind: "field", name: "verificationTokens", static: false, private: false, access: { has: function (obj) { return "verificationTokens" in obj; }, get: function (obj) { return obj.verificationTokens; }, set: function (obj, value) { obj.verificationTokens = value; } }, metadata: _metadata }, _verificationTokens_initializers, _verificationTokens_extraInitializers);
        __esDecorate(null, null, _dnsRecords_decorators, { kind: "field", name: "dnsRecords", static: false, private: false, access: { has: function (obj) { return "dnsRecords" in obj; }, get: function (obj) { return obj.dnsRecords; }, set: function (obj, value) { obj.dnsRecords = value; } }, metadata: _metadata }, _dnsRecords_initializers, _dnsRecords_extraInitializers);
        __esDecorate(null, null, _verifiedAt_decorators, { kind: "field", name: "verifiedAt", static: false, private: false, access: { has: function (obj) { return "verifiedAt" in obj; }, get: function (obj) { return obj.verifiedAt; }, set: function (obj, value) { obj.verifiedAt = value; } }, metadata: _metadata }, _verifiedAt_initializers, _verifiedAt_extraInitializers);
        __esDecorate(null, null, _verificationDetails_decorators, { kind: "field", name: "verificationDetails", static: false, private: false, access: { has: function (obj) { return "verificationDetails" in obj; }, get: function (obj) { return obj.verificationDetails; }, set: function (obj, value) { obj.verificationDetails = value; } }, metadata: _metadata }, _verificationDetails_initializers, _verificationDetails_extraInitializers);
        __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
        __esDecorate(null, null, _isPrimary_decorators, { kind: "field", name: "isPrimary", static: false, private: false, access: { has: function (obj) { return "isPrimary" in obj; }, get: function (obj) { return obj.isPrimary; }, set: function (obj, value) { obj.isPrimary = value; } }, metadata: _metadata }, _isPrimary_initializers, _isPrimary_extraInitializers);
        __esDecorate(null, null, _dnsConfiguration_decorators, { kind: "field", name: "dnsConfiguration", static: false, private: false, access: { has: function (obj) { return "dnsConfiguration" in obj; }, get: function (obj) { return obj.dnsConfiguration; }, set: function (obj, value) { obj.dnsConfiguration = value; } }, metadata: _metadata }, _dnsConfiguration_initializers, _dnsConfiguration_extraInitializers);
        __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: function (obj) { return "settings" in obj; }, get: function (obj) { return obj.settings; }, set: function (obj, value) { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _renewalDate_decorators, { kind: "field", name: "renewalDate", static: false, private: false, access: { has: function (obj) { return "renewalDate" in obj; }, get: function (obj) { return obj.renewalDate; }, set: function (obj, value) { obj.renewalDate = value; } }, metadata: _metadata }, _renewalDate_initializers, _renewalDate_extraInitializers);
        __esDecorate(null, null, _isExpired_decorators, { kind: "field", name: "isExpired", static: false, private: false, access: { has: function (obj) { return "isExpired" in obj; }, get: function (obj) { return obj.isExpired; }, set: function (obj, value) { obj.isExpired = value; } }, metadata: _metadata }, _isExpired_initializers, _isExpired_extraInitializers);
        __esDecorate(null, null, _isLocked_decorators, { kind: "field", name: "isLocked", static: false, private: false, access: { has: function (obj) { return "isLocked" in obj; }, get: function (obj) { return obj.isLocked; }, set: function (obj, value) { obj.isLocked = value; } }, metadata: _metadata }, _isLocked_initializers, _isLocked_extraInitializers);
        __esDecorate(null, null, _registrarInfo_decorators, { kind: "field", name: "registrarInfo", static: false, private: false, access: { has: function (obj) { return "registrarInfo" in obj; }, get: function (obj) { return obj.registrarInfo; }, set: function (obj, value) { obj.registrarInfo = value; } }, metadata: _metadata }, _registrarInfo_initializers, _registrarInfo_extraInitializers);
        __esDecorate(null, null, _sslCertificate_decorators, { kind: "field", name: "sslCertificate", static: false, private: false, access: { has: function (obj) { return "sslCertificate" in obj; }, get: function (obj) { return obj.sslCertificate; }, set: function (obj, value) { obj.sslCertificate = value; } }, metadata: _metadata }, _sslCertificate_initializers, _sslCertificate_extraInitializers);
        __esDecorate(null, null, _monitoring_decorators, { kind: "field", name: "monitoring", static: false, private: false, access: { has: function (obj) { return "monitoring" in obj; }, get: function (obj) { return obj.monitoring; }, set: function (obj, value) { obj.monitoring = value; } }, metadata: _metadata }, _monitoring_initializers, _monitoring_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _usage_decorators, { kind: "field", name: "usage", static: false, private: false, access: { has: function (obj) { return "usage" in obj; }, get: function (obj) { return obj.usage; }, set: function (obj, value) { obj.usage = value; } }, metadata: _metadata }, _usage_initializers, _usage_extraInitializers);
        __esDecorate(null, null, _securitySettings_decorators, { kind: "field", name: "securitySettings", static: false, private: false, access: { has: function (obj) { return "securitySettings" in obj; }, get: function (obj) { return obj.securitySettings; }, set: function (obj, value) { obj.securitySettings = value; } }, metadata: _metadata }, _securitySettings_initializers, _securitySettings_extraInitializers);
        __esDecorate(null, null, _compliance_decorators, { kind: "field", name: "compliance", static: false, private: false, access: { has: function (obj) { return "compliance" in obj; }, get: function (obj) { return obj.compliance; }, set: function (obj, value) { obj.compliance = value; } }, metadata: _metadata }, _compliance_initializers, _compliance_extraInitializers);
        __esDecorate(null, null, _analytics_decorators, { kind: "field", name: "analytics", static: false, private: false, access: { has: function (obj) { return "analytics" in obj; }, get: function (obj) { return obj.analytics; }, set: function (obj, value) { obj.analytics = value; } }, metadata: _metadata }, _analytics_initializers, _analytics_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: function (obj) { return "isDeleted" in obj; }, get: function (obj) { return obj.isDeleted; }, set: function (obj, value) { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _isDeleted_extraInitializers);
        __esDecorate(null, null, _deletedBy_decorators, { kind: "field", name: "deletedBy", static: false, private: false, access: { has: function (obj) { return "deletedBy" in obj; }, get: function (obj) { return obj.deletedBy; }, set: function (obj, value) { obj.deletedBy = value; } }, metadata: _metadata }, _deletedBy_initializers, _deletedBy_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _history_decorators, { kind: "field", name: "history", static: false, private: false, access: { has: function (obj) { return "history" in obj; }, get: function (obj) { return obj.history; }, set: function (obj, value) { obj.history = value; } }, metadata: _metadata }, _history_initializers, _history_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Domain = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Domain = _classThis;
}();
exports.Domain = Domain;
//# sourceMappingURL=domain.entity.js.map