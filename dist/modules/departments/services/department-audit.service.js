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
exports.DepartmentAuditService = void 0;
var common_1 = require("@nestjs/common");
var DepartmentAuditService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DepartmentAuditService = _classThis = /** @class */ (function () {
        function DepartmentAuditService_1(auditLogRepository, departmentRepository) {
            this.auditLogRepository = auditLogRepository;
            this.departmentRepository = departmentRepository;
        }
        /**
         * Create audit log entry
         */
        DepartmentAuditService_1.prototype.log = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var auditLog;
                var _a, _b;
                return __generator(this, function (_c) {
                    auditLog = this.auditLogRepository.create({
                        departmentId: options.departmentId,
                        organizationId: options.organizationId,
                        action: options.action,
                        performedById: options.performedById,
                        changes: options.changes,
                        metadata: options.metadata,
                        affectedUserId: options.affectedUserId,
                        ipAddress: (_a = options.request) === null || _a === void 0 ? void 0 : _a.ip,
                        userAgent: (_b = options.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
                    });
                    return [2 /*return*/, this.auditLogRepository.save(auditLog)];
                });
            });
        };
        /**
         * Get audit trail for a specific department
         */
        DepartmentAuditService_1.prototype.getDepartmentAuditTrail = function (departmentId_1) {
            return __awaiter(this, arguments, void 0, function (departmentId, options) {
                var queryBuilder;
                var _a;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_b) {
                    queryBuilder = this.auditLogRepository
                        .createQueryBuilder('audit')
                        .leftJoinAndSelect('audit.performedBy', 'performer')
                        .leftJoinAndSelect('audit.affectedUser', 'affected')
                        .where('audit.departmentId = :departmentId', { departmentId: departmentId });
                    if (options.startDate) {
                        queryBuilder.andWhere('audit.createdAt >= :startDate', {
                            startDate: options.startDate
                        });
                    }
                    if (options.endDate) {
                        queryBuilder.andWhere('audit.createdAt <= :endDate', {
                            endDate: options.endDate
                        });
                    }
                    if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
                        queryBuilder.andWhere('audit.action IN (:...actions)', {
                            actions: options.actions
                        });
                    }
                    return [2 /*return*/, queryBuilder
                            .orderBy('audit.createdAt', 'DESC')
                            .take(options.limit || 50)
                            .skip(options.offset || 0)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Get user activity in departments
         */
        DepartmentAuditService_1.prototype.getUserDepartmentActivity = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var queryBuilder;
                var _a;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_b) {
                    queryBuilder = this.auditLogRepository
                        .createQueryBuilder('audit')
                        .where('(audit.performedById = :userId OR audit.affectedUserId = :userId)', { userId: userId });
                    if ((_a = options.departmentIds) === null || _a === void 0 ? void 0 : _a.length) {
                        queryBuilder.andWhere('audit.departmentId IN (:...departmentIds)', {
                            departmentIds: options.departmentIds
                        });
                    }
                    if (options.startDate) {
                        queryBuilder.andWhere('audit.createdAt >= :startDate', {
                            startDate: options.startDate
                        });
                    }
                    if (options.endDate) {
                        queryBuilder.andWhere('audit.createdAt <= :endDate', {
                            endDate: options.endDate
                        });
                    }
                    return [2 /*return*/, queryBuilder
                            .orderBy('audit.createdAt', 'DESC')
                            .take(options.limit || 50)
                            .skip(options.offset || 0)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Compare and generate changes object
         */
        DepartmentAuditService_1.prototype.compareChanges = function (oldData, newData) {
            var changes = {};
            for (var _i = 0, _a = Object.keys(newData); _i < _a.length; _i++) {
                var key = _a[_i];
                if (oldData[key] !== undefined &&
                    JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
                    changes[key] = {
                        old: oldData[key],
                        new: newData[key]
                    };
                }
            }
            return changes;
        };
        /**
         * Clean up old audit logs
         */
        DepartmentAuditService_1.prototype.cleanupOldLogs = function () {
            return __awaiter(this, arguments, void 0, function (retentionDays) {
                var cutoffDate, result;
                if (retentionDays === void 0) { retentionDays = 365; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cutoffDate = new Date();
                            cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
                            return [4 /*yield*/, this.auditLogRepository
                                    .createQueryBuilder()
                                    .delete()
                                    .where('createdAt < :cutoffDate', { cutoffDate: cutoffDate })
                                    .execute()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.affected || 0];
                    }
                });
            });
        };
        return DepartmentAuditService_1;
    }());
    __setFunctionName(_classThis, "DepartmentAuditService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentAuditService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentAuditService = _classThis;
}();
exports.DepartmentAuditService = DepartmentAuditService;
//# sourceMappingURL=department-audit.service.js.map