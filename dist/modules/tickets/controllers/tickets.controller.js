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
exports.TicketsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../../auth/guards/roles.guard");
var organization_guard_1 = require("../../../common/guards/organization.guard"); // Adjusted path
var roles_decorator_1 = require("../../../common/decorators/roles.decorator"); // Adjusted path
var role_enum_1 = require("../../users/enums/role.enum");
var TicketsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Tickets'), (0, common_1.Controller)('tickets'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, organization_guard_1.OrganizationGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getDashboard_decorators;
    var _getAssignedTickets_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _addComment_decorators;
    var _assignTicket_decorators;
    var _escalateTicket_decorators;
    var _resolveTicket_decorators;
    var _reopenTicket_decorators;
    var _getTimeline_decorators;
    var _getRelatedTickets_decorators;
    var TicketsController = _classThis = /** @class */ (function () {
        function TicketsController_1(ticketsService) {
            this.ticketsService = (__runInitializers(this, _instanceExtraInitializers), ticketsService);
        }
        TicketsController_1.prototype.create = function (createTicketDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.create(__assign(__assign({}, createTicketDto), { organizationId: req.organization.id, createdBy: req.user.id }))];
                });
            });
        };
        TicketsController_1.prototype.findAll = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.findAll(__assign(__assign({}, query), { organizationId: req.organization.id }))];
                });
            });
        };
        TicketsController_1.prototype.getDashboard = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.getDashboard(req.organization.id)];
                });
            });
        };
        TicketsController_1.prototype.getAssignedTickets = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.getAssignedTickets(__assign(__assign({}, query), { organizationId: req.organization.id, userId: req.user.id }))];
                });
            });
        };
        TicketsController_1.prototype.findOne = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketsService.findOne(id, req.organization.id)];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new common_1.NotFoundException('Ticket not found');
                            }
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        TicketsController_1.prototype.update = function (id, updateTicketDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.update(id, __assign(__assign({}, updateTicketDto), { organizationId: req.organization.id, updatedBy: req.user.id }))];
                });
            });
        };
        TicketsController_1.prototype.remove = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ticketsService.remove(id, req.organization.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TicketsController_1.prototype.addComment = function (id, commentDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.addComment(id, __assign(__assign({}, commentDto), { organizationId: req.organization.id, userId: req.user.id }))];
                });
            });
        };
        TicketsController_1.prototype.assignTicket = function (id, assignmentDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.assignTicket(id, __assign(__assign({}, assignmentDto), { organizationId: req.organization.id, assignedBy: req.user.id, ticketIds: [id] }))];
                });
            });
        };
        TicketsController_1.prototype.escalateTicket = function (id, reason, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.escalateTicket(id, {
                            reason: reason,
                            organizationId: req.organization.id,
                            escalatedBy: req.user.id,
                        })];
                });
            });
        };
        TicketsController_1.prototype.resolveTicket = function (id, resolution, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.resolveTicket(id, {
                            resolution: resolution,
                            organizationId: req.organization.id,
                            resolvedBy: req.user.id,
                        })];
                });
            });
        };
        TicketsController_1.prototype.reopenTicket = function (id, reason, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.reopenTicket(id, {
                            reason: reason,
                            organizationId: req.organization.id,
                            reopenedBy: req.user.id,
                        })];
                });
            });
        };
        TicketsController_1.prototype.getTimeline = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.getTimeline(id, req.organization.id)];
                });
            });
        };
        TicketsController_1.prototype.getRelatedTickets = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.ticketsService.getRelatedTickets(id, req.organization.id)];
                });
            });
        };
        return TicketsController_1;
    }());
    __setFunctionName(_classThis, "TicketsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create new ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Ticket created successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all tickets' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all tickets' }), openapi.ApiResponse({ status: 200 })];
        _getDashboard_decorators = [(0, common_1.Get)('dashboard'), (0, swagger_1.ApiOperation)({ summary: 'Get tickets dashboard data' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return tickets dashboard data' }), openapi.ApiResponse({ status: 200, type: Object })];
        _getAssignedTickets_decorators = [(0, common_1.Get)('assigned'), (0, swagger_1.ApiOperation)({ summary: 'Get tickets assigned to current user' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return assigned tickets' }), openapi.ApiResponse({ status: 200 })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get ticket by id' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return ticket details' }), openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket })];
        _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket updated successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Ticket deleted successfully' }), openapi.ApiResponse({ status: 200 })];
        _addComment_decorators = [(0, common_1.Post)(':id/comments'), (0, swagger_1.ApiOperation)({ summary: 'Add comment to ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Comment added successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/ticket-comment.entity").TicketComment })];
        _assignTicket_decorators = [(0, common_1.Put)(':id/assign'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Assign ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket assigned successfully' }), openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket })];
        _escalateTicket_decorators = [(0, common_1.Post)(':id/escalate'), (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF), (0, swagger_1.ApiOperation)({ summary: 'Escalate ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket escalated successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket })];
        _resolveTicket_decorators = [(0, common_1.Post)(':id/resolve'), (0, swagger_1.ApiOperation)({ summary: 'Resolve ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket resolved successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket })];
        _reopenTicket_decorators = [(0, common_1.Post)(':id/reopen'), (0, swagger_1.ApiOperation)({ summary: 'Reopen ticket' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket reopened successfully' }), openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket })];
        _getTimeline_decorators = [(0, common_1.Get)(':id/timeline'), (0, swagger_1.ApiOperation)({ summary: 'Get ticket timeline' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return ticket timeline' }), openapi.ApiResponse({ status: 200, type: [require("../entities/ticket-activity.entity").TicketActivity] })];
        _getRelatedTickets_decorators = [(0, common_1.Get)(':id/related'), (0, swagger_1.ApiOperation)({ summary: 'Get related tickets' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return related tickets' }), openapi.ApiResponse({ status: 200, type: Object })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: function (obj) { return "getDashboard" in obj; }, get: function (obj) { return obj.getDashboard; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAssignedTickets_decorators, { kind: "method", name: "getAssignedTickets", static: false, private: false, access: { has: function (obj) { return "getAssignedTickets" in obj; }, get: function (obj) { return obj.getAssignedTickets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addComment_decorators, { kind: "method", name: "addComment", static: false, private: false, access: { has: function (obj) { return "addComment" in obj; }, get: function (obj) { return obj.addComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignTicket_decorators, { kind: "method", name: "assignTicket", static: false, private: false, access: { has: function (obj) { return "assignTicket" in obj; }, get: function (obj) { return obj.assignTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _escalateTicket_decorators, { kind: "method", name: "escalateTicket", static: false, private: false, access: { has: function (obj) { return "escalateTicket" in obj; }, get: function (obj) { return obj.escalateTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resolveTicket_decorators, { kind: "method", name: "resolveTicket", static: false, private: false, access: { has: function (obj) { return "resolveTicket" in obj; }, get: function (obj) { return obj.resolveTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reopenTicket_decorators, { kind: "method", name: "reopenTicket", static: false, private: false, access: { has: function (obj) { return "reopenTicket" in obj; }, get: function (obj) { return obj.reopenTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTimeline_decorators, { kind: "method", name: "getTimeline", static: false, private: false, access: { has: function (obj) { return "getTimeline" in obj; }, get: function (obj) { return obj.getTimeline; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRelatedTickets_decorators, { kind: "method", name: "getRelatedTickets", static: false, private: false, access: { has: function (obj) { return "getRelatedTickets" in obj; }, get: function (obj) { return obj.getRelatedTickets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketsController = _classThis;
}();
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map