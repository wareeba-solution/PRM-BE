"use strict";
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
exports.UserSessionsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var user_session_entity_1 = require("../entities/user-session.entity");
var UAParser = require("ua-parser-js");
var UserSessionsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserSessionsService = _classThis = /** @class */ (function () {
        function UserSessionsService_1(sessionRepository, jwtService, configService) {
            this.sessionRepository = sessionRepository;
            this.jwtService = jwtService;
            this.configService = configService;
            this.logger = new common_1.Logger(UserSessionsService.name);
            this.parser = new UAParser.UAParser();
        }
        /**
         * Create new user session
         */
        UserSessionsService_1.prototype.createSession = function (user_1, token_1, request_1) {
            return __awaiter(this, arguments, void 0, function (user, token, request, options) {
                var deviceInfo, payload, expiresAt, session;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    try {
                        deviceInfo = this.parseUserAgent(request.headers['user-agent']);
                        payload = this.jwtService.decode(token);
                        expiresAt = new Date(payload['exp'] * 1000);
                        session = this.sessionRepository.create({
                            userId: user.id,
                            organizationId: user.organizationId,
                            token: token,
                            status: user_session_entity_1.SessionStatus.ACTIVE,
                            expiresAt: expiresAt,
                            ipAddress: request.ip,
                            userAgent: request.headers['user-agent'],
                            deviceId: options.deviceId,
                            deviceType: deviceInfo.deviceType,
                            browser: deviceInfo.browser,
                            operatingSystem: deviceInfo.os,
                            isMobile: deviceInfo.isMobile,
                            isRemembered: options.isRemembered || false,
                            metadata: options.metadata,
                            lastActivityAt: new Date(),
                        });
                        return [2 /*return*/, this.sessionRepository.save(session)];
                    }
                    catch (error) {
                        this.logger.error('Error creating session:', error);
                        throw error;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Validate session
         */
        UserSessionsService_1.prototype.validateSession = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var session, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.sessionRepository.findOne({
                                    where: { token: token }
                                })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                return [2 /*return*/, null];
                            }
                            if (session.status !== user_session_entity_1.SessionStatus.ACTIVE) {
                                return [2 /*return*/, null];
                            }
                            if (!session.isExpired()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.expireSession(session.id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/, session];
                        case 4:
                            error_1 = _a.sent();
                            this.logger.error('Error validating session:', error_1);
                            return [2 /*return*/, null];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update session last activity
         */
        UserSessionsService_1.prototype.updateLastActivity = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.update(sessionId, {
                                lastActivityAt: new Date()
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get active sessions for user
         */
        UserSessionsService_1.prototype.getUserActiveSessions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sessionRepository.find({
                            where: {
                                userId: userId,
                                status: user_session_entity_1.SessionStatus.ACTIVE,
                                expiresAt: (0, typeorm_1.LessThan)(new Date())
                            },
                            order: {
                                lastActivityAt: 'DESC'
                            }
                        })];
                });
            });
        };
        /**
         * Revoke session
         */
        UserSessionsService_1.prototype.revokeSession = function (sessionId, revokedBy, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({
                                where: { id: sessionId }
                            })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                throw new common_1.UnauthorizedException('Session not found');
                            }
                            if (session.status !== user_session_entity_1.SessionStatus.ACTIVE) {
                                throw new common_1.UnauthorizedException('Session is not active');
                            }
                            session.revoke(revokedBy, reason);
                            return [4 /*yield*/, this.sessionRepository.save(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Revoke all user sessions
         */
        UserSessionsService_1.prototype.revokeAllUserSessions = function (userId, revokedBy, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, _i, sessions_1, session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getUserActiveSessions(userId)];
                        case 1:
                            sessions = _a.sent();
                            for (_i = 0, sessions_1 = sessions; _i < sessions_1.length; _i++) {
                                session = sessions_1[_i];
                                session.revoke(revokedBy, reason);
                            }
                            return [4 /*yield*/, this.sessionRepository.save(sessions)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Extend session
         */
        UserSessionsService_1.prototype.extendSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, extensionDuration;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.findOne({
                                where: { id: sessionId }
                            })];
                        case 1:
                            session = _a.sent();
                            if (!session) {
                                throw new common_1.UnauthorizedException('Session not found');
                            }
                            if (!session.canBeExtended()) {
                                throw new common_1.UnauthorizedException('Session cannot be extended');
                            }
                            extensionDuration = 24 * 60 * 60 * 1000;
                            session.extend(extensionDuration);
                            return [4 /*yield*/, this.sessionRepository.save(session)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Clean up expired sessions
         */
        UserSessionsService_1.prototype.cleanupExpiredSessions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.sessionRepository
                                    .createQueryBuilder()
                                    .update()
                                    .set({ status: user_session_entity_1.SessionStatus.EXPIRED })
                                    .where('status = :status', { status: user_session_entity_1.SessionStatus.ACTIVE })
                                    .andWhere('expiresAt <= :now', { now: new Date() })
                                    .execute()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.affected || 0];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error('Error cleaning up expired sessions:', error_2);
                            return [2 /*return*/, 0];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parse user agent string
         */
        UserSessionsService_1.prototype.parseUserAgent = function (userAgent) {
            if (!userAgent) {
                return {
                    browser: 'unknown',
                    os: 'unknown',
                    deviceType: 'unknown',
                    isMobile: false
                };
            }
            this.parser.setUA(userAgent);
            var result = this.parser.getResult();
            return {
                browser: "".concat(result.browser.name || '', " ").concat(result.browser.version || '').trim() || 'unknown',
                os: "".concat(result.os.name || '', " ").concat(result.os.version || '').trim() || 'unknown',
                deviceType: result.device.type || 'desktop',
                isMobile: result.device.type === 'mobile' || result.device.type === 'tablet'
            };
        };
        /**
         * Expire session
         */
        UserSessionsService_1.prototype.expireSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sessionRepository.update(sessionId, {
                                status: user_session_entity_1.SessionStatus.EXPIRED
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return UserSessionsService_1;
    }());
    __setFunctionName(_classThis, "UserSessionsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserSessionsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserSessionsService = _classThis;
}();
exports.UserSessionsService = UserSessionsService;
//# sourceMappingURL=user-sessions.service.js.map