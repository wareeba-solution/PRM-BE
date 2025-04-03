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
exports.OptionalOrganization = exports.OrganizationGuard = void 0;
var common_1 = require("@nestjs/common");
var role_enum_1 = require("../../users/enums/role.enum");
var OrganizationGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationGuard = _classThis = /** @class */ (function () {
        function OrganizationGuard_1(reflector, organizationsService) {
            this.reflector = reflector;
            this.organizationsService = organizationsService;
            this.logger = new common_1.Logger(OrganizationGuard.name);
        }
        OrganizationGuard_1.prototype.canActivate = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var request, user, organizationId, isOptional, hasAccess, _a, organization, member, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            request = context.switchToHttp().getRequest();
                            user = request.user;
                            // Handle case where no user is authenticated
                            if (!user) {
                                throw new common_1.UnauthorizedException('No authenticated user found');
                            }
                            // Super admins bypass organization checks
                            if (user.role === role_enum_1.Role.SUPER_ADMIN) {
                                return [2 /*return*/, true];
                            }
                            organizationId = this.extractOrganizationId(request);
                            // If no organization ID is found, check if the endpoint is marked as optional
                            if (!organizationId) {
                                isOptional = this.reflector.get('optionalOrganization', context.getHandler());
                                return [2 /*return*/, isOptional || false];
                            }
                            return [4 /*yield*/, this.verifyOrganizationAccess(user.id, organizationId)];
                        case 1:
                            hasAccess = _b.sent();
                            if (!hasAccess) {
                                throw new common_1.ForbiddenException('User does not have access to this organization');
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.organizationsService.findOne(organizationId),
                                    this.organizationsService.getMemberContext(organizationId, user.id)
                                ])];
                        case 2:
                            _a = _b.sent(), organization = _a[0], member = _a[1];
                            if (!organization) {
                                throw new common_1.ForbiddenException('Organization not found');
                            }
                            if (!member) {
                                throw new common_1.ForbiddenException('User is not a member of this organization');
                            }
                            // Attach organization and member context to request
                            request.organization = organization;
                            request.organizationMember = member;
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _b.sent();
                            this.logger.error('Error in organization guard:', error_1);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationGuard_1.prototype.extractOrganizationId = function (request) {
            var _a, _b, _c;
            // Try to get organization ID from different places in the request
            return (((_a = request.params) === null || _a === void 0 ? void 0 : _a.organizationId) ||
                ((_b = request.body) === null || _b === void 0 ? void 0 : _b.organizationId) ||
                ((_c = request.query) === null || _c === void 0 ? void 0 : _c.organizationId) ||
                this.extractFromPath(request.path));
        };
        OrganizationGuard_1.prototype.extractFromPath = function (path) {
            // Extract organization ID from URL path if it follows the pattern /organizations/{id}/...
            var matches = path.match(/\/organizations\/([^\/]+)/);
            return matches === null || matches === void 0 ? void 0 : matches[1];
        };
        OrganizationGuard_1.prototype.verifyOrganizationAccess = function (userId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var membership, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.organizationsService.getMemberContext(organizationId, userId)];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                return [2 /*return*/, false];
                            }
                            // Check if membership is active
                            if (!membership.isActive) {
                                return [2 /*return*/, false];
                            }
                            // Check if user has required roles/permissions
                            // This can be expanded based on your requirements
                            return [2 /*return*/, true];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Error verifying organization access for user ".concat(userId, ":"), error_2);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return OrganizationGuard_1;
    }());
    __setFunctionName(_classThis, "OrganizationGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationGuard = _classThis;
}();
exports.OrganizationGuard = OrganizationGuard;
// Decorator to mark endpoints where organization context is optional
var OptionalOrganization = function () {
    return function (target, key, descriptor) {
        if (key) {
            if (descriptor) {
                (0, common_1.SetMetadata)('optionalOrganization', true)(target, key, descriptor);
            }
        }
        return descriptor;
    };
};
exports.OptionalOrganization = OptionalOrganization;
//# sourceMappingURL=organization.guard.js.map