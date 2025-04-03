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
exports.DepartmentAuditListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var department_audit_log_entity_1 = require("../entities/department-audit-log.entity");
var DepartmentAuditListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleDepartmentCreated_decorators;
    var _handleDepartmentUpdated_decorators;
    var _handleDepartmentDeleted_decorators;
    var _handleDepartmentMoved_decorators;
    var _handleDepartmentReordered_decorators;
    var _handleBulkUpdate_decorators;
    var _handleHierarchyChanged_decorators;
    var _handleSettingsUpdated_decorators;
    var _handleAccessModified_decorators;
    var DepartmentAuditListener = _classThis = /** @class */ (function () {
        function DepartmentAuditListener_1(auditService) {
            this.auditService = (__runInitializers(this, _instanceExtraInitializers), auditService);
        }
        DepartmentAuditListener_1.prototype.handleDepartmentCreated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.CREATED,
                                performedById: event.createdById,
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleDepartmentUpdated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
                                performedById: event.updatedById,
                                changes: event.changes,
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleDepartmentDeleted = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.DELETED,
                                performedById: event.deletedById,
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleDepartmentMoved = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.MOVED,
                                performedById: event.performedById,
                                metadata: {
                                    previousParentId: event.previousParentId,
                                    newParentId: event.newParentId,
                                },
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleDepartmentReordered = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.REORDERED,
                                performedById: event.performedById,
                                metadata: {
                                    newOrder: event.newOrder,
                                },
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleBulkUpdate = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, departmentId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = event.departmentIds;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            departmentId = _a[_i];
                            return [4 /*yield*/, this.auditService.log({
                                    departmentId: departmentId,
                                    organizationId: event.organizationId,
                                    action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
                                    performedById: event.performedById,
                                    changes: event.changes,
                                    metadata: {
                                        bulkUpdate: true,
                                        totalDepartments: event.departmentIds.length,
                                    },
                                    request: event.request,
                                })];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleHierarchyChanged = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
                                performedById: event.performedById,
                                changes: event.changes,
                                metadata: {
                                    hierarchyUpdate: true,
                                },
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleSettingsUpdated = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
                                performedById: event.performedById,
                                changes: event.changes,
                                metadata: {
                                    settingsUpdate: true,
                                },
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DepartmentAuditListener_1.prototype.handleAccessModified = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auditService.log({
                                departmentId: event.departmentId,
                                organizationId: event.organizationId,
                                action: department_audit_log_entity_1.DepartmentAuditAction.UPDATED,
                                performedById: event.performedById,
                                metadata: __assign({ accessUpdate: true }, event.changes),
                                request: event.request,
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DepartmentAuditListener_1;
    }());
    __setFunctionName(_classThis, "DepartmentAuditListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleDepartmentCreated_decorators = [(0, event_emitter_1.OnEvent)('department.created')];
        _handleDepartmentUpdated_decorators = [(0, event_emitter_1.OnEvent)('department.updated')];
        _handleDepartmentDeleted_decorators = [(0, event_emitter_1.OnEvent)('department.deleted')];
        _handleDepartmentMoved_decorators = [(0, event_emitter_1.OnEvent)('department.moved')];
        _handleDepartmentReordered_decorators = [(0, event_emitter_1.OnEvent)('department.reordered')];
        _handleBulkUpdate_decorators = [(0, event_emitter_1.OnEvent)('department.bulk_update')];
        _handleHierarchyChanged_decorators = [(0, event_emitter_1.OnEvent)('department.hierarchy.changed')];
        _handleSettingsUpdated_decorators = [(0, event_emitter_1.OnEvent)('department.settings.updated')];
        _handleAccessModified_decorators = [(0, event_emitter_1.OnEvent)('department.access.modified')];
        __esDecorate(_classThis, null, _handleDepartmentCreated_decorators, { kind: "method", name: "handleDepartmentCreated", static: false, private: false, access: { has: function (obj) { return "handleDepartmentCreated" in obj; }, get: function (obj) { return obj.handleDepartmentCreated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDepartmentUpdated_decorators, { kind: "method", name: "handleDepartmentUpdated", static: false, private: false, access: { has: function (obj) { return "handleDepartmentUpdated" in obj; }, get: function (obj) { return obj.handleDepartmentUpdated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDepartmentDeleted_decorators, { kind: "method", name: "handleDepartmentDeleted", static: false, private: false, access: { has: function (obj) { return "handleDepartmentDeleted" in obj; }, get: function (obj) { return obj.handleDepartmentDeleted; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDepartmentMoved_decorators, { kind: "method", name: "handleDepartmentMoved", static: false, private: false, access: { has: function (obj) { return "handleDepartmentMoved" in obj; }, get: function (obj) { return obj.handleDepartmentMoved; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDepartmentReordered_decorators, { kind: "method", name: "handleDepartmentReordered", static: false, private: false, access: { has: function (obj) { return "handleDepartmentReordered" in obj; }, get: function (obj) { return obj.handleDepartmentReordered; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleBulkUpdate_decorators, { kind: "method", name: "handleBulkUpdate", static: false, private: false, access: { has: function (obj) { return "handleBulkUpdate" in obj; }, get: function (obj) { return obj.handleBulkUpdate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleHierarchyChanged_decorators, { kind: "method", name: "handleHierarchyChanged", static: false, private: false, access: { has: function (obj) { return "handleHierarchyChanged" in obj; }, get: function (obj) { return obj.handleHierarchyChanged; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSettingsUpdated_decorators, { kind: "method", name: "handleSettingsUpdated", static: false, private: false, access: { has: function (obj) { return "handleSettingsUpdated" in obj; }, get: function (obj) { return obj.handleSettingsUpdated; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAccessModified_decorators, { kind: "method", name: "handleAccessModified", static: false, private: false, access: { has: function (obj) { return "handleAccessModified" in obj; }, get: function (obj) { return obj.handleAccessModified; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentAuditListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentAuditListener = _classThis;
}();
exports.DepartmentAuditListener = DepartmentAuditListener;
//# sourceMappingURL=department-audit.listener.js.map