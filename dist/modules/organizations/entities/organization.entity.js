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
exports.Organization = exports.OrganizationStatus = exports.SubscriptionTier = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var ticket_entity_1 = require("../../tickets/entities/ticket.entity");
var SubscriptionTier;
(function (SubscriptionTier) {
    SubscriptionTier["FREE"] = "FREE";
    SubscriptionTier["BASIC"] = "BASIC";
    SubscriptionTier["PROFESSIONAL"] = "PROFESSIONAL";
    SubscriptionTier["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionTier || (exports.SubscriptionTier = SubscriptionTier = {}));
var OrganizationStatus;
(function (OrganizationStatus) {
    OrganizationStatus["ACTIVE"] = "ACTIVE";
    OrganizationStatus["SUSPENDED"] = "SUSPENDED";
    OrganizationStatus["PENDING"] = "PENDING";
})(OrganizationStatus || (exports.OrganizationStatus = OrganizationStatus = {}));
var Organization = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('organizations'), (0, typeorm_1.Index)(['domain'])];
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
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _logo_decorators;
    var _logo_initializers = [];
    var _logo_extraInitializers = [];
    var _domain_decorators;
    var _domain_initializers = [];
    var _domain_extraInitializers = [];
    var _isDomainVerified_decorators;
    var _isDomainVerified_initializers = [];
    var _isDomainVerified_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _subscriptionTier_decorators;
    var _subscriptionTier_initializers = [];
    var _subscriptionTier_extraInitializers = [];
    var _subscriptionStartDate_decorators;
    var _subscriptionStartDate_initializers = [];
    var _subscriptionStartDate_extraInitializers = [];
    var _subscriptionEndDate_decorators;
    var _subscriptionEndDate_initializers = [];
    var _subscriptionEndDate_extraInitializers = [];
    var _isSubscriptionActive_decorators;
    var _isSubscriptionActive_initializers = [];
    var _isSubscriptionActive_extraInitializers = [];
    var _settings_decorators;
    var _settings_initializers = [];
    var _settings_extraInitializers = [];
    var _maxUsers_decorators;
    var _maxUsers_initializers = [];
    var _maxUsers_extraInitializers = [];
    var _maxStorage_decorators;
    var _maxStorage_initializers = [];
    var _maxStorage_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _users_decorators;
    var _users_initializers = [];
    var _users_extraInitializers = [];
    var _tickets_decorators;
    var _tickets_initializers = [];
    var _tickets_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _contactInfo_decorators;
    var _contactInfo_initializers = [];
    var _contactInfo_extraInitializers = [];
    var _allowedDomains_decorators;
    var _allowedDomains_initializers = [];
    var _allowedDomains_extraInitializers = [];
    var _isEmailVerificationRequired_decorators;
    var _isEmailVerificationRequired_initializers = [];
    var _isEmailVerificationRequired_extraInitializers = [];
    var _isTwoFactorAuthRequired_decorators;
    var _isTwoFactorAuthRequired_initializers = [];
    var _isTwoFactorAuthRequired_extraInitializers = [];
    var _auditConfig_decorators;
    var _auditConfig_initializers = [];
    var _auditConfig_extraInitializers = [];
    var Organization = _classThis = /** @class */ (function () {
        function Organization_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.slug = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.logo = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _logo_initializers, void 0));
            this.domain = (__runInitializers(this, _logo_extraInitializers), __runInitializers(this, _domain_initializers, void 0));
            this.isDomainVerified = (__runInitializers(this, _domain_extraInitializers), __runInitializers(this, _isDomainVerified_initializers, void 0));
            this.status = (__runInitializers(this, _isDomainVerified_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.subscriptionTier = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _subscriptionTier_initializers, void 0));
            this.subscriptionStartDate = (__runInitializers(this, _subscriptionTier_extraInitializers), __runInitializers(this, _subscriptionStartDate_initializers, void 0));
            this.subscriptionEndDate = (__runInitializers(this, _subscriptionStartDate_extraInitializers), __runInitializers(this, _subscriptionEndDate_initializers, void 0));
            this.isSubscriptionActive = (__runInitializers(this, _subscriptionEndDate_extraInitializers), __runInitializers(this, _isSubscriptionActive_initializers, void 0));
            this.settings = (__runInitializers(this, _isSubscriptionActive_extraInitializers), __runInitializers(this, _settings_initializers, void 0));
            this.maxUsers = (__runInitializers(this, _settings_extraInitializers), __runInitializers(this, _maxUsers_initializers, void 0));
            this.maxStorage = (__runInitializers(this, _maxUsers_extraInitializers), __runInitializers(this, _maxStorage_initializers, void 0)); // in MB
            this.createdById = (__runInitializers(this, _maxStorage_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdBy = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            // Relationships
            this.users = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _users_initializers, void 0));
            this.tickets = (__runInitializers(this, _users_extraInitializers), __runInitializers(this, _tickets_initializers, void 0));
            // Timestamps
            this.createdAt = (__runInitializers(this, _tickets_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Additional metadata columns
            this.metadata = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.contactInfo = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _contactInfo_initializers, void 0));
            this.allowedDomains = (__runInitializers(this, _contactInfo_extraInitializers), __runInitializers(this, _allowedDomains_initializers, void 0));
            this.isEmailVerificationRequired = (__runInitializers(this, _allowedDomains_extraInitializers), __runInitializers(this, _isEmailVerificationRequired_initializers, void 0));
            this.isTwoFactorAuthRequired = (__runInitializers(this, _isEmailVerificationRequired_extraInitializers), __runInitializers(this, _isTwoFactorAuthRequired_initializers, void 0));
            // Audit columns
            this.auditConfig = (__runInitializers(this, _isTwoFactorAuthRequired_extraInitializers), __runInitializers(this, _auditConfig_initializers, void 0));
            __runInitializers(this, _auditConfig_extraInitializers);
        }
        Organization_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, slug: { required: true, type: function () { return String; } }, logo: { required: true, type: function () { return String; } }, domain: { required: true, type: function () { return String; } }, isDomainVerified: { required: true, type: function () { return Boolean; } }, status: { required: true, enum: require("./organization.entity").OrganizationStatus }, subscriptionTier: { required: true, enum: require("./organization.entity").SubscriptionTier }, subscriptionStartDate: { required: true, type: function () { return Date; } }, subscriptionEndDate: { required: true, type: function () { return Date; } }, isSubscriptionActive: { required: true, type: function () { return Boolean; } }, settings: { required: true, type: function () { return ({ ticketPriorities: { required: false, type: function () { return [String]; } }, ticketCategories: { required: false, type: function () { return [String]; } }, customFields: { required: false, type: function () { return [Object]; } }, notificationSettings: { required: false, type: function () { return Object; } }, brandingSettings: { required: false, type: function () { return Object; } } }); } }, maxUsers: { required: true, type: function () { return Number; } }, maxStorage: { required: true, type: function () { return Number; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: true, type: function () { return String; } }, createdBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, users: { required: true, type: function () { return [require("../../users/entities/user.entity").User]; } }, tickets: { required: true, type: function () { return [require("../../tickets/entities/ticket.entity").Ticket]; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: true, type: function () { return Date; } }, metadata: { required: true, type: function () { return ({ industry: { required: false, type: function () { return String; } }, size: { required: false, type: function () { return String; } }, location: { required: false, type: function () { return String; } }, timezone: { required: false, type: function () { return String; } }, customAttributes: { required: false, type: function () { return Object; } } }); } }, contactInfo: { required: true, type: function () { return ({ email: { required: false, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, address: { required: false, type: function () { return ({ street: { required: false, type: function () { return String; } }, city: { required: false, type: function () { return String; } }, state: { required: false, type: function () { return String; } }, country: { required: false, type: function () { return String; } }, postalCode: { required: false, type: function () { return String; } } }); } } }); } }, allowedDomains: { required: true, type: function () { return [String]; } }, isEmailVerificationRequired: { required: true, type: function () { return Boolean; } }, isTwoFactorAuthRequired: { required: true, type: function () { return Boolean; } }, auditConfig: { required: true, type: function () { return ({ enableAuditLog: { required: false, type: function () { return Boolean; } }, retentionPeriod: { required: false, type: function () { return Number; } }, logLevel: { required: false, type: function () { return String; } } }); } } };
        };
        return Organization_1;
    }());
    __setFunctionName(_classThis, "Organization");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _description_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _slug_decorators = [(0, typeorm_1.Column)({ length: 100, unique: true }), (0, typeorm_1.Index)()];
        _logo_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _domain_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
        _isDomainVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: OrganizationStatus,
                default: OrganizationStatus.PENDING
            })];
        _subscriptionTier_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: SubscriptionTier,
                default: SubscriptionTier.FREE
            })];
        _subscriptionStartDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _subscriptionEndDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _isSubscriptionActive_decorators = [(0, typeorm_1.Column)({ default: false })];
        _settings_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _maxUsers_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _maxStorage_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _users_decorators = [(0, typeorm_1.OneToMany)(function () { return user_entity_1.User; }, function (user) { return user.organization; }, { lazy: true })];
        _tickets_decorators = [(0, typeorm_1.OneToMany)(function () { return ticket_entity_1.Ticket; }, function (ticket) { return ticket.organization; }, { lazy: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _contactInfo_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _allowedDomains_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _isEmailVerificationRequired_decorators = [(0, typeorm_1.Column)({ default: true })];
        _isTwoFactorAuthRequired_decorators = [(0, typeorm_1.Column)({ default: false })];
        _auditConfig_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _logo_decorators, { kind: "field", name: "logo", static: false, private: false, access: { has: function (obj) { return "logo" in obj; }, get: function (obj) { return obj.logo; }, set: function (obj, value) { obj.logo = value; } }, metadata: _metadata }, _logo_initializers, _logo_extraInitializers);
        __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: function (obj) { return "domain" in obj; }, get: function (obj) { return obj.domain; }, set: function (obj, value) { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
        __esDecorate(null, null, _isDomainVerified_decorators, { kind: "field", name: "isDomainVerified", static: false, private: false, access: { has: function (obj) { return "isDomainVerified" in obj; }, get: function (obj) { return obj.isDomainVerified; }, set: function (obj, value) { obj.isDomainVerified = value; } }, metadata: _metadata }, _isDomainVerified_initializers, _isDomainVerified_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _subscriptionTier_decorators, { kind: "field", name: "subscriptionTier", static: false, private: false, access: { has: function (obj) { return "subscriptionTier" in obj; }, get: function (obj) { return obj.subscriptionTier; }, set: function (obj, value) { obj.subscriptionTier = value; } }, metadata: _metadata }, _subscriptionTier_initializers, _subscriptionTier_extraInitializers);
        __esDecorate(null, null, _subscriptionStartDate_decorators, { kind: "field", name: "subscriptionStartDate", static: false, private: false, access: { has: function (obj) { return "subscriptionStartDate" in obj; }, get: function (obj) { return obj.subscriptionStartDate; }, set: function (obj, value) { obj.subscriptionStartDate = value; } }, metadata: _metadata }, _subscriptionStartDate_initializers, _subscriptionStartDate_extraInitializers);
        __esDecorate(null, null, _subscriptionEndDate_decorators, { kind: "field", name: "subscriptionEndDate", static: false, private: false, access: { has: function (obj) { return "subscriptionEndDate" in obj; }, get: function (obj) { return obj.subscriptionEndDate; }, set: function (obj, value) { obj.subscriptionEndDate = value; } }, metadata: _metadata }, _subscriptionEndDate_initializers, _subscriptionEndDate_extraInitializers);
        __esDecorate(null, null, _isSubscriptionActive_decorators, { kind: "field", name: "isSubscriptionActive", static: false, private: false, access: { has: function (obj) { return "isSubscriptionActive" in obj; }, get: function (obj) { return obj.isSubscriptionActive; }, set: function (obj, value) { obj.isSubscriptionActive = value; } }, metadata: _metadata }, _isSubscriptionActive_initializers, _isSubscriptionActive_extraInitializers);
        __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: function (obj) { return "settings" in obj; }, get: function (obj) { return obj.settings; }, set: function (obj, value) { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
        __esDecorate(null, null, _maxUsers_decorators, { kind: "field", name: "maxUsers", static: false, private: false, access: { has: function (obj) { return "maxUsers" in obj; }, get: function (obj) { return obj.maxUsers; }, set: function (obj, value) { obj.maxUsers = value; } }, metadata: _metadata }, _maxUsers_initializers, _maxUsers_extraInitializers);
        __esDecorate(null, null, _maxStorage_decorators, { kind: "field", name: "maxStorage", static: false, private: false, access: { has: function (obj) { return "maxStorage" in obj; }, get: function (obj) { return obj.maxStorage; }, set: function (obj, value) { obj.maxStorage = value; } }, metadata: _metadata }, _maxStorage_initializers, _maxStorage_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: function (obj) { return "users" in obj; }, get: function (obj) { return obj.users; }, set: function (obj, value) { obj.users = value; } }, metadata: _metadata }, _users_initializers, _users_extraInitializers);
        __esDecorate(null, null, _tickets_decorators, { kind: "field", name: "tickets", static: false, private: false, access: { has: function (obj) { return "tickets" in obj; }, get: function (obj) { return obj.tickets; }, set: function (obj, value) { obj.tickets = value; } }, metadata: _metadata }, _tickets_initializers, _tickets_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _contactInfo_decorators, { kind: "field", name: "contactInfo", static: false, private: false, access: { has: function (obj) { return "contactInfo" in obj; }, get: function (obj) { return obj.contactInfo; }, set: function (obj, value) { obj.contactInfo = value; } }, metadata: _metadata }, _contactInfo_initializers, _contactInfo_extraInitializers);
        __esDecorate(null, null, _allowedDomains_decorators, { kind: "field", name: "allowedDomains", static: false, private: false, access: { has: function (obj) { return "allowedDomains" in obj; }, get: function (obj) { return obj.allowedDomains; }, set: function (obj, value) { obj.allowedDomains = value; } }, metadata: _metadata }, _allowedDomains_initializers, _allowedDomains_extraInitializers);
        __esDecorate(null, null, _isEmailVerificationRequired_decorators, { kind: "field", name: "isEmailVerificationRequired", static: false, private: false, access: { has: function (obj) { return "isEmailVerificationRequired" in obj; }, get: function (obj) { return obj.isEmailVerificationRequired; }, set: function (obj, value) { obj.isEmailVerificationRequired = value; } }, metadata: _metadata }, _isEmailVerificationRequired_initializers, _isEmailVerificationRequired_extraInitializers);
        __esDecorate(null, null, _isTwoFactorAuthRequired_decorators, { kind: "field", name: "isTwoFactorAuthRequired", static: false, private: false, access: { has: function (obj) { return "isTwoFactorAuthRequired" in obj; }, get: function (obj) { return obj.isTwoFactorAuthRequired; }, set: function (obj, value) { obj.isTwoFactorAuthRequired = value; } }, metadata: _metadata }, _isTwoFactorAuthRequired_initializers, _isTwoFactorAuthRequired_extraInitializers);
        __esDecorate(null, null, _auditConfig_decorators, { kind: "field", name: "auditConfig", static: false, private: false, access: { has: function (obj) { return "auditConfig" in obj; }, get: function (obj) { return obj.auditConfig; }, set: function (obj, value) { obj.auditConfig = value; } }, metadata: _metadata }, _auditConfig_initializers, _auditConfig_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Organization = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Organization = _classThis;
}();
exports.Organization = Organization;
//# sourceMappingURL=organization.entity.js.map