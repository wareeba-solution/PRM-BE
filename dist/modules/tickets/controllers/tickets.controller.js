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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const organization_guard_1 = require("../../organizations/guards/organization.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const tickets_service_1 = require("../services/tickets.service");
const create_ticket_dto_1 = require("../dto/create-ticket.dto");
const update_ticket_dto_1 = require("../dto/update-ticket.dto");
const ticket_comment_dto_1 = require("../dto/ticket-comment.dto");
const ticket_assignment_dto_1 = require("../dto/ticket-assignment.dto");
const ticket_query_dto_1 = require("../dto/ticket-query.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("../entities/ticket.entity");
const ticket_comment_entity_1 = require("../entities/ticket-comment.entity");
const ticket_attachment_entity_1 = require("../entities/ticket-attachment.entity");
const ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const multer_1 = require("multer");
const ticket_enums_1 = require("../enums/ticket.enums");
let TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    create(createTicketDto, user, req) {
        return this.ticketsService.create(Object.assign(Object.assign({}, createTicketDto), { organizationId: req.organization.id, createdBy: user.id }));
    }
    findAll(query, req) {
        return this.ticketsService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    getTicketMetrics(req) {
        return this.ticketsService.getTicketMetrics(req.organization.id);
    }
    getAssignedTickets(query, user, req) {
        return this.ticketsService.getAssignedTickets(Object.assign(Object.assign({}, query), { organizationId: req.organization.id, userId: user.id }));
    }
    findOne(id, req) {
        return this.ticketsService.findOne(id, req.organization.id);
    }
    update(id, updateTicketDto, user, req) {
        return this.ticketsService.update(id, Object.assign(Object.assign({}, updateTicketDto), { organizationId: req.organization.id, updatedBy: user.id }));
    }
    remove(id, req) {
        return this.ticketsService.remove(id, req.organization.id);
    }
    addComment(id, createCommentDto, user, req) {
        return this.ticketsService.addComment(id, Object.assign(Object.assign({}, createCommentDto), { organizationId: req.organization.id, userId: user.id }));
    }
    bulkAssignTickets(bulkAssignmentDto, user, req) {
        return this.ticketsService.bulkAssignTickets(Object.assign(Object.assign({}, bulkAssignmentDto), { organizationId: req.organization.id, assignedBy: user.id }));
    }
    uploadAttachment(id, file, user, req) {
        return this.ticketsService.uploadAttachment(id, file, req.organization.id, user.id);
    }
    getTicketActivities(id, req) {
        return this.ticketsService.getTicketActivities(id, req.organization.id);
    }
    reopenTicket(id, data, user, req) {
        return this.ticketsService.reopenTicket(id, {
            reason: data.reason,
            organizationId: req.organization.id,
            reopenedBy: user.id,
        });
    }
    escalateTicket(id, data, user, req) {
        return this.ticketsService.escalateTicket(id, {
            reason: data.reason,
            organizationId: req.organization.id,
            escalatedBy: user.id,
        });
    }
    resolveTicket(id, data, user, req) {
        return this.ticketsService.resolveTicket(id, {
            resolution: data.resolution,
            organizationId: req.organization.id,
            resolvedBy: user.id,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ticket' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket created successfully', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tickets with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns paginated tickets', type: (nestjs_typeorm_paginate_1.Pagination) }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiQuery)({ name: 'organizationId', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, isArray: true, enum: Object.values(ticket_enums_1.TicketStatus) }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: Object.values(ticket_enums_1.TicketType) }),
    (0, swagger_1.ApiQuery)({ name: 'assigneeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'contactId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket metrics for the organization' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns ticket metrics' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicketMetrics", null);
__decorate([
    (0, common_1.Get)('assigned'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tickets assigned to the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns assigned tickets', type: (nestjs_typeorm_paginate_1.Pagination) }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiQuery)({ name: 'organizationId', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, isArray: true, enum: Object.values(ticket_enums_1.TicketStatus) }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: Object.values(ticket_enums_1.TicketType) }),
    (0, swagger_1.ApiQuery)({ name: 'contactId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_query_dto_1.TicketQueryDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getAssignedTickets", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific ticket by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the ticket', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket updated successfully', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment added successfully', type: ticket_comment_entity_1.TicketComment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ticket_comment_dto_1.CreateTicketCommentDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('bulk-assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk assign tickets to users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets assigned successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_assignment_dto_1.BulkTicketAssignmentDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "bulkAssignTickets", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an attachment to a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attachment uploaded successfully', type: ticket_attachment_entity_1.TicketAttachment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/ }),
        ],
    }))),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof multer_1.Multer !== "undefined" && multer_1.Multer.File) === "function" ? _a : Object, user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "uploadAttachment", null);
__decorate([
    (0, common_1.Get)(':id/activities'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket activities' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns ticket activities', type: [ticket_activity_entity_1.TicketActivity] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicketActivities", null);
__decorate([
    (0, common_1.Post)(':id/reopen'),
    (0, swagger_1.ApiOperation)({ summary: 'Reopen a closed ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket reopened successfully', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "reopenTicket", null);
__decorate([
    (0, common_1.Post)(':id/escalate'),
    (0, swagger_1.ApiOperation)({ summary: 'Escalate a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket escalated successfully', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "escalateTicket", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve a ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket resolved successfully', type: ticket_entity_1.Ticket }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "resolveTicket", null);
TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, organization_guard_1.OrganizationGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map