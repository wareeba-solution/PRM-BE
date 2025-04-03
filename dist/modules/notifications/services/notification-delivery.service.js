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
exports.NotificationDeliveryService = void 0;
var common_1 = require("@nestjs/common");
var update_notification_dto_1 = require("../dto/update-notification.dto");
var NotificationDeliveryService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationDeliveryService = _classThis = /** @class */ (function () {
        function NotificationDeliveryService_1(notificationRepository, emailService, smsService, pushNotificationService, webhookService, eventEmitter) {
            this.notificationRepository = notificationRepository;
            this.emailService = emailService;
            this.smsService = smsService;
            this.pushNotificationService = pushNotificationService;
            this.webhookService = webhookService;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(NotificationDeliveryService.name);
            this.MAX_RETRY_ATTEMPTS = 3;
        }
        NotificationDeliveryService_1.prototype.processNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var deliveryPromises, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 5]);
                            notification.status = update_notification_dto_1.NotificationStatus.PROCESSING;
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 1:
                            _a.sent();
                            deliveryPromises = notification.channels.map(function (channel) {
                                return _this.deliverToChannel(notification, channel);
                            });
                            return [4 /*yield*/, Promise.all(deliveryPromises)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to process notification ".concat(notification.id, ":"), error_1);
                            notification.status = update_notification_dto_1.NotificationStatus.FAILED;
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 4:
                            _a.sent();
                            this.eventEmitter.emit('notification.failed', {
                                notification: notification,
                                error: error_1
                            });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationDeliveryService_1.prototype.retryNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    if (((_b = (_a = notification.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) !== null && _b !== void 0 ? _b : 0) >= this.MAX_RETRY_ATTEMPTS) {
                        throw new Error('Maximum retry attempts exceeded');
                    }
                    // Reset failed channels for retry
                    notification.deliveryDetails = __assign(__assign({}, notification.deliveryDetails), { attempts: (_d = (_c = notification.deliveryDetails) === null || _c === void 0 ? void 0 : _c.attempts) !== null && _d !== void 0 ? _d : 0, lastAttempt: (_f = (_e = notification.deliveryDetails) === null || _e === void 0 ? void 0 : _e.lastAttempt) !== null && _f !== void 0 ? _f : new Date(), channels: ((_g = notification.deliveryDetails) === null || _g === void 0 ? void 0 : _g.channels.filter(function (c) { return c.status === 'SUCCESS'; })) || [] });
                    return [2 /*return*/, this.processNotification(notification)];
                });
            });
        };
        NotificationDeliveryService_1.prototype.deliverToChannel = function (notification, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 11, , 12]);
                            _a = channel.toLowerCase();
                            switch (_a) {
                                case 'email': return [3 /*break*/, 1];
                                case 'sms': return [3 /*break*/, 3];
                                case 'push': return [3 /*break*/, 5];
                                case 'webhook': return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 9];
                        case 1: return [4 /*yield*/, this.emailService.send(notification)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 3: return [4 /*yield*/, this.smsService.send(notification)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 5: return [4 /*yield*/, this.pushNotificationService.send(notification)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 7: return [4 /*yield*/, this.webhookService.send(notification)];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 9: throw new Error("Unsupported channel: ".concat(channel));
                        case 10:
                            this.eventEmitter.emit('notification.delivered', {
                                notification: notification,
                                channel: channel
                            });
                            return [3 /*break*/, 12];
                        case 11:
                            error_2 = _b.sent();
                            this.logger.error("Failed to deliver notification ".concat(notification.id, " to channel ").concat(channel, ":"), error_2);
                            this.eventEmitter.emit('notification.failed', {
                                notification: notification,
                                channel: channel,
                                error: error_2
                            });
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationDeliveryService_1.prototype.getDeliveryStatus = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findOne({
                                where: { id: notificationId }
                            })];
                        case 1:
                            notification = _a.sent();
                            if (!notification) {
                                throw new Error('Notification not found');
                            }
                            return [2 /*return*/, {
                                    status: notification.status,
                                    deliveryDetails: notification.deliveryDetails,
                                    channels: notification.channels
                                }];
                    }
                });
            });
        };
        return NotificationDeliveryService_1;
    }());
    __setFunctionName(_classThis, "NotificationDeliveryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationDeliveryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationDeliveryService = _classThis;
}();
exports.NotificationDeliveryService = NotificationDeliveryService;
//# sourceMappingURL=notification-delivery.service.js.map