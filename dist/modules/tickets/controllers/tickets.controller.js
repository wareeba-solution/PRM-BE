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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
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
    (0, swagger_1.ApiOperation)({ summary: 'Create new ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Ticket created successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tickets' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all tickets' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tickets dashboard data' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return tickets dashboard data' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('assigned'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tickets assigned to current user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return assigned tickets' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getAssignedTickets", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket by id' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return ticket details' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket updated successfully' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket }),
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
    (0, swagger_1.ApiOperation)({ summary: 'Delete ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Ticket deleted successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add comment to ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Comment added successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/ticket-comment.entity").TicketComment }),
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
    (0, swagger_1.ApiOperation)({ summary: 'Assign ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket assigned successfully' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/ticket.entity").Ticket }),
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
    (0, swagger_1.ApiOperation)({ summary: 'Escalate ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket escalated successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "escalateTicket", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket resolved successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('resolution')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "resolveTicket", null);
__decorate([
    (0, common_1.Post)(':id/reopen'),
    (0, swagger_1.ApiOperation)({ summary: 'Reopen ticket' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Ticket reopened successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/ticket.entity").Ticket }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "reopenTicket", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket timeline' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return ticket timeline' }),
    openapi.ApiResponse({ status: 200, type: [require("../entities/ticket-activity.entity").TicketActivity] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)(':id/related'),
    (0, swagger_1.ApiOperation)({ summary: 'Get related tickets' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return related tickets' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getRelatedTickets", null);
TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, organization_guard_1.OrganizationGuard) // Added OrganizationGuard
    ,
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map