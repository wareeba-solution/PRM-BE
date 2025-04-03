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
exports.SmsService = void 0;
var common_1 = require("@nestjs/common");
var twilio_1 = require("twilio");
var SmsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SmsService = _classThis = /** @class */ (function () {
        function SmsService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(SmsService.name);
            this.mockMode = false;
            try {
                var accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
                var authToken = this.configService.get('TWILIO_AUTH_TOKEN');
                this.fromNumber = this.configService.get('TWILIO_FROM_NUMBER') || '+15555555555'; // Default mock number
                if (accountSid && accountSid.startsWith('AC') && authToken) {
                    this.twilioClient = (0, twilio_1.default)(accountSid, authToken);
                    this.logger.log('Twilio client initialized successfully');
                }
                else {
                    this.logger.warn('Invalid Twilio credentials - using mock client');
                    this.initializeMockClient();
                    this.mockMode = true;
                }
            }
            catch (error) {
                this.logger.warn("Failed to initialize Twilio client: ".concat(error.message));
                this.logger.warn('Using mock client instead');
                this.initializeMockClient();
                this.mockMode = true;
            }
        }
        SmsService_1.prototype.initializeMockClient = function () {
            var _this = this;
            this.twilioClient = {
                messages: {
                    create: function (params) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.logger.log("[MOCK] Sending SMS to ".concat(params.to, ": ").concat(params.body));
                            return [2 /*return*/, {
                                    sid: "MOCK_".concat(Date.now()),
                                    to: params.to,
                                    from: params.from,
                                    body: params.body,
                                    status: 'queued',
                                    dateCreated: new Date(),
                                    dateUpdated: new Date(),
                                    errorMessage: null
                                }];
                        });
                    }); }
                }
            };
            // Mock the messages function to handle message fetching
            var originalMessages = this.twilioClient.messages;
            this.twilioClient.messages = function (messageSid) {
                if (typeof messageSid === 'string') {
                    return {
                        fetch: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.logger.log("[MOCK] Fetching message status for ".concat(messageSid));
                                return [2 /*return*/, {
                                        sid: messageSid,
                                        status: 'delivered',
                                        dateCreated: new Date(),
                                        dateUpdated: new Date(),
                                        errorMessage: null
                                    }];
                            });
                        }); }
                    };
                }
                return originalMessages;
            };
        };
        SmsService_1.prototype.send = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var recipient, content, toNumber, smsContent, message, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            recipient = notification.recipient, content = notification.content;
                            toNumber = this.formatPhoneNumber(recipient.phoneNumber);
                            smsContent = this.formatContent(content);
                            return [4 /*yield*/, this.twilioClient.messages.create(__assign({ body: smsContent, from: this.fromNumber, to: toNumber }, this.getOptionalParams(notification.metadata)))];
                        case 1:
                            message = _a.sent();
                            this.logger.debug("SMS sent to ".concat(toNumber, ": ").concat(message.sid));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Failed to send SMS:', error_1);
                            throw new Error("SMS delivery failed: ".concat(error_1.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SmsService_1.prototype.formatPhoneNumber = function (phoneNumber) {
            // Remove any non-numeric characters and ensure E.164 format
            var cleaned = phoneNumber.replace(/\D/g, '');
            if (!cleaned.startsWith('1') && cleaned.length === 10) {
                return "+1".concat(cleaned);
            }
            return "+".concat(cleaned);
        };
        SmsService_1.prototype.formatContent = function (content) {
            // Remove HTML tags
            var smsContent = content.replace(/<[^>]*>/g, '');
            // Trim whitespace and normalize spaces
            smsContent = smsContent.replace(/\s+/g, ' ').trim();
            // SMS length limit (160 chars for single message)
            if (smsContent.length > 160) {
                smsContent = smsContent.substring(0, 157) + '...';
            }
            return smsContent;
        };
        SmsService_1.prototype.getOptionalParams = function (metadata) {
            if (metadata === void 0) { metadata = {}; }
            var params = {};
            // Handle optional Twilio parameters from metadata
            if (metadata === null || metadata === void 0 ? void 0 : metadata.statusCallback) {
                params.statusCallback = metadata.statusCallback;
            }
            if (metadata === null || metadata === void 0 ? void 0 : metadata.mediaUrl) {
                params.mediaUrl = metadata.mediaUrl;
            }
            return params;
        };
        SmsService_1.prototype.sendSms = function (phoneNumber, message) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.mockMode) {
                                this.logger.log("[MOCK] Sending SMS to ".concat(phoneNumber, ": ").concat(message));
                                return [2 /*return*/, {
                                        success: true,
                                        sid: "MOCK_".concat(Date.now()),
                                        status: 'sent'
                                    }];
                            }
                            return [4 /*yield*/, this.twilioClient.messages.create({
                                    body: message,
                                    from: this.fromNumber,
                                    to: this.formatPhoneNumber(phoneNumber)
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    sid: result.sid,
                                    status: result.status
                                }];
                    }
                });
            });
        };
        SmsService_1.prototype.getDeliveryStatus = function (messageSid) {
            return __awaiter(this, void 0, void 0, function () {
                var message, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.twilioClient.messages(messageSid).fetch()];
                        case 1:
                            message = _a.sent();
                            return [2 /*return*/, {
                                    status: message.status,
                                    error: message.errorMessage,
                                    dateCreated: message.dateCreated,
                                    dateUpdated: message.dateUpdated
                                }];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Failed to get SMS status for ".concat(messageSid, ":"), error_2);
                            throw new Error("Failed to get SMS status: ".concat(error_2.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return SmsService_1;
    }());
    __setFunctionName(_classThis, "SmsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmsService = _classThis;
}();
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map