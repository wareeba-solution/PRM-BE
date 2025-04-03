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
exports.TicketEscalationService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
var ticket_status_enum_1 = require("../enums/ticket-status.enum");
var TicketEscalationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TicketEscalationService = _classThis = /** @class */ (function () {
        function TicketEscalationService_1(ticketRepository, activityRepository, notificationsService, organizationsService, configService) {
            this.ticketRepository = ticketRepository;
            this.activityRepository = activityRepository;
            this.notificationsService = notificationsService;
            this.organizationsService = organizationsService;
            this.configService = configService;
            this.logger = new common_1.Logger(TicketEscalationService.name);
            // Initialize escalation rules from config
            this.escalationRules = {
                HIGH: {
                    priority: 'HIGH',
                    responseTime: 1, // 1 hour
                    resolutionTime: 4, // 4 hours
                    escalationLevels: [
                        {
                            level: 1,
                            timeThreshold: 1,
                            notifyRoles: ['SUPERVISOR']
                        },
                        {
                            level: 2,
                            timeThreshold: 2,
                            notifyRoles: ['MANAGER']
                        },
                        {
                            level: 3,
                            timeThreshold: 4,
                            notifyRoles: ['DIRECTOR']
                        }
                    ]
                },
                MEDIUM: {
                    priority: 'MEDIUM',
                    responseTime: 4, // 4 hours
                    resolutionTime: 24, // 24 hours
                    escalationLevels: [
                        {
                            level: 1,
                            timeThreshold: 4,
                            notifyRoles: ['SUPERVISOR']
                        },
                        {
                            level: 2,
                            timeThreshold: 8,
                            notifyRoles: ['MANAGER']
                        }
                    ]
                },
                LOW: {
                    priority: 'LOW',
                    responseTime: 24, // 24 hours
                    resolutionTime: 72, // 72 hours
                    escalationLevels: [
                        {
                            level: 1,
                            timeThreshold: 24,
                            notifyRoles: ['SUPERVISOR']
                        }
                    ]
                }
            };
        }
        /**
         * Check tickets for escalation
         */
        TicketEscalationService_1.prototype.checkTicketsForEscalation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var unresolved, _i, unresolved_1, ticket, currentLevel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository.find({
                                where: {
                                    status: (0, typeorm_1.In)([ticket_status_enum_1.TicketStatus.OPEN, ticket_status_enum_1.TicketStatus.IN_PROGRESS])
                                },
                                relations: ['assignee', 'organization', 'activities']
                            })];
                        case 1:
                            unresolved = _a.sent();
                            _i = 0, unresolved_1 = unresolved;
                            _a.label = 2;
                        case 2:
                            if (!(_i < unresolved_1.length)) return [3 /*break*/, 5];
                            ticket = unresolved_1[_i];
                            currentLevel = this.getCurrentEscalationLevel(ticket);
                            if (!(currentLevel < 3)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.checkTicketEscalation(ticket)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get the current escalation level from the ticket's metadata or activities
         */
        TicketEscalationService_1.prototype.getCurrentEscalationLevel = function (ticket) {
            var _a, _b;
            // Try to find the most recent escalation activity
            var escalationActivities = ((_a = ticket.activities) === null || _a === void 0 ? void 0 : _a.filter(function (activity) { return activity.type === ticket_activity_type_enum_1.TicketActivityType.ESCALATION; })) || [];
            if (escalationActivities.length > 0) {
                // Sort by created date, descending
                var latestEscalation = escalationActivities.sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); })[0];
                // Get the escalation level from metadata
                return ((_b = latestEscalation.metadata) === null || _b === void 0 ? void 0 : _b.newLevel) || 0;
            }
            return 0; // Default to no escalation
        };
        /**
         * Check single ticket for escalation
         */
        TicketEscalationService_1.prototype.checkTicketEscalation = function (ticket) {
            return __awaiter(this, void 0, void 0, function () {
                var rule, timeElapsed, currentLevel, nextEscalation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rule = this.escalationRules[ticket.priority];
                            if (!rule)
                                return [2 /*return*/];
                            timeElapsed = this.getHoursElapsed(ticket.createdAt);
                            currentLevel = this.getCurrentEscalationLevel(ticket);
                            nextEscalation = rule.escalationLevels.find(function (level) {
                                return level.level === currentLevel + 1 && timeElapsed >= level.timeThreshold;
                            });
                            if (!nextEscalation) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.escalateTicket(ticket, nextEscalation)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Escalate a ticket to the next level
         */
        TicketEscalationService_1.prototype.escalateTicket = function (ticket, escalation) {
            return __awaiter(this, void 0, void 0, function () {
                var activityData, activity, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            activityData = {
                                ticket: ticket,
                                type: ticket_activity_type_enum_1.TicketActivityType.ESCALATION,
                                // Using metadata to store all the custom information
                                metadata: {
                                    description: "Ticket escalated to level ".concat(escalation.level),
                                    previousLevel: this.getCurrentEscalationLevel(ticket),
                                    newLevel: escalation.level,
                                    reason: 'SLA breach'
                                }
                            };
                            activity = this.activityRepository.create(activityData);
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 1:
                            _a.sent();
                            // Notify relevant staff
                            return [4 /*yield*/, this.notifyEscalation(ticket, escalation)];
                        case 2:
                            // Notify relevant staff
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to escalate ticket ".concat(ticket.id, ":"), error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Send escalation notifications
         */
        TicketEscalationService_1.prototype.notifyEscalation = function (ticket, escalation) {
            return __awaiter(this, void 0, void 0, function () {
                var staff, _i, staff_1, user, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, this.getOrganizationStaffByRoles(ticket.organizationId, escalation.notifyRoles)];
                        case 1:
                            staff = _a.sent();
                            _i = 0, staff_1 = staff;
                            _a.label = 2;
                        case 2:
                            if (!(_i < staff_1.length)) return [3 /*break*/, 5];
                            user = staff_1[_i];
                            return [4 /*yield*/, this.notificationsService.send({
                                    userId: user.id,
                                    type: 'TICKET_ESCALATION',
                                    title: "Ticket #".concat(ticket.id, " Escalated"),
                                    message: "Ticket has been escalated to level ".concat(escalation.level),
                                    data: {
                                        ticketId: ticket.id,
                                        escalationLevel: escalation.level,
                                        priority: ticket.priority
                                    }
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_2 = _a.sent();
                            this.logger.error("Failed to notify escalation for ticket ".concat(ticket.id, ":"), error_2);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get organization staff by roles (implementation depends on your OrganizationsService)
         */
        TicketEscalationService_1.prototype.getOrganizationStaffByRoles = function (organizationId, roles) {
            return __awaiter(this, void 0, void 0, function () {
                var organization, staff, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.organizationsService.findOne(organizationId)];
                        case 1:
                            organization = _a.sent();
                            if (!organization)
                                return [2 /*return*/, []];
                            staff = organization.staff || [];
                            return [2 /*return*/, staff.filter(function (member) { return roles.includes(member.role); })];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Failed to get staff for organization ".concat(organizationId, ":"), error_3);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Calculate hours elapsed since a given date
         */
        TicketEscalationService_1.prototype.getHoursElapsed = function (date) {
            var elapsed = Date.now() - date.getTime();
            return elapsed / (1000 * 60 * 60);
        };
        /**
         * Get SLA status for a ticket
         */
        TicketEscalationService_1.prototype.getTicketSlaStatus = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, rule, firstResponse, resolution;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: ticketId },
                                relations: ['activities']
                            })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new Error('Ticket not found');
                            }
                            rule = this.escalationRules[ticket.priority];
                            firstResponse = ticket.activities.find(function (a) { return a.type === ticket_activity_type_enum_1.TicketActivityType.RESPONSE; });
                            resolution = ticket.activities.find(function (a) { return a.type === ticket_activity_type_enum_1.TicketActivityType.RESOLUTION; });
                            return [2 /*return*/, {
                                    responseTime: {
                                        target: rule.responseTime,
                                        actual: firstResponse ?
                                            this.getHoursElapsed(ticket.createdAt) : null,
                                        breached: !firstResponse &&
                                            this.getHoursElapsed(ticket.createdAt) > rule.responseTime
                                    },
                                    resolutionTime: {
                                        target: rule.resolutionTime,
                                        actual: resolution ?
                                            this.getHoursElapsed(ticket.createdAt) : null,
                                        breached: !resolution &&
                                            this.getHoursElapsed(ticket.createdAt) > rule.resolutionTime
                                    }
                                }];
                    }
                });
            });
        };
        /**
         * Check if ticket needs auto-escalation due to SLA breach
         */
        TicketEscalationService_1.prototype.checkSlaBreachEscalation = function (ticketId) {
            return __awaiter(this, void 0, void 0, function () {
                var slaStatus, ticket, rule, currentLevel_1, nextLevel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getTicketSlaStatus(ticketId)];
                        case 1:
                            slaStatus = _a.sent();
                            return [4 /*yield*/, this.ticketRepository.findOne({
                                    where: { id: ticketId },
                                    relations: ['activities']
                                })];
                        case 2:
                            ticket = _a.sent();
                            if (!ticket)
                                return [2 /*return*/];
                            if (!(slaStatus.responseTime.breached || slaStatus.resolutionTime.breached)) return [3 /*break*/, 4];
                            rule = this.escalationRules[ticket.priority];
                            currentLevel_1 = this.getCurrentEscalationLevel(ticket);
                            nextLevel = rule.escalationLevels.find(function (level) {
                                return level.level === currentLevel_1 + 1;
                            });
                            if (!nextLevel) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.escalateTicket(ticket, nextLevel)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return TicketEscalationService_1;
    }());
    __setFunctionName(_classThis, "TicketEscalationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketEscalationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketEscalationService = _classThis;
}();
exports.TicketEscalationService = TicketEscalationService;
//# sourceMappingURL=ticket-escalation.service.js.map