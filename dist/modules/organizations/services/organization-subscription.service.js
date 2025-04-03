"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.OrganizationSubscriptionService = void 0;
var common_1 = require("@nestjs/common");
var OrganizationSubscriptionService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationSubscriptionService = _classThis = /** @class */ (function () {
        function OrganizationSubscriptionService_1(organizationRepository, eventEmitter) {
            this.organizationRepository = organizationRepository;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(OrganizationSubscriptionService.name);
        }
        OrganizationSubscriptionService_1.prototype.createSubscription = function (organizationId, planId) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, plan, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            return [4 /*yield*/, this.getPlan(planId)];
                        case 2:
                            plan = _a.sent();
                            if (!plan) {
                                throw new Error("Invalid plan ID: ".concat(planId));
                            }
                            // Update organization with subscription details
                            organization.subscription = {
                                planId: planId,
                                status: 'active',
                                startDate: new Date(),
                                features: plan.features,
                                limits: plan.limits,
                            };
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 3:
                            _a.sent();
                            // Emit subscription created event
                            this.eventEmitter.emit('organization.subscription.created', {
                                organizationId: organizationId,
                                planId: planId,
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error("Error creating subscription for organization ".concat(organizationId, ":"), error_1);
                            throw error_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.updateSubscription = function (organizationId, planId, changes) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, oldPlanId, error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _b.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            oldPlanId = (_a = organization.subscription) === null || _a === void 0 ? void 0 : _a.planId;
                            // Update subscription details
                            organization.subscription = __assign(__assign(__assign({}, organization.subscription), changes), { planId: planId, updatedAt: new Date() });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _b.sent();
                            // Emit subscription updated event
                            this.eventEmitter.emit('organization.subscription.updated', {
                                organizationId: organizationId,
                                oldPlanId: oldPlanId,
                                newPlanId: planId,
                                changes: changes,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _b.sent();
                            this.logger.error("Error updating subscription for organization ".concat(organizationId, ":"), error_2);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.cancelSubscription = function (organizationId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            // Update subscription status
                            organization.subscription = __assign(__assign({}, organization.subscription), { status: 'cancelled', cancelledAt: new Date(), cancellationReason: reason, endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _a.sent();
                            // Emit subscription cancelled event
                            this.eventEmitter.emit('organization.subscription.cancelled', {
                                organizationId: organizationId,
                                reason: reason,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error("Error cancelling subscription for organization ".concat(organizationId, ":"), error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.checkSubscriptionStatus = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                                return [2 /*return*/, false];
                            }
                            // Check if subscription is active and not expired
                            return [2 /*return*/, (organization.subscription.status === 'active' &&
                                    (!organization.subscription.endDate ||
                                        new Date(organization.subscription.endDate) > new Date()))];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Error checking subscription status for organization ".concat(organizationId, ":"), error_4);
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.validateFeatureAccess = function (organizationId, feature) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, organization.subscription.features.includes(feature)];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error("Error validating feature access for organization ".concat(organizationId, ":"), error_5);
                            throw error_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.checkResourceLimit = function (organizationId, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, limit, current, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!(organization === null || organization === void 0 ? void 0 : organization.subscription)) {
                                return [2 /*return*/, { allowed: false, limit: 0, current: 0 }];
                            }
                            limit = organization.subscription.limits[resource] || 0;
                            return [4 /*yield*/, this.getCurrentResourceUsage(organizationId, resource)];
                        case 2:
                            current = _a.sent();
                            return [2 /*return*/, {
                                    allowed: current < limit,
                                    limit: limit,
                                    current: current,
                                }];
                        case 3:
                            error_6 = _a.sent();
                            this.logger.error("Error checking resource limit for organization ".concat(organizationId, ":"), error_6);
                            throw error_6;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.getPlan = function (planId) {
            return __awaiter(this, void 0, void 0, function () {
                var plans;
                return __generator(this, function (_a) {
                    plans = {
                        basic: {
                            id: 'basic',
                            name: 'Basic Plan',
                            features: ['feature1', 'feature2'],
                            limits: { users: 10, storage: 5 },
                            price: 10,
                        },
                        pro: {
                            id: 'pro',
                            name: 'Pro Plan',
                            features: ['feature1', 'feature2', 'feature3'],
                            limits: { users: 50, storage: 25 },
                            price: 25,
                        },
                    };
                    return [2 /*return*/, plans[planId] || null];
                });
            });
        };
        OrganizationSubscriptionService_1.prototype.getCurrentResourceUsage = function (organizationId, resource) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceCounters;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resourceCounters = {
                                users: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var org;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.organizationRepository.findOne({
                                                    where: { id: organizationId },
                                                    relations: ['members'],
                                                })];
                                            case 1:
                                                org = _b.sent();
                                                return [2 /*return*/, ((_a = org === null || org === void 0 ? void 0 : org.members) === null || _a === void 0 ? void 0 : _a.length) || 0];
                                        }
                                    });
                                }); },
                                storage: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        // Implementation for checking storage usage
                                        return [2 /*return*/, 0];
                                    });
                                }); },
                            };
                            if (!resourceCounters[resource]) return [3 /*break*/, 2];
                            return [4 /*yield*/, resourceCounters[resource]()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/, 0];
                    }
                });
            });
        };
        return OrganizationSubscriptionService_1;
    }());
    __setFunctionName(_classThis, "OrganizationSubscriptionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationSubscriptionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationSubscriptionService = _classThis;
}();
exports.OrganizationSubscriptionService = OrganizationSubscriptionService;
//# sourceMappingURL=organization-subscription.service.js.map