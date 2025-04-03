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
exports.OrganizationQueryDto = exports.DateRangeDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var organization_entity_1 = require("../entities/organization.entity");
var DateRangeDto = function () {
    var _a;
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DateRangeDto() {
                this.startDate = __runInitializers(this, _startDate_initializers, void 0);
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                __runInitializers(this, _endDate_extraInitializers);
            }
            DateRangeDto._OPENAPI_METADATA_FACTORY = function () {
                return { startDate: { required: false, type: function () { return String; } }, endDate: { required: false, type: function () { return String; } } };
            };
            return DateRangeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DateRangeDto = DateRangeDto;
var OrganizationQueryDto = function () {
    var _a;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _subscriptionTier_decorators;
    var _subscriptionTier_initializers = [];
    var _subscriptionTier_extraInitializers = [];
    var _isDomainVerified_decorators;
    var _isDomainVerified_initializers = [];
    var _isDomainVerified_extraInitializers = [];
    var _isSubscriptionActive_decorators;
    var _isSubscriptionActive_initializers = [];
    var _isSubscriptionActive_extraInitializers = [];
    var _minUsers_decorators;
    var _minUsers_initializers = [];
    var _minUsers_extraInitializers = [];
    var _maxUsers_decorators;
    var _maxUsers_initializers = [];
    var _maxUsers_extraInitializers = [];
    var _storageUsagePercentage_decorators;
    var _storageUsagePercentage_initializers = [];
    var _storageUsagePercentage_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _subscriptionDate_decorators;
    var _subscriptionDate_initializers = [];
    var _subscriptionDate_extraInitializers = [];
    var _industries_decorators;
    var _industries_initializers = [];
    var _industries_extraInitializers = [];
    var _includeDeleted_decorators;
    var _includeDeleted_initializers = [];
    var _includeDeleted_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _timezone_decorators;
    var _timezone_initializers = [];
    var _timezone_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var _includeUsers_decorators;
    var _includeUsers_initializers = [];
    var _includeUsers_extraInitializers = [];
    var _includeSubscription_decorators;
    var _includeSubscription_initializers = [];
    var _includeSubscription_extraInitializers = [];
    var _includeStatistics_decorators;
    var _includeStatistics_initializers = [];
    var _includeStatistics_extraInitializers = [];
    var _includeAuditLogs_decorators;
    var _includeAuditLogs_initializers = [];
    var _includeAuditLogs_extraInitializers = [];
    return _a = /** @class */ (function () {
            function OrganizationQueryDto() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.status = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.subscriptionTier = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _subscriptionTier_initializers, void 0));
                this.isDomainVerified = (__runInitializers(this, _subscriptionTier_extraInitializers), __runInitializers(this, _isDomainVerified_initializers, void 0));
                this.isSubscriptionActive = (__runInitializers(this, _isDomainVerified_extraInitializers), __runInitializers(this, _isSubscriptionActive_initializers, void 0));
                this.minUsers = (__runInitializers(this, _isSubscriptionActive_extraInitializers), __runInitializers(this, _minUsers_initializers, void 0));
                this.maxUsers = (__runInitializers(this, _minUsers_extraInitializers), __runInitializers(this, _maxUsers_initializers, void 0));
                this.storageUsagePercentage = (__runInitializers(this, _maxUsers_extraInitializers), __runInitializers(this, _storageUsagePercentage_initializers, void 0));
                this.createdAt = (__runInitializers(this, _storageUsagePercentage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.subscriptionDate = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _subscriptionDate_initializers, void 0));
                this.industries = (__runInitializers(this, _subscriptionDate_extraInitializers), __runInitializers(this, _industries_initializers, void 0));
                this.includeDeleted = (__runInitializers(this, _industries_extraInitializers), __runInitializers(this, _includeDeleted_initializers, void 0));
                this.location = (__runInitializers(this, _includeDeleted_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.timezone = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _timezone_initializers, void 0));
                // Pagination parameters
                this.page = (__runInitializers(this, _timezone_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                // Sorting parameters
                this.sortBy = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sortBy_initializers, 'createdAt'));
                this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, 'DESC'));
                // Relations and includes
                this.includeUsers = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _includeUsers_initializers, void 0));
                this.includeSubscription = (__runInitializers(this, _includeUsers_extraInitializers), __runInitializers(this, _includeSubscription_initializers, void 0));
                this.includeStatistics = (__runInitializers(this, _includeSubscription_extraInitializers), __runInitializers(this, _includeStatistics_initializers, void 0));
                this.includeAuditLogs = (__runInitializers(this, _includeStatistics_extraInitializers), __runInitializers(this, _includeAuditLogs_initializers, void 0));
                __runInitializers(this, _includeAuditLogs_extraInitializers);
            }
            OrganizationQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { search: { required: false, type: function () { return String; } }, status: { required: false, enum: require("../entities/organization.entity").OrganizationStatus }, subscriptionTier: { required: false, enum: require("../entities/organization.entity").SubscriptionTier }, isDomainVerified: { required: false, type: function () { return Boolean; } }, isSubscriptionActive: { required: false, type: function () { return Boolean; } }, minUsers: { required: false, type: function () { return Number; }, minimum: 0 }, maxUsers: { required: false, type: function () { return Number; }, minimum: 1 }, storageUsagePercentage: { required: false, type: function () { return Number; }, minimum: 0, maximum: 100 }, createdAt: { required: false, type: function () { return require("./organization-query.dto").DateRangeDto; } }, subscriptionDate: { required: false, type: function () { return require("./organization-query.dto").DateRangeDto; } }, industries: { required: false, type: function () { return [String]; } }, includeDeleted: { required: false, type: function () { return Boolean; } }, location: { required: false, type: function () { return String; } }, timezone: { required: false, type: function () { return String; } }, page: { required: false, type: function () { return Number; }, default: 1, minimum: 1 }, limit: { required: false, type: function () { return Number; }, default: 10, minimum: 1, maximum: 100 }, sortBy: { required: false, type: function () { return String; }, default: "createdAt" }, sortOrder: { required: false, type: function () { return Object; }, default: "DESC" }, includeUsers: { required: false, type: function () { return Boolean; } }, includeSubscription: { required: false, type: function () { return Boolean; } }, includeStatistics: { required: false, type: function () { return Boolean; } }, includeAuditLogs: { required: false, type: function () { return Boolean; } } };
            };
            return OrganizationQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Search term for name or domain' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: organization_entity_1.OrganizationStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(organization_entity_1.OrganizationStatus)];
            _subscriptionTier_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: organization_entity_1.SubscriptionTier }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(organization_entity_1.SubscriptionTier)];
            _isDomainVerified_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by domain verification status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isSubscriptionActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by subscription active status' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _minUsers_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user count greater than' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _maxUsers_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by user count less than' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _storageUsagePercentage_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by storage usage percentage' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _createdAt_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _subscriptionDate_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return DateRangeDto; })];
            _industries_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific industries' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _includeDeleted_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include deleted organizations' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _location_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by specific location' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _timezone_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by timezone' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number', minimum: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', minimum: 1, maximum: 100 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort field',
                    enum: ['name', 'createdAt', 'userCount', 'storageUsage', 'subscriptionEndDate']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['ASC', 'DESC'])];
            _includeUsers_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include user details' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeSubscription_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include subscription details' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeStatistics_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include statistics' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeAuditLogs_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include audit logs' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _subscriptionTier_decorators, { kind: "field", name: "subscriptionTier", static: false, private: false, access: { has: function (obj) { return "subscriptionTier" in obj; }, get: function (obj) { return obj.subscriptionTier; }, set: function (obj, value) { obj.subscriptionTier = value; } }, metadata: _metadata }, _subscriptionTier_initializers, _subscriptionTier_extraInitializers);
            __esDecorate(null, null, _isDomainVerified_decorators, { kind: "field", name: "isDomainVerified", static: false, private: false, access: { has: function (obj) { return "isDomainVerified" in obj; }, get: function (obj) { return obj.isDomainVerified; }, set: function (obj, value) { obj.isDomainVerified = value; } }, metadata: _metadata }, _isDomainVerified_initializers, _isDomainVerified_extraInitializers);
            __esDecorate(null, null, _isSubscriptionActive_decorators, { kind: "field", name: "isSubscriptionActive", static: false, private: false, access: { has: function (obj) { return "isSubscriptionActive" in obj; }, get: function (obj) { return obj.isSubscriptionActive; }, set: function (obj, value) { obj.isSubscriptionActive = value; } }, metadata: _metadata }, _isSubscriptionActive_initializers, _isSubscriptionActive_extraInitializers);
            __esDecorate(null, null, _minUsers_decorators, { kind: "field", name: "minUsers", static: false, private: false, access: { has: function (obj) { return "minUsers" in obj; }, get: function (obj) { return obj.minUsers; }, set: function (obj, value) { obj.minUsers = value; } }, metadata: _metadata }, _minUsers_initializers, _minUsers_extraInitializers);
            __esDecorate(null, null, _maxUsers_decorators, { kind: "field", name: "maxUsers", static: false, private: false, access: { has: function (obj) { return "maxUsers" in obj; }, get: function (obj) { return obj.maxUsers; }, set: function (obj, value) { obj.maxUsers = value; } }, metadata: _metadata }, _maxUsers_initializers, _maxUsers_extraInitializers);
            __esDecorate(null, null, _storageUsagePercentage_decorators, { kind: "field", name: "storageUsagePercentage", static: false, private: false, access: { has: function (obj) { return "storageUsagePercentage" in obj; }, get: function (obj) { return obj.storageUsagePercentage; }, set: function (obj, value) { obj.storageUsagePercentage = value; } }, metadata: _metadata }, _storageUsagePercentage_initializers, _storageUsagePercentage_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _subscriptionDate_decorators, { kind: "field", name: "subscriptionDate", static: false, private: false, access: { has: function (obj) { return "subscriptionDate" in obj; }, get: function (obj) { return obj.subscriptionDate; }, set: function (obj, value) { obj.subscriptionDate = value; } }, metadata: _metadata }, _subscriptionDate_initializers, _subscriptionDate_extraInitializers);
            __esDecorate(null, null, _industries_decorators, { kind: "field", name: "industries", static: false, private: false, access: { has: function (obj) { return "industries" in obj; }, get: function (obj) { return obj.industries; }, set: function (obj, value) { obj.industries = value; } }, metadata: _metadata }, _industries_initializers, _industries_extraInitializers);
            __esDecorate(null, null, _includeDeleted_decorators, { kind: "field", name: "includeDeleted", static: false, private: false, access: { has: function (obj) { return "includeDeleted" in obj; }, get: function (obj) { return obj.includeDeleted; }, set: function (obj, value) { obj.includeDeleted = value; } }, metadata: _metadata }, _includeDeleted_initializers, _includeDeleted_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _timezone_decorators, { kind: "field", name: "timezone", static: false, private: false, access: { has: function (obj) { return "timezone" in obj; }, get: function (obj) { return obj.timezone; }, set: function (obj, value) { obj.timezone = value; } }, metadata: _metadata }, _timezone_initializers, _timezone_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _includeUsers_decorators, { kind: "field", name: "includeUsers", static: false, private: false, access: { has: function (obj) { return "includeUsers" in obj; }, get: function (obj) { return obj.includeUsers; }, set: function (obj, value) { obj.includeUsers = value; } }, metadata: _metadata }, _includeUsers_initializers, _includeUsers_extraInitializers);
            __esDecorate(null, null, _includeSubscription_decorators, { kind: "field", name: "includeSubscription", static: false, private: false, access: { has: function (obj) { return "includeSubscription" in obj; }, get: function (obj) { return obj.includeSubscription; }, set: function (obj, value) { obj.includeSubscription = value; } }, metadata: _metadata }, _includeSubscription_initializers, _includeSubscription_extraInitializers);
            __esDecorate(null, null, _includeStatistics_decorators, { kind: "field", name: "includeStatistics", static: false, private: false, access: { has: function (obj) { return "includeStatistics" in obj; }, get: function (obj) { return obj.includeStatistics; }, set: function (obj, value) { obj.includeStatistics = value; } }, metadata: _metadata }, _includeStatistics_initializers, _includeStatistics_extraInitializers);
            __esDecorate(null, null, _includeAuditLogs_decorators, { kind: "field", name: "includeAuditLogs", static: false, private: false, access: { has: function (obj) { return "includeAuditLogs" in obj; }, get: function (obj) { return obj.includeAuditLogs; }, set: function (obj, value) { obj.includeAuditLogs = value; } }, metadata: _metadata }, _includeAuditLogs_initializers, _includeAuditLogs_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.OrganizationQueryDto = OrganizationQueryDto;
//# sourceMappingURL=organization-query.dto.js.map