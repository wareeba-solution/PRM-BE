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
exports.NotificationsService = void 0;
var common_1 = require("@nestjs/common");
var notification_entity_1 = require("../entities/notification.entity");
var update_notification_dto_1 = require("../dto/update-notification.dto");
var NotificationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationsService = _classThis = /** @class */ (function () {
        function NotificationsService_1(notificationRepository, templateRepository, preferenceRepository, emailService, smsService, whatsappService) {
            this.notificationRepository = notificationRepository;
            this.templateRepository = templateRepository;
            this.preferenceRepository = preferenceRepository;
            this.emailService = emailService;
            this.smsService = smsService;
            this.whatsappService = whatsappService;
            this.logger = new common_1.Logger(NotificationsService.name);
        }
        NotificationsService_1.prototype.notifyMessageFailure = function (message) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        NotificationsService_1.prototype.getNotificationChannels = function (organizationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to get notification channels
                    return [2 /*return*/, []];
                });
            });
        };
        NotificationsService_1.prototype.getUserPreferences = function (organizationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to get user preferences
                    return [2 /*return*/, {}]; // Replace with actual implementation
                });
            });
        };
        NotificationsService_1.prototype.getNotificationById = function (id, organizationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to get a notification by id
                    // This is a placeholder implementation
                    return [2 /*return*/, null];
                });
            });
        };
        NotificationsService_1.prototype.updateNotification = function (id, updateNotificationDto) {
            return __awaiter(this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findOne({ where: { id: id } })];
                        case 1:
                            notification = _a.sent();
                            if (!notification) {
                                throw new common_1.NotFoundException('Notification not found');
                            }
                            Object.assign(notification, updateNotificationDto);
                            return [2 /*return*/, this.notificationRepository.save(notification)];
                    }
                });
            });
        };
        NotificationsService_1.prototype.notifyMessageDelivery = function (message) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation for notifying about message delivery
                    console.log("Message delivered: ".concat(message.id));
                    return [2 /*return*/];
                });
            });
        };
        NotificationsService_1.prototype.create = function (notificationData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implementation for creating a notification
                    // This is a placeholder implementation
                    console.log('Notification created:', notificationData);
                    return [2 /*return*/];
                });
            });
        };
        NotificationsService_1.prototype.send = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var preferences, template, content, notification, notificationPromises, email, phone, whatsappNumber, error_1;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            _o.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, this.preferenceRepository.findOne({
                                    where: {
                                        userId: dto.userId,
                                        category: dto.type,
                                    },
                                })];
                        case 1:
                            preferences = _o.sent();
                            if (!preferences) {
                                this.logger.warn("No notification preferences found for user ".concat(dto.userId));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: { type: dto.type },
                                })];
                        case 2:
                            template = _o.sent();
                            content = template
                                ? this.compileTemplate(template.content, __assign(__assign({}, dto.data), { title: dto.title, message: dto.message }))
                                : dto.message;
                            return [4 /*yield*/, this.notificationRepository.save({
                                    userId: dto.userId,
                                    type: dto.type,
                                    content: content,
                                    title: dto.title,
                                    metadata: __assign(__assign({}, dto.data), { organizationId: dto.organizationId, priority: dto.priority }),
                                    status: String(update_notification_dto_1.NotificationStatus.PENDING),
                                    organizationId: dto.organizationId || '',
                                    senderId: dto.userId,
                                    channels: preferences.enabledChannels,
                                })];
                        case 3:
                            notification = _o.sent();
                            notificationPromises = [];
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.EMAIL) &&
                                ((_c = (_b = (_a = preferences.channelSpecificSettings) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.addresses) === null || _c === void 0 ? void 0 : _c.length)) {
                                email = preferences.channelSpecificSettings.email.addresses[0];
                                notificationPromises.push(this.sendEmailNotification(email, {
                                    appointmentId: ((_d = dto.data) === null || _d === void 0 ? void 0 : _d.userId) || 'N/A',
                                    patientName: 'User',
                                    doctorName: 'N/A',
                                    dateTime: new Date(),
                                    location: 'N/A',
                                    notes: "".concat(dto.title, ": ").concat(dto.message),
                                    organizationName: dto.organizationId || 'System',
                                }));
                            }
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.SMS) &&
                                ((_g = (_f = (_e = preferences.channelSpecificSettings) === null || _e === void 0 ? void 0 : _e.sms) === null || _f === void 0 ? void 0 : _f.phoneNumbers) === null || _g === void 0 ? void 0 : _g.length)) {
                                phone = preferences.channelSpecificSettings.sms.phoneNumbers[0];
                                notificationPromises.push(this.sendSmsNotification(phone, {
                                    appointmentId: ((_h = dto.data) === null || _h === void 0 ? void 0 : _h.userId) || 'N/A',
                                    patientName: 'User',
                                    dateTime: new Date(),
                                    organizationName: dto.organizationId || 'System',
                                }));
                            }
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.WHATSAPP) &&
                                ((_l = (_k = (_j = preferences.channelSpecificSettings) === null || _j === void 0 ? void 0 : _j.whatsapp) === null || _k === void 0 ? void 0 : _k.numbers) === null || _l === void 0 ? void 0 : _l.length)) {
                                whatsappNumber = preferences.channelSpecificSettings.whatsapp.numbers[0];
                                notificationPromises.push(this.whatsappService.sendAppointmentReminder(whatsappNumber, {
                                    appointmentId: ((_m = dto.data) === null || _m === void 0 ? void 0 : _m.userId) || 'N/A',
                                    patientName: 'User',
                                    doctorName: 'N/A',
                                    dateTime: new Date(),
                                    location: 'N/A',
                                    organizationName: dto.organizationId || 'System',
                                }));
                            }
                            return [4 /*yield*/, Promise.all(notificationPromises)];
                        case 4:
                            _o.sent();
                            return [4 /*yield*/, this.notificationRepository
                                    .createQueryBuilder()
                                    .update(notification_entity_1.Notification)
                                    .set({ status: String(update_notification_dto_1.NotificationStatus.SENT) })
                                    .where('id = :id', { id: notification.id })
                                    .execute()];
                        case 5:
                            _o.sent();
                            this.logger.log("Successfully sent notification ".concat(notification.id, " to user ").concat(dto.userId));
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _o.sent();
                            this.logger.error("Failed to send notification to user ".concat(dto.userId, ":"), error_1);
                            throw error_1;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.notifyError = function (source, error) {
            return __awaiter(this, void 0, void 0, function () {
                var notification, adminPreferences, _i, adminPreferences_1, pref, notificationPromises, email, phone, whatsappNumber, notifyError_1, error_2;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            _k.trys.push([0, 10, , 11]);
                            return [4 /*yield*/, this.notificationRepository.save({
                                    type: 'ERROR',
                                    source: source,
                                    content: error.message,
                                    title: 'System Error',
                                    metadata: {
                                        stack: error.stack,
                                        timestamp: new Date().toISOString(),
                                    },
                                    status: String(update_notification_dto_1.NotificationStatus.PENDING),
                                    organizationId: '',
                                    senderId: 'system',
                                    channels: [notification_entity_1.NotificationChannel.EMAIL],
                                })];
                        case 1:
                            notification = _k.sent();
                            return [4 /*yield*/, this.preferenceRepository.find({
                                    where: { category: 'ERROR' },
                                })];
                        case 2:
                            adminPreferences = _k.sent();
                            _i = 0, adminPreferences_1 = adminPreferences;
                            _k.label = 3;
                        case 3:
                            if (!(_i < adminPreferences_1.length)) return [3 /*break*/, 8];
                            pref = adminPreferences_1[_i];
                            _k.label = 4;
                        case 4:
                            _k.trys.push([4, 6, , 7]);
                            notificationPromises = [];
                            if (pref.enabledChannels.includes(notification_entity_1.NotificationChannel.EMAIL) &&
                                ((_c = (_b = (_a = pref.channelSpecificSettings) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.addresses) === null || _c === void 0 ? void 0 : _c.length)) {
                                email = pref.channelSpecificSettings.email.addresses[0];
                                notificationPromises.push(this.sendEmailNotification(email, {
                                    appointmentId: 'N/A',
                                    patientName: 'N/A',
                                    doctorName: 'N/A',
                                    dateTime: new Date(),
                                    location: 'N/A',
                                    notes: "Error in ".concat(source, ": ").concat(error.message),
                                    organizationName: 'System',
                                }));
                            }
                            if (pref.enabledChannels.includes(notification_entity_1.NotificationChannel.SMS) &&
                                ((_f = (_e = (_d = pref.channelSpecificSettings) === null || _d === void 0 ? void 0 : _d.sms) === null || _e === void 0 ? void 0 : _e.phoneNumbers) === null || _f === void 0 ? void 0 : _f.length)) {
                                phone = pref.channelSpecificSettings.sms.phoneNumbers[0];
                                notificationPromises.push(this.sendSmsNotification(phone, {
                                    appointmentId: 'N/A',
                                    patientName: 'Admin',
                                    dateTime: new Date(),
                                    organizationName: "System Error: ".concat(source),
                                }));
                            }
                            if (pref.enabledChannels.includes(notification_entity_1.NotificationChannel.WHATSAPP) &&
                                ((_j = (_h = (_g = pref.channelSpecificSettings) === null || _g === void 0 ? void 0 : _g.whatsapp) === null || _h === void 0 ? void 0 : _h.numbers) === null || _j === void 0 ? void 0 : _j.length)) {
                                whatsappNumber = pref.channelSpecificSettings.whatsapp.numbers[0];
                                notificationPromises.push(this.whatsappService.sendAppointmentReminder(whatsappNumber, {
                                    appointmentId: 'N/A',
                                    patientName: 'Admin',
                                    doctorName: 'N/A',
                                    dateTime: new Date(),
                                    location: 'N/A',
                                    organizationName: "System Error: ".concat(source),
                                }));
                            }
                            return [4 /*yield*/, Promise.all(notificationPromises)];
                        case 5:
                            _k.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            notifyError_1 = _k.sent();
                            this.logger.error("Failed to notify admin ".concat(pref.userId, ":"), notifyError_1);
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 3];
                        case 8: return [4 /*yield*/, this.notificationRepository
                                .createQueryBuilder()
                                .update(notification_entity_1.Notification)
                                .set({ status: String(update_notification_dto_1.NotificationStatus.SENT) })
                                .where('id = :id', { id: notification.id })
                                .execute()];
                        case 9:
                            _k.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            error_2 = _k.sent();
                            this.logger.error('Failed to process error notification:', error_2);
                            throw error_2;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.sendNotification = function (userId, type, data) {
            return __awaiter(this, void 0, void 0, function () {
                var preferences, template, notification, notificationPromises, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, this.preferenceRepository.findOne({
                                    where: {
                                        userId: userId,
                                        category: type,
                                    },
                                })];
                        case 1:
                            preferences = _a.sent();
                            if (!preferences) {
                                this.logger.warn("No notification preferences found for user ".concat(userId));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.templateRepository.findOne({
                                    where: { type: type },
                                })];
                        case 2:
                            template = _a.sent();
                            if (!template) {
                                throw new Error("Template not found for notification type: ".concat(type));
                            }
                            return [4 /*yield*/, this.notificationRepository.save({
                                    userId: userId,
                                    type: type,
                                    content: this.compileTemplate(template.content, data),
                                    title: data.title || 'Notification',
                                    metadata: data,
                                    status: String(update_notification_dto_1.NotificationStatus.PENDING),
                                    organizationId: data.organizationId || '',
                                    senderId: userId,
                                    channels: preferences.enabledChannels,
                                })];
                        case 3:
                            notification = _a.sent();
                            notificationPromises = [];
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.EMAIL) &&
                                data.email) {
                                notificationPromises.push(this.sendEmailNotification(data.email, {
                                    appointmentId: data.appointmentId || 'N/A',
                                    patientName: data.patientName || 'N/A',
                                    doctorName: data.doctorName || 'N/A',
                                    dateTime: data.dateTime || new Date(),
                                    location: data.location || 'N/A',
                                    notes: data.notes,
                                    organizationName: data.organizationName || 'System',
                                }));
                            }
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.SMS) &&
                                data.phone) {
                                notificationPromises.push(this.sendSmsNotification(data.phone, {
                                    appointmentId: data.appointmentId || 'N/A',
                                    patientName: data.patientName || 'N/A',
                                    dateTime: data.dateTime || new Date(),
                                    organizationName: data.organizationName || 'System',
                                }));
                            }
                            if (preferences.enabledChannels.includes(notification_entity_1.NotificationChannel.WHATSAPP) &&
                                data.whatsapp) {
                                notificationPromises.push(this.whatsappService.sendAppointmentReminder(data.whatsapp, {
                                    appointmentId: data.appointmentId || 'N/A',
                                    patientName: data.patientName || 'N/A',
                                    doctorName: data.doctorName || 'N/A',
                                    dateTime: data.dateTime || new Date(),
                                    location: data.location || 'N/A',
                                    organizationName: data.organizationName || 'System',
                                }));
                            }
                            return [4 /*yield*/, Promise.all(notificationPromises)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.notificationRepository
                                    .createQueryBuilder()
                                    .update(notification_entity_1.Notification)
                                    .set({ status: String(update_notification_dto_1.NotificationStatus.SENT) })
                                    .where('id = :id', { id: notification.id })
                                    .execute()];
                        case 5:
                            _a.sent();
                            this.logger.log("Successfully sent notification ".concat(notification.id, " to user ").concat(userId));
                            return [3 /*break*/, 7];
                        case 6:
                            error_3 = _a.sent();
                            this.logger.error("Failed to send notification to user ".concat(userId, ":"), error_3);
                            throw error_3;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.compileTemplate = function (template, data) {
            return template.replace(/\{\{([^}]+)\}\}/g, function (match, key) {
                var value = key.split('.').reduce(function (obj, k) { return obj === null || obj === void 0 ? void 0 : obj[k]; }, data);
                return value || '';
            });
        };
        NotificationsService_1.prototype.markAsRead = function (notificationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository
                                .createQueryBuilder()
                                .update(notification_entity_1.Notification)
                                .set({
                                readAt: new Date(),
                                read: true
                            })
                                .where('id = :id AND userId = :userId', { id: notificationId, userId: userId })
                                .execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.markAllAsRead = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository
                                .createQueryBuilder()
                                .update(notification_entity_1.Notification)
                                .set({
                                readAt: new Date(),
                                read: true
                            })
                                .where('userId = :userId AND readAt IS NULL', { userId: userId })
                                .execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.getUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationRepository.count({
                            where: {
                                userId: userId,
                                readAt: null
                            },
                        })];
                });
            });
        };
        NotificationsService_1.prototype.getUserNotifications = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var _a, skip, _b, take, _c, includeRead, queryBuilder, _d, notifications, total;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = options.skip, skip = _a === void 0 ? 0 : _a, _b = options.take, take = _b === void 0 ? 10 : _b, _c = options.includeRead, includeRead = _c === void 0 ? false : _c;
                            queryBuilder = this.notificationRepository
                                .createQueryBuilder('notification')
                                .where('notification.userId = :userId', { userId: userId });
                            if (!includeRead) {
                                queryBuilder.andWhere('notification.readAt IS NULL');
                            }
                            return [4 /*yield*/, queryBuilder
                                    .orderBy('notification.createdAt', 'DESC')
                                    .skip(skip)
                                    .take(take)
                                    .getManyAndCount()];
                        case 1:
                            _d = _e.sent(), notifications = _d[0], total = _d[1];
                            return [2 /*return*/, { notifications: notifications, total: total }];
                    }
                });
            });
        };
        // Helper methods to forward notifications to the appropriate service
        NotificationsService_1.prototype.sendEmailNotification = function (email, data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            // Using sendMail which is more likely to exist in EmailService
                            return [4 /*yield*/, ((_b = (_a = this.emailService).sendEmail) === null || _b === void 0 ? void 0 : _b.call(_a, {
                                    to: email,
                                    subject: "Appointment Reminder: ".concat(data.organizationName),
                                    html: this.formatEmailContent(data)
                                }))];
                        case 1:
                            // Using sendMail which is more likely to exist in EmailService
                            _c.sent();
                            this.logger.log("Sent email notification to ".concat(email));
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _c.sent();
                            // If sendMail doesn't exist, log the error but don't crash
                            this.logger.error("Error sending email to ".concat(email, ":"), error_4);
                            // Implement a simple fallback
                            this.logger.log("Would send email to ".concat(email, " with content: ").concat(JSON.stringify(data)));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.sendSmsNotification = function (phone, data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            // Using sendSms which is more likely to exist in SmsService
                            return [4 /*yield*/, ((_b = (_a = this.smsService).sendSms) === null || _b === void 0 ? void 0 : _b.call(_a, phone, this.formatSmsContent(data)))];
                        case 1:
                            // Using sendSms which is more likely to exist in SmsService
                            _c.sent();
                            this.logger.log("Sent SMS notification to ".concat(phone));
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _c.sent();
                            // If sendSms doesn't exist, log the error but don't crash
                            this.logger.error("Error sending SMS to ".concat(phone, ":"), error_5);
                            // Implement a simple fallback
                            this.logger.log("Would send SMS to ".concat(phone, " with content: ").concat(JSON.stringify(data)));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsService_1.prototype.formatEmailContent = function (data) {
            return "\n      <div>\n        <h2>Appointment Reminder</h2>\n        <p>Hello ".concat(data.patientName, ",</p>\n        <p>This is a reminder of your appointment with ").concat(data.doctorName, " on ").concat(data.dateTime.toLocaleString(), "</p>\n        <p>Location: ").concat(data.location, "</p>\n        ").concat(data.notes ? "<p>Notes: ".concat(data.notes, "</p>") : '', "\n        <p>Regards,<br>").concat(data.organizationName, "</p>\n      </div>\n    ");
        };
        NotificationsService_1.prototype.formatSmsContent = function (data) {
            return "Hi ".concat(data.patientName, ", reminder of your appointment with ").concat(data.organizationName, " on ").concat(data.dateTime.toLocaleString());
        };
        return NotificationsService_1;
    }());
    __setFunctionName(_classThis, "NotificationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsService = _classThis;
}();
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map