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
exports.UpdateSubscriptionDto = exports.FeatureLimitsDto = exports.BillingDetailsDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var organization_entity_1 = require("../entities/organization.entity");
var BillingDetailsDto = function () {
    var _a;
    var _billingEmail_decorators;
    var _billingEmail_initializers = [];
    var _billingEmail_extraInitializers = [];
    var _billingAddress_decorators;
    var _billingAddress_initializers = [];
    var _billingAddress_extraInitializers = [];
    var _taxId_decorators;
    var _taxId_initializers = [];
    var _taxId_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BillingDetailsDto() {
                this.billingEmail = __runInitializers(this, _billingEmail_initializers, void 0);
                this.billingAddress = (__runInitializers(this, _billingEmail_extraInitializers), __runInitializers(this, _billingAddress_initializers, void 0));
                this.taxId = (__runInitializers(this, _billingAddress_extraInitializers), __runInitializers(this, _taxId_initializers, void 0));
                this.paymentMethod = (__runInitializers(this, _taxId_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
                __runInitializers(this, _paymentMethod_extraInitializers);
            }
            BillingDetailsDto._OPENAPI_METADATA_FACTORY = function () {
                return { billingEmail: { required: false, type: function () { return String; } }, billingAddress: { required: false, type: function () { return String; } }, taxId: { required: false, type: function () { return String; } }, paymentMethod: { required: false, type: function () { return String; } } };
            };
            return BillingDetailsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _billingEmail_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _billingAddress_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _taxId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _paymentMethod_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _billingEmail_decorators, { kind: "field", name: "billingEmail", static: false, private: false, access: { has: function (obj) { return "billingEmail" in obj; }, get: function (obj) { return obj.billingEmail; }, set: function (obj, value) { obj.billingEmail = value; } }, metadata: _metadata }, _billingEmail_initializers, _billingEmail_extraInitializers);
            __esDecorate(null, null, _billingAddress_decorators, { kind: "field", name: "billingAddress", static: false, private: false, access: { has: function (obj) { return "billingAddress" in obj; }, get: function (obj) { return obj.billingAddress; }, set: function (obj, value) { obj.billingAddress = value; } }, metadata: _metadata }, _billingAddress_initializers, _billingAddress_extraInitializers);
            __esDecorate(null, null, _taxId_decorators, { kind: "field", name: "taxId", static: false, private: false, access: { has: function (obj) { return "taxId" in obj; }, get: function (obj) { return obj.taxId; }, set: function (obj, value) { obj.taxId = value; } }, metadata: _metadata }, _taxId_initializers, _taxId_extraInitializers);
            __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BillingDetailsDto = BillingDetailsDto;
var FeatureLimitsDto = function () {
    var _a;
    var _maxProjects_decorators;
    var _maxProjects_initializers = [];
    var _maxProjects_extraInitializers = [];
    var _maxTeams_decorators;
    var _maxTeams_initializers = [];
    var _maxTeams_extraInitializers = [];
    var _maxIntegrations_decorators;
    var _maxIntegrations_initializers = [];
    var _maxIntegrations_extraInitializers = [];
    var _maxCustomFields_decorators;
    var _maxCustomFields_initializers = [];
    var _maxCustomFields_extraInitializers = [];
    var _maxApiCalls_decorators;
    var _maxApiCalls_initializers = [];
    var _maxApiCalls_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FeatureLimitsDto() {
                this.maxProjects = __runInitializers(this, _maxProjects_initializers, void 0);
                this.maxTeams = (__runInitializers(this, _maxProjects_extraInitializers), __runInitializers(this, _maxTeams_initializers, void 0));
                this.maxIntegrations = (__runInitializers(this, _maxTeams_extraInitializers), __runInitializers(this, _maxIntegrations_initializers, void 0));
                this.maxCustomFields = (__runInitializers(this, _maxIntegrations_extraInitializers), __runInitializers(this, _maxCustomFields_initializers, void 0));
                this.maxApiCalls = (__runInitializers(this, _maxCustomFields_extraInitializers), __runInitializers(this, _maxApiCalls_initializers, void 0));
                __runInitializers(this, _maxApiCalls_extraInitializers);
            }
            FeatureLimitsDto._OPENAPI_METADATA_FACTORY = function () {
                return { maxProjects: { required: false, type: function () { return Number; }, minimum: 0 }, maxTeams: { required: false, type: function () { return Number; }, minimum: 0 }, maxIntegrations: { required: false, type: function () { return Number; }, minimum: 0 }, maxCustomFields: { required: false, type: function () { return Number; }, minimum: 0 }, maxApiCalls: { required: false, type: function () { return Number; }, minimum: 0 } };
            };
            return FeatureLimitsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _maxProjects_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _maxTeams_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _maxIntegrations_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _maxCustomFields_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _maxApiCalls_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            __esDecorate(null, null, _maxProjects_decorators, { kind: "field", name: "maxProjects", static: false, private: false, access: { has: function (obj) { return "maxProjects" in obj; }, get: function (obj) { return obj.maxProjects; }, set: function (obj, value) { obj.maxProjects = value; } }, metadata: _metadata }, _maxProjects_initializers, _maxProjects_extraInitializers);
            __esDecorate(null, null, _maxTeams_decorators, { kind: "field", name: "maxTeams", static: false, private: false, access: { has: function (obj) { return "maxTeams" in obj; }, get: function (obj) { return obj.maxTeams; }, set: function (obj, value) { obj.maxTeams = value; } }, metadata: _metadata }, _maxTeams_initializers, _maxTeams_extraInitializers);
            __esDecorate(null, null, _maxIntegrations_decorators, { kind: "field", name: "maxIntegrations", static: false, private: false, access: { has: function (obj) { return "maxIntegrations" in obj; }, get: function (obj) { return obj.maxIntegrations; }, set: function (obj, value) { obj.maxIntegrations = value; } }, metadata: _metadata }, _maxIntegrations_initializers, _maxIntegrations_extraInitializers);
            __esDecorate(null, null, _maxCustomFields_decorators, { kind: "field", name: "maxCustomFields", static: false, private: false, access: { has: function (obj) { return "maxCustomFields" in obj; }, get: function (obj) { return obj.maxCustomFields; }, set: function (obj, value) { obj.maxCustomFields = value; } }, metadata: _metadata }, _maxCustomFields_initializers, _maxCustomFields_extraInitializers);
            __esDecorate(null, null, _maxApiCalls_decorators, { kind: "field", name: "maxApiCalls", static: false, private: false, access: { has: function (obj) { return "maxApiCalls" in obj; }, get: function (obj) { return obj.maxApiCalls; }, set: function (obj, value) { obj.maxApiCalls = value; } }, metadata: _metadata }, _maxApiCalls_initializers, _maxApiCalls_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FeatureLimitsDto = FeatureLimitsDto;
var UpdateSubscriptionDto = function () {
    var _a;
    var _tier_decorators;
    var _tier_initializers = [];
    var _tier_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _maxUsers_decorators;
    var _maxUsers_initializers = [];
    var _maxUsers_extraInitializers = [];
    var _maxStorage_decorators;
    var _maxStorage_initializers = [];
    var _maxStorage_extraInitializers = [];
    var _autoRenew_decorators;
    var _autoRenew_initializers = [];
    var _autoRenew_extraInitializers = [];
    var _isTrial_decorators;
    var _isTrial_initializers = [];
    var _isTrial_extraInitializers = [];
    var _trialEndDate_decorators;
    var _trialEndDate_initializers = [];
    var _trialEndDate_extraInitializers = [];
    var _billingDetails_decorators;
    var _billingDetails_initializers = [];
    var _billingDetails_extraInitializers = [];
    var _featureLimits_decorators;
    var _featureLimits_initializers = [];
    var _featureLimits_extraInitializers = [];
    var _billingCycle_decorators;
    var _billingCycle_initializers = [];
    var _billingCycle_extraInitializers = [];
    var _pricePerUser_decorators;
    var _pricePerUser_initializers = [];
    var _pricePerUser_extraInitializers = [];
    var _basePrice_decorators;
    var _basePrice_initializers = [];
    var _basePrice_extraInitializers = [];
    var _discountPercentage_decorators;
    var _discountPercentage_initializers = [];
    var _discountPercentage_extraInitializers = [];
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var _customization_decorators;
    var _customization_initializers = [];
    var _customization_extraInitializers = [];
    var _supportLevel_decorators;
    var _supportLevel_initializers = [];
    var _supportLevel_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateSubscriptionDto() {
                this.tier = __runInitializers(this, _tier_initializers, void 0);
                this.startDate = (__runInitializers(this, _tier_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.maxUsers = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _maxUsers_initializers, void 0));
                this.maxStorage = (__runInitializers(this, _maxUsers_extraInitializers), __runInitializers(this, _maxStorage_initializers, void 0));
                this.autoRenew = (__runInitializers(this, _maxStorage_extraInitializers), __runInitializers(this, _autoRenew_initializers, void 0));
                this.isTrial = (__runInitializers(this, _autoRenew_extraInitializers), __runInitializers(this, _isTrial_initializers, void 0));
                this.trialEndDate = (__runInitializers(this, _isTrial_extraInitializers), __runInitializers(this, _trialEndDate_initializers, void 0));
                this.billingDetails = (__runInitializers(this, _trialEndDate_extraInitializers), __runInitializers(this, _billingDetails_initializers, void 0));
                this.featureLimits = (__runInitializers(this, _billingDetails_extraInitializers), __runInitializers(this, _featureLimits_initializers, void 0));
                this.billingCycle = (__runInitializers(this, _featureLimits_extraInitializers), __runInitializers(this, _billingCycle_initializers, void 0));
                this.pricePerUser = (__runInitializers(this, _billingCycle_extraInitializers), __runInitializers(this, _pricePerUser_initializers, void 0));
                this.basePrice = (__runInitializers(this, _pricePerUser_extraInitializers), __runInitializers(this, _basePrice_initializers, void 0));
                this.discountPercentage = (__runInitializers(this, _basePrice_extraInitializers), __runInitializers(this, _discountPercentage_initializers, void 0));
                this.features = (__runInitializers(this, _discountPercentage_extraInitializers), __runInitializers(this, _features_initializers, void 0));
                this.customization = (__runInitializers(this, _features_extraInitializers), __runInitializers(this, _customization_initializers, void 0));
                this.supportLevel = (__runInitializers(this, _customization_extraInitializers), __runInitializers(this, _supportLevel_initializers, void 0));
                this.metadata = (__runInitializers(this, _supportLevel_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            UpdateSubscriptionDto._OPENAPI_METADATA_FACTORY = function () {
                return { tier: { required: true, enum: require("../entities/organization.entity").SubscriptionTier }, startDate: { required: true, type: function () { return String; } }, endDate: { required: true, type: function () { return String; } }, maxUsers: { required: true, type: function () { return Number; }, minimum: 1, maximum: 10000 }, maxStorage: { required: true, type: function () { return Number; }, minimum: 1 }, autoRenew: { required: false, type: function () { return Boolean; } }, isTrial: { required: false, type: function () { return Boolean; } }, trialEndDate: { required: false, type: function () { return String; } }, billingDetails: { required: false, type: function () { return require("./update-subscription.dto").BillingDetailsDto; } }, featureLimits: { required: false, type: function () { return require("./update-subscription.dto").FeatureLimitsDto; } }, billingCycle: { required: false, type: function () { return Number; }, minimum: 1, maximum: 12 }, pricePerUser: { required: false, type: function () { return Number; }, minimum: 0 }, basePrice: { required: false, type: function () { return Number; }, minimum: 0 }, discountPercentage: { required: false, type: function () { return Number; }, minimum: 0, maximum: 100 }, features: { required: false, type: function () { return ({ customDomain: { required: false, type: function () { return Boolean; } }, ssoEnabled: { required: false, type: function () { return Boolean; } }, apiAccess: { required: false, type: function () { return Boolean; } }, advancedReporting: { required: false, type: function () { return Boolean; } }, customBranding: { required: false, type: function () { return Boolean; } }, prioritySupport: { required: false, type: function () { return Boolean; } }, dataExport: { required: false, type: function () { return Boolean; } }, auditLogs: { required: false, type: function () { return Boolean; } } }); } }, customization: { required: false, type: function () { return ({ theme: { required: false, type: function () { return String; } }, modules: { required: false, type: function () { return [String]; } }, restrictions: { required: false, type: function () { return [String]; } }, customFields: { required: false, type: function () { return [Object]; } } }); } }, supportLevel: { required: false, type: function () { return Object; } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return UpdateSubscriptionDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _tier_decorators = [(0, swagger_1.ApiProperty)({ enum: organization_entity_1.SubscriptionTier, description: 'Subscription tier level' }), (0, class_validator_1.IsEnum)(organization_entity_1.SubscriptionTier)];
            _startDate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Subscription start date' }), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Subscription end date' }), (0, class_validator_1.IsDateString)()];
            _maxUsers_decorators = [(0, swagger_1.ApiProperty)({ description: 'Maximum number of users allowed' }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(10000)];
            _maxStorage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Maximum storage in MB' }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _autoRenew_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Auto-renewal enabled' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isTrial_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Trial period enabled' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _trialEndDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Trial end date' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _billingDetails_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return BillingDetailsDto; })];
            _featureLimits_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return FeatureLimitsDto; })];
            _billingCycle_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Billing cycle in months' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(12)];
            _pricePerUser_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Price per user' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _basePrice_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Base price for subscription' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _discountPercentage_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Discount percentage' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _features_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom features enabled' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _customization_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional customization options' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _supportLevel_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Support level included' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE'])];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _tier_decorators, { kind: "field", name: "tier", static: false, private: false, access: { has: function (obj) { return "tier" in obj; }, get: function (obj) { return obj.tier; }, set: function (obj, value) { obj.tier = value; } }, metadata: _metadata }, _tier_initializers, _tier_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _maxUsers_decorators, { kind: "field", name: "maxUsers", static: false, private: false, access: { has: function (obj) { return "maxUsers" in obj; }, get: function (obj) { return obj.maxUsers; }, set: function (obj, value) { obj.maxUsers = value; } }, metadata: _metadata }, _maxUsers_initializers, _maxUsers_extraInitializers);
            __esDecorate(null, null, _maxStorage_decorators, { kind: "field", name: "maxStorage", static: false, private: false, access: { has: function (obj) { return "maxStorage" in obj; }, get: function (obj) { return obj.maxStorage; }, set: function (obj, value) { obj.maxStorage = value; } }, metadata: _metadata }, _maxStorage_initializers, _maxStorage_extraInitializers);
            __esDecorate(null, null, _autoRenew_decorators, { kind: "field", name: "autoRenew", static: false, private: false, access: { has: function (obj) { return "autoRenew" in obj; }, get: function (obj) { return obj.autoRenew; }, set: function (obj, value) { obj.autoRenew = value; } }, metadata: _metadata }, _autoRenew_initializers, _autoRenew_extraInitializers);
            __esDecorate(null, null, _isTrial_decorators, { kind: "field", name: "isTrial", static: false, private: false, access: { has: function (obj) { return "isTrial" in obj; }, get: function (obj) { return obj.isTrial; }, set: function (obj, value) { obj.isTrial = value; } }, metadata: _metadata }, _isTrial_initializers, _isTrial_extraInitializers);
            __esDecorate(null, null, _trialEndDate_decorators, { kind: "field", name: "trialEndDate", static: false, private: false, access: { has: function (obj) { return "trialEndDate" in obj; }, get: function (obj) { return obj.trialEndDate; }, set: function (obj, value) { obj.trialEndDate = value; } }, metadata: _metadata }, _trialEndDate_initializers, _trialEndDate_extraInitializers);
            __esDecorate(null, null, _billingDetails_decorators, { kind: "field", name: "billingDetails", static: false, private: false, access: { has: function (obj) { return "billingDetails" in obj; }, get: function (obj) { return obj.billingDetails; }, set: function (obj, value) { obj.billingDetails = value; } }, metadata: _metadata }, _billingDetails_initializers, _billingDetails_extraInitializers);
            __esDecorate(null, null, _featureLimits_decorators, { kind: "field", name: "featureLimits", static: false, private: false, access: { has: function (obj) { return "featureLimits" in obj; }, get: function (obj) { return obj.featureLimits; }, set: function (obj, value) { obj.featureLimits = value; } }, metadata: _metadata }, _featureLimits_initializers, _featureLimits_extraInitializers);
            __esDecorate(null, null, _billingCycle_decorators, { kind: "field", name: "billingCycle", static: false, private: false, access: { has: function (obj) { return "billingCycle" in obj; }, get: function (obj) { return obj.billingCycle; }, set: function (obj, value) { obj.billingCycle = value; } }, metadata: _metadata }, _billingCycle_initializers, _billingCycle_extraInitializers);
            __esDecorate(null, null, _pricePerUser_decorators, { kind: "field", name: "pricePerUser", static: false, private: false, access: { has: function (obj) { return "pricePerUser" in obj; }, get: function (obj) { return obj.pricePerUser; }, set: function (obj, value) { obj.pricePerUser = value; } }, metadata: _metadata }, _pricePerUser_initializers, _pricePerUser_extraInitializers);
            __esDecorate(null, null, _basePrice_decorators, { kind: "field", name: "basePrice", static: false, private: false, access: { has: function (obj) { return "basePrice" in obj; }, get: function (obj) { return obj.basePrice; }, set: function (obj, value) { obj.basePrice = value; } }, metadata: _metadata }, _basePrice_initializers, _basePrice_extraInitializers);
            __esDecorate(null, null, _discountPercentage_decorators, { kind: "field", name: "discountPercentage", static: false, private: false, access: { has: function (obj) { return "discountPercentage" in obj; }, get: function (obj) { return obj.discountPercentage; }, set: function (obj, value) { obj.discountPercentage = value; } }, metadata: _metadata }, _discountPercentage_initializers, _discountPercentage_extraInitializers);
            __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
            __esDecorate(null, null, _customization_decorators, { kind: "field", name: "customization", static: false, private: false, access: { has: function (obj) { return "customization" in obj; }, get: function (obj) { return obj.customization; }, set: function (obj, value) { obj.customization = value; } }, metadata: _metadata }, _customization_initializers, _customization_extraInitializers);
            __esDecorate(null, null, _supportLevel_decorators, { kind: "field", name: "supportLevel", static: false, private: false, access: { has: function (obj) { return "supportLevel" in obj; }, get: function (obj) { return obj.supportLevel; }, set: function (obj, value) { obj.supportLevel = value; } }, metadata: _metadata }, _supportLevel_initializers, _supportLevel_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
//# sourceMappingURL=update-subscription.dto.js.map