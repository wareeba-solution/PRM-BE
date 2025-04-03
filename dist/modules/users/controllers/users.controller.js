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
exports.UsersController = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/users/controllers/users.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var roles_decorator_1 = require("../../auth/decorators/roles.decorator");
var role_enum_1 = require("../enums/role.enum");
var simple_user_dto_1 = require("../../../swagger/dtos/simple-user.dto");
var UsersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Users'), (0, common_1.Controller)('users'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _updatePassword_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _activate_decorators;
    var _deactivate_decorators;
    var _getActivity_decorators;
    var _getPermissions_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        UsersController_1.prototype.create = function (createUserDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    // Fix: Ensure req.user is defined
                    if (!req.user) {
                        throw new common_1.ForbiddenException('User context is required');
                    }
                    return [2 /*return*/, this.usersService.create(__assign(__assign({}, createUserDto), { organizationId: req.organization.id, createdBy: req.user.id }))];
                });
            });
        };
        UsersController_1.prototype.findAll = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    return [2 /*return*/, this.usersService.findAll(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        UsersController_1.prototype.getProfile = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    // Fix: Ensure req.user is defined
                    if (!req.user) {
                        throw new common_1.ForbiddenException('User context is required');
                    }
                    return [2 /*return*/, this.usersService.findOne(req.user.id, req.organization.id)];
                });
            });
        };
        UsersController_1.prototype.updateProfile = function (updateProfileDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    // Fix: Ensure req.user is defined
                    if (!req.user) {
                        throw new common_1.ForbiddenException('User context is required');
                    }
                    return [2 /*return*/, this.usersService.updateProfile(req.user.id, __assign(__assign({}, updateProfileDto), { organizationId: req.organization.id }))];
                });
            });
        };
        UsersController_1.prototype.updatePassword = function (updatePasswordDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    // Fix: Ensure req.user is defined
                    if (!req.user) {
                        throw new common_1.ForbiddenException('User context is required');
                    }
                    return [2 /*return*/, this.usersService.updatePassword(req.user.id, __assign(__assign({}, updatePasswordDto), { organizationId: req.organization.id }))];
                });
            });
        };
        UsersController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization) {
                                throw new common_1.ForbiddenException('Organization context is required');
                            }
                            return [4 /*yield*/, this.usersService.findOne(id, req.organization.id)];
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
        UsersController_1.prototype.update = function (id, updateUserDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var admins, currentUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization) {
                                throw new common_1.ForbiddenException('Organization context is required');
                            }
                            // Fix: Ensure req.user is defined
                            if (!req.user) {
                                throw new common_1.ForbiddenException('User context is required');
                            }
                            if (!(updateUserDto.role && updateUserDto.role !== role_enum_1.Role.ADMIN)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.usersService.getAdminCount(req.organization.id)];
                        case 1:
                            admins = _a.sent();
                            if (!(admins === 1)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.usersService.findOne(id, req.organization.id)];
                        case 2:
                            currentUser = _a.sent();
                            if (currentUser.role === role_enum_1.Role.ADMIN) {
                                throw new common_1.BadRequestException('Cannot demote the last administrator');
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.usersService.update(id, __assign(__assign({}, updateUserDto), { organizationId: req.organization.id, updatedBy: req.user.id }))];
                    }
                });
            });
        };
        UsersController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var user, admins;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization) {
                                throw new common_1.ForbiddenException('Organization context is required');
                            }
                            return [4 /*yield*/, this.usersService.findOne(id, req.organization.id)];
                        case 1:
                            user = _a.sent();
                            if (!(user.role === role_enum_1.Role.ADMIN)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.usersService.getAdminCount(req.organization.id)];
                        case 2:
                            admins = _a.sent();
                            if (admins === 1) {
                                throw new common_1.BadRequestException('Cannot delete the last administrator');
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.usersService.remove(id, req.organization.id)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        UsersController_1.prototype.activate = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    return [2 /*return*/, this.usersService.activate(id, req.organization.id)];
                });
            });
        };
        UsersController_1.prototype.deactivate = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var user, admins;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.organization) {
                                throw new common_1.ForbiddenException('Organization context is required');
                            }
                            return [4 /*yield*/, this.usersService.findOne(id, req.organization.id)];
                        case 1:
                            user = _a.sent();
                            if (!(user.role === role_enum_1.Role.ADMIN)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.usersService.getAdminCount(req.organization.id)];
                        case 2:
                            admins = _a.sent();
                            if (admins === 1) {
                                throw new common_1.BadRequestException('Cannot deactivate the last administrator');
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.usersService.deactivate(id, req.organization.id)];
                    }
                });
            });
        };
        UsersController_1.prototype.getActivity = function (id, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    return [2 /*return*/, this.usersService.getActivity(id, __assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        UsersController_1.prototype.getPermissions = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.ForbiddenException('Organization context is required');
                    }
                    return [2 /*return*/, this.usersService.getPermissions(id, req.organization.id)];
                });
            });
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Create new user' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                description: 'User created successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 201, type: require("../entities/user.entity").User })];
        _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get all users' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Return all users',
                type: simple_user_dto_1.SimpleUserDto,
                isArray: true
            }), openapi.ApiResponse({ status: 200 })];
        _getProfile_decorators = [(0, common_1.Get)('profile'), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Return current user profile',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _updateProfile_decorators = [(0, common_1.Put)('profile'), (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Profile updated successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _updatePassword_decorators = [(0, common_1.Put)('profile/password'), (0, swagger_1.ApiOperation)({ summary: 'Update current user password' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Password updated successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200 })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Return user details',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update user' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'User updated successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete user' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'User deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _activate_decorators = [(0, common_1.Put)(':id/activate'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Activate user' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'User activated successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _deactivate_decorators = [(0, common_1.Put)(':id/deactivate'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Deactivate user' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'User deactivated successfully',
                type: simple_user_dto_1.SimpleUserDto
            }), openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User })];
        _getActivity_decorators = [(0, common_1.Get)(':id/activity'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get user activity' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Return user activity',
                schema: {
                    type: 'object',
                    properties: {
                        activities: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    action: { type: 'string' },
                                    timestamp: { type: 'string', format: 'date-time' }
                                }
                            }
                        },
                        total: { type: 'number' }
                    }
                }
            }), openapi.ApiResponse({ status: 200, type: [require("../entities/user-activity.entity").UserActivity] })];
        _getPermissions_decorators = [(0, common_1.Get)(':id/permissions'), (0, swagger_1.ApiOperation)({ summary: 'Get user permissions' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Return user permissions',
                schema: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }), openapi.ApiResponse({ status: 200, type: [String] })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePassword_decorators, { kind: "method", name: "updatePassword", static: false, private: false, access: { has: function (obj) { return "updatePassword" in obj; }, get: function (obj) { return obj.updatePassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _activate_decorators, { kind: "method", name: "activate", static: false, private: false, access: { has: function (obj) { return "activate" in obj; }, get: function (obj) { return obj.activate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deactivate_decorators, { kind: "method", name: "deactivate", static: false, private: false, access: { has: function (obj) { return "deactivate" in obj; }, get: function (obj) { return obj.deactivate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActivity_decorators, { kind: "method", name: "getActivity", static: false, private: false, access: { has: function (obj) { return "getActivity" in obj; }, get: function (obj) { return obj.getActivity; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPermissions_decorators, { kind: "method", name: "getPermissions", static: false, private: false, access: { has: function (obj) { return "getPermissions" in obj; }, get: function (obj) { return obj.getPermissions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map