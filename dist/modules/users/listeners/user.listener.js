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
exports.UserEventListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var UserEventListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleUserCreated_decorators;
    var _handleUserUpdated_decorators;
    var _handlePasswordChanged_decorators;
    var _handleStatusChanged_decorators;
    var _handleUserDeleted_decorators;
    var _handleUserLogin_decorators;
    var UserEventListener = _classThis = /** @class */ (function () {
        function UserEventListener_1(notificationsService, emailService, auditService) {
            this.notificationsService = (__runInitializers(this, _instanceExtraInitializers), notificationsService);
            this.emailService = emailService;
            this.auditService = auditService;
            this.logger = new common_1.Logger(UserEventListener.name);
        }
        UserEventListener_1.prototype.handleUserCreated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    this.auditService.log({
                                        action: 'USER_CREATED',
                                        entityType: 'USER',
                                        entityId: event.user.id,
                                        actorId: event.performedBy, // Changed from userId to actorId
                                        organizationId: event.organizationId,
                                        metadata: event.metadata,
                                    }),
                                    this.emailService.sendEmail({
                                        to: event.user.email,
                                        subject: 'Welcome to the Platform',
                                        template: 'welcome-email',
                                        context: {
                                            firstName: event.user.firstName,
                                            loginUrl: "".concat(process.env.APP_URL, "/login"),
                                        },
                                    }),
                                    event.organizationId &&
                                        this.notificationsService.send({
                                            type: 'USER_CREATED',
                                            title: 'New User Created',
                                            message: "".concat(event.user.firstName, " ").concat(event.user.lastName, " has joined the organization"),
                                            organizationId: event.organizationId,
                                            data: {
                                                userId: event.user.id,
                                                email: event.user.email,
                                            },
                                            userId: '',
                                        }),
                                ].filter(Boolean))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Error handling user created event', {
                                error: error_1,
                                userId: event.user.id
                            });
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserEventListener_1.prototype.handleUserUpdated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.auditService.log({
                                    action: 'USER_UPDATED',
                                    entityType: 'USER',
                                    entityId: event.user.id,
                                    actorId: event.performedBy, // Changed from userId to actorId
                                    organizationId: event.organizationId,
                                    metadata: event.metadata,
                                })];
                        case 1:
                            _b.sent();
                            if (!((_a = event.metadata) === null || _a === void 0 ? void 0 : _a.importantChanges)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.notificationsService.send({
                                    type: 'PROFILE_UPDATED',
                                    title: 'Profile Updates',
                                    message: 'Your profile information has been updated',
                                    data: {
                                        changes: event.metadata.importantChanges,
                                    },
                                    userId: '',
                                })];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _b.sent();
                            this.logger.error('Error handling user updated event', {
                                error: error_2,
                                userId: event.user.id,
                            });
                            throw error_2;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        UserEventListener_1.prototype.handlePasswordChanged = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    this.auditService.log({
                                        action: 'PASSWORD_CHANGED',
                                        entityType: 'USER',
                                        entityId: event.user.id,
                                        actorId: event.performedBy || event.user.id, // Changed from userId to actorId
                                        organizationId: event.organizationId,
                                        metadata: {
                                            requiresReset: event.requiresReset,
                                            expiresAt: event.expiresAt,
                                        },
                                    }),
                                    this.emailService.sendEmail({
                                        to: event.user.email,
                                        subject: 'Password Changed',
                                        template: 'password-changed',
                                        context: {
                                            firstName: event.user.firstName,
                                            requiresReset: event.requiresReset,
                                            expiresAt: event.expiresAt,
                                        },
                                    }),
                                ])];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error('Error handling password changed event', {
                                error: error_3,
                                userId: event.user.id,
                            });
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserEventListener_1.prototype.handleStatusChanged = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var status_1, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            status_1 = event.user.isActive ? 'activated' : 'deactivated';
                            return [4 /*yield*/, Promise.all([
                                    this.auditService.log({
                                        action: "USER_".concat(status_1.toUpperCase()),
                                        entityType: 'USER',
                                        entityId: event.user.id,
                                        actorId: event.performedBy, // Changed from userId to actorId
                                        organizationId: event.organizationId,
                                        metadata: event.metadata,
                                    }),
                                    event.organizationId &&
                                        this.notificationsService.send({
                                            type: 'USER_STATUS_CHANGED',
                                            title: "User Account ".concat(status_1),
                                            message: "".concat(event.user.firstName, " ").concat(event.user.lastName, "'s account has been ").concat(status_1),
                                            organizationId: event.organizationId,
                                            data: {
                                                userId: event.user.id,
                                                status: status_1,
                                            },
                                            userId: '',
                                        }),
                                    this.emailService.sendEmail({
                                        to: event.user.email,
                                        subject: "Account ".concat(status_1),
                                        template: "account-".concat(status_1),
                                        context: {
                                            firstName: event.user.firstName,
                                        },
                                    }),
                                ].filter(Boolean))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error('Error handling user status changed event', {
                                error: error_4,
                                userId: event.user.id,
                            });
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserEventListener_1.prototype.handleUserDeleted = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    this.auditService.log({
                                        action: 'USER_DELETED',
                                        entityType: 'USER',
                                        entityId: event.user.id,
                                        actorId: event.performedBy, // Changed from userId to actorId
                                        organizationId: event.organizationId,
                                        metadata: event.metadata,
                                    }),
                                    event.organizationId &&
                                        this.notificationsService.send({
                                            type: 'USER_DELETED',
                                            title: 'User Account Deleted',
                                            message: "".concat(event.user.firstName, " ").concat(event.user.lastName, "'s account has been deleted"),
                                            organizationId: event.organizationId,
                                            data: {
                                                userId: event.user.id,
                                                email: event.user.email,
                                            },
                                            userId: '',
                                        }),
                                ].filter(Boolean))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error('Error handling user deleted event', {
                                error: error_5,
                                userId: event.user.id,
                            });
                            throw error_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserEventListener_1.prototype.handleUserLogin = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var error_6;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    this.auditService.log({
                                        action: 'USER_LOGIN',
                                        entityType: 'USER',
                                        entityId: event.user.id,
                                        actorId: event.user.id, // Changed from userId to actorId
                                        organizationId: event.organizationId,
                                        metadata: __assign({ ip: event.ip, userAgent: event.userAgent }, event.metadata),
                                    }),
                                    ((_a = event.metadata) === null || _a === void 0 ? void 0 : _a.suspicious) &&
                                        this.notificationsService.send({
                                            type: 'SUSPICIOUS_LOGIN',
                                            title: 'Suspicious Login Detected',
                                            message: 'A login attempt from an unrecognized device was detected',
                                            userId: event.user.id,
                                            priority: 'HIGH',
                                            data: {
                                                ip: event.ip,
                                                userAgent: event.userAgent,
                                                location: event.metadata.location,
                                            },
                                        }),
                                ].filter(Boolean))];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _b.sent();
                            this.logger.error('Error handling user login event', {
                                error: error_6,
                                userId: event.user.id,
                            });
                            throw error_6;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return UserEventListener_1;
    }());
    __setFunctionName(_classThis, "UserEventListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleUserCreated_decorators = [(0, event_emitter_1.OnEvent)('user.created')];
        _handleUserUpdated_decorators = [(0, event_emitter_1.OnEvent)('user.updated')];
        _handlePasswordChanged_decorators = [(0, event_emitter_1.OnEvent)('user.password.changed')];
        _handleStatusChanged_decorators = [(0, event_emitter_1.OnEvent)('user.status.changed')];
        _handleUserDeleted_decorators = [(0, event_emitter_1.OnEvent)('user.deleted')];
        _handleUserLogin_decorators = [(0, event_emitter_1.OnEvent)('user.login')];
        __esDecorate(_classThis, null, _handleUserCreated_decorators, { kind: "method", name: "handleUserCreated", static: false, private: false, access: { has: function (obj) { return "handleUserCreated" in obj; }, get: function (obj) { return obj.handleUserCreated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleUserUpdated_decorators, { kind: "method", name: "handleUserUpdated", static: false, private: false, access: { has: function (obj) { return "handleUserUpdated" in obj; }, get: function (obj) { return obj.handleUserUpdated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handlePasswordChanged_decorators, { kind: "method", name: "handlePasswordChanged", static: false, private: false, access: { has: function (obj) { return "handlePasswordChanged" in obj; }, get: function (obj) { return obj.handlePasswordChanged; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleStatusChanged_decorators, { kind: "method", name: "handleStatusChanged", static: false, private: false, access: { has: function (obj) { return "handleStatusChanged" in obj; }, get: function (obj) { return obj.handleStatusChanged; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleUserDeleted_decorators, { kind: "method", name: "handleUserDeleted", static: false, private: false, access: { has: function (obj) { return "handleUserDeleted" in obj; }, get: function (obj) { return obj.handleUserDeleted; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleUserLogin_decorators, { kind: "method", name: "handleUserLogin", static: false, private: false, access: { has: function (obj) { return "handleUserLogin" in obj; }, get: function (obj) { return obj.handleUserLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserEventListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserEventListener = _classThis;
}();
exports.UserEventListener = UserEventListener;
//# sourceMappingURL=user.listener.js.map