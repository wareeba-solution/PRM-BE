"use strict";
// src/modules/auth/services/auth.service.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../../users/entities/user.entity");
var refresh_token_entity_1 = require("../entities/refresh-token.entity");
var bcrypt_1 = require("bcrypt");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var role_enum_1 = require("../../users/enums/role.enum");
var uuid_1 = require("uuid");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userRepository, refreshTokenRepository, organizationRepository, jwtService, usersService, configService) {
            this.userRepository = userRepository;
            this.refreshTokenRepository = refreshTokenRepository;
            this.organizationRepository = organizationRepository;
            this.jwtService = jwtService;
            this.usersService = usersService;
            this.configService = configService;
        }
        /**
         * Checks if a token has been blacklisted
         * @param token The JWT token to check
         * @returns boolean True if the token is blacklisted, false otherwise
         */
        AuthService_1.prototype.isTokenBlacklisted = function (token) {
            // In a real implementation, you would:
            // 1. Either check a cache (Redis) or database table for blacklisted tokens
            // 2. Or verify against a token revocation list
            // For now, return false as a placeholder
            // You can implement token blacklisting using the refresh token repository
            // by checking if there's a revoked token matching this one
            // Example implementation (uncomment and adapt when you have the proper setup):
            /*
            try {
              const decodedToken = this.jwtService.decode(token) as JwtPayload;
              if (!decodedToken || !decodedToken.sessionId) {
                return false;
              }
              
              // Check if a refresh token with this session ID has been revoked
              const revokedToken = this.refreshTokenRepository.findOne({
                where: {
                  sessionId: decodedToken.sessionId,
                  isRevoked: true
                }
              });
              
              return !!revokedToken;
            } catch (error) {
              // If we can't decode the token, assume it's not blacklisted
              return false;
            }
            */
            return false;
        };
        Object.defineProperty(AuthService_1.prototype, "requireEmailVerification", {
            /**
             * Determines if email verification is required
             * @returns boolean True if email verification is required, false otherwise
             */
            get: function () {
                var _a, _b;
                // Read this from your application config
                // You might want different settings for different environments
                var requireVerification = (_b = (_a = this.configService) === null || _a === void 0 ? void 0 : _a.get('EMAIL_VERIFICATION_REQUIRED')) !== null && _b !== void 0 ? _b : true;
                return requireVerification;
            },
            enumerable: false,
            configurable: true
        });
        AuthService_1.prototype.checkOrganizationAccess = function (userId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, (user === null || user === void 0 ? void 0 : user.organizationId) === organizationId];
                    }
                });
            });
        };
        AuthService_1.prototype.getUserPermissions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to get user permissions
                    // This is a placeholder implementation
                    return [2 /*return*/, ['permission1', 'permission2']];
                });
            });
        };
        AuthService_1.prototype.checkResourceOwnership = function (userId, resourceId, resourceType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Implement the logic to check resource ownership
                    // For example, query the database to verify ownership
                    return [2 /*return*/, true]; // or false based on the check
                });
            });
        };
        AuthService_1.prototype.validateUser = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, _password, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: email },
                                relations: ['organization'],
                            })];
                        case 1:
                            user = _b.sent();
                            _a = user;
                            if (!_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3:
                            if (_a) {
                                _password = user.password, result = __rest(user, ["password"]);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (loginDto, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var user, organization, payload, accessToken, refreshToken;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.validateUser(loginDto.email, loginDto.password)];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            }
                            return [4 /*yield*/, this.organizationRepository.findOne({
                                    where: { id: (_a = user.organization) === null || _a === void 0 ? void 0 : _a.id },
                                })];
                        case 2:
                            organization = _b.sent();
                            if (!organization) {
                                throw new common_1.UnauthorizedException('Organization not found');
                            }
                            if (!organization.isSubscriptionActive) {
                                throw new common_1.UnauthorizedException('Organization subscription is inactive');
                            }
                            payload = {
                                sub: user.id,
                                email: user.email,
                                role: user.role,
                                organizationId: organization.id,
                                permissions: [],
                                sessionId: (0, uuid_1.v4)(),
                            };
                            accessToken = this.jwtService.sign(payload);
                            return [4 /*yield*/, this.generateRefreshToken(user.id, metadata)];
                        case 3:
                            refreshToken = _b.sent();
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken.token,
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        role: user.role,
                                        organizationId: organization.id,
                                    },
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.register = function (registerDto, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, organization, savedOrganization, hashedPassword, user, savedUser, payload, accessToken, refreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: registerDto.user.email },
                            })];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser) {
                                throw new common_1.UnauthorizedException('Email already registered');
                            }
                            organization = new organization_entity_1.Organization();
                            organization.name = registerDto.organization.name;
                            organization.status = organization_entity_1.OrganizationStatus.ACTIVE;
                            organization.isSubscriptionActive = true;
                            if (registerDto.organization.website) {
                                organization.website = registerDto.organization.website;
                            }
                            if (registerDto.organization.phone) {
                                organization.contactInfo = {
                                    phone: registerDto.organization.phone
                                };
                            }
                            if (registerDto.organization.address) {
                                organization.contactInfo = __assign(__assign({}, organization.contactInfo), { address: {
                                        street: registerDto.organization.address.street,
                                        city: registerDto.organization.address.city,
                                        state: registerDto.organization.address.state,
                                        postalCode: registerDto.organization.address.postalCode,
                                        country: registerDto.organization.address.country,
                                    } });
                            }
                            // Generate a slug from the organization name
                            organization.slug = this.generateSlug(registerDto.organization.name);
                            return [4 /*yield*/, this.organizationRepository.save(organization)];
                        case 2:
                            savedOrganization = _a.sent();
                            return [4 /*yield*/, (0, bcrypt_1.hash)(registerDto.user.password, 10)];
                        case 3:
                            hashedPassword = _a.sent();
                            user = new user_entity_1.User();
                            user.firstName = registerDto.user.firstName;
                            user.lastName = registerDto.user.lastName;
                            user.email = registerDto.user.email;
                            user.password = hashedPassword;
                            user.role = registerDto.user.role || role_enum_1.Role.ADMIN; // Default role for first user
                            user.organizationId = savedOrganization.id;
                            user.createdById = savedOrganization.id; // Temporary, will be updated later
                            if (registerDto.user.phone) {
                                user.phoneNumber = registerDto.user.phone;
                            }
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 4:
                            savedUser = _a.sent();
                            // Update the organization's createdById to point to the user
                            savedOrganization.createdById = savedUser.id;
                            return [4 /*yield*/, this.organizationRepository.save(savedOrganization)];
                        case 5:
                            _a.sent();
                            payload = {
                                sub: savedUser.id,
                                email: savedUser.email,
                                role: savedUser.role,
                                organizationId: savedOrganization.id,
                                permissions: [],
                                sessionId: (0, uuid_1.v4)(),
                            };
                            accessToken = this.jwtService.sign(payload);
                            return [4 /*yield*/, this.generateRefreshToken(savedUser.id, metadata)];
                        case 6:
                            refreshToken = _a.sent();
                            // Return response without exposing password
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken.token,
                                    user: {
                                        id: savedUser.id,
                                        email: savedUser.email,
                                        firstName: savedUser.firstName,
                                        lastName: savedUser.lastName,
                                        role: savedUser.role,
                                        organizationId: savedOrganization.id,
                                    },
                                    organization: {
                                        id: savedOrganization.id,
                                        name: savedOrganization.name,
                                        status: savedOrganization.status,
                                    },
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshToken, user, payload, accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.findOne({
                                where: { token: token },
                                relations: ['user'],
                            })];
                        case 1:
                            refreshToken = _a.sent();
                            if (!refreshToken || refreshToken.isExpired() || refreshToken.isRevoked) {
                                throw new common_1.UnauthorizedException('Invalid refresh token');
                            }
                            // Update last used timestamp
                            refreshToken.updateLastUsed();
                            return [4 /*yield*/, this.refreshTokenRepository.save(refreshToken)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: refreshToken.userId }
                                })];
                        case 3:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found');
                            }
                            payload = {
                                sub: refreshToken.userId,
                                email: user.email,
                                role: user.role,
                                organizationId: refreshToken.organizationId || user.organizationId,
                                permissions: [],
                                sessionId: (0, uuid_1.v4)(),
                            };
                            accessToken = this.jwtService.sign(payload);
                            return [2 /*return*/, { accessToken: accessToken }];
                    }
                });
            });
        };
        AuthService_1.prototype.generateRefreshToken = function (userId, metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenString, user, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tokenString = (0, uuid_1.v4)();
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found');
                            }
                            token = new refresh_token_entity_1.RefreshToken();
                            token.userId = userId;
                            token.organizationId = user.organizationId;
                            token.token = tokenString;
                            token.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
                            token.userAgent = metadata.userAgent;
                            token.ipAddress = metadata.ip;
                            token.metadata = {
                                platform: this.extractPlatform(metadata.userAgent),
                                browser: this.extractBrowser(metadata.userAgent),
                                lastUsed: new Date(),
                            };
                            return [2 /*return*/, this.refreshTokenRepository.save(token)];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.update({ userId: userId }, { isRevoked: true, revokedAt: new Date(), revokedReason: 'User logout' })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Logged out successfully' }];
                    }
                });
            });
        };
        AuthService_1.prototype.validateOrganizationAccess = function (userId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId },
                                relations: ['organization'],
                            })];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, (user === null || user === void 0 ? void 0 : user.organizationId) === organizationId];
                    }
                });
            });
        };
        // Helper methods
        AuthService_1.prototype.generateSlug = function (name) {
            return name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .slice(0, 50) + '-' + Math.floor(Math.random() * 10000);
        };
        AuthService_1.prototype.extractPlatform = function (userAgent) {
            if (userAgent.includes('Windows'))
                return 'Windows';
            if (userAgent.includes('Mac'))
                return 'Mac';
            if (userAgent.includes('iPhone') || userAgent.includes('iPad'))
                return 'iOS';
            if (userAgent.includes('Android'))
                return 'Android';
            if (userAgent.includes('Linux'))
                return 'Linux';
            return 'Unknown';
        };
        AuthService_1.prototype.extractBrowser = function (userAgent) {
            if (userAgent.includes('Chrome') && !userAgent.includes('Edg'))
                return 'Chrome';
            if (userAgent.includes('Firefox'))
                return 'Firefox';
            if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
                return 'Safari';
            if (userAgent.includes('Edg'))
                return 'Edge';
            if (userAgent.includes('Opera') || userAgent.includes('OPR'))
                return 'Opera';
            return 'Unknown';
        };
        // Password reset methods
        AuthService_1.prototype.sendPasswordResetEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                // Don't reveal if user exists for security
                                return [2 /*return*/];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.changePassword = function (token, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        // Email verification methods
        AuthService_1.prototype.confirmEmail = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AuthService_1.prototype.sendVerificationEmail = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map