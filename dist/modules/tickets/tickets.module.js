"use strict";
// src/modules/tickets/tickets.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const tickets_controller_1 = require("./controllers/tickets.controller");
const tickets_service_1 = require("./services/tickets.service");
const ticket_activity_service_1 = require("./services/ticket-activity.service");
const ticket_escalation_service_1 = require("./services/ticket-escalation.service");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_comment_entity_1 = require("./entities/ticket-comment.entity");
const ticket_attachment_entity_1 = require("./entities/ticket-attachment.entity");
const ticket_activity_entity_1 = require("./entities/ticket-activity.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ticket_listener_1 = require("./listeners/ticket.listener");
const ticket_assignment_listener_1 = require("./listeners/ticket-assignment.listener");
const ticket_escalation_listener_1 = require("./listeners/ticket-escalation.listener");
const users_module_1 = require("../users/users.module");
const notifications_module_1 = require("../notifications/notifications.module");
const organizations_module_1 = require("../organizations/organizations.module");
const auth_module_1 = require("../auth/auth.module");
const departments_module_1 = require("../departments/departments.module"); // Add this import
let TicketsModule = class TicketsModule {
};
TicketsModule = __decorate([
    (0, common_1.Module)({
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
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            (0, common_1.forwardRef)(() => organizations_module_1.OrganizationsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
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
    })
], TicketsModule);
exports.TicketsModule = TicketsModule;
//# sourceMappingURL=tickets.module.js.map