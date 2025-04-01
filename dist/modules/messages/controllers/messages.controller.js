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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, BadRequestException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageQueryDto } from '../dto/message-query.dto';
import { MessageTemplateDto } from '../dto/message-template.dto';
import { BulkMessageDto } from '../dto/bulk-message.dto';
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async create(createMessageDto, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        return this.messagesService.create(Object.assign(Object.assign({}, createMessageDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        return this.messagesService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getConversations(query, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        return this.messagesService.getConversations(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getConversation(contactId, query, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        return this.messagesService.getConversation(contactId, Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async findOne(id, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        const message = await this.messagesService.findOne(id, req.organization.id);
        if (!message) {
            throw new NotFoundException('Message not found');
        }
        return message;
    }
    async update(id, updateMessageDto, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        return this.messagesService.update(id, Object.assign(Object.assign({}, updateMessageDto), { organizationId: req.organization.id, updatedBy: req.user.id }));
    }
    async remove(id, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        await this.messagesService.remove(id, req.organization.id);
    }
    async createTemplate(templateDto, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        return this.messagesService.createTemplate(Object.assign(Object.assign({}, templateDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async getTemplates(query, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        return this.messagesService.getTemplates(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async sendBulk(bulkMessageDto, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        if (!bulkMessageDto.contactIds || bulkMessageDto.contactIds.length === 0) {
            throw new BadRequestException('Contact IDs are required for bulk messaging');
        }
        return this.messagesService.sendBulk(Object.assign(Object.assign({}, bulkMessageDto), { organizationId: req.organization.id, senderId: req.user.id }));
    }
    async getStatistics(query, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        return this.messagesService.getStatistics(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async resend(id, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        return this.messagesService.resend(id, {
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }
    async markAsRead(id, req) {
        if (!req.organization)
            throw new BadRequestException('Organization information not available');
        if (!req.user)
            throw new BadRequestException('User information not available');
        return this.messagesService.markAsRead(id, {
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Create new message' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Message sent successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Get all messages' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return all messages' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findAll", null);
__decorate([
    Get('conversations'),
    ApiOperation({ summary: 'Get all conversations' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return all conversations' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversations", null);
__decorate([
    Get('conversations/:contactId'),
    ApiOperation({ summary: 'Get conversation with contact' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return conversation messages' }),
    __param(0, Param('contactId', ParseUUIDPipe)),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversation", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get message by id' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return message details' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Update message' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Message updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Delete message' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Message deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "remove", null);
__decorate([
    Post('templates'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Create message template' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Template created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "createTemplate", null);
__decorate([
    Get('templates'),
    ApiOperation({ summary: 'Get message templates' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return message templates' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getTemplates", null);
__decorate([
    Post('bulk'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Send bulk messages' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Bulk messages queued successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BulkMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendBulk", null);
__decorate([
    Get('statistics'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get messaging statistics' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return messaging statistics' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageQueryDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getStatistics", null);
__decorate([
    Post(':id/resend'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Resend failed message' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Message resent successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "resend", null);
__decorate([
    Post(':id/mark-read'),
    ApiOperation({ summary: 'Mark message as read' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Message marked as read' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "markAsRead", null);
MessagesController = __decorate([
    ApiTags('Messages'),
    Controller('messages'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [MessagesService])
], MessagesController);
export { MessagesController };
//# sourceMappingURL=messages.controller.js.map