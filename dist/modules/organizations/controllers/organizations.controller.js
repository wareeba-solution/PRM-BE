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
exports.OrganizationsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var roles_decorator_1 = require("../../../common/decorators/roles.decorator");
var role_enum_1 = require("../../users/enums/role.enum");
var OrganizationsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Organizations'), (0, common_1.Controller)('organizations'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getCurrentOrganization_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _addUser_decorators;
    var _removeUser_decorators;
    var _updateSubscription_decorators;
    var _getStatistics_decorators;
    var _verifyDomain_decorators;
    var _getAuditLogs_decorators;
    var OrganizationsController = _classThis = /** @class */ (function () {
        function OrganizationsController_1(organizationsService) {
            this.organizationsService = (__runInitializers(this, _instanceExtraInitializers), organizationsService);
        }
        OrganizationsController_1.prototype.create = function (createOrganizationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.user) {
                        throw new common_1.UnauthorizedException('User not authenticated');
                    }
                    return [2 /*return*/, this.organizationsService.create(__assign(__assign({}, createOrganizationDto), { createdById: req.user.id }))];
                });
            });
        };
        OrganizationsController_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.organizationsService.findAll(query)];
                });
            });
        };
        OrganizationsController_1.prototype.getCurrentOrganization = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.UnauthorizedException('No organization context found');
                    }
                    return [2 /*return*/, this.organizationsService.findOne(req.organization.id)];
                });
            });
        };
        OrganizationsController_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var organization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.organizationsService.findOne(id)];
                        case 1:
                            organization = _a.sent();
                            if (!organization) {
                                throw new common_1.NotFoundException('Organization not found');
                            }
                            return [2 /*return*/, organization];
                    }
                });
            });
        };
        OrganizationsController_1.prototype.update = function (id, updateOrganizationDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.user || !req.organization) {
                        throw new common_1.UnauthorizedException('User or organization context not found');
                    }
                    // Only allow updating current organization unless super admin
                    if (id !== req.organization.id && req.user.role !== role_enum_1.Role.SUPER_ADMIN) {
                        throw new common_1.ForbiddenException('Cannot update other organizations');
                    }
                    return [2 /*return*/, this.organizationsService.update(id, __assign(__assign({}, updateOrganizationDto), { updatedBy: req.user.id }))];
                });
            });
        };
        OrganizationsController_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.organizationsService.remove(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationsController_1.prototype.addUser = function (id, addUserDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.UnauthorizedException('No organization context found');
                    }
                    // Only allow adding users to current organization
                    if (id !== req.organization.id) {
                        throw new common_1.ForbiddenException('Cannot add users to other organizations');
                    }
                    return [2 /*return*/, this.organizationsService.addUser(id, addUserDto)];
                });
            });
        };
        OrganizationsController_1.prototype.removeUser = function (id, userId, req) {
            return __awaiter(this, void 0, void 0, function () {
                var admins;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.user || !req.organization) {
                                throw new common_1.UnauthorizedException('User or organization context not found');
                            }
                            // Only allow removing users from current organization
                            if (id !== req.organization.id) {
                                throw new common_1.ForbiddenException('Cannot remove users from other organizations');
                            }
                            if (!(req.user.id === userId)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.organizationsService.getAdminCount(id)];
                        case 1:
                            admins = _a.sent();
                            if (admins === 1) {
                                throw new common_1.BadRequestException('Cannot remove the last administrator');
                            }
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.organizationsService.removeUser(id, userId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationsController_1.prototype.updateSubscription = function (id, updateSubscriptionDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.user || !req.organization) {
                        throw new common_1.UnauthorizedException('User or organization context not found');
                    }
                    // Only allow updating current organization unless super admin
                    if (id !== req.organization.id && req.user.role !== role_enum_1.Role.SUPER_ADMIN) {
                        throw new common_1.ForbiddenException('Cannot update other organizations\' subscriptions');
                    }
                    return [2 /*return*/, this.organizationsService.updateSubscription(id, updateSubscriptionDto)];
                });
            });
        };
        OrganizationsController_1.prototype.getStatistics = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.UnauthorizedException('No organization context found');
                    }
                    // Only allow viewing current organization stats
                    if (id !== req.organization.id) {
                        throw new common_1.ForbiddenException('Cannot view other organizations\' statistics');
                    }
                    return [2 /*return*/, this.organizationsService.getStatistics(id)];
                });
            });
        };
        OrganizationsController_1.prototype.verifyDomain = function (id, domain, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.UnauthorizedException('No organization context found');
                    }
                    // Only allow verifying current organization domain
                    if (id !== req.organization.id) {
                        throw new common_1.ForbiddenException('Cannot verify other organizations\' domains');
                    }
                    return [2 /*return*/, this.organizationsService.verifyDomain(id, domain)];
                });
            });
        };
        OrganizationsController_1.prototype.getAuditLogs = function (id, query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.organization) {
                        throw new common_1.UnauthorizedException('No organization context found');
                    }
                    // Only allow viewing current organization logs
                    if (id !== req.organization.id) {
                        throw new common_1.ForbiddenException('Cannot view other organizations\' audit logs');
                    }
                    return [2 /*return*/, this.organizationsService.getAuditLogs(id, query)];
                });
            });
        };
        return OrganizationsController_1;
    }());
    __setFunctionName(_classThis, "OrganizationsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), openapi.ApiResponse({ status: 201, type: require("../entities/organization.entity").Organization })];
        _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get all organizations' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all organizations' }), openapi.ApiResponse({ status: 200 })];
        _getCurrentOrganization_decorators = [(0, common_1.Get)('current'), (0, swagger_1.ApiOperation)({ summary: 'Get current organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return current organization details' }), openapi.ApiResponse({ status: 200, type: require("../entities/organization.entity").Organization })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get organization by id' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return organization details' }), openapi.ApiResponse({ status: 200, type: require("../entities/organization.entity").Organization })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Organization updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/organization.entity").Organization })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Organization deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _addUser_decorators = [(0, common_1.Post)(':id/users'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Add user to organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'User added successfully' }), openapi.ApiResponse({ status: 201, type: require("../../users/entities/user.entity").User })];
        _removeUser_decorators = [(0, common_1.Delete)(':id/users/:userId'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Remove user from organization' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'User removed successfully' }), openapi.ApiResponse({ status: 200 })];
        _updateSubscription_decorators = [(0, common_1.Put)(':id/subscription'), (0, roles_decorator_1.Roles)(role_enum_1.Role.SUPER_ADMIN, role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update organization subscription' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Subscription updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/organization.entity").Organization })];
        _getStatistics_decorators = [(0, common_1.Get)(':id/statistics'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get organization statistics' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return organization statistics' }), openapi.ApiResponse({ status: 200, type: Object })];
        _verifyDomain_decorators = [(0, common_1.Post)(':id/verify-domain'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Verify organization domain' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Domain verified successfully' }), openapi.ApiResponse({ status: 201, type: Boolean })];
        _getAuditLogs_decorators = [(0, common_1.Get)(':id/audit-logs'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get organization audit logs' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return organization audit logs' }), openapi.ApiResponse({ status: 200 })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentOrganization_decorators, { kind: "method", name: "getCurrentOrganization", static: false, private: false, access: { has: function (obj) { return "getCurrentOrganization" in obj; }, get: function (obj) { return obj.getCurrentOrganization; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addUser_decorators, { kind: "method", name: "addUser", static: false, private: false, access: { has: function (obj) { return "addUser" in obj; }, get: function (obj) { return obj.addUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeUser_decorators, { kind: "method", name: "removeUser", static: false, private: false, access: { has: function (obj) { return "removeUser" in obj; }, get: function (obj) { return obj.removeUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateSubscription_decorators, { kind: "method", name: "updateSubscription", static: false, private: false, access: { has: function (obj) { return "updateSubscription" in obj; }, get: function (obj) { return obj.updateSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: function (obj) { return "getStatistics" in obj; }, get: function (obj) { return obj.getStatistics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyDomain_decorators, { kind: "method", name: "verifyDomain", static: false, private: false, access: { has: function (obj) { return "verifyDomain" in obj; }, get: function (obj) { return obj.verifyDomain; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAuditLogs_decorators, { kind: "method", name: "getAuditLogs", static: false, private: false, access: { has: function (obj) { return "getAuditLogs" in obj; }, get: function (obj) { return obj.getAuditLogs; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationsController = _classThis;
}();
exports.OrganizationsController = OrganizationsController;
//# sourceMappingURL=organizations.controller.js.map