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
exports.NotificationListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var NotificationListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleNotificationCreated_decorators;
    var _handleNotificationResend_decorators;
    var NotificationListener = _classThis = /** @class */ (function () {
        function NotificationListener_1(templateRepository, deliveryService) {
            this.templateRepository = (__runInitializers(this, _instanceExtraInitializers), templateRepository);
            this.deliveryService = deliveryService;
            this.logger = new common_1.Logger(NotificationListener.name);
        }
        NotificationListener_1.prototype.handleNotificationCreated = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            this.logger.debug("Processing new notification: ".concat(notification.id));
                            if (!notification.templateId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.processTemplate(notification)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: 
                        // Send to delivery service
                        return [4 /*yield*/, this.deliveryService.processNotification(notification)];
                        case 3:
                            // Send to delivery service
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error("Error processing notification ".concat(notification.id, ":"), error_1);
                            throw error_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationListener_1.prototype.handleNotificationResend = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.debug("Resending notification: ".concat(notification.id));
                            return [4 /*yield*/, this.deliveryService.retryNotification(notification)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Error resending notification ".concat(notification.id, ":"), error_2);
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationListener_1.prototype.processTemplate = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var template, metadata;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.templateRepository.findOne({
                                where: { id: notification.templateId }
                            })];
                        case 1:
                            template = _c.sent();
                            if (!template) {
                                throw new Error("Template ".concat(notification.templateId, " not found"));
                            }
                            // Update template usage statistics
                            return [4 /*yield*/, this.templateRepository.update(template.id, {
                                    lastUsedAt: new Date(),
                                    useCount: function () { return 'use_count + 1'; }
                                })];
                        case 2:
                            // Update template usage statistics
                            _c.sent();
                            metadata = notification.metadata || {};
                            // Apply template to notification
                            notification.subject = this.interpolateVariables(template.subject, metadata);
                            notification.content = this.interpolateVariables(template.content, metadata);
                            // Apply channel-specific content if available
                            if (template.channelSpecificContent) {
                                notification.channelContent = __assign(__assign({}, notification.channelContent), this.processChannelContent(template.channelSpecificContent, metadata));
                            }
                            // Inherit template channels if not specified
                            if (!((_a = notification.channels) === null || _a === void 0 ? void 0 : _a.length) && ((_b = template.channels) === null || _b === void 0 ? void 0 : _b.length)) {
                                notification.channels = template.channels.map(function (channel) { return ({
                                    name: channel,
                                    type: 'default', // Replace with actual type
                                    isActive: true, // Replace with actual value
                                    // Add other required properties for NotificationChannel here
                                    // Example:
                                    additionalProperty: 'value' // Replace with actual properties
                                }); });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationListener_1.prototype.interpolateVariables = function (content, variables) {
            return content.replace(/\{\{(.*?)\}\}/g, function (match, variable) {
                var key = variable.trim();
                return variables[key] !== undefined ? variables[key] : match;
            });
        };
        NotificationListener_1.prototype.processChannelContent = function (channelContent, variables) {
            var processed = {};
            for (var _i = 0, _a = Object.entries(channelContent); _i < _a.length; _i++) {
                var _b = _a[_i], channel = _b[0], content = _b[1];
                processed[channel] = {};
                for (var _c = 0, _d = Object.entries(content); _c < _d.length; _c++) {
                    var _e = _d[_c], key = _e[0], value = _e[1];
                    if (typeof value === 'string') {
                        processed[channel][key] = this.interpolateVariables(value, variables);
                    }
                    else {
                        processed[channel][key] = value;
                    }
                }
            }
            return processed;
        };
        return NotificationListener_1;
    }());
    __setFunctionName(_classThis, "NotificationListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleNotificationCreated_decorators = [(0, event_emitter_1.OnEvent)('notification.created')];
        _handleNotificationResend_decorators = [(0, event_emitter_1.OnEvent)('notification.resend')];
        __esDecorate(_classThis, null, _handleNotificationCreated_decorators, { kind: "method", name: "handleNotificationCreated", static: false, private: false, access: { has: function (obj) { return "handleNotificationCreated" in obj; }, get: function (obj) { return obj.handleNotificationCreated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleNotificationResend_decorators, { kind: "method", name: "handleNotificationResend", static: false, private: false, access: { has: function (obj) { return "handleNotificationResend" in obj; }, get: function (obj) { return obj.handleNotificationResend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationListener = _classThis;
}();
exports.NotificationListener = NotificationListener;
//# sourceMappingURL=notification.listener.js.map