"use strict";
// src/modules/tickets/tickets.module.ts
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var tickets_controller_1 = require("./controllers/tickets.controller");
var tickets_service_1 = require("./services/tickets.service");
var ticket_activity_service_1 = require("./services/ticket-activity.service");
var ticket_escalation_service_1 = require("./services/ticket-escalation.service");
var ticket_entity_1 = require("./entities/ticket.entity");
var ticket_comment_entity_1 = require("./entities/ticket-comment.entity");
var ticket_attachment_entity_1 = require("./entities/ticket-attachment.entity");
var ticket_activity_entity_1 = require("./entities/ticket-activity.entity");
var user_entity_1 = require("../users/entities/user.entity");
var ticket_listener_1 = require("./listeners/ticket.listener");
var ticket_assignment_listener_1 = require("./listeners/ticket-assignment.listener");
var ticket_escalation_listener_1 = require("./listeners/ticket-escalation.listener");
var users_module_1 = require("../users/users.module");
var notifications_module_1 = require("../notifications/notifications.module");
var organizations_module_1 = require("../organizations/organizations.module");
var auth_module_1 = require("../auth/auth.module");
var departments_module_1 = require("../departments/departments.module"); // Add this import
var TicketsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    ticket_entity_1.Ticket,
                    ticket_comment_entity_1.TicketComment,
                    ticket_attachment_entity_1.TicketAttachment,
                    ticket_activity_entity_1.TicketActivity,
                    user_entity_1.User
                ]),
                event_emitter_1.EventEmitterModule.forRoot({
                    wildcard: true,
                    maxListeners: 20,
                    verboseMemoryLeak: true,
                }),
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return notifications_module_1.NotificationsModule; }),
                (0, common_1.forwardRef)(function () { return organizations_module_1.OrganizationsModule; }),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }),
                departments_module_1.DepartmentsModule // Add this line
            ],
            controllers: [
                tickets_controller_1.TicketsController
            ],
            providers: [
                tickets_service_1.TicketsService,
                ticket_activity_service_1.TicketActivityService,
                ticket_escalation_service_1.TicketEscalationService,
                ticket_listener_1.TicketListener,
                ticket_assignment_listener_1.TicketAssignmentListener,
                ticket_escalation_listener_1.TicketEscalationListener
            ],
            exports: [
                tickets_service_1.TicketsService,
                ticket_activity_service_1.TicketActivityService
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TicketsModule = _classThis = /** @class */ (function () {
        function TicketsModule_1() {
        }
        return TicketsModule_1;
    }());
    __setFunctionName(_classThis, "TicketsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TicketsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TicketsModule = _classThis;
}();
exports.TicketsModule = TicketsModule;
//# sourceMappingURL=tickets.module.js.map