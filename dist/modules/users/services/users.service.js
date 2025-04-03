"use strict";
// src/modules/users/services/users.service.ts
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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt_1 = require("bcrypt");
var role_enum_1 = require("../enums/role.enum");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(userRepository, activityRepository, dataSource, eventEmitter, notificationsService) {
            var _a;
            this.userRepository = userRepository;
            this.activityRepository = activityRepository;
            this.dataSource = dataSource;
            this.eventEmitter = eventEmitter;
            this.notificationsService = notificationsService;
            // Define permissions map as a class property with all possible roles
            this.permissionsByRole = (_a = {},
                _a[role_enum_1.Role.SUPER_ADMIN] = [
                    'all.read', 'all.create', 'all.update', 'all.delete',
                    'users.manage', 'organizations.manage', 'settings.manage',
                    'reports.access', 'permissions.manage', 'billing.manage'
                ],
                _a[role_enum_1.Role.ADMIN] = [
                    'users.read', 'users.create', 'users.update', 'users.delete',
                    'contacts.read', 'contacts.create', 'contacts.update', 'contacts.delete',
                    'appointments.read', 'appointments.create', 'appointments.update', 'appointments.delete',
                    'reports.access', 'settings.manage', 'notifications.manage'
                ],
                _a[role_enum_1.Role.MANAGER] = [
                    'users.read', 'contacts.read', 'contacts.create', 'contacts.update',
                    'appointments.read', 'appointments.create', 'appointments.update',
                    'reports.access', 'tasks.manage'
                ],
                _a[role_enum_1.Role.DOCTOR] = [
                    'contacts.read', 'contacts.create', 'contacts.update',
                    'appointments.read', 'appointments.create', 'appointments.update',
                    'medical.read', 'medical.write'
                ],
                _a[role_enum_1.Role.NURSE] = [
                    'contacts.read', 'contacts.update',
                    'appointments.read', 'appointments.update',
                    'medical.read', 'medical.write', 'vitals.manage'
                ],
                _a[role_enum_1.Role.STAFF] = [
                    'contacts.read', 'appointments.read', 'appointments.create',
                    'tasks.read', 'tasks.create'
                ],
                _a);
        }
        UsersService_1.prototype.findUsersByRole = function (organizationId, arg1) {
            throw new Error('Method not implemented.');
        };
        UsersService_1.prototype.findByRole = function (role, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.find({
                            where: {
                                role: role,
                                organizationId: organizationId,
                            },
                        })];
                });
            });
        };
        UsersService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, existingUser, hashedPassword, createdBy, userData, user, activity, password, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 10, 12, 14]);
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: [
                                        { email: data.email },
                                        { phoneNumber: data.phoneNumber },
                                    ],
                                })];
                        case 4:
                            existingUser = _a.sent();
                            if (existingUser) {
                                throw new common_1.ConflictException(existingUser.email === data.email
                                    ? 'Email already registered'
                                    : 'Phone number already registered');
                            }
                            return [4 /*yield*/, (0, bcrypt_1.hash)(data.password, 12)];
                        case 5:
                            hashedPassword = _a.sent();
                            createdBy = data.createdBy, userData = __rest(data, ["createdBy"]);
                            user = this.userRepository.create(__assign(__assign({}, userData), { password: hashedPassword }));
                            return [4 /*yield*/, queryRunner.manager.save(user)];
                        case 6:
                            _a.sent();
                            activity = this.activityRepository.create({
                                userId: user.id,
                                organizationId: data.organizationId,
                                action: 'USER_CREATED',
                                performedById: data.createdBy,
                            });
                            return [4 /*yield*/, queryRunner.manager.save(activity)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 8:
                            _a.sent();
                            // Send welcome notification
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'WELCOME',
                                    title: 'Welcome to the System',
                                    content: "Welcome ".concat(user.firstName, "! Your account has been created successfully."),
                                    recipients: [{ userId: user.id }],
                                    organizationId: data.organizationId,
                                    senderId: data.createdBy,
                                })];
                        case 9:
                            // Send welcome notification
                            _a.sent();
                            this.eventEmitter.emit('user.created', user);
                            password = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        case 10:
                            error_1 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _a.sent();
                            throw error_1;
                        case 12: return [4 /*yield*/, queryRunner.release()];
                        case 13:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findById = function (id_1) {
            return __awaiter(this, arguments, void 0, function (id, relations) {
                if (relations === void 0) { relations = []; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.findOne({
                            where: { id: id },
                            relations: relations
                        })];
                });
            });
        };
        UsersService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, role, isActive, search, department, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, role = query.role, isActive = query.isActive, search = query.search, department = query.department, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.userRepository
                        .createQueryBuilder('user')
                        .where('user.organizationId = :organizationId', { organizationId: organizationId });
                    if (role) {
                        queryBuilder.andWhere('user.role = :role', { role: role });
                    }
                    if (isActive !== undefined) {
                        queryBuilder.andWhere('user.isActive = :isActive', { isActive: isActive });
                    }
                    if (department) {
                        queryBuilder.andWhere('user.department = :department', { department: department });
                    }
                    if (search) {
                        queryBuilder.andWhere('(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))', { search: "%".concat(search, "%") });
                    }
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        UsersService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id, organizationId: organizationId },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersService_1.prototype.update = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            user = _a.sent();
                            Object.assign(user, data);
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 2:
                            _a.sent();
                            // Record activity
                            return [4 /*yield*/, this.activityRepository.save({
                                    userId: user.id,
                                    organizationId: data.organizationId,
                                    action: 'USER_UPDATED',
                                    performedById: data.updatedBy,
                                })];
                        case 3:
                            // Record activity
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersService_1.prototype.updateProfile = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            user = _a.sent();
                            Object.assign(user, data);
                            return [2 /*return*/, this.userRepository.save(user)];
                    }
                });
            });
        };
        UsersService_1.prototype.updatePassword = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isValidPassword, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            user = _b.sent();
                            return [4 /*yield*/, (0, bcrypt_1.compare)(data.currentPassword, user.password)];
                        case 2:
                            isValidPassword = _b.sent();
                            if (!isValidPassword) {
                                throw new common_1.BadRequestException('Current password is incorrect');
                            }
                            _a = user;
                            return [4 /*yield*/, (0, bcrypt_1.hash)(data.newPassword, 12)];
                        case 3:
                            _a.password = _b.sent();
                            user.requirePasswordChange = false;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 4:
                            _b.sent();
                            // Record activity
                            return [4 /*yield*/, this.activityRepository.save({
                                    userId: user.id,
                                    organizationId: data.organizationId,
                                    action: 'PASSWORD_CHANGED',
                                    performedById: user.id,
                                })];
                        case 5:
                            // Record activity
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.userRepository.softRemove(user)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.activate = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            user = _a.sent();
                            user.isActive = true;
                            user.isLocked = false;
                            return [2 /*return*/, this.userRepository.save(user)];
                    }
                });
            });
        };
        UsersService_1.prototype.deactivate = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            user = _a.sent();
                            user.isActive = false;
                            return [2 /*return*/, this.userRepository.save(user)];
                    }
                });
            });
        };
        UsersService_1.prototype.getAdminCount = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.count({
                            where: {
                                organizationId: organizationId,
                                role: role_enum_1.Role.ADMIN,
                                isActive: true,
                            },
                        })];
                });
            });
        };
        UsersService_1.prototype.getActivity = function (id, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.activityRepository.find({
                            where: {
                                userId: id,
                                organizationId: query.organizationId,
                            },
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        UsersService_1.prototype.getPermissions = function (userId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(userId, organizationId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            // Return the permissions for the user's role or an empty array if the role isn't defined
                            return [2 /*return*/, this.permissionsByRole[user.role] || []];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map