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
exports.WebhookService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var crypto = require("crypto");
var SENSITIVE_FIELDS = ['password', 'token', 'secret', 'key', 'auth', 'credentials'];
var WebhookService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebhookService = _classThis = /** @class */ (function () {
        function WebhookService_1(configService) {
            var _this = this;
            this.configService = configService;
            this.logger = new common_1.Logger(WebhookService.name);
            this.axiosInstance = axios_1.default.create({
                timeout: this.configService.get('WEBHOOK_TIMEOUT', 5000),
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': "".concat(this.configService.get('APP_NAME', 'NotificationService'), "/1.0"),
                },
                validateStatus: function (status) { return status >= 200 && status < 300; },
            });
            this.defaultConfig = {
                method: 'POST',
                timeout: 5000,
                retryAttempts: 3,
                retryDelay: 1000,
                validateResponse: true,
            };
            // Add request interceptor for logging
            this.axiosInstance.interceptors.request.use(function (config) {
                config.metadata = { startTime: Date.now() };
                return config;
            }, function (error) {
                return Promise.reject(error);
            });
            // Add response interceptor for logging
            this.axiosInstance.interceptors.response.use(function (response) {
                var _a;
                var metadata = response.config.metadata;
                var duration = Date.now() - ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.startTime) !== null && _a !== void 0 ? _a : Date.now());
                _this.logger.debug("Webhook request completed in ".concat(duration, "ms"));
                return response;
            }, function (error) {
                var duration = Date.now() - error.config.metadata.startTime;
                _this.logger.error("Webhook request failed after ".concat(duration, "ms: ").concat(error.message));
                return Promise.reject(error);
            });
        }
        WebhookService_1.prototype.send = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var startTime, webhookConfig, attempt, lastError, response, duration, error_1;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            startTime = Date.now();
                            webhookConfig = this.getWebhookConfig(notification);
                            attempt = 0;
                            lastError = null;
                            _g.label = 1;
                        case 1:
                            if (!(attempt < ((_b = (_a = webhookConfig.retryAttempts) !== null && _a !== void 0 ? _a : this.defaultConfig.retryAttempts) !== null && _b !== void 0 ? _b : 3))) return [3 /*break*/, 8];
                            _g.label = 2;
                        case 2:
                            _g.trys.push([2, 4, , 7]);
                            return [4 /*yield*/, this.makeRequest(notification, webhookConfig)];
                        case 3:
                            response = _g.sent();
                            duration = Date.now() - startTime;
                            if (webhookConfig.validateResponse && !this.isValidResponse(response)) {
                                throw new Error('Invalid response received from webhook endpoint');
                            }
                            return [2 /*return*/, {
                                    success: true,
                                    statusCode: response.status,
                                    retryCount: attempt,
                                    duration: duration,
                                }];
                        case 4:
                            error_1 = _g.sent();
                            attempt++;
                            lastError = error_1;
                            this.logger.warn("Webhook delivery attempt ".concat(attempt, " failed for notification ").concat(notification.id, ":"), error_1.message);
                            if (!(attempt < ((_d = ((_c = webhookConfig.retryAttempts) !== null && _c !== void 0 ? _c : this.defaultConfig.retryAttempts)) !== null && _d !== void 0 ? _d : 3))) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.delay(((_f = ((_e = webhookConfig.retryDelay) !== null && _e !== void 0 ? _e : this.defaultConfig.retryDelay)) !== null && _f !== void 0 ? _f : 1000) * Math.pow(2, attempt - 1))];
                        case 5:
                            _g.sent(); // Exponential backoff
                            _g.label = 6;
                        case 6: return [3 /*break*/, 7];
                        case 7: return [3 /*break*/, 1];
                        case 8: return [2 /*return*/, {
                                success: false,
                                error: (lastError === null || lastError === void 0 ? void 0 : lastError.message) || 'Unknown error',
                                retryCount: attempt,
                                duration: Date.now() - startTime,
                            }];
                    }
                });
            });
        };
        WebhookService_1.prototype.makeRequest = function (notification, config) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, signature, requestId, requestConfig, error_2, responseData;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payload = this.preparePayload(notification);
                            signature = this.generateSignature(payload, config.secret);
                            requestId = crypto.randomUUID();
                            requestConfig = {
                                method: config.method,
                                url: config.url,
                                data: payload,
                                timeout: config.timeout,
                                headers: __assign(__assign({}, config.headers), { 'X-Webhook-Signature': signature, 'X-Notification-ID': notification.id, 'X-Request-ID': requestId, 'X-Timestamp': new Date().toISOString() }),
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.axiosInstance.request(requestConfig)];
                        case 2: return [2 /*return*/, _b.sent()];
                        case 3:
                            error_2 = _b.sent();
                            if (axios_1.default.isAxiosError(error_2)) {
                                responseData = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data;
                                throw new Error("Webhook request failed: ".concat(error_2.message, ". Response: ").concat(JSON.stringify(responseData)));
                            }
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        WebhookService_1.prototype.generateSignature = function (payload, secret) {
            if (!secret)
                return '';
            return crypto
                .createHmac('sha256', secret)
                .update(JSON.stringify(payload))
                .digest('hex');
        };
        WebhookService_1.prototype.preparePayload = function (notification) {
            var basePayload = {
                id: notification.id,
                type: notification.type,
                subject: notification.subject,
                content: notification.content,
                recipient: this.filterSensitiveData(notification.recipient),
                metadata: notification.metadata,
                timestamp: new Date().toISOString(),
                version: '1.0',
                context: notification.context ? this.filterSensitiveData(notification.context) : undefined,
            };
            // Add additional context if available
            if (notification.context) {
                basePayload['context'] = this.filterSensitiveData(notification.context);
            }
            return basePayload;
        };
        WebhookService_1.prototype.filterSensitiveData = function (data) {
            var filtered = {};
            var _loop_1 = function (key, value) {
                if (SENSITIVE_FIELDS.some(function (field) { return key.toLowerCase().includes(field); })) {
                    return "continue";
                }
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    filtered[key] = this_1.filterSensitiveData(value);
                }
                else {
                    filtered[key] = value;
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                _loop_1(key, value);
            }
            return filtered;
        };
        WebhookService_1.prototype.getWebhookConfig = function (notification) {
            var webhookUrl = this.getWebhookUrl(notification);
            if (!webhookUrl) {
                throw new Error('No webhook URL configured for notification');
            }
            return __assign(__assign({}, this.defaultConfig), { url: webhookUrl, secret: this.configService.get('WEBHOOK_SECRET'), headers: this.getCustomHeaders(notification) });
        };
        WebhookService_1.prototype.getWebhookUrl = function (notification) {
            var _a;
            // First check notification-specific webhook URL
            if ((_a = notification.metadata) === null || _a === void 0 ? void 0 : _a.webhookUrl) {
                return notification.metadata.webhookUrl;
            }
            // Then check type-specific webhook URL from config
            var typeSpecificUrl = this.configService.get("WEBHOOK_URL_".concat(notification.type));
            if (typeSpecificUrl) {
                return typeSpecificUrl;
            }
            // Finally fall back to default webhook URL
            return this.configService.get('WEBHOOK_URL') || '';
        };
        WebhookService_1.prototype.getCustomHeaders = function (notification) {
            var customHeaders = {};
            // Add type-specific headers
            if (notification.type) {
                customHeaders['X-Notification-Type'] = notification.type;
            }
            // Add organization-specific headers if available
            if (notification.organizationId) {
                customHeaders['X-Organization-ID'] = notification.organizationId;
            }
            return customHeaders;
        };
        WebhookService_1.prototype.isValidResponse = function (response) {
            return response.status >= 200 && response.status < 300;
        };
        WebhookService_1.prototype.delay = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        return WebhookService_1;
    }());
    __setFunctionName(_classThis, "WebhookService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebhookService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebhookService = _classThis;
}();
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map