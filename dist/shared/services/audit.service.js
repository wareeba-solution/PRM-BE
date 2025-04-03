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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
var common_1 = require("@nestjs/common");
var AuditService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuditService = _classThis = /** @class */ (function () {
        function AuditService_1(auditLogRepository) {
            this.auditLogRepository = auditLogRepository;
        }
        /**
         * Create a new audit log entry
         */
        AuditService_1.prototype.log = function (dto, request) {
            return __awaiter(this, void 0, void 0, function () {
                var auditLog;
                var _a, _b;
                return __generator(this, function (_c) {
                    auditLog = this.auditLogRepository.create({
                        action: dto.action,
                        entityType: dto.entityType,
                        entityId: dto.entityId.toString(),
                        changes: dto.changes || {},
                        metadata: __assign(__assign({}, dto.metadata), { ipAddress: dto.ipAddress || (request === null || request === void 0 ? void 0 : request.ip), userAgent: dto.userAgent || (request === null || request === void 0 ? void 0 : request.headers['user-agent']), timestamp: new Date() }),
                        actorId: (_a = dto.actorId) === null || _a === void 0 ? void 0 : _a.toString(), // Changed from userId to actorId
                        organizationId: (_b = dto.organizationId) === null || _b === void 0 ? void 0 : _b.toString(),
                    });
                    return [2 /*return*/, this.auditLogRepository.save(auditLog)];
                });
            });
        };
        /**
         * Get audit logs for a specific entity
         */
        AuditService_1.prototype.getEntityAuditLogs = function (entityType_1, entityId_1) {
            return __awaiter(this, arguments, void 0, function (entityType, entityId, options) {
                var query;
                var _a;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_b) {
                    query = this.auditLogRepository
                        .createQueryBuilder('audit_log')
                        .where('audit_log.entityType = :entityType', { entityType: entityType })
                        .andWhere('audit_log.entityId = :entityId', { entityId: entityId.toString() });
                    if (options.startDate) {
                        query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
                    }
                    if (options.endDate) {
                        query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
                    }
                    if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
                        query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
                    }
                    query
                        .orderBy('audit_log.createdAt', 'DESC')
                        .skip(options.offset || 0)
                        .take(options.limit || 50);
                    return [2 /*return*/, query.getManyAndCount()];
                });
            });
        };
        /**
         * Get audit logs for a specific user
         */
        AuditService_1.prototype.getUserAuditLogs = function (actorId_1) {
            return __awaiter(this, arguments, void 0, function (actorId, // Changed from userId to actorId
            options) {
                var query;
                var _a, _b;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    query = this.auditLogRepository
                        .createQueryBuilder('audit_log')
                        .where('audit_log.actorId = :actorId', { actorId: actorId.toString() });
                    if (options.startDate) {
                        query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
                    }
                    if (options.endDate) {
                        query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
                    }
                    if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
                        query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
                    }
                    if ((_b = options.entityTypes) === null || _b === void 0 ? void 0 : _b.length) {
                        query.andWhere('audit_log.entityType IN (:...entityTypes)', { entityTypes: options.entityTypes });
                    }
                    query
                        .orderBy('audit_log.createdAt', 'DESC')
                        .skip(options.offset || 0)
                        .take(options.limit || 50);
                    return [2 /*return*/, query.getManyAndCount()];
                });
            });
        };
        /**
         * Get audit logs for an organization
         */
        AuditService_1.prototype.getOrganizationAuditLogs = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, options) {
                var query;
                var _a, _b, _c;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_d) {
                    query = this.auditLogRepository
                        .createQueryBuilder('audit_log')
                        .where('audit_log.organizationId = :organizationId', { organizationId: organizationId.toString() });
                    if (options.startDate) {
                        query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
                    }
                    if (options.endDate) {
                        query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
                    }
                    if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
                        query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
                    }
                    if ((_b = options.entityTypes) === null || _b === void 0 ? void 0 : _b.length) {
                        query.andWhere('audit_log.entityType IN (:...entityTypes)', { entityTypes: options.entityTypes });
                    }
                    if ((_c = options.actorIds) === null || _c === void 0 ? void 0 : _c.length) { // Changed from userIds to actorIds
                        query.andWhere('audit_log.actorId IN (:...actorIds)', {
                            actorIds: options.actorIds.map(function (id) { return id.toString(); }), // Changed from userIds to actorIds
                        });
                    }
                    query
                        .orderBy('audit_log.createdAt', 'DESC')
                        .skip(options.offset || 0)
                        .take(options.limit || 50);
                    return [2 /*return*/, query.getManyAndCount()];
                });
            });
        };
        /**
         * Clean up old audit logs
         */
        AuditService_1.prototype.cleanupOldLogs = function () {
            return __awaiter(this, arguments, void 0, function (retentionDays) {
                var cutoffDate, result;
                if (retentionDays === void 0) { retentionDays = 90; }
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
        return AuditService_1;
    }());
    __setFunctionName(_classThis, "AuditService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditService = _classThis;
}();
exports.AuditService = AuditService;
//# sourceMappingURL=audit.service.js.map