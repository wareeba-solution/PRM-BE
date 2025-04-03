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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
var common_1 = require("@nestjs/common");
var DepartmentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DepartmentsService = _classThis = /** @class */ (function () {
        function DepartmentsService_1(departmentRepository, organizationsService, eventEmitter) {
            this.departmentRepository = departmentRepository;
            this.organizationsService = organizationsService;
            this.eventEmitter = eventEmitter;
        }
        /**
         * Create a new department
         */
        DepartmentsService_1.prototype.create = function (createDepartmentDto, userId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var department;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            department = this.departmentRepository.create(__assign(__assign({}, createDepartmentDto), { organizationId: organizationId, createdById: userId, updatedById: userId, isActive: true }));
                            return [4 /*yield*/, this.departmentRepository.save(department)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Find all departments matching query
         */
        DepartmentsService_1.prototype.findAll = function (organizationId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { organizationId: organizationId };
                    if (query.isActive !== undefined) {
                        where.isActive = query.isActive;
                    }
                    if (query.parentDepartmentId) {
                        where.parentDepartmentId = query.parentDepartmentId;
                    }
                    if (query.managerId) {
                        where.managerId = query.managerId;
                    }
                    return [2 /*return*/, this.departmentRepository.findAndCount({
                            where: where,
                            order: { createdAt: 'DESC' },
                            skip: query.skip,
                            take: query.take,
                            relations: query.relations || [],
                        })];
                });
            });
        };
        /**
         * Find department by ID
         */
        DepartmentsService_1.prototype.findById = function (id, organizationId, relations) {
            return __awaiter(this, void 0, void 0, function () {
                var where, department;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            where = { id: id };
                            if (organizationId) {
                                where.organizationId = organizationId;
                            }
                            return [4 /*yield*/, this.departmentRepository.findOne({
                                    where: where,
                                    relations: relations || []
                                })];
                        case 1:
                            department = _a.sent();
                            if (!department) {
                                throw new common_1.NotFoundException("Department with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, department];
                    }
                });
            });
        };
        /**
         * Update department
         */
        DepartmentsService_1.prototype.update = function (id, updateDepartmentDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var department, updatedDepartment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            department = _a.sent();
                            if (!updateDepartmentDto.parentDepartmentId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.validateParentDepartment(id, updateDepartmentDto.parentDepartmentId)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.departmentRepository.save(__assign(__assign(__assign({}, department), updateDepartmentDto), { updatedById: userId }))];
                        case 4:
                            updatedDepartment = _a.sent();
                            this.eventEmitter.emit('department.updated', {
                                departmentId: id,
                                organizationId: department.organizationId,
                                updatedById: userId,
                                changes: updateDepartmentDto,
                            });
                            return [2 /*return*/, updatedDepartment];
                    }
                });
            });
        };
        /**
         * Delete department
         */
        DepartmentsService_1.prototype.delete = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var department, hasChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            department = _a.sent();
                            return [4 /*yield*/, this.departmentRepository.count({
                                    where: { parentDepartmentId: id },
                                })];
                        case 2:
                            hasChildren = _a.sent();
                            if (hasChildren) {
                                throw new common_1.BadRequestException('Cannot delete department with child departments');
                            }
                            return [4 /*yield*/, this.departmentRepository.softDelete(id)];
                        case 3:
                            _a.sent();
                            this.eventEmitter.emit('department.deleted', {
                                departmentId: id,
                                organizationId: department.organizationId,
                                deletedById: userId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Validate parent department relationship
         */
        DepartmentsService_1.prototype.validateParentDepartment = function (departmentId, parentId) {
            return __awaiter(this, void 0, void 0, function () {
                var childDepartments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (departmentId === parentId) {
                                throw new common_1.BadRequestException('Department cannot be its own parent');
                            }
                            return [4 /*yield*/, this.findAllChildren(departmentId)];
                        case 1:
                            childDepartments = _a.sent();
                            if (childDepartments.some(function (dept) { return dept.id === parentId; })) {
                                throw new common_1.BadRequestException('Cannot set a child department as parent department');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Find all child departments
         */
        DepartmentsService_1.prototype.findAllChildren = function (departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var children, allChildren, _i, children_1, child, grandChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentRepository.find({
                                where: { parentDepartmentId: departmentId },
                            })];
                        case 1:
                            children = _a.sent();
                            allChildren = __spreadArray([], children, true);
                            _i = 0, children_1 = children;
                            _a.label = 2;
                        case 2:
                            if (!(_i < children_1.length)) return [3 /*break*/, 5];
                            child = children_1[_i];
                            return [4 /*yield*/, this.findAllChildren(child.id)];
                        case 3:
                            grandChildren = _a.sent();
                            allChildren.push.apply(allChildren, grandChildren);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, allChildren];
                    }
                });
            });
        };
        /**
         * Update member count
         */
        DepartmentsService_1.prototype.updateMemberCount = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentRepository
                                .createQueryBuilder('department')
                                .leftJoin('department.members', 'member')
                                .where('department.id = :id', { id: id })
                                .getCount()];
                        case 1:
                            count = _a.sent();
                            return [4 /*yield*/, this.departmentRepository.update(id, { memberCount: count })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DepartmentsService_1;
    }());
    __setFunctionName(_classThis, "DepartmentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentsService = _classThis;
}();
exports.DepartmentsService = DepartmentsService;
//# sourceMappingURL=departments.service.js.map