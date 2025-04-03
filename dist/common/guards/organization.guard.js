"use strict";
// src/common/guards/organization.guard.ts
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGuard = void 0;
var common_1 = require("@nestjs/common");
var auth_decorator_1 = require("../decorators/auth.decorator");
var OrganizationGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationGuard = _classThis = /** @class */ (function () {
        function OrganizationGuard_1(reflector, organizationService) {
            this.reflector = reflector;
            this.organizationService = organizationService;
        }
        OrganizationGuard_1.prototype.canActivate = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var requireOrganization, request, user, organization, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireOrganization = this.reflector.getAllAndOverride(auth_decorator_1.AUTH_ORG_KEY, [context.getHandler(), context.getClass()]);
                            if (!requireOrganization) {
                                return [2 /*return*/, true];
                            }
                            request = context.switchToHttp().getRequest();
                            user = request.user;
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found');
                            }
                            if (!user.organizationId) {
                                throw new common_1.ForbiddenException('User is not associated with any organization');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.organizationService.findOne(user.organizationId)];
                        case 2:
                            organization = _a.sent();
                            if (!organization) {
                                throw new common_1.ForbiddenException('Organization not found');
                            }
                            // Check if organization is active
                            if (organization.status !== 'ACTIVE') {
                                throw new common_1.ForbiddenException('Organization is inactive');
                            }
                            // Check subscription status
                            if (!this.isSubscriptionValid(organization)) {
                                throw new common_1.ForbiddenException('Organization subscription is invalid or expired');
                            }
                            // Check organization limits
                            return [4 /*yield*/, this.checkOrganizationLimits(organization, request)];
                        case 3:
                            // Check organization limits
                            _a.sent();
                            // Add organization to request for use in controllers
                            request.organization = organization;
                            return [2 /*return*/, true];
                        case 4:
                            error_1 = _a.sent();
                            if (error_1 instanceof common_1.ForbiddenException || error_1 instanceof common_1.UnauthorizedException) {
                                throw error_1;
                            }
                            throw new common_1.ForbiddenException('Organization access denied');
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationGuard_1.prototype.isSubscriptionValid = function (organization) {
            var now = new Date();
            var subscriptionEnd = organization.subscriptionEndDate;
            // Check if subscription is active
            if (!organization.isSubscriptionActive) {
                return false;
            }
            // Check if subscription end date is valid
            if (subscriptionEnd && subscriptionEnd < now) {
                return false;
            }
            return true;
        };
        OrganizationGuard_1.prototype.checkOrganizationLimits = function (organization, request) {
            return __awaiter(this, void 0, void 0, function () {
                var userCount, statistics, requestedFeature;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(organization.maxUsers > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.organizationService.getAdminCount(organization.id)];
                        case 1:
                            userCount = _a.sent();
                            if (userCount >= organization.maxUsers) {
                                throw new common_1.ForbiddenException('Organization user limit reached');
                            }
                            _a.label = 2;
                        case 2:
                            if (!(organization.maxStorage > 0 && request.url.includes('/storage'))) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.organizationService.getStatistics(organization.id)];
                        case 3:
                            statistics = _a.sent();
                            if (statistics.storageUsed >= organization.maxStorage) {
                                throw new common_1.ForbiddenException('Organization storage limit reached');
                            }
                            _a.label = 4;
                        case 4:
                            requestedFeature = this.getRequestedFeature(request);
                            if (requestedFeature && !this.hasFeatureAccess(organization, requestedFeature)) {
                                throw new common_1.ForbiddenException("Access to ".concat(requestedFeature, " feature is not included in your plan"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationGuard_1.prototype.getRequestedFeature = function (request) {
            // Map endpoints to features
            var featureMap = {
                '/api/messages/whatsapp': 'WHATSAPP_INTEGRATION',
                '/api/analytics': 'ADVANCED_ANALYTICS',
                '/api/export': 'DATA_EXPORT',
                // Add more feature mappings
            };
            for (var _i = 0, _a = Object.entries(featureMap); _i < _a.length; _i++) {
                var _b = _a[_i], endpoint = _b[0], feature = _b[1];
                if (request.url.includes(endpoint)) {
                    return feature;
                }
            }
            return null;
        };
        OrganizationGuard_1.prototype.hasFeatureAccess = function (organization, feature) {
            // Check if the feature is included in the organization's settings or tier-based features
            var tierFeatures = this.getTierFeatures(organization.subscriptionTier);
            return tierFeatures.includes(feature);
        };
        OrganizationGuard_1.prototype.getTierFeatures = function (tier) {
            var tierFeaturesMap = {
                'FREE': ['BASIC'],
                'BASIC': ['BASIC', 'DATA_EXPORT'],
                'PROFESSIONAL': ['BASIC', 'DATA_EXPORT', 'ADVANCED_ANALYTICS'],
                'ENTERPRISE': ['BASIC', 'DATA_EXPORT', 'ADVANCED_ANALYTICS', 'WHATSAPP_INTEGRATION'],
            };
            return tierFeaturesMap[tier] || [];
        };
        return OrganizationGuard_1;
    }());
    __setFunctionName(_classThis, "OrganizationGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationGuard = _classThis;
}();
exports.OrganizationGuard = OrganizationGuard;
//# sourceMappingURL=organization.guard.js.map