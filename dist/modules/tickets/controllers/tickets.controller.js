"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const organization_guard_1 = require("../../../common/guards/organization.guard"); // Adjusted path
const roles_decorator_1 = require("../../../common/decorators/roles.decorator"); // Adjusted path
const role_enum_1 = require("../../users/enums/role.enum");
const tickets_service_1 = require("../services/tickets.service");
const create_ticket_dto_1 = require("../dto/create-ticket.dto");
const update_ticket_dto_1 = require("../dto/update-ticket.dto");
const ticket_comment_dto_1 = require("../dto/ticket-comment.dto");
const ticket_assignment_dto_1 = require("../dto/ticket-assignment.dto");
const ticket_query_dto_1 = require("../dto/ticket-query.dto");
let TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    async create(createTicketDto, req) {
        return this.ticketsService.create(Object.assign(Object.assign({}, createTicketDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async findAll(query, req) {
        return this.ticketsService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getDashboard(req) {
        return this.ticketsService.getDashboard(req.organization.id);
    }
    async getAssignedTickets(query, req) {
        return this.ticketsService.getAssignedTickets(Object.assign(Object.assign({}, query), { organizationId: req.organization.id, userId: req.user.id }));
    }
    async findOne(id, req) {
        const ticket = await this.ticketsService.findOne(id, req.organization.id);
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        return ticket;
    }
    async update(id, updateTicketDto, req) {
        return this.ticketsService.update(id, Object.assign(Object.assign({}, updateTicketDto), { organizationId: req.organization.id, updatedBy: req.user.id }));
    }
    async remove(id, req) {
        await this.ticketsService.remove(id, req.organization.id);
    }
    async addComment(id, commentDto, req) {
        return this.ticketsService.addComment(id, Object.assign(Object.assign({}, commentDto), { organizationId: req.organization.id, userId: req.user.id }));
    }
    async assignTicket(id, assignmentDto, req) {
        return this.ticketsService.assignTicket(id, Object.assign(Object.assign({}, assignmentDto), { organizationId: req.organization.id, assignedBy: req.user.id, ticketIds: [id] }));
    }
    async escalateTicket(id, reason, req) {
        return this.ticketsService.escalateTicket(id, {
            reason,
            organizationId: req.organization.id,
            escalatedBy: req.user.id,
        });
    }
    async resolveTicket(id, resolution, req) {
        return this.ticketsService.resolveTicket(id, {
            resolution,
            organizationId: req.organization.id,
            resolvedBy: req.user.id,
        });
    }
    async reopenTicket(id, reason, req) {
        return this.ticketsService.reopenTicket(id, {
            reason,
            organizationId: req.organization.id,
            reopenedBy: req.user.id,
        });
    }
    async getTimeline(id, req) {
        return this.ticketsService.getTimeline(id, req.organization.id);
    }
    async getRelatedTickets(id, req) {
        return this.ticketsService.getRelatedTickets(id, req.organization.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('assigned'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getAssignedTickets", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ticket_comment_dto_1.CreateTicketCommentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ticket_assignment_dto_1.TicketAssignmentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "assignTicket", null);
__decorate([
    (0, common_1.Post)(':id/escalate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "escalateTicket", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('resolution')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "resolveTicket", null);
__decorate([
    (0, common_1.Post)(':id/reopen'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "reopenTicket", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)(':id/related'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getRelatedTickets", null);
TicketsController = __decorate([
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, organization_guard_1.OrganizationGuard) // Added OrganizationGuard
    ,
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map