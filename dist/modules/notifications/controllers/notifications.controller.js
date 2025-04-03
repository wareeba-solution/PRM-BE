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
exports.NotificationsController = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/controllers/notifications.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var roles_decorator_1 = require("../../auth/decorators/roles.decorator");
var role_enum_1 = require("../../users/enums/role.enum");
var NotificationsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Notifications'), (0, common_1.Controller)('notifications'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getUnreadCount_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _markAsRead_decorators;
    var _markAllAsRead_decorators;
    var _getPreferences_decorators;
    var _updatePreferences_decorators;
    var _sendTestNotification_decorators;
    var _getChannels_decorators;
    var NotificationsController = _classThis = /** @class */ (function () {
        function NotificationsController_1(notificationsService) {
            this.notificationsService = (__runInitializers(this, _instanceExtraInitializers), notificationsService);
        }
        NotificationsController_1.prototype.create = function (createNotificationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.create(__assign(__assign({}, createNotificationDto), { organizationId: req.organization.id, senderId: req.user.id }))];
                });
            });
        };
        NotificationsController_1.prototype.findAll = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var notificationQuery;
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    notificationQuery = {
                        skip: query.skip,
                        take: query.take,
                        includeRead: query.includeRead,
                        organizationId: req.organization.id,
                    };
                    return [2 /*return*/, this.notificationsService.getUserNotifications(req.user.id, notificationQuery)];
                });
            });
        };
        NotificationsController_1.prototype.getUnreadCount = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.getUnreadCount(req.user.id)];
                });
            });
        };
        NotificationsController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization || !req.user) {
                                throw new common_1.BadRequestException('User or organization not found');
                            }
                            return [4 /*yield*/, this.notificationsService.getNotificationById(id, req.organization.id, req.user.id)];
                        case 1:
                            notification = _a.sent();
                            if (!notification) {
                                throw new common_1.NotFoundException('Notification not found');
                            }
                            return [2 /*return*/, notification];
                    }
                });
            });
        };
        NotificationsController_1.prototype.update = function (id, updateNotificationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.updateNotification(id, __assign(__assign({}, updateNotificationDto), { organizationId: req.organization.id }))];
                });
            });
        };
        NotificationsController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization || !req.user) {
                                throw new common_1.BadRequestException('User or organization not found');
                            }
                            return [4 /*yield*/, this.notificationsService.updateNotification(id, { isDeleted: true, organizationId: req.organization.id })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationsController_1.prototype.markAsRead = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.markAsRead(id, req.user.id)];
                });
            });
        };
        NotificationsController_1.prototype.markAllAsRead = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.markAllAsRead(req.user.id)];
                });
            });
        };
        NotificationsController_1.prototype.getPreferences = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.getUserPreferences(req.organization.id, req.user.id)];
                });
            });
        };
        NotificationsController_1.prototype.updatePreferences = function (preferencesDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.getUserPreferences(req.organization.id, req.user.id)];
                });
            });
        };
        NotificationsController_1.prototype.sendTestNotification = function (data, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.sendNotification(req.user.id, data.type, __assign(__assign({}, data), { organizationId: req.organization.id, userId: req.user.id }))];
                });
            });
        };
        NotificationsController_1.prototype.getChannels = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization || !req.user) {
                        throw new common_1.BadRequestException('User or organization not found');
                    }
                    return [2 /*return*/, this.notificationsService.getNotificationChannels(req.organization.id, req.user.id)];
                });
            });
        };
        return NotificationsController_1;
    }());
    __setFunctionName(_classThis, "NotificationsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Create new notification' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Notification created successfully' }), openapi.ApiResponse({ status: 201 })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get user notifications' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return user notifications' }), openapi.ApiResponse({ status: 200 })];
        _getUnreadCount_decorators = [(0, common_1.Get)('unread'), (0, swagger_1.ApiOperation)({ summary: 'Get unread notifications count' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return unread notifications count' }), openapi.ApiResponse({ status: 200, type: Number })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get notification by id' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return notification details' }), openapi.ApiResponse({ status: 200, type: require("../entities/notification.entity").Notification })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update notification' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Notification updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/notification.entity").Notification })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete notification' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Notification deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _markAsRead_decorators = [(0, common_1.Post)(':id/mark-read'), (0, swagger_1.ApiOperation)({ summary: 'Mark notification as read' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Notification marked as read' }), openapi.ApiResponse({ status: 201 })];
        _markAllAsRead_decorators = [(0, common_1.Post)('mark-all-read'), (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'All notifications marked as read' }), openapi.ApiResponse({ status: 201 })];
        _getPreferences_decorators = [(0, common_1.Get)('preferences'), (0, swagger_1.ApiOperation)({ summary: 'Get notification preferences' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return notification preferences' }), openapi.ApiResponse({ status: 200, type: Object })];
        _updatePreferences_decorators = [(0, common_1.Put)('preferences'), (0, swagger_1.ApiOperation)({ summary: 'Update notification preferences' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Preferences updated successfully' }), openapi.ApiResponse({ status: 200, type: Object })];
        _sendTestNotification_decorators = [(0, common_1.Post)('test'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Send test notification' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Test notification sent successfully' }), openapi.ApiResponse({ status: 201 })];
        _getChannels_decorators = [(0, common_1.Get)('channels'), (0, swagger_1.ApiOperation)({ summary: 'Get available notification channels' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return available channels' }), openapi.ApiResponse({ status: 200, type: Object })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnreadCount_decorators, { kind: "method", name: "getUnreadCount", static: false, private: false, access: { has: function (obj) { return "getUnreadCount" in obj; }, get: function (obj) { return obj.getUnreadCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAsRead_decorators, { kind: "method", name: "markAsRead", static: false, private: false, access: { has: function (obj) { return "markAsRead" in obj; }, get: function (obj) { return obj.markAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAllAsRead_decorators, { kind: "method", name: "markAllAsRead", static: false, private: false, access: { has: function (obj) { return "markAllAsRead" in obj; }, get: function (obj) { return obj.markAllAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPreferences_decorators, { kind: "method", name: "getPreferences", static: false, private: false, access: { has: function (obj) { return "getPreferences" in obj; }, get: function (obj) { return obj.getPreferences; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePreferences_decorators, { kind: "method", name: "updatePreferences", static: false, private: false, access: { has: function (obj) { return "updatePreferences" in obj; }, get: function (obj) { return obj.updatePreferences; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendTestNotification_decorators, { kind: "method", name: "sendTestNotification", static: false, private: false, access: { has: function (obj) { return "sendTestNotification" in obj; }, get: function (obj) { return obj.sendTestNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getChannels_decorators, { kind: "method", name: "getChannels", static: false, private: false, access: { has: function (obj) { return "getChannels" in obj; }, get: function (obj) { return obj.getChannels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsController = _classThis;
}();
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map