"use strict";
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
exports.TicketAssignmentListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var typeorm_1 = require("typeorm");
var ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
var TicketAssignmentListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleTicketAssigned_decorators;
    var _handleAutoAssignment_decorators;
    var _handleAgentAvailabilityChange_decorators;
    var TicketAssignmentListener = _classThis = /** @class */ (function () {
        function TicketAssignmentListener_1(ticketRepository, activityRepository, notificationsService, usersService) {
            this.ticketRepository = (__runInitializers(this, _instanceExtraInitializers), ticketRepository);
            this.activityRepository = activityRepository;
            this.notificationsService = notificationsService;
            this.usersService = usersService;
        }
        TicketAssignmentListener_1.prototype.handleTicketAssigned = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Create activity log
                        return [4 /*yield*/, this.createAssignmentActivity(event)];
                        case 1:
                            // Create activity log
                            _a.sent();
                            // Notify relevant users
                            return [4 /*yield*/, this.sendAssignmentNotifications(event)];
                        case 2:
                            // Notify relevant users
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TicketAssignmentListener_1.prototype.createAssignmentActivity = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var activity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            activity = this.activityRepository.create({
                                ticketId: event.ticketId,
                                type: ticket_activity_type_enum_1.TicketActivityType.ASSIGNED, // Fix #1: Changed from ASSIGNMENT to ASSIGNED
                                metadata: {
                                    previousAssigneeId: event.previousAssigneeId,
                                    newAssigneeId: event.newAssigneeId,
                                    assignedById: event.assignedById
                                }
                            });
                            return [4 /*yield*/, this.activityRepository.save(activity)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TicketAssignmentListener_1.prototype.sendAssignmentNotifications = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, newAssignee, previousAssignee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: event.ticketId },
                                relations: ['organization']
                            })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket)
                                return [2 /*return*/];
                            if (!event.newAssigneeId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.usersService.findById(event.newAssigneeId)];
                        case 2:
                            newAssignee = _a.sent();
                            if (!newAssignee) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.notificationsService.send({
                                    userId: newAssignee.id,
                                    type: 'TICKET_ASSIGNED',
                                    title: "Ticket #".concat(ticket.id, " Assigned to You"),
                                    message: "You have been assigned to ticket: ".concat(ticket.title),
                                    data: {
                                        ticketId: ticket.id,
                                        organizationId: ticket.organizationId
                                    }
                                })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!event.previousAssigneeId) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.usersService.findById(event.previousAssigneeId)];
                        case 5:
                            previousAssignee = _a.sent();
                            if (!previousAssignee) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.notificationsService.send({
                                    userId: previousAssignee.id,
                                    type: 'TICKET_UNASSIGNED',
                                    title: "Ticket #".concat(ticket.id, " Reassigned"),
                                    message: "You have been unassigned from ticket: ".concat(ticket.title),
                                    data: {
                                        ticketId: ticket.id,
                                        organizationId: ticket.organizationId
                                    }
                                })];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        TicketAssignmentListener_1.prototype.handleAutoAssignment = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, availableAgent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: payload.ticketId }
                            })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket || ticket.assigneeId)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.findAvailableAgent(payload.organizationId, payload.priority)];
                        case 2:
                            availableAgent = _a.sent();
                            if (!availableAgent) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.ticketRepository.update(payload.ticketId, {
                                    assigneeId: availableAgent.id
                                })];
                        case 3:
                            _a.sent();
                            // Emit assignment event
                            return [4 /*yield*/, this.handleTicketAssigned({
                                    ticketId: payload.ticketId,
                                    newAssigneeId: availableAgent.id,
                                    assignedById: 'SYSTEM'
                                })];
                        case 4:
                            // Emit assignment event
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        TicketAssignmentListener_1.prototype.findAvailableAgent = function (organizationId, priority) {
            return __awaiter(this, void 0, void 0, function () {
                var supportAgents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findByRole('SUPPORT', organizationId)];
                        case 1:
                            supportAgents = _a.sent();
                            if (!supportAgents || supportAgents.length === 0) {
                                return [2 /*return*/, null];
                            }
                            // Simple implementation: return the first available agent
                            // In a real implementation, you'd want to consider workload, skills, etc.
                            return [2 /*return*/, supportAgents[0]];
                    }
                });
            });
        };
        TicketAssignmentListener_1.prototype.handleAgentAvailabilityChange = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var assignedTickets, _i, assignedTickets_1, ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!payload.isAvailable) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.ticketRepository.find({
                                    where: {
                                        assigneeId: payload.userId,
                                        status: (0, typeorm_1.In)(['OPEN', 'IN_PROGRESS']) // Fix #3: Using TypeORM's In operator with correct type casting
                                    }
                                })];
                        case 1:
                            assignedTickets = _a.sent();
                            _i = 0, assignedTickets_1 = assignedTickets;
                            _a.label = 2;
                        case 2:
                            if (!(_i < assignedTickets_1.length)) return [3 /*break*/, 5];
                            ticket = assignedTickets_1[_i];
                            return [4 /*yield*/, this.handleAutoAssignment({
                                    ticketId: ticket.id,
                                    organizationId: ticket.organizationId,
                                    priority: ticket.priority
                                })];
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
        return TicketAssignmentListener_1;
    }());
    __setFunctionName(_classThis, "TicketAssignmentListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleTicketAssigned_decorators = [(0, event_emitter_1.OnEvent)('ticket.assigned')];
        _handleAutoAssignment_decorators = [(0, event_emitter_1.OnEvent)('ticket.auto_assignment.needed')];
        _handleAgentAvailabilityChange_decorators = [(0, event_emitter_1.OnEvent)('user.availability.changed')];
        __esDecorate(_classThis, null, _handleTicketAssigned_decorators, { kind: "method", name: "handleTicketAssigned", static: false, private: false, access: { has: function (obj) { return "handleTicketAssigned" in obj; }, get: function (obj) { return obj.handleTicketAssigned; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAutoAssignment_decorators, { kind: "method", name: "handleAutoAssignment", static: false, private: false, access: { has: function (obj) { return "handleAutoAssignment" in obj; }, get: function (obj) { return obj.handleAutoAssignment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAgentAvailabilityChange_decorators, { kind: "method", name: "handleAgentAvailabilityChange", static: false, private: false, access: { has: function (obj) { return "handleAgentAvailabilityChange" in obj; }, get: function (obj) { return obj.handleAgentAvailabilityChange; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketAssignmentListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketAssignmentListener = _classThis;
}();
exports.TicketAssignmentListener = TicketAssignmentListener;
//# sourceMappingURL=ticket-assignment.listener.js.map