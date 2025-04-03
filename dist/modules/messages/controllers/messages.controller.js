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
exports.MessagesController = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/controllers/messages.controller.ts
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const messages_service_1 = require("../services/messages.service");
const create_message_dto_1 = require("../dto/create-message.dto");
const update_message_dto_1 = require("../dto/update-message.dto");
const message_query_dto_1 = require("../dto/message-query.dto");
const message_template_dto_1 = require("../dto/message-template.dto");
const bulk_message_dto_1 = require("../dto/bulk-message.dto");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async create(createMessageDto, req) {
        // Added null checks with throw
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        return this.messagesService.create(Object.assign(Object.assign({}, createMessageDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        return this.messagesService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getConversations(query, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        return this.messagesService.getConversations(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getConversation(contactId, query, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        return this.messagesService.getConversation(contactId, Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async findOne(id, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        const message = await this.messagesService.findOne(id, req.organization.id);
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        return message;
    }
    async update(id, updateMessageDto, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        return this.messagesService.update(id, Object.assign(Object.assign({}, updateMessageDto), { organizationId: req.organization.id, updatedBy: req.user.id }));
    }
    async remove(id, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        await this.messagesService.remove(id, req.organization.id);
    }
    async createTemplate(templateDto, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        return this.messagesService.createTemplate(Object.assign(Object.assign({}, templateDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async getTemplates(query, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        return this.messagesService.getTemplates(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async sendBulk(bulkMessageDto, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        if (!bulkMessageDto.contactIds || bulkMessageDto.contactIds.length === 0) {
            throw new common_1.BadRequestException('Contact IDs are required for bulk messaging');
        }
        return this.messagesService.sendBulk(Object.assign(Object.assign({}, bulkMessageDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async getStatistics(query, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        return this.messagesService.getStatistics(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async resend(id, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        return this.messagesService.resend(id, {
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }
    async markAsRead(id, req) {
        if (!req.organization)
            throw new common_1.BadRequestException('Organization information not available');
        if (!req.user)
            throw new common_1.BadRequestException('User information not available');
        return this.messagesService.markAsRead(id, {
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Create new message' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Message sent successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all messages' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_query_dto_1.MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all conversations' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return all conversations' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_query_dto_1.MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('conversations/:contactId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversation with contact' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return conversation messages' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('contactId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_query_dto_1.MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get message by id' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return message details' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/message.entity").Message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Update message' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message updated successfully' }),
    openapi.ApiResponse({ status: 200, type: require("../entities/message.entity").Message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_message_dto_1.UpdateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete message' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Message deleted successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Create message template' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Template created successfully' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_template_dto_1.MessageTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get message templates' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return message templates' }),
    openapi.ApiResponse({ status: 200, type: [require("../entities/message-template.entity").MessageTemplate] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_query_dto_1.MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Send bulk messages' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Bulk messages queued successfully' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_message_dto_1.BulkMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendBulk", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get messaging statistics' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Return messaging statistics' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_query_dto_1.MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)(':id/resend'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Resend failed message' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message resent successfully' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "resend", null);
__decorate([
    (0, common_1.Post)(':id/mark-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark message as read' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Message marked as read' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/message.entity").Message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "markAsRead", null);
MessagesController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map