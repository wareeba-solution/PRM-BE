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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, BadRequestException, ForbiddenException, UnauthorizedException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { OrganizationsService } from '../services/organizations.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { OrganizationQueryDto } from '../dto/organization-query.dto';
import { AddUserDto } from '../dto/add-user.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
let OrganizationsController = class OrganizationsController {
    constructor(organizationsService) {
        this.organizationsService = organizationsService;
    }
    async create(createOrganizationDto, req) {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.organizationsService.create(Object.assign(Object.assign({}, createOrganizationDto), { createdById: req.user.id }));
    }
    async findAll(query) {
        return this.organizationsService.findAll(query);
    }
    async getCurrentOrganization(req) {
        if (!req.organization) {
            throw new UnauthorizedException('No organization context found');
        }
        return this.organizationsService.findOne(req.organization.id);
    }
    async findOne(id) {
        const organization = await this.organizationsService.findOne(id);
        if (!organization) {
            throw new NotFoundException('Organization not found');
        }
        return organization;
    }
    async update(id, updateOrganizationDto, req) {
        if (!req.user || !req.organization) {
            throw new UnauthorizedException('User or organization context not found');
        }
        if (id !== req.organization.id && req.user.role !== Role.SUPER_ADMIN) {
            throw new ForbiddenException('Cannot update other organizations');
        }
        return this.organizationsService.update(id, Object.assign(Object.assign({}, updateOrganizationDto), { updatedBy: req.user.id }));
    }
    async remove(id) {
        await this.organizationsService.remove(id);
    }
    async addUser(id, addUserDto, req) {
        if (!req.organization) {
            throw new UnauthorizedException('No organization context found');
        }
        if (id !== req.organization.id) {
            throw new ForbiddenException('Cannot add users to other organizations');
        }
        return this.organizationsService.addUser(id, addUserDto);
    }
    async removeUser(id, userId, req) {
        if (!req.user || !req.organization) {
            throw new UnauthorizedException('User or organization context not found');
        }
        if (id !== req.organization.id) {
            throw new ForbiddenException('Cannot remove users from other organizations');
        }
        if (req.user.id === userId) {
            const admins = await this.organizationsService.getAdminCount(id);
            if (admins === 1) {
                throw new BadRequestException('Cannot remove the last administrator');
            }
        }
        await this.organizationsService.removeUser(id, userId);
    }
    async updateSubscription(id, updateSubscriptionDto, req) {
        if (!req.user || !req.organization) {
            throw new UnauthorizedException('User or organization context not found');
        }
        if (id !== req.organization.id && req.user.role !== Role.SUPER_ADMIN) {
            throw new ForbiddenException('Cannot update other organizations\' subscriptions');
        }
        return this.organizationsService.updateSubscription(id, updateSubscriptionDto);
    }
    async getStatistics(id, req) {
        if (!req.organization) {
            throw new UnauthorizedException('No organization context found');
        }
        if (id !== req.organization.id) {
            throw new ForbiddenException('Cannot view other organizations\' statistics');
        }
        return this.organizationsService.getStatistics(id);
    }
    async verifyDomain(id, domain, req) {
        if (!req.organization) {
            throw new UnauthorizedException('No organization context found');
        }
        if (id !== req.organization.id) {
            throw new ForbiddenException('Cannot verify other organizations\' domains');
        }
        return this.organizationsService.verifyDomain(id, domain);
    }
    async getAuditLogs(id, query, req) {
        if (!req.organization) {
            throw new UnauthorizedException('No organization context found');
        }
        if (id !== req.organization.id) {
            throw new ForbiddenException('Cannot view other organizations\' audit logs');
        }
        return this.organizationsService.getAuditLogs(id, query);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "create", null);
__decorate([
    Get(),
    Roles(Role.SUPER_ADMIN),
    ApiOperation({ summary: 'Get all organizations' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return all organizations' }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrganizationQueryDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findAll", null);
__decorate([
    Get('current'),
    ApiOperation({ summary: 'Get current organization' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return current organization details' }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getCurrentOrganization", null);
__decorate([
    Get(':id'),
    Roles(Role.SUPER_ADMIN),
    ApiOperation({ summary: 'Get organization by id' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return organization details' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: 'Update organization' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Organization updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.SUPER_ADMIN),
    ApiOperation({ summary: 'Delete organization' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Organization deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "remove", null);
__decorate([
    Post(':id/users'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Add user to organization' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'User added successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddUserDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "addUser", null);
__decorate([
    Delete(':id/users/:userId'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Remove user from organization' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User removed successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Param('userId', ParseUUIDPipe)),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "removeUser", null);
__decorate([
    Put(':id/subscription'),
    Roles(Role.SUPER_ADMIN, Role.ADMIN),
    ApiOperation({ summary: 'Update organization subscription' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Subscription updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "updateSubscription", null);
__decorate([
    Get(':id/statistics'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get organization statistics' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return organization statistics' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getStatistics", null);
__decorate([
    Post(':id/verify-domain'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Verify organization domain' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Domain verified successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body('domain')),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "verifyDomain", null);
__decorate([
    Get(':id/audit-logs'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get organization audit logs' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return organization audit logs' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getAuditLogs", null);
OrganizationsController = __decorate([
    ApiTags('Organizations'),
    Controller('organizations'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [OrganizationsService])
], OrganizationsController);
export { OrganizationsController };
//# sourceMappingURL=organizations.controller.js.map