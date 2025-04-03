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
exports.TicketActivityService = void 0;
var common_1 = require("@nestjs/common");
var TicketActivityService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TicketActivityService = _classThis = /** @class */ (function () {
        function TicketActivityService_1(activityRepository, ticketRepository, userRepository, eventEmitter) {
            this.activityRepository = activityRepository;
            this.ticketRepository = ticketRepository;
            this.userRepository = userRepository;
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(TicketActivityService.name);
        }
        TicketActivityService_1.prototype.recordActivity = function (arg0) {
            throw new Error('Method not implemented.');
        };
        TicketActivityService_1.prototype.logActivity = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, activity, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.ticketRepository.findOne({
                                    where: { id: options.ticketId }
                                })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new Error("Ticket ".concat(options.ticketId, " not found"));
                            }
                            activity = this.activityRepository.create({
                                ticketId: options.ticketId,
                                performedById: options.performedById,
                                type: options.type,
                                data: this.sanitizeActivityData(options.data || {}),
                                metadata: options.metadata || {},
                                timestamp: new Date()
                            });
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 2:
                            _a.sent();
                            // Emit activity event
                            this.eventEmitter.emit('ticket.activity.created', {
                                activity: activity,
                                ticket: ticket
                            });
                            return [2 /*return*/, activity];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Error logging ticket activity:', error_1);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.getTicketActivities = function (ticketId_1) {
            return __awaiter(this, arguments, void 0, function (ticketId, options) {
                var queryBuilder, _a, activities, total, error_2;
                var _b;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            queryBuilder = this.activityRepository
                                .createQueryBuilder('activity')
                                .where('activity.ticketId = :ticketId', { ticketId: ticketId });
                            // Apply filters
                            if ((_b = options.types) === null || _b === void 0 ? void 0 : _b.length) {
                                queryBuilder.andWhere('activity.type IN (:...types)', { types: options.types });
                            }
                            if (options.startDate) {
                                queryBuilder.andWhere('activity.timestamp >= :startDate', { startDate: options.startDate });
                            }
                            if (options.endDate) {
                                queryBuilder.andWhere('activity.timestamp <= :endDate', { endDate: options.endDate });
                            }
                            // Add relations
                            queryBuilder
                                .leftJoinAndSelect('activity.performedBy', 'user')
                                .orderBy('activity.timestamp', 'DESC');
                            // Apply pagination
                            if (options.limit) {
                                queryBuilder.take(options.limit);
                            }
                            if (options.offset) {
                                queryBuilder.skip(options.offset);
                            }
                            return [4 /*yield*/, queryBuilder.getManyAndCount()];
                        case 1:
                            _a = _c.sent(), activities = _a[0], total = _a[1];
                            return [2 /*return*/, { activities: activities, total: total }];
                        case 2:
                            error_2 = _c.sent();
                            this.logger.error("Error fetching activities for ticket ".concat(ticketId, ":"), error_2);
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.getUserActivities = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var queryBuilder, _a, activities, total, error_3;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            queryBuilder = this.activityRepository
                                .createQueryBuilder('activity')
                                .where('activity.performedById = :userId', { userId: userId });
                            if (options.startDate) {
                                queryBuilder.andWhere('activity.timestamp >= :startDate', { startDate: options.startDate });
                            }
                            if (options.endDate) {
                                queryBuilder.andWhere('activity.timestamp <= :endDate', { endDate: options.endDate });
                            }
                            // Add relations
                            queryBuilder
                                .leftJoinAndSelect('activity.ticket', 'ticket')
                                .orderBy('activity.timestamp', 'DESC');
                            // Apply pagination
                            if (options.limit) {
                                queryBuilder.take(options.limit);
                            }
                            if (options.offset) {
                                queryBuilder.skip(options.offset);
                            }
                            return [4 /*yield*/, queryBuilder.getManyAndCount()];
                        case 1:
                            _a = _b.sent(), activities = _a[0], total = _a[1];
                            return [2 /*return*/, { activities: activities, total: total }];
                        case 2:
                            error_3 = _b.sent();
                            this.logger.error("Error fetching activities for user ".concat(userId, ":"), error_3);
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.getActivityDetails = function (activityId) {
            return __awaiter(this, void 0, void 0, function () {
                var activity, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.activityRepository.findOne({
                                    where: { id: activityId },
                                    relations: ['performedBy', 'ticket']
                                })];
                        case 1:
                            activity = _a.sent();
                            if (!activity) {
                                throw new Error("Activity ".concat(activityId, " not found"));
                            }
                            return [2 /*return*/, activity];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("Error fetching activity details for ".concat(activityId, ":"), error_4);
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.getActivitySummary = function (ticketId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var activities, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.activityRepository
                                    .createQueryBuilder('activity')
                                    .select('activity.type', 'type')
                                    .addSelect('COUNT(*)', 'count')
                                    .where('activity.ticketId = :ticketId', { ticketId: ticketId })
                                    .andWhere('activity.timestamp BETWEEN :startDate AND :endDate', { startDate: startDate, endDate: endDate })
                                    .groupBy('activity.type')
                                    .getRawMany()];
                        case 1:
                            activities = _a.sent();
                            // Convert to record
                            return [2 /*return*/, activities.reduce(function (acc, curr) {
                                    acc[curr.type] = parseInt(curr.count, 10);
                                    return acc;
                                }, {})];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error("Error generating activity summary for ticket ".concat(ticketId, ":"), error_5);
                            throw error_5;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.sanitizeActivityData = function (data) {
            var sensitiveFields = ['password', 'token', 'secret', 'key'];
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
        TicketActivityService_1.prototype.generateActivityReport = function (ticketId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var activities, groupedActivities, statistics, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.activityRepository.find({
                                    where: {
                                        ticketId: ticketId,
                                        timestamp: Between(startDate, endDate)
                                    },
                                    relations: ['performedBy'],
                                    order: { timestamp: 'ASC' }
                                })];
                        case 1:
                            activities = _a.sent();
                            groupedActivities = activities.reduce(function (acc, activity) {
                                var date = activity.timestamp.toISOString().split('T')[0];
                                if (!acc[date]) {
                                    acc[date] = [];
                                }
                                acc[date].push(activity);
                                return acc;
                            }, {});
                            statistics = {
                                totalActivities: activities.length,
                                byType: this.calculateActivityTypeStats(activities),
                                byUser: this.calculateUserActivityStats(activities),
                                averageActivitiesPerDay: activities.length / ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
                            };
                            return [2 /*return*/, {
                                    ticketId: ticketId,
                                    period: { startDate: startDate, endDate: endDate },
                                    statistics: statistics,
                                    activities: groupedActivities,
                                }];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error("Error generating activity report for ticket ".concat(ticketId, ":"), error_6);
                            throw error_6;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        TicketActivityService_1.prototype.calculateActivityTypeStats = function (activities) {
            return activities.reduce(function (acc, activity) {
                acc[activity.type] = (acc[activity.type] || 0) + 1;
                return acc;
            }, {});
        };
        TicketActivityService_1.prototype.calculateUserActivityStats = function (activities) {
            return activities.reduce(function (acc, activity) {
                var userId = activity.performedById;
                acc[userId] = (acc[userId] || 0) + 1;
                return acc;
            }, {});
        };
        return TicketActivityService_1;
    }());
    __setFunctionName(_classThis, "TicketActivityService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketActivityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketActivityService = _classThis;
}();
exports.TicketActivityService = TicketActivityService;
function Between(startDate, endDate) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=ticket-activity.service.js.map