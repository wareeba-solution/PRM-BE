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
exports.AuthController = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/controllers/auth.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
var public_decorator_1 = require("../decorators/public.decorator");
var rate_limit_guard_1 = require("../guards/rate-limit.guard");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Authentication'), (0, common_1.Controller)('auth'), (0, common_1.UseGuards)(rate_limit_guard_1.RateLimitGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _login_decorators;
    var _register_decorators;
    var _refreshToken_decorators;
    var _logout_decorators;
    var _forgotPassword_decorators;
    var _resetPassword_decorators;
    var _getCurrentUser_decorators;
    var _verifyEmail_decorators;
    var _resendVerification_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.login = function (loginDto, userAgent, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.login(loginDto, {
                                userAgent: userAgent,
                                ip: ip,
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    user: result.user,
                                    tokens: {
                                        accessToken: result.accessToken,
                                        refreshToken: result.refreshToken,
                                    },
                                }];
                    }
                });
            });
        };
        AuthController_1.prototype.register = function (registerDto, userAgent, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.register(registerDto, {
                                userAgent: userAgent,
                                ip: ip,
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    user: result.user,
                                    organization: result.organization,
                                    tokens: {
                                        accessToken: result.accessToken,
                                        refreshToken: result.refreshToken,
                                    },
                                }];
                    }
                });
            });
        };
        AuthController_1.prototype.refreshToken = function (refreshTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.refreshToken(refreshTokenDto.refreshToken)];
                        case 1:
                            tokens = _a.sent();
                            return [2 /*return*/, { tokens: tokens }];
                    }
                });
            });
        };
        AuthController_1.prototype.logout = function (user, authHeader) {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
                            if (!token) {
                                throw new common_1.UnauthorizedException('Invalid token');
                            }
                            // Fixed: Passing only one argument as expected
                            return [4 /*yield*/, this.authService.logout(user.id)];
                        case 1:
                            // Fixed: Passing only one argument as expected
                            _a.sent();
                            return [2 /*return*/, { message: 'Logout successful' }];
                    }
                });
            });
        };
        AuthController_1.prototype.forgotPassword = function (forgotPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Assuming the service has a method to handle this
                        // If not implemented, you'll need to add this method to your AuthService
                        return [4 /*yield*/, this.authService.sendPasswordResetEmail(forgotPasswordDto.email)];
                        case 1:
                            // Assuming the service has a method to handle this
                            // If not implemented, you'll need to add this method to your AuthService
                            _a.sent();
                            return [2 /*return*/, { message: 'Password reset instructions sent to email' }];
                    }
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (resetPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Assuming the service has a method to handle this
                        // If not implemented, you'll need to add this method to your AuthService
                        return [4 /*yield*/, this.authService.changePassword(resetPasswordDto.token, resetPasswordDto.password)];
                        case 1:
                            // Assuming the service has a method to handle this
                            // If not implemented, you'll need to add this method to your AuthService
                            _a.sent();
                            return [2 /*return*/, { message: 'Password reset successful' }];
                    }
                });
            });
        };
        AuthController_1.prototype.getCurrentUser = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { user: user }];
                });
            });
        };
        AuthController_1.prototype.verifyEmail = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Assuming the service has a method to handle this
                        // If not implemented, you'll need to add this method to your AuthService
                        return [4 /*yield*/, this.authService.confirmEmail(token)];
                        case 1:
                            // Assuming the service has a method to handle this
                            // If not implemented, you'll need to add this method to your AuthService
                            _a.sent();
                            return [2 /*return*/, { message: 'Email verification successful' }];
                    }
                });
            });
        };
        AuthController_1.prototype.resendVerification = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Assuming the service has a method to handle this
                        // If not implemented, you'll need to add this method to your AuthService
                        return [4 /*yield*/, this.authService.sendVerificationEmail(user.id)];
                        case 1:
                            // Assuming the service has a method to handle this
                            // If not implemented, you'll need to add this method to your AuthService
                            _a.sent();
                            return [2 /*return*/, { message: 'Verification email sent' }];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _login_decorators = [(0, common_1.Post)('login'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'User login' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Login successful' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _register_decorators = [(0, common_1.Post)('register'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Register new user/organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Registration successful' }), openapi.ApiResponse({ status: 201 })];
        _refreshToken_decorators = [(0, common_1.Post)('refresh-token'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _logout_decorators = [(0, common_1.Post)('logout'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'User logout' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Reset password' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _getCurrentUser_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }), openapi.ApiResponse({ status: 200 })];
        _verifyEmail_decorators = [(0, common_1.Post)('verify-email'), (0, public_decorator_1.Public)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Verify email address' }), openapi.ApiResponse({ status: common_1.HttpStatus.OK })];
        _resendVerification_decorators = [(0, common_1.Post)('resend-verification'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Resend verification email' }), openapi.ApiResponse({ status: 201 })];
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshToken_decorators, { kind: "method", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: function (obj) { return "getCurrentUser" in obj; }, get: function (obj) { return obj.getCurrentUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendVerification_decorators, { kind: "method", name: "resendVerification", static: false, private: false, access: { has: function (obj) { return "resendVerification" in obj; }, get: function (obj) { return obj.resendVerification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map