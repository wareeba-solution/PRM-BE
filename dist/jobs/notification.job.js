"use strict";
// src/jobs/notification.job.ts
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
exports.NotificationJob = void 0;
var common_1 = require("@nestjs/common");
var bull_1 = require("@nestjs/bull");
var typeorm_1 = require("typeorm");
var websockets_1 = require("@nestjs/websockets");
var notification_entity_1 = require("../modules/notifications/entities/notification.entity");
var notification_priority_enum_1 = require("../modules/notifications/enums/notification-priority.enum");
var NotificationJob = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, bull_1.Processor)('notifications'), (0, websockets_1.WebSocketGateway)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _processNotification_decorators;
    var NotificationJob = _classThis = /** @class */ (function () {
        function NotificationJob_1(notificationQueue, notificationRepository, userRepository, pushSubscriptionRepository, emailService, smsService, configService) {
            this.notificationQueue = (__runInitializers(this, _instanceExtraInitializers), notificationQueue);
            this.notificationRepository = notificationRepository;
            this.userRepository = userRepository;
            this.pushSubscriptionRepository = pushSubscriptionRepository;
            this.emailService = emailService;
            this.smsService = smsService;
            this.configService = configService;
            this.logger = new common_1.Logger(NotificationJob.name);
            this.server = __runInitializers(this, _server_initializers, void 0);
            __runInitializers(this, _server_extraInitializers);
            this.notificationQueue = notificationQueue;
            this.notificationRepository = notificationRepository;
            this.userRepository = userRepository;
            this.pushSubscriptionRepository = pushSubscriptionRepository;
            this.emailService = emailService;
            this.smsService = smsService;
            this.configService = configService;
        }
        NotificationJob_1.prototype.processNotification = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var data, recipients, notifications, error_1;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            data = job.data;
                            this.logger.debug("Processing notification job ".concat(job.id));
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.getRecipients(data.recipients)];
                        case 2:
                            recipients = _e.sent();
                            if (!recipients.length) {
                                this.logger.warn("No recipients found for notification ".concat(job.id));
                                return [2 /*return*/, { success: false, error: 'No recipients found' }];
                            }
                            return [4 /*yield*/, this.createNotifications(data, recipients)];
                        case 3:
                            notifications = _e.sent();
                            // Process each delivery channel
                            return [4 /*yield*/, Promise.all([
                                    // In-app notifications
                                    ((_a = data.channels) === null || _a === void 0 ? void 0 : _a.inApp) !== false && this.sendInAppNotifications(notifications),
                                    // Email notifications
                                    ((_b = data.channels) === null || _b === void 0 ? void 0 : _b.email) && this.sendEmailNotifications(notifications),
                                    // SMS notifications
                                    ((_c = data.channels) === null || _c === void 0 ? void 0 : _c.sms) && this.sendSmsNotifications(notifications),
                                    // Push notifications
                                    ((_d = data.channels) === null || _d === void 0 ? void 0 : _d.push) && this.sendPushNotifications(notifications),
                                ])];
                        case 4:
                            // Process each delivery channel
                            _e.sent();
                            return [2 /*return*/, { success: true, notificationIds: notifications.map(function (n) { return n.id; }) }];
                        case 5:
                            error_1 = _e.sent();
                            this.logger.error("Failed to process notification job ".concat(job.id, ":"), error_1);
                            throw error_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationJob_1.prototype.getRecipients = function (recipientData) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    query = this.userRepository.createQueryBuilder('user');
                    if ((_a = recipientData.userIds) === null || _a === void 0 ? void 0 : _a.length) {
                        query.orWhere('user.id IN (:...userIds)', { userIds: recipientData.userIds });
                    }
                    if ((_b = recipientData.organizationIds) === null || _b === void 0 ? void 0 : _b.length) {
                        query.orWhere('user.organizationId IN (:...orgIds)', {
                            orgIds: recipientData.organizationIds
                        });
                    }
                    if ((_c = recipientData.roles) === null || _c === void 0 ? void 0 : _c.length) {
                        query.orWhere('user.role IN (:...roles)', { roles: recipientData.roles });
                    }
                    return [2 /*return*/, query.getMany()];
                });
            });
        };
        NotificationJob_1.prototype.createNotifications = function (data, recipients) {
            return __awaiter(this, void 0, void 0, function () {
                var notifications;
                return __generator(this, function (_a) {
                    notifications = recipients.map(function (recipient) {
                        var _a;
                        var notification = new notification_entity_1.Notification();
                        notification.type = data.type;
                        notification.title = data.title;
                        notification.message = data.message;
                        notification.data = data.data;
                        notification.priority = data.priority || notification_priority_enum_1.NotificationPriority.MEDIUM;
                        notification.userId = recipient.id;
                        notification.organizationId = recipient.organizationId;
                        notification.metadata = __assign(__assign({}, data.metadata), { recipientRole: recipient.role });
                        notification.status = 'PENDING';
                        notification.expiresAt = (_a = data.metadata) === null || _a === void 0 ? void 0 : _a.expiresAt;
                        return notification;
                    });
                    return [2 /*return*/, this.notificationRepository.save(notifications)];
                });
            });
        };
        NotificationJob_1.prototype.sendInAppNotifications = function (notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var userNotifications, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userNotifications = notifications.reduce(function (acc, notification) {
                                if (!acc[notification.userId]) {
                                    acc[notification.userId] = [];
                                }
                                acc[notification.userId].push(notification);
                                return acc;
                            }, {});
                            // Send to connected users via WebSocket
                            Object.entries(userNotifications).forEach(function (_a) {
                                var userId = _a[0], userNotifs = _a[1];
                                _this.server.to("user:".concat(userId)).emit('notifications', userNotifs);
                            });
                            // Mark as delivered
                            return [4 /*yield*/, this.notificationRepository.update({ id: (0, typeorm_1.In)(notifications.map(function (n) { return n.id; })) }, {
                                    status: 'DELIVERED',
                                    deliveredAt: new Date(),
                                })];
                        case 1:
                            // Mark as delivered
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error('Failed to send in-app notifications:', error_2);
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationJob_1.prototype.sendEmailNotifications = function (notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var userNotifications, emailPromises, error_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userNotifications = notifications.reduce(function (acc, notification) {
                                if (!acc[notification.userId]) {
                                    acc[notification.userId] = [];
                                }
                                acc[notification.userId].push(notification);
                                return acc;
                            }, {});
                            emailPromises = Object.entries(userNotifications).map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                var user;
                                var userId = _b[0], userNotifs = _b[1];
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                                        case 1:
                                            user = _c.sent();
                                            if (!(user === null || user === void 0 ? void 0 : user.email))
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.emailService.sendNotificationEmail(user.email, {
                                                    notifications: userNotifs,
                                                    userName: "".concat(user.firstName, " ").concat(user.lastName),
                                                })];
                                        case 2:
                                            _c.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(emailPromises)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error('Failed to send email notifications:', error_3);
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationJob_1.prototype.sendSmsNotifications = function (notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var userNotifications, smsPromises, error_4;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userNotifications = notifications.reduce(function (acc, notification) {
                                if (!acc[notification.userId]) {
                                    acc[notification.userId] = [];
                                }
                                acc[notification.userId].push(notification);
                                return acc;
                            }, {});
                            smsPromises = Object.entries(userNotifications).map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                var user, message;
                                var userId = _b[0], userNotifs = _b[1];
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                                        case 1:
                                            user = _c.sent();
                                            if (!user || !user.mobilePhone)
                                                return [2 /*return*/];
                                            message = "You have ".concat(userNotifs.length, " new notification(s): ").concat(userNotifs[0].title).concat(userNotifs.length > 1 ? ' and more...' : '');
                                            return [4 /*yield*/, this.smsService.sendSms(user.mobilePhone, message)];
                                        case 2:
                                            _c.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(smsPromises)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error('Failed to send SMS notifications:', error_4);
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationJob_1.prototype.sendPushNotifications = function (notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var subscriptions, userNotifications_1, pushPromises, error_5;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.pushSubscriptionRepository.find({
                                    where: {
                                        userId: (0, typeorm_1.In)(notifications.map(function (n) { return n.userId; })),
                                        active: true,
                                    },
                                })];
                        case 1:
                            subscriptions = _a.sent();
                            userNotifications_1 = notifications.reduce(function (acc, notification) {
                                if (!acc[notification.userId]) {
                                    acc[notification.userId] = [];
                                }
                                acc[notification.userId].push(notification);
                                return acc;
                            }, {});
                            pushPromises = subscriptions.map(function (subscription) { return __awaiter(_this, void 0, void 0, function () {
                                var userNotifs;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            userNotifs = userNotifications_1[subscription.userId];
                                            if (!userNotifs)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.sendPushNotification(subscription, userNotifs)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(pushPromises)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error('Failed to send push notifications:', error_5);
                            throw error_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationJob_1.prototype.sendPushNotification = function (subscription, notifications) {
            return __awaiter(this, void 0, void 0, function () {
                var webpush, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 5]);
                            webpush = require('web-push');
                            webpush.setVapidDetails('mailto:' + this.configService.get('mail.from'), this.configService.get('push.publicKey'), this.configService.get('push.privateKey'));
                            return [4 /*yield*/, webpush.sendNotification(JSON.parse(subscription.subscription), JSON.stringify({
                                    notifications: notifications,
                                    timestamp: new Date().toISOString(),
                                }))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error('Failed to send push notification:', error_6);
                            if (!(error_6.statusCode === 410)) return [3 /*break*/, 4];
                            // Subscription has expired or is no longer valid
                            return [4 /*yield*/, this.pushSubscriptionRepository.update({ id: subscription.id }, { active: false })];
                        case 3:
                            // Subscription has expired or is no longer valid
                            _a.sent();
                            _a.label = 4;
                        case 4: throw error_6;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Queue management methods
        NotificationJob_1.prototype.addToQueue = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationQueue.add('send', data, {
                            priority: this.getPriorityLevel(data.priority),
                            attempts: 3,
                            backoff: {
                                type: 'exponential',
                                delay: 5000,
                            },
                            removeOnComplete: true,
                            removeOnFail: false,
                        })];
                });
            });
        };
        NotificationJob_1.prototype.getPriorityLevel = function (priority) {
            switch (priority) {
                case notification_priority_enum_1.NotificationPriority.URGENT:
                    return 1;
                case notification_priority_enum_1.NotificationPriority.HIGH:
                    return 2;
                case notification_priority_enum_1.NotificationPriority.MEDIUM:
                    return 3;
                case notification_priority_enum_1.NotificationPriority.LOW:
                    return 4;
                default:
                    return 3;
            }
        };
        // Cleanup methods
        NotificationJob_1.prototype.cleanupOldNotifications = function () {
            return __awaiter(this, void 0, void 0, function () {
                var thirtyDaysAgo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            return [4 /*yield*/, this.notificationRepository.delete({
                                    createdAt: (0, typeorm_1.LessThan)(thirtyDaysAgo),
                                    status: (0, typeorm_1.In)(['DELIVERED', 'READ']),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationJob_1;
    }());
    __setFunctionName(_classThis, "NotificationJob");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _processNotification_decorators = [(0, bull_1.Process)('send')];
        __esDecorate(_classThis, null, _processNotification_decorators, { kind: "method", name: "processNotification", static: false, private: false, access: { has: function (obj) { return "processNotification" in obj; }, get: function (obj) { return obj.processNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationJob = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationJob = _classThis;
}();
exports.NotificationJob = NotificationJob;
//# sourceMappingURL=notification.job.js.map