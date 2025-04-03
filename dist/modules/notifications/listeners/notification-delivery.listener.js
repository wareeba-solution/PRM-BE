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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeliveryListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var update_notification_dto_1 = require("../dto/update-notification.dto");
var NotificationDeliveryListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleNotificationDelivered_decorators;
    var _handleNotificationFailed_decorators;
    var _handleDeliveryTimeout_decorators;
    var NotificationDeliveryListener = _classThis = /** @class */ (function () {
        function NotificationDeliveryListener_1(notificationRepository, deliveryService) {
            this.notificationRepository = (__runInitializers(this, _instanceExtraInitializers), notificationRepository);
            this.deliveryService = deliveryService;
            this.logger = new common_1.Logger(NotificationDeliveryListener.name);
        }
        NotificationDeliveryListener_1.prototype.handleNotificationDelivered = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var notification_1, channel, allChannelsDelivered, error_1;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            notification_1 = payload.notification, channel = payload.channel;
                            this.logger.debug("Handling delivery success for notification ".concat(notification_1.id, " on channel ").concat(channel));
                            // Update delivery details for the specific channel
                            notification_1.deliveryDetails = __assign(__assign({}, notification_1.deliveryDetails), { attempts: ((_a = notification_1.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0, lastAttempt: ((_b = notification_1.deliveryDetails) === null || _b === void 0 ? void 0 : _b.lastAttempt) || new Date(), channels: __spreadArray(__spreadArray([], (((_c = notification_1.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || []), true), [
                                    {
                                        channel: channel,
                                        status: 'SUCCESS',
                                        sentAt: new Date(),
                                    }
                                ], false) });
                            allChannelsDelivered = notification_1.channels.every(function (ch) {
                                var _a, _b;
                                return (_b = (_a = notification_1.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(function (d) { return d.channel === ch && d.status === 'SUCCESS'; });
                            });
                            if (allChannelsDelivered) {
                                notification_1.status = update_notification_dto_1.NotificationStatus.DELIVERED;
                                notification_1.deliveredAt = new Date();
                            }
                            return [4 /*yield*/, this.notificationRepository.save(notification_1)];
                        case 1:
                            _d.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _d.sent();
                            this.logger.error("Error handling delivery success for notification ".concat(payload.notification.id, ":"), error_1);
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationDeliveryListener_1.prototype.handleNotificationFailed = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var notification_2, channel, error, _a, retry, allChannelsFailed, retryDelay, error_2;
                var _this = this;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 8, , 9]);
                            notification_2 = payload.notification, channel = payload.channel, error = payload.error, _a = payload.retry, retry = _a === void 0 ? true : _a;
                            this.logger.debug("Handling delivery failure for notification ".concat(notification_2.id, " on channel ").concat(channel));
                            // Update delivery details
                            notification_2.deliveryDetails = __assign(__assign({}, notification_2.deliveryDetails), { attempts: (((_b = notification_2.deliveryDetails) === null || _b === void 0 ? void 0 : _b.attempts) || 0) + 1, lastAttempt: new Date(), channels: __spreadArray(__spreadArray([], (((_c = notification_2.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || []), true), [
                                    {
                                        channel: channel,
                                        status: 'FAILED',
                                        sentAt: new Date(),
                                        error: error.message || 'Unknown error',
                                    }
                                ], false) });
                            allChannelsFailed = notification_2.channels.every(function (ch) {
                                var _a, _b;
                                return (_b = (_a = notification_2.deliveryDetails) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b.some(function (d) { return d.channel === ch && d.status === 'FAILED'; });
                            });
                            if (!allChannelsFailed) return [3 /*break*/, 5];
                            if (!(retry && notification_2.deliveryDetails.attempts < 3)) return [3 /*break*/, 2];
                            notification_2.status = update_notification_dto_1.NotificationStatus.RETRY_PENDING;
                            return [4 /*yield*/, this.notificationRepository.save(notification_2)];
                        case 1:
                            _d.sent();
                            retryDelay = Math.pow(2, notification_2.deliveryDetails.attempts) * 1000;
                            setTimeout(function () {
                                _this.deliveryService.retryNotification(notification_2);
                            }, retryDelay);
                            return [3 /*break*/, 4];
                        case 2:
                            notification_2.status = update_notification_dto_1.NotificationStatus.FAILED;
                            return [4 /*yield*/, this.notificationRepository.save(notification_2)];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, this.notificationRepository.save(notification_2)];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            error_2 = _d.sent();
                            this.logger.error("Error handling delivery failure for notification ".concat(payload.notification.id, ":"), error_2);
                            throw error_2;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationDeliveryListener_1.prototype.handleDeliveryTimeout = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            this.logger.debug("Handling delivery timeout for notification ".concat(notification.id));
                            notification.status = update_notification_dto_1.NotificationStatus.FAILED;
                            notification.deliveryDetails = __assign(__assign({}, notification.deliveryDetails), { attempts: ((_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0, lastAttempt: ((_b = notification.deliveryDetails) === null || _b === void 0 ? void 0 : _b.lastAttempt) || new Date(), channels: ((_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.channels) || [], error: 'Delivery timeout exceeded', timeoutAt: new Date() });
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 1:
                            _d.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _d.sent();
                            this.logger.error("Error handling delivery timeout for notification ".concat(notification.id, ":"), error_3);
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationDeliveryListener_1;
    }());
    __setFunctionName(_classThis, "NotificationDeliveryListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleNotificationDelivered_decorators = [(0, event_emitter_1.OnEvent)('notification.delivered')];
        _handleNotificationFailed_decorators = [(0, event_emitter_1.OnEvent)('notification.failed')];
        _handleDeliveryTimeout_decorators = [(0, event_emitter_1.OnEvent)('notification.delivery_timeout')];
        __esDecorate(_classThis, null, _handleNotificationDelivered_decorators, { kind: "method", name: "handleNotificationDelivered", static: false, private: false, access: { has: function (obj) { return "handleNotificationDelivered" in obj; }, get: function (obj) { return obj.handleNotificationDelivered; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleNotificationFailed_decorators, { kind: "method", name: "handleNotificationFailed", static: false, private: false, access: { has: function (obj) { return "handleNotificationFailed" in obj; }, get: function (obj) { return obj.handleNotificationFailed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDeliveryTimeout_decorators, { kind: "method", name: "handleDeliveryTimeout", static: false, private: false, access: { has: function (obj) { return "handleDeliveryTimeout" in obj; }, get: function (obj) { return obj.handleDeliveryTimeout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationDeliveryListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationDeliveryListener = _classThis;
}();
exports.NotificationDeliveryListener = NotificationDeliveryListener;
//# sourceMappingURL=notification-delivery.listener.js.map