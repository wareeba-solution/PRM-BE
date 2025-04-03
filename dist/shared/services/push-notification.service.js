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
exports.PushNotificationService = void 0;
var common_1 = require("@nestjs/common");
var admin = require("firebase-admin");
var PushNotificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PushNotificationService = _classThis = /** @class */ (function () {
        function PushNotificationService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(PushNotificationService.name);
            this.mockMode = false;
            this.initializeFirebase();
        }
        PushNotificationService_1.prototype.initializeFirebase = function () {
            try {
                // Check if Firebase credentials are available
                var projectId = this.configService.get('FIREBASE_PROJECT_ID');
                var clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
                var privateKey = this.configService.get('FIREBASE_PRIVATE_KEY');
                // Check for mock configuration
                if (projectId === 'mock' || clientEmail === 'mock' || privateKey === 'mock') {
                    this.logger.warn('Mock Firebase configuration detected - using mock implementation');
                    this.initMockFirebase();
                    this.mockMode = true;
                    return;
                }
                // Check if credentials are present
                if (!projectId || !clientEmail || !privateKey) {
                    this.logger.warn('Firebase credentials incomplete - using mock implementation');
                    this.initMockFirebase();
                    this.mockMode = true;
                    return;
                }
                // Fix common PEM formatting issues
                if (privateKey) {
                    // Replace escaped newlines with actual newlines if needed
                    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
                        privateKey = privateKey.replace(/\\n/g, '\n');
                    }
                    // Ensure proper PEM format
                    if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
                        privateKey = "-----BEGIN PRIVATE KEY-----\n".concat(privateKey);
                    }
                    if (!privateKey.endsWith('-----END PRIVATE KEY-----')) {
                        privateKey = "".concat(privateKey, "\n-----END PRIVATE KEY-----");
                    }
                }
                // Check if Firebase app is already initialized
                if (admin.apps.length) {
                    this.firebaseApp = admin.apps[0];
                    this.logger.log('Using existing Firebase Admin SDK instance');
                }
                else {
                    // Initialize Firebase Admin SDK
                    this.firebaseApp = admin.initializeApp({
                        credential: admin.credential.cert({
                            projectId: projectId,
                            clientEmail: clientEmail,
                            privateKey: privateKey,
                        }),
                        databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
                    });
                    this.logger.log('Firebase Admin SDK initialized successfully');
                }
            }
            catch (error) {
                this.logger.warn("Failed to initialize Firebase: ".concat(error.message));
                this.logger.warn('Using mock implementation instead');
                this.initMockFirebase();
                this.mockMode = true;
            }
        };
        PushNotificationService_1.prototype.initMockFirebase = function () {
            var _this = this;
            // Create a mock Firebase messaging service
            this.firebaseApp = {
                messaging: function () { return ({
                    send: function (message) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            this.logger.log("[MOCK] Sending push notification to ".concat(message.token || 'unknown'));
                            this.logger.debug('[MOCK] Push notification payload:', {
                                title: (_a = message.notification) === null || _a === void 0 ? void 0 : _a.title,
                                body: (_b = message.notification) === null || _b === void 0 ? void 0 : _b.body
                            });
                            return [2 /*return*/, "mock-message-id-".concat(Date.now())];
                        });
                    }); },
                    sendAll: function (messages) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.logger.log("[MOCK] Sending batch of ".concat(messages.length, " push notifications"));
                            return [2 /*return*/, {
                                    successCount: messages.length,
                                    failureCount: 0,
                                    responses: messages.map(function () { return ({
                                        success: true,
                                        messageId: "mock-message-id-".concat(Date.now()),
                                        error: null
                                    }); })
                                }];
                        });
                    }); },
                    subscribeToTopic: function (tokens, topic) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.logger.log("[MOCK] Subscribing ".concat(tokens.length, " tokens to topic ").concat(topic));
                            return [2 /*return*/, { successCount: tokens.length, failureCount: 0, errors: [] }];
                        });
                    }); },
                    unsubscribeFromTopic: function (tokens, topic) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.logger.log("[MOCK] Unsubscribing ".concat(tokens.length, " tokens from topic ").concat(topic));
                            return [2 /*return*/, { successCount: tokens.length, failureCount: 0, errors: [] }];
                        });
                    }); }
                }); }
            };
        };
        PushNotificationService_1.prototype.send = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var recipient, content, subject, metadata, token, message, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            recipient = notification.recipient, content = notification.content, subject = notification.subject, metadata = notification.metadata;
                            // In mock mode, don't throw error if FCM token is missing
                            if (!this.mockMode && !recipient.fcmToken) {
                                throw new Error('Recipient FCM token not found');
                            }
                            token = recipient.fcmToken || 'mock-token';
                            message = {
                                notification: {
                                    title: subject,
                                    body: this.formatContent(content),
                                },
                                data: this.prepareData(metadata),
                                token: token,
                                android: this.getAndroidConfig(metadata),
                                apns: this.getApnsConfig(metadata),
                                webpush: this.getWebPushConfig(metadata),
                            };
                            return [4 /*yield*/, this.firebaseApp.messaging().send(message)];
                        case 1:
                            response = _a.sent();
                            this.logger.debug("Push notification sent: ".concat(response));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Failed to send push notification:', error_1);
                            if (!this.mockMode) {
                                throw new Error("Push notification delivery failed: ".concat(error_1.message));
                            }
                            else {
                                this.logger.warn('[MOCK] Continuing despite push notification error');
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PushNotificationService_1.prototype.formatContent = function (content) {
            // Remove HTML tags and truncate if necessary
            return content.replace(/<[^>]*>/g, '').substring(0, 1000);
        };
        PushNotificationService_1.prototype.prepareData = function (metadata) {
            if (metadata === void 0) { metadata = {}; }
            // Convert metadata to string key-value pairs for FCM data payload
            var data = {};
            Object.entries(metadata || {}).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (typeof value !== 'undefined' && value !== null) {
                    data[key] = String(value);
                }
            });
            return data;
        };
        PushNotificationService_1.prototype.getAndroidConfig = function (metadata) {
            if (metadata === void 0) { metadata = {}; }
            return {
                priority: 'high',
                notification: {
                    icon: (metadata === null || metadata === void 0 ? void 0 : metadata.androidIcon) || 'default_icon',
                    color: (metadata === null || metadata === void 0 ? void 0 : metadata.androidColor) || '#000000',
                    clickAction: (metadata === null || metadata === void 0 ? void 0 : metadata.androidClickAction) || 'FLUTTER_NOTIFICATION_CLICK',
                },
                data: this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.androidData),
            };
        };
        PushNotificationService_1.prototype.getApnsConfig = function (metadata) {
            if (metadata === void 0) { metadata = {}; }
            return {
                payload: __assign({ aps: {
                        alert: {
                            title: metadata === null || metadata === void 0 ? void 0 : metadata.apnsTitle,
                            body: metadata === null || metadata === void 0 ? void 0 : metadata.apnsBody,
                        },
                        badge: (metadata === null || metadata === void 0 ? void 0 : metadata.apnsBadge) || 1,
                        sound: (metadata === null || metadata === void 0 ? void 0 : metadata.apnsSound) || 'default',
                    } }, this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.apnsData)),
            };
        };
        PushNotificationService_1.prototype.getWebPushConfig = function (metadata) {
            if (metadata === void 0) { metadata = {}; }
            return {
                notification: {
                    icon: metadata === null || metadata === void 0 ? void 0 : metadata.webIcon,
                    badge: metadata === null || metadata === void 0 ? void 0 : metadata.webBadge,
                    actions: metadata === null || metadata === void 0 ? void 0 : metadata.webActions,
                },
                data: this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.webData),
            };
        };
        PushNotificationService_1.prototype.sendBatch = function (notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var messages, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            messages = notifications.map(function (notification) { return ({
                                token: notification.recipient.fcmToken || 'mock-token',
                                notification: {
                                    title: notification.subject,
                                    body: _this.formatContent(notification.content),
                                },
                                data: _this.prepareData(notification.metadata),
                            }); });
                            return [4 /*yield*/, this.firebaseApp.messaging().sendAll(messages)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error('Failed to send batch push notifications:', error_2);
                            if (!this.mockMode) {
                                throw new Error("Batch push notification delivery failed: ".concat(error_2.message));
                            }
                            else {
                                this.logger.warn('[MOCK] Continuing despite batch push notification error');
                                return [2 /*return*/, {
                                        successCount: notifications.length,
                                        failureCount: 0,
                                        responses: []
                                    }];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PushNotificationService_1.prototype.subscribeTopic = function (tokens, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.firebaseApp.messaging().subscribeToTopic(tokens, topic)];
                        case 1:
                            _a.sent();
                            this.logger.log("Subscribed ".concat(tokens.length, " tokens to topic ").concat(topic));
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Failed to subscribe tokens to topic ".concat(topic, ":"), error_3);
                            if (!this.mockMode) {
                                throw new Error("Topic subscription failed: ".concat(error_3.message));
                            }
                            else {
                                this.logger.warn('[MOCK] Continuing despite topic subscription error');
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PushNotificationService_1.prototype.unsubscribeTopic = function (tokens, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.firebaseApp.messaging().unsubscribeFromTopic(tokens, topic)];
                        case 1:
                            _a.sent();
                            this.logger.log("Unsubscribed ".concat(tokens.length, " tokens from topic ").concat(topic));
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Failed to unsubscribe tokens from topic ".concat(topic, ":"), error_4);
                            if (!this.mockMode) {
                                throw new Error("Topic unsubscription failed: ".concat(error_4.message));
                            }
                            else {
                                this.logger.warn('[MOCK] Continuing despite topic unsubscription error');
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return PushNotificationService_1;
    }());
    __setFunctionName(_classThis, "PushNotificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushNotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushNotificationService = _classThis;
}();
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map