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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { OrganizationGuard } from '../../../common/guards/organization.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CreateTicketCommentDto } from '../dto/ticket-comment.dto';
import { TicketAssignmentDto } from '../dto/ticket-assignment.dto';
import { TicketQueryDto } from '../dto/ticket-query.dto';
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
            throw new NotFoundException('Ticket not found');
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
    Post(),
    ApiOperation({ summary: 'Create new ticket' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Ticket created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Get all tickets' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return all tickets' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findAll", null);
__decorate([
    Get('dashboard'),
    ApiOperation({ summary: 'Get tickets dashboard data' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return tickets dashboard data' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getDashboard", null);
__decorate([
    Get('assigned'),
    ApiOperation({ summary: 'Get tickets assigned to current user' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return assigned tickets' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TicketQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getAssignedTickets", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get ticket by id' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return ticket details' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: 'Update ticket' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Ticket updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Delete ticket' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Ticket deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "remove", null);
__decorate([
    Post(':id/comments'),
    ApiOperation({ summary: 'Add comment to ticket' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Comment added successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateTicketCommentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "addComment", null);
__decorate([
    Put(':id/assign'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Assign ticket' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Ticket assigned successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, TicketAssignmentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "assignTicket", null);
__decorate([
    Post(':id/escalate'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Escalate ticket' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Ticket escalated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body('reason')),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "escalateTicket", null);
__decorate([
    Post(':id/resolve'),
    ApiOperation({ summary: 'Resolve ticket' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Ticket resolved successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body('resolution')),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "resolveTicket", null);
__decorate([
    Post(':id/reopen'),
    ApiOperation({ summary: 'Reopen ticket' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Ticket reopened successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body('reason')),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "reopenTicket", null);
__decorate([
    Get(':id/timeline'),
    ApiOperation({ summary: 'Get ticket timeline' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return ticket timeline' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTimeline", null);
__decorate([
    Get(':id/related'),
    ApiOperation({ summary: 'Get related tickets' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return related tickets' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getRelatedTickets", null);
TicketsController = __decorate([
    ApiTags('Tickets'),
    Controller('tickets'),
    UseGuards(JwtAuthGuard, RolesGuard, OrganizationGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [TicketsService])
], TicketsController);
export { TicketsController };
//# sourceMappingURL=tickets.controller.js.map