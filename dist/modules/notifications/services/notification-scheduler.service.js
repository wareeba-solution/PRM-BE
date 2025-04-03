"use strict";
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
exports.NotificationSchedulerService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var schedule_1 = require("@nestjs/schedule");
var update_notification_dto_1 = require("../dto/update-notification.dto");
var create_notification_dto_1 = require("../dto/create-notification.dto");
var NotificationSchedulerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _processScheduledNotifications_decorators;
    var _retryFailedNotifications_decorators;
    var _cleanupExpiredNotifications_decorators;
    var NotificationSchedulerService = _classThis = /** @class */ (function () {
        function NotificationSchedulerService_1(notificationRepository, emailService, smsService, pushNotificationService, whatsappService, slackService, eventEmitter) {
            this.notificationRepository = (__runInitializers(this, _instanceExtraInitializers), notificationRepository);
            this.emailService = emailService;
            this.smsService = smsService;
            this.pushNotificationService = pushNotificationService;
            this.whatsappService = whatsappService;
            this.slackService = slackService;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(NotificationSchedulerService.name);
            this.MAX_RETRY_ATTEMPTS = 3;
            this.BATCH_SIZE = 100;
        }
        NotificationSchedulerService_1.prototype.rescheduleNotification = function (notificationId, newScheduledFor) {
            return __awaiter(this, void 0, void 0, function () {
                var notificationObj, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Rescheduling notification ".concat(notificationId, " to ").concat(newScheduledFor));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.notificationRepository.findOne({ where: { id: notificationId } })];
                        case 2:
                            notificationObj = _a.sent();
                            if (!notificationObj) {
                                throw new Error("Notification with ID ".concat(notificationId, " not found"));
                            }
                            // Check if notification is in a state that allows rescheduling
                            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                                throw new Error("Cannot reschedule notification with status ".concat(notificationObj.status));
                            }
                            // Update the notification
                            notificationObj.scheduledFor = newScheduledFor;
                            notificationObj.status = update_notification_dto_1.NotificationStatus.SCHEDULED;
                            notificationObj.updatedAt = new Date();
                            return [4 /*yield*/, this.notificationRepository.save(notificationObj)];
                        case 3:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('notification.rescheduled', notificationObj);
                            return [2 /*return*/, notificationObj];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error("Error rescheduling notification ".concat(notificationId), error_1);
                            throw error_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.scheduleNotification = function (notificationData, scheduledFor) {
            return __awaiter(this, void 0, void 0, function () {
                var savedNotification, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Scheduling new notification');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Set scheduling details
                            notificationData.scheduledFor = scheduledFor;
                            notificationData.status = update_notification_dto_1.NotificationStatus.SCHEDULED;
                            // Initialize retry count if not set
                            if (notificationData.retryCount === undefined) {
                                notificationData.retryCount = 0;
                            }
                            return [4 /*yield*/, this.notificationRepository.save(notificationData)];
                        case 2:
                            savedNotification = _a.sent();
                            // Emit event
                            this.eventEmitter.emit('notification.scheduled', savedNotification);
                            return [2 /*return*/, savedNotification];
                        case 3:
                            error_2 = _a.sent();
                            this.logger.error('Error scheduling notification', error_2);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.cancelScheduledNotification = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var notificationObj, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("Cancelling notification ".concat(notificationId));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.notificationRepository.findOne({ where: { id: notificationId } })];
                        case 2:
                            notificationObj = _a.sent();
                            if (!notificationObj) {
                                throw new Error("Notification with ID ".concat(notificationId, " not found"));
                            }
                            // Check if notification can be cancelled
                            if (notificationObj.status === update_notification_dto_1.NotificationStatus.DELIVERED ||
                                notificationObj.status === update_notification_dto_1.NotificationStatus.FAILED) {
                                throw new Error("Cannot cancel notification with status ".concat(notificationObj.status));
                            }
                            // Update the notification status
                            notificationObj.status = update_notification_dto_1.NotificationStatus.CANCELLED;
                            notificationObj.updatedAt = new Date();
                            return [4 /*yield*/, this.notificationRepository.save(notificationObj)];
                        case 3:
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('notification.cancelled', notificationObj);
                            return [2 /*return*/, notificationObj];
                        case 4:
                            error_3 = _a.sent();
                            this.logger.error("Error cancelling notification ".concat(notificationId), error_3);
                            throw error_3;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.processScheduledNotifications = function () {
            return __awaiter(this, void 0, void 0, function () {
                var notifications, _i, notifications_1, notification, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Processing scheduled notifications');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, this.notificationRepository.find({
                                    where: {
                                        status: update_notification_dto_1.NotificationStatus.SCHEDULED,
                                        scheduledFor: (0, typeorm_1.LessThanOrEqual)(new Date()),
                                    },
                                    take: this.BATCH_SIZE,
                                })];
                        case 2:
                            notifications = _a.sent();
                            _i = 0, notifications_1 = notifications;
                            _a.label = 3;
                        case 3:
                            if (!(_i < notifications_1.length)) return [3 /*break*/, 6];
                            notification = notifications_1[_i];
                            return [4 /*yield*/, this.processNotification(notification)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_4 = _a.sent();
                            this.logger.error('Error processing scheduled notifications', error_4);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.retryFailedNotifications = function () {
            return __awaiter(this, void 0, void 0, function () {
                var notifications, _i, notifications_2, notification, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Retrying failed notifications');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, this.notificationRepository.find({
                                    where: {
                                        status: update_notification_dto_1.NotificationStatus.FAILED,
                                        retryCount: (0, typeorm_1.LessThanOrEqual)(this.MAX_RETRY_ATTEMPTS),
                                    },
                                    take: this.BATCH_SIZE,
                                })];
                        case 2:
                            notifications = _a.sent();
                            _i = 0, notifications_2 = notifications;
                            _a.label = 3;
                        case 3:
                            if (!(_i < notifications_2.length)) return [3 /*break*/, 6];
                            notification = notifications_2[_i];
                            return [4 /*yield*/, this.processNotification(notification, true)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_5 = _a.sent();
                            this.logger.error('Error retrying failed notifications', error_5);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.cleanupExpiredNotifications = function () {
            return __awaiter(this, void 0, void 0, function () {
                var expiryDate, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug('Cleaning up expired notifications');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            expiryDate = new Date();
                            expiryDate.setDate(expiryDate.getDate() - 30); // 30 days retention
                            return [4 /*yield*/, this.notificationRepository.update({
                                    status: (0, typeorm_1.Not)((0, typeorm_1.In)([update_notification_dto_1.NotificationStatus.DELIVERED, update_notification_dto_1.NotificationStatus.FAILED])),
                                    createdAt: (0, typeorm_1.LessThanOrEqual)(expiryDate),
                                }, {
                                    status: update_notification_dto_1.NotificationStatus.EXPIRED,
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_6 = _a.sent();
                            this.logger.error('Error cleaning up expired notifications', error_6);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.processNotification = function (notification_1) {
            return __awaiter(this, arguments, void 0, function (notification, isRetry) {
                var _i, _a, channel, error_7;
                if (isRetry === void 0) { isRetry = false; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.logger.debug("Processing notification ".concat(notification.id));
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, , 10]);
                            // Update status to processing
                            notification.status = update_notification_dto_1.NotificationStatus.PROCESSING;
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 2:
                            _b.sent();
                            _i = 0, _a = notification.channels;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            channel = _a[_i];
                            return [4 /*yield*/, this.sendNotificationByChannel(notification, channel)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            // Update notification status
                            notification.status = update_notification_dto_1.NotificationStatus.DELIVERED;
                            notification.deliveredAt = new Date();
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 7:
                            _b.sent();
                            // Emit event for successful delivery
                            this.eventEmitter.emit('notification.delivered', notification);
                            return [3 /*break*/, 10];
                        case 8:
                            error_7 = _b.sent();
                            this.logger.error("Error processing notification ".concat(notification.id), error_7);
                            // Handle retry logic
                            if (isRetry) {
                                notification.retryCount = (notification.retryCount || 0) + 1;
                            }
                            // Update status based on retry attempts
                            if (notification.retryCount >= this.MAX_RETRY_ATTEMPTS) {
                                notification.status = update_notification_dto_1.NotificationStatus.FAILED;
                                notification.error = error_7.message;
                                this.eventEmitter.emit('notification.failed', notification);
                            }
                            else {
                                notification.status = update_notification_dto_1.NotificationStatus.PENDING;
                            }
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 9:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendNotificationByChannel = function (notification, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = channel;
                            switch (_a) {
                                case create_notification_dto_1.NotificationChannel.EMAIL: return [3 /*break*/, 1];
                                case create_notification_dto_1.NotificationChannel.SMS: return [3 /*break*/, 3];
                                case create_notification_dto_1.NotificationChannel.PUSH: return [3 /*break*/, 5];
                                case create_notification_dto_1.NotificationChannel.WHATSAPP: return [3 /*break*/, 7];
                                case create_notification_dto_1.NotificationChannel.SLACK: return [3 /*break*/, 9];
                                case create_notification_dto_1.NotificationChannel.IN_APP: return [3 /*break*/, 11];
                            }
                            return [3 /*break*/, 12];
                        case 1: return [4 /*yield*/, this.sendEmailNotification(notification)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 3: return [4 /*yield*/, this.sendSmsNotification(notification)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 5: return [4 /*yield*/, this.sendPushNotification(notification)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 7: return [4 /*yield*/, this.sendWhatsappNotification(notification, notification.recipientDetails)];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 9: return [4 /*yield*/, this.sendSlackNotification(notification)];
                        case 10:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 11: 
                        // In-app notifications don't need additional processing
                        return [3 /*break*/, 13];
                        case 12:
                            this.logger.warn("Unknown notification channel: ".concat(channel));
                            _b.label = 13;
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendEmailNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.email)) {
                                throw new Error('Email address not provided');
                            }
                            // The simplest approach: just pass the notification as-is
                            return [4 /*yield*/, this.emailService.send(notification)];
                        case 1:
                            // The simplest approach: just pass the notification as-is
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendSmsNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.phone)) {
                                throw new Error('Phone number not provided');
                            }
                            // The simplest approach: just pass the notification as-is
                            return [4 /*yield*/, this.smsService.send(notification)];
                        case 1:
                            // The simplest approach: just pass the notification as-is
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendPushNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!((_b = (_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.deviceTokens) === null || _b === void 0 ? void 0 : _b.length)) {
                                throw new Error('No device tokens available');
                            }
                            // The simplest approach: just pass the notification as-is
                            return [4 /*yield*/, this.pushNotificationService.send(notification)];
                        case 1:
                            // The simplest approach: just pass the notification as-is
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendWhatsappNotification = function (notification, user) {
            return __awaiter(this, void 0, void 0, function () {
                var error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            if (!user || !user.phoneNumber) {
                                throw new Error('Phone number not provided for WhatsApp notification');
                            }
                            // Use the sendMessage method with only required parameters
                            return [4 /*yield*/, this.whatsappService.sendMessage({
                                    to: user.phoneNumber,
                                    text: notification.content
                                })];
                        case 1:
                            // Use the sendMessage method with only required parameters
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            error_8 = _a.sent();
                            this.logger.error("Failed to send WhatsApp notification: ".concat(error_8.message), error_8.stack);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationSchedulerService_1.prototype.sendSlackNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = notification.recipientDetails) === null || _a === void 0 ? void 0 : _a.slackUserId)) {
                                throw new Error('Slack user ID not provided');
                            }
                            // Use only the required parameters for Slack
                            return [4 /*yield*/, this.slackService.sendDirectMessage({
                                    userId: notification.recipientDetails.slackUserId,
                                    message: {
                                        text: notification.title,
                                        blocks: [
                                            {
                                                type: 'section',
                                                text: {
                                                    type: 'mrkdwn',
                                                    text: notification.content,
                                                },
                                            },
                                        ],
                                    },
                                })];
                        case 1:
                            // Use only the required parameters for Slack
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationSchedulerService_1;
    }());
    __setFunctionName(_classThis, "NotificationSchedulerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _processScheduledNotifications_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE)];
        _retryFailedNotifications_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES)];
        _cleanupExpiredNotifications_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
        __esDecorate(_classThis, null, _processScheduledNotifications_decorators, { kind: "method", name: "processScheduledNotifications", static: false, private: false, access: { has: function (obj) { return "processScheduledNotifications" in obj; }, get: function (obj) { return obj.processScheduledNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _retryFailedNotifications_decorators, { kind: "method", name: "retryFailedNotifications", static: false, private: false, access: { has: function (obj) { return "retryFailedNotifications" in obj; }, get: function (obj) { return obj.retryFailedNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cleanupExpiredNotifications_decorators, { kind: "method", name: "cleanupExpiredNotifications", static: false, private: false, access: { has: function (obj) { return "cleanupExpiredNotifications" in obj; }, get: function (obj) { return obj.cleanupExpiredNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationSchedulerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationSchedulerService = _classThis;
}();
exports.NotificationSchedulerService = NotificationSchedulerService;
//# sourceMappingURL=notification-scheduler.service.js.map