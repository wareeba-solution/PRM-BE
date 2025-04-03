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
exports.DepartmentMembersService = void 0;
var common_1 = require("@nestjs/common");
var department_entity_1 = require("../entities/department.entity");
var DepartmentMembersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DepartmentMembersService = _classThis = /** @class */ (function () {
        function DepartmentMembersService_1(departmentRepository, userRepository, usersService, departmentsService, eventEmitter) {
            this.departmentRepository = departmentRepository;
            this.userRepository = userRepository;
            this.usersService = usersService;
            this.departmentsService = departmentsService;
            this.eventEmitter = eventEmitter;
        }
        /**
         * Add member to department
         */
        DepartmentMembersService_1.prototype.addMember = function (departmentId, userId, performedById) {
            return __awaiter(this, void 0, void 0, function () {
                var department, user, isMember;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentsService.findById(departmentId)];
                        case 1:
                            department = _a.sent();
                            return [4 /*yield*/, this.usersService.findById(userId)];
                        case 2:
                            user = _a.sent();
                            return [4 /*yield*/, this.departmentRepository
                                    .createQueryBuilder('department')
                                    .innerJoin('department.members', 'member')
                                    .where('department.id = :departmentId', { departmentId: departmentId })
                                    .andWhere('member.id = :userId', { userId: userId })
                                    .getExists()];
                        case 3:
                            isMember = _a.sent();
                            if (isMember) {
                                throw new common_1.BadRequestException('User is already a member of this department');
                            }
                            // Add member
                            return [4 /*yield*/, this.departmentRepository
                                    .createQueryBuilder()
                                    .relation(department_entity_1.Department, 'members')
                                    .of(department)
                                    .add(user)];
                        case 4:
                            // Add member
                            _a.sent();
                            // Update member count
                            return [4 /*yield*/, this.departmentsService.updateMemberCount(departmentId)];
                        case 5:
                            // Update member count
                            _a.sent();
                            this.eventEmitter.emit('department.member.added', {
                                departmentId: departmentId,
                                userId: userId,
                                performedById: performedById,
                                organizationId: department.organizationId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Remove member from department
         */
        DepartmentMembersService_1.prototype.removeMember = function (departmentId, userId, performedById) {
            return __awaiter(this, void 0, void 0, function () {
                var department, isMember;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentsService.findById(departmentId)];
                        case 1:
                            department = _a.sent();
                            return [4 /*yield*/, this.departmentRepository
                                    .createQueryBuilder('department')
                                    .innerJoin('department.members', 'member')
                                    .where('department.id = :departmentId', { departmentId: departmentId })
                                    .andWhere('member.id = :userId', { userId: userId })
                                    .getExists()];
                        case 2:
                            isMember = _a.sent();
                            if (!isMember) {
                                throw new common_1.BadRequestException('User is not a member of this department');
                            }
                            // Check if user is department manager
                            if (department.managerId === userId) {
                                throw new common_1.BadRequestException('Cannot remove department manager from department');
                            }
                            // Remove member
                            return [4 /*yield*/, this.departmentRepository
                                    .createQueryBuilder()
                                    .relation(department_entity_1.Department, 'members')
                                    .of(department)
                                    .remove(userId)];
                        case 3:
                            // Remove member
                            _a.sent();
                            // Update member count
                            return [4 /*yield*/, this.departmentsService.updateMemberCount(departmentId)];
                        case 4:
                            // Update member count
                            _a.sent();
                            this.eventEmitter.emit('department.member.removed', {
                                departmentId: departmentId,
                                userId: userId,
                                performedById: performedById,
                                organizationId: department.organizationId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get department members
         */
        DepartmentMembersService_1.prototype.getMembers = function (departmentId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder;
                return __generator(this, function (_a) {
                    queryBuilder = this.userRepository
                        .createQueryBuilder('user')
                        .innerJoin('user.departments', 'department')
                        .where('department.id = :departmentId', { departmentId: departmentId });
                    if (query.search) {
                        queryBuilder.andWhere('(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)', { search: "%".concat(query.search, "%") });
                    }
                    return [2 /*return*/, queryBuilder
                            .orderBy('user.firstName', 'ASC')
                            .addOrderBy('user.lastName', 'ASC')
                            .skip(query.skip)
                            .take(query.take)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Transfer member to another department
         */
        DepartmentMembersService_1.prototype.transferMember = function (userId, fromDepartmentId, toDepartmentId, performedById) {
            return __awaiter(this, void 0, void 0, function () {
                var fromDepartment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Remove from old department
                        return [4 /*yield*/, this.removeMember(fromDepartmentId, userId, performedById)];
                        case 1:
                            // Remove from old department
                            _a.sent();
                            // Add to new department
                            return [4 /*yield*/, this.addMember(toDepartmentId, userId, performedById)];
                        case 2:
                            // Add to new department
                            _a.sent();
                            return [4 /*yield*/, this.departmentsService.findById(fromDepartmentId)];
                        case 3:
                            fromDepartment = _a.sent();
                            this.eventEmitter.emit('department.member.transferred', {
                                userId: userId,
                                fromDepartmentId: fromDepartmentId,
                                toDepartmentId: toDepartmentId,
                                performedById: performedById,
                                organizationId: fromDepartment.organizationId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get user's departments
         */
        DepartmentMembersService_1.prototype.getUserDepartments = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.departmentRepository
                            .createQueryBuilder('department')
                            .innerJoin('department.members', 'member')
                            .where('member.id = :userId', { userId: userId })
                            .getMany()];
                });
            });
        };
        /**
         * Check if user is member of department
         */
        DepartmentMembersService_1.prototype.isMember = function (departmentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.departmentRepository
                            .createQueryBuilder('department')
                            .innerJoin('department.members', 'member')
                            .where('department.id = :departmentId', { departmentId: departmentId })
                            .andWhere('member.id = :userId', { userId: userId })
                            .getExists()];
                });
            });
        };
        return DepartmentMembersService_1;
    }());
    __setFunctionName(_classThis, "DepartmentMembersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentMembersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentMembersService = _classThis;
}();
exports.DepartmentMembersService = DepartmentMembersService;
//# sourceMappingURL=department-members.service.js.map