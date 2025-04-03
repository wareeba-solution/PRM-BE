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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.OrganizationBillingListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var OrganizationBillingListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleSubscriptionCreated_decorators;
    var _handleSubscriptionUpdated_decorators;
    var _handleSubscriptionCancelled_decorators;
    var _handlePaymentFailed_decorators;
    var _handleInvoicePaid_decorators;
    var OrganizationBillingListener = _classThis = /** @class */ (function () {
        function OrganizationBillingListener_1(organizationRepository, subscriptionService) {
            this.organizationRepository = (__runInitializers(this, _instanceExtraInitializers), organizationRepository);
            this.subscriptionService = subscriptionService;
            this.logger = new common_1.Logger(OrganizationBillingListener.name);
        }
        OrganizationBillingListener_1.prototype.handleSubscriptionCreated = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, planId, organization, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            organizationId = payload.organizationId, planId = payload.planId;
                            this.logger.debug("Processing new subscription for organization ".concat(organizationId));
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            // Update organization billing status
                            organization.billing = __assign(__assign({}, organization.billing), { status: 'active', planId: planId, startDate: new Date() });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Error processing subscription creation:', error_1);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationBillingListener_1.prototype.handleSubscriptionUpdated = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, planId, changes, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            organizationId = payload.organizationId, planId = payload.planId, changes = payload.changes;
                            this.logger.debug("Processing subscription update for organization ".concat(organizationId));
                            return [4 /*yield*/, this.subscriptionService.updateSubscription(organizationId, planId, changes)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error('Error processing subscription update:', error_2);
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationBillingListener_1.prototype.handleSubscriptionCancelled = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, organization, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            organizationId = payload.organizationId;
                            this.logger.debug("Processing subscription cancellation for organization ".concat(organizationId));
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            // Update organization billing status
                            organization.billing = __assign(__assign({}, organization.billing), { status: 'cancelled', cancelledAt: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error('Error processing subscription cancellation:', error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationBillingListener_1.prototype.handlePaymentFailed = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, failureReason, attemptCount, organization, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            organizationId = payload.organizationId, failureReason = payload.failureReason, attemptCount = payload.attemptCount;
                            this.logger.debug("Processing payment failure for organization ".concat(organizationId));
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            // Update billing status and record failure
                            organization.billing = __assign(__assign({}, organization.billing), { lastPaymentFailure: {
                                    date: new Date(),
                                    reason: failureReason,
                                    attemptCount: attemptCount,
                                } });
                            // If multiple failures, mark as past due
                            if (attemptCount > 2) {
                                organization.billing.status = 'past_due';
                            }
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.error('Error processing payment failure:', error_4);
                            throw error_4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationBillingListener_1.prototype.handleInvoicePaid = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, invoiceId, amount, organization, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            organizationId = payload.organizationId, invoiceId = payload.invoiceId, amount = payload.amount;
                            this.logger.debug("Processing paid invoice for organization ".concat(organizationId));
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: organizationId }
                                })];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new Error("Organization ".concat(organizationId, " not found"));
                            }
                            // Update billing records
                            organization.billing = __assign(__assign({}, organization.billing), { lastPaymentDate: new Date(), lastPaymentAmount: amount, lastInvoiceId: invoiceId, status: 'active' });
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error('Error processing paid invoice:', error_5);
                            throw error_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return OrganizationBillingListener_1;
    }());
    __setFunctionName(_classThis, "OrganizationBillingListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleSubscriptionCreated_decorators = [(0, event_emitter_1.OnEvent)('organization.subscription.created')];
        _handleSubscriptionUpdated_decorators = [(0, event_emitter_1.OnEvent)('organization.subscription.updated')];
        _handleSubscriptionCancelled_decorators = [(0, event_emitter_1.OnEvent)('organization.subscription.cancelled')];
        _handlePaymentFailed_decorators = [(0, event_emitter_1.OnEvent)('organization.billing.payment_failed')];
        _handleInvoicePaid_decorators = [(0, event_emitter_1.OnEvent)('organization.billing.invoice_paid')];
        __esDecorate(_classThis, null, _handleSubscriptionCreated_decorators, { kind: "method", name: "handleSubscriptionCreated", static: false, private: false, access: { has: function (obj) { return "handleSubscriptionCreated" in obj; }, get: function (obj) { return obj.handleSubscriptionCreated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSubscriptionUpdated_decorators, { kind: "method", name: "handleSubscriptionUpdated", static: false, private: false, access: { has: function (obj) { return "handleSubscriptionUpdated" in obj; }, get: function (obj) { return obj.handleSubscriptionUpdated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSubscriptionCancelled_decorators, { kind: "method", name: "handleSubscriptionCancelled", static: false, private: false, access: { has: function (obj) { return "handleSubscriptionCancelled" in obj; }, get: function (obj) { return obj.handleSubscriptionCancelled; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handlePaymentFailed_decorators, { kind: "method", name: "handlePaymentFailed", static: false, private: false, access: { has: function (obj) { return "handlePaymentFailed" in obj; }, get: function (obj) { return obj.handlePaymentFailed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleInvoicePaid_decorators, { kind: "method", name: "handleInvoicePaid", static: false, private: false, access: { has: function (obj) { return "handleInvoicePaid" in obj; }, get: function (obj) { return obj.handleInvoicePaid; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationBillingListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationBillingListener = _classThis;
}();
exports.OrganizationBillingListener = OrganizationBillingListener;
//# sourceMappingURL=organization-billing.listener.js.map