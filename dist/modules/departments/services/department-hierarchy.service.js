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
exports.DepartmentHierarchyService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var DepartmentHierarchyService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DepartmentHierarchyService = _classThis = /** @class */ (function () {
        function DepartmentHierarchyService_1(departmentRepository, departmentsService, eventEmitter) {
            this.departmentRepository = departmentRepository;
            this.departmentsService = departmentsService;
            this.eventEmitter = eventEmitter;
        }
        /**
         * Get department hierarchy tree
         */
        DepartmentHierarchyService_1.prototype.getDepartmentTree = function (organizationId, rootDepartmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var departments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentRepository.find({
                                where: { organizationId: organizationId },
                                order: { name: 'ASC' },
                            })];
                        case 1:
                            departments = _a.sent();
                            return [2 /*return*/, this.buildDepartmentTree(departments, rootDepartmentId)];
                    }
                });
            });
        };
        /**
         * Build department hierarchy tree
         */
        DepartmentHierarchyService_1.prototype.buildDepartmentTree = function (departments, rootDepartmentId, level) {
            var _this = this;
            if (level === void 0) { level = 0; }
            var rootDepartments = departments.filter(function (dept) {
                return rootDepartmentId
                    ? dept.id === rootDepartmentId
                    : !dept.parentDepartmentId;
            });
            return rootDepartments.map(function (dept) { return ({
                id: dept.id,
                name: dept.name,
                managerId: dept.managerId,
                memberCount: dept.memberCount,
                level: level,
                metadata: dept.metadata,
                children: _this.buildDepartmentTree(departments.filter(function (d) { return d.parentDepartmentId === dept.id; }), undefined, level + 1),
            }); });
        };
        /**
         * Move department in hierarchy
         */
        DepartmentHierarchyService_1.prototype.moveDepartment = function (departmentId, newParentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var department, newParent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentsService.findById(departmentId)];
                        case 1:
                            department = _a.sent();
                            if (!newParentId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.departmentsService.findById(newParentId)];
                        case 2:
                            newParent = _a.sent();
                            if (newParent.organizationId !== department.organizationId) {
                                throw new common_1.BadRequestException('Cannot move department to different organization');
                            }
                            // Check for circular reference
                            return [4 /*yield*/, this.validateHierarchyMove(departmentId, newParentId)];
                        case 3:
                            // Check for circular reference
                            _a.sent();
                            _a.label = 4;
                        case 4: 
                        // Update parent
                        return [4 /*yield*/, this.departmentRepository.update(departmentId, {
                                parentDepartmentId: newParentId || undefined,
                                updatedById: userId,
                            })];
                        case 5:
                            // Update parent
                            _a.sent();
                            this.eventEmitter.emit('department.moved', {
                                departmentId: departmentId,
                                previousParentId: department.parentDepartmentId,
                                newParentId: newParentId,
                                performedById: userId,
                                organizationId: department.organizationId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Validate hierarchy move to prevent circular references
         */
        DepartmentHierarchyService_1.prototype.validateHierarchyMove = function (departmentId, newParentId) {
            return __awaiter(this, void 0, void 0, function () {
                var childDepartments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (departmentId === newParentId) {
                                throw new common_1.BadRequestException('Department cannot be its own parent');
                            }
                            return [4 /*yield*/, this.getAllChildDepartments(departmentId)];
                        case 1:
                            childDepartments = _a.sent();
                            if (childDepartments.some(function (dept) { return dept.id === newParentId; })) {
                                throw new common_1.BadRequestException('Cannot move department under its own child');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get all child departments recursively
         */
        DepartmentHierarchyService_1.prototype.getAllChildDepartments = function (departmentId) {
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
                            return [4 /*yield*/, this.getAllChildDepartments(child.id)];
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
         * Get department ancestors
         */
        DepartmentHierarchyService_1.prototype.getDepartmentAncestors = function (departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var ancestors, currentDepartment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ancestors = [];
                            return [4 /*yield*/, this.departmentsService.findById(departmentId, undefined, // organizationId is optional
                                ['parentDepartment'])];
                        case 1:
                            currentDepartment = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!currentDepartment.parentDepartment) return [3 /*break*/, 4];
                            ancestors.push(currentDepartment.parentDepartment);
                            return [4 /*yield*/, this.departmentsService.findById(currentDepartment.parentDepartment.id, undefined, ['parentDepartment'])];
                        case 3:
                            currentDepartment = _a.sent();
                            return [3 /*break*/, 2];
                        case 4: return [2 /*return*/, ancestors.reverse()];
                    }
                });
            });
        };
        /**
         * Get department descendants
         */
        DepartmentHierarchyService_1.prototype.getDepartmentDescendants = function (departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getAllChildDepartments(departmentId)];
                });
            });
        };
        /**
         * Get department siblings
         */
        DepartmentHierarchyService_1.prototype.getDepartmentSiblings = function (departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var department;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentsService.findById(departmentId, undefined, ['parentDepartment'])];
                        case 1:
                            department = _a.sent();
                            return [2 /*return*/, this.departmentRepository.find({
                                    where: {
                                        parentDepartmentId: department.parentDepartmentId || (0, typeorm_1.IsNull)(),
                                        id: (0, typeorm_1.Not)(departmentId),
                                        organizationId: department.organizationId,
                                    },
                                })];
                    }
                });
            });
        };
        /**
         * Calculate department depth in hierarchy
         */
        DepartmentHierarchyService_1.prototype.getDepartmentDepth = function (departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var ancestors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getDepartmentAncestors(departmentId)];
                        case 1:
                            ancestors = _a.sent();
                            return [2 /*return*/, ancestors.length];
                    }
                });
            });
        };
        /**
         * Reorder sibling departments
         */
        DepartmentHierarchyService_1.prototype.reorderDepartments = function (parentDepartmentId, orderedDepartmentIds, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var departments, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.departmentRepository.find({
                                where: {
                                    id: (0, typeorm_1.In)(orderedDepartmentIds),
                                    parentDepartmentId: parentDepartmentId || (0, typeorm_1.IsNull)(),
                                },
                            })];
                        case 1:
                            departments = _a.sent();
                            if (departments.length !== orderedDepartmentIds.length) {
                                throw new common_1.BadRequestException('Invalid department IDs provided');
                            }
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < orderedDepartmentIds.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.departmentRepository.update(orderedDepartmentIds[i], {
                                    sortOrder: i,
                                    updatedById: userId,
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            this.eventEmitter.emit('department.reordered', {
                                parentDepartmentId: parentDepartmentId,
                                orderedDepartmentIds: orderedDepartmentIds,
                                performedById: userId,
                                organizationId: departments[0].organizationId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update department parent
         */
        DepartmentHierarchyService_1.prototype.updateDepartmentParent = function (departmentId, parentDepartmentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var updateData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            updateData = {
                                parentDepartmentId: parentDepartmentId,
                                updatedById: userId
                            };
                            return [4 /*yield*/, this.departmentRepository.update(departmentId, updateData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.departmentRepository.findOneOrFail({ where: { id: departmentId } })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * Update department order
         */
        DepartmentHierarchyService_1.prototype.updateDepartmentOrder = function (departmentId, sortOrder, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var updateData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            updateData = {
                                sortOrder: sortOrder,
                                updatedById: userId
                            };
                            return [4 /*yield*/, this.departmentRepository.update(departmentId, updateData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.departmentRepository.findOneOrFail({ where: { id: departmentId } })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return DepartmentHierarchyService_1;
    }());
    __setFunctionName(_classThis, "DepartmentHierarchyService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentHierarchyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentHierarchyService = _classThis;
}();
exports.DepartmentHierarchyService = DepartmentHierarchyService;
//# sourceMappingURL=department-hierarchy.service.js.map