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
exports.OrganizationAuditService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var OrganizationAuditService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrganizationAuditService = _classThis = /** @class */ (function () {
        function OrganizationAuditService_1(auditLogRepository) {
            this.auditLogRepository = auditLogRepository;
            this.logger = new common_1.Logger(OrganizationAuditService.name);
        }
        OrganizationAuditService_1.prototype.logEvent = function (eventData) {
            return __awaiter(this, void 0, void 0, function () {
                var auditLog, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            auditLog = this.auditLogRepository.create({
                                organizationId: eventData.organizationId,
                                eventType: eventData.eventType,
                                data: this.sanitizeData(eventData.data),
                                performedBy: eventData.performedBy,
                                timestamp: eventData.timestamp || new Date(),
                                metadata: eventData.metadata || {},
                            });
                            return [4 /*yield*/, this.auditLogRepository.save(auditLog)];
                        case 1:
                            _a.sent();
                            this.logger.debug("Audit log created for ".concat(eventData.eventType, " in organization ").concat(eventData.organizationId));
                            return [2 /*return*/, auditLog];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Error creating audit log:', error_1);
                            throw new Error("Failed to create audit log: ".concat(error_1.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.getAuditLogs = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, options) {
                var where, _a, logs, total, error_2;
                var _b;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            where = {
                                organizationId: organizationId,
                            };
                            // Add date range filters if provided
                            if (options.startDate || options.endDate) {
                                where.timestamp = (0, typeorm_1.Between)(options.startDate || new Date(0), options.endDate || new Date());
                            }
                            // Add event type filter if provided
                            if ((_b = options.eventTypes) === null || _b === void 0 ? void 0 : _b.length) {
                                where.eventType = (0, typeorm_1.In)(options.eventTypes);
                            }
                            // Add performer filter if provided
                            if (options.performedBy) {
                                where.performedBy = options.performedBy;
                            }
                            return [4 /*yield*/, this.auditLogRepository.findAndCount({
                                    where: where,
                                    order: { timestamp: 'DESC' },
                                    take: options.limit || 50,
                                    skip: options.offset || 0,
                                })];
                        case 1:
                            _a = _c.sent(), logs = _a[0], total = _a[1];
                            return [2 /*return*/, { logs: logs, total: total }];
                        case 2:
                            error_2 = _c.sent();
                            this.logger.error('Error retrieving audit logs:', error_2);
                            throw new Error("Failed to retrieve audit logs: ".concat(error_2.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.getEventDetails = function (eventId) {
            return __awaiter(this, void 0, void 0, function () {
                var auditLog, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.auditLogRepository.findOne({
                                    where: { id: eventId }
                                })];
                        case 1:
                            auditLog = _a.sent();
                            if (!auditLog) {
                                throw new Error("Audit log with ID ".concat(eventId, " not found"));
                            }
                            return [2 /*return*/, auditLog];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Error retrieving audit log details for ID ".concat(eventId, ":"), error_3);
                            throw new Error("Failed to retrieve audit log details: ".concat(error_3.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.getActivitySummary = function (organizationId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var logs, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.auditLogRepository.find({
                                    where: {
                                        organizationId: organizationId,
                                        timestamp: (0, typeorm_1.Between)(startDate, endDate)
                                    }
                                })];
                        case 1:
                            logs = _a.sent();
                            // Group events by type and count occurrences
                            return [2 /*return*/, logs.reduce(function (summary, log) {
                                    summary[log.eventType] = (summary[log.eventType] || 0) + 1;
                                    return summary;
                                }, {})];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error('Error generating activity summary:', error_4);
                            throw new Error("Failed to generate activity summary: ".concat(error_4.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.getUserActivity = function (organizationId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, userId, options) {
                var where, error_5;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            where = {
                                organizationId: organizationId,
                                performedBy: userId,
                            };
                            if (options.startDate || options.endDate) {
                                where.timestamp = (0, typeorm_1.Between)(options.startDate || new Date(0), options.endDate || new Date());
                            }
                            return [4 /*yield*/, this.auditLogRepository.find({
                                    where: where,
                                    order: { timestamp: 'DESC' },
                                    take: options.limit || 50,
                                    skip: options.offset || 0,
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error("Error retrieving user activity for user ".concat(userId, ":"), error_5);
                            throw new Error("Failed to retrieve user activity: ".concat(error_5.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.getRecentChanges = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, limit) {
                var error_6;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.auditLogRepository.find({
                                    where: {
                                        organizationId: organizationId,
                                        eventType: (0, typeorm_1.Like)('%updated%')
                                    },
                                    order: { timestamp: 'DESC' },
                                    take: limit,
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error('Error retrieving recent changes:', error_6);
                            throw new Error("Failed to retrieve recent changes: ".concat(error_6.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.sanitizeData = function (data) {
            var sensitiveFields = ['password', 'token', 'secret', 'key', 'credential'];
            var sanitized = __assign({}, data);
            // Recursively sanitize sensitive data
            var sanitizeObject = function (obj) {
                var _loop_1 = function (key, value) {
                    if (sensitiveFields.some(function (field) { return key.toLowerCase().includes(field); })) {
                        obj[key] = '[REDACTED]';
                    }
                    else if (typeof value === 'object' && value !== null) {
                        sanitizeObject(value);
                    }
                };
                for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    _loop_1(key, value);
                }
            };
            sanitizeObject(sanitized);
            return sanitized;
        };
        OrganizationAuditService_1.prototype.cleanupOldLogs = function (retentionDays) {
            return __awaiter(this, void 0, void 0, function () {
                var cutoffDate, result, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            cutoffDate = new Date();
                            cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
                            return [4 /*yield*/, this.auditLogRepository.delete({
                                    timestamp: (0, typeorm_1.LessThan)(cutoffDate)
                                })];
                        case 1:
                            result = _a.sent();
                            this.logger.debug("Cleaned up ".concat(result.affected, " old audit logs"));
                            return [2 /*return*/, result.affected || 0];
                        case 2:
                            error_7 = _a.sent();
                            this.logger.error('Error cleaning up old audit logs:', error_7);
                            throw new Error("Failed to clean up old audit logs: ".concat(error_7.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrganizationAuditService_1.prototype.exportAuditLogs = function (organizationId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var logs, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.auditLogRepository.find({
                                    where: {
                                        organizationId: organizationId,
                                        timestamp: (0, typeorm_1.Between)(startDate, endDate)
                                    },
                                    order: { timestamp: 'ASC' }
                                })];
                        case 1:
                            logs = _a.sent();
                            // Format logs for export
                            return [2 /*return*/, logs.map(function (log) { return ({
                                    eventId: log.id,
                                    timestamp: log.timestamp.toISOString(),
                                    eventType: log.eventType,
                                    performedBy: log.performedBy,
                                    details: log.data,
                                    metadata: log.metadata
                                }); })];
                        case 2:
                            error_8 = _a.sent();
                            this.logger.error('Error exporting audit logs:', error_8);
                            throw new Error("Failed to export audit logs: ".concat(error_8.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return OrganizationAuditService_1;
    }());
    __setFunctionName(_classThis, "OrganizationAuditService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationAuditService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationAuditService = _classThis;
}();
exports.OrganizationAuditService = OrganizationAuditService;
//# sourceMappingURL=organization-audit.service.js.map