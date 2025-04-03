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
exports.UserActivityService = exports.ActivityType = void 0;
var common_1 = require("@nestjs/common");
var ActivityType;
(function (ActivityType) {
    ActivityType["LOGIN"] = "LOGIN";
    ActivityType["LOGOUT"] = "LOGOUT";
    ActivityType["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    ActivityType["PROFILE_UPDATE"] = "PROFILE_UPDATE";
    ActivityType["MFA_ENABLED"] = "MFA_ENABLED";
    ActivityType["MFA_DISABLED"] = "MFA_DISABLED";
    ActivityType["API_ACCESS"] = "API_ACCESS";
    ActivityType["SETTINGS_CHANGE"] = "SETTINGS_CHANGE";
    ActivityType["ROLE_CHANGE"] = "ROLE_CHANGE";
    ActivityType["DEPARTMENT_ASSIGNMENT"] = "DEPARTMENT_ASSIGNMENT";
    ActivityType["PERMISSION_CHANGE"] = "PERMISSION_CHANGE";
    ActivityType["EXPORT_DATA"] = "EXPORT_DATA";
    ActivityType["BULK_ACTION"] = "BULK_ACTION";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
var UserActivityService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserActivityService = _classThis = /** @class */ (function () {
        function UserActivityService_1(activityRepository, userRepository) {
            this.activityRepository = activityRepository;
            this.userRepository = userRepository;
            this.logger = new common_1.Logger(UserActivityService.name);
        }
        /**
         * Log user activity
         */
        UserActivityService_1.prototype.logActivity = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var activity, savedActivity, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            activity = this.activityRepository.create({
                                userId: options.userId,
                                organizationId: options.organizationId,
                                type: options.type,
                                description: options.description,
                                metadata: options.metadata,
                                ipAddress: options.ip,
                                userAgent: options.userAgent,
                                referrer: options.referrer,
                                status: options.status || 'SUCCESS',
                                failureReason: options.failureReason
                            });
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 1:
                            savedActivity = _a.sent();
                            return [2 /*return*/, Array.isArray(savedActivity) ? savedActivity[0] : savedActivity];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error("Failed to log activity for user ".concat(options.userId, ":"), error_1);
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get user activity history
         */
        UserActivityService_1.prototype.getUserActivity = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var queryBuilder;
                var _a;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_b) {
                    queryBuilder = this.activityRepository
                        .createQueryBuilder('activity')
                        .where('activity.userId = :userId', { userId: userId })
                        .orderBy('activity.createdAt', 'DESC');
                    if (options.startDate) {
                        queryBuilder.andWhere('activity.createdAt >= :startDate', {
                            startDate: options.startDate
                        });
                    }
                    if (options.endDate) {
                        queryBuilder.andWhere('activity.createdAt <= :endDate', {
                            endDate: options.endDate
                        });
                    }
                    if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
                        queryBuilder.andWhere('activity.type IN (:...types)', {
                            types: options.types
                        });
                    }
                    if (options.status) {
                        queryBuilder.andWhere('activity.status = :status', {
                            status: options.status
                        });
                    }
                    return [2 /*return*/, queryBuilder
                            .take(options.limit || 50)
                            .skip(options.offset || 0)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Get organization user activity
         */
        UserActivityService_1.prototype.getOrganizationActivity = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, options) {
                var queryBuilder;
                var _a, _b;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    queryBuilder = this.activityRepository
                        .createQueryBuilder('activity')
                        .where('activity.organizationId = :organizationId', { organizationId: organizationId })
                        .orderBy('activity.createdAt', 'DESC');
                    if (options.startDate) {
                        queryBuilder.andWhere('activity.createdAt >= :startDate', {
                            startDate: options.startDate
                        });
                    }
                    if (options.endDate) {
                        queryBuilder.andWhere('activity.createdAt <= :endDate', {
                            endDate: options.endDate
                        });
                    }
                    if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
                        queryBuilder.andWhere('activity.type IN (:...types)', {
                            types: options.types
                        });
                    }
                    if ((_b = options.userIds) === null || _b === void 0 ? void 0 : _b.length) {
                        queryBuilder.andWhere('activity.userId IN (:...userIds)', {
                            userIds: options.userIds
                        });
                    }
                    if (options.status) {
                        queryBuilder.andWhere('activity.status = :status', {
                            status: options.status
                        });
                    }
                    return [2 /*return*/, queryBuilder
                            .take(options.limit || 50)
                            .skip(options.offset || 0)
                            .getManyAndCount()];
                });
            });
        };
        /**
         * Get activity summary for a user
         */
        UserActivityService_1.prototype.getUserActivitySummary = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, days) {
                var startDate, activities;
                if (days === void 0) { days = 30; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date();
                            startDate.setDate(startDate.getDate() - days);
                            return [4 /*yield*/, this.activityRepository
                                    .createQueryBuilder('activity')
                                    .select('activity.type')
                                    .addSelect('COUNT(*)', 'count')
                                    .where('activity.userId = :userId', { userId: userId })
                                    .andWhere('activity.createdAt >= :startDate', { startDate: startDate })
                                    .groupBy('activity.type')
                                    .getRawMany()];
                        case 1:
                            activities = _a.sent();
                            return [2 /*return*/, activities.reduce(function (acc, curr) {
                                    acc[curr.activity_type] = parseInt(curr.count);
                                    return acc;
                                }, {})];
                    }
                });
            });
        };
        /**
         * Get most active users in organization
         */
        UserActivityService_1.prototype.getMostActiveUsers = function (organizationId_1) {
            return __awaiter(this, arguments, void 0, function (organizationId, options) {
                var queryBuilder, results;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryBuilder = this.activityRepository
                                .createQueryBuilder('activity')
                                .select('activity.userId')
                                .addSelect('COUNT(*)', 'count')
                                .where('activity.organizationId = :organizationId', { organizationId: organizationId });
                            if (options.startDate) {
                                queryBuilder.andWhere('activity.createdAt >= :startDate', {
                                    startDate: options.startDate
                                });
                            }
                            if (options.endDate) {
                                queryBuilder.andWhere('activity.createdAt <= :endDate', {
                                    endDate: options.endDate
                                });
                            }
                            return [4 /*yield*/, queryBuilder
                                    .groupBy('activity.userId')
                                    .orderBy('count', 'DESC')
                                    .limit(options.limit || 10)
                                    .getRawMany()];
                        case 1:
                            results = _a.sent();
                            return [2 /*return*/, results.map(function (result) { return ({
                                    userId: result.activity_userId,
                                    count: parseInt(result.count)
                                }); })];
                    }
                });
            });
        };
        /**
         * Clean up old activity logs
         */
        UserActivityService_1.prototype.cleanupOldLogs = function () {
            return __awaiter(this, arguments, void 0, function (retentionDays) {
                var cutoffDate, result;
                if (retentionDays === void 0) { retentionDays = 90; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cutoffDate = new Date();
                            cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
                            return [4 /*yield*/, this.activityRepository
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
        return UserActivityService_1;
    }());
    __setFunctionName(_classThis, "UserActivityService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserActivityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserActivityService = _classThis;
}();
exports.UserActivityService = UserActivityService;
//# sourceMappingURL=user-activity.service.js.map