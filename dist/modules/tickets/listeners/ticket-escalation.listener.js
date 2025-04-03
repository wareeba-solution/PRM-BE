"use strict";
// src/modules/tickets/listeners/ticket-escalation.listener.ts
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
exports.TicketEscalationListener = void 0;
var common_1 = require("@nestjs/common");
var event_emitter_1 = require("@nestjs/event-emitter");
var role_enum_1 = require("../../users/enums/role.enum");
var TicketEscalationListener = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleSlaBreachEvent_decorators;
    var _handleEscalationLevelChanged_decorators;
    var TicketEscalationListener = _classThis = /** @class */ (function () {
        function TicketEscalationListener_1(ticketsService, notificationsService, usersService) {
            this.ticketsService = (__runInitializers(this, _instanceExtraInitializers), ticketsService);
            this.notificationsService = notificationsService;
            this.usersService = usersService;
        }
        TicketEscalationListener_1.prototype.handleSlaBreachEvent = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var ticketId, organizationId, slaType, elapsedTime, ticket, admins, typeMessage, formattedTime, _i, admins_1, admin;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ticketId = payload.ticketId, organizationId = payload.organizationId, slaType = payload.slaType, elapsedTime = payload.elapsedTime;
                            return [4 /*yield*/, this.ticketsService.findOne(ticketId, organizationId)];
                        case 1:
                            ticket = _a.sent();
                            return [4 /*yield*/, this.findAdmins(organizationId)];
                        case 2:
                            admins = _a.sent();
                            if (admins.length === 0) {
                                console.warn('No admins to notify for SLA breach');
                                return [2 /*return*/];
                            }
                            typeMessage = slaType === 'response'
                                ? 'Response time SLA breached'
                                : 'Resolution time SLA breached';
                            formattedTime = this.formatElapsedTime(elapsedTime);
                            _i = 0, admins_1 = admins;
                            _a.label = 3;
                        case 3:
                            if (!(_i < admins_1.length)) return [3 /*break*/, 6];
                            admin = admins_1[_i];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'SLA_BREACH',
                                    title: "".concat(typeMessage, " for Ticket #").concat(ticket.referenceNumber),
                                    content: "".concat(typeMessage, " (").concat(formattedTime, ") for Ticket #").concat(ticket.referenceNumber),
                                    priority: 'HIGH',
                                    recipients: [{ userId: admin.id }],
                                    organizationId: organizationId,
                                    senderId: 'system'
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        TicketEscalationListener_1.prototype.handleEscalationLevelChanged = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var ticketId, organizationId, previousLevel, newLevel, ticket, admins, _i, admins_2, admin;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ticketId = payload.ticketId, organizationId = payload.organizationId, previousLevel = payload.previousLevel, newLevel = payload.newLevel;
                            return [4 /*yield*/, this.ticketsService.findOne(ticketId, organizationId)];
                        case 1:
                            ticket = _a.sent();
                            return [4 /*yield*/, this.findAdmins(organizationId)];
                        case 2:
                            admins = _a.sent();
                            if (admins.length === 0) {
                                console.warn('No admins to notify for escalation level change');
                                return [2 /*return*/];
                            }
                            _i = 0, admins_2 = admins;
                            _a.label = 3;
                        case 3:
                            if (!(_i < admins_2.length)) return [3 /*break*/, 6];
                            admin = admins_2[_i];
                            return [4 /*yield*/, this.notificationsService.create({
                                    type: 'ESCALATION_LEVEL_CHANGED',
                                    title: "Ticket #".concat(ticket.referenceNumber, " Escalation Level Changed"),
                                    content: "Ticket #".concat(ticket.referenceNumber, " escalation level changed from ").concat(previousLevel, " to ").concat(newLevel),
                                    priority: 'MEDIUM',
                                    recipients: [{ userId: admin.id }],
                                    organizationId: organizationId,
                                    senderId: 'system'
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        // Helper method to find admins in the organization
        TicketEscalationListener_1.prototype.findAdmins = function (organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.usersService.findAll({
                                    organizationId: organizationId,
                                    role: role_enum_1.Role.ADMIN,
                                    isActive: true,
                                    page: 1,
                                    limit: 50
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.items];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error finding admin users:', error_1);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // Helper method to format elapsed time
        TicketEscalationListener_1.prototype.formatElapsedTime = function (milliseconds) {
            var seconds = Math.floor(milliseconds / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            if (hours > 0) {
                return "".concat(hours, "h ").concat(minutes % 60, "m");
            }
            else if (minutes > 0) {
                return "".concat(minutes, "m ").concat(seconds % 60, "s");
            }
            else {
                return "".concat(seconds, "s");
            }
        };
        return TicketEscalationListener_1;
    }());
    __setFunctionName(_classThis, "TicketEscalationListener");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleSlaBreachEvent_decorators = [(0, event_emitter_1.OnEvent)('ticket.sla.breach')];
        _handleEscalationLevelChanged_decorators = [(0, event_emitter_1.OnEvent)('ticket.escalation.levelchanged')];
        __esDecorate(_classThis, null, _handleSlaBreachEvent_decorators, { kind: "method", name: "handleSlaBreachEvent", static: false, private: false, access: { has: function (obj) { return "handleSlaBreachEvent" in obj; }, get: function (obj) { return obj.handleSlaBreachEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleEscalationLevelChanged_decorators, { kind: "method", name: "handleEscalationLevelChanged", static: false, private: false, access: { has: function (obj) { return "handleEscalationLevelChanged" in obj; }, get: function (obj) { return obj.handleEscalationLevelChanged; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketEscalationListener = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketEscalationListener = _classThis;
}();
exports.TicketEscalationListener = TicketEscalationListener;
//# sourceMappingURL=ticket-escalation.listener.js.map