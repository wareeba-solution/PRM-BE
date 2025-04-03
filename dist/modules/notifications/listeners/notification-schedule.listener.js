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
exports.NotificationScheduleListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var update_notification_dto_1 = require("../dto/update-notification.dto");
var NotificationScheduleListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleNotificationSchedule_decorators;
    var _handleNotificationReschedule_decorators;
    var _handleNotificationCancelSchedule_decorators;
    var _handleScheduleExpired_decorators;
    var NotificationScheduleListener = _classThis = /** @class */ (function () {
        function NotificationScheduleListener_1(notificationRepository, schedulerService) {
            this.notificationRepository = (__runInitializers(this, _instanceExtraInitializers), notificationRepository);
            this.schedulerService = schedulerService;
            this.logger = new common_1.Logger(NotificationScheduleListener.name);
        }
        NotificationScheduleListener_1.prototype.handleNotificationSchedule = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var notification, scheduledFor, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            notification = payload.notification, scheduledFor = payload.scheduledFor;
                            this.logger.debug("Scheduling notification ".concat(notification.id, " for ").concat(scheduledFor));
                            return [4 /*yield*/, this.schedulerService.scheduleNotification(notification, scheduledFor)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error("Error scheduling notification ".concat(payload.notification.id, ":"), error_1);
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationScheduleListener_1.prototype.handleNotificationReschedule = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var notificationId, newScheduledFor, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            notificationId = payload.notificationId, newScheduledFor = payload.newScheduledFor;
                            this.logger.debug("Rescheduling notification ".concat(notificationId, " for ").concat(newScheduledFor));
                            return [4 /*yield*/, this.schedulerService.rescheduleNotification(notificationId, newScheduledFor)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Error rescheduling notification ".concat(payload.notificationId, ":"), error_2);
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationScheduleListener_1.prototype.handleNotificationCancelSchedule = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.debug("Canceling scheduled notification ".concat(notificationId));
                            return [4 /*yield*/, this.schedulerService.cancelScheduledNotification(notificationId)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Error canceling scheduled notification ".concat(notificationId, ":"), error_3);
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationScheduleListener_1.prototype.handleScheduleExpired = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.debug("Schedule expired for notification ".concat(notification.id));
                            notification.status = update_notification_dto_1.NotificationStatus.EXPIRED;
                            notification.metadata = __assign(__assign({}, notification.metadata), { expirationReason: 'schedule_expired', expiredAt: new Date() });
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Error handling expired schedule for notification ".concat(notification.id, ":"), error_4);
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationScheduleListener_1;
    }());
    __setFunctionName(_classThis, "NotificationScheduleListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleNotificationSchedule_decorators = [(0, event_emitter_1.OnEvent)('notification.schedule')];
        _handleNotificationReschedule_decorators = [(0, event_emitter_1.OnEvent)('notification.reschedule')];
        _handleNotificationCancelSchedule_decorators = [(0, event_emitter_1.OnEvent)('notification.cancel_schedule')];
        _handleScheduleExpired_decorators = [(0, event_emitter_1.OnEvent)('notification.schedule_expired')];
        __esDecorate(_classThis, null, _handleNotificationSchedule_decorators, { kind: "method", name: "handleNotificationSchedule", static: false, private: false, access: { has: function (obj) { return "handleNotificationSchedule" in obj; }, get: function (obj) { return obj.handleNotificationSchedule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleNotificationReschedule_decorators, { kind: "method", name: "handleNotificationReschedule", static: false, private: false, access: { has: function (obj) { return "handleNotificationReschedule" in obj; }, get: function (obj) { return obj.handleNotificationReschedule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleNotificationCancelSchedule_decorators, { kind: "method", name: "handleNotificationCancelSchedule", static: false, private: false, access: { has: function (obj) { return "handleNotificationCancelSchedule" in obj; }, get: function (obj) { return obj.handleNotificationCancelSchedule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleScheduleExpired_decorators, { kind: "method", name: "handleScheduleExpired", static: false, private: false, access: { has: function (obj) { return "handleScheduleExpired" in obj; }, get: function (obj) { return obj.handleScheduleExpired; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationScheduleListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationScheduleListener = _classThis;
}();
exports.NotificationScheduleListener = NotificationScheduleListener;
//# sourceMappingURL=notification-schedule.listener.js.map